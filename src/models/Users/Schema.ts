import winston from "winston";
import { FireStore } from "../../../server";
import { IUser } from "../../interfaces/User";

/**
 * User Model Class
 *
 * User Schema for Firestore CRUD ops
 */
class User {
  user: IUser = {};
  constructor(name?: string, email?: string) {
    this.user = { name: name, email: email };
  }

  /**
   * __save
   *
   * Save current object to the database
   * @returns string | undefined
   */
  async __save() {
    try {
      await FireStore?.collection("users").doc().set(this.user);
      return "Saved Successfully";
    } catch (error) {
      winston.error({ __saveUserSchemaError: error });
    }
  }

  static async __getAllUsers() {
    try {
      let Users = await FireStore?.collection("users");
      console.log(Users);
      const data = await Users?.get();
      if (data?.empty) return [];
      else {
        let all: IUser[] = [];
        data?.forEach((item) => {
          all.push({
            id: item.id,
            name: item.data().name,
            email: item.data().email,
          });
        });
        return all;
      }
    } catch (error) {
      winston.error({ __getAllUsersSchemaError: error });
    }
  }
  static async __deleteUser(id: string) {
    try {
      await FireStore?.collection("users").doc(id).delete();
      return "Deleted Successfully";
    } catch (error) {
      winston.error({ __deleteUserSchemaError: error });
    }
  }
}
export default User;
