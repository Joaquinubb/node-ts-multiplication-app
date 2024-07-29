import fs from "fs";
export interface saveFileUseCase {
  execute: (options: saveFileOptions) => boolean;
}
export interface saveFileOptions {
  fileContent: string;
  fileDestination: string;
  fileName: string;
}

export class saveFile implements saveFileUseCase {
  constructor() {} // DI - Dependency Injection
  execute({
    fileContent,
    fileDestination,
    fileName,
  }: saveFileOptions): boolean {
    try {
      fs.mkdirSync(fileDestination, { recursive: true });
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
      return true;
    } catch (error) {
      //console.error(error);
      return false;
    }
  }
}
