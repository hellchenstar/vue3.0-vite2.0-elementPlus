"use strict";
const vue = require("vue");
const config = require("./config.cjs");
const vueTsx = require("./vue-tsx.cjs");
const props$1 = {
  overlay: {
    type: [String, Object],
    default: ""
  },
  visible: {
    type: Boolean,
    default: false
  },
  onChange: {
    type: Function,
    default: () => {
    }
  },
  // 相对滚动的元素选择器
  relative: {
    type: String,
    default: "html"
  }
};
const Dropdown = /* @__PURE__ */ vue.defineComponent({
  props: props$1,
  setup(props2, ctx) {
    const HIDDEN_CLASS = `${config.prefix}-dropdown-hidden`;
    const ctl = vue.reactive({
      overlayClass: [HIDDEN_CLASS],
      overlayStyle: {},
      triggerHover: false,
      overlayHover: false
    });
    const triggerRef = vue.ref();
    const overlayRef = vue.ref();
    const triggerHandler = () => {
      var _a, _b;
      ctl.triggerHover = true;
      const triggerEle = triggerRef.value;
      const overlayEle = overlayRef.value;
      if (!triggerEle || !overlayEle) {
        return;
      }
      const triggerInfo = triggerEle.getBoundingClientRect();
      const triggerTop = triggerEle.offsetTop;
      const triggerLeft = triggerEle.offsetLeft;
      const triggerHeight = triggerInfo.height;
      const triggerWidth = triggerInfo.width;
      const rootNode = triggerEle.getRootNode();
      const relativecrollLeft = ((_a = rootNode.querySelector(props2.relative)) == null ? void 0 : _a.scrollLeft) || 0;
      const relativeWidth = ((_b = rootNode.querySelector(props2.relative)) == null ? void 0 : _b.clientWidth) || 0;
      let left = triggerLeft - overlayEle.offsetWidth / 2 + triggerWidth / 2 - relativecrollLeft;
      if (left + overlayEle.offsetWidth > relativecrollLeft + relativeWidth) {
        left = relativecrollLeft + relativeWidth - overlayEle.offsetWidth;
      }
      if (left < 0) {
        left = 0;
      }
      ctl.overlayStyle = {
        ...ctl.overlayStyle,
        top: triggerTop + triggerHeight + "px",
        left: left + "px"
      };
      props2.onChange(true);
    };
    const overlayHandler = () => {
      ctl.overlayHover = true;
    };
    vue.watch(() => props2.visible, (newV) => {
      if (newV) {
        ctl.overlayClass = ctl.overlayClass.filter((classItem) => classItem !== HIDDEN_CLASS);
      } else {
        ctl.overlayClass.push(HIDDEN_CLASS);
      }
    });
    let hiddenTimer = -1;
    const leaveHidden = (e) => {
      if (triggerRef.value === e.target) {
        ctl.triggerHover = false;
      } else {
        ctl.overlayHover = false;
      }
      clearTimeout(hiddenTimer);
      hiddenTimer = window.setTimeout(() => {
        if (!ctl.overlayHover && !ctl.triggerHover) {
          props2.onChange(false);
        }
      }, 10);
    };
    vue.onMounted(() => {
      triggerRef.value.addEventListener("mouseenter", triggerHandler);
      triggerRef.value.addEventListener("mouseleave", leaveHidden);
      overlayRef.value.addEventListener("mouseenter", overlayHandler);
      overlayRef.value.addEventListener("mouseleave", leaveHidden);
    });
    vue.onBeforeUnmount(() => {
      triggerRef.value.removeEventListener("mouseenter", triggerHandler);
      triggerRef.value.removeEventListener("mouseleave", leaveHidden);
      overlayRef.value.removeEventListener("mouseenter", overlayHandler);
      overlayRef.value.removeEventListener("mouseleave", leaveHidden);
    });
    return () => {
      const slotDefault = vueTsx.getSlot({
        ctx
      });
      const slotOverlay = vueTsx.getSlot({
        props: props2,
        ctx
      }, "overlay");
      const trigger = vue.cloneVNode(slotDefault instanceof Array ? slotDefault[0] : slotDefault, {
        ref: triggerRef,
        key: "cloned-dropdown-trigger"
      });
      const overlay = vue.createVNode("div", {
        "class": [`${config.prefix}-dropdown`, ctl.overlayClass],
        "style": ctl.overlayStyle,
        "ref": overlayRef
      }, [vue.createVNode("div", {
        "class": `${config.prefix}-dropdown-overlay`
      }, [slotOverlay instanceof Array ? slotOverlay[0] : slotOverlay])]);
      return [trigger, overlay];
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
    default: void 0
  },
  // 展示在工具栏的内容，通常是个图标
  trigger: {
    type: [String, Object],
    default: void 0
  },
  onChange: {
    type: Function,
    default: void 0
  },
  // 下拉框中的内容
  overlay: {
    type: [String, Object],
    default: void 0
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
  },
  /**
   * ==结束
   */
  default: {
    type: [String, Object],
    default: void 0
  }
};
const DropdownToolbar = /* @__PURE__ */ vue.defineComponent({
  name: "DropdownToolbar",
  props,
  emits: ["onChange"],
  setup(props2, ctx) {
    const editorId = vue.inject("editorId");
    return () => {
      const Trigger = vueTsx.getSlot({
        props: props2,
        ctx
      }, "trigger");
      const Overlay = vueTsx.getSlot({
        props: props2,
        ctx
      }, "overlay");
      const Default = vueTsx.getSlot({
        props: props2,
        ctx
      });
      return vue.createVNode(Dropdown, {
        "relative": `#${editorId}-toolbar-wrapper`,
        "visible": props2.visible,
        "onChange": (v) => {
          if (props2.onChange instanceof Function) {
            props2.onChange(v);
          } else {
            ctx.emit("onChange", v);
          }
        },
        "overlay": Overlay
      }, {
        default: () => [vue.createVNode("div", {
          "class": `${config.prefix}-toolbar-item`,
          "title": props2.title || ""
        }, [Trigger, Default])]
      });
    };
  }
});
DropdownToolbar.install = (app) => {
  app.component(DropdownToolbar.name, DropdownToolbar);
  return app;
};
exports.Dropdown = Dropdown;
exports.DropdownToolbar = DropdownToolbar;
