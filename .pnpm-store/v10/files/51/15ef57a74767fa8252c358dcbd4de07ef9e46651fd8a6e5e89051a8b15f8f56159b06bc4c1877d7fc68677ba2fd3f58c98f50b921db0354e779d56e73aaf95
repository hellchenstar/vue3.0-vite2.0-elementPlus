/**
 * 折叠代码源码来自：https://github.com/cncws/markdown-it-codetabs
 *
 * 该扩展添加了编辑器适配和折叠代码功能
 *
 * 源码如果在页面中存在多个编辑器，但是内容又是相同的时候，第二个开始的内容有点混乱
 * 需要与编辑器的editorId绑定
 */
import markdownit from 'markdown-it';
import { ComputedRef, Ref } from 'vue';
import { CustomIcon, StaticTextDefaultValue } from '../../../../type';
export interface CodeTabsPluginOps extends markdownit.Options {
    editorId: string;
    usedLanguageTextRef: Ref<StaticTextDefaultValue>;
    codeFoldable: boolean;
    autoFoldThreshold: number;
    customIconRef: ComputedRef<CustomIcon>;
}
declare const codetabs: (md: markdownit, _opts: CodeTabsPluginOps) => void;
export default codetabs;
