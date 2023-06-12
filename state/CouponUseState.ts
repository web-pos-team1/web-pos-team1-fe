import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 쿠폰 사용금액 저장 - BE에게 order정보 전달할 때 사용
export const CouponUseState = atom({
	key: 'CouponUseState',
	default: 0,
	effects_UNSTABLE: [persistAtom],
});