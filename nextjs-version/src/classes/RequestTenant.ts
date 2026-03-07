import Database from "./Database";

export default class RequestTenant extends Database {

    constructor(tenantId: string | null) {
        super("", 'tenant_requests', false);
    }
}