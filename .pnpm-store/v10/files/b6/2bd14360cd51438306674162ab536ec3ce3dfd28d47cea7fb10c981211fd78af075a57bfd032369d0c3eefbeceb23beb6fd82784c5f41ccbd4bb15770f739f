import { Ref } from 'vue';
import { SettingType, UpdateSetting, MdPreviewProps, EditorProps, EditorContext } from './type';
import { ContentExposeParam } from './layouts/Content/type';
/**
 * 处理保存逻辑，主要是需要异步返回编译后的html
 *
 * @param props
 * @param context
 */
export declare const useOnSave: (props: EditorProps, context: EditorContext) => void;
/**
 * 抽离预览组件需要提供的组件全局属性
 *
 * @param props 预览组件的props
 */
export declare const useProvidePreview: (props: MdPreviewProps, rootRef: Ref<HTMLDivElement | undefined>) => void;
/**
 * 向下提供部分公共参数
 *
 * @param props
 */
export declare const useProvide: (props: EditorProps, rootRef: Ref<HTMLDivElement | undefined>) => void;
/**
 * 抽离预览组件需要嵌入的脚本
 *
 * @param props 预览组件的props
 */
export declare const useExpansionPreview: (props: MdPreviewProps) => void;
/**
 * 插入编辑器支持的扩展外链
 *
 * @param props
 */
export declare const useExpansion: (props: EditorProps) => void;
/**
 * 错误收集
 *
 * @param props
 * @param context
 */
export declare const useErrorCatcher: (props: EditorProps, context: EditorContext) => void;
/**
 * 收集整理公共配置
 *
 * @param props
 * @param context
 * @returns
 */
export declare const useConfig: (props: EditorProps, context: EditorContext) => [setting: SettingType, updateSetting: UpdateSetting];
/**
 * 目录状态整理
 *
 * @param props
 * @returns
 */
export declare const useCatalog: (props: EditorProps) => import("vue").ComputedRef<boolean>;
/**
 * 向外暴露属性
 *
 * @param props 组件属性
 * @param ctx vue conext
 * @param catalogVisible 目录显示状态
 * @param setting 内部状态集合
 * @param updateSetting 更新内部集合
 */
export declare const useExpose: (props: EditorProps, ctx: EditorContext, catalogVisible: Ref<boolean>, setting: SettingType, updateSetting: UpdateSetting, codeRef: Ref<ContentExposeParam | undefined>) => void;
