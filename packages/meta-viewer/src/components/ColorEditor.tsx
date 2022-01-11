import styled from "styled-components";
import { ChromePicker } from 'react-color';
import { SyntheticEvent, useCallback, useRef, useState } from "react";

const Layout = styled.div`
`;

const ViewBlock = styled.div<{ color: string }>`
  height: 24px;
  width: 62px;
  background: ${props => props.color};
  border: 1px solid rgb(186, 186, 186);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
`;

const StyledPicker = styled(ChromePicker)`
  position: absolute;
  left: calc(100% + 6px);
  z-index: 9;
`;

interface ColorEditorProps {
    value: number;
    onChange?: (value: number) => void;
    editable?: boolean;
}

export function ColorEditor(props: ColorEditorProps) {

    const block = useRef(null);
    const [pickerVisible, setPickerVisible] = useState(false);
    const hexStr = "#" + props.value.toString(16).padStart(6, "0");

    const changeHandler = useCallback((color: any) => {
        if (props.onChange && props.editable) {
            props.onChange(parseInt(color.hex.replace("#", ""), 16));
        }
    }, [props.onChange, props.editable]);

    const showPicker = useCallback((evt: SyntheticEvent) => {
        if (evt.target === block.current) {
            setPickerVisible(!pickerVisible);
        }
    }, [pickerVisible]);

    return (
        <Layout>
            <ViewBlock ref={block} onClick={showPicker} color={hexStr}>
                {pickerVisible && <StyledPicker disableAlpha={true} color={hexStr} onChangeComplete={changeHandler} />}
            </ViewBlock>
        </Layout>
    )
}