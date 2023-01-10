import { rest } from "msw";

interface homeGym {
  id: number;
  title: string;
  price: number;
  spaceType: Array<string>;
  img: string;
}

const spaceList = [
  {
    id: 1,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 2,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 3,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 4,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 5,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 6,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 7,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 8,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 9,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 10,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 11,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
  {
    id: 12,
    title: "홈짐 타이틀 영역",
    price: 32000,
    spaceType: ["유산소", "무산소"],
    img: "",
  },
];

export const handlers = [
  // 홈짐 리스트
  rest.get("/space", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(spaceList));
  }),

  // 홈짐 등록
  rest.post("/space", (req, res, ctx) => {
    spaceList.push(req.body as homeGym);
    return res(ctx.status(201));
  }),
];
