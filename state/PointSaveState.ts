import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 포인트 적립 금액 - BE에게 order정보 전달할 때 사용
export const PointSaveState = atom({
	key: 'PointSaveState',
	default: 0,
	effects_UNSTABLE: [persistAtom],
});