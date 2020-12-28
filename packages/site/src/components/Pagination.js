import React from "react";
import { Icon, Pagination } from "semantic-ui-react";
import styled from "styled-components";

import {PRIMARY_THEME_COLOR} from "../constants"

const Wrapper = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;

  a:focus {
    outline-color: ${PRIMARY_THEME_COLOR} !important;
  }
`;

const CustomPagination = (props) => {
  return (
    <Wrapper>
      <Pagination
        boundaryRange={1}
        siblingRange={1}
        ellipsisItem={{
          content: <Icon name="ellipsis horizontal" />,
          icon: true,
        }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        {...props}
      />
    </Wrapper>
  );
};

export default CustomPagination;
