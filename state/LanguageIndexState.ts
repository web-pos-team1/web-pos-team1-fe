import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const LanguageIndexState = atom({
	key: 'LanguageIndexState',
	default: 0,
	effects_UNSTABLE: [persistAtom],
});