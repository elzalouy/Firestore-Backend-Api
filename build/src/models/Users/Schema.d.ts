import { IUser, Subscriber } from "../../interfaces/User";
/**
 * User Model Class
 *
 * User Schema for Firestore CRUD ops
 */
declare class User {
    private id?;
    private user?;
    private Subscriber?;
    constructor(data: {
        user: IUser;
        subscriber: Subscriber;
    });
    /**
     * __save
     *
     * Save current object to the database
     * @returns string | undefined
     */
    __save(): Promise<{
        error: null;
        value: {
            user: IUser;
            subscriber: Subscriber;
        };
    } | {
        error: string;
        value: null;
    } | undefined>;
    __validate(): {
        error: import("joi").ValidationError;
        value: undefined;
    } | {
        error: null;
        value: any;
    } | undefined;
    static __getAllUsers(): Promise<IUser[] | undefined>;
    static __deleteUser(id: string): Promise<"Deleted Successfully" | undefined>;
    static phoneCode(phoneNumber: string): Promise<string | undefined>;
}
export default User;
