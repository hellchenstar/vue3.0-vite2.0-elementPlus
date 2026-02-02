import { Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { FocusOption } from '../../../type';
export default class CodeMirrorUt {
    view: EditorView;
    maxLength: number;
    private toggleTabSize;
    private togglePlaceholder;
    /**
     * 设置全部的扩展
     */
    setExtensions: (extensions: Extension[]) => void;
    toggleDisabled: (extensions: Extension[]) => void;
    toggleReadOnly: (extensions: Extension[]) => void;
    toggleMaxlength: (extensions: Extension[]) => void;
    getValue(): string;
    /**
     * 设置内容
     *
     * @param insert 待插入内容
     * @param from 插入开始位置
     * @param to 插入结束位置
     */
    setValue(insert: string, from?: number, to?: number): void;
    /**
     * 获取选中的文本
     */
    getSelectedText(): string;
    /**
     * 使用新的内容替换选中的内容
     *
     * @param text 待替换内容
     * @param options 替换后是否选中
     */
    replaceSelectedText(text: string, options: {
        select: boolean;
        deviationStart: number;
        deviationEnd: number;
        replaceAll: boolean;
    } | undefined, editorId: string): void;
    constructor(view: EditorView);
    /**
     * 设置tabSize
     *
     * @param tabSize 需要切换的大小
     */
    setTabSize(tabSize: number): void;
    /**
     * 设置placeholder
     *
     * @param t 目标内容
     */
    setPlaceholder(t: string): void;
    focus(options: FocusOption): void;
    setDisabled(d: boolean): void;
    setReadOnly(r: boolean): void;
    setMaxLength(ml: number): void;
}
