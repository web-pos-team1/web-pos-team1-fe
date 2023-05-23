import { LayoutItem } from "../interfaces";

/**
 * Layout: Korean
 */
export default <LayoutItem> {
  layout: {
    default: [
      "1 2 3 4 5 6 7 8 9 0 - ( ) {bksp}",
      "ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ",
      "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ",
      "ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . /",
      "{shift} {space} 한/영",
    ],
    shift: [
        "1 2 3 4 5 6 7 8 9 0 - {bksp}",
        "ㅃ ㅉ ㄸ ㄲ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ",
        "ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ",
        "ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . /",
        "{shift} {space} 한/영",
      ],
  }
}