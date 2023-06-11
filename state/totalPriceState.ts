import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const {persistAtom} = recoilPersist();
export const totalPriceState = atom({
	key: 'totalPriceState',
	default: 0,
	effects_UNSTABLE: [persistAtom],
});

// const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined

// const {persistAtom} = recoilPersist({
//   key: "totalPriceState",
//   storage: sessionStorage
// });

// // recoil-persist 적용
// export const totalPriceState = atom({
// 	key: "totalPriceState",
// 	default: 0,
// 	effects_UNSTABLE: [persistAtom]
//   });