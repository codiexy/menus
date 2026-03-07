import { orderBy } from "firebase/firestore";
import User from "./User";
import Database from "./Database";

export default class Vote extends Database {

    constructor(id) {
        super(`Dishes/${id}/Votes`);
    }

    getData = async () => {
        const result = await this.get([
            orderBy('createdAt', 'desc')
        ]);
        if (result.status) {
            let data = result.data.map(async (review) => {
                const userClass = new User();
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