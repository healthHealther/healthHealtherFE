export interface homeGym {
  spaceId: number;
  memberId: string;
  title: string;
  content: string;
  address: string;
  detailAddress: string;
  spaceType: string[];
  convenienceTypes: string[];
  note: string;
  rule: string;
  price: number;
  urls: img[];
  openTime: number;
  closeTime: number;
  // open_time: Date;
  // close_time: Date;
}

export interface homeGymInfo {
  spaceId: number;
  memberId: string;
  title: string;
  content: string;
  address: string;
  detailAddress: string;
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

interface image {
  preview: string;
  raw: string;
}

interface img {
  ["url"]: string;
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
