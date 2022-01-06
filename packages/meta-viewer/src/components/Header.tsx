import styled from "styled-components";

interface HeaderProps {
    title: string;
    offset: number;
    subTitle?: string;
}

const Layout = styled.div`
  background: rgb(49, 51, 53);
  padding: 2px 4px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 16px;
  color: rgb(232, 191, 106);
`;

const SubTitle = styled.span`
  color: rgb(152, 118, 170);
  font-size: 14px;
`;

const OffsetNum = styled.div`
  font-size: 12px;
  color: rgb(153, 164, 178);
`;

export function Header(props: HeaderProps) {
    return (
        <Layout>
            <div>
                <Title>{props.title}</Title>
                {props.subTitle && <SubTitle>
                    <span> - </span>
                    <span>{props.subTitle}</span>
                </SubTitle>}
            </div>
            <OffsetNum>[{props.offset}]</OffsetNum>
        </Layout>
    );
}
