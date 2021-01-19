import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";

import Table from "../../components/Table";
import TableLoading from "../../components/TableLoading";
import TableCell from "../../components/TableCell";
import TimeLabel from "../../components/TimeLabel";
import User from "../../components/User";
import { scanHeightSelector } from "../../store/reducers/chainSlice";
import Label from "../../components/Label";
import DateShow from "../../components/DateShow";
import PolygonLabel from "../../components/PolygonLabel";
import ExplorerLink from "../../components/ExplorerLink";

import {
  bountyDetailSelector,
} from "../../store/reducers/bountySlice";
import { mrgap } from "../../styles";

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${css`${mrgap("16px")}`}
`;

const BountyLifeCycleTable = ({ loading }) => {
  const bountyDetail = useSelector(bountyDetailSelector);
  const scanHeight = useSelector(scanHeightSelector);

  return (
    <TableLoading loading={loading}>
      <Table striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Bounty Life Cycle</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <TableCell title={"Created"}>
                <FlexWrapper>
                  <div><DateShow value={bountyDetail.proposeTime} /></div>
                  <ExplorerLink href={`/block/${bountyDetail.proposeAtBlockHeight}`}>
                    <PolygonLabel value={bountyDetail.proposeAtBlockHeight} />
                  </ExplorerLink>
                </FlexWrapper>
              </TableCell>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <TableCell title="Status">
                <FlexWrapper>
                  <div>{bountyDetail.latestState?.state}</div>
                  <TimeLabel value={bountyDetail.latestState?.indexer?.blockTime} />
                </FlexWrapper>
              </TableCell>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <TableCell title={"Curator"}>
                {bountyDetail.curator ? <User address={bountyDetail.curator} /> : "--"}
              </TableCell>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <TableCell title={"Update Due"}>
                {bountyDetail.updateDue
                  ? <FlexWrapper>
                    <div>{bountyDetail.updateDue}</div>
                    <Label>{`${bountyDetail.updateDue - scanHeight} blocks`}</Label>
                  </FlexWrapper>
                  : "--"}
              </TableCell>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <TableCell title={"Beneficiary"}>
                {bountyDetail.beneficiary ? <User address={bountyDetail.beneficiary} /> : "--"}
              </TableCell>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <TableCell title={"Unlock At"}>
                {bountyDetail.unlockAt
                  ? <FlexWrapper>
                    <div>{bountyDetail.unlockAt}</div>
                    <Label>{`${bountyDetail.unlockAt - scanHeight} blocks`}</Label>
                  </FlexWrapper>
                  : "--"}
              </TableCell>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </TableLoading>
  );
};

export default BountyLifeCycleTable;