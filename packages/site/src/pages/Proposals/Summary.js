import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

import Text from "../../components/Text";
import TextMinor from "../../components/TextMinor";
import CountDown from "../../components/CountDown";
import BlocksTime from "../../components/BlocksTime";
import { mrgap } from "../../styles";

import {
  fetchProposalsSummary,
  proposalSummarySelector,
} from "../../store/reducers/proposalSlice";
import {
  fetchSpendPeriod,
  spendPeriodSelector,
} from "../../store/reducers/chainSlice";
import {
  fetchTreasury,
  treasurySelector,
} from "../../store/reducers/burntSlice";

const Wrapper = styled.div`
  background: #FFF;
  border: 1px solid #EEE;
  padding: 16px 20px 8px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  & > div:not(:last-child) {
    margin-right: 16px;
  };
  & > div {
    margin-bottom: 8px;
  };
  justify-content: space-between;
  flex-wrap: wrap;
  @media screen and (max-width: 1140px) {
    justify-content: flex-start;
  }
`

const Item = styled.div`
  min-width: 120px;
  &.grow {
    flex-grow: 1;
  }
  &.countdown {
    min-width: 0;
  }
  &.right {
    text-align: right;
  }
  &.spend-period {
    min-width: 180px;
  }
  & > div:last-child {
    justify-content: flex-end;
  }

  @media screen and (max-width: 1140px) {
    &.grow {
      flex-grow: 0;
    }
    &.countdown {
      display: none;
    }
    &.right {
      text-align: left;
    }
    &.spend-period {
      min-width: 120px;
    }
    & > div:last-child {
      justify-content: flex-start;
    }
  }
`

const Title = styled(TextMinor)`
  line-height: 24px;
`

const Value = styled(Text)`
  line-height: 32px;
  font-weight: bold;
  font-size: 18px;
`

const Unit = styled(TextMinor)`
  line-height: 32px;
  font-weight: bold;
  font-size: 18px;
`

const ValueWrapper = styled.div`
  display: flex;
  ${css`${mrgap("4px")}`}
`

const Summary = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProposalsSummary());
    dispatch(fetchSpendPeriod());
    dispatch(fetchTreasury());
  }, [dispatch]);

  const summary = useSelector(proposalSummarySelector);
  const spendPeriod = useSelector(spendPeriodSelector);
  const treasury = useSelector(treasurySelector);

  return (
    <Wrapper>
      <Item>
        <Title>Ongoing</Title>
        <Value>{summary.numOfOngoing}</Value>
      </Item>
      <Item>
        <Title>Approved</Title>
        <Value>{summary.numOfApproved}</Value>
      </Item>
      <Item>
        <Title>Awarded</Title>
        <Value>{summary.numOfAwarded}</Value>
      </Item>
      <Item className="grow">
        <Title>Total</Title>
        <Value>{summary.total}</Value>
      </Item>
      <Item className="right">
        <Title>Available</Title>
        <ValueWrapper>
          <Value>{treasury.free?.toFixed(0)}</Value>
          <Unit>KSM</Unit>
        </ValueWrapper>
      </Item>
      <Item className="right">
        <Title>Next burn</Title>
        <ValueWrapper>
          <Value>{(treasury.burnPercent * treasury.free)?.toFixed(4)}</Value>
          <Unit>KSM</Unit>
        </ValueWrapper>
      </Item>
      <Item className="right spend-period">
        <Title>Spend period</Title>
        <BlocksTime blocks={spendPeriod.restBlocks}
          ValueWrapper={Value}
          UnitWrapper={Unit}
          SectionWrapper={Fragment}
          TimeWrapper={ValueWrapper}
          unitMapper={{ d: "Day" }}
          pluralUnitMapper={{ d: "Days" }}
        />
      </Item>
      <Item className="countdown">
        <CountDown percent={spendPeriod.progress} />
      </Item>
    </Wrapper>
  )
}

export default Summary;
