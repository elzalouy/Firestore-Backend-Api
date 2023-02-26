import winston from "winston";
import { FireStore } from "../../../server";
import { IUser, Subscriber, Subscription } from "../../interfaces/User";
import { userJoiSchema } from "./Validations";
import firebaseAuth, { getAuth } from "firebase/auth";
/**
 * User Model Class
 *
 * User Schema for Firestore CRUD ops
 */
class User {
  private id?: string;
  private user?: IUser;
  private Subscriber?: Subscriber;
  constructor(data: { user: IUser; Subscriber: Subscriber }) {
    this.user = data.user;
    this.Subscriber = data.Subscriber;
  }

  /**
   * __save
   *
   * Save current object to the database
   * @returns string | undefined
   */
  async __save() {
    try {
      if (this.user && this.Subscriber) {
        let found = await FireStore?.collection("users")
          .where("phoneNumber", "==", this.user.phoneNumber)
          .get();
        if (found?.empty) {
          this.id = (await FireStore?.collection("users").add(this.user))?.id;
          await FireStore?.collection("subscribers").add({
            ...this.Subscriber,
            userId: this.id,
          });
          return {
            error: null,
            value: { user: this.user, subscriber: this.Subscriber },
          };
        } else {
          return {
            error: "Phone number is already existed before",
            value: null,
          };
        }
      } else return { error: "User data is required", value: null };
    } catch (error) {
      winston.error({ __saveUserSchemaError: error });
    }
  }

  __validate() {
    try {
      let validation = userJoiSchema.validate(this?.user);
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
      const data = await Users?.get();
      if (data?.empty) return [];
      else {
        let all: IUser[] = [];
        data?.forEach((item) => {
          all.push({
            documentId: item.id,
            fullName: item.data().fullName,
            phoneNumber: item.data().phoneNumber,
            role: item.data().role,
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
  static async phoneCode(phoneNumber: string) {
    try {
      let auth = getAuth();
      const vr = new firebaseAuth.RecaptchaVerifier(
        "sendCode",
        { size: "invisible" },
        auth
      );
      let provider = new firebaseAuth.PhoneAuthProvider(auth);
      let result = provider.verifyPhoneNumber(phoneNumber, vr);
      return result;
    } catch (error) {
      winston.error({ __deleteUserSchemaError: error });
    }
  }
}
export default User;
