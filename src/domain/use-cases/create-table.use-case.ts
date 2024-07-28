export interface createTableUseCase {
  execute: (options: createTableOptions) => string;
}

export interface createTableOptions {
  base: number;
  limit?: number;
}

export class createTable implements createTableUseCase {
  constructor() {} // DI - Dependency Injection
  execute({ base, limit = 10 }: createTableOptions) {
    let datos: string = "";
    for (let i = 1; i <= limit; i++) {
      datos += `${base} x ${i} = ${base * i}\n`;
    }
    return datos;
  }
}
