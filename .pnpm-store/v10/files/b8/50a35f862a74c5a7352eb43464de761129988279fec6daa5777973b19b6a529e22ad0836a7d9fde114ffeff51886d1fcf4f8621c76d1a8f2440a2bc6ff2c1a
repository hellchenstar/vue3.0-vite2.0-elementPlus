export interface BusEvent {
    name: string;
    callback: (p?: any, p2?: any) => any;
}
declare class Bus {
    pools: {
        [race: string]: {
            [eventName: string]: Array<(p?: any) => any>;
        };
    };
    remove(race: string, name: string, func: (p?: any) => any): void;
    clear(race: string): void;
    on(race: string, event: BusEvent): boolean;
    emit(race: string, name: string, ...params: any): void;
}
declare const _default: Bus;
export default _default;
