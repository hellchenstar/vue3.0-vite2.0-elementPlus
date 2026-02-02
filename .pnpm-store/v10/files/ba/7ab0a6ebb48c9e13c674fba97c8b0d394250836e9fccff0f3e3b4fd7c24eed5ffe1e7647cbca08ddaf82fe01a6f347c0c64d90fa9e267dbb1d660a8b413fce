import markdownit from 'markdown-it';
import { Ref } from 'vue';
import { HeadList, MdHeadingId } from '../../../../type';
export interface HeadingPluginOps extends markdownit.Options {
    mdHeadingId: MdHeadingId;
    headsRef: Ref<HeadList[]>;
}
declare const HeadingPlugin: (md: markdownit, options: HeadingPluginOps) => void;
export default HeadingPlugin;
