import { PropType, ExtractPropTypes } from 'vue';
import { HeadList, MdHeadingId, Themes } from '../MdEditor/type';
export interface TocItem {
    text: string;
    level: number;
    index: number;
    active: boolean;
    children?: Array<TocItem>;
}
declare const MdCatalog: import("vue").DefineComponent<{
    /**
     * 编辑器的Id，务必与需要绑定的编辑器Id相同
     */
    editorId: {
        type: PropType<string>;
        default: undefined;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
    mdHeadingId: {
        type: PropType<MdHeadingId>;
        default: (text: string) => string;
    };
    /**
     * 指定滚动的容器，选择器需带上对应的符号，默认预览框
     * 元素必须定位！！！！！！
     *
     * 默认：#md-editor-preview-wrapper
     */
    scrollElement: {
        type: PropType<string | HTMLElement>;
        default: undefined;
    };
    theme: {
        type: PropType<Themes>;
        default: string;
    };
    /**
     * 高亮标题相对滚动容器顶部偏移量，即距离该值时，高亮当前目录菜单项
     *
     * 默认：20px
     */
    offsetTop: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 滚动区域的固定顶部高度
     *
     * 默认：0
     */
    scrollElementOffsetTop: {
        type: PropType<number>;
        default: number;
    };
    onClick: {
        type: PropType<(e: MouseEvent, t: TocItem) => void>;
        default: undefined;
    };
    onActive: {
        type: PropType<(heading: HeadList | undefined) => void>;
        default: undefined;
    };
    /**
     * 滚动容器是否在web component中，默认不在
     *
     * 在其中的话通过document查询不到
     */
    isScrollElementInShadow: {
        type: PropType<boolean>;
        default: boolean;
    };
}, () => import("vue/jsx-runtime").JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("onClick" | "onActive")[], "onClick" | "onActive", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    /**
     * 编辑器的Id，务必与需要绑定的编辑器Id相同
     */
    editorId: {
        type: PropType<string>;
        default: undefined;
    };
    class: {
        type: StringConstructor;
        default: string;
    };
    mdHeadingId: {
        type: PropType<MdHeadingId>;
        default: (text: string) => string;
    };
    /**
     * 指定滚动的容器，选择器需带上对应的符号，默认预览框
     * 元素必须定位！！！！！！
     *
     * 默认：#md-editor-preview-wrapper
     */
    scrollElement: {
        type: PropType<string | HTMLElement>;
        default: undefined;
    };
    theme: {
        type: PropType<Themes>;
        default: string;
    };
    /**
     * 高亮标题相对滚动容器顶部偏移量，即距离该值时，高亮当前目录菜单项
     *
     * 默认：20px
     */
    offsetTop: {
        type: PropType<number>;
        default: number;
    };
    /**
     * 滚动区域的固定顶部高度
     *
     * 默认：0
     */
    scrollElementOffsetTop: {
        type: PropType<number>;
        default: number;
    };
    onClick: {
        type: PropType<(e: MouseEvent, t: TocItem) => void>;
        default: undefined;
    };
    onActive: {
        type: PropType<(heading: HeadList | undefined) => void>;
        default: undefined;
    };
    /**
     * 滚动容器是否在web component中，默认不在
     *
     * 在其中的话通过document查询不到
     */
    isScrollElementInShadow: {
        type: PropType<boolean>;
        default: boolean;
    };
}>> & {
    onOnClick?: ((...args: any[]) => any) | undefined;
    onOnActive?: ((...args: any[]) => any) | undefined;
}, {
    class: string;
    onClick: (e: MouseEvent, t: TocItem) => void;
    theme: Themes;
    editorId: string;
    mdHeadingId: MdHeadingId;
    offsetTop: number;
    scrollElementOffsetTop: number;
    scrollElement: string | HTMLElement;
    onActive: (heading: HeadList | undefined) => void;
    isScrollElementInShadow: boolean;
}, {}>;
export default MdCatalog;
