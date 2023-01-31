import { atom, selector } from "recoil";
import { contentType } from "./page/community/CommunityPage";
import { commentType } from "./page/community/comment/CommentArea";
import {
  couponType,
  homeGymInfo,
  review,
  submitHomeGymInfo,
} from "./interface/space";
export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});
export const communityState = atom<contentType[]>({
  key: "communityState",
  default: [],
});
export const commentListState = atom<commentType[]>({
  key: "commentListState",
  default: [],
});

export const coupon = atom<couponType>({
  key: "coupon", // unique ID (with respect to other atoms/selectors)
  default: {
    spaceId: 0,
    discountAmount: 0,
    openDate: "",
    expiredDate: "",
    amount: 0,
  }, // default value (aka initial value)
});

export const reviewState = atom<review[]>({
  key: "reviewState", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const spaceContentDetailState = atom<homeGymInfo>({
  key: "spaceContentDetail",
  default: {
    spaceId: 0,
    memberId: "",
    title: "",
    content: "",
    address: "",
    addressDetail: "",
    spaceTypes: [],
    convenienceTypes: [],
    notice: "",
    rule: "",
    price: 0,
    images: [],
    openTime: 0,
    closeTime: 0,
    discountAmount: 0,
    amount: 0,
    openDate: new Date(),
    expiredDate: new Date(),
  },
});

export const spaceContentListState = atom<submitHomeGymInfo[]>({
  key: "spaceContentList",
  default: [],
});

export const searchTitleState = atom<string>({
  key: "searchTitle",
  default: "",
});

export const searchTitleLabelState = selector({
  key: "searchTitleLabelState",
  get: ({ get }) => {
    const searchTitleValue = get(searchTitleState);

    return searchTitleValue;
  },
});

export const spaceContentDetailLabelState = selector({
  key: "spaceContentDetailLabelState",
  get: ({ get }) => {
    const spaceContentDetailInfo = get(spaceContentDetailState);

    return spaceContentDetailInfo;
  },
});

export const couponLabelState = selector<couponType>({
  key: "couponLabelState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const couponInfo = get(coupon);
    return couponInfo;
  }, // default value (aka initial value)
});

export const modalOnOffState = atom<boolean>({
  key: "modalOnOffState",
  default: false,
});

export const modalOnOffLabelState = selector<boolean>({
  key: "modalOnOffLabelState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const modalOnOffLabel = get(modalOnOffState);
    return modalOnOffLabel;
  }, // default value (aka initial value)
});
