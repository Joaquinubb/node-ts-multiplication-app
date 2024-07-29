import { createTable } from "../../src/domain/use-cases/create-table.use-case";
import { saveFile } from "../../src/domain/use-cases/save-file.use-case";
import { ServerApp } from "../../src/presentation/server-app";
describe("ServerApp", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileDestination: "test/test-destination",
    fileName: "test-filename",
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should create ServerApp instance", () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });
  test("should run ServerApp with options", () => {
    const logSpy = jest.spyOn(console, "log");
    const createTableSpy = jest.spyOn(createTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(saveFile.prototype, "execute");
    ServerApp.run(options);
    expect(logSpy).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith("Server running...");
    expect(logSpy).toHaveBeenCalledWith("File created successfully");
    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
  });
  test("should run ServerApp with custom values mocked", () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("1 x 2 = 2");
    const saveFileMock = jest.fn().mockReturnValue(false);
    console.log = logMock;
    console.error = logErrorMock;
    createTable.prototype.execute = createMock;
    saveFile.prototype.execute = saveFileMock;
    ServerApp.run(options);
    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: "1 x 2 = 2",
      fileDestination: options.fileDestination,
      fileName: options.fileName,
    });
    expect(logErrorMock).not.toHaveBeenCalledWith();
  });
});
