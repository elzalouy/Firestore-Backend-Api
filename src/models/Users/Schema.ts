import winston from "winston";
import { FireStore } from "../../../server";
import { IUser } from "../../interfaces/User";
import { userJoiSchema } from "./Validations";

/**
 * User Model Class
 *
 * User Schema for Firestore CRUD ops
 */
class User {
  private user: IUser = {};
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
      let validation = this.__validate();
      if (validation?.error !== null) return validation;
      await FireStore?.collection("users").doc().set(this.user);
      return { error: null, value: validation.value };
    } catch (error) {
      winston.error({ __saveUserSchemaError: error });
    }
  }
  __validate() {
    try {
      let validation = userJoiSchema.validate(this.user);
      if (validation.error)
        return { error: validation.error, value: validation.value };
      else return { error: null, value: validation.value };
    } catch (error) {
      winston.error({ __validateUserSchemaError: error });
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
