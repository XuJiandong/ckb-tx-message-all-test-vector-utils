import { Cell, Hex, OutPoint, Transaction } from "ckb-ccc-core";
import { JsonRpcTransformers } from "ckb-ccc-core/advanced";
import { TxFile } from "ckb-testtool";
import * as fs from 'fs';
import * as path from 'path';
import { MockClient } from "./client";

export class TestVector {
    constructor(
        public name: string,
        public tx: TxFile,
        public hash: Hex,
        public indices: number[]
    ) { }

    static fromFiles(name: string, basePath: string): TestVector {
        const jsonPath = path.join(basePath, `${name}.json`);
        const hashPath = path.join(basePath, `${name}.hash`);
        const indicesPath = path.join(basePath, `${name}.indices`);
        if (!fs.existsSync(jsonPath)) {
            throw new Error(`JSON file not found: ${jsonPath}`);
        }
        if (!fs.existsSync(hashPath)) {
            throw new Error(`Hash file not found: ${hashPath}`);
        }
        if (!fs.existsSync(indicesPath)) {
            throw new Error(`Indices file not found: ${indicesPath}`);
        }
        const txJson = fs.readFileSync(jsonPath, 'utf8');
        const hashHex = fs.readFileSync(hashPath, 'utf8').trim();
        const indicesJson = fs.readFileSync(indicesPath, 'utf8');

        try {
            const tx = JSON.parse(txJson) as TxFile;
            const indices = JSON.parse(indicesJson) as number[];

            return new TestVector(name, tx, "0x" + hashHex as Hex, indices);
        } catch (error) {
            throw new Error(`Failed to parse JSON for test vector ${name}: ${error}`);
        }
    }

    static getAllFromDirectory(dirPath: string): TestVector[] {
        if (!fs.existsSync(dirPath)) {
            throw new Error(`Directory not found: ${dirPath}`);
        }
        const files = fs.readdirSync(dirPath);
        const baseNames = new Set<string>(
            files.map((file: string) => path.parse(file).name)
        );
        const filteredBaseNames = Array.from(baseNames).filter(name => !name.startsWith('invalid-'));
        baseNames.clear();
        filteredBaseNames.forEach(name => baseNames.add(name));
        return Array.from(baseNames).map(baseName =>
            TestVector.fromFiles(baseName, dirPath)
        );
    }
    async run() {
        let cells = new Map<string, Cell>();
        for (let c of this.tx.mock_info.inputs) {
            let outpoint = JsonRpcTransformers.outPointTo(c.input.previous_output);
            let cell = new Cell(outpoint, JsonRpcTransformers.cellOutputTo(c.output), c.data);
            let bytes = OutPoint.from(outpoint).toBytes();
            cells.set(bytes.toString(), cell);
        }
        const client = new MockClient(cells);
        const tx0 = JsonRpcTransformers.transactionTo(this.tx.tx);
        const tx = Transaction.from(tx0);
        let location = this.indices[0];
        let lockScript = this.tx.mock_info.inputs[location].output.lock;

        let txMessageAll = await tx.getTxMessageAll(JsonRpcTransformers.scriptTo(lockScript), client);
        if (txMessageAll?.message !== this.hash) {
            console.log(`txMessageAll: ${txMessageAll?.message}`);
            console.log(`this.hash: ${this.hash}`);
        }
    }
}
