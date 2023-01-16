export interface homeGym {
  space_id: number;
  member_id: string;
  title: string;
  content: string;
  address: string;
  detail_address: string;
  spaceType: Array<string>;
  note: string;
  rule: string;
  price: number;
  urls: img[];
}

interface img {
  ["url"]: string;
}
