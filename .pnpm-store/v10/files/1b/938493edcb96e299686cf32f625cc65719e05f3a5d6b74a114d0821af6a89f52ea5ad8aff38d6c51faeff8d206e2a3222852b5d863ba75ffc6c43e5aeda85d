/**
 * 重写markdown-it-xss，它的作者好像不维护了
 */
import * as xss from 'xss';
import markdownit from 'markdown-it';
export interface XSSPluginType {
    xss?: (_xss: typeof xss) => XSS.IFilterXSSOptions | xss.IFilterXSSOptions;
    /**
     * 它不会覆盖默认的白名单，而是把默认白名单、内置白名单结合
     */
    extendedWhiteList?: xss.IFilterXSSOptions['whiteList'];
}
declare const XSSPlugin: (md: markdownit, options: XSSPluginType) => void;
export default XSSPlugin;
