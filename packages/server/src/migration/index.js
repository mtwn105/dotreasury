const { getProposalCollection } = require("../mongo");
const { getLinkCollection } = require("../mongo-admin");

const main = async () => {
  try {
    console.log("migration start");
    const proposalCol = await getProposalCollection();
    const linkCol = await getLinkCollection();
    const proposalLinks = await linkCol.find({ type: "proposals" }).toArray();
    await Promise.all(
      proposalLinks.map(async (item) => {
        await proposalCol.updateOne(
          {
            proposalIndex: item.indexer,
          },
          {
            $set: { links: item.links },
          }
        );
      })
    );
    console.log("migration success");
    process.exit(0);
  } catch (err) {
    console.log("migration error", err);
    process.exit(1);
  }
};

main();
