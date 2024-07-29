import { createTable } from "../../../src/domain/use-cases/create-table.use-case";

describe("createTableUseCase", () => {
  test("should create table with deafult values", () => {
    const CreateTable = new createTable();
    const table = CreateTable.execute({ base: 2 });
    const rows = table.split("\n").length;
    expect(CreateTable).toBeInstanceOf(createTable);
    expect(table).toContain("2 x 1 = 2");
    expect(table).toContain("2 x 10 = 20");
    expect(rows).toBe(10);
  });

  test("should create table with custom values", () => {
    const options = {
      base: 3,
      limit: 20,
    };
    const CreateTable = new createTable();
    const table = CreateTable.execute(options);
    const rows = table.split("\n").length;
    expect(table).toContain("3 x 1 = 3");
    expect(table).toContain("3 x 20 = 60");
    expect(rows).toBe(options.limit);
  });
});
