import fs from "fs";
import { yarg } from "./config/plugins/args.plugin";
const base: number = yarg.b;
let datos: string = "";
for (let tabla: number = 1; tabla <= yarg.l; tabla++) {
  datos += `${base} x ${tabla} = ${base * tabla}\n`;
}

const data: string = `=======================
    Tabla del ${base}
=======================
\n${datos}
`;
if (yarg.s) {
  console.log(data);
}
const outputPath = `outputs`;
fs.mkdirSync(outputPath, { recursive: true });
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, data);
