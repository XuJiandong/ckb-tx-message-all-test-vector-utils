import {
    Cell,
    CellDep,
    CellDepInfoLike,
    Client,
    ClientBlock,
    ClientBlockHeader,
    ClientFindCellsResponse,
    ClientFindTransactionsGroupedResponse,
    ClientFindTransactionsResponse,
    ClientIndexerSearchKeyLike,
    ClientIndexerSearchKeyTransactionLike,
    ClientTransactionResponse,
    Hex,
    HexLike,
    KnownScript,
    Num,
    NumLike,
    OutPoint,
    OutPointLike,
    OutputsValidator,
    ScriptInfo,
    ScriptLike,
    TransactionLike,
} from "ckb-ccc-core";

import {
    ClientCollectableSearchKeyLike,
} from "ckb-ccc-core/advanced";

export class MockClient extends Client {
    constructor(public cells: Map<string, Cell>) {
        super();
    }

    get url(): string {
        return "";
    }

    get addressPrefix(): string {
        return "";
    }

    getKnownScript(_script: KnownScript): Promise<ScriptInfo> {
        return Promise.reject(new Error("Not implemented"));
    }

    getFeeRateStatistics(
        _blockRange?: NumLike,
    ): Promise<{ mean: Num; median: Num }> {
        return Promise.reject(new Error("Not implemented"));
    }

    getFeeRate(
        _blockRange?: NumLike,
        _options?: { maxFeeRate?: NumLike },
    ): Promise<Num> {
        return Promise.reject(new Error("Not implemented"));
    }

    getTip(): Promise<Num> {
        return Promise.reject(new Error("Not implemented"));
    }

    getTipHeader(_verbosity?: number | null): Promise<ClientBlockHeader> {
        return Promise.reject(new Error("Not implemented"));
    }

    getBlockByNumberNoCache(
        _blockNumber: NumLike,
        _verbosity?: number | null,
        _withCycles?: boolean | null,
    ): Promise<ClientBlock | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    getBlockByHashNoCache(
        _blockHash: HexLike,
        _verbosity?: number | null,
        _withCycles?: boolean | null,
    ): Promise<ClientBlock | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    getHeaderByNumberNoCache(
        _blockNumber: NumLike,
        _verbosity?: number | null,
    ): Promise<ClientBlockHeader | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    getHeaderByHashNoCache(
        _blockHash: HexLike,
        _verbosity?: number | null,
    ): Promise<ClientBlockHeader | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    getBlockByNumber(
        _blockNumber: NumLike,
        _verbosity?: number | null,
        _withCycles?: boolean | null,
    ): Promise<ClientBlock | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    getBlockByHash(
        _blockHash: HexLike,
        _verbosity?: number | null,
        _withCycles?: boolean | null,
    ): Promise<ClientBlock | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    getHeaderByNumber(
        _blockNumber: NumLike,
        _verbosity?: number | null,
    ): Promise<ClientBlockHeader | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    getHeaderByHash(
        _blockHash: HexLike,
        _verbosity?: number | null,
    ): Promise<ClientBlockHeader | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    estimateCycles(_transaction: TransactionLike): Promise<Num> {
        return Promise.reject(new Error("Not implemented"));
    }

    sendTransactionDry(
        _transaction: TransactionLike,
        _validator?: OutputsValidator,
    ): Promise<Num> {
        return Promise.reject(new Error("Not implemented"));
    }

    sendTransactionNoCache(
        _transaction: TransactionLike,
        _validator?: OutputsValidator,
    ): Promise<Hex> {
        return Promise.reject(new Error("Not implemented"));
    }

    getTransactionNoCache(
        _txHash: HexLike,
    ): Promise<ClientTransactionResponse | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    async getCell(outPointLike: OutPointLike): Promise<Cell | undefined> {
        let bytes = OutPoint.from(outPointLike).toBytes();
        const cell = this.cells.get(bytes.toString());
        if (!cell) {
            return;
        }
        return cell;
    }

    getCellLiveNoCache(
        _outPointLike: OutPointLike,
        _withData?: boolean | null,
        _includeTxPool?: boolean | null,
    ): Promise<Cell | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    getCellLive(
        _outPointLike: OutPointLike,
        _withData?: boolean | null,
        _includeTxPool?: boolean | null,
    ): Promise<Cell | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    findCellsPagedNoCache(
        _key: ClientIndexerSearchKeyLike,
        _order?: "asc" | "desc",
        _limit?: NumLike,
        _after?: string,
    ): Promise<ClientFindCellsResponse> {
        return Promise.reject(new Error("Not implemented"));
    }
    async findCellsPaged(
        _key: ClientIndexerSearchKeyLike,
        _order?: "asc" | "desc",
        _limit?: NumLike,
        _after?: string,
    ): Promise<ClientFindCellsResponse> {
        return Promise.reject(new Error("Not implemented"));
    }

    findCellsOnChain(
        _key: ClientIndexerSearchKeyLike,
        _order?: "asc" | "desc",
        _limit = 10,
    ): AsyncGenerator<Cell> {
        throw new Error("Not implemented");
    }

    findCells(
        _keyLike: ClientCollectableSearchKeyLike,
        _order?: "asc" | "desc",
        _limit = 10,
    ): AsyncGenerator<Cell> {
        throw new Error("Not implemented");
    }

    findCellsByLock(
        _lock: ScriptLike,
        _type?: ScriptLike | null,
        _withData = true,
        _order?: "asc" | "desc",
        _limit = 10,
    ): AsyncGenerator<Cell> {
        throw new Error("Not implemented");
    }

    findCellsByType(
        _type: ScriptLike,
        _withData = true,
        _order?: "asc" | "desc",
        _limit = 10,
    ): AsyncGenerator<Cell> {
        throw new Error("Not implemented");
    }

    async findSingletonCellByType(
        _type: ScriptLike,
        _withData = false,
    ): Promise<Cell | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    async getCellDeps(
        ..._cellDepsInfoLike: (CellDepInfoLike | CellDepInfoLike[])[]
    ): Promise<CellDep[]> {
        return Promise.reject(new Error("Not implemented"));
    }

    findTransactionsPaged(
        key: Omit<ClientIndexerSearchKeyTransactionLike, "groupByTransaction"> & {
            groupByTransaction: true;
        },
        order?: "asc" | "desc",
        limit?: NumLike,
        after?: string,
    ): Promise<ClientFindTransactionsGroupedResponse>;
    findTransactionsPaged(
        key: Omit<ClientIndexerSearchKeyTransactionLike, "groupByTransaction"> & {
            groupByTransaction?: false | null;
        },
        order?: "asc" | "desc",
        limit?: NumLike,
        after?: string,
    ): Promise<ClientFindTransactionsResponse>;
    findTransactionsPaged(
        _key: ClientIndexerSearchKeyTransactionLike,
        _order?: "asc" | "desc",
        _limit?: NumLike,
        _after?: string,
    ): Promise<
        ClientFindTransactionsResponse | ClientFindTransactionsGroupedResponse
    > {
        return Promise.reject(new Error("Not implemented"));
    }

    getCellsCapacity(_key: ClientIndexerSearchKeyLike): Promise<Num> {
        return Promise.reject(new Error("Not implemented"));
    }

    async getBalanceSingle(_lock: ScriptLike): Promise<Num> {
        return Promise.reject(new Error("Not implemented"));
    }

    async getBalance(_locks: ScriptLike[]): Promise<Num> {
        return Promise.reject(new Error("Not implemented"));
    }

    async sendTransaction(
        _transaction: TransactionLike,
        _validator?: OutputsValidator,
        _options?: { maxFeeRate?: NumLike },
    ): Promise<Hex> {
        return Promise.reject(new Error("Not implemented"));
    }

    async getTransaction(
        _txHashLike: HexLike,
    ): Promise<ClientTransactionResponse | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    async waitTransaction(
        _txHash: HexLike,
        _confirmations: number = 0,
        _timeout: number = 60000,
        _interval: number = 2000,
    ): Promise<ClientTransactionResponse | undefined> {
        return Promise.reject(new Error("Not implemented"));
    }

    findTransactionsByLock(
        lock: ScriptLike,
        type: ScriptLike | null | undefined,
        groupByTransaction: true,
        order?: "asc" | "desc",
        limit?: number,
    ): AsyncGenerator<ClientFindTransactionsGroupedResponse["transactions"][0]>;
    findTransactionsByLock(
        lock: ScriptLike,
        type?: ScriptLike | null,
        groupByTransaction?: false | null,
        order?: "asc" | "desc",
        limit?: number,
    ): AsyncGenerator<ClientFindTransactionsResponse["transactions"][0]>;
    findTransactionsByLock(
        _lock: ScriptLike,
        _type?: ScriptLike | null,
        _groupByTransaction?: boolean | null,
        _order?: "asc" | "desc",
        _limit = 10,
    ): AsyncGenerator<
        | ClientFindTransactionsResponse["transactions"][0]
        | ClientFindTransactionsGroupedResponse["transactions"][0]
    > {
        throw new Error("Not implemented");
    }

    findTransactionsByType(
        type: ScriptLike,
        groupByTransaction: true,
        order?: "asc" | "desc",
        limit?: number,
    ): AsyncGenerator<ClientFindTransactionsGroupedResponse["transactions"][0]>;
    findTransactionsByType(
        type: ScriptLike,
        groupByTransaction?: false | null,
        order?: "asc" | "desc",
        limit?: number,
    ): AsyncGenerator<ClientFindTransactionsResponse["transactions"][0]>;
    findTransactionsByType(
        _type: ScriptLike,
        _groupByTransaction?: boolean | null,
        _order?: "asc" | "desc",
        _limit = 10,
    ): AsyncGenerator<
        | ClientFindTransactionsResponse["transactions"][0]
        | ClientFindTransactionsGroupedResponse["transactions"][0]
    > {
        throw new Error("Not implemented");
    }
}
