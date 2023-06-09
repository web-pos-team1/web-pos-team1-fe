import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const PayObjectState = atom({
	key: 'PayObjectState',
	default: undefined,
	effects_UNSTABLE: [persistAtom],
});

// const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined

// const {persistAtom} = recoilPersist({
//   key: "PayObjectState",
//   storage: sessionStorage
// });

// // recoil-persist 적용
// export const PayObjectState = atom({
// 	key: "PayObjectState",
// 	default: undefined,
// 	effects_UNSTABLE: [persistAtom]
//   });
