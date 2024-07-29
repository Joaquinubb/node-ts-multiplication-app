import { saveFile } from "../../../src/domain/use-cases/save-file.use-case";
import fs, { write } from "fs";

describe("saveFileUseCase", () => {
  const customOptions = {
    fileContent: "custom content",
    fileDestination: "test/custom-outputs",
    fileName: "custom-table-name",
  };
  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    const outputFolderExist = fs.existsSync("test/outputs");
    if (outputFolderExist) fs.rmSync("test/outputs", { recursive: true });
    const customOutputFolderExist = fs.existsSync(
      customOptions.fileDestination
    );
    if (customOutputFolderExist) {
      fs.rmSync(customOptions.fileDestination, { recursive: true });
    }
  });
  test("should save file with deafult values", () => {
    const SaveFile = new saveFile();
    const options = {
      fileContent: "test content",
      fileName: "test",
      fileDestination: "test/outputs",
    };
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;
    const result = SaveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });
  test("should save file with custom values", () => {
    const SaveFile = new saveFile();
    const result = SaveFile.execute(customOptions);
    const checkFile = fs.existsSync(customFilePath);
    const fileContent = fs.readFileSync(customFilePath, { encoding: "utf-8" });
    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);
  });
  test("should return false if directory should not be created", () => {
    const SaveFile = new saveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom error message from testing");
    });
    const result = SaveFile.execute(customOptions);
    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  });
  test("should return false if file should not be created", () => {
    const SaveFile = new saveFile();
    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("This is a custom writing error message");
      });
    const result = SaveFile.execute(customOptions);
    expect(result).toBe(false);
    writeFileSpy.mockRestore();
  });
});
