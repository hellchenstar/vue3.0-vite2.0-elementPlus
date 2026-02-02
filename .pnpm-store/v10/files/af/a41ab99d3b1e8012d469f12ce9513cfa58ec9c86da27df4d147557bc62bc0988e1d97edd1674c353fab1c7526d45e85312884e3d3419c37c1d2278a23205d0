"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const MdEditor = require("./MdEditor.cjs");
const MdPreview = require("./chunks/index.cjs");
const NormalToolbar = require("./NormalToolbar.cjs");
const DropdownToolbar = require("./chunks/index2.cjs");
const ModalToolbar = require("./ModalToolbar.cjs");
const MdCatalog = require("./chunks/index3.cjs");
const MdModal = require("./chunks/index4.cjs");
const vue = require("vue");
const vueTsx = require("./chunks/vue-tsx.cjs");
const config$1 = require("./chunks/config.cjs");
const config = require("./config.cjs");
const props = {
  onClick: {
    type: Function,
    default: void 0
  }
};
const NormalFooterToolbar = /* @__PURE__ */ vue.defineComponent({
  name: "NormalFooterToolbar",
  props,
  emits: ["onClick"],
  setup(props2, ctx) {
    return () => {
      const Children = vueTsx.getSlot({
        props: props2,
        ctx
      });
      return vue.createVNode("div", {
        "class": `${config$1.prefix}-footer-item`,
        "onClick": (e) => {
          if (props2.onClick instanceof Function) {
            props2.onClick(e);
          } else {
            ctx.emit("onClick", e);
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
exports.MdEditor = MdEditor;
exports.MdPreview = MdPreview.MdPreview;
exports.StrIcon = MdPreview.StrIcon;
exports.NormalToolbar = NormalToolbar;
exports.DropdownToolbar = DropdownToolbar.DropdownToolbar;
exports.ModalToolbar = ModalToolbar;
exports.MdCatalog = MdCatalog.MdCatalog;
exports.MdModal = MdModal.MdModal;
exports.allFooter = config$1.allFooter;
exports.allToolbar = config$1.allToolbar;
exports.config = config$1.config;
exports.editorExtensionsAttrs = config$1.editorExtensionsAttrs;
exports.iconfontClassUrl = config$1.iconfontClassUrl;
exports.iconfontSvgUrl = config$1.iconfontSvgUrl;
exports.en_US = config.en_US;
exports.zh_CN = config.zh_CN;
exports.NormalFooterToolbar = NormalFooterToolbar;
