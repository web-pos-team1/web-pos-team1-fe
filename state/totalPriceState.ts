import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const totalPriceState = atom({
	key: 'totalPriceState',
	default: 0,
	effects_UNSTABLE: [persistAtom],
});
