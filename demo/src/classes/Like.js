import { where } from "firebase/firestore";
import Category from "./Category";

import Database from "./Database";
import Dish from './Dish';

export default class Like extends Database {

    schema = {
        dishId: "string",
    }

    constructor() {
        super("Likes");
    }

    favorites = async () => {
        if(this.user) {
            const result = await this.get([
                where('createdBy', "==", this.user.uid)
            ]);
            if(result.status) {
                let data = result.data.map(async (like) => {
                    const dishClass = new Dish();
                    const dishRes = await dishClass.first(like.dishId);
                    var category = false;
                    if(dishRes.status) {
                        const categoryClass = new Category();
                        const categoryRes = await categoryClass.first(dishRes.data.categoryId);
                        category = categoryRes?.data || false;
                    }

                    return {
                        ...(dishRes?.data || {}),
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