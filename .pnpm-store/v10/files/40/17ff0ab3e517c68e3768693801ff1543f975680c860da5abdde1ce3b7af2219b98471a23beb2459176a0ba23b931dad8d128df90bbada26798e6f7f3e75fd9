import { default as default2 } from "./MdEditor.mjs";
import { M, S } from "./chunks/index.mjs";
import { default as default3 } from "./NormalToolbar.mjs";
import { D } from "./chunks/index2.mjs";
import { default as default4 } from "./ModalToolbar.mjs";
import { M as M2 } from "./chunks/index3.mjs";
import { M as M3 } from "./chunks/index4.mjs";
import { defineComponent, createVNode } from "vue";
import { g as getSlot } from "./chunks/vue-tsx.mjs";
import { p as prefix } from "./chunks/config.mjs";
import { d, b, c, e, i, a } from "./chunks/config.mjs";
import { en_US, zh_CN } from "./config.mjs";
const props = {
  onClick: {
    type: Function,
    default: void 0
  }
};
const NormalFooterToolbar = /* @__PURE__ */ defineComponent({
  name: "NormalFooterToolbar",
  props,
  emits: ["onClick"],
  setup(props2, ctx) {
    return () => {
      const Children = getSlot({
        props: props2,
        ctx
      });
      return createVNode("div", {
        "class": `${prefix}-footer-item`,
        "onClick": (e2) => {
          if (props2.onClick instanceof Function) {
            props2.onClick(e2);
          } else {
            ctx.emit("onClick", e2);
          }
        }
      }, [Children]);
    };
  }
});
NormalFooterToolbar.install = (app) => {
  app.component(NormalFooterToolbar.name, NormalFooterToolbar);
  return app;
};
export {
  D as DropdownToolbar,
  M2 as MdCatalog,
  default2 as MdEditor,
  M3 as MdModal,
  M as MdPreview,
  default4 as ModalToolbar,
  NormalFooterToolbar,
  default3 as NormalToolbar,
  S as StrIcon,
  d as allFooter,
  b as allToolbar,
  c as config,
  e as editorExtensionsAttrs,
  en_US,
  i as iconfontClassUrl,
  a as iconfontSvgUrl,
  zh_CN
};
