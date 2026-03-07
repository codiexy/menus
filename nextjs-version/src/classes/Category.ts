import Database from "./Database";

export default class Category extends Database {

    constructor(tenantId: string | null) {
        super(tenantId, "categories");
    }
}