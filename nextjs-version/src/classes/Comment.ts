import { orderBy, where } from "firebase/firestore";
import Database from "./Database";
import User from "./User";

export default class Comment extends Database {

    constructor(tenantId: string | null) {
        super(tenantId, "comments");
    }

    getByDishId = async (id: string) => {
        const userClass = new User(this.tenantId);
        const results = await this.get([
            // orderBy("createdAt", "desc"),
            where('status', "==", 'publish'),
            where('dishId', '==', id)
        ]);
        if(results.length) {
            let data = results.map(async (comment) => {
                const userResult = await userClass.first(comment.createdBy);
                if(userResult.status ==="active") {
                    comment.userData = userResult;
                }
                return comment;
            })
            return await Promise.all(data.map(async (i) => await i));
        }
        return [];
    }
}