import styled from "styled-components";
import { ChromePicker } from 'react-color';
import { SyntheticEvent, useCallback, useRef, useState } from "react";

const Layout = styled.div`
`;

const ViewBlock = styled.div<{ color: string }>`
  height: 22px;
  width: 72px;
  background: ${props => props.color};
  border: 1px solid rgb(186, 186, 186);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`;

const StyledPicker = styled(ChromePicker)`
  position: absolute;
  left: calc(100% + 6px);
`;

interface ColorEditorProps {
    value: number;
}

export function ColorEditor(props: ColorEditorProps) {

    const block = useRef(null);
    const [pickerVisible, setPickerVisible] = useState(false);
    const str = "#" + props.value.toString(16).padStart(6, "0");
    const [hex, setHex] = useState(str);
    const changeHandler = useCallback((color: any) => {
        setHex(color.hex);
    }, []);

    const showPicker = useCallback((evt: SyntheticEvent) => {
        if (evt.target === block.current) {
            setPickerVisible(!pickerVisible);
        }
    }, [pickerVisible]);

    return (
        <Layout>
            <ViewBlock ref={block} onClick={showPicker} color={hex}>
                {pickerVisible && <StyledPicker disableAlpha={true} color={hex} onChangeComplete={changeHandler} />}
            </ViewBlock>
        </Layout>
    )
}