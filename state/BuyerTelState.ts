import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 구매자의 전화번호 저장
export const BuyerTelState = atom({
	key: 'BuyerTelState',
	default: '',
	effects_UNSTABLE: [persistAtom],
});