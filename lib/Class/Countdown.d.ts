interface optProps {
    format?: string;
    list?: Array<any>;
    timeKey: string;
    type: number;
}
export declare class Countdown {
    timer: any;
    ft: string;
    list: Array<any>;
    key: string;
    type: number;
    constructor(opt: optProps);
    update(): void;
    cancel(): void;
    calc(item: {
        [x: string]: string | number;
    }): string | undefined;
    operation(type: number): void;
}
export {};
