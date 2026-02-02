import { defineComponent, createVNode } from "vue";
import { p as prefix } from "./chunks/config.mjs";
import { g as getSlot } from "./chunks/vue-tsx.mjs";
const props = {
  title: {
    type: String,
    default: ""
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
const NormalToolbar = /* @__PURE__ */ defineComponent({
  name: "NormalToolbar",
  props,
  emits: ["onClick"],
  setup(props2, ctx) {
    return () => {
      const Trigger = getSlot({
        props: props2,
        ctx
      }, "trigger");
      return createVNode("div", {
        "class": `${prefix}-toolbar-item`,
        "title": props2.title,
        "onClick": (e) => {
          if (props2.onClick instanceof Function) {
            props2.onClick(e);
          } else {
            ctx.emit("onClick", e);
          }
        }
      }, [Trigger]);
    };
  }
});
NormalToolbar.install = (app) => {
  app.component(NormalToolbar.name, NormalToolbar);
  return app;
};
export {
  NormalToolbar as default
};
