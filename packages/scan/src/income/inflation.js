const { Modules, StakingEvents, SessionEvents } = require("../utils/constants");
const { inflationLogger } = require("../utils/logger");

const inflationEndHeight = 1379482;

function checkInflation1(event, sort, allBlockEvents, blockIndexer) {
  if (blockIndexer.blockHeight >= inflationEndHeight) {
    return;
  }

  const {
    event: { data: treasuryDepositData },
  } = event; // get deposit event data
  if (sort <= 0 || sort >= allBlockEvents.length - 1) {
    return;
  }

  const preEvent = allBlockEvents[sort - 1];
  const {
    event: { section, method, data: rewardData },
  } = preEvent;
  const nextEvent = allBlockEvents[sort + 1];
  const {
    event: { section: nextEventSection, method: nextEventMethod },
  } = nextEvent;

  const preReward =
    section === Modules.Staking && method === StakingEvents.Reward;
  const nextNewSession =
    nextEventSection === Modules.Session &&
    nextEventMethod === SessionEvents.NewSession;
  if (!preReward || !nextNewSession) {
    return;
  }

  const treasuryDepositEventData = treasuryDepositData.toJSON();
  const rewardEventData = rewardData.toJSON();
  const balance = (treasuryDepositEventData || [])[0];

  const data = {
    indexer: blockIndexer,
    balance,
    treasuryDepositEventData,
    rewardEventData,
  };

  inflationLogger.info(blockIndexer.blockHeight, balance);
  return data;
}

// Inflation
function handleStakingEraPayout(event, sort, allBlockEvents, blockIndexer) {
  const inflationCheck1Data = checkInflation1(
    event,
    sort,
    allBlockEvents,
    blockIndexer
  );
  if (inflationCheck1Data) {
    return inflationCheck1Data;
  }

  const {
    event: { data: treasuryDepositData },
  } = event; // get deposit event data
  if (sort <= 0 || sort >= allBlockEvents.length - 1) {
    return;
  }

  const preEvent = allBlockEvents[sort - 1];
  const {
    event: { section, method, data: eraPayoutData },
  } = preEvent;
  const nextEvent = allBlockEvents[sort + 1];
  const {
    event: { section: nextEventSection, method: nextEventMethod },
  } = nextEvent;
  const preEraPayout =
    section === Modules.Staking && method === StakingEvents.EraPayout;
  const nextNewSession =
    nextEventSection === Modules.Session &&
    nextEventMethod === SessionEvents.NewSession;
  if (!preEraPayout || !nextNewSession) {
    return;
  }

  const treasuryDepositEventData = treasuryDepositData.toJSON();
  const eraPayoutEventData = eraPayoutData.toJSON();
  const balance = (treasuryDepositEventData || [])[0];

  const data = {
    indexer: blockIndexer,
    balance,
    treasuryDepositEventData,
    eraPayoutEventData,
  };
  // TODO: insert data to MongoDB

  inflationLogger.info(blockIndexer.blockHeight, balance);
  return data;
}

module.exports = {
  handleStakingEraPayout,
};
