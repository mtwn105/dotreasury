import React from "react";
import styled from "styled-components";
import { Image } from "semantic-ui-react";

import Item from "./Item";
import SubTitle from "../../components/SubTitle";
import FoldableItem from "./FoldableItem";

const Wrapper = styled.div`
  max-width: 100%;
`;

const Header = styled(SubTitle)`
  margin-bottom: 16px;
`;

const LoadingWrapper = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Timeline = ({ data, loading }) => {
  return (
    <Wrapper>
      <Header>Timeline</Header>
      {(loading && (
        <LoadingWrapper>
          <Image src="/imgs/loading.svg" />
        </LoadingWrapper>
      )) || (
        <>
          {(data || []).map((item, index) =>
            item.subTimeline ? (
              <FoldableItem
                key={item.index}
                data={item.subTimeline}
                polkassembly={item.index}
                defaultUnfold={item.defaultUnfold}
                expired={item.expired}
                end={item.end}
              />
            ) : (
              <Item key={index} data={item} />
            )
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Timeline;
