import { PropType, VNode, ExtractPropTypes } from 'vue';
import { LooseRequired } from '@vue/shared';
import { ToolbarNames, SettingType, UpdateSetting } from '../../type';
export declare const toolbarProps: {
    noPrettier: {
        type: PropType<boolean>;
    };
    toolbars: {
        type: PropType<ToolbarNames[]>;
        default: () => never[];
    };
    toolbarsExclude: {
        type: PropType<ToolbarNames[]>;
        default: () => never[];
    };
    setting: {
        type: PropType<SettingType>;
        default: () => {};
    };
    screenfull: {
        type: ObjectConstructor;
        default: null;
    };
    screenfullJs: {
        type: PropType<string>;
        default: string;
    };
    updateSetting: {
        type: PropType<UpdateSetting>;
        default: () => void;
    };
    tableShape: {
        type: PropType<number[]>;
        default: () => number[];
    };
    defToolbars: {
        type: PropType<VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
    };
    noUploadImg: {
        type: PropType<boolean>;
    };
    /**
     * 是否在工具栏下面显示对应的文字名称
     *
     * @default false
     */
    showToolbarName: {
        type: PropType<boolean>;
    };
    catalogVisible: {
        type: PropType<boolean>;
    };
    codeTheme: {
        type: PropType<string>;
    };
};
export type ToolbarProps = Readonly<LooseRequired<Readonly<ExtractPropTypes<typeof toolbarProps>>>>;
