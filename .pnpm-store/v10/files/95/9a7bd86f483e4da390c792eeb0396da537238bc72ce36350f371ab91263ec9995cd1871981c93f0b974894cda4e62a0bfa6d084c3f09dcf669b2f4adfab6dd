/**
 * 设置页面元素可移动
 *
 * @param trigger 触发器，通过该元素移动父级元素
 * @param moveHandler
 */
export declare const keyMove: (trigger: HTMLElement, moveHandler?: (left: number, top: number) => void) => (() => void);
/**
 * 向页面插入外链标签
 *
 * @param ele
 * @param checkKey 全局名称
 */
export declare const appendHandler: <K extends keyof HTMLElementTagNameMap>(tagName: K, attributes: Partial<HTMLElementTagNameMap[K]>, checkKey?: string) => void;
/**
 * 更新插入的元素属性
 *
 * @param id id选择器
 * @param attr 属性名
 * @param value 属性值
 */
export declare const updateHandler: <K extends keyof HTMLElementTagNameMap>(tagName: K, attributes: Partial<HTMLElementTagNameMap[K]>) => void;
/**
 * 创建带属性的原始标签
 *
 * @param tagName
 * @param attributes
 * @returns
 */
export declare const createHTMLElement: <K extends keyof HTMLElementTagNameMap>(tagName: K, attributes: Partial<HTMLElementTagNameMap[K]>) => HTMLElementTagNameMap[K];
/**
 * 缩放、拖拽mermaid模块
 */
export declare const zoomMermaid: (containers: NodeListOf<HTMLElement>) => void;
