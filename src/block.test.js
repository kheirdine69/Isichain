const Block = require("./block");

describe("Block", () => {
  let data, lastBlock, block;

  beforeEach(() => {
    data = "Test data";
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it("sets the `data` to match the input", () => {
    expect(block.data).toEqual(data);
  });

  it("sets the `lastHash` to match the hash of the last block", () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  it("generates a hash based on the correct inputs", () => {
    expect(block.hash).toEqual(
      Block.hash(
        block.timestamp,
        block.lastHash,
        block.data,
        block.nonce,
        block.difficulty
      )
    );
  });

  it("sets a timestamp", () => {
    expect(block.timestamp).not.toBeUndefined();
  });

  it("generates a hash that matches the difficulty", () => {
    expect(block.hash.substring(0, block.difficulty)).toEqual(
      "0".repeat(block.difficulty)
    );
  });

  it("lowers the difficulty for slowly mined block", () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 10000)).toEqual(
      block.difficulty - 1
    );
  });

  it("raises the difficulty for quickly mined block", () => {
    expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(
      block.difficulty + 1
    );
  });
});
