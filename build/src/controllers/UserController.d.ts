import { IUser, Subscriber } from "../interfaces/User";
export default class UserControllter {
    static __createUser(user: IUser, subscriber: Subscriber): Promise<{
        error: null;
        value: {
            user: IUser;
            subscriber: Subscriber;
        };
    } | {
        error: string;
        value: null;
    } | undefined>;
    static __getUsers(): Promise<IUser[] | undefined>;
}
