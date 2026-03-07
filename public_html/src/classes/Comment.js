import { orderBy, where } from "firebase/firestore";

import Database from "./Database";
import User from "./User";

export default class Comment extends Database {

    constructor() {
        super("Comments");
    }

    getByDishId = async (dishId) => {
        const userClass = new User();
        const result = await this.get([
            orderBy("createdAt", "desc"),
            where('status', "==", 'publish'),
            where('dishId', '==', dishId)
        ]);
        if(result.status) {
            let data = result.data.map(async (comment) => {
                const userResult = await userClass.first(comment.createdBy);
                if(userResult.status) {
                    comment.userData = userResult.data;
                }
                return comment;
            })
            return await Promise.all(data.map(async (i) => await i));
        }
        return [];
    }
}