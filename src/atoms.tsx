import { atom, selector } from "recoil";

//state는 minutes 하나만 있는 상태, atom도 1개인 상태
//hourSelect은 select를 활용해 state를 가져와서 수정한 output을 return중임

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hours",
  //{get} : get이라는 함수를 불러 state를 가져옴
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  //set : state를 원하는 것으로 수정해줌
  //=> minutes의 state(minuteState)를 newValue로 수정하기 위해 사용

  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
