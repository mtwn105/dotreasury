const { getStatusCollection } = require("./index");

const genesisHeight = 1;
const mainScanName = "main-scan-height";
const incomeScanName = "income-scan-height";

async function getNextScanHeight() {
  const statusCol = await getStatusCollection();
  const heightInfo = await statusCol.findOne({ name: mainScanName });

  if (!heightInfo) {
    return genesisHeight;
  } else if (typeof heightInfo.value === "number") {
    return heightInfo.value + 1;
  } else {
    console.error("Scan height value error in DB!");
    process.exit(1);
  }
}

async function getIncomeNextScanHeight() {
  const statusCol = await getStatusCollection();
  const heightInfo = await statusCol.findOne({ name: incomeScanName });

  if (!heightInfo) {
    return genesisHeight;
  } else if (typeof heightInfo.value === "number") {
    return heightInfo.value + 1;
  } else {
    console.error("Scan height value error in DB!");
    process.exit(1);
  }
}

async function updateScanHeight(height) {
  const statusCol = await getStatusCollection();
  await statusCol.findOneAndUpdate(
    { name: mainScanName },
    { $set: { value: height } },
    { upsert: true }
  );
}

async function updateIncomeScanHeight(height) {
  const statusCol = await getStatusCollection();
  await statusCol.findOneAndUpdate(
    { name: incomeScanName },
    { $set: { value: height } },
    { upsert: true }
  );
}

module.exports = {
  getNextScanHeight,
  updateScanHeight,
  getIncomeNextScanHeight,
  updateIncomeScanHeight,
};
