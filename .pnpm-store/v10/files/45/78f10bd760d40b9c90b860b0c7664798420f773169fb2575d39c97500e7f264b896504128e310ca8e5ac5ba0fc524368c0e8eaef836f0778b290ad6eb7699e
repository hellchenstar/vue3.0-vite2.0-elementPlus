import type Step from './item.vue';
import type { Component, ExtractPublicPropTypes } from 'vue';
export interface StepProps {
    /**
     * @description step title
     */
    title?: string;
    /**
     * @description step custom icon. Icons can be passed via named slot as well
     */
    icon?: string | Component;
    /**
     * @description step description
     * @default ''
     */
    description?: string;
    /**
     * @description current status. It will be automatically set by Steps if not configured.
     * @default ''
     */
    status?: '' | 'wait' | 'process' | 'finish' | 'error' | 'success';
}
/**
 * @deprecated Removed after 3.0.0, Use `StepProps` instead.
 */
export declare const stepProps: {
    readonly title: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly icon: {
        readonly type: import("vue").PropType<import("element-plus/es/utils").EpPropMergeType<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | ((new (...args: any[]) => (string | Component) & {}) | (() => string | Component))[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
    };
    readonly description: import("element-plus/es/utils").EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
    readonly status: import("element-plus/es/utils").EpPropFinalized<StringConstructor, "" | "wait" | "error" | "finish" | "success" | "process", unknown, "", boolean>;
};
export type StepPropsPublic = ExtractPublicPropTypes<typeof stepProps>;
export type StepInstance = InstanceType<typeof Step> & unknown;
