export declare class JumpWithParameters {
    private mapKey;
    private cachedData;
    constructor();
    initCachedData(): void;
    getCachedData(key: string): any;
    setCachedData(sessionKey: string, data: any, callbaclk: (arg0: any) => any): void;
    clearCachedData(sessionKey: string): void;
}
