const { getExtrinsicCollection, getEventCollection } = require("./mongo");

async function test() {
  const exCol = await getExtrinsicCollection();
  const exs = await exCol
    .find({
      $or: [{ section: "proxy", name: "proxy" }, { section: "treasury" }],
    })
    .sort({ "indexer.blockHeight": 1 })
    .toArray();

  const heightArr = exs.map((ex) => ex.indexer.blockHeight);

  const eventCol = await getEventCollection();
  const events = await eventCol
    .find({ section: "treasury" })
    .sort({ "indexer.blockHeight": 1 })
    .toArray();

  const eventsHeightArr = events.map((e) => e.indexer.blockHeight);

  const set = new Set([...heightArr, ...eventsHeightArr]);
  const arr = [...set];
  arr.sort((a, b) => a - b);

  const str = heightArr.join(",\n");

  require("fs").writeFile("./helloworld.txt", str, function (err) {
    if (err) return console.log(err);
    console.log("Hello World > helloworld.txt");
  });
}

// FIXME: log the error
test().catch(console.error);
