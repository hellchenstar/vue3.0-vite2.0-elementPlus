import { PropType, CSSProperties, VNode } from 'vue';
import { CompletionSource } from '@codemirror/autocomplete';
import { ToolbarNames, MdHeadingId, Themes, Footers, ChangeEvent, SaveEvent, UploadImgEvent, HtmlChangedEvent, GetCatalogEvent, ErrorEvent, EditorEmits, CustomIcon } from './type';
export declare const mdHeadingId: MdHeadingId;
export declare const mdPreviewProps: {
    /**
     * markdown content.
     *
     * @default ''
     */
    modelValue: {
        type: PropType<string>;
        default: string;
    };
    /**
     * input回调事件
     */
    onChange: {
        type: PropType<ChangeEvent>;
        default: undefined;
    };
    /**
     * 主题，支持light和dark
     *
     * @default 'light'
     */
    theme: {
        type: PropType<Themes>;
        default: string;
    };
    /**
     * 外层类名
     *
     * @default ''
     */
    class: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 预设语言名称
     *
     * @default 'zh-CN'
     */
    language: {
        type: PropType<string>;
        default: string;
    };
    /**
     * html变化事件
     */
    onHtmlChanged: {
        type: PropType<HtmlChangedEvent>;
        default: undefined;
    };
    /**
     * 获取目录结构
     */
    onGetCatalog: {
        type: PropType<GetCatalogEvent>;
        default: undefined;
    };
    /**
     * 编辑器唯一标识
     *
     * @default 'md-editor-v3'
     */
    editorId: {
        type: PropType<string>;
        default: () => string;
    };
    /**
     * 预览中代码是否显示行号
     *
     * @default true
     */
    showCodeRowNumber: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 预览内容样式
     *
     * @default 'default'
     */
    previewTheme: {
        type: PropType<string>;
        default: string;
    };
    /**
     * 编辑器样式
     */
    style: {
        type: PropType<string | CSSProperties>;
        default: () => {};
    };
    /**
     * 标题的id生成方式
     *
     * @default (text: string) => text
     */
    mdHeadingId: {
        type: PropType<MdHeadingId>;
        default: MdHeadingId;
    };
    /**
     *
     * 不能保证文本正确的情况，在marked编译md文本后通过该方法处理
     * 推荐DOMPurify、sanitize-html
     *
     * @default (text: string) => text
     */
    sanitize: {
        type: PropType<(html: string) => string>;
        default: (html: string) => string;
    };
    /**
     * 不使用该mermaid
     *
     * @default false
     */
    noMermaid: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 不使用katex
     *
     * @default false
     */
    noKatex: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 代码主题
     *
     * @default 'atom'
     */
    codeTheme: {
        type: PropType<string>;
        default: string;
    };
    /**
     * 不插入iconfont链接
     *
     * @default false
     */
    noIconfont: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * 复制代码格式化方法
     *
     * @default (text) => text
     */
    formatCopiedText: {
        type: PropType<(text: string) => string>;
        default: (text: string) => string;
    };
    /**
     * 某些预览主题的代码模块背景是暗色系
     * 将这个属性设置为true，会自动在该主题下的light模式下使用暗色系的代码风格
     *
     * @default true
     */
    codeStyleReverse: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 需要自动调整的预览主题
     *
     * @default ['default', 'mk-cute']
     */
    codeStyleReverseList: {
        type: PropType<string[]>;
        default: string[];
    };
    noHighlight: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 是否关闭编辑器默认的放大缩小功能
     */
    noImgZoomIn: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 自定义的图标
     */
    customIcon: {
        type: PropType<CustomIcon>;
        default: {};
    };
    sanitizeMermaid: {
        type: PropType<(h: string) => Promise<string>>;
        default: (h: string) => Promise<string>;
    };
    /**
     * 是否开启折叠代码功能
     * 不开启会使用div标签替代details标签
     *
     * @default true
     */
    codeFoldable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 触发自动折叠代码的行数阈值
     *
     * @default 30
     */
    autoFoldThreshold: {
        type: PropType<number>;
        default: number;
    };
};
export declare const editorProps: {
    /**
     * input回调事件
     */
    onSave: {
        type: PropType<SaveEvent>;
        default: undefined;
    };
    /**
     * 上传图片事件
     */
    onUploadImg: {
        type: PropType<UploadImgEvent>;
        default: undefined;
    };
    /**
     * 是否页面内全屏
     *
     * @default false
     */
    pageFullscreen: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 是否展开预览
     *
     * @default true
     */
    preview: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 是否展开html预览
     *
     * @default false
     */
    htmlPreview: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 仅预览模式，不显示toolbar和编辑框
     *
     * @4.0.0开始移除该设置，使用组件MdPreview替换
     *
     * @default false
     */
    /**
     * 工具栏选择显示
     *
     * @default allToolbar
     */
    toolbars: {
        type: PropType<ToolbarNames[]>;
        default: string[];
    };
    /**
     * 工具栏选择不显示
     *
     * @default []
     */
    toolbarsExclude: {
        type: PropType<ToolbarNames[]>;
        default: never[];
    };
    /**
     * 格式化md
     *
     * @default true
     */
    noPrettier: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 一个tab等于空格数
     *
     * @default 2
     */
    tabWidth: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 表格预设格子数
     *
     * 也可以是[6, 4, 10, 8]
     *
     * @default [6, 4]
     */
    tableShape: {
        type: PropType<number[]>;
        default: number[];
    };
    /**
     * 空提示
     *
     * @default ''
     */
    placeholder: {
        type: PropType<string>;
        default: string;
    };
    /**
     * 自定义的工具栏列表
     */
    defToolbars: {
        type: PropType<string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
        default: undefined;
    };
    /**
     * 内部错误捕获
     */
    onError: {
        type: PropType<ErrorEvent>;
        default: undefined;
    };
    /**
     * 页脚列表显示顺序
     */
    footers: {
        type: PropType<Footers[]>;
        default: Footers[];
    };
    /**
     * 是否默认激活输入框和预览框同步滚动
     *
     * @default true
     */
    scrollAuto: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 自定义的也叫工具组件列表
     */
    defFooters: {
        type: PropType<string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>>;
        default: undefined;
    };
    /**
     * 是否禁用上传图片
     *
     * @default false
     */
    noUploadImg: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 文本区域自动获得焦点
     *
     * @default false
     */
    autoFocus: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 禁用文本区域
     *
     * @default false
     */
    disabled: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 文本区域为只读
     *
     * @default false
     */
    readOnly: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 文本区域允许的最大字符数
     */
    maxLength: {
        type: PropType<number>;
        default: undefined;
    };
    /**
     * 是否启用自动识别粘贴代码类别
     * 目前支持 vscode 复制的代码识别
     *
     * @default false
     */
    autoDetectCode: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 输入框失去焦点时触发事件
     */
    onBlur: {
        type: PropType<(event: FocusEvent) => void>;
        default: undefined;
    };
    /**
     * 输入框获得焦点时触发事件
     */
    onFocus: {
        type: PropType<(event: FocusEvent) => void>;
        default: undefined;
    };
    /**
     * @codemirror/autocomplete匹配关键词的方法列表
     *
     * 它会被像下面这样嵌入编辑器
     *
     * import { autocompletion } from '@codemirror/autocomplete';
     * autocompletion({
     *   override: [...completions]
     * })
     */
    completions: {
        type: PropType<CompletionSource[]>;
        default: undefined;
    };
    /**
     * 是否在工具栏下面显示对应的文字名称
     *
     * @default false
     */
    showToolbarName: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 字符输入事件
     */
    onInput: {
        type: PropType<(event: Event) => void>;
        default: undefined;
    };
    onDrop: {
        type: PropType<(event: DragEvent) => void>;
        default: undefined;
    };
    /**
     * 输入框的默认宽度
     *
     * @example '100px'/'50%'
     * @default '50%
     */
    inputBoxWitdh: {
        type: PropType<string>;
        default: string;
    };
    /**
     * 输入框宽度变化事件
     */
    onInputBoxWitdhChange: {
        type: PropType<(width: string) => void>;
        default: undefined;
    };
    /**
     * 替换粘贴的图片链接
     *
     * @param t 图片链接
     * @returns
     */
    transformImgUrl: {
        type: PropType<(t: string) => string | Promise<string>>;
        default: (t: string) => string;
    };
    /**
     * markdown content.
     *
     * @default ''
     */
    modelValue: {
        type: PropType<string>;
        default: string;
    };
    /**
     * input回调事件
     */
    onChange: {
        type: PropType<ChangeEvent>;
        default: undefined;
    };
    /**
     * 主题，支持light和dark
     *
     * @default 'light'
     */
    theme: {
        type: PropType<Themes>;
        default: string;
    };
    /**
     * 外层类名
     *
     * @default ''
     */
    class: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 预设语言名称
     *
     * @default 'zh-CN'
     */
    language: {
        type: PropType<string>;
        default: string;
    };
    /**
     * html变化事件
     */
    onHtmlChanged: {
        type: PropType<HtmlChangedEvent>;
        default: undefined;
    };
    /**
     * 获取目录结构
     */
    onGetCatalog: {
        type: PropType<GetCatalogEvent>;
        default: undefined;
    };
    /**
     * 编辑器唯一标识
     *
     * @default 'md-editor-v3'
     */
    editorId: {
        type: PropType<string>;
        default: () => string;
    };
    /**
     * 预览中代码是否显示行号
     *
     * @default true
     */
    showCodeRowNumber: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 预览内容样式
     *
     * @default 'default'
     */
    previewTheme: {
        type: PropType<string>;
        default: string;
    };
    /**
     * 编辑器样式
     */
    style: {
        type: PropType<string | CSSProperties>;
        default: () => {};
    };
    /**
     * 标题的id生成方式
     *
     * @default (text: string) => text
     */
    mdHeadingId: {
        type: PropType<MdHeadingId>;
        default: MdHeadingId;
    };
    /**
     *
     * 不能保证文本正确的情况，在marked编译md文本后通过该方法处理
     * 推荐DOMPurify、sanitize-html
     *
     * @default (text: string) => text
     */
    sanitize: {
        type: PropType<(html: string) => string>;
        default: (html: string) => string;
    };
    /**
     * 不使用该mermaid
     *
     * @default false
     */
    noMermaid: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 不使用katex
     *
     * @default false
     */
    noKatex: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 代码主题
     *
     * @default 'atom'
     */
    codeTheme: {
        type: PropType<string>;
        default: string;
    };
    /**
     * 不插入iconfont链接
     *
     * @default false
     */
    noIconfont: {
        type: PropType<boolean>;
        default: undefined;
    };
    /**
     * 复制代码格式化方法
     *
     * @default (text) => text
     */
    formatCopiedText: {
        type: PropType<(text: string) => string>;
        default: (text: string) => string;
    };
    /**
     * 某些预览主题的代码模块背景是暗色系
     * 将这个属性设置为true，会自动在该主题下的light模式下使用暗色系的代码风格
     *
     * @default true
     */
    codeStyleReverse: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 需要自动调整的预览主题
     *
     * @default ['default', 'mk-cute']
     */
    codeStyleReverseList: {
        type: PropType<string[]>;
        default: string[];
    };
    noHighlight: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 是否关闭编辑器默认的放大缩小功能
     */
    noImgZoomIn: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 自定义的图标
     */
    customIcon: {
        type: PropType<CustomIcon>;
        default: {};
    };
    sanitizeMermaid: {
        type: PropType<(h: string) => Promise<string>>;
        default: (h: string) => Promise<string>;
    };
    /**
     * 是否开启折叠代码功能
     * 不开启会使用div标签替代details标签
     *
     * @default true
     */
    codeFoldable: {
        type: PropType<boolean>;
        default: boolean;
    };
    /**
     * 触发自动折叠代码的行数阈值
     *
     * @default 30
     */
    autoFoldThreshold: {
        type: PropType<number>;
        default: number;
    };
};
export declare const mdPreviewEmits: EditorEmits;
export declare const editorEmits: EditorEmits;
