import Model from "./Model";

export default class Notification extends Model {

    constructor(tenantId: string) {
        super(tenantId, "notifications");
    }

    create = async (inputData = {}) => {
        try {
            return this.insert({
                ...inputData,
                isRead: false
            })
        } catch (error) {
            console.log(error)
            return false;
        }
    }

}