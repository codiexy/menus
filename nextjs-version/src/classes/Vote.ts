import { orderBy } from "firebase/firestore";
import User from "./User";
import Database from "./Database";

export default class Vote extends Database {

    constructor(tenantId: string | null, id: string) {
        super(tenantId, `dishes/${id}/votes`);
    }

    getData = async () => {
        const result = await this.get([
            orderBy('createdAt', 'desc')
        ]);
        if (result.length) {
            let data = result.map(async (review) => {
                const userClass = new User(this.tenantId);
                const userRes = await userClass.first(review.createdBy);
                return {
                    ...review,
                    user: userRes?.data || {},
                }
            })
            return await Promise.all(data.map(async (i) => await i));
        }
        return [];
    }
}