import { atom } from "recoil";
import { contentType } from "./components/community/CommunityContents";
import { commentType } from "./page/community/comment/CommentArea";
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
