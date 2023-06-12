import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const OrderNameState = atom({
	key: 'OrderNameState',
	default: '',
	effects_UNSTABLE: [persistAtom],
});