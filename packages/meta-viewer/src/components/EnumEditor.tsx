interface EnumEditorProps {
    enum: any;
    value: number;
    editable: boolean;
    onChange?: (value: number) => void;
}

export function EnumEditor(props: EnumEditorProps) {
    const keys = Object.keys(props.enum).filter(v => /^\d+$/.test(v));
    return (
        <select>
            {keys.map(k => {
                return (
                    <option key={props.enum[k]}>{props.enum[k]}</option>
                );
            })}
        </select>
    );
}
