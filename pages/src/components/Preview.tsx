import { SvgPlayback } from "@wmfjs/svg-playback";
import { RecordType, WindowsMetaFile } from "@wmfjs/core";
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
            const wmf = new WindowsMetaFile();
            wmf.deserialize(props.src);
            console.log("wmf1", wmf);
            // const resultBuffer = wmf.serialize();
            // const wmf2 = new WindowsMetaFile();
            // wmf2.deserialize(resultBuffer);
            // console.log("wmf2", wmf2);
            const svgPlayback = new SvgPlayback(wmf);
            svgPlayback.display();
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
