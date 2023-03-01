export declare enum role {
    Admin = 0,
    Subscriber = 1,
    UnSubscriber = 2,
    GymSubscriber = 3,
    BothSubscriber = 4
}
export declare enum PackageDuration {
    monthly = 0,
    twoMonth = 1,
    threeMonth = 2
}
export declare enum PackageType {
    gym = 0,
    csub = 1,
    both = 2
}
export interface IUser {
    documentId?: string;
    fullName: string;
    phoneNumber: string;
    role: any;
}
export interface Subscriber {
    userId: string;
    profileImage: string;
    subscription: Subscription[];
    joined: Date;
    birthDate: Date;
}
export interface Subscription {
    subStartDate: Date;
    subEndDate: Date;
    package: Package;
    isSubPaused: Boolean;
    pauseSubTill: Date;
    transactionId: String;
    pauseDaysLeft: number;
    discountPercentage: number;
}
export interface Package {
    packageType: any;
    price: number;
    packageDuration: any;
    packageName: String;
}
