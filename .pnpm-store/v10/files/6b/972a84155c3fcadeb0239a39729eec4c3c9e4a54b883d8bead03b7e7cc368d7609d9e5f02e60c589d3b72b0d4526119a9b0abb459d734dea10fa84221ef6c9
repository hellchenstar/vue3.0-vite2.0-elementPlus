import { defineComponent, inject, createVNode, reactive, shallowRef, ref, provide, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { p as prefix } from "./config.mjs";
import { c as getRelativeTop } from "./index5.mjs";
import { b as bus, g as CATALOG_CHANGED, P as PUSH_CATALOG } from "./event-name.mjs";
import { debounce, createSmoothScroll } from "@vavt/util";
const DATA_LINE_SELECTOR = `.${prefix}-preview > [data-line]`;
const getComputedStyleNum = (ele, key) => {
  return +getComputedStyle(ele).getPropertyValue(key).replace("px", "");
};
const scrollAutoWithScale = (pEle, cEle) => {
  const addEvent = debounce(() => {
    pEle.removeEventListener("scroll", scrollHandler);
    pEle.addEventListener("scroll", scrollHandler);
    cEle.removeEventListener("scroll", scrollHandler);
    cEle.addEventListener("scroll", scrollHandler);
  }, 50);
  const scrollHandler = (e) => {
    const pHeight = pEle.clientHeight;
    const cHeight = cEle.clientHeight;
    const pScrollHeight = pEle.scrollHeight;
    const cScrollHeight = cEle.scrollHeight;
    const scale = (pScrollHeight - pHeight) / (cScrollHeight - cHeight);
    if (e.target === pEle) {
      cEle.removeEventListener("scroll", scrollHandler);
      cEle.scrollTo({
        top: pEle.scrollTop / scale
        // behavior: 'smooth'
      });
      addEvent();
    } else {
      pEle.removeEventListener("scroll", scrollHandler);
      pEle.scrollTo({
        top: cEle.scrollTop * scale
        // behavior: 'smooth'
      });
      addEvent();
    }
  };
  return [
    () => {
      addEvent().finally(() => {
        pEle.dispatchEvent(new Event("scroll"));
      });
    },
    () => {
      pEle.removeEventListener("scroll", scrollHandler);
      cEle.removeEventListener("scroll", scrollHandler);
    }
  ];
};
const scrollAuto = (pEle, cEle, codeMirrorUt) => {
  const { view } = codeMirrorUt;
  const smoothScroll = createSmoothScroll();
  const getTopByLine = (line) => {
    return view.lineBlockAt(view.state.doc.line(line + 1).from).top;
  };
  const getBottomByLine = (line) => {
    return view.lineBlockAt(view.state.doc.line(line + 1).from).bottom;
  };
  let blockMap = [];
  let elesHasLineNumber = [];
  let startLines = [];
  const buildMap = () => {
    blockMap = [];
    elesHasLineNumber = Array.from(
      cEle.querySelectorAll(DATA_LINE_SELECTOR)
    );
    startLines = elesHasLineNumber.map((item) => Number(item.dataset.line));
    const tempStartLines = [...startLines];
    const { lines } = view.state.doc;
    let start = tempStartLines.shift() || 0;
    let end = tempStartLines.shift() || lines;
    for (let i = 0; i < lines; i++) {
      if (i === end) {
        start = i;
        end = tempStartLines.shift() || lines;
      }
      blockMap.push({
        start,
        end: end - 1
      });
    }
  };
  const getLineNumber = (pMaxScrollLength, cMaxScrollLength) => {
    let lineNumer = 1;
    for (let i = elesHasLineNumber.length - 1; i - 1 >= 0; i--) {
      const curr = elesHasLineNumber[i];
      const sibling = elesHasLineNumber[i - 1];
      if (curr.offsetTop + curr.offsetHeight > cMaxScrollLength && sibling.offsetTop < cMaxScrollLength) {
        lineNumer = Number(sibling.dataset.line);
        break;
      }
    }
    for (let i = blockMap.length - 1; i >= 0; i--) {
      const itemBottom = getBottomByLine(blockMap[i].end);
      const itemTop = getTopByLine(blockMap[i].start);
      if (itemBottom > pMaxScrollLength && itemTop <= pMaxScrollLength) {
        lineNumer = lineNumer < blockMap[i].start ? lineNumer : blockMap[i].start;
        break;
      }
    }
    return lineNumer;
  };
  let pLock = 0;
  let cLock = 0;
  const pEleHandler = () => {
    var _a, _b, _c;
    if (cLock !== 0) {
      return false;
    }
    pLock++;
    const { scrollDOM, contentHeight } = view;
    let cElePaddingTop = getComputedStyleNum(cEle, "padding-top");
    const blockInfo = view.lineBlockAtHeight(scrollDOM.scrollTop);
    const { number: currLine } = view.state.doc.lineAt(blockInfo.from);
    const blockData = blockMap[currLine - 1];
    if (!blockData) {
      return false;
    }
    let scale = 1;
    const startEle = cEle.querySelector(`[data-line="${blockData.start}"]`) || ((_a = cEle.firstElementChild) == null ? void 0 : _a.firstElementChild);
    const endEle = cEle.querySelector(`[data-line="${blockData.end + 1}"]`) || ((_b = cEle.lastElementChild) == null ? void 0 : _b.lastElementChild);
    const pMaxScrollLength = scrollDOM.scrollHeight - scrollDOM.clientHeight;
    const cMaxScrollLength = cEle.scrollHeight - cEle.clientHeight;
    let startTop = getTopByLine(blockData.start);
    let endBottom = getBottomByLine(blockData.end);
    let startEleOffetTop = startEle.offsetTop;
    let blockHeight = endEle.offsetTop - startEleOffetTop;
    if (startTop === 0) {
      startEleOffetTop = 0;
      if (startEle === endEle) {
        cElePaddingTop = 0;
        endBottom = contentHeight - scrollDOM.offsetHeight;
        blockHeight = cMaxScrollLength;
      } else {
        blockHeight = endEle.offsetTop;
      }
    }
    scale = (scrollDOM.scrollTop - startTop) / (endBottom - startTop);
    const endElePos = endEle == ((_c = cEle.lastElementChild) == null ? void 0 : _c.lastElementChild) ? endEle.offsetTop + endEle.clientHeight : endEle.offsetTop;
    if (endBottom >= pMaxScrollLength || endElePos > cMaxScrollLength) {
      const lineNumer = getLineNumber(pMaxScrollLength, cMaxScrollLength);
      startTop = getTopByLine(lineNumer);
      scale = (scrollDOM.scrollTop - startTop) / (pMaxScrollLength - startTop);
      const _startEle = cEle.querySelector(`[data-line="${lineNumer}"]`);
      if (startTop > 0 && _startEle) {
        startEleOffetTop = _startEle.offsetTop;
      }
      blockHeight = cMaxScrollLength - startEleOffetTop + getComputedStyleNum(cEle, "padding-top");
    }
    const scrollToTop = startEleOffetTop - cElePaddingTop + blockHeight * scale;
    smoothScroll(cEle, scrollToTop, () => {
      pLock--;
    });
  };
  const cEleHandler = () => {
    var _a, _b, _c, _d, _e, _f;
    if (pLock !== 0) {
      return;
    }
    cLock++;
    const { scrollDOM } = view;
    const cScrollTop = cEle.scrollTop;
    const cScrollHeight = cEle.scrollHeight;
    const pMaxScrollLength = scrollDOM.scrollHeight - scrollDOM.clientHeight;
    const cMaxScrollLength = cEle.scrollHeight - cEle.clientHeight;
    let realEleStart = (_a = cEle.firstElementChild) == null ? void 0 : _a.firstElementChild;
    let realEleEnd = (_b = cEle.firstElementChild) == null ? void 0 : _b.lastElementChild;
    if (startLines.length > 0) {
      let virtualLine = Math.ceil(
        startLines[startLines.length - 1] * (cScrollTop / cScrollHeight)
      );
      let startLineIndex = startLines.findLastIndex((value) => value <= virtualLine);
      startLineIndex = startLineIndex === -1 ? 0 : startLineIndex;
      virtualLine = startLines[startLineIndex];
      for (let i = startLineIndex; i >= 0 && i < startLines.length; ) {
        const currentElementTop = elesHasLineNumber[i].offsetTop;
        if (currentElementTop > cScrollTop) {
          if (i - 1 >= 0) {
            i--;
            continue;
          }
          virtualLine = -1;
          startLineIndex = i;
          break;
        } else {
          if (i + 1 < startLines.length && elesHasLineNumber[i + 1].offsetTop < cScrollTop) {
            i++;
            continue;
          }
          virtualLine = startLines[i];
          startLineIndex = i;
          break;
        }
      }
      switch (startLineIndex) {
        case -1: {
          realEleStart = (_c = cEle.firstElementChild) == null ? void 0 : _c.firstElementChild;
          realEleEnd = elesHasLineNumber[startLineIndex];
          break;
        }
        case startLines.length - 1: {
          realEleStart = elesHasLineNumber[startLineIndex];
          realEleEnd = (_d = cEle.firstElementChild) == null ? void 0 : _d.lastElementChild;
          break;
        }
        default: {
          realEleStart = elesHasLineNumber[startLineIndex];
          realEleEnd = elesHasLineNumber[startLineIndex + 1 === elesHasLineNumber.length ? startLineIndex : startLineIndex + 1];
        }
      }
    }
    let eleStartOffsetTop = realEleStart === ((_e = cEle.firstElementChild) == null ? void 0 : _e.firstElementChild) ? 0 : realEleStart.offsetTop - getComputedStyleNum(realEleStart, "margin-top");
    let eleEndOffsetTop = realEleEnd.offsetTop;
    let scale = 0;
    const { start, end } = blockMap[Number(realEleStart.dataset.line || 0)];
    let firstLineScrollTop = getTopByLine(start);
    const endLineScrollTop = getTopByLine(
      end + 1 === view.state.doc.lines ? end : end + 1
    );
    let blockHeight = 0;
    if (endLineScrollTop > pMaxScrollLength || realEleEnd.offsetTop + realEleEnd.offsetHeight > cMaxScrollLength) {
      const lineNumer = getLineNumber(pMaxScrollLength, cMaxScrollLength);
      const _startEle = cEle.querySelector(`[data-line="${lineNumer}"]`);
      eleStartOffsetTop = _startEle ? _startEle.offsetTop - getComputedStyleNum(_startEle, "margin-top") : eleStartOffsetTop;
      firstLineScrollTop = getTopByLine(lineNumer);
      scale = (cScrollTop - eleStartOffsetTop) / (cMaxScrollLength - eleStartOffsetTop);
      blockHeight = pMaxScrollLength - firstLineScrollTop;
    } else if (realEleStart === ((_f = cEle.firstElementChild) == null ? void 0 : _f.firstElementChild)) {
      if (realEleStart === realEleEnd) {
        eleEndOffsetTop = realEleEnd.offsetTop + realEleEnd.offsetHeight + +getComputedStyle(realEleEnd).marginBottom.replace("px", "");
        blockHeight = endLineScrollTop;
      } else {
        blockHeight = endLineScrollTop;
      }
      scale = Math.max(cScrollTop / eleEndOffsetTop, 0);
    } else {
      scale = Math.max(
        (cScrollTop - eleStartOffsetTop) / (eleEndOffsetTop - eleStartOffsetTop),
        0
      );
      blockHeight = endLineScrollTop - firstLineScrollTop;
    }
    smoothScroll(pEle, firstLineScrollTop + blockHeight * scale, () => {
      cLock--;
    });
  };
  const scrollHandler = (e) => {
    var _a;
    const { scrollDOM, contentHeight } = view;
    const scrollDomHeight = scrollDOM.clientHeight;
    if (contentHeight <= scrollDomHeight || cEle.firstElementChild.clientHeight <= cEle.clientHeight) {
      return false;
    }
    if (view.state.doc.lines <= ((_a = blockMap[blockMap.length - 1]) == null ? void 0 : _a.end)) {
      return false;
    }
    if (e.target === pEle) {
      pEleHandler();
    } else {
      cEleHandler();
    }
  };
  return [
    () => {
      buildMap();
      pEle.addEventListener("scroll", scrollHandler);
      cEle.addEventListener("scroll", scrollHandler);
      pEle.dispatchEvent(new Event("scroll"));
    },
    () => {
      pEle.removeEventListener("scroll", scrollHandler);
      cEle.removeEventListener("scroll", scrollHandler);
    }
  ];
};
const props$1 = {
  tocItem: {
    type: Object,
    default: () => ({})
  },
  mdHeadingId: {
    type: Function,
    default: () => {
    }
  },
  onClick: {
    type: Function,
    default: () => {
    }
  },
  scrollElementOffsetTop: {
    type: Number,
    default: 0
  }
};
const CatalogLink = /* @__PURE__ */ defineComponent({
  props: props$1,
  setup(props2) {
    const scrollElementRef = inject("scrollElementRef");
    const rootNodeRef = inject("roorNodeRef");
    return () => {
      const {
        tocItem,
        mdHeadingId,
        onClick,
        scrollElementOffsetTop
      } = props2;
      return createVNode("div", {
        "class": [`${prefix}-catalog-link`, tocItem.active && `${prefix}-catalog-active`],
        "onClick": (e) => {
          onClick(e, tocItem);
          e.stopPropagation();
          const id = mdHeadingId(tocItem.text, tocItem.level, tocItem.index);
          const targetHeadEle = rootNodeRef.value.getElementById(id);
          const scrollContainer = scrollElementRef.value;
          if (targetHeadEle && scrollContainer) {
            let par = targetHeadEle.offsetParent;
            let offsetTop = targetHeadEle.offsetTop;
            if (scrollContainer.contains(par)) {
              while (par && scrollContainer != par) {
                offsetTop += par == null ? void 0 : par.offsetTop;
                par = par == null ? void 0 : par.offsetParent;
              }
            }
            const pel = targetHeadEle.previousElementSibling;
            let currMarginTop = 0;
            if (!pel) {
              currMarginTop = getComputedStyleNum(targetHeadEle, "margin-top");
            }
            scrollContainer == null ? void 0 : scrollContainer.scrollTo({
              top: offsetTop - scrollElementOffsetTop - currMarginTop,
              behavior: "smooth"
            });
          }
        }
      }, [createVNode("span", {
        "title": tocItem.text
      }, [tocItem.text]), createVNode("div", {
        "class": `${prefix}-catalog-wrapper`
      }, [tocItem.children && tocItem.children.map((item) => createVNode(CatalogLink, {
        "mdHeadingId": mdHeadingId,
        "key": `${tocItem.text}-link-${item.level}-${item.text}`,
        "tocItem": item,
        "onClick": onClick,
        "scrollElementOffsetTop": scrollElementOffsetTop
      }, null))])]);
    };
  }
});
const props = {
  /**
   * 编辑器的Id，务必与需要绑定的编辑器Id相同
   */
  editorId: {
    type: String,
    default: void 0
  },
  class: {
    type: String,
    default: ""
  },
  mdHeadingId: {
    type: Function,
    default: (text) => text
  },
  /**
   * 指定滚动的容器，选择器需带上对应的符号，默认预览框
   * 元素必须定位！！！！！！
   *
   * 默认：#md-editor-preview-wrapper
   */
  scrollElement: {
    type: [String, Object],
    default: void 0
  },
  theme: {
    type: String,
    default: "light"
  },
  /**
   * 高亮标题相对滚动容器顶部偏移量，即距离该值时，高亮当前目录菜单项
   *
   * 默认：20px
   */
  offsetTop: {
    type: Number,
    default: 20
  },
  /**
   * 滚动区域的固定顶部高度
   *
   * 默认：0
   */
  scrollElementOffsetTop: {
    type: Number,
    default: 0
  },
  onClick: {
    type: Function,
    default: void 0
  },
  onActive: {
    type: Function,
    default: void 0
  },
  /**
   * 滚动容器是否在web component中，默认不在
   *
   * 在其中的话通过document查询不到
   */
  isScrollElementInShadow: {
    type: Boolean,
    default: false
  }
};
const MdCatalog = /* @__PURE__ */ defineComponent({
  name: "MdCatalog",
  props,
  emits: ["onClick", "onActive"],
  setup(props2, ctx) {
    const editorId = props2.editorId;
    const defaultScrollElement = `#${editorId}-preview-wrapper`;
    const state = reactive({
      list: [],
      show: false,
      scrollElement: props2.scrollElement || defaultScrollElement
    });
    const activeItem = shallowRef();
    const catalogRef = ref();
    const scrollElementRef = ref();
    const scrollContainerRef = ref();
    const rootNodeRef = ref();
    provide("scrollElementRef", scrollElementRef);
    provide("roorNodeRef", rootNodeRef);
    const catalogs = computed(() => {
      const tocItems = [];
      state.list.forEach((listItem, index) => {
        const {
          text,
          level
        } = listItem;
        const item = {
          level,
          text,
          index: index + 1,
          active: activeItem.value === listItem
        };
        if (tocItems.length === 0) {
          tocItems.push(item);
        } else {
          let lastItem = tocItems[tocItems.length - 1];
          if (item.level > lastItem.level) {
            for (let i = lastItem.level + 1; i <= 6; i++) {
              const {
                children
              } = lastItem;
              if (!children) {
                lastItem.children = [item];
                break;
              }
              lastItem = children[children.length - 1];
              if (item.level <= lastItem.level) {
                children.push(item);
                break;
              }
            }
          } else {
            tocItems.push(item);
          }
        }
      });
      return tocItems;
    });
    const getScrollElement = () => {
      var _a;
      if (state.scrollElement instanceof HTMLElement) {
        return state.scrollElement;
      }
      let scrollRoot = document;
      if (state.scrollElement === defaultScrollElement || props2.isScrollElementInShadow) {
        scrollRoot = (_a = catalogRef.value) == null ? void 0 : _a.getRootNode();
      }
      return scrollRoot.querySelector(state.scrollElement);
    };
    const findActiveHeading = (list) => {
      if (list.length === 0) {
        state.list = [];
        return false;
      }
      const {
        activeHead
      } = list.reduce((activeData, link, index) => {
        var _a;
        const linkEle = (_a = rootNodeRef.value) == null ? void 0 : _a.getElementById(props2.mdHeadingId(link.text, link.level, index + 1));
        if (linkEle instanceof HTMLElement) {
          const relativeTop = getRelativeTop(linkEle, scrollElementRef.value);
          if (relativeTop < props2.offsetTop && relativeTop > activeData.minTop) {
            return {
              activeHead: link,
              minTop: relativeTop
            };
          }
        }
        return activeData;
      }, {
        activeHead: list[0],
        minTop: Number.MIN_SAFE_INTEGER
      });
      activeItem.value = activeHead;
      state.list = list;
    };
    const scrollHandler = () => {
      findActiveHeading(state.list);
    };
    const catalogChangedHandler = (_list) => {
      var _a, _b;
      const scrollElement = getScrollElement();
      scrollElementRef.value = scrollElement;
      scrollContainerRef.value = scrollElement === document.documentElement ? document : scrollElement;
      (_a = scrollContainerRef.value) == null ? void 0 : _a.removeEventListener("scroll", scrollHandler);
      findActiveHeading(_list);
      (_b = scrollContainerRef.value) == null ? void 0 : _b.addEventListener("scroll", scrollHandler);
    };
    watch(() => activeItem.value, (nVal) => {
      const activeHeading = nVal ? {
        ...nVal
      } : void 0;
      if (props2.onActive) {
        props2.onActive(activeHeading);
      } else {
        ctx.emit("onActive", activeHeading);
      }
    });
    onMounted(() => {
      rootNodeRef.value = catalogRef.value.getRootNode();
      bus.on(editorId, {
        name: CATALOG_CHANGED,
        callback: catalogChangedHandler
      });
      bus.emit(editorId, PUSH_CATALOG);
    });
    onBeforeUnmount(() => {
      var _a;
      bus.remove(editorId, CATALOG_CHANGED, catalogChangedHandler);
      (_a = scrollContainerRef.value) == null ? void 0 : _a.removeEventListener("scroll", scrollHandler);
    });
    return () => createVNode("div", {
      "class": [`${prefix}-catalog`, props2.theme === "dark" && `${prefix}-catalog-dark`, props2.class || ""],
      "ref": catalogRef
    }, [catalogs.value.map((item) => {
      return createVNode(CatalogLink, {
        "mdHeadingId": props2.mdHeadingId,
        "tocItem": item,
        "key": `link-${item.level}-${item.text}`,
        "onClick": (e, t) => {
          if (props2.onClick) {
            props2.onClick(e, t);
          } else {
            ctx.emit("onClick", e, t);
          }
        },
        "scrollElementOffsetTop": props2.scrollElementOffsetTop
      }, null);
    })]);
  }
});
MdCatalog.install = (app) => {
  app.component(MdCatalog.name, MdCatalog);
  return app;
};
export {
  MdCatalog as M,
  scrollAutoWithScale as a,
  scrollAuto as s
};
