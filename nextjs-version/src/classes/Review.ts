import { limit, orderBy } from "firebase/firestore";
import User from "./User";
import Database from "./Database";

export default class Review extends Database {

    constructor(tenantId: string | null) {
        super(tenantId, "reviews");
    }

    getRecentData = async () => {
        const result = await this.get([
            orderBy('createdAt', 'desc'),
            limit(5)
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

    getAllData = async () => {
        const result = await this.get([
            orderBy('createdAt', 'desc'),
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