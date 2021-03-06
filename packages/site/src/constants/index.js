export const TEXT_DARK_MAJOR = "#1D253C";
export const TEXT_DARK_MINOR = "rgba(29, 37, 60, 0.64)";
export const PRIMARY_THEME_COLOR = "#DF405D";
export const SECONDARY_THEME_COLOR = "#FFEEF1";

export const OVERVIEW_PROPOSALS_COLOR = "#DF405D";
export const OVERVIEW_TIPS_COLOR = "#F1AC26";
export const OVERVIEW_BOUNTIES_COLOR = "#635FEC";
export const OVERVIEW_BURNT_COLOR = "#EE7735";

export const TipStatus = {
  Tipping: "Tipping",
  Closing: "Closing",
  Closed: "Closed",
  Retracted: "Retracted",
};

export const ProposalStatus = {
  Approved: "Approved",
  Rejected: "Rejected",
};

export const TreasuryAccount =
  "F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29";

export const DEFAULT_NODE_URL = "wss://kusama.elara.patract.io";
export const DEFAULT_NODES = [
  {
    name: "Parity",
    url: "wss://kusama-rpc.polkadot.io"
  },
  {
    name: "OnFinality",
    url: "wss://kusama.api.onfinality.io/public-ws"
  },
  {
    name: "Patract Elara",
    url: "wss://kusama.elara.patract.io"
  }
];
