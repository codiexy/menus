import Database from "./Database";

export default class Setting extends Database {

    constructor(id) {
        super(`RestaurantInfo/${id}/Settings`);
    }
}