import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 장바구니 리스트
export const CartListState = atom({
	key: 'CartListState',
	default: [],
	effects_UNSTABLE: [persistAtom],
});
