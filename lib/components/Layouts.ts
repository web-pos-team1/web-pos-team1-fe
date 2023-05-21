import { LayoutItem, LayoutItemObj } from "./../interfaces";

import chinese from "../keyboardLayouts/chinese";
import english from "../keyboardLayouts/english";
import japanese from "../keyboardLayouts/japanese";
import korean from "../keyboardLayouts/korean";

class SimpleKeyboardLayouts {
  layouts: LayoutItemObj = {
    chinese,
    english,
    japanese,
    korean,
  };

  public get = (layout?: string): LayoutItem | LayoutItemObj =>
    layout ? this.layouts[layout] : this.layouts;
}

export default SimpleKeyboardLayouts;