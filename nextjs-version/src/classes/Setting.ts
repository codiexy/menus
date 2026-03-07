import Database from "./Database";

export default class Setting extends Database {

    constructor(tenantId: string | null) {
        super(tenantId, `settings`);
    }
}