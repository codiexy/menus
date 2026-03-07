import Database from "./Database";
import User from './User';

export default class Restaurant extends Database {

  constructor() {
    super('RestaurantInfo')
  }

  getData = async () => {
    const result = await this.get();
    if(result.status) {
      return {
        status: true,
        data: result.data.shift()
      }
    }
    return result;
  }

  getDataByUsername = async (username) => {
    const userClass = new User();
    const userData = await userClass.first(username, 'username');
    if (userData.status) {
      return await this.first(userData.data.id, 'createdBy');
    }
    return {
      status: false,
      message: "Invalid username!"
    }
  }

}