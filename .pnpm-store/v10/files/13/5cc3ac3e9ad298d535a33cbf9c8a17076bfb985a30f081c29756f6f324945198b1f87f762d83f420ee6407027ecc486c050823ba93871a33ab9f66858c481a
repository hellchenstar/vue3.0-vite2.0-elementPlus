import { defineComponent, createVNode, inject, h, ref, shallowRef, reactive, computed, watch, nextTick, onMounted, Teleport } from "vue";
import { p as prefix, f as configOption } from "./config.mjs";
import { g as getSlot } from "./vue-tsx.mjs";
import { k as keyMove } from "./dom.mjs";
import { d as getZIndexIncrement } from "./index5.mjs";
const Icon$1 = /* @__PURE__ */ defineComponent({
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup(props2) {
    return () => {
      return configOption.iconfontType === "svg" ? createVNode("svg", {
        "class": `${prefix}-icon`,
        "aria-hidden": "true"
      }, [createVNode("use", {
        "xlink:href": `#${prefix}-icon-${props2.name}`
      }, null)]) : createVNode("i", {
        "class": `${prefix}-iconfont ${prefix}-icon-${props2.name}`
      }, null);
    };
  }
});
const Icon = /* @__PURE__ */ defineComponent({
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup(props2) {
    const customIcon = inject("customIcon");
    return () => {
      const item = customIcon.value[props2.name];
      if (typeof item === "object") {
        return typeof item.component === "object" ? h(item.component, item.props) : createVNode("span", {
          "innerHTML": item.component
        }, null);
      }
      return createVNode(Icon$1, {
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
const MdModal = /* @__PURE__ */ defineComponent({
  name: "MdModal",
  props,
  emits: ["onClose"],
  setup(props2, ctx) {
    const themeRef = inject("theme");
    const rootRef = inject("rootRef");
    const modalVisible = ref(props2.visible);
    const modalClass = ref([`${prefix}-modal`]);
    const modalRef = ref();
    const modalHeaderRef = ref();
    const bodyRef = ref();
    const containerRef = shallowRef();
    let keyMoveClear = () => {
    };
    const state = reactive({
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
    const innerSize = computed(() => {
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
    watch(() => props2.isFullscreen, (nVal) => {
      if (nVal) {
        keyMoveClear();
      } else {
        nextTick(() => {
          keyMoveClear = keyMove(modalHeaderRef.value, (left, top) => {
            state.initPos.left = left + "px";
            state.initPos.top = top + "px";
          });
        });
      }
    });
    watch(() => props2.visible, (nVal) => {
      if (nVal) {
        state.maskStyle.zIndex = configOption.editorConfig.zIndex + getZIndexIncrement();
        state.modalStyle.zIndex = configOption.editorConfig.zIndex + getZIndexIncrement();
        modalClass.value.push("zoom-in");
        modalVisible.value = nVal;
        nextTick(() => {
          const halfWidth = modalRef.value.offsetWidth / 2;
          const halfHeight = modalRef.value.offsetHeight / 2;
          const halfClientWidth = document.documentElement.clientWidth / 2;
          const halfClientHeight = document.documentElement.clientHeight / 2;
          state.initPos.left = halfClientWidth - halfWidth + "px";
          state.initPos.top = halfClientHeight - halfHeight + "px";
          if (!props2.isFullscreen) {
            keyMoveClear = keyMove(modalHeaderRef.value, (left, top) => {
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
    const internalStyle = computed(() => ({
      display: modalVisible.value ? "block" : "none"
    }));
    const combinedStyle = computed(() => {
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
    onMounted(() => {
      var _a;
      const rootNode = (_a = rootRef.value) == null ? void 0 : _a.getRootNode();
      bodyRef.value = rootNode instanceof Document ? document.body : rootNode;
    });
    return () => {
      const slotDefault = getSlot({
        ctx
      });
      const slotTitle = getSlot({
        props: props2,
        ctx
      }, "title");
      return bodyRef.value ? createVNode(Teleport, {
        "to": bodyRef.value
      }, {
        default: () => [createVNode("div", {
          "ref": containerRef,
          "class": `${prefix}-modal-container`,
          "data-theme": themeRef.value
        }, [createVNode("div", {
          "class": props2.class,
          "style": combinedStyle.value
        }, [props2.showMask && createVNode("div", {
          "class": `${prefix}-modal-mask`,
          "style": state.maskStyle,
          "onClick": () => {
            if (props2.onClose) {
              props2.onClose();
            } else {
              ctx.emit("onClose");
            }
          }
        }, null), createVNode("div", {
          "class": modalClass.value,
          "style": {
            ...state.modalStyle,
            ...state.initPos,
            ...innerSize.value
          },
          "ref": modalRef
        }, [createVNode("div", {
          "class": `${prefix}-modal-header`,
          "ref": modalHeaderRef
        }, [slotTitle || ""]), createVNode("div", {
          "class": `${prefix}-modal-body`
        }, [slotDefault]), createVNode("div", {
          "class": `${prefix}-modal-func`
        }, [props2.showAdjust && createVNode("div", {
          "class": `${prefix}-modal-adjust`,
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
        }, [createVNode(Icon, {
          "name": props2.isFullscreen ? "suoxiao" : "fangda"
        }, null)]), createVNode("div", {
          "class": `${prefix}-modal-close`,
          "onClick": (e) => {
            e.stopPropagation();
            if (props2.onClose) {
              props2.onClose();
            } else {
              ctx.emit("onClose");
            }
          }
        }, [createVNode(Icon, {
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
export {
  Icon as I,
  MdModal as M
};
