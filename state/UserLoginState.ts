import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const UserLoginState = atom({
	key: 'UserLoginState',
	default: false,
	effects_UNSTABLE: [persistAtom],
});
