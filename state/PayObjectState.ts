import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const PayObjectState = atom({
	key: 'PayObjectState',
	default: undefined,
	effects_UNSTABLE: [persistAtom],
});
