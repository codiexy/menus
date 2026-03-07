import { orderBy, where } from "firebase/firestore";

import Database from "./Database";
import User from "./User";

export default class CommentReply extends Database {

    constructor(tenantId: string | null, id: string) {
        super(tenantId, `comments/${id}/replies`);
    }

    getAll = async () => {
        const results = await this.get([
            // orderBy("createdAt", "desc"),
            where('status', "==", 'publish')
        ]);
        if (results.length) {
            const userClass = new User(this.tenantId);
            let data = results.map(async (comment) => {
                const userResult = await userClass.first(comment.createdBy);
                if (userResult.status==="active") {
                    comment.userData = userResult;
                }
                return comment;
            })
            return await Promise.all(data.map(async (i) => await i));
        }
        return [];
    }
}