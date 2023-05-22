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
    const layoutList = [korea, english, japanese, chinese];

    const handleShiftButton = () => {
        const shiftToggle = (layoutName === "default" ? "shift" : "default");
        setLayoutName(shiftToggle);
    };

    const onChange = (inputText : string) => {
        console.log("onChange() / inputText: ", inputText);
        let disassemble_text = Hangul.disassemble(inputText);
        let assemble_text = Hangul.assemble(Hangul.disassemble(inputText));
        console.log("disassemble_text: ", disassemble_text);
        console.log("assemble_text: ", assemble_text);
        setInput(assemble_text);
        
    };

    const onKeyPress = (button : string) => {
        console.log("Button pressed", button);
        /**
         * Shift 기능
         */
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
        />
    </div>
  );
}