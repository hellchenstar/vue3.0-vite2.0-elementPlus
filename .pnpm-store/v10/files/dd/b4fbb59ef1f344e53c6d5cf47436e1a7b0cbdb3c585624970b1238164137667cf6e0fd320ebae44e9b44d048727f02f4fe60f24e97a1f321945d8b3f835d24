"use strict";
const vue = require("vue");
const config = require("./chunks/config.cjs");
const vueTsx = require("./chunks/vue-tsx.cjs");
const MdModal = require("./chunks/index4.cjs");
function _isSlot(s) {
  return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !vue.isVNode(s);
}
const props = {
  title: {
    type: String,
    default: ""
  },
  modalTitle: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean,
    default: void 0
  },
  width: {
    type: String,
    default: "auto"
  },
  height: {
    type: String,
    default: "auto"
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object],
    default: void 0
  },
  onClick: {
    type: Function,
    default: void 0
  },
  onClose: {
    type: Function,
    default: void 0
  },
  /**
   * 显示全屏按钮
   */
  showAdjust: {
    type: Boolean,
    default: false
  },
  isFullscreen: {
    type: Boolean,
    default: false
  },
  onAdjust: {
    type: Function,
    default: void 0
  },
  class: {
    type: String,
    default: void 0
  },
  style: {
    type: [Object, String],
    default: void 0
  },
  showMask: {
    type: Boolean,
    default: true
  },
  /**
   * ==没有意义，仅用于规避克隆组件自动嵌入insert方法时，传入的是该组件而产生的waring
   */
  insert: {
    type: Function,
    default: void 0
  },
  language: {
    type: String,
    default: void 0
  },
  theme: {
    type: String,
    default: void 0
  },
  previewTheme: {
    type: String,
    default: void 0
  },
  codeTheme: {
    type: String,
    default: void 0
  }
  /**
   * ==结束
   */
};
const ModalToolbar = /* @__PURE__ */ vue.defineComponent({
  name: "ModalToolbar",
  props,
  emits: ["onClick", "onClose", "onAdjust"],
  setup(props2, ctx) {
    return () => {
      const Trigger = vueTsx.getSlot({
        props: props2,
        ctx
      }, "trigger");
      const Default = vueTsx.getSlot({
        props: props2,
        ctx
      }, "default");
      return vue.createVNode(vue.Fragment, null, [vue.createVNode("div", {
        "class": `${config.prefix}-toolbar-item`,
        "title": props2.title,
        "onClick": () => {
          if (props2.onClick instanceof Function) {
            props2.onClick();
          } else {
            ctx.emit("onClick");
          }
        }
      }, [Trigger]), vue.createVNode(MdModal.MdModal, {
        "style": props2.style,
        "class": props2.class,
        "width": props2.width,
        "height": props2.height,
        "title": props2.modalTitle,
        "visible": props2.visible,
        "showMask": props2.showMask,
        "onClose": () => {
          if (props2.onClose instanceof Function) {
            props2.onClose();
          } else {
            ctx.emit("onClose");
          }
        },
        "showAdjust": props2.showAdjust,
        "isFullscreen": props2.isFullscreen,
        "onAdjust": (v) => {
          if (props2.onAdjust instanceof Function) {
            props2.onAdjust(v);
          } else {
            ctx.emit("onAdjust", v);
          }
        }
      }, _isSlot(Default) ? Default : {
        default: () => [Default]
      })]);
    };
  }
});
ModalToolbar.install = (app) => {
  app.component(ModalToolbar.name, ModalToolbar);
  return app;
};
module.exports = ModalToolbar;
