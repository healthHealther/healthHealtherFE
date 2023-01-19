export interface homeGym {
  spaceId: number;
  memberId: string;
  title: string;
  content: string;
  address: string;
  detailAddress: string;
  spaceType: Array<string>;
  convenienceTypes: Array<string>;
  note: string;
  rule: string;
  price: number;
  urls: img[];
  openTime: number;
  closeTime: number;
  // open_time: Date;
  // close_time: Date;
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
