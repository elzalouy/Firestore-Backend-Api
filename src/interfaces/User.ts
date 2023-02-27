export enum role {
  Admin,
  Subscriber,
  UnSubscriber,
  GymSubscriber,
  BothSubscriber,
}
export enum PackageDuration {
  monthly,
  twoMonth,
  threeMonth,
}
export enum PackageType {
  gym,
  csub,
  both,
}

export interface IUser {
  documentId?: string;
  fullName: string;
  phoneNumber: string;
  role: role;
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
  packageType: PackageType;
  price: number;
  packageDuration: PackageDuration;
  packageName: String;
}
