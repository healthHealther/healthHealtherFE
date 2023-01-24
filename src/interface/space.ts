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
  // open_time: Date;
  // close_time: Date;
}

export interface image {
  preview: string;
  raw: string;
}

export interface couponType {
  spaceId: number;
  discountAmount: number;
  openDate: string;
  expiredDate: string;
  amount: number;
}

export interface review {
  reviewId: number;
  content: string;
  star: number;
}
