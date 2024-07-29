const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("../../../src/config/plugins/args.plugin");
  return yarg;
};

describe("argsPlugin", () => {
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });
  test("should return default values", async () => {
    const argv = await runCommand(["-b", "5"]);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });
  test("should return connfiguration with custom values", async () => {
    const options: string[] = [
      "-b",
      "3",
      "-l",
      "5",
      "-s",
      "true",
      "-n",
      "testTable",
      "-d",
      "testOutput",
    ];
    const argv = await runCommand(options);
    expect(argv).toEqual(
      expect.objectContaining({
        b: 3,
        l: 5,
        s: true,
        n: "testTable",
        d: "testOutput",
      })
    );
  });
});
