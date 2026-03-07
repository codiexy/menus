import Setting from "./Setting";
import Database from "./Database";

export default class Tenant extends Database {

  constructor(tenantId: string | null = "") {
    super(tenantId)
    this.collection = this.database;
  }

  currentTenant = async (slug: string) => {
    return await this.first(slug, "slug");
  }

}