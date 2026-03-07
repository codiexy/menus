import { orderBy, where } from "firebase/firestore";

import Database from "./Database";
import User from "./User";

export default class CommentReply extends Database {

    constructor(commentId) {
        super(`Comments/${commentId}/Replies`);
    }

    getAll = async () => {
        const result = await this.get([
            orderBy("createdAt", "desc"),
            where('status', "==", 'publish')
        ]);
        if (result.status) {
            const userClass = new User();
            let data = result.data.map(async (comment) => {
                const userResult = await userClass.first(comment.createdBy);
                if (userResult.status) {
                    comment.userData = userResult.data;
                }
                return comment;
            })
            return await Promise.all(data.map(async (i) => await i));
        }
        return [];
    }
}