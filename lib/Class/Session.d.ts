declare class Session {
    static storage: Storage;
    set(...args: any[]): void;
    get(k: string[] | string): any;
    del(k: string): void;
    clear(): void;
}
export declare const session: Session;
export {};
