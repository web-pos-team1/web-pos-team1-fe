import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const CartListState = atom({
	key: 'CartListState',
	default: [],
	effects_UNSTABLE: [persistAtom],
});
