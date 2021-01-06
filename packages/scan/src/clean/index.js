const { getBlockCollection } = require("../mongo");
const { getExtrinsicCollection } = require("../mongo");
const { getTipCollection } = require("../mongo");
const { getBountyCollection } = require("../mongo");
const { getBountyTimelineCollection } = require("../mongo");
const { getProposalCollection } = require("../mongo");

async function deleteDataFrom(blockHeight) {
  const blockCol = await getBlockCollection();
  await blockCol.deleteMany({ "header.number": { $gte: blockHeight } });

  await deleteTipFrom(blockHeight);
  await deleteBountyFrom(blockHeight);
  await deleteBountyTimelineFrom(blockHeight);
  await deleteProposalFrom(blockHeight);
}

async function deleteExtrinsicsFrom(blockHeight) {
  const col = await getExtrinsicCollection();
  await col.deleteMany({ "indexer.blockHeight": { $gte: blockHeight } });
}

async function deleteTipFrom(blockHeight) {
  const col = await getTipCollection();
  await col.deleteMany({ "indexer.blockHeight": { $gte: blockHeight } });
}

async function deleteBountyFrom(blockHeight) {
  const col = await getBountyCollection();
  await col.deleteMany({ "indexer.blockHeight": { $gte: blockHeight } });
}

async function deleteBountyTimelineFrom(blockHeight) {
  const col = await getBountyTimelineCollection();
  await col.deleteMany({ "indexer.blockHeight": { $gte: blockHeight } });
}

async function deleteProposalFrom(blockHeight) {
  const col = await getProposalCollection();
  await col.deleteMany({ "indexer.blockHeight": { $gte: blockHeight } });
}

module.exports = {
  deleteDataFrom,
};
