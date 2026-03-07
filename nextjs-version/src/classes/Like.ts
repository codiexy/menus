import { where } from "firebase/firestore";
import Category from "./Category";

import Database from "./Database";
import Dish from './Dish';

export default class Like extends Database {

    schema = {
        dishId: "string",
    }

    constructor(tenantId: string | null) {
        super(tenantId, "likes");
    }

    favorites = async () => {
        if (this.user) {
            const result = await this.get([
                where('createdBy', "==", this.user.uid)
            ]);
            if (result.length) {
                let data = result.map(async (like) => {
                    const dishClass = new Dish(this.tenantId);
                    const dishRes = await dishClass.first(like.dishId);
                    var category = false;
                    if (dishRes) {
                        const categoryClass = new Category(this.tenantId);
                        category = await categoryClass.first(dishRes.categoryId);
                    }

                    return {
                        ...(dishRes ? dishRes : {}),
                        like,
                        category
                    }
                })
                return await Promise.all(data.map(async (i) => await i));
            }
        }
        return []
    }
}