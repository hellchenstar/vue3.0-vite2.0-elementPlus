import { ExtractPropTypes, PropType } from 'vue';
import { CompletionSource } from '@codemirror/autocomplete';
import { LooseRequired } from '@vue/shared';
import { HeadList, SettingType, MdHeadingId, Themes } from '../../type';
export declare const contentPreviewProps: {
    modelValue: {
        type: PropType<string>;
        default: string;
    };
    onChange: {
        type: PropType<(v: string) => void>;
        default: () => void;
    };
    setting: {
        type: PropType<SettingType>;
        default: () => {
            preview: boolean;
        };
    };
    onHtmlChanged: {
        type: PropType<(h: string) => void>;
        default: () => void;
    };
    onGetCatalog: {
        type: PropType<(list: HeadList[]) => void>;
        default: () => void;
    };
    mdHeadingId: {
        type: PropType<MdHeadingId>;
        default: () => string;
    };
    noMermaid: {
        type: PropType<boolean>;
        default: boolean;
    };
    sanitize: {
        type: PropType<(html: string) => string>;
        default: (html: string) => string;
    };
    noKatex: {
        type: PropType<boolean>;
        default: boolean;
    };
    formatCopiedText: {
        type: PropType<(text: string) => string>;
        default: (text: string) => string;
    };
    noHighlight: {
        type: PropType<boolean>;
        default: boolean;
    };
    previewOnly: {
        type: PropType<boolean>;
        default: boolean;
    };
    noImgZoomIn: {
        type: PropType<boolean>;
    };
    sanitizeMermaid: {
        type: PropType<(h: string) => Promise<string>>;
    };
    codeFoldable: {
        type: PropType<boolean>;
    };
    autoFoldThreshold: {
        type: PropType<number>;
    };
};
export declare const contentProps: {
    updateModelValue: {
        type: PropType<(v: string) => void>;
        default: () => void;
    };
    placeholder: {
        type: PropType<string>;
        default: string;
    };
    scrollAuto: {
        type: PropType<boolean>;
    };
    autofocus: {
        type: PropType<boolean>;
    };
    disabled: {
        type: PropType<boolean>;
    };
    readonly: {
        type: PropType<boolean>;
    };
    maxlength: {
        type: PropType<number>;
    };
    autoDetectCode: {
        type: PropType<boolean>;
    };
    /**
     * 输入框失去焦点时触发事件
     */
    onBlur: {
        type: PropType<(event: FocusEvent) => void>;
        default: () => void;
    };
    /**
     * 输入框获得焦点时触发事件
     */
    onFocus: {
        type: PropType<(event: FocusEvent) => void>;
        default: () => void;
    };
    noPrettier: {
        type: PropType<boolean>;
    };
    completions: {
        type: PropType<CompletionSource[]>;
    };
    catalogVisible: {
        type: PropType<boolean>;
    };
    theme: {
        type: PropType<Themes>;
        default: string;
    };
    onInput: {
        type: PropType<(event: Event) => void>;
    };
    onDrop: {
        type: PropType<(event: DragEvent) => void>;
        default: () => void;
    };
    inputBoxWitdh: {
        type: PropType<string>;
    };
    onInputBoxWitdhChange: {
        type: PropType<(width: string) => void>;
    };
    transformImgUrl: {
        type: PropType<(t: string) => string | Promise<string>>;
        default: (t: string) => string;
    };
    modelValue: {
        type: PropType<string>;
        default: string;
    };
    onChange: {
        type: PropType<(v: string) => void>;
        default: () => void;
    };
    setting: {
        type: PropType<SettingType>;
        default: () => {
            preview: boolean;
        };
    };
    onHtmlChanged: {
        type: PropType<(h: string) => void>;
        default: () => void;
    };
    onGetCatalog: {
        type: PropType<(list: HeadList[]) => void>;
        default: () => void;
    };
    mdHeadingId: {
        type: PropType<MdHeadingId>;
        default: () => string;
    };
    noMermaid: {
        type: PropType<boolean>;
        default: boolean;
    };
    sanitize: {
        type: PropType<(html: string) => string>;
        default: (html: string) => string;
    };
    noKatex: {
        type: PropType<boolean>;
        default: boolean;
    };
    formatCopiedText: {
        type: PropType<(text: string) => string>;
        default: (text: string) => string;
    };
    noHighlight: {
        type: PropType<boolean>;
        default: boolean;
    };
    previewOnly: {
        type: PropType<boolean>;
        default: boolean;
    };
    noImgZoomIn: {
        type: PropType<boolean>;
    };
    sanitizeMermaid: {
        type: PropType<(h: string) => Promise<string>>;
    };
    codeFoldable: {
        type: PropType<boolean>;
    };
    autoFoldThreshold: {
        type: PropType<number>;
    };
};
export type ContentProps = Readonly<LooseRequired<Readonly<ExtractPropTypes<typeof contentProps>>>>;
