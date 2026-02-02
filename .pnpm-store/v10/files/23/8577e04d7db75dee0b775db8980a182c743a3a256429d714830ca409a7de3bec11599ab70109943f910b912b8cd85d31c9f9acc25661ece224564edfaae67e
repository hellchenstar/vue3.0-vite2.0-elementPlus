"use strict";
const vue = require("vue");
const config = require("./config.cjs");
const vueTsx = require("./vue-tsx.cjs");
const dom = require("./dom.cjs");
const index = require("./index5.cjs");
const Icon$1 = /* @__PURE__ */ vue.defineComponent({
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup(props2) {
    return () => {
      return config.configOption.iconfontType === "svg" ? vue.createVNode("svg", {
        "class": `${config.prefix}-icon`,
        "aria-hidden": "true"
      }, [vue.createVNode("use", {
        "xlink:href": `#${config.prefix}-icon-${props2.name}`
      }, null)]) : vue.createVNode("i", {
        "class": `${config.prefix}-iconfont ${config.prefix}-icon-${props2.name}`
      }, null);
    };
  }
});
const Icon = /* @__PURE__ */ vue.defineComponent({
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup(props2) {
    const customIcon = vue.inject("customIcon");
    return () => {
      const item = customIcon.value[props2.name];
      if (typeof item === "object") {
        return typeof item.component === "object" ? vue.h(item.component, item.props) : vue.createVNode("span", {
          "innerHTML": item.component
        }, null);
      }
      return vue.createVNode(Icon$1, {
        "name": props2.name
      }, null);
    };
  }
});
const props = {
  title: {
    type: String,
    default: ""
  },
  visible: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: "auto"
  },
  height: {
    type: String,
    default: "auto"
  },
  onClose: {
    type: Function
  },
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
    default: () => {
    }
  },
  class: {
    type: String
  },
  style: {
    type: [Object, String],
    default: () => ({})
  },
  showMask: {
    type: Boolean,
    default: true
  }
};
const MdModal = /* @__PURE__ */ vue.defineComponent({
  name: "MdModal",
  props,
  emits: ["onClose"],
  setup(props2, ctx) {
    const themeRef = vue.inject("theme");
    const rootRef = vue.inject("rootRef");
    const modalVisible = vue.ref(props2.visible);
    const modalClass = vue.ref([`${config.prefix}-modal`]);
    const modalRef = vue.ref();
    const modalHeaderRef = vue.ref();
    const bodyRef = vue.ref();
    const containerRef = vue.shallowRef();
    let keyMoveClear = () => {
    };
    const state = vue.reactive({
      maskStyle: {
        zIndex: -1
      },
      modalStyle: {
        zIndex: -1
      },
      initPos: {
        left: "0px",
        top: "0px"
      },
      historyPos: {
        left: "0px",
        top: "0px"
      }
    });
    const innerSize = vue.computed(() => {
      if (props2.isFullscreen) {
        return {
          width: "100%",
          height: "100%"
        };
      } else {
        return {
          width: props2.width,
          height: props2.height
        };
      }
    });
    vue.watch(() => props2.isFullscreen, (nVal) => {
      if (nVal) {
        keyMoveClear();
      } else {
        vue.nextTick(() => {
          keyMoveClear = dom.keyMove(modalHeaderRef.value, (left, top) => {
            state.initPos.left = left + "px";
            state.initPos.top = top + "px";
          });
        });
      }
    });
    vue.watch(() => props2.visible, (nVal) => {
      if (nVal) {
        state.maskStyle.zIndex = config.configOption.editorConfig.zIndex + index.getZIndexIncrement();
        state.modalStyle.zIndex = config.configOption.editorConfig.zIndex + index.getZIndexIncrement();
        modalClass.value.push("zoom-in");
        modalVisible.value = nVal;
        vue.nextTick(() => {
          const halfWidth = modalRef.value.offsetWidth / 2;
          const halfHeight = modalRef.value.offsetHeight / 2;
          const halfClientWidth = document.documentElement.clientWidth / 2;
          const halfClientHeight = document.documentElement.clientHeight / 2;
          state.initPos.left = halfClientWidth - halfWidth + "px";
          state.initPos.top = halfClientHeight - halfHeight + "px";
          if (!props2.isFullscreen) {
            keyMoveClear = dom.keyMove(modalHeaderRef.value, (left, top) => {
              state.initPos.left = left + "px";
              state.initPos.top = top + "px";
            });
          }
        });
        setTimeout(() => {
          modalClass.value = modalClass.value.filter((item) => item !== "zoom-in");
        }, 140);
      } else {
        modalClass.value.push("zoom-out");
        keyMoveClear();
        setTimeout(() => {
          modalClass.value = modalClass.value.filter((item) => item !== "zoom-out");
          modalVisible.value = nVal;
        }, 130);
      }
    });
    const internalStyle = vue.computed(() => ({
      display: modalVisible.value ? "block" : "none"
    }));
    const combinedStyle = vue.computed(() => {
      if (typeof props2.style === "string") {
        return [props2.style, internalStyle.value].join("; ");
      } else if (props2.style instanceof Object) {
        return {
          ...internalStyle.value,
          ...props2.style
        };
      } else {
        return internalStyle.value;
      }
    });
    vue.onMounted(() => {
      var _a;
      const rootNode = (_a = rootRef.value) == null ? void 0 : _a.getRootNode();
      bodyRef.value = rootNode instanceof Document ? document.body : rootNode;
    });
    return () => {
      const slotDefault = vueTsx.getSlot({
        ctx
      });
      const slotTitle = vueTsx.getSlot({
        props: props2,
        ctx
      }, "title");
      return bodyRef.value ? vue.createVNode(vue.Teleport, {
        "to": bodyRef.value
      }, {
        default: () => [vue.createVNode("div", {
          "ref": containerRef,
          "class": `${config.prefix}-modal-container`,
          "data-theme": themeRef.value
        }, [vue.createVNode("div", {
          "class": props2.class,
          "style": combinedStyle.value
        }, [props2.showMask && vue.createVNode("div", {
          "class": `${config.prefix}-modal-mask`,
          "style": state.maskStyle,
          "onClick": () => {
            if (props2.onClose) {
              props2.onClose();
            } else {
              ctx.emit("onClose");
            }
          }
        }, null), vue.createVNode("div", {
          "class": modalClass.value,
          "style": {
            ...state.modalStyle,
            ...state.initPos,
            ...innerSize.value
          },
          "ref": modalRef
        }, [vue.createVNode("div", {
          "class": `${config.prefix}-modal-header`,
          "ref": modalHeaderRef
        }, [slotTitle || ""]), vue.createVNode("div", {
          "class": `${config.prefix}-modal-body`
        }, [slotDefault]), vue.createVNode("div", {
          "class": `${config.prefix}-modal-func`
        }, [props2.showAdjust && vue.createVNode("div", {
          "class": `${config.prefix}-modal-adjust`,
          "onClick": (e) => {
            e.stopPropagation();
            if (!props2.isFullscreen) {
              state.historyPos = state.initPos;
              state.initPos = {
                left: "0",
                top: "0"
              };
            } else {
              state.initPos = state.historyPos;
            }
            props2.onAdjust(!props2.isFullscreen);
          }
        }, [vue.createVNode(Icon, {
          "name": props2.isFullscreen ? "suoxiao" : "fangda"
        }, null)]), vue.createVNode("div", {
          "class": `${config.prefix}-modal-close`,
          "onClick": (e) => {
            e.stopPropagation();
            if (props2.onClose) {
              props2.onClose();
            } else {
              ctx.emit("onClose");
            }
          }
        }, [vue.createVNode(Icon, {
          "name": "close"
        }, null)])])])])])]
      }) : "";
    };
  }
});
MdModal.install = (app) => {
  app.component(MdModal.name, MdModal);
  return app;
};
exports.Icon = Icon;
exports.MdModal = MdModal;
