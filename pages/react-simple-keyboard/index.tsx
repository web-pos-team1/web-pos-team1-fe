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


export default function Test3() {
    const [layoutName, setLayoutName] = useState<string>('');
    const [input, setInput] = useState<string>('');
    const [languageIndex, setLanguageIndex] = useRecoilState(LanguageIndexState);
    const [layout, setLayout] = useState<LayoutItem>(korea);
    const [middleText, setMiddleText] = useState<string>();
    const layoutList = [korea, english, japanese, chinese];

    const handleShiftButton = () => {
        const shiftToggle = (layoutName === "default" ? "shift" : "default");
        setLayoutName(shiftToggle);
    };

    const onChange = (inputText : string) => {
        console.log("onChange() / inputText: ", inputText);
        if (languageIndex === 0 && layout.layoutCandidates != undefined) { // 한국어 선택했을 경우에만 실행하는 로직
            let lastInput =  inputText.slice(-3);
            console.log("lastInput: ", lastInput);
            if (layout.layoutCandidates[lastInput] === undefined) {
                console.log("==[undefined]==");
                setInput(inputText);
            } else {
                console.log("==[ok]==")
                console.log("middleText: ", middleText);
                console.log("layout.layoutCandidates[lastInput]: ", layout.layoutCandidates[lastInput]);
                let inputSubString0toL3 = inputText.substring(0, inputText.length-3);
                let finalInputWithLCandidates = inputSubString0toL3 + layout.layoutCandidates[lastInput];
                console.log("inputSubString0toL3: ", inputSubString0toL3);
                console.log("finalInputWithLCandidates: ", finalInputWithLCandidates);
                setInput(finalInputWithLCandidates);
                console.log("==[end of ok]==")
            }
            
            
            // let lastInputFromUni = String.fromCharCode(lastInputUni);
            // console.log("onChange() / lastInput: ", lastInput);
            // console.log("onChange() / lastInputUni: ",  lastInputUni);
            // console.log("lastInputFromUni: ", lastInputFromUni);
        }
        
        
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
        <input 
            value={input}
            readOnly
            style={{ width: "800px", height: "30px", fontSize: "20px", marginLeft: "100px"}}
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