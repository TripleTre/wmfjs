import styled from "styled-components";
import { useEffect } from "react";
import { TestCaseItem } from "../components/TestCaseItem";

const Layout = styled.div`
  height: 100vh;
  background: rgb(43, 43, 43);
  overflow: scroll;
`;

const Group = styled.div`
`;

const GroupTitle = styled.div`
  background: rgb(60, 63, 65);
  color: rgb(188, 112, 49);
`;

const GroupContent = styled.div`
`;

const ASSETS: any = {
    drawing: ["polygon", "arc", "chord", "ellipse", "line-to"],
    // drawing: ["arc"],
}

export function TestCases() {

    const types = Object.keys(ASSETS);

    return (
        <Layout>
            {types.map(t => {
                return (
                    <Group key={t}>
                        <GroupTitle>{t}</GroupTitle>
                        <GroupContent>
                            {ASSETS[t].map((n: string) => {
                                return (
                                    <TestCaseItem group={t} name={n} key={n} />
                                );
                            })}
                        </GroupContent>
                    </Group>
                );
            })}
        </Layout>
    )
}
