require("dotenv").config();
const { getNextScanHeight, updateScanHeight } = require("./mongo/scanHeight");
const { getExtrinsicCollection } = require("./mongo");
const { getApi } = require("./api");
const { updateHeight } = require("./chain/latestHead");
const { deleteDataFrom } = require("./clean");
const { getLatestHeight } = require("./chain/latestHead");
const { sleep, logger } = require("./utils");
const { getBlockIndexer } = require("./block/getBlockIndexer");
const { handleExtrinsics } = require("./extrinsic");
const { handleEvents } = require("./events");
const {
  blocksWithTreasuryExtrinsics,
  maxKnowHeightWithTreasuryExtrinsic,
} = require("./block/knownTreasuryBlocks");

async function scanKnowBlocks(toScanHeight) {
  let index = blocksWithTreasuryExtrinsics.findIndex(
    (height) => height >= toScanHeight
  );
  while (index < blocksWithTreasuryExtrinsics.length - 1) {
    const height = blocksWithTreasuryExtrinsics[index];
    await scanBlockByHeight(height);
    await updateScanHeight(height);
    index++;
  }
}

async function main() {
  await updateHeight();
  let scanHeight = await getNextScanHeight();
  await deleteDataFrom(scanHeight);

  if (scanHeight < maxKnowHeightWithTreasuryExtrinsic) {
    await scanKnowBlocks(scanHeight);
  }
  scanHeight = maxKnowHeightWithTreasuryExtrinsic + 1;

  while (true) {
    const chainHeight = getLatestHeight();
    if (scanHeight > chainHeight) {
      // Just wait if the to scan height greater than current chain height
      await sleep(1000);
      continue;
    }

    await scanBlockByHeight(scanHeight);
    await updateScanHeight(scanHeight++);
  }
}

async function scanBlockByHeight(scanHeight) {
  const api = await getApi();

  const blockHash = await api.rpc.chain.getBlockHash(scanHeight);
  const block = await api.rpc.chain.getBlock(blockHash);
  const allEvents = await api.query.system.events.at(blockHash);

  const blockIndexer = getBlockIndexer(block.block);

  await handleEvents(allEvents, blockIndexer, block.block.extrinsics);
  await handleExtrinsics(block.block.extrinsics, allEvents, blockIndexer);
  logger.info(`block ${block.block.header.number.toNumber()} done`);
}

async function test() {
  const exCol = await getExtrinsicCollection();
  const exs = await exCol
    .find({
      $or: [{ section: "proxy", name: "proxy" }, { section: "treasury" }],
    })
    .sort({ "indexer.blockHeight": 1 })
    .toArray();

  console.log(exs);
  const heightArr = exs.map((ex) => ex.indexer.blockHeight);
  const str = heightArr.join(",\n");

  require("fs").writeFile("./helloworld.txt", str, function (err) {
    if (err) return console.log(err);
    console.log("Hello World > helloworld.txt");
  });
}

// FIXME: log the error
test().catch(console.error);
