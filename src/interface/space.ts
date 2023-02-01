export interface homeGymInfo {
  spaceId: number;
  memberId: string;
  title: string;
  content: string;
  address: string;
  addressDetail: string;
  spaceTypes: string[];
  convenienceTypes: string[];
  notice: string;
  rule: string;
  price: number;
  images: image[];
  openTime: number;
  closeTime: number;
  discountAmount: number;
  amount: number;
  openDate: Date;
  expiredDate: Date;
}

export interface submitHomeGymInfo {
  spaceId: number;
  memberId: string;
  title: string;
  content: string;
  address: string;
  addressDetail: string;
  spaceTypes: string[];
  convenienceTypes: string[];
  notice: string;
  rule: string;
  price: number;
  images: string[];
  openTime: number;
  closeTime: number;
  discountAmount: number;
  amount: number;
  openDate: Date;
  expiredDate: Date;
}

export interface image {
  preview: string;
  raw: string;
}

export interface couponType {
  couponId: number;
  discountAmount: number;
  openDate: string;
  expiredDate: string;
  amount: number;
}

export interface review {
  spaceName: string;
  nickName: string;
  title: string;
  content: string;
  grade: number;
  memberName: string;
}
