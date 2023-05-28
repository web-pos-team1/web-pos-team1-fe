import React, { useState, useEffect } from "react"
import Keyboard from 'react-simple-keyboard';
import "react-simple-keyboard/build/css/index.css";
import korea from '../../lib/keyboardLayouts/korean';
import english from "@/lib/keyboardLayouts/english";
import japanese from "@/lib/keyboardLayouts/japanese";
import chinese from "@/lib/keyboardLayouts/chinese";
import { useRecoilState } from "recoil";
import { LanguageIndexState } from "@/state/LanguageIndexState";
import { LayoutItem } from "@/lib/interfaces";
import Header from "@/components/Header";
import Hangul from "hangul-js";

export default function TestKeyboard() {
    const [layoutName, setLayoutName] = useState<string>('');
    const [input, setInput] = useState<string>('');
    const [languageIndex, setLanguageIndex] = useRecoilState(LanguageIndexState);
    const [layout, setLayout] = useState<LayoutItem>(korea);
    const layoutList: LayoutItem[] = [korea, english, japanese, chinese];

    const [currentIndex, setCurrentIndex] = useState<number>(languageIndex); // [한, 영, 일, 중] - 한(0, default)

    const handleShiftButton = () => {
        const shiftToggle: string = (layoutName === "default" ? "shift" : "default");
        setLayoutName(shiftToggle);
    };

    const onChange = (inputText: string) => {
        console.log("onChange() / inputText: ", inputText);
        let disassembleText: string[] = Hangul.disassemble(inputText);
        let assembleText: string = Hangul.assemble(Hangul.disassemble(inputText));
        console.log("disassemble_text: ", disassembleText);
        console.log("assemble_text: ", assembleText);
        let splitedAssembleTextList = assembleText.split("한/영");
        console.log("splitedAssembleTextList: ", splitedAssembleTextList);
        let finalAssembleText = splitedAssembleTextList.join('');
        setInput(finalAssembleText);
        
    };
    const handleChangeLanguageButton = () => {
        if (currentIndex === 0) {
            setLayout(english);
            setCurrentIndex(1)
        } else if (currentIndex === 1) {
            setLayout(korea);
            setCurrentIndex(0)
        }
    }

    const onKeyPress = (button : string) => {
        console.log("Button pressed", button);
        /**
         * Shift 기능
         */
        if (button === "한/영") {
            handleChangeLanguageButton();
            return;
        }
        if (button === "{lock}" || button === "{shift}") handleShiftButton();
    };

    useEffect(() => {
        setLayout(layoutList[languageIndex]);
    }, [languageIndex])
  return (
    <div>
        <Header 
            languageIndex={languageIndex}
            setLanguageIndex={setLanguageIndex}
        />
        <h1>react-simple-keyboard page</h1>
        <textarea 
            value={input}
            style={{ width: "800px", height: "30px", fontSize: "20px", marginLeft: "100px"}}
            readOnly
        />
        <Keyboard 
            onChange={onChange}
            onKeyPress={onKeyPress}
            newLineOnEnter={true}
            layout={layout.layout}
            layoutName={layoutName}
            theme={"hg-theme-default hg-layout-default myTheme"}
            buttonTheme={[
                {
                  class: "hg-red",
                  buttons: "Q W E R T Y q w e r t y"
                },
                {
                    class: "hg-space-btn",
                    buttons: "{space}"
                }
              ]}
        />
    </div>
  );
}