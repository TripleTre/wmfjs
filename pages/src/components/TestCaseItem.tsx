import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { WindowsMetaFile } from "@wmfjs/core";
import { SvgPlayback } from "@wmfjs/svg-playback/lib";

const Frame = styled.div`
  background-color: #fff;
  background-image: linear-gradient(45deg, #00000036 25%, transparent 25%, transparent 75%, #00000036 75%, #00000036), linear-gradient(45deg, #00000036 25%, transparent 25%, transparent 75%, #00000036 75%, #00000036);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgb(96, 96, 96);
  border-radius: 4px;
  position: relative;
  flex-direction: column;
`;

const Layout = styled.div`
  display: flex;
  align-items: center;
  margin: 6px;
`;

const Lable = styled.div`
  color: rgb(170, 170, 170);
  margin: 4px;
  width: 80px;
  text-align: center;
`;

const Format = styled.div`
  width: 100%;
  margin-top: 2px;
  background: rgb(60,63,65);
  color: #fff;
  text-align: center;
  font-size: 14px;
`;

const Png = styled.img`
  width: 100%;
`;

const View = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
`;

export interface TestCaseItemProps {
    group: string;
    name: string;
}

export function TestCaseItem(props: TestCaseItemProps) {

    const svgAnchor = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch(`/assets/wmf/${props.group}/${props.name}.wmf`)
            .then(response => {
                return response.arrayBuffer();
            }).then(buf => {
                const wmf = new WindowsMetaFile();
                wmf.deserialize(buf);
                const svgPlayback = new SvgPlayback(wmf);
                svgPlayback.display();
                if (svgAnchor.current) {
                    svgPlayback.svgElement.style.width = "100%";
                    svgAnchor.current.appendChild(svgPlayback.svgElement);
                }
            });
    }, []);

    return (
        <Layout>
            <Lable>{props.name}</Lable>
            <Frame>
                <View>
                    <Png src={`/assets/png/${props.group}/${props.name}.png`}/>
                </View>
                <Format>png</Format>
            </Frame>
            <Frame>
                <View ref={svgAnchor} />
                <Format>svg</Format>
            </Frame>
        </Layout>
    )
}