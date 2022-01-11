import { jsx as _jsx } from "react/jsx-runtime";
import styled from "styled-components";
import { ChromePicker } from 'react-color';
import { useCallback, useRef, useState } from "react";
const Layout = styled.div `
`;
const ViewBlock = styled.div `
  height: 24px;
  width: 62px;
  background: ${props => props.color};
  border: 1px solid rgb(186, 186, 186);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
`;
const StyledPicker = styled(ChromePicker) `
  position: absolute;
  left: calc(100% + 6px);
  z-index: 9;
`;
export function ColorEditor(props) {
    const block = useRef(null);
    const [pickerVisible, setPickerVisible] = useState(false);
    const hexStr = "#" + props.value.toString(16).padStart(6, "0");
    const changeHandler = useCallback((color) => {
        if (props.onChange && props.editable) {
            props.onChange(parseInt(color.hex.replace("#", ""), 16));
        }
    }, [props.onChange, props.editable]);
    const showPicker = useCallback((evt) => {
        if (evt.target === block.current) {
            setPickerVisible(!pickerVisible);
        }
    }, [pickerVisible]);
    return (_jsx(Layout, { children: _jsx(ViewBlock, Object.assign({ ref: block, onClick: showPicker, color: hexStr }, { children: pickerVisible && _jsx(StyledPicker, { disableAlpha: true, color: hexStr, onChangeComplete: changeHandler }, void 0) }), void 0) }, void 0));
}
