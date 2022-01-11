import { SvgPlayback } from "@wmfjs/svg-playback";
import { parser } from "@wmfjs/core";
import { useEffect, useRef } from "react";
import styled from "styled-components";

interface PreviewProps {
    src: ArrayBuffer;
}

const Layout = styled.div`
`;

const SvgLayout = styled.div`
`;

export function Preview(props: PreviewProps) {

    const svgAnchor = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (props.src.byteLength > 0) {
            const wmf = parser(props.src);
            const svgPlayback = new SvgPlayback(wmf);
            if (svgAnchor.current) {
                svgAnchor.current.appendChild(svgPlayback.svgElement);
            }
        }
    }, [props.src]);

    return (
        <Layout>
            <SvgLayout ref={svgAnchor} />
        </Layout>
    )
}
