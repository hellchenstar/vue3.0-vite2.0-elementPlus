var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { defineComponent, createVNode, inject, ref, onMounted, reactive, computed, watch, toRef, nextTick, Fragment, cloneVNode, shallowRef, onBeforeUnmount } from "vue";
import { p as prefix, f as configOption, b as allToolbar, M as MinInputBoxWidth, d as allFooter } from "./chunks/config.mjs";
import { draggingScroll, linkTo, throttle } from "@vavt/util";
import { a as Dropdown, D as DropdownToolbar } from "./chunks/index2.mjs";
import { b as bus, C as CHANGE_FULL_SCREEN, E as ERROR_CATCHER, U as UPLOAD_IMAGE, O as OPEN_MODALS, R as REPLACE, a as CHANGE_CATALOG_VISIBLE, c as ON_SAVE, d as CTRL_SHIFT_Z, e as CTRL_Z, f as EVENT_LISTENER, T as TASK_STATE_CHANGED } from "./chunks/event-name.mjs";
import { a as appendHandler } from "./chunks/dom.mjs";
import { M as MdModal, I as Icon } from "./chunks/index4.mjs";
import { b as base642File } from "./chunks/index5.mjs";
import { s as scrollAuto, a as scrollAutoWithScale, M as MdCatalog } from "./chunks/index3.mjs";
import { EditorView as EditorView$1 } from "codemirror";
import { EditorView, placeholder, keymap, drawSelection } from "@codemirror/view";
import { languages } from "@codemirror/language-data";
import { markdown } from "@codemirror/lang-markdown";
import { EditorSelection, EditorState, Compartment, StateEffect } from "@codemirror/state";
import { deleteLine, history, undo, redo, defaultKeymap, historyKeymap, indentWithTab } from "@codemirror/commands";
import { HighlightStyle, syntaxHighlighting, indentUnit } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { autocompletion } from "@codemirror/autocomplete";
import { searchKeymap } from "@codemirror/search";
import { c as contentProps, C as ContentPreview, e as editorProps, a as editorEmits, u as useOnSave, b as useProvide, d as useExpansion, f as useErrorCatcher, g as useConfig, h as useCatalog, i as useExpose, M as MdPreview } from "./chunks/index.mjs";
import { g as getSlot } from "./chunks/vue-tsx.mjs";
import NormalToolbar from "./NormalToolbar.mjs";
import ModalToolbar from "./ModalToolbar.mjs";
const Divider = /* @__PURE__ */ defineComponent({
  setup() {
    return () => createVNode("div", {
      "class": `${prefix}-divider`
    }, null);
  }
});
const toolbarProps = {
  noPrettier: {
    type: Boolean
  },
  // 工具栏选择显示
  toolbars: {
    type: Array,
    default: () => []
  },
  // 工具栏选择不显示
  toolbarsExclude: {
    type: Array,
    default: () => []
  },
  setting: {
    type: Object,
    default: () => ({})
  },
  screenfull: {
    type: Object,
    default: null
  },
  screenfullJs: {
    type: String,
    default: ""
  },
  updateSetting: {
    type: Function,
    default: () => {
    }
  },
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  defToolbars: {
    type: Object
  },
  noUploadImg: {
    type: Boolean
  },
  /**
   * 是否在工具栏下面显示对应的文字名称
   *
   * @default false
   */
  showToolbarName: {
    type: Boolean
  },
  catalogVisible: {
    type: Boolean
  },
  codeTheme: {
    type: String
  }
};
const useSreenfull = (props2) => {
  const editorId = inject("editorId");
  const { editorExtensions, editorExtensionsAttrs } = configOption;
  let screenfull = editorExtensions.screenfull.instance;
  const screenfullMe = ref(false);
  const fullscreenHandler = (status) => {
    if (!screenfull) {
      bus.emit(editorId, ERROR_CATCHER, {
        name: "fullscreen",
        message: "fullscreen is undefined"
      });
      return;
    }
    if (screenfull.isEnabled) {
      screenfullMe.value = true;
      const targetStatus = status === void 0 ? !screenfull.isFullscreen : status;
      if (targetStatus) {
        screenfull.request();
      } else {
        screenfull.exit();
      }
    } else {
      console.error("browser does not support screenfull!");
    }
  };
  const onScreenfullEvent = () => {
    if (screenfull && screenfull.isEnabled) {
      screenfull.on("change", () => {
        if (screenfullMe.value || props2.setting.fullscreen) {
          screenfullMe.value = false;
          props2.updateSetting("fullscreen");
        }
      });
    }
  };
  const screenfullLoad = () => {
    screenfull = window.screenfull;
    onScreenfullEvent();
  };
  onMounted(() => {
    var _a;
    onScreenfullEvent();
    if (!screenfull) {
      appendHandler(
        "script",
        {
          ...(_a = editorExtensionsAttrs.screenfull) == null ? void 0 : _a.js,
          src: editorExtensions.screenfull.js,
          id: `${prefix}-screenfull`,
          onload: screenfullLoad
        },
        "screenfull"
      );
    }
  });
  onMounted(() => {
    bus.on(editorId, {
      name: CHANGE_FULL_SCREEN,
      callback: fullscreenHandler
    });
  });
  return { fullscreenHandler };
};
const props$6 = {
  tableShape: {
    type: Array,
    default: () => [6, 4]
  },
  onSelected: {
    type: Function,
    default: () => {
    }
  }
};
const TableShape = /* @__PURE__ */ defineComponent({
  name: "TableShape",
  props: props$6,
  setup(props2) {
    const hoverPosition = reactive({
      x: -1,
      y: -1
    });
    const tableShapeStr = computed(() => {
      return JSON.stringify(props2.tableShape);
    });
    const initShape = () => {
      const shape = [...JSON.parse(tableShapeStr.value)];
      if (!shape[2] || shape[2] < shape[0]) {
        shape[2] = shape[0];
      }
      if (!shape[3] || shape[3] < shape[3]) {
        shape[3] = shape[1];
      }
      return shape;
    };
    const tableShape = ref(initShape());
    watch([tableShapeStr], () => {
      tableShape.value = initShape();
    });
    return () => createVNode("div", {
      "class": `${prefix}-table-shape`,
      "onMouseleave": () => {
        tableShape.value = initShape();
        hoverPosition.x = -1;
        hoverPosition.y = -1;
      }
    }, [new Array(tableShape.value[1]).fill("").map((_, rowIndex) => createVNode("div", {
      "class": `${prefix}-table-shape-row`,
      "key": `table-shape-row-${rowIndex}`
    }, [new Array(tableShape.value[0]).fill("").map((_2, colIndex) => createVNode("div", {
      "class": `${prefix}-table-shape-col`,
      "key": `table-shape-col-${colIndex}`,
      "onMouseenter": () => {
        hoverPosition.x = rowIndex;
        hoverPosition.y = colIndex;
        if (colIndex + 1 === tableShape.value[0] && colIndex + 1 < tableShape.value[2]) {
          tableShape.value[0]++;
        } else if (colIndex + 2 < tableShape.value[0] && tableShape.value[0] > props2.tableShape[0]) {
          tableShape.value[0]--;
        }
        if (rowIndex + 1 === tableShape.value[1] && rowIndex + 1 < tableShape.value[3]) {
          tableShape.value[1]++;
        } else if (rowIndex + 2 < tableShape.value[1] && tableShape.value[1] > props2.tableShape[1]) {
          tableShape.value[1]--;
        }
      },
      "onClick": () => {
        props2.onSelected(hoverPosition);
      }
    }, [createVNode("div", {
      "class": [`${prefix}-table-shape-col-default`, rowIndex <= hoverPosition.x && colIndex <= hoverPosition.y && `${prefix}-table-shape-col-include`]
    }, null)]))]))]);
  }
});
const props$5 = {
  type: {
    type: String,
    default: "link"
  },
  visible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
const LinkModal = /* @__PURE__ */ defineComponent({
  props: props$5,
  setup(props2) {
    const ult = inject("usedLanguageText");
    const editorId = inject("editorId");
    const title = computed(() => {
      var _a, _b;
      switch (props2.type) {
        case "link": {
          return (_a = ult.value.linkModalTips) == null ? void 0 : _a.linkTitle;
        }
        case "image": {
          return (_b = ult.value.linkModalTips) == null ? void 0 : _b.imageTitle;
        }
        default: {
          return "";
        }
      }
    });
    const linkData = reactive({
      desc: "",
      url: ""
    });
    watch(() => props2.visible, (nVal) => {
      if (!nVal) {
        setTimeout(() => {
          linkData.desc = "";
          linkData.url = "";
        }, 200);
      }
    });
    return () => createVNode(MdModal, {
      "title": title.value,
      "visible": props2.visible,
      "onClose": props2.onCancel
    }, {
      default: () => {
        var _a, _b, _c, _d, _e;
        return [createVNode("div", {
          "class": `${prefix}-form-item`
        }, [createVNode("label", {
          "class": `${prefix}-label`,
          "for": `link-desc-${editorId}`
        }, [(_a = ult.value.linkModalTips) == null ? void 0 : _a.descLabel]), createVNode("input", {
          "placeholder": (_b = ult.value.linkModalTips) == null ? void 0 : _b.descLabelPlaceHolder,
          "class": `${prefix}-input`,
          "id": `link-desc-${editorId}`,
          "type": "text",
          "value": linkData.desc,
          "onChange": (e) => {
            linkData.desc = e.target.value;
          },
          "autocomplete": "off"
        }, null)]), createVNode("div", {
          "class": `${prefix}-form-item`
        }, [createVNode("label", {
          "class": `${prefix}-label`,
          "for": `link-url-${editorId}`
        }, [(_c = ult.value.linkModalTips) == null ? void 0 : _c.urlLabel]), createVNode("input", {
          "placeholder": (_d = ult.value.linkModalTips) == null ? void 0 : _d.urlLabelPlaceHolder,
          "class": `${prefix}-input`,
          "id": `link-url-${editorId}`,
          "type": "text",
          "value": linkData.url,
          "onChange": (e) => {
            linkData.url = e.target.value;
          },
          "autocomplete": "off"
        }, null)]), createVNode("div", {
          "class": `${prefix}-form-item`
        }, [createVNode("button", {
          "class": [`${prefix}-btn`, `${prefix}-btn-row`],
          "type": "button",
          "onClick": () => {
            props2.onOk(linkData);
            linkData.desc = "";
            linkData.url = "";
          }
        }, [(_e = ult.value.linkModalTips) == null ? void 0 : _e.buttonOK])])];
      }
    });
  }
});
const props$4 = {
  visible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
const ClipModal = /* @__PURE__ */ defineComponent({
  props: props$4,
  setup(props2) {
    const ult = inject("usedLanguageText");
    const editorId = inject("editorId");
    const rootRef = inject("rootRef");
    let Cropper = configOption.editorExtensions.cropper.instance;
    const uploadRef = ref();
    const uploadImgRef = ref();
    const previewTargetRef = ref();
    const data = reactive({
      cropperInited: false,
      imgSelected: false,
      imgSrc: "",
      // 是否全屏
      isFullscreen: false
    });
    let cropper = null;
    watch(() => props2.visible, () => {
      if (props2.visible && !data.cropperInited) {
        Cropper = Cropper || window.Cropper;
        uploadRef.value.onchange = () => {
          if (!Cropper) {
            bus.emit(editorId, ERROR_CATCHER, {
              name: "Cropper",
              message: "Cropper is undefined"
            });
            return;
          }
          const fileList = uploadRef.value.files || [];
          data.imgSelected = true;
          if ((fileList == null ? void 0 : fileList.length) > 0) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
              data.imgSrc = e.target.result;
            };
            fileReader.readAsDataURL(fileList[0]);
          }
        };
      }
    });
    watch(() => [data.imgSelected], () => {
      previewTargetRef.value.style = "";
    });
    watch([toRef(() => data.isFullscreen), toRef(() => data.imgSrc)], () => {
      if (data.imgSrc) {
        nextTick(() => {
          cropper == null ? void 0 : cropper.destroy();
          previewTargetRef.value.style = "";
          if (uploadImgRef.value) {
            cropper = new Cropper(uploadImgRef.value, {
              viewMode: 2,
              preview: rootRef.value.getRootNode().querySelector(`.${prefix}-clip-preview-target`)
              // aspectRatio: 16 / 9,
            });
          }
        });
      }
    });
    const reset = () => {
      cropper.clear();
      cropper.destroy();
      cropper = null;
      uploadRef.value.value = "";
      data.imgSelected = false;
    };
    return () => {
      var _a;
      return createVNode(MdModal, {
        "class": `${prefix}-modal-clip`,
        "title": (_a = ult.value.clipModalTips) == null ? void 0 : _a.title,
        "visible": props2.visible,
        "onClose": props2.onCancel,
        "showAdjust": true,
        "isFullscreen": data.isFullscreen,
        "onAdjust": (val) => {
          data.isFullscreen = val;
        },
        "width": "668px",
        "height": "421px"
      }, {
        default: () => {
          var _a2, _b, _c;
          return [createVNode("div", {
            "class": `${prefix}-form-item ${prefix}-clip`
          }, [createVNode("div", {
            "class": `${prefix}-clip-main`
          }, [data.imgSelected ? createVNode("div", {
            "class": `${prefix}-clip-cropper`
          }, [createVNode("img", {
            "src": data.imgSrc,
            "ref": uploadImgRef,
            "style": {
              display: "none"
            },
            "alt": ""
          }, null), createVNode("div", {
            "class": `${prefix}-clip-delete`,
            "onClick": reset
          }, [createVNode(Icon, {
            "name": "delete"
          }, null)])]) : createVNode("div", {
            "class": `${prefix}-clip-upload`,
            "onClick": () => {
              uploadRef.value.click();
            },
            "role": "button",
            "tabindex": "0",
            "aria-label": (_a2 = ult.value.imgTitleItem) == null ? void 0 : _a2.upload
          }, [createVNode(Icon, {
            "name": "upload"
          }, null)])]), createVNode("div", {
            "class": `${prefix}-clip-preview`
          }, [createVNode("div", {
            "class": `${prefix}-clip-preview-target`,
            "ref": previewTargetRef
          }, null)])]), createVNode("div", {
            "class": `${prefix}-form-item`
          }, [createVNode("button", {
            "class": `${prefix}-btn`,
            "type": "button",
            "onClick": () => {
              if (cropper) {
                const cvs = cropper.getCroppedCanvas();
                bus.emit(editorId, UPLOAD_IMAGE, [base642File(cvs.toDataURL("image/png"))], props2.onOk);
                reset();
              }
            }
          }, [((_b = ult.value.clipModalTips) == null ? void 0 : _b.buttonUpload) || ((_c = ult.value.linkModalTips) == null ? void 0 : _c.buttonOK)])]), createVNode("input", {
            "ref": uploadRef,
            "accept": "image/*",
            "type": "file",
            "multiple": false,
            "style": {
              display: "none"
            },
            "aria-hidden": "true"
          }, null)];
        }
      });
    };
  }
});
const props$3 = {
  type: {
    type: String,
    default: "link"
  },
  linkVisible: {
    type: Boolean,
    default: false
  },
  clipVisible: {
    type: Boolean,
    default: false
  },
  onCancel: {
    type: Function,
    default: () => {
    }
  },
  onOk: {
    type: Function,
    default: () => {
    }
  }
};
const Modals = /* @__PURE__ */ defineComponent({
  props: props$3,
  setup(props2) {
    return () => createVNode(Fragment, null, [createVNode(LinkModal, {
      "type": props2.type,
      "visible": props2.linkVisible,
      "onOk": props2.onOk,
      "onCancel": props2.onCancel
    }, null), createVNode(ClipModal, {
      "visible": props2.clipVisible,
      "onOk": props2.onOk,
      "onCancel": props2.onCancel
    }, null)]);
  }
});
const ToolBar = /* @__PURE__ */ defineComponent({
  name: "MDEditorToolbar",
  props: toolbarProps,
  setup(props2) {
    const editorId = inject("editorId");
    const ult = inject("usedLanguageText");
    const theme = inject("theme");
    const previewTheme = inject("previewTheme");
    const language = inject("language");
    const {
      fullscreenHandler
    } = useSreenfull(props2);
    const wrapperId = `${editorId}-toolbar-wrapper`;
    const wrapperRef = ref();
    const visible = reactive({
      title: false,
      catalog: false,
      // 图片上传下拉
      image: false,
      // 表格预选
      table: false,
      // mermaid
      mermaid: false,
      katex: false
    });
    const emitHandler = (direct, params) => {
      bus.emit(editorId, REPLACE, direct, params);
    };
    const modalData = reactive({
      type: "link",
      linkVisible: false,
      clipVisible: false
    });
    const toolbarLeftRef = ref();
    onMounted(() => {
      bus.on(editorId, {
        name: OPEN_MODALS,
        callback(type) {
          modalData.type = type;
          modalData.linkVisible = true;
        }
      });
    });
    const splitedbar = computed(() => {
      const excluedBars = props2.toolbars.filter((barItem) => !props2.toolbarsExclude.includes(barItem));
      const moduleSplitIndex = excluedBars.indexOf("=");
      const barLeft = moduleSplitIndex === -1 ? excluedBars : excluedBars.slice(0, moduleSplitIndex + 1);
      const barRight = moduleSplitIndex === -1 ? [] : excluedBars.slice(moduleSplitIndex, Number.MAX_SAFE_INTEGER);
      return [barLeft, barRight];
    });
    const uploadRef = ref();
    const uploadHandler = () => {
      bus.emit(editorId, UPLOAD_IMAGE, Array.from(uploadRef.value.files || []));
      uploadRef.value.value = "";
    };
    onMounted(() => {
      uploadRef.value.addEventListener("change", uploadHandler);
    });
    const barRender = (barItem) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa;
      if (allToolbar.includes(barItem)) {
        switch (barItem) {
          case "-": {
            return createVNode(Divider, null, null);
          }
          case "bold": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_a = ult.value.toolbarTips) == null ? void 0 : _a.bold,
              "onClick": () => {
                emitHandler("bold");
              }
            }, [createVNode(Icon, {
              "name": "bold"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_b = ult.value.toolbarTips) == null ? void 0 : _b.bold])]);
          }
          case "underline": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_c = ult.value.toolbarTips) == null ? void 0 : _c.underline,
              "onClick": () => {
                emitHandler("underline");
              }
            }, [createVNode(Icon, {
              "name": "underline"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_d = ult.value.toolbarTips) == null ? void 0 : _d.underline])]);
          }
          case "italic": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_e = ult.value.toolbarTips) == null ? void 0 : _e.italic,
              "onClick": () => {
                emitHandler("italic");
              }
            }, [createVNode(Icon, {
              "name": "italic"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_f = ult.value.toolbarTips) == null ? void 0 : _f.italic])]);
          }
          case "strikeThrough": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_g = ult.value.toolbarTips) == null ? void 0 : _g.strikeThrough,
              "onClick": () => {
                emitHandler("strikeThrough");
              }
            }, [createVNode(Icon, {
              "name": "strike-through"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_h = ult.value.toolbarTips) == null ? void 0 : _h.strikeThrough])]);
          }
          case "title": {
            return createVNode(Dropdown, {
              "relative": `#${wrapperId}`,
              "visible": visible.title,
              "onChange": (v) => {
                visible.title = v;
              },
              "overlay": createVNode("ul", {
                "class": `${prefix}-menu`,
                "onClick": () => {
                  visible.title = false;
                },
                "role": "menu"
              }, [createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h1");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_i = ult.value.titleItem) == null ? void 0 : _i.h1]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h2");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_j = ult.value.titleItem) == null ? void 0 : _j.h2]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h3");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_k = ult.value.titleItem) == null ? void 0 : _k.h3]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h4");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_l = ult.value.titleItem) == null ? void 0 : _l.h4]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h5");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_m = ult.value.titleItem) == null ? void 0 : _m.h5]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-title`,
                "onClick": () => {
                  emitHandler("h6");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_n = ult.value.titleItem) == null ? void 0 : _n.h6])])
            }, {
              default: () => {
                var _a2, _b2;
                return [createVNode("div", {
                  "class": `${prefix}-toolbar-item`,
                  "title": (_a2 = ult.value.toolbarTips) == null ? void 0 : _a2.title
                }, [createVNode(Icon, {
                  "name": "title"
                }, null), props2.showToolbarName && createVNode("div", {
                  "class": `${prefix}-toolbar-item-name`
                }, [(_b2 = ult.value.toolbarTips) == null ? void 0 : _b2.title])])];
              }
            });
          }
          case "sub": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_o = ult.value.toolbarTips) == null ? void 0 : _o.sub,
              "onClick": () => {
                emitHandler("sub");
              }
            }, [createVNode(Icon, {
              "name": "sub"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_p = ult.value.toolbarTips) == null ? void 0 : _p.sub])]);
          }
          case "sup": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_q = ult.value.toolbarTips) == null ? void 0 : _q.sup,
              "onClick": () => {
                emitHandler("sup");
              }
            }, [createVNode(Icon, {
              "name": "sup"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_r = ult.value.toolbarTips) == null ? void 0 : _r.sup])]);
          }
          case "quote": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_s = ult.value.toolbarTips) == null ? void 0 : _s.quote,
              "onClick": () => {
                emitHandler("quote");
              }
            }, [createVNode(Icon, {
              "name": "quote"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_t = ult.value.toolbarTips) == null ? void 0 : _t.quote])]);
          }
          case "unorderedList": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_u = ult.value.toolbarTips) == null ? void 0 : _u.unorderedList,
              "onClick": () => {
                emitHandler("unorderedList");
              }
            }, [createVNode(Icon, {
              "name": "unordered-list"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_v = ult.value.toolbarTips) == null ? void 0 : _v.unorderedList])]);
          }
          case "orderedList": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_w = ult.value.toolbarTips) == null ? void 0 : _w.orderedList,
              "onClick": () => {
                emitHandler("orderedList");
              }
            }, [createVNode(Icon, {
              "name": "ordered-list"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_x = ult.value.toolbarTips) == null ? void 0 : _x.orderedList])]);
          }
          case "task": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_y = ult.value.toolbarTips) == null ? void 0 : _y.task,
              "onClick": () => {
                emitHandler("task");
              }
            }, [createVNode(Icon, {
              "name": "task"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_z = ult.value.toolbarTips) == null ? void 0 : _z.task])]);
          }
          case "codeRow": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_A = ult.value.toolbarTips) == null ? void 0 : _A.codeRow,
              "onClick": () => {
                emitHandler("codeRow");
              }
            }, [createVNode(Icon, {
              "name": "code-row"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_B = ult.value.toolbarTips) == null ? void 0 : _B.codeRow])]);
          }
          case "code": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_C = ult.value.toolbarTips) == null ? void 0 : _C.code,
              "onClick": () => {
                emitHandler("code");
              }
            }, [createVNode(Icon, {
              "name": "code"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_D = ult.value.toolbarTips) == null ? void 0 : _D.code])]);
          }
          case "link": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_E = ult.value.toolbarTips) == null ? void 0 : _E.link,
              "onClick": () => {
                modalData.type = "link";
                modalData.linkVisible = true;
              }
            }, [createVNode(Icon, {
              "name": "link"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_F = ult.value.toolbarTips) == null ? void 0 : _F.link])]);
          }
          case "image": {
            return props2.noUploadImg ? createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_G = ult.value.toolbarTips) == null ? void 0 : _G.image,
              "onClick": () => {
                modalData.type = "image";
                modalData.linkVisible = true;
              }
            }, [createVNode(Icon, {
              "name": "image"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_H = ult.value.toolbarTips) == null ? void 0 : _H.image])]) : createVNode(Dropdown, {
              "relative": `#${wrapperId}`,
              "visible": visible.image,
              "onChange": (v) => {
                visible.image = v;
              },
              "overlay": createVNode("ul", {
                "class": `${prefix}-menu`,
                "onClick": () => {
                  visible.title = false;
                },
                "role": "menu"
              }, [createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-image`,
                "onClick": () => {
                  modalData.type = "image";
                  modalData.linkVisible = true;
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_I = ult.value.imgTitleItem) == null ? void 0 : _I.link]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-image`,
                "onClick": () => {
                  uploadRef.value.click();
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_J = ult.value.imgTitleItem) == null ? void 0 : _J.upload]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-image`,
                "onClick": () => {
                  modalData.clipVisible = true;
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_K = ult.value.imgTitleItem) == null ? void 0 : _K.clip2upload])])
            }, {
              default: () => {
                var _a2, _b2;
                return [createVNode("div", {
                  "class": `${prefix}-toolbar-item`,
                  "title": (_a2 = ult.value.toolbarTips) == null ? void 0 : _a2.image
                }, [createVNode(Icon, {
                  "name": "image"
                }, null), props2.showToolbarName && createVNode("div", {
                  "class": `${prefix}-toolbar-item-name`
                }, [(_b2 = ult.value.toolbarTips) == null ? void 0 : _b2.image])])];
              }
            });
          }
          case "table": {
            return createVNode(Dropdown, {
              "relative": `#${wrapperId}`,
              "visible": visible.table,
              "onChange": (v) => {
                visible.table = v;
              },
              "key": "bar-table",
              "overlay": createVNode(TableShape, {
                "tableShape": props2.tableShape,
                "onSelected": (selectedShape) => {
                  emitHandler("table", {
                    selectedShape
                  });
                }
              }, null)
            }, {
              default: () => {
                var _a2, _b2;
                return [createVNode("div", {
                  "class": `${prefix}-toolbar-item`,
                  "title": (_a2 = ult.value.toolbarTips) == null ? void 0 : _a2.table
                }, [createVNode(Icon, {
                  "name": "table"
                }, null), props2.showToolbarName && createVNode("div", {
                  "class": `${prefix}-toolbar-item-name`
                }, [(_b2 = ult.value.toolbarTips) == null ? void 0 : _b2.table])])];
              }
            });
          }
          case "revoke": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_L = ult.value.toolbarTips) == null ? void 0 : _L.revoke,
              "onClick": () => {
                bus.emit(editorId, CTRL_Z);
              }
            }, [createVNode(Icon, {
              "name": "revoke"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_M = ult.value.toolbarTips) == null ? void 0 : _M.revoke])]);
          }
          case "next": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_N = ult.value.toolbarTips) == null ? void 0 : _N.next,
              "onClick": () => {
                bus.emit(editorId, CTRL_SHIFT_Z);
              }
            }, [createVNode(Icon, {
              "name": "next"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_O = ult.value.toolbarTips) == null ? void 0 : _O.next])]);
          }
          case "save": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_P = ult.value.toolbarTips) == null ? void 0 : _P.save,
              "onClick": () => {
                bus.emit(editorId, ON_SAVE);
              }
            }, [createVNode(Icon, {
              "name": "baocun"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_Q = ult.value.toolbarTips) == null ? void 0 : _Q.save])]);
          }
          case "prettier": {
            return !props2.noPrettier ? createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_R = ult.value.toolbarTips) == null ? void 0 : _R.prettier,
              "onClick": () => {
                emitHandler("prettier");
              }
            }, [createVNode(Icon, {
              "name": "prettier"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_S = ult.value.toolbarTips) == null ? void 0 : _S.prettier])]) : "";
          }
          case "pageFullscreen": {
            return !props2.setting.fullscreen && createVNode("div", {
              "class": [`${prefix}-toolbar-item`, props2.setting.pageFullscreen && `${prefix}-toolbar-active`],
              "title": (_T = ult.value.toolbarTips) == null ? void 0 : _T.pageFullscreen,
              "onClick": () => {
                props2.updateSetting("pageFullscreen");
              }
            }, [createVNode(Icon, {
              "name": props2.setting.pageFullscreen ? "suoxiao" : "fangda"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_U = ult.value.toolbarTips) == null ? void 0 : _U.pageFullscreen])]);
          }
          case "fullscreen": {
            return createVNode("div", {
              "class": [`${prefix}-toolbar-item`, props2.setting.fullscreen && `${prefix}-toolbar-active`],
              "title": (_V = ult.value.toolbarTips) == null ? void 0 : _V.fullscreen,
              "onClick": () => {
                fullscreenHandler();
              }
            }, [createVNode(Icon, {
              "name": props2.setting.fullscreen ? "fullscreen-exit" : "fullscreen"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_W = ult.value.toolbarTips) == null ? void 0 : _W.fullscreen])]);
          }
          case "preview": {
            return createVNode("div", {
              "class": [`${prefix}-toolbar-item`, props2.setting.preview && `${prefix}-toolbar-active`],
              "title": (_X = ult.value.toolbarTips) == null ? void 0 : _X.preview,
              "onClick": () => {
                props2.updateSetting("preview");
              }
            }, [createVNode(Icon, {
              "name": "preview"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_Y = ult.value.toolbarTips) == null ? void 0 : _Y.preview])]);
          }
          case "previewOnly": {
            return createVNode("div", {
              "class": [`${prefix}-toolbar-item`, props2.setting.previewOnly && `${prefix}-toolbar-active`],
              "title": (_Z = ult.value.toolbarTips) == null ? void 0 : _Z.previewOnly,
              "onClick": () => {
                props2.updateSetting("previewOnly");
              }
            }, [createVNode(Icon, {
              "name": "preview-only"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(__ = ult.value.toolbarTips) == null ? void 0 : __.previewOnly])]);
          }
          case "htmlPreview": {
            return createVNode("div", {
              "class": [`${prefix}-toolbar-item`, props2.setting.htmlPreview && `${prefix}-toolbar-active`],
              "title": (_$ = ult.value.toolbarTips) == null ? void 0 : _$.htmlPreview,
              "onClick": () => {
                props2.updateSetting("htmlPreview");
              }
            }, [createVNode(Icon, {
              "name": "coding"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_aa = ult.value.toolbarTips) == null ? void 0 : _aa.htmlPreview])]);
          }
          case "catalog": {
            return createVNode("div", {
              "class": [`${prefix}-toolbar-item`, props2.catalogVisible && `${prefix}-toolbar-active`],
              "title": (_ba = ult.value.toolbarTips) == null ? void 0 : _ba.catalog,
              "onClick": () => {
                bus.emit(editorId, CHANGE_CATALOG_VISIBLE);
              },
              "key": "bar-catalog"
            }, [createVNode(Icon, {
              "name": "catalog"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_ca = ult.value.toolbarTips) == null ? void 0 : _ca.catalog])]);
          }
          case "github": {
            return createVNode("div", {
              "class": `${prefix}-toolbar-item`,
              "title": (_da = ult.value.toolbarTips) == null ? void 0 : _da.github,
              "onClick": () => linkTo("https://github.com/imzbf/md-editor-v3")
            }, [createVNode(Icon, {
              "name": "github"
            }, null), props2.showToolbarName && createVNode("div", {
              "class": `${prefix}-toolbar-item-name`
            }, [(_ea = ult.value.toolbarTips) == null ? void 0 : _ea.github])]);
          }
          case "mermaid": {
            return createVNode(Dropdown, {
              "relative": `#${wrapperId}`,
              "visible": visible.mermaid,
              "onChange": (v) => {
                visible.mermaid = v;
              },
              "overlay": createVNode("ul", {
                "class": `${prefix}-menu`,
                "onClick": () => {
                  visible.mermaid = false;
                },
                "role": "menu"
              }, [createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("flow");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_fa = ult.value.mermaid) == null ? void 0 : _fa.flow]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("sequence");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_ga = ult.value.mermaid) == null ? void 0 : _ga.sequence]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("gantt");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_ha = ult.value.mermaid) == null ? void 0 : _ha.gantt]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("class");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_ia = ult.value.mermaid) == null ? void 0 : _ia.class]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("state");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_ja = ult.value.mermaid) == null ? void 0 : _ja.state]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("pie");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_ka = ult.value.mermaid) == null ? void 0 : _ka.pie]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("relationship");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_la = ult.value.mermaid) == null ? void 0 : _la.relationship]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-mermaid`,
                "onClick": () => {
                  emitHandler("journey");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_ma = ult.value.mermaid) == null ? void 0 : _ma.journey])]),
              "key": "bar-mermaid"
            }, {
              default: () => {
                var _a2, _b2;
                return [createVNode("div", {
                  "class": `${prefix}-toolbar-item`,
                  "title": (_a2 = ult.value.toolbarTips) == null ? void 0 : _a2.mermaid
                }, [createVNode(Icon, {
                  "name": "mermaid"
                }, null), props2.showToolbarName && createVNode("div", {
                  "class": `${prefix}-toolbar-item-name`
                }, [(_b2 = ult.value.toolbarTips) == null ? void 0 : _b2.mermaid])])];
              }
            });
          }
          case "katex": {
            return createVNode(Dropdown, {
              "relative": `#${wrapperId}`,
              "visible": visible.katex,
              "onChange": (v) => {
                visible.katex = v;
              },
              "overlay": createVNode("ul", {
                "class": `${prefix}-menu`,
                "onClick": () => {
                  visible.katex = false;
                },
                "role": "menu"
              }, [createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-katex`,
                "onClick": () => {
                  emitHandler("katexInline");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_na = ult.value.katex) == null ? void 0 : _na.inline]), createVNode("li", {
                "class": `${prefix}-menu-item ${prefix}-menu-item-katex`,
                "onClick": () => {
                  emitHandler("katexBlock");
                },
                "role": "menuitem",
                "tabindex": "0"
              }, [(_oa = ult.value.katex) == null ? void 0 : _oa.block])]),
              "key": "bar-katex"
            }, {
              default: () => {
                var _a2, _b2;
                return [createVNode("div", {
                  "class": `${prefix}-toolbar-item`,
                  "title": (_a2 = ult.value.toolbarTips) == null ? void 0 : _a2.katex
                }, [createVNode(Icon, {
                  "name": "formula"
                }, null), props2.showToolbarName && createVNode("div", {
                  "class": `${prefix}-toolbar-item-name`
                }, [(_b2 = ult.value.toolbarTips) == null ? void 0 : _b2.katex])])];
              }
            });
          }
        }
      } else if (props2.defToolbars instanceof Array) {
        const defItem = props2.defToolbars[barItem];
        if (defItem) {
          const defItemCloned = cloneVNode(defItem, {
            theme: ((_pa = defItem.props) == null ? void 0 : _pa.theme) || theme.value,
            previewTheme: ((_qa = defItem.props) == null ? void 0 : _qa.theme) || previewTheme.value,
            language: ((_ra = defItem.props) == null ? void 0 : _ra.theme) || language.value,
            codeTheme: ((_sa = defItem.props) == null ? void 0 : _sa.codeTheme) || props2.codeTheme,
            insert(generate) {
              bus.emit(editorId, REPLACE, "universal", {
                generate
              });
            }
          });
          return defItemCloned;
        }
        return "";
      } else if (props2.defToolbars && props2.defToolbars.children instanceof Array) {
        const defItem = props2.defToolbars.children[barItem];
        if (defItem) {
          const defItemCloned = cloneVNode(defItem, {
            theme: ((_ta = defItem.props) == null ? void 0 : _ta.theme) || theme.value,
            previewTheme: ((_ua = defItem.props) == null ? void 0 : _ua.theme) || previewTheme.value,
            language: ((_va = defItem.props) == null ? void 0 : _va.theme) || language.value,
            codeTheme: ((_wa = defItem.props) == null ? void 0 : _wa.codeTheme) || props2.codeTheme,
            insert(generate) {
              bus.emit(editorId, REPLACE, "universal", {
                generate
              });
            }
          });
          return defItemCloned;
        }
        return "";
      } else {
        return "";
      }
    };
    watch(() => props2.toolbars, () => {
      nextTick(() => {
        if (wrapperRef.value) {
          draggingScroll(wrapperRef.value);
        }
      });
    }, {
      immediate: true
    });
    return () => {
      var _a;
      const LeftBar = splitedbar.value[0].map((barItem) => barRender(barItem));
      const RightBar = splitedbar.value[1].map((barItem) => barRender(barItem));
      return createVNode(Fragment, null, [props2.toolbars.length > 0 && createVNode("div", {
        "class": `${prefix}-toolbar-wrapper`,
        "ref": wrapperRef,
        "id": wrapperId
      }, [createVNode("div", {
        "class": [`${prefix}-toolbar`, props2.showToolbarName && `${prefix}-stn`]
      }, [createVNode("div", {
        "class": `${prefix}-toolbar-left`,
        "ref": toolbarLeftRef
      }, [LeftBar]), createVNode("div", {
        "class": `${prefix}-toolbar-right`
      }, [RightBar])])]), createVNode("label", {
        "for": `${wrapperId}_label`,
        "style": {
          display: "none"
        },
        "aria-label": (_a = ult.value.imgTitleItem) == null ? void 0 : _a.upload
      }, null), createVNode("input", {
        "id": `${wrapperId}_label`,
        "ref": uploadRef,
        "accept": "image/*",
        "type": "file",
        "multiple": true,
        "style": {
          display: "none"
        }
      }, null), createVNode(Modals, {
        "linkVisible": modalData.linkVisible,
        "clipVisible": modalData.clipVisible,
        "type": modalData.type,
        "onCancel": () => {
          modalData.linkVisible = false;
          modalData.clipVisible = false;
        },
        "onOk": (data) => {
          if (data) {
            emitHandler(modalData.type, {
              desc: data.desc,
              url: data.url,
              transform: modalData.type === "image"
            });
          }
          modalData.linkVisible = false;
          modalData.clipVisible = false;
        }
      }, null)]);
    };
  }
});
const useAutoScroll = (props2, html, codeMirrorUt) => {
  const editorId = inject("editorId");
  let clearScrollAuto = () => {
  };
  let initScrollAuto = () => {
  };
  const rebindEvent = () => {
    var _a;
    clearScrollAuto();
    const rootNode = (_a = codeMirrorUt.value) == null ? void 0 : _a.view.contentDOM.getRootNode();
    const cmScroller = rootNode.querySelector(
      `#${editorId} .cm-scroller`
    );
    const previewEle = rootNode.querySelector(
      `[id="${editorId}-preview-wrapper"]`
    );
    const htmlEle = rootNode.querySelector(
      `[id="${editorId}-html-wrapper"]`
    );
    if (previewEle || htmlEle) {
      const scrollHandler = previewEle ? scrollAuto : scrollAutoWithScale;
      const cEle = previewEle || htmlEle;
      [initScrollAuto, clearScrollAuto] = scrollHandler(
        cmScroller,
        cEle,
        codeMirrorUt.value
      );
      if (props2.scrollAuto) {
        initScrollAuto();
      }
    }
  };
  watch(
    [
      html,
      toRef(props2.setting, "preview"),
      toRef(props2.setting, "htmlPreview"),
      toRef(props2.setting, "fullscreen"),
      toRef(props2.setting, "pageFullscreen")
    ],
    () => {
      nextTick(rebindEvent);
    }
  );
  watch(
    () => props2.scrollAuto,
    (sa) => {
      if (sa) {
        initScrollAuto();
      } else {
        clearScrollAuto();
      }
    }
  );
  watch(
    () => props2.setting.previewOnly,
    (po) => {
      if (po) {
        clearScrollAuto();
      } else {
        initScrollAuto();
      }
    }
  );
  onMounted(rebindEvent);
};
const directive2flag = async (direct, codeMirrorUt, params) => {
  var _a;
  let targetValue = "";
  let deviationStart = 0;
  let deviationEnd = 0;
  let select = true;
  let replaceAll = false;
  const selectedText = codeMirrorUt.getSelectedText();
  const mermaidTemplate = configOption.editorConfig.mermaidTemplate;
  if (/^h[1-6]{1}$/.test(direct)) {
    const pix = direct.replace(/^h(\d)/, (_, num) => {
      return new Array(Number(num)).fill("#", 0, num).join("");
    });
    targetValue = `${pix} ${selectedText}`;
    deviationStart = pix.length + 1;
  } else if (direct === "prettier") {
    const prettier = window.prettier || configOption.editorExtensions.prettier.prettierInstance;
    const prettierPlugins = [
      ((_a = window.prettierPlugins) == null ? void 0 : _a.markdown) || configOption.editorExtensions.prettier.parserMarkdownInstance
    ];
    if (!prettier || prettierPlugins[0] === void 0) {
      bus.emit(params.editorId, ERROR_CATCHER, {
        name: "prettier",
        message: "prettier is undefined"
      });
      targetValue = codeMirrorUt.getValue();
    } else {
      targetValue = await prettier.format(codeMirrorUt.getValue(), {
        parser: "markdown",
        plugins: prettierPlugins
      });
    }
    select = false;
    replaceAll = true;
  } else {
    switch (direct) {
      case "bold": {
        targetValue = `**${selectedText}**`;
        deviationStart = 2;
        deviationEnd = -2;
        break;
      }
      case "underline": {
        targetValue = `<u>${selectedText}</u>`;
        deviationStart = 3;
        deviationEnd = -4;
        break;
      }
      case "italic": {
        targetValue = `*${selectedText}*`;
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case "strikeThrough": {
        targetValue = `~~${selectedText}~~`;
        deviationStart = 2;
        deviationEnd = -2;
        break;
      }
      case "sub": {
        targetValue = `~${selectedText}~`;
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case "sup": {
        targetValue = `^${selectedText}^`;
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case "codeRow": {
        targetValue = "`" + selectedText + "`";
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case "quote": {
        targetValue = `> ${selectedText}`;
        deviationStart = 2;
        break;
      }
      case "orderedList": {
        targetValue = `1. ${selectedText}`;
        deviationStart = 3;
        break;
      }
      case "unorderedList": {
        targetValue = `- ${selectedText}`;
        deviationStart = 2;
        break;
      }
      case "task": {
        targetValue = `- [ ] ${selectedText}`;
        deviationStart = 6;
        break;
      }
      case "code": {
        const text = params.text || selectedText || "";
        const mode = params.mode || "language";
        targetValue = `\`\`\`${mode}
${text}
\`\`\`
`;
        deviationStart = 3;
        deviationEnd = 3 + mode.length - targetValue.length;
        break;
      }
      case "table": {
        targetValue = "|";
        const { selectedShape = { x: 1, y: 1 } } = params;
        const { x, y } = selectedShape;
        for (let i = 0; i <= y; i++) {
          targetValue += " col |";
        }
        targetValue += "\n|";
        for (let i = 0; i <= y; i++) {
          targetValue += " - |";
        }
        for (let row = 0; row <= x; row++) {
          targetValue += "\n|";
          for (let col = 0; col <= y; col++) {
            targetValue += " content |";
          }
        }
        deviationStart = 2;
        deviationEnd = 5 - targetValue.length;
        break;
      }
      case "link": {
        const { desc, url } = params;
        targetValue = `[${desc}](${url})`;
        select = false;
        break;
      }
      case "image": {
        const { desc, url, urls } = params;
        if (urls instanceof Array) {
          targetValue = urls.reduce((pVal, _url) => {
            const {
              url: url2 = "",
              alt = "",
              title = ""
            } = typeof _url === "object" ? _url : { url: _url };
            return pVal + `![${alt}](${url2}${title ? " '" + title + "'" : ""})
`;
          }, "");
        } else {
          targetValue = `![${desc}](${url})
`;
        }
        select = false;
        break;
      }
      case "flow": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.flow) || "flowchart TD \n  Start --> Stop"}
\`\`\`
`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      case "sequence": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.sequence) || "sequenceDiagram\n  A->>B: hello!\n  B-->>A: hi!\n  A-)B: bye!"}
\`\`\`
`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      case "gantt": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.gantt) || "gantt\ntitle A Gantt Diagram\ndateFormat  YYYY-MM-DD\nsection Section\nA task  :a1, 2014-01-01, 30d\nAnother task  :after a1, 20d"}
\`\`\`
`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      case "class": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.class) || "classDiagram\n  class Animal\n  Vehicle <|-- Car"}
\`\`\`
`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      case "state": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.state) || "stateDiagram-v2\n  s1 --> s2"}
\`\`\`
`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      case "pie": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.pie) || 'pie title Pets adopted by volunteers\n  "Dogs" : 386\n  "Cats" : 85\n  "Rats" : 15'}
\`\`\`
`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      case "relationship": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.relationship) || "erDiagram\n  CAR ||--o{ NAMED-DRIVER : allows\n  PERSON ||--o{ NAMED-DRIVER : is"}
\`\`\`
`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      case "journey": {
        targetValue = `\`\`\`mermaid
${(mermaidTemplate == null ? void 0 : mermaidTemplate.journey) || "journey\n  title My working day\n  section Go to work\n    Make tea: 5: Me\n    Go upstairs: 3: Me\n    Do work: 1: Me, Cat\n  section Go home\n    Go downstairs: 5: Me\n    Sit down: 5: Me"}
\`\`\`
`;
        deviationStart = 11;
        deviationEnd = -5;
        break;
      }
      case "katexInline": {
        targetValue = "$$";
        deviationStart = 1;
        deviationEnd = -1;
        break;
      }
      case "katexBlock": {
        targetValue = "$$\n\n$$\n";
        deviationStart = 3;
        deviationEnd = -4;
        break;
      }
      case "universal": {
        const { generate } = params;
        const insertOptions = generate(selectedText);
        targetValue = insertOptions.targetValue;
        select = insertOptions.select ?? true;
        deviationStart = insertOptions.deviationStart || 0;
        deviationEnd = insertOptions.deviationEnd || 0;
      }
    }
  }
  return {
    text: targetValue,
    options: {
      // 是否选中
      select,
      // 选中时，开始位置的偏移量
      deviationStart,
      // 结束的偏移量
      deviationEnd,
      // 是否整个替换
      replaceAll
    }
  };
};
const chalky$1 = "#e5c07b", coral$1 = "var(--md-color)", cyan$1 = "#56b6c2", invalid$1 = "#ffffff", ivory$1 = "var(--md-color)", stone$1 = "#e5c07b", malibu$1 = "#e5c07b", sage$1 = "var(--md-color)", whiskey$1 = "#d19a66", violet$1 = "#c678dd", darkBackground$1 = "#21252b", highlightBackground$1 = "#2c313a", background$1 = "var(--md-bk-color)", tooltipBackground$1 = "var(--md-bk-color)", selection$1 = "#ceedfa33", cursor$1 = "#528bff";
const oneDarkTheme = EditorView.theme(
  {
    "&": {
      color: ivory$1,
      backgroundColor: background$1
    },
    ".cm-content": {
      caretColor: cursor$1
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor$1 },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: selection$1 },
    ".cm-panels": { backgroundColor: darkBackground$1, color: ivory$1 },
    ".cm-panels.cm-panels-top": { borderBottom: "1px solid var(--md-border-color)" },
    ".cm-panels.cm-panels-bottom": { borderTop: "1px solid var(--md-border-color)" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#ceedfa33" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: background$1,
      color: ivory$1,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: highlightBackground$1
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "1px solid var(--md-border-color)",
      backgroundColor: tooltipBackground$1
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground$1,
      borderBottomColor: tooltipBackground$1
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        color: ivory$1
      }
    }
  },
  { dark: true }
);
const oneDarkHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: violet$1 },
  { tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName], color: coral$1 },
  { tag: [tags.function(tags.variableName), tags.labelName], color: malibu$1 },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: whiskey$1 },
  { tag: [tags.definition(tags.name), tags.separator], color: ivory$1 },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace
    ],
    color: chalky$1
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string)
    ],
    color: cyan$1
  },
  { tag: [tags.meta, tags.comment], color: stone$1 },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: stone$1, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: coral$1 },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: whiskey$1 },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: sage$1 },
  { tag: tags.invalid, color: invalid$1 }
]);
const oneDark = [
  oneDarkTheme,
  syntaxHighlighting(oneDarkHighlightStyle)
];
const chalky = "#e5c07b", coral = "#3f4a54", cyan = "#56b6c2", invalid = "#fff", ivory = "#3f4a54", stone = "#2d8cf0", malibu = "#2d8cf0", sage = "#3f4a54", whiskey = "#d19a66", violet = "#c678dd", darkBackground = "#f6f6f6", highlightBackground = "#ceedfa33", background = "var(--md-bk-color)", tooltipBackground = "var(--md-bk-color)", selection = "#bad5fa", cursor = "#3f4a54";
const oneLightTheme = EditorView.theme(
  {
    "&": {
      color: ivory,
      backgroundColor: background
    },
    ".cm-content": {
      caretColor: cursor
    },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: cursor },
    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": { backgroundColor: selection },
    ".cm-panels": { backgroundColor: darkBackground, color: ivory },
    ".cm-panels.cm-panels-top": { borderBottom: "1px solid var(--md-border-color)" },
    ".cm-panels.cm-panels-bottom": { borderTop: "1px solid var(--md-border-color)" },
    ".cm-searchMatch": {
      backgroundColor: "#72a1ff59",
      outline: "1px solid #457dff"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      backgroundColor: "#6199ff2f"
    },
    ".cm-activeLine": { backgroundColor: "#ceedfa33" },
    ".cm-selectionMatch": { backgroundColor: "#aafe661a" },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "#bad0f847"
    },
    ".cm-gutters": {
      backgroundColor: background,
      color: ivory,
      borderRight: "1px solid",
      borderColor: "var(--md-border-color)"
    },
    ".cm-activeLineGutter": {
      backgroundColor: highlightBackground
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "transparent",
      border: "none",
      color: "#ddd"
    },
    ".cm-tooltip": {
      border: "1px solid var(--md-border-color)",
      backgroundColor: tooltipBackground
    },
    ".cm-tooltip .cm-tooltip-arrow:before": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    },
    ".cm-tooltip .cm-tooltip-arrow:after": {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground
    },
    ".cm-tooltip-autocomplete": {
      "& > ul > li[aria-selected]": {
        color: ivory
      }
    }
  }
  // { dark: true }
);
const oneLightHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: violet },
  { tag: [tags.name, tags.deleted, tags.character, tags.propertyName, tags.macroName], color: coral },
  { tag: [tags.function(tags.variableName), tags.labelName], color: malibu },
  { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: whiskey },
  { tag: [tags.definition(tags.name), tags.separator], color: ivory },
  {
    tag: [
      tags.typeName,
      tags.className,
      tags.number,
      tags.changed,
      tags.annotation,
      tags.modifier,
      tags.self,
      tags.namespace
    ],
    color: chalky
  },
  {
    tag: [
      tags.operator,
      tags.operatorKeyword,
      tags.url,
      tags.escape,
      tags.regexp,
      tags.link,
      tags.special(tags.string)
    ],
    color: cyan
  },
  { tag: [tags.meta, tags.comment], color: stone },
  { tag: tags.strong, fontWeight: "bold" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: stone, textDecoration: "underline" },
  { tag: tags.heading, fontWeight: "bold", color: coral },
  { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: whiskey },
  { tag: [tags.processingInstruction, tags.string, tags.inserted], color: sage },
  { tag: tags.invalid, color: invalid }
]);
const oneLight = [
  oneLightTheme,
  syntaxHighlighting(oneLightHighlightStyle)
];
const getPairApply = (flag, type, title, suffix, selectType) => {
  return (view, _completion, from, to) => {
    const label = `${flag}${type}`.slice(to - from);
    view.dispatch(view.state.replaceSelection(`${label}${title}${suffix}`));
    const newTo = from + _completion.label.length + (selectType === "title" ? title.length : 0);
    view.dispatch({
      selection: EditorSelection.create(
        [
          EditorSelection.range(
            from + _completion.label.length + (selectType === "title" ? 1 : -type.length),
            newTo
          ),
          EditorSelection.cursor(newTo)
        ],
        1
      )
    });
    view.focus();
  };
};
const getApply = (_label) => {
  return (view, _completion, from, to) => {
    const label = _label.slice(to - from);
    view.dispatch(view.state.replaceSelection(`${label} `));
  };
};
const createAutocompletion = (completions) => {
  const defaultCompletion = (context) => {
    const word = context.matchBefore(
      /^#+|^-\s*\[*\s*\]*|`+|\[|!\[*|^\|\s?\|?|\$\$?|!+\s*\w*/
    );
    if (word === null || word.from == word.to && context.explicit) {
      return null;
    }
    return {
      from: word.from,
      options: [
        // 标题
        ...["h2", "h3", "h4", "h5", "h6"].map((key, index) => {
          const label = new Array(index + 2).fill("#").join("");
          return {
            label,
            type: "text",
            apply: getApply(label)
          };
        }),
        // 任务列表
        ...["unchecked", "checked"].map((key) => {
          const label = key === "checked" ? "- [x]" : "- [ ]";
          return {
            label,
            type: "text",
            apply: getApply(label)
          };
        }),
        // 代码
        ...[
          ["`", ""],
          ["```", "language"],
          ["```mermaid\n", ""]
        ].map((c) => {
          return {
            label: `${c[0]}${c[1]}`,
            type: "text",
            apply: getPairApply(c[0], c[1], "", c[0] === "`" ? "`" : "\n```", "type")
          };
        }),
        // 链接
        {
          label: "[]()",
          type: "text"
        },
        {
          label: "![]()",
          type: "text"
        },
        // 表格
        {
          label: "| |",
          type: "text",
          detail: "table",
          apply: "| col | col | col |\n| - | - | - |\n| content | content | content |\n| content | content | content |"
        },
        // 公式
        {
          label: "$",
          type: "text",
          apply: getPairApply("$", "", "", "$", "type")
        },
        {
          label: "$$",
          type: "text",
          apply: getPairApply("$$", "", "\n", "\n$$", "title")
        },
        // 那啥？
        ...[
          "note",
          "abstract",
          "info",
          "tip",
          "success",
          "question",
          "warning",
          "failure",
          "danger",
          "bug",
          "example",
          "quote",
          "hint",
          "caution",
          "error",
          "attention"
        ].map((key) => {
          const label = `!!! ${key}`;
          return {
            label,
            type: "text",
            apply: getPairApply("!!!", ` ${key}`, " Title", "\n\n!!!", "title")
          };
        })
      ]
    };
  };
  return autocompletion({
    override: completions ? [defaultCompletion, ...completions] : [defaultCompletion]
  });
};
const toggleWith = (view) => {
  const mc = new Compartment();
  const toggle = (extension) => {
    mc.get(view.state) ? view.dispatch({ effects: mc.reconfigure(extension) }) : view.dispatch({
      effects: StateEffect.appendConfig.of(mc.of(extension))
    });
    return true;
  };
  return toggle;
};
class CodeMirrorUt {
  constructor(view) {
    __publicField(this, "view");
    __publicField(this, "maxLength", Number.MAX_SAFE_INTEGER);
    // 切换tabSize的执行方法。切换时，Compartment实例需要相同
    __publicField(this, "toggleTabSize");
    __publicField(this, "togglePlaceholder");
    /**
     * 设置全部的扩展
     */
    __publicField(this, "setExtensions");
    __publicField(this, "toggleDisabled");
    __publicField(this, "toggleReadOnly");
    __publicField(this, "toggleMaxlength");
    this.view = view;
    this.toggleTabSize = toggleWith(this.view);
    this.togglePlaceholder = toggleWith(this.view);
    this.setExtensions = toggleWith(this.view);
    this.toggleDisabled = toggleWith(this.view);
    this.toggleReadOnly = toggleWith(this.view);
    this.toggleMaxlength = toggleWith(this.view);
  }
  getValue() {
    return this.view.state.doc.toString();
  }
  /**
   * 设置内容
   *
   * @param insert 待插入内容
   * @param from 插入开始位置
   * @param to 插入结束位置
   */
  setValue(insert, from = 0, to = this.view.state.doc.length) {
    this.view.dispatch({
      changes: {
        from,
        to,
        insert
      }
    });
  }
  /**
   * 获取选中的文本
   */
  getSelectedText() {
    const { from, to } = this.view.state.selection.main;
    return this.view.state.sliceDoc(from, to);
  }
  /**
   * 使用新的内容替换选中的内容
   *
   * @param text 待替换内容
   * @param options 替换后是否选中
   */
  replaceSelectedText(text, options = {
    // 是否选中
    select: true,
    // 选中时，开始位置的偏移量
    deviationStart: 0,
    // 结束的偏移量
    deviationEnd: 0,
    // 直接替换所有文本
    replaceAll: false
  }, editorId) {
    try {
      if (options.replaceAll) {
        this.setValue(text);
        if (text.length > this.maxLength) {
          throw new Error("The input text is too long");
        }
        return;
      }
      if (this.view.state.doc.length - this.getSelectedText().length + text.length > this.maxLength) {
        throw new Error("The input text is too long");
      }
      const { from } = this.view.state.selection.main;
      this.view.dispatch(this.view.state.replaceSelection(text));
      if (options.select) {
        const to = from + text.length + options.deviationEnd;
        this.view.dispatch({
          selection: {
            anchor: from + options.deviationStart,
            head: to
          }
        });
      }
      this.view.focus();
    } catch (e) {
      if (e.message === "The input text is too long") {
        bus.emit(editorId, ERROR_CATCHER, {
          name: "overlength",
          message: e.message,
          data: text
        });
      } else {
        throw e;
      }
    }
  }
  /**
   * 设置tabSize
   *
   * @param tabSize 需要切换的大小
   */
  setTabSize(tabSize) {
    this.toggleTabSize([
      EditorState.tabSize.of(tabSize),
      indentUnit.of(" ".repeat(tabSize))
    ]);
  }
  /**
   * 设置placeholder
   *
   * @param t 目标内容
   */
  setPlaceholder(t) {
    this.togglePlaceholder(placeholder(t));
  }
  focus(options) {
    this.view.focus();
    if (!options) {
      return;
    }
    let anchor = 0;
    let head = 0;
    let pos = 0;
    switch (options) {
      case "start": {
        break;
      }
      case "end": {
        const length = this.getValue().length;
        anchor = head = pos = length;
        break;
      }
      default: {
        anchor = options.rangeAnchor || options.cursorPos;
        head = options.rangeHead || options.cursorPos;
        pos = options.cursorPos;
      }
    }
    this.view.dispatch({
      scrollIntoView: true,
      selection: EditorSelection.create(
        [EditorSelection.range(anchor, head), EditorSelection.cursor(pos)],
        1
      )
    });
  }
  setDisabled(d) {
    this.toggleDisabled([EditorView.editable.of(!d)]);
  }
  setReadOnly(r) {
    this.toggleReadOnly([EditorState.readOnly.of(r)]);
  }
  setMaxLength(ml) {
    this.maxLength = ml;
    this.toggleMaxlength([
      EditorState.changeFilter.of((tr) => {
        return tr.newDoc.length <= ml;
      })
    ]);
  }
}
const usePasteUpload = (props2, codeMirrorUt) => {
  const editorId = inject("editorId");
  const imgInsert = (tv) => {
    if (tv instanceof Promise) {
      tv.then((targetValue) => {
        bus.emit(editorId, REPLACE, "universal", {
          generate() {
            return {
              targetValue
            };
          }
        });
      }).catch((err) => {
        console.error(err);
      });
    } else {
      bus.emit(editorId, REPLACE, "universal", {
        generate() {
          return {
            targetValue: tv
          };
        }
      });
    }
  };
  const pasteHandler = (e) => {
    var _a, _b, _c;
    if (!e.clipboardData) {
      return;
    }
    if (e.clipboardData.files.length > 0) {
      const { files } = e.clipboardData;
      bus.emit(
        editorId,
        UPLOAD_IMAGE,
        Array.from(files).filter((file) => {
          return /image\/.*/.test(file.type);
        })
      );
      e.preventDefault();
      return;
    }
    const targetValue = e.clipboardData.getData("text/plain");
    const to = ((_a = codeMirrorUt.value) == null ? void 0 : _a.view.state.selection.main.to) || 0;
    const from = ((_b = codeMirrorUt.value) == null ? void 0 : _b.view.state.doc.lineAt(to).from) || 0;
    const lineStart = ((_c = codeMirrorUt.value) == null ? void 0 : _c.view.state.doc.sliceString(from, to)) || "";
    const templateStart = /!\[.*\]\(\s*$/.test(lineStart);
    const templateIn = /!\[.*\]\((.*)\s?.*\)/.test(targetValue);
    if (templateStart) {
      const tv = props2.transformImgUrl(targetValue);
      imgInsert(tv);
      e.preventDefault();
      return;
    } else if (templateIn) {
      const matchArr = targetValue.match(new RegExp(`(?<=!\\[.*\\]\\()([^)\\s]+)(?=\\s?["']?.*["']?\\))`, "g"));
      if (matchArr) {
        Promise.all(
          matchArr.map((img) => {
            return props2.transformImgUrl(img);
          })
        ).then((newUrls) => {
          imgInsert(
            newUrls.reduce((prev, curr, index) => {
              return prev.replace(matchArr[index], curr);
            }, targetValue)
          );
        });
      } else {
        imgInsert(targetValue);
      }
      e.preventDefault();
      return;
    }
    if (props2.autoDetectCode && e.clipboardData.types.includes("vscode-editor-data")) {
      const vscCoodInfo = JSON.parse(e.clipboardData.getData("vscode-editor-data"));
      bus.emit(editorId, REPLACE, "code", {
        mode: vscCoodInfo.mode,
        text: e.clipboardData.getData("text/plain")
      });
      e.preventDefault();
      return;
    }
    if (props2.maxlength && targetValue.length + props2.modelValue.length > props2.maxlength) {
      bus.emit(editorId, ERROR_CATCHER, {
        name: "overlength",
        message: "The input text is too long",
        data: targetValue
      });
    }
  };
  return pasteHandler;
};
const createCommands = (id, contentProps2) => {
  const CtrlB = {
    key: "Ctrl-b",
    mac: "Cmd-b",
    run: () => {
      bus.emit(id, REPLACE, "bold");
      return true;
    }
  };
  const CtrlS = {
    key: "Ctrl-s",
    mac: "Cmd-s",
    run: (view) => {
      bus.emit(id, ON_SAVE, view.state.doc.toString());
      return true;
    },
    shift: () => {
      bus.emit(id, REPLACE, "strikeThrough");
      return true;
    }
  };
  const CtrlU = {
    key: "Ctrl-u",
    mac: "Cmd-u",
    preventDefault: true,
    run: () => {
      bus.emit(id, REPLACE, "underline");
      return true;
    },
    shift: () => {
      bus.emit(id, REPLACE, "unorderedList");
      return true;
    }
  };
  const CtrlI = {
    key: "Ctrl-i",
    mac: "Cmd-i",
    preventDefault: true,
    run: () => {
      bus.emit(id, REPLACE, "italic");
      return true;
    },
    shift: () => {
      bus.emit(id, OPEN_MODALS, "image");
      return true;
    }
  };
  const Ctrl1 = {
    key: "Ctrl-1",
    mac: "Cmd-1",
    run: () => {
      bus.emit(id, REPLACE, "h1");
      return true;
    }
  };
  const Ctrl2 = {
    key: "Ctrl-2",
    mac: "Cmd-2",
    run: () => {
      bus.emit(id, REPLACE, "h2");
      return true;
    }
  };
  const Ctrl3 = {
    key: "Ctrl-3",
    mac: "Cmd-3",
    run: () => {
      bus.emit(id, REPLACE, "h3");
      return true;
    }
  };
  const Ctrl4 = {
    key: "Ctrl-4",
    mac: "Cmd-4",
    run: () => {
      bus.emit(id, REPLACE, "h4");
      return true;
    }
  };
  const Ctrl5 = {
    key: "Ctrl-5",
    mac: "Cmd-5",
    run: () => {
      bus.emit(id, REPLACE, "h5");
      return true;
    }
  };
  const Ctrl6 = {
    key: "Ctrl-6",
    mac: "Cmd-6",
    run: () => {
      bus.emit(id, REPLACE, "h6");
      return true;
    }
  };
  const CtrlArrowUp = {
    key: "Ctrl-ArrowUp",
    mac: "Cmd-ArrowUp",
    run: () => {
      bus.emit(id, REPLACE, "sup");
      return true;
    }
  };
  const CtrlArrowDown = {
    key: "Ctrl-ArrowDown",
    mac: "Cmd-ArrowDown",
    run: () => {
      bus.emit(id, REPLACE, "sub");
      return true;
    }
  };
  const CtrlO = {
    key: "Ctrl-o",
    mac: "Cmd-o",
    run: () => {
      bus.emit(id, REPLACE, "orderedList");
      return true;
    }
  };
  const CtrlC = {
    key: "Ctrl-c",
    mac: "Cmd-c",
    shift: () => {
      bus.emit(id, REPLACE, "code");
      return true;
    },
    any(_view, e) {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.code === "KeyC") {
        bus.emit(id, REPLACE, "codeRow");
        return true;
      }
      return false;
    }
  };
  const CtrlL = {
    key: "Ctrl-l",
    mac: "Cmd-l",
    run: () => {
      bus.emit(id, OPEN_MODALS, "link");
      return true;
    }
  };
  const CtrlF = {
    key: "Ctrl-f",
    mac: "Cmd-f",
    shift: () => {
      if (!contentProps2.noPrettier) {
        bus.emit(id, REPLACE, "prettier");
        return true;
      }
      return false;
    }
  };
  const CtrlT = {
    any: (_view, e) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.shiftKey && e.code === "KeyT") {
        bus.emit(id, REPLACE, "table");
        return true;
      }
      return false;
    }
  };
  const CtrlD = {
    key: "Ctrl-d",
    mac: "Cmd-d",
    run: deleteLine,
    preventDefault: true
  };
  return [
    CtrlB,
    CtrlD,
    CtrlS,
    CtrlU,
    CtrlI,
    Ctrl1,
    Ctrl2,
    Ctrl3,
    Ctrl4,
    Ctrl5,
    Ctrl6,
    CtrlArrowUp,
    CtrlArrowDown,
    CtrlO,
    CtrlC,
    CtrlL,
    CtrlF,
    CtrlT,
    ...searchKeymap
  ];
};
EditorView$1.EDIT_CONTEXT = false;
const useCodeMirror = (props2) => {
  const tabWidth = inject("tabWidth");
  const editorId = inject("editorId");
  const theme = inject("theme");
  const inputWrapperRef = ref();
  const codeMirrorUt = shallowRef();
  const spelling = ref(false);
  const languageComp = new Compartment(), themeComp = new Compartment(), autocompletionComp = new Compartment(), historyComp = new Compartment(), eventComp = new Compartment();
  const mdEditorCommands = createCommands(editorId, props2);
  const getDefaultKeymaps = () => [
    ...mdEditorCommands,
    ...defaultKeymap,
    ...historyKeymap,
    indentWithTab
  ];
  const pasteHandler = usePasteUpload(props2, codeMirrorUt);
  const domEventHandlers = {
    paste: pasteHandler,
    blur: props2.onBlur,
    focus: props2.onFocus,
    drop: props2.onDrop,
    compositionstart: () => {
      spelling.value = true;
    },
    compositionend: (_e, view) => {
      spelling.value = false;
      props2.updateModelValue(view.state.doc.toString());
    },
    input: (e) => {
      if (props2.onInput) {
        props2.onInput(e);
      }
      const { data } = e;
      if (props2.maxlength && props2.modelValue.length + data.length > props2.maxlength) {
        bus.emit(editorId, ERROR_CATCHER, {
          name: "overlength",
          message: "The input text is too long",
          data
        });
      }
    }
  };
  const defaultExtensions = [
    keymap.of(getDefaultKeymaps()),
    historyComp.of(history()),
    languageComp.of(markdown({ codeLanguages: languages })),
    // 横向换行
    EditorView$1.lineWrapping,
    EditorView$1.updateListener.of((update) => {
      if (update.docChanged) {
        props2.onChange(update.state.doc.toString());
        if (!spelling.value) {
          props2.updateModelValue(update.state.doc.toString());
        }
      }
    }),
    eventComp.of(EditorView$1.domEventHandlers(domEventHandlers)),
    // 解决多行placeholder时，光标异常的情况
    drawSelection()
  ];
  const getExtensions = () => {
    const extensions = [
      ...defaultExtensions,
      themeComp.of(theme.value === "light" ? oneLight : oneDark),
      autocompletionComp.of(createAutocompletion(props2.completions))
    ];
    return configOption.codeMirrorExtensions(
      theme.value,
      extensions,
      getDefaultKeymaps(),
      { editorId }
    );
  };
  onMounted(() => {
    const view = new EditorView$1({
      doc: props2.modelValue,
      parent: inputWrapperRef.value,
      extensions: [getExtensions()]
    });
    const nc = new CodeMirrorUt(view);
    codeMirrorUt.value = nc;
    setTimeout(() => {
      nc.setTabSize(tabWidth);
      nc.setDisabled(props2.disabled);
      nc.setReadOnly(props2.readonly);
      props2.placeholder && nc.setPlaceholder(props2.placeholder);
      typeof props2.maxlength === "number" && nc.setMaxLength(props2.maxlength);
      props2.autofocus && view.focus();
    }, 0);
    bus.on(editorId, {
      name: CTRL_Z,
      callback() {
        undo(view);
      }
    });
    bus.on(editorId, {
      name: CTRL_SHIFT_Z,
      callback() {
        redo(view);
      }
    });
    bus.on(editorId, {
      name: REPLACE,
      async callback(direct, params = {}) {
        var _a, _b;
        if (direct === "image" && params.transform) {
          const tv = props2.transformImgUrl(params.url);
          if (tv instanceof Promise) {
            tv.then(async (url) => {
              var _a2;
              const { text, options } = await directive2flag(
                direct,
                codeMirrorUt.value,
                {
                  ...params,
                  url
                }
              );
              (_a2 = codeMirrorUt.value) == null ? void 0 : _a2.replaceSelectedText(text, options, editorId);
            }).catch((err) => {
              console.error(err);
            });
          } else {
            const { text, options } = await directive2flag(direct, codeMirrorUt.value, {
              ...params,
              url: tv
            });
            (_a = codeMirrorUt.value) == null ? void 0 : _a.replaceSelectedText(text, options, editorId);
          }
        } else {
          const { text, options } = await directive2flag(
            direct,
            codeMirrorUt.value,
            params
          );
          (_b = codeMirrorUt.value) == null ? void 0 : _b.replaceSelectedText(text, options, editorId);
        }
      }
    });
    bus.on(editorId, {
      name: EVENT_LISTENER,
      callback: throttle((handlers) => {
        var _a;
        const nextDomEventHandlers = {
          ...domEventHandlers
        };
        const defaultEventNames = Object.keys(domEventHandlers);
        for (const eventName in handlers) {
          const en = eventName;
          if (defaultEventNames.includes(en)) {
            nextDomEventHandlers[en] = (e, v) => {
              handlers[en](e, v);
              if (!e.defaultPrevented) {
                domEventHandlers[en](e, v);
              }
            };
          } else {
            nextDomEventHandlers[en] = handlers[en];
          }
        }
        (_a = codeMirrorUt.value) == null ? void 0 : _a.view.dispatch({
          effects: eventComp.reconfigure(
            EditorView$1.domEventHandlers(nextDomEventHandlers)
          )
        });
      })
    });
    bus.on(editorId, {
      name: TASK_STATE_CHANGED,
      callback: (lineNumber, value) => {
        const line = view.state.doc.line(lineNumber);
        view.dispatch(
          view.state.update({
            changes: { from: line.from, to: line.to, insert: value }
          })
        );
      }
    });
  });
  watch(
    theme,
    () => {
      var _a;
      (_a = codeMirrorUt.value) == null ? void 0 : _a.view.dispatch({
        effects: themeComp.reconfigure(theme.value === "light" ? oneLight : oneDark)
      });
    },
    {
      deep: true
    }
  );
  watch(
    () => props2.completions,
    () => {
      var _a;
      (_a = codeMirrorUt.value) == null ? void 0 : _a.view.dispatch({
        effects: autocompletionComp.reconfigure(createAutocompletion(props2.completions))
      });
    },
    {
      deep: true
    }
  );
  watch(
    () => props2.modelValue,
    () => {
      var _a, _b;
      if (((_a = codeMirrorUt.value) == null ? void 0 : _a.getValue()) !== props2.modelValue) {
        (_b = codeMirrorUt.value) == null ? void 0 : _b.setValue(props2.modelValue);
      }
    }
  );
  watch(
    () => props2.placeholder,
    () => {
      var _a;
      (_a = codeMirrorUt.value) == null ? void 0 : _a.setPlaceholder(props2.placeholder);
    }
  );
  watch(
    () => props2.disabled,
    () => {
      var _a;
      (_a = codeMirrorUt.value) == null ? void 0 : _a.setDisabled(props2.disabled);
    }
  );
  watch(
    () => props2.readonly,
    () => {
      var _a;
      (_a = codeMirrorUt.value) == null ? void 0 : _a.setDisabled(props2.readonly);
    }
  );
  watch(
    () => props2.maxlength,
    () => {
      var _a;
      if (props2.maxlength) {
        (_a = codeMirrorUt.value) == null ? void 0 : _a.setMaxLength(props2.maxlength);
      }
    }
  );
  return {
    inputWrapperRef,
    codeMirrorUt,
    resetHistory() {
      var _a, _b;
      (_a = codeMirrorUt.value) == null ? void 0 : _a.view.dispatch({
        effects: historyComp.reconfigure([])
      });
      (_b = codeMirrorUt.value) == null ? void 0 : _b.view.dispatch({
        effects: historyComp.reconfigure(history())
      });
    }
  };
};
const useResize = (props2, contentRef, resizeRef) => {
  const state = reactive({
    resizedWidth: props2.inputBoxWitdh
  });
  const inputWrapperStyle = reactive({
    width: props2.inputBoxWitdh
  });
  const resizeOperateStyle = reactive({
    left: props2.inputBoxWitdh,
    display: "initial"
  });
  const showPreviewWrapper = ref(props2.setting.preview || props2.setting.htmlPreview);
  const resizeMousemove = (e) => {
    var _a, _b, _c;
    const maxWidth = ((_a = contentRef.value) == null ? void 0 : _a.offsetWidth) || 0;
    const contentX = ((_b = contentRef.value) == null ? void 0 : _b.getBoundingClientRect().x) || 0;
    let nextWidth = e.x - contentX;
    if (nextWidth < MinInputBoxWidth) {
      nextWidth = MinInputBoxWidth;
    } else if (nextWidth > maxWidth - MinInputBoxWidth) {
      nextWidth = maxWidth - MinInputBoxWidth;
    }
    const ibw = `${nextWidth}px`;
    inputWrapperStyle.width = ibw;
    resizeOperateStyle.left = ibw;
    state.resizedWidth = ibw;
    (_c = props2.onInputBoxWitdhChange) == null ? void 0 : _c.call(props2, ibw);
  };
  const resizeMousedown = () => {
    document.addEventListener("mousemove", resizeMousemove);
  };
  const resizeMouseup = () => {
    document.removeEventListener("mousemove", resizeMousemove);
  };
  watch(
    [resizeRef],
    () => {
      var _a, _b;
      (_a = resizeRef.value) == null ? void 0 : _a.addEventListener("mousedown", resizeMousedown);
      (_b = resizeRef.value) == null ? void 0 : _b.addEventListener("mouseup", resizeMouseup);
    },
    {
      immediate: true
    }
  );
  onBeforeUnmount(() => {
    var _a, _b;
    (_a = resizeRef.value) == null ? void 0 : _a.removeEventListener("mousedown", resizeMousedown);
    (_b = resizeRef.value) == null ? void 0 : _b.removeEventListener("mouseup", resizeMouseup);
  });
  watch(
    () => props2.inputBoxWitdh,
    (nVal) => {
      if (nVal) {
        state.resizedWidth = nVal;
        inputWrapperStyle.width = nVal;
        resizeOperateStyle.left = nVal;
      }
    }
  );
  watch(
    [
      toRef(props2.setting, "htmlPreview"),
      toRef(props2.setting, "preview"),
      toRef(props2.setting, "previewOnly")
    ],
    () => {
      if (props2.setting.previewOnly) {
        inputWrapperStyle.width = "0%";
        resizeOperateStyle.display = "none";
        showPreviewWrapper.value = true;
      } else if (!props2.setting.htmlPreview && !props2.setting.preview) {
        inputWrapperStyle.width = "100%";
        resizeOperateStyle.display = "none";
        showPreviewWrapper.value = false;
      } else {
        inputWrapperStyle.width = state.resizedWidth;
        resizeOperateStyle.display = "initial";
        showPreviewWrapper.value = true;
      }
    },
    {
      immediate: true
    }
  );
  return { inputWrapperStyle, resizeOperateStyle, showPreviewWrapper };
};
const Content = /* @__PURE__ */ defineComponent({
  name: "MDEditorContent",
  props: contentProps,
  setup(props2, ctx) {
    const editorId = inject("editorId");
    const html = ref("");
    const contentRef = ref();
    const resizeRef = ref();
    const {
      inputWrapperRef,
      codeMirrorUt,
      resetHistory
    } = useCodeMirror(props2);
    const {
      inputWrapperStyle,
      resizeOperateStyle,
      showPreviewWrapper
    } = useResize(props2, contentRef, resizeRef);
    useAutoScroll(props2, html, codeMirrorUt);
    ctx.expose({
      getSelectedText() {
        var _a;
        return (_a = codeMirrorUt.value) == null ? void 0 : _a.getSelectedText();
      },
      focus(options) {
        var _a;
        (_a = codeMirrorUt.value) == null ? void 0 : _a.focus(options);
      },
      resetHistory,
      getEditorView() {
        var _a;
        return (_a = codeMirrorUt.value) == null ? void 0 : _a.view;
      }
    });
    return () => {
      return createVNode("div", {
        "class": `${prefix}-content${showPreviewWrapper.value ? " has-preview" : ""}`,
        "ref": contentRef
      }, [createVNode("div", {
        "class": `${prefix}-input-wrapper`,
        "style": inputWrapperStyle,
        "ref": inputWrapperRef
      }, null), (props2.setting.htmlPreview || props2.setting.preview) && createVNode("div", {
        "class": `${prefix}-resize-operate`,
        "style": resizeOperateStyle,
        "ref": resizeRef
      }, null), showPreviewWrapper.value && createVNode(ContentPreview, {
        "modelValue": props2.modelValue,
        "onChange": props2.onChange,
        "setting": props2.setting,
        "onHtmlChanged": (html_) => {
          html.value = html_;
          props2.onHtmlChanged(html_);
        },
        "onGetCatalog": props2.onGetCatalog,
        "mdHeadingId": props2.mdHeadingId,
        "noMermaid": props2.noMermaid,
        "sanitize": props2.sanitize,
        "noKatex": props2.noKatex,
        "formatCopiedText": props2.formatCopiedText,
        "noHighlight": props2.noHighlight,
        "noImgZoomIn": props2.noImgZoomIn,
        "sanitizeMermaid": props2.sanitizeMermaid,
        "codeFoldable": props2.codeFoldable,
        "autoFoldThreshold": props2.autoFoldThreshold
      }, null), props2.catalogVisible && createVNode(MdCatalog, {
        "theme": props2.theme,
        "class": `${prefix}-catalog-editor`,
        "editorId": editorId,
        "mdHeadingId": props2.mdHeadingId,
        "key": "internal-catalog",
        "scrollElementOffsetTop": 2
      }, null)]);
    };
  }
});
const MarkdownTotal = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
  setup(props2) {
    const ult = inject("usedLanguageText");
    return () => {
      var _a, _b;
      return createVNode("div", {
        "class": `${prefix}-footer-item`
      }, [createVNode("label", {
        "class": `${prefix}-footer-label`
      }, [`${(_a = ult.value.footer) == null ? void 0 : _a.markdownTotal}:`]), createVNode("span", null, [((_b = props2.modelValue) == null ? void 0 : _b.length) || 0])]);
    };
  }
});
const props$2 = {
  checked: {
    type: Boolean,
    default: false
  },
  onChange: {
    type: Function,
    default: () => {
    }
  }
};
const Checkbox = /* @__PURE__ */ defineComponent({
  props: props$2,
  setup(props2) {
    return () => {
      return createVNode("div", {
        "class": [`${prefix}-checkbox`, props2.checked && `${prefix}-checkbox-checked`],
        "onClick": () => {
          props2.onChange(!props2.checked);
        }
      }, null);
    };
  }
});
const props$1 = {
  scrollAuto: {
    type: Boolean
  },
  onScrollAutoChange: {
    type: Function,
    default: () => {
    }
  }
};
const ScrollAuto = /* @__PURE__ */ defineComponent({
  props: props$1,
  setup(props2) {
    const ult = inject("usedLanguageText");
    return () => {
      var _a;
      return createVNode("div", {
        "class": `${prefix}-footer-item`
      }, [createVNode("label", {
        "class": `${prefix}-footer-label`,
        "onClick": () => {
          props2.onScrollAutoChange(!props2.scrollAuto);
        }
      }, [(_a = ult.value.footer) == null ? void 0 : _a.scrollAuto]), createVNode(Checkbox, {
        "checked": props2.scrollAuto,
        "onChange": props2.onScrollAutoChange
      }, null)]);
    };
  }
});
const props = {
  modelValue: {
    type: String,
    default: ""
  },
  footers: {
    type: Array,
    default: []
  },
  scrollAuto: {
    type: Boolean
  },
  noScrollAuto: {
    type: Boolean
  },
  onScrollAutoChange: {
    type: Function,
    default: () => {
    }
  },
  defFooters: {
    type: Object
  }
};
const Footer = /* @__PURE__ */ defineComponent({
  name: "MDEditorFooter",
  props,
  setup(props2) {
    const splitedItems = computed(() => {
      const moduleSplitIndex = props2.footers.indexOf("=");
      const barLeft = moduleSplitIndex === -1 ? props2.footers : props2.footers.slice(0, moduleSplitIndex);
      const barRight = moduleSplitIndex === -1 ? [] : props2.footers.slice(moduleSplitIndex, Number.MAX_SAFE_INTEGER);
      return [barLeft, barRight];
    });
    const footerRender = (name) => {
      if (allFooter.includes(name)) {
        switch (name) {
          case "markdownTotal": {
            return createVNode(MarkdownTotal, {
              "modelValue": props2.modelValue
            }, null);
          }
          case "scrollSwitch": {
            return !props2.noScrollAuto && createVNode(ScrollAuto, {
              "scrollAuto": props2.scrollAuto,
              "onScrollAutoChange": props2.onScrollAutoChange
            }, null);
          }
        }
      } else if (props2.defFooters instanceof Array) {
        return props2.defFooters[name] || "";
      } else if (props2.defFooters && props2.defFooters.children instanceof Array) {
        return props2.defFooters.children[name] || "";
      } else {
        return "";
      }
    };
    return () => {
      const LeftFooter = splitedItems.value[0].map((name) => footerRender(name));
      const RightFooter = splitedItems.value[1].map((name) => footerRender(name));
      return createVNode("div", {
        "class": `${prefix}-footer`
      }, [createVNode("div", {
        "class": `${prefix}-footer-left`
      }, [LeftFooter]), createVNode("div", {
        "class": `${prefix}-footer-right`
      }, [RightFooter])]);
    };
  }
});
const Editor = /* @__PURE__ */ defineComponent({
  name: "MdEditorV3",
  props: editorProps,
  emits: editorEmits,
  setup(props2, ctx) {
    const {
      editorId,
      noKatex,
      noMermaid,
      noPrettier,
      noUploadImg,
      noHighlight
    } = props2;
    const state = reactive({
      scrollAuto: props2.scrollAuto
    });
    const rootRef = ref();
    const codeRef = ref();
    useOnSave(props2, ctx);
    useProvide(props2, rootRef);
    useExpansion(props2);
    useErrorCatcher(props2, ctx);
    const [setting, updateSetting] = useConfig(props2, ctx);
    const catalogVisible = useCatalog(props2);
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });
    useExpose(props2, ctx, catalogVisible, setting, updateSetting, codeRef);
    return () => {
      const defToolbars = getSlot({
        props: props2,
        ctx
      }, "defToolbars");
      const defFooters = getSlot({
        props: props2,
        ctx
      }, "defFooters");
      return createVNode("div", {
        "id": editorId,
        "class": [prefix, props2.class, props2.theme === "dark" && `${prefix}-dark`, setting.fullscreen || setting.pageFullscreen ? `${prefix}-fullscreen` : ""],
        "style": props2.style,
        "ref": rootRef
      }, [props2.toolbars.length > 0 && createVNode(ToolBar, {
        "noPrettier": noPrettier,
        "toolbars": props2.toolbars,
        "toolbarsExclude": props2.toolbarsExclude,
        "setting": setting,
        "updateSetting": updateSetting,
        "tableShape": props2.tableShape,
        "defToolbars": defToolbars,
        "noUploadImg": noUploadImg,
        "showToolbarName": props2.showToolbarName,
        "catalogVisible": catalogVisible.value,
        "codeTheme": props2.codeTheme
      }, null), createVNode(Content, {
        "ref": codeRef,
        "modelValue": props2.modelValue,
        "setting": setting,
        "mdHeadingId": props2.mdHeadingId,
        "noMermaid": noMermaid,
        "noPrettier": noPrettier,
        "sanitize": props2.sanitize,
        "placeholder": props2.placeholder,
        "noKatex": noKatex,
        "scrollAuto": state.scrollAuto,
        "formatCopiedText": props2.formatCopiedText,
        "autofocus": props2.autoFocus,
        "disabled": props2.disabled,
        "readonly": props2.readOnly,
        "maxlength": props2.maxLength,
        "autoDetectCode": props2.autoDetectCode,
        "noHighlight": noHighlight,
        "updateModelValue": (value) => {
          ctx.emit("update:modelValue", value);
        },
        "onChange": (value) => {
          if (props2.onChange) {
            props2.onChange(value);
          }
          ctx.emit("onChange", value);
        },
        "onHtmlChanged": (html) => {
          if (props2.onHtmlChanged) {
            props2.onHtmlChanged(html);
          }
          ctx.emit("onHtmlChanged", html);
        },
        "onGetCatalog": (list) => {
          if (props2.onGetCatalog) {
            props2.onGetCatalog(list);
          }
          ctx.emit("onGetCatalog", list);
        },
        "onBlur": (e) => {
          if (props2.onBlur) {
            props2.onBlur(e);
          }
          ctx.emit("onBlur", e);
        },
        "onFocus": (e) => {
          if (props2.onFocus) {
            props2.onFocus(e);
          }
          ctx.emit("onFocus", e);
        },
        "onInput": (e) => {
          if (props2.onInput) {
            props2.onInput(e);
          }
          ctx.emit("onInput", e);
        },
        "completions": props2.completions,
        "catalogVisible": catalogVisible.value,
        "theme": props2.theme,
        "noImgZoomIn": props2.noImgZoomIn,
        "onDrop": (e) => {
          if (props2.onDrop) {
            props2.onDrop(e);
          }
          ctx.emit("onDrop", e);
        },
        "inputBoxWitdh": props2.inputBoxWitdh,
        "onInputBoxWitdhChange": (width) => {
          if (props2.onInputBoxWitdhChange) {
            props2.onInputBoxWitdhChange(width);
          }
          ctx.emit("onInputBoxWitdhChange", width);
        },
        "sanitizeMermaid": props2.sanitizeMermaid,
        "transformImgUrl": props2.transformImgUrl,
        "codeFoldable": props2.codeFoldable,
        "autoFoldThreshold": props2.autoFoldThreshold
      }, null), props2.footers.length > 0 && createVNode(Footer, {
        "modelValue": props2.modelValue,
        "footers": props2.footers,
        "defFooters": defFooters,
        "noScrollAuto": !setting.preview && !setting.htmlPreview || setting.previewOnly,
        "scrollAuto": state.scrollAuto,
        "onScrollAutoChange": (v) => state.scrollAuto = v
      }, null)]);
    };
  }
});
Editor.install = (app) => {
  app.component(Editor.name, Editor);
  app.use(NormalToolbar).use(DropdownToolbar).use(ModalToolbar).use(MdCatalog).use(MdPreview);
  return app;
};
export {
  Editor as default
};
