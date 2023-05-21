import React, { useEffect, useRef } from "react";
import Keyboard from "hangul-virtual-keyboard";
import { parseProps, changedProps } from "../lib/services/Utilities";
import "hangul-virtual-keyboard/build/css/index.css";

export default function KeyboardReact(props: any) {
  const cssClass = props.baseClass || "react-simple-keyboard";
  const initRef = useRef<any>();
  const keyboardRef = useRef();
  const previousProps = useRef(props);

  useEffect(() => {
    const parsedProps = parseProps(props);

    /**
     * Initialize simple-keyboard
     */
    if (!initRef.current) {
      initRef.current = true;
      parsedProps.debug && console.log("ReactSimpleKeyboard: Init");
      keyboardRef.current = new Keyboard(`.${cssClass}`, parsedProps);
      parsedProps.keyboardRef && parsedProps.keyboardRef(keyboardRef.current);
    }

    const updatedProps = changedProps(previousProps.current, parsedProps);

    /**
     * Only trigger render if props changed
     */
    if (updatedProps.length) {
      let keyboard = keyboardRef.current ? keyboardRef.current : ;
      previousProps.current = parsedProps;
      if (keyboard != undefined) {
        keyboard.setOptions(parsedProps);
      }
      
      parsedProps.debug &&
        console.log(
          "ReactSimpleKeyboard - setOptions called due to updated props:",
          updatedProps
        );
    }
  }, [initRef, cssClass, previousProps, props]);

  return (
    <>
    <div className={cssClass} >
      Keyboard.tsx 파일입니다
    </div>
    </>
    );
};