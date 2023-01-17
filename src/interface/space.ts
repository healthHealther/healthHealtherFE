export interface homeGym {
  space_id: number;
  member_id: string;
  title: string;
  content: string;
  address: string;
  detail_address: string;
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
