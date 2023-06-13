import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const MarchantUidState = atom({
	key: 'MarchantUidState',
	default: '',
	effects_UNSTABLE: [persistAtom],
});