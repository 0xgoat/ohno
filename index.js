const fs = require("fs");

const BASE_TOKENS = 4500;

async function processFile(fileName) {
  const fileContent = fs.readFileSync(fileName, "utf-8");
  const addresses = fileContent
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((address) => address.startsWith("0x"));

  for (const address of addresses) {
    const slice = address.slice(2, 4).toLowerCase();
    const filename = `${slice}.json`;
    const jsonContent = fs.readFileSync(filename, "utf-8");
    const jsonData = JSON.parse(jsonContent);
    const multiplier = jsonData[address.toLowerCase()];
    if (multiplier) {
      console.log(`${address}: ${multiplier * BASE_TOKENS} OHNO`);
    }
  }
}

const fileName = "wallets.txt";

processFile(fileName)
  .then(() => {})
  .catch((error) => console.error("Error:", error));
