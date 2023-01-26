import { atom } from "recoil";
import { contentType } from "./page/community/CommunityPage";
import { commentType } from "./page/community/comment/CommentArea";
import { couponType, review } from "./interface/space";
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
