import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const BuyerTelState = atom({
	key: 'BuyerTelState',
	default: '',
	effects_UNSTABLE: [persistAtom],
});