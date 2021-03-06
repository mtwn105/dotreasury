import React from "react";
import styled from "styled-components";
import {Popup} from "semantic-ui-react";

import TextMinor from "../TextMinor";
import { TEXT_DARK_MAJOR } from "../../constants";
import { useDisablePopup } from "../../utils/hooks";

const TextUsername = styled(TextMinor)`
  white-space: nowrap;
  cursor: pointer;
  flex-grow: 1;
  &:hover {
    color: ${TEXT_DARK_MAJOR};
    text-decoration-line: underline;
  }
`;

const Username = ({ address, name, ellipsis, popup }) => {
  const disabledPopup = useDisablePopup();
  let displayAddress = address;
  if (ellipsis && address) {
    displayAddress = `${address.substring(0, 6)}...${address.substring(address.length - 6, address.length)}`
  }
  const displayName = name ? name : displayAddress;
  return (
    <Popup
      content={name ? `${name} ${address}` : address}
      size='mini'
      disabled={!popup || disabledPopup}
      trigger={<TextUsername>{displayName}</TextUsername>}
    />
  );
};

export default Username;
