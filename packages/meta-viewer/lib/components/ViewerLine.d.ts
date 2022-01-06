import { ReactNode } from "react";
interface ViewerLineProps {
    header: string;
    offset: number;
    subHeader?: string;
    children?: ReactNode | undefined;
}
export declare function ViewerLine(props: ViewerLineProps): JSX.Element;
export {};
