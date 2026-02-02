import { inject, onMounted, watch, toRef, nextTick, shallowRef, ref, computed, onBeforeUnmount, defineComponent, createVNode, Fragment, reactive, provide } from "vue";
import { p as prefix, f as configOption, g as codeCss, s as staticTextDefault, b as allToolbar, d as allFooter } from "./config.mjs";
import { b as bus, g as CATALOG_CHANGED, P as PUSH_CATALOG, h as RERENDER, B as BUILD_FINISHED, T as TASK_STATE_CHANGED, c as ON_SAVE, E as ERROR_CATCHER, U as UPLOAD_IMAGE, a as CHANGE_CATALOG_VISIBLE, i as PAGE_FULL_SCREEN_CHANGED, F as FULL_SCREEN_CHANGED, j as PREVIEW_CHANGED, k as PREVIEW_ONLY_CHANGED, H as HTML_PREVIEW_CHANGED, l as CATALOG_VISIBLE_CHANGED, R as REPLACE, C as CHANGE_FULL_SCREEN, f as EVENT_LISTENER } from "./event-name.mjs";
import { a as appendHandler, u as updateHandler, z as zoomMermaid } from "./dom.mjs";
import { debounce, randomId, deepMerge, deepClone } from "@vavt/util";
import mediumZoom from "medium-zoom";
import copy from "copy-to-clipboard";
import mdit from "markdown-it";
import ImageFiguresPlugin from "markdown-it-image-figures";
import SubPlugin from "markdown-it-sub";
import SupPlugin from "markdown-it-sup";
import { g as generateCodeRowNumber, a as getNextId } from "./index5.mjs";
import { LRUCache } from "lru-cache";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
const userZoom = (props, html) => {
  const editorId = inject("editorId");
  const { noImgZoomIn } = props;
  const zoomHander = debounce(() => {
    const imgs = document.querySelectorAll(
      `#${editorId}-preview img:not(.not-zoom):not(.medium-zoom-image)`
    );
    if (imgs.length === 0) {
      return;
    }
    mediumZoom(imgs, {
      background: "#00000073"
    });
  });
  onMounted(() => {
    if (!noImgZoomIn && props.setting.preview) {
      zoomHander();
    }
  });
  watch([html, toRef(props.setting, "preview")], () => {
    if (!noImgZoomIn && props.setting.preview) {
      zoomHander();
    }
  });
};
const useCopyCode = (props, html, key) => {
  const editorId = inject("editorId");
  const rootRef = inject("rootRef");
  const ult = inject("usedLanguageText");
  const initCopyEntry = () => {
    rootRef.value.querySelectorAll(`#${editorId} .${prefix}-preview .${prefix}-code`).forEach((codeBlock) => {
      let clearTimer = -1;
      const copyButton = codeBlock.querySelector(
        `.${prefix}-copy-button`
      );
      if (copyButton)
        copyButton.onclick = (e) => {
          e.preventDefault();
          clearTimeout(clearTimer);
          const activeCode = codeBlock.querySelector("input:checked + pre code") || codeBlock.querySelector("pre code");
          const codeText = activeCode.textContent;
          const success = copy(props.formatCopiedText(codeText));
          const { text, successTips, failTips } = ult.value.copyCode;
          const msg = success ? successTips : failTips;
          if (copyButton.dataset.isIcon) {
            copyButton.dataset.tips = msg;
          } else {
            copyButton.innerHTML = msg;
          }
          clearTimer = window.setTimeout(() => {
            if (copyButton.dataset.isIcon) {
              copyButton.dataset.tips = text;
            } else {
              copyButton.innerHTML = text;
            }
          }, 1500);
        };
    });
  };
  const htmlChanged = () => {
    nextTick(initCopyEntry);
  };
  const settingPreviewChanged = (nVal) => {
    if (nVal) {
      nextTick(initCopyEntry);
    }
  };
  watch([html, key], htmlChanged);
  watch(() => props.setting.preview, settingPreviewChanged);
  watch(() => props.setting.htmlPreview, settingPreviewChanged);
  watch(() => ult.value, initCopyEntry);
  onMounted(initCopyEntry);
};
const useHighlight = (props) => {
  const highlight = inject("highlight");
  const hljsRef = shallowRef(configOption.editorExtensions.highlight.instance);
  onMounted(() => {
    if (props.noHighlight || hljsRef.value) {
      return;
    }
    appendHandler("link", {
      ...highlight.value.css,
      rel: "stylesheet",
      id: `${prefix}-hlCss`
    });
    appendHandler(
      "script",
      {
        ...highlight.value.js,
        id: `${prefix}-hljs`,
        onload() {
          hljsRef.value = window.hljs;
        }
      },
      "hljs"
    );
  });
  watch(
    () => highlight.value.css,
    () => {
      if (props.noHighlight || configOption.editorExtensions.highlight.instance) {
        return;
      }
      updateHandler("link", {
        ...highlight.value.css,
        rel: "stylesheet",
        id: `${prefix}-hlCss`
      });
    }
  );
  return hljsRef;
};
const mermaidCache = new LRUCache({
  max: 1e3,
  // 缓存10分钟
  ttl: 6e5
});
const useMermaid = (props) => {
  const theme = inject("theme");
  const rootRef = inject("rootRef");
  const { editorExtensions, editorExtensionsAttrs, mermaidConfig } = configOption;
  const mermaidRef = shallowRef(editorExtensions.mermaid.instance);
  const reRenderRef = shallowRef(-1);
  const configMermaid = () => {
    const mermaid = mermaidRef.value;
    if (!props.noMermaid && mermaid) {
      mermaid.initialize(
        mermaidConfig({
          startOnLoad: false,
          theme: theme.value === "dark" ? "dark" : "default"
        })
      );
      reRenderRef.value = reRenderRef.value + 1;
    }
  };
  watch(
    () => theme.value,
    () => {
      mermaidCache.clear();
      configMermaid();
    }
  );
  onMounted(() => {
    var _a, _b;
    if (props.noMermaid || mermaidRef.value) {
      return;
    }
    const jsSrc = editorExtensions.mermaid.js;
    if (/\.mjs/.test(jsSrc)) {
      appendHandler("link", {
        ...(_a = editorExtensionsAttrs.mermaid) == null ? void 0 : _a.js,
        rel: "modulepreload",
        href: jsSrc,
        id: `${prefix}-mermaid-m`
      });
      import(
        /* @vite-ignore */
        /* webpackIgnore: true */
        jsSrc
      ).then((module) => {
        mermaidRef.value = module.default;
        configMermaid();
      });
    } else {
      appendHandler(
        "script",
        {
          ...(_b = editorExtensionsAttrs.mermaid) == null ? void 0 : _b.js,
          src: jsSrc,
          id: `${prefix}-mermaid`,
          onload() {
            mermaidRef.value = window.mermaid;
            configMermaid();
          }
        },
        "mermaid"
      );
    }
  });
  const replaceMermaid = async () => {
    if (!props.noMermaid && mermaidRef.value) {
      const mermaidSourceEles = rootRef.value.querySelectorAll(
        `div.${prefix}-mermaid`
      );
      const svgContainingElement = document.createElement("div");
      const sceWidth = document.body.offsetWidth > 1366 ? document.body.offsetWidth : 1366;
      const sceHeight = document.body.offsetHeight > 768 ? document.body.offsetHeight : 768;
      svgContainingElement.style.width = sceWidth + "px";
      svgContainingElement.style.height = sceHeight + "px";
      svgContainingElement.style.position = "fixed";
      svgContainingElement.style.zIndex = "-10000";
      svgContainingElement.style.top = "-10000";
      let count = mermaidSourceEles.length;
      if (count > 0) {
        document.body.appendChild(svgContainingElement);
      }
      await Promise.allSettled(
        Array.from(mermaidSourceEles).map((ele) => {
          const handler = async (item) => {
            var _a;
            let mermaidHtml = mermaidCache.get(item.innerText);
            if (!mermaidHtml) {
              const idRand = randomId();
              let result = { svg: "" };
              try {
                result = await mermaidRef.value.render(
                  idRand,
                  item.innerText,
                  svgContainingElement
                );
                mermaidHtml = await props.sanitizeMermaid(result.svg);
                const p = document.createElement("p");
                p.className = `${prefix}-mermaid`;
                p.setAttribute("data-processed", "");
                p.innerHTML = mermaidHtml;
                (_a = p.children[0]) == null ? void 0 : _a.removeAttribute("height");
                mermaidCache.set(item.innerText, p.innerHTML);
                if (item.dataset.line !== void 0) {
                  p.dataset.line = item.dataset.line;
                }
                item.replaceWith(p);
              } catch {
              }
              if (--count === 0) {
                svgContainingElement.remove();
              }
            }
          };
          return handler(ele);
        })
      );
    }
  };
  return { mermaidRef, reRenderRef, replaceMermaid };
};
const useKatex = (props) => {
  const katex = shallowRef(configOption.editorExtensions.katex.instance);
  onMounted(() => {
    if (props.noKatex || katex.value) {
      return;
    }
    const { editorExtensions } = configOption;
    appendHandler(
      "script",
      {
        src: editorExtensions.katex.js,
        id: `${prefix}-katex`,
        onload() {
          katex.value = window.katex;
        }
      },
      "katex"
    );
    appendHandler("link", {
      rel: "stylesheet",
      href: editorExtensions.katex.css,
      id: `${prefix}-katexCss`
    });
  });
  return katex;
};
const MermaidPlugin = (md, options) => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, ops, env, slf) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info === "mermaid") {
      let line;
      if (tokens[idx].map && tokens[idx].level === 0) {
        line = tokens[idx].map[0];
        tokens[idx].attrSet("data-line", String(line));
      }
      const mermaidHtml = mermaidCache.get(code);
      if (mermaidHtml) {
        return `<p class="${prefix}-mermaid" ${line !== void 0 ? "data-line=" + line : ""} data-processed>${mermaidHtml}</p>`;
      }
      return `<div class="${prefix}-mermaid" ${line !== void 0 ? "data-line=" + line : ""} data-mermaid-theme=${options.themeRef.value}>${code}</div>`;
    }
    return temp(tokens, idx, ops, env, slf);
  };
};
const mergeAttrs = (token, addAttrs) => {
  const tmpAttrs = token.attrs ? token.attrs.slice() : [];
  addAttrs.forEach((addAttr) => {
    const i = token.attrIndex(addAttr[0]);
    if (i < 0) {
      tmpAttrs.push(addAttr);
    } else {
      tmpAttrs[i] = tmpAttrs[i].slice();
      tmpAttrs[i][1] += ` ${addAttr[1]}`;
    }
  });
  return tmpAttrs;
};
const math_inline = (state, silent) => {
  const delimiters = [
    { open: "$", close: "$" },
    { open: "\\(", close: "\\)" }
  ];
  let match, token, pos;
  for (const delim of delimiters) {
    if (state.src.startsWith(delim.open, state.pos)) {
      const start = state.pos + delim.open.length;
      match = start;
      while ((match = state.src.indexOf(delim.close, match)) !== -1) {
        pos = match - 1;
        while (state.src[pos] === "\\") {
          pos -= 1;
        }
        if ((match - pos) % 2 == 1) {
          break;
        }
        match += delim.close.length;
      }
      if (match === -1) {
        if (!silent) {
          state.pending += delim.open;
        }
        state.pos = start;
        return true;
      }
      if (match - start === 0) {
        if (!silent) {
          state.pending += delim.open + delim.close;
        }
        state.pos = start + delim.close.length;
        return true;
      }
      if (!silent) {
        token = state.push("math_inline", "math", 0);
        token.markup = delim.open;
        token.content = state.src.slice(start, match);
      }
      state.pos = match + delim.close.length;
      return true;
    }
  }
  return false;
};
const math_block = (state, start, end, silent) => {
  const delimiters = [
    { open: "$$", close: "$$" },
    { open: "\\[", close: "\\]" }
  ];
  let firstLine, lastLine, next, lastPos, found = false;
  let pos = state.bMarks[start] + state.tShift[start];
  let max = state.eMarks[start];
  for (const delim of delimiters) {
    if (pos + delim.open.length > max) {
      continue;
    }
    if (state.src.slice(pos, pos + delim.open.length) !== delim.open) {
      continue;
    }
    pos += delim.open.length;
    firstLine = state.src.slice(pos, max);
    if (silent) {
      return true;
    }
    if (firstLine.trim().slice(-delim.close.length) === delim.close) {
      firstLine = firstLine.trim().slice(0, -delim.close.length);
      found = true;
    }
    for (next = start; !found; ) {
      next++;
      if (next >= end) {
        break;
      }
      pos = state.bMarks[next] + state.tShift[next];
      max = state.eMarks[next];
      if (pos < max && state.tShift[next] < state.blkIndent) {
        break;
      }
      if (state.src.slice(pos, max).trim().slice(-delim.close.length) === delim.close) {
        lastPos = state.src.slice(0, max).lastIndexOf(delim.close);
        lastLine = state.src.slice(pos, lastPos);
        found = true;
      }
    }
    state.line = next + 1;
    const token = state.push("math_block", "math", 0);
    token.block = true;
    token.content = (firstLine && firstLine.trim() ? firstLine + "\n" : "") + state.getLines(start + 1, next, state.tShift[start], true) + (lastLine && lastLine.trim() ? lastLine : "");
    token.map = [start, state.line];
    token.markup = delim.open;
    return true;
  }
  return false;
};
const KatexPlugin = (md, { katexRef }) => {
  const katexInline = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const tmpToken = {
      attrs: mergeAttrs(token, [["class", `${prefix}-katex-inline`]])
    };
    if (katexRef.value) {
      const html = katexRef.value.renderToString(
        token.content,
        configOption.katexConfig({
          throwOnError: false
        })
      );
      return `<span ${slf.renderAttrs(tmpToken)} data-processed>${html}</span>`;
    } else {
      return `<span ${slf.renderAttrs(tmpToken)}>${token.content}</span>`;
    }
  };
  const katexBlock = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const tmpToken = {
      attrs: mergeAttrs(token, [["class", `${prefix}-katex-block`]])
    };
    if (katexRef.value) {
      const html = katexRef.value.renderToString(
        token.content,
        configOption.katexConfig({
          throwOnError: false,
          displayMode: true
        })
      );
      return `<p ${slf.renderAttrs(tmpToken)} data-processed>${html}</p>`;
    } else {
      return `<p ${slf.renderAttrs(tmpToken)}>${token.content}</p>`;
    }
  };
  md.inline.ruler.before("escape", "math_inline", math_inline);
  md.block.ruler.after("blockquote", "math_block", math_block, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  md.renderer.rules.math_inline = katexInline;
  md.renderer.rules.math_block = katexBlock;
};
const AdmonitionPlugin = (md, options) => {
  options = options || {};
  const markers = 3, markerStr = options.marker || "!", markerChar = markerStr.charCodeAt(0), markerLen = markerStr.length;
  let type = "", title = "";
  const render = (tokens, idx, _options, _env, self2) => {
    const token = tokens[idx];
    if (token.type === "admonition_open") {
      tokens[idx].attrPush([
        "class",
        `${prefix}-admonition ${prefix}-admonition-${token.info}`
      ]);
    } else if (token.type === "admonition_title_open") {
      tokens[idx].attrPush(["class", `${prefix}-admonition-title`]);
    }
    return self2.renderToken(tokens, idx, _options);
  };
  const validate = (params) => {
    const array = params.trim().split(" ", 2);
    title = "";
    type = array[0];
    if (array.length > 1) {
      title = params.substring(type.length + 2);
    }
  };
  md.block.ruler.before(
    "code",
    "admonition",
    (state, startLine, endLine, silent) => {
      let pos, nextLine, token, autoClosed = false, start = state.bMarks[startLine] + state.tShift[startLine], max = state.eMarks[startLine];
      if (markerChar !== state.src.charCodeAt(start)) {
        return false;
      }
      for (pos = start + 1; pos <= max; pos++) {
        if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
          break;
        }
      }
      const markerCount = Math.floor((pos - start) / markerLen);
      if (markerCount !== markers) {
        return false;
      }
      pos -= (pos - start) % markerLen;
      const markup = state.src.slice(start, pos);
      const params = state.src.slice(pos, max);
      validate(params);
      if (silent) {
        return true;
      }
      nextLine = startLine;
      for (; ; ) {
        nextLine++;
        if (nextLine >= endLine) {
          break;
        }
        start = state.bMarks[nextLine] + state.tShift[nextLine];
        max = state.eMarks[nextLine];
        if (start < max && state.sCount[nextLine] < state.blkIndent) {
          break;
        }
        if (markerChar !== state.src.charCodeAt(start)) {
          continue;
        }
        if (state.sCount[nextLine] - state.blkIndent >= 4) {
          continue;
        }
        for (pos = start + 1; pos <= max; pos++) {
          if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
            break;
          }
        }
        if (Math.floor((pos - start) / markerLen) < markerCount) {
          continue;
        }
        pos -= (pos - start) % markerLen;
        pos = state.skipSpaces(pos);
        if (pos < max) {
          continue;
        }
        autoClosed = true;
        break;
      }
      const oldParent = state.parentType;
      const oldLineMax = state.lineMax;
      state.parentType = "root";
      state.lineMax = nextLine;
      token = state.push("admonition_open", "div", 1);
      token.markup = markup;
      token.block = true;
      token.info = type;
      token.map = [startLine, nextLine];
      if (title) {
        token = state.push("admonition_title_open", "p", 1);
        token.markup = markup + " " + type;
        token.map = [startLine, nextLine];
        token = state.push("inline", "", 0);
        token.content = title;
        token.map = [startLine, state.line - 1];
        token.children = [];
        token = state.push("admonition_title_close", "p", -1);
        token.markup = markup + " " + type;
      }
      state.md.block.tokenize(state, startLine + 1, nextLine);
      token = state.push("admonition_close", "div", -1);
      token.markup = state.src.slice(start, pos);
      token.block = true;
      state.parentType = oldParent;
      state.lineMax = oldLineMax;
      state.line = nextLine + (autoClosed ? 1 : 0);
      return true;
    },
    {
      alt: ["paragraph", "reference", "blockquote", "list"]
    }
  );
  md.renderer.rules["admonition_open"] = render;
  md.renderer.rules["admonition_title_open"] = render;
  md.renderer.rules["admonition_title_close"] = render;
  md.renderer.rules["admonition_close"] = render;
};
const HeadingPlugin = (md, options) => {
  md.renderer.rules.heading_open = (tokens, idx) => {
    var _a;
    const token = tokens[idx];
    const text = ((_a = tokens[idx + 1].children) == null ? void 0 : _a.reduce((p, c) => {
      return p + (["text", "code_inline", "math_inline"].includes(c.type) ? c.content || "" : "");
    }, "")) || "";
    const level = token.markup.length;
    options.headsRef.value.push({
      text,
      level
    });
    if (token.map && token.level === 0) {
      token.attrSet(
        "id",
        options.mdHeadingId(text, level, options.headsRef.value.length)
      );
    }
    return md.renderer.renderToken(tokens, idx, options);
  };
  md.renderer.rules.heading_close = (tokens, idx, opts, _env, self2) => {
    return self2.renderToken(tokens, idx, opts);
  };
};
const StrIcon = (name, customIcon) => {
  if (typeof customIcon[name] === "string") {
    return customIcon[name];
  }
  const defaultStr = `<i class="${prefix}-iconfont ${prefix}-icon-${name}"></i>`;
  switch (configOption.iconfontType) {
    case "svg": {
      return `<svg class="${prefix}-icon" aria-hidden="true"><use xlink:href="#${prefix}-icon-${name}"></use></svg>`;
    }
    default: {
      return defaultStr;
    }
  }
};
const StrIcon$1 = StrIcon;
const codetabs = (md, _opts) => {
  const defaultRender = md.renderer.rules.fence, unescapeAll = md.utils.unescapeAll, re = /\[(\w*)(?::([\w ]*))?\]/, mandatoryRe = /::(open|close)/;
  const getInfo = (token) => {
    return token.info ? unescapeAll(token.info).trim() : "";
  };
  const getGroupAndTab = (token) => {
    const info = getInfo(token), [group = null, tab = ""] = (re.exec(info) || []).slice(1);
    return [group, tab];
  };
  const getLangName = (token) => {
    const info = getInfo(token);
    return info ? info.split(/(\s+)/g)[0] : "";
  };
  const getTagType = (token) => {
    const mandatory = token.info.match(mandatoryRe) || [];
    const open = mandatory[1] === "open" || mandatory[1] !== "close" && _opts.codeFoldable && token.content.trim().split("\n").length < _opts.autoFoldThreshold;
    const tagContainer = mandatory[1] || _opts.codeFoldable ? "details" : "div", tagHeader = mandatory[1] || _opts.codeFoldable ? "summary" : "div";
    return { open, tagContainer, tagHeader };
  };
  const fenceGroup = (tokens, idx, options, env, slf) => {
    var _a;
    if (tokens[idx].hidden) {
      return "";
    }
    const codeCodeText = (_a = _opts.usedLanguageTextRef.value) == null ? void 0 : _a.copyCode.text;
    const copyBtnHtml = _opts.customIconRef.value.copy || codeCodeText;
    const isIcon = !!_opts.customIconRef.value.copy;
    const collapseTips = `<span class="${prefix}-collapse-tips">${StrIcon$1("collapse-tips", _opts.customIconRef.value)}</span>`;
    const [GROUP] = getGroupAndTab(tokens[idx]);
    if (GROUP === null) {
      const { open: open2, tagContainer: tagContainer2, tagHeader: tagHeader2 } = getTagType(tokens[idx]);
      const addAttrs2 = [["class", `${prefix}-code`]];
      open2 && addAttrs2.push(["open", ""]);
      const tmpToken2 = {
        attrs: mergeAttrs(tokens[idx], addAttrs2)
      };
      tokens[idx].info = tokens[idx].info.replace(mandatoryRe, "");
      const codeRendered = defaultRender(tokens, idx, options, env, slf);
      return `
        <${tagContainer2} ${slf.renderAttrs(tmpToken2)}>
          <${tagHeader2} class="${prefix}-code-head">
            <div class="${prefix}-code-flag"><span></span><span></span><span></span></div>
            <div class="${prefix}-code-action">
              <span class="${prefix}-code-lang">${tokens[idx].info.trim()}</span>
              <span class="${prefix}-copy-button" data-tips="${codeCodeText}"${isIcon ? " data-is-icon=true" : ""}>${copyBtnHtml}</span>
              ${tagContainer2 === "details" ? collapseTips : ""}
            </div>
          </${tagHeader2}>
          ${codeRendered}
        </${tagContainer2}>
      `;
    }
    let token, group, tab, checked, labels = "", pres = "", langs = "";
    const { open, tagContainer, tagHeader } = getTagType(tokens[idx]);
    const addAttrs = [["class", `${prefix}-code`]];
    open && addAttrs.push(["open", ""]);
    const tmpToken = {
      attrs: mergeAttrs(tokens[idx], addAttrs)
    };
    for (let i = idx; i < tokens.length; i++) {
      token = tokens[i];
      [group, tab] = getGroupAndTab(token);
      if (group !== GROUP) {
        break;
      }
      token.info = token.info.replace(re, "").replace(mandatoryRe, "");
      token.hidden = true;
      const className = `${prefix}-codetab-${_opts.editorId}-${idx}-${i - idx}`;
      checked = i - idx > 0 ? "" : "checked";
      labels += `
        <li>
          <input
            type="radio"
            id="label-${prefix}-codetab-label-1-${_opts.editorId}-${idx}-${i - idx}"
            name="${prefix}-codetab-label-${_opts.editorId}-${idx}"
            class="${className}"
            ${checked}
          >
          <label
            for="label-${prefix}-codetab-label-1-${_opts.editorId}-${idx}-${i - idx}"
            onclick="this.getRootNode().querySelectorAll('.${className}').forEach(e => e.click())"
          >
            ${tab || getLangName(token)}
          </label>
        </li>`;
      pres += `
        <div role="tabpanel">
          <input
            type="radio"
            name="${prefix}-codetab-pre-${_opts.editorId}-${idx}"
            class="${className}"
            ${checked}
            role="presentation">
          ${defaultRender(tokens, i, options, env, slf)}
        </div>`;
      langs += `
        <input
          type="radio"
          name="${prefix}-codetab-lang-${_opts.editorId}-${idx}"
          class="${className}"
          ${checked}
          role="presentation">
        <span class=${prefix}-code-lang role="note">${getLangName(token)}</span>`;
    }
    return `
      <${tagContainer} ${slf.renderAttrs(tmpToken)}>
        <${tagHeader} class="${prefix}-code-head">
          <div class="${prefix}-code-flag">
            <ul class="${prefix}-codetab-label" role="tablist">${labels}</ul>
          </div>
          <div class="${prefix}-code-action">
            <span class="${prefix}-codetab-lang">${langs}</span>
            <span class="${prefix}-copy-button" data-tips="${codeCodeText}"${isIcon ? " data-is-icon=true" : ""}>${copyBtnHtml}</span>
            ${tagContainer === "details" ? collapseTips : ""}
          </div>
        </${tagHeader}>
        ${pres}
      </${tagContainer}>
    `;
  };
  md.renderer.rules.fence = fenceGroup;
  md.renderer.rules.code_block = fenceGroup;
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var lib$1 = { exports: {} };
var _default$1 = {};
var lib = { exports: {} };
var _default = {};
function getDefaultWhiteList$1() {
  var whiteList = {};
  whiteList["align-content"] = false;
  whiteList["align-items"] = false;
  whiteList["align-self"] = false;
  whiteList["alignment-adjust"] = false;
  whiteList["alignment-baseline"] = false;
  whiteList["all"] = false;
  whiteList["anchor-point"] = false;
  whiteList["animation"] = false;
  whiteList["animation-delay"] = false;
  whiteList["animation-direction"] = false;
  whiteList["animation-duration"] = false;
  whiteList["animation-fill-mode"] = false;
  whiteList["animation-iteration-count"] = false;
  whiteList["animation-name"] = false;
  whiteList["animation-play-state"] = false;
  whiteList["animation-timing-function"] = false;
  whiteList["azimuth"] = false;
  whiteList["backface-visibility"] = false;
  whiteList["background"] = true;
  whiteList["background-attachment"] = true;
  whiteList["background-clip"] = true;
  whiteList["background-color"] = true;
  whiteList["background-image"] = true;
  whiteList["background-origin"] = true;
  whiteList["background-position"] = true;
  whiteList["background-repeat"] = true;
  whiteList["background-size"] = true;
  whiteList["baseline-shift"] = false;
  whiteList["binding"] = false;
  whiteList["bleed"] = false;
  whiteList["bookmark-label"] = false;
  whiteList["bookmark-level"] = false;
  whiteList["bookmark-state"] = false;
  whiteList["border"] = true;
  whiteList["border-bottom"] = true;
  whiteList["border-bottom-color"] = true;
  whiteList["border-bottom-left-radius"] = true;
  whiteList["border-bottom-right-radius"] = true;
  whiteList["border-bottom-style"] = true;
  whiteList["border-bottom-width"] = true;
  whiteList["border-collapse"] = true;
  whiteList["border-color"] = true;
  whiteList["border-image"] = true;
  whiteList["border-image-outset"] = true;
  whiteList["border-image-repeat"] = true;
  whiteList["border-image-slice"] = true;
  whiteList["border-image-source"] = true;
  whiteList["border-image-width"] = true;
  whiteList["border-left"] = true;
  whiteList["border-left-color"] = true;
  whiteList["border-left-style"] = true;
  whiteList["border-left-width"] = true;
  whiteList["border-radius"] = true;
  whiteList["border-right"] = true;
  whiteList["border-right-color"] = true;
  whiteList["border-right-style"] = true;
  whiteList["border-right-width"] = true;
  whiteList["border-spacing"] = true;
  whiteList["border-style"] = true;
  whiteList["border-top"] = true;
  whiteList["border-top-color"] = true;
  whiteList["border-top-left-radius"] = true;
  whiteList["border-top-right-radius"] = true;
  whiteList["border-top-style"] = true;
  whiteList["border-top-width"] = true;
  whiteList["border-width"] = true;
  whiteList["bottom"] = false;
  whiteList["box-decoration-break"] = true;
  whiteList["box-shadow"] = true;
  whiteList["box-sizing"] = true;
  whiteList["box-snap"] = true;
  whiteList["box-suppress"] = true;
  whiteList["break-after"] = true;
  whiteList["break-before"] = true;
  whiteList["break-inside"] = true;
  whiteList["caption-side"] = false;
  whiteList["chains"] = false;
  whiteList["clear"] = true;
  whiteList["clip"] = false;
  whiteList["clip-path"] = false;
  whiteList["clip-rule"] = false;
  whiteList["color"] = true;
  whiteList["color-interpolation-filters"] = true;
  whiteList["column-count"] = false;
  whiteList["column-fill"] = false;
  whiteList["column-gap"] = false;
  whiteList["column-rule"] = false;
  whiteList["column-rule-color"] = false;
  whiteList["column-rule-style"] = false;
  whiteList["column-rule-width"] = false;
  whiteList["column-span"] = false;
  whiteList["column-width"] = false;
  whiteList["columns"] = false;
  whiteList["contain"] = false;
  whiteList["content"] = false;
  whiteList["counter-increment"] = false;
  whiteList["counter-reset"] = false;
  whiteList["counter-set"] = false;
  whiteList["crop"] = false;
  whiteList["cue"] = false;
  whiteList["cue-after"] = false;
  whiteList["cue-before"] = false;
  whiteList["cursor"] = false;
  whiteList["direction"] = false;
  whiteList["display"] = true;
  whiteList["display-inside"] = true;
  whiteList["display-list"] = true;
  whiteList["display-outside"] = true;
  whiteList["dominant-baseline"] = false;
  whiteList["elevation"] = false;
  whiteList["empty-cells"] = false;
  whiteList["filter"] = false;
  whiteList["flex"] = false;
  whiteList["flex-basis"] = false;
  whiteList["flex-direction"] = false;
  whiteList["flex-flow"] = false;
  whiteList["flex-grow"] = false;
  whiteList["flex-shrink"] = false;
  whiteList["flex-wrap"] = false;
  whiteList["float"] = false;
  whiteList["float-offset"] = false;
  whiteList["flood-color"] = false;
  whiteList["flood-opacity"] = false;
  whiteList["flow-from"] = false;
  whiteList["flow-into"] = false;
  whiteList["font"] = true;
  whiteList["font-family"] = true;
  whiteList["font-feature-settings"] = true;
  whiteList["font-kerning"] = true;
  whiteList["font-language-override"] = true;
  whiteList["font-size"] = true;
  whiteList["font-size-adjust"] = true;
  whiteList["font-stretch"] = true;
  whiteList["font-style"] = true;
  whiteList["font-synthesis"] = true;
  whiteList["font-variant"] = true;
  whiteList["font-variant-alternates"] = true;
  whiteList["font-variant-caps"] = true;
  whiteList["font-variant-east-asian"] = true;
  whiteList["font-variant-ligatures"] = true;
  whiteList["font-variant-numeric"] = true;
  whiteList["font-variant-position"] = true;
  whiteList["font-weight"] = true;
  whiteList["grid"] = false;
  whiteList["grid-area"] = false;
  whiteList["grid-auto-columns"] = false;
  whiteList["grid-auto-flow"] = false;
  whiteList["grid-auto-rows"] = false;
  whiteList["grid-column"] = false;
  whiteList["grid-column-end"] = false;
  whiteList["grid-column-start"] = false;
  whiteList["grid-row"] = false;
  whiteList["grid-row-end"] = false;
  whiteList["grid-row-start"] = false;
  whiteList["grid-template"] = false;
  whiteList["grid-template-areas"] = false;
  whiteList["grid-template-columns"] = false;
  whiteList["grid-template-rows"] = false;
  whiteList["hanging-punctuation"] = false;
  whiteList["height"] = true;
  whiteList["hyphens"] = false;
  whiteList["icon"] = false;
  whiteList["image-orientation"] = false;
  whiteList["image-resolution"] = false;
  whiteList["ime-mode"] = false;
  whiteList["initial-letters"] = false;
  whiteList["inline-box-align"] = false;
  whiteList["justify-content"] = false;
  whiteList["justify-items"] = false;
  whiteList["justify-self"] = false;
  whiteList["left"] = false;
  whiteList["letter-spacing"] = true;
  whiteList["lighting-color"] = true;
  whiteList["line-box-contain"] = false;
  whiteList["line-break"] = false;
  whiteList["line-grid"] = false;
  whiteList["line-height"] = false;
  whiteList["line-snap"] = false;
  whiteList["line-stacking"] = false;
  whiteList["line-stacking-ruby"] = false;
  whiteList["line-stacking-shift"] = false;
  whiteList["line-stacking-strategy"] = false;
  whiteList["list-style"] = true;
  whiteList["list-style-image"] = true;
  whiteList["list-style-position"] = true;
  whiteList["list-style-type"] = true;
  whiteList["margin"] = true;
  whiteList["margin-bottom"] = true;
  whiteList["margin-left"] = true;
  whiteList["margin-right"] = true;
  whiteList["margin-top"] = true;
  whiteList["marker-offset"] = false;
  whiteList["marker-side"] = false;
  whiteList["marks"] = false;
  whiteList["mask"] = false;
  whiteList["mask-box"] = false;
  whiteList["mask-box-outset"] = false;
  whiteList["mask-box-repeat"] = false;
  whiteList["mask-box-slice"] = false;
  whiteList["mask-box-source"] = false;
  whiteList["mask-box-width"] = false;
  whiteList["mask-clip"] = false;
  whiteList["mask-image"] = false;
  whiteList["mask-origin"] = false;
  whiteList["mask-position"] = false;
  whiteList["mask-repeat"] = false;
  whiteList["mask-size"] = false;
  whiteList["mask-source-type"] = false;
  whiteList["mask-type"] = false;
  whiteList["max-height"] = true;
  whiteList["max-lines"] = false;
  whiteList["max-width"] = true;
  whiteList["min-height"] = true;
  whiteList["min-width"] = true;
  whiteList["move-to"] = false;
  whiteList["nav-down"] = false;
  whiteList["nav-index"] = false;
  whiteList["nav-left"] = false;
  whiteList["nav-right"] = false;
  whiteList["nav-up"] = false;
  whiteList["object-fit"] = false;
  whiteList["object-position"] = false;
  whiteList["opacity"] = false;
  whiteList["order"] = false;
  whiteList["orphans"] = false;
  whiteList["outline"] = false;
  whiteList["outline-color"] = false;
  whiteList["outline-offset"] = false;
  whiteList["outline-style"] = false;
  whiteList["outline-width"] = false;
  whiteList["overflow"] = false;
  whiteList["overflow-wrap"] = false;
  whiteList["overflow-x"] = false;
  whiteList["overflow-y"] = false;
  whiteList["padding"] = true;
  whiteList["padding-bottom"] = true;
  whiteList["padding-left"] = true;
  whiteList["padding-right"] = true;
  whiteList["padding-top"] = true;
  whiteList["page"] = false;
  whiteList["page-break-after"] = false;
  whiteList["page-break-before"] = false;
  whiteList["page-break-inside"] = false;
  whiteList["page-policy"] = false;
  whiteList["pause"] = false;
  whiteList["pause-after"] = false;
  whiteList["pause-before"] = false;
  whiteList["perspective"] = false;
  whiteList["perspective-origin"] = false;
  whiteList["pitch"] = false;
  whiteList["pitch-range"] = false;
  whiteList["play-during"] = false;
  whiteList["position"] = false;
  whiteList["presentation-level"] = false;
  whiteList["quotes"] = false;
  whiteList["region-fragment"] = false;
  whiteList["resize"] = false;
  whiteList["rest"] = false;
  whiteList["rest-after"] = false;
  whiteList["rest-before"] = false;
  whiteList["richness"] = false;
  whiteList["right"] = false;
  whiteList["rotation"] = false;
  whiteList["rotation-point"] = false;
  whiteList["ruby-align"] = false;
  whiteList["ruby-merge"] = false;
  whiteList["ruby-position"] = false;
  whiteList["shape-image-threshold"] = false;
  whiteList["shape-outside"] = false;
  whiteList["shape-margin"] = false;
  whiteList["size"] = false;
  whiteList["speak"] = false;
  whiteList["speak-as"] = false;
  whiteList["speak-header"] = false;
  whiteList["speak-numeral"] = false;
  whiteList["speak-punctuation"] = false;
  whiteList["speech-rate"] = false;
  whiteList["stress"] = false;
  whiteList["string-set"] = false;
  whiteList["tab-size"] = false;
  whiteList["table-layout"] = false;
  whiteList["text-align"] = true;
  whiteList["text-align-last"] = true;
  whiteList["text-combine-upright"] = true;
  whiteList["text-decoration"] = true;
  whiteList["text-decoration-color"] = true;
  whiteList["text-decoration-line"] = true;
  whiteList["text-decoration-skip"] = true;
  whiteList["text-decoration-style"] = true;
  whiteList["text-emphasis"] = true;
  whiteList["text-emphasis-color"] = true;
  whiteList["text-emphasis-position"] = true;
  whiteList["text-emphasis-style"] = true;
  whiteList["text-height"] = true;
  whiteList["text-indent"] = true;
  whiteList["text-justify"] = true;
  whiteList["text-orientation"] = true;
  whiteList["text-overflow"] = true;
  whiteList["text-shadow"] = true;
  whiteList["text-space-collapse"] = true;
  whiteList["text-transform"] = true;
  whiteList["text-underline-position"] = true;
  whiteList["text-wrap"] = true;
  whiteList["top"] = false;
  whiteList["transform"] = false;
  whiteList["transform-origin"] = false;
  whiteList["transform-style"] = false;
  whiteList["transition"] = false;
  whiteList["transition-delay"] = false;
  whiteList["transition-duration"] = false;
  whiteList["transition-property"] = false;
  whiteList["transition-timing-function"] = false;
  whiteList["unicode-bidi"] = false;
  whiteList["vertical-align"] = false;
  whiteList["visibility"] = false;
  whiteList["voice-balance"] = false;
  whiteList["voice-duration"] = false;
  whiteList["voice-family"] = false;
  whiteList["voice-pitch"] = false;
  whiteList["voice-range"] = false;
  whiteList["voice-rate"] = false;
  whiteList["voice-stress"] = false;
  whiteList["voice-volume"] = false;
  whiteList["volume"] = false;
  whiteList["white-space"] = false;
  whiteList["widows"] = false;
  whiteList["width"] = true;
  whiteList["will-change"] = false;
  whiteList["word-break"] = true;
  whiteList["word-spacing"] = true;
  whiteList["word-wrap"] = true;
  whiteList["wrap-flow"] = false;
  whiteList["wrap-through"] = false;
  whiteList["writing-mode"] = false;
  whiteList["z-index"] = false;
  return whiteList;
}
function onAttr(name, value, options) {
}
function onIgnoreAttr(name, value, options) {
}
var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;
function safeAttrValue$1(name, value) {
  if (REGEXP_URL_JAVASCRIPT.test(value)) return "";
  return value;
}
_default.whiteList = getDefaultWhiteList$1();
_default.getDefaultWhiteList = getDefaultWhiteList$1;
_default.onAttr = onAttr;
_default.onIgnoreAttr = onIgnoreAttr;
_default.safeAttrValue = safeAttrValue$1;
var util$1 = {
  indexOf: function(arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function(arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function(str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  trimRight: function(str) {
    if (String.prototype.trimRight) {
      return str.trimRight();
    }
    return str.replace(/(\s*$)/g, "");
  }
};
var _$3 = util$1;
function parseStyle$1(css2, onAttr2) {
  css2 = _$3.trimRight(css2);
  if (css2[css2.length - 1] !== ";") css2 += ";";
  var cssLength = css2.length;
  var isParenthesisOpen = false;
  var lastPos = 0;
  var i = 0;
  var retCSS = "";
  function addNewAttr() {
    if (!isParenthesisOpen) {
      var source = _$3.trim(css2.slice(lastPos, i));
      var j2 = source.indexOf(":");
      if (j2 !== -1) {
        var name = _$3.trim(source.slice(0, j2));
        var value = _$3.trim(source.slice(j2 + 1));
        if (name) {
          var ret = onAttr2(lastPos, retCSS.length, name, value, source);
          if (ret) retCSS += ret + "; ";
        }
      }
    }
    lastPos = i + 1;
  }
  for (; i < cssLength; i++) {
    var c = css2[i];
    if (c === "/" && css2[i + 1] === "*") {
      var j = css2.indexOf("*/", i + 2);
      if (j === -1) break;
      i = j + 1;
      lastPos = i + 1;
      isParenthesisOpen = false;
    } else if (c === "(") {
      isParenthesisOpen = true;
    } else if (c === ")") {
      isParenthesisOpen = false;
    } else if (c === ";") {
      if (isParenthesisOpen) ;
      else {
        addNewAttr();
      }
    } else if (c === "\n") {
      addNewAttr();
    }
  }
  return _$3.trim(retCSS);
}
var parser$2 = parseStyle$1;
var DEFAULT$1 = _default;
var parseStyle = parser$2;
function isNull$1(obj) {
  return obj === void 0 || obj === null;
}
function shallowCopyObject$1(obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}
function FilterCSS$2(options) {
  options = shallowCopyObject$1(options || {});
  options.whiteList = options.whiteList || DEFAULT$1.whiteList;
  options.onAttr = options.onAttr || DEFAULT$1.onAttr;
  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT$1.onIgnoreAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT$1.safeAttrValue;
  this.options = options;
}
FilterCSS$2.prototype.process = function(css2) {
  css2 = css2 || "";
  css2 = css2.toString();
  if (!css2) return "";
  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onAttr2 = options.onAttr;
  var onIgnoreAttr2 = options.onIgnoreAttr;
  var safeAttrValue2 = options.safeAttrValue;
  var retCSS = parseStyle(css2, function(sourcePosition, position, name, value, source) {
    var check = whiteList[name];
    var isWhite = false;
    if (check === true) isWhite = check;
    else if (typeof check === "function") isWhite = check(value);
    else if (check instanceof RegExp) isWhite = check.test(value);
    if (isWhite !== true) isWhite = false;
    value = safeAttrValue2(name, value);
    if (!value) return;
    var opts = {
      position,
      sourcePosition,
      source,
      isWhite
    };
    if (isWhite) {
      var ret = onAttr2(name, value, opts);
      if (isNull$1(ret)) {
        return name + ":" + value;
      } else {
        return ret;
      }
    } else {
      var ret = onIgnoreAttr2(name, value, opts);
      if (!isNull$1(ret)) {
        return ret;
      }
    }
  });
  return retCSS;
};
var css = FilterCSS$2;
(function(module, exports) {
  var DEFAULT2 = _default;
  var FilterCSS2 = css;
  function filterCSS(html, options) {
    var xss2 = new FilterCSS2(options);
    return xss2.process(html);
  }
  exports = module.exports = filterCSS;
  exports.FilterCSS = FilterCSS2;
  for (var i in DEFAULT2) exports[i] = DEFAULT2[i];
  if (typeof window !== "undefined") {
    window.filterCSS = module.exports;
  }
})(lib, lib.exports);
var libExports$1 = lib.exports;
var util = {
  indexOf: function(arr, item) {
    var i, j;
    if (Array.prototype.indexOf) {
      return arr.indexOf(item);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      if (arr[i] === item) {
        return i;
      }
    }
    return -1;
  },
  forEach: function(arr, fn, scope) {
    var i, j;
    if (Array.prototype.forEach) {
      return arr.forEach(fn, scope);
    }
    for (i = 0, j = arr.length; i < j; i++) {
      fn.call(scope, arr[i], i, arr);
    }
  },
  trim: function(str) {
    if (String.prototype.trim) {
      return str.trim();
    }
    return str.replace(/(^\s*)|(\s*$)/g, "");
  },
  spaceIndex: function(str) {
    var reg = /\s|\n|\t/;
    var match = reg.exec(str);
    return match ? match.index : -1;
  }
};
var FilterCSS$1 = libExports$1.FilterCSS;
var getDefaultCSSWhiteList = libExports$1.getDefaultWhiteList;
var _$2 = util;
function getDefaultWhiteList() {
  return {
    a: ["target", "href", "title"],
    abbr: ["title"],
    address: [],
    area: ["shape", "coords", "href", "alt"],
    article: [],
    aside: [],
    audio: [
      "autoplay",
      "controls",
      "crossorigin",
      "loop",
      "muted",
      "preload",
      "src"
    ],
    b: [],
    bdi: ["dir"],
    bdo: ["dir"],
    big: [],
    blockquote: ["cite"],
    br: [],
    caption: [],
    center: [],
    cite: [],
    code: [],
    col: ["align", "valign", "span", "width"],
    colgroup: ["align", "valign", "span", "width"],
    dd: [],
    del: ["datetime"],
    details: ["open"],
    div: [],
    dl: [],
    dt: [],
    em: [],
    figcaption: [],
    figure: [],
    font: ["color", "size", "face"],
    footer: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    header: [],
    hr: [],
    i: [],
    img: ["src", "alt", "title", "width", "height", "loading"],
    ins: ["datetime"],
    kbd: [],
    li: [],
    mark: [],
    nav: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    section: [],
    small: [],
    span: [],
    sub: [],
    summary: [],
    sup: [],
    strong: [],
    strike: [],
    table: ["width", "border", "align", "valign"],
    tbody: ["align", "valign"],
    td: ["width", "rowspan", "colspan", "align", "valign"],
    tfoot: ["align", "valign"],
    th: ["width", "rowspan", "colspan", "align", "valign"],
    thead: ["align", "valign"],
    tr: ["rowspan", "align", "valign"],
    tt: [],
    u: [],
    ul: [],
    video: [
      "autoplay",
      "controls",
      "crossorigin",
      "loop",
      "muted",
      "playsinline",
      "poster",
      "preload",
      "src",
      "height",
      "width"
    ]
  };
}
var defaultCSSFilter = new FilterCSS$1();
function onTag(tag, html, options) {
}
function onIgnoreTag(tag, html, options) {
}
function onTagAttr(tag, name, value) {
}
function onIgnoreTagAttr(tag, name, value) {
}
function escapeHtml(html) {
  return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
}
function safeAttrValue(tag, name, value, cssFilter) {
  value = friendlyAttrValue(value);
  if (name === "href" || name === "src") {
    value = _$2.trim(value);
    if (value === "#") return "#";
    if (!(value.substr(0, 7) === "http://" || value.substr(0, 8) === "https://" || value.substr(0, 7) === "mailto:" || value.substr(0, 4) === "tel:" || value.substr(0, 11) === "data:image/" || value.substr(0, 6) === "ftp://" || value.substr(0, 2) === "./" || value.substr(0, 3) === "../" || value[0] === "#" || value[0] === "/")) {
      return "";
    }
  } else if (name === "background") {
    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
      return "";
    }
  } else if (name === "style") {
    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
      return "";
    }
    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
        return "";
      }
    }
    if (cssFilter !== false) {
      cssFilter = cssFilter || defaultCSSFilter;
      value = cssFilter.process(value);
    }
  }
  value = escapeAttrValue(value);
  return value;
}
var REGEXP_LT = /</g;
var REGEXP_GT = />/g;
var REGEXP_QUOTE = /"/g;
var REGEXP_QUOTE_2 = /&quot;/g;
var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
var REGEXP_DEFAULT_ON_TAG_ATTR_4 = /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_7 = /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;
function escapeQuote(str) {
  return str.replace(REGEXP_QUOTE, "&quot;");
}
function unescapeQuote(str) {
  return str.replace(REGEXP_QUOTE_2, '"');
}
function escapeHtmlEntities(str) {
  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str2, code) {
    return code[0] === "x" || code[0] === "X" ? String.fromCharCode(parseInt(code.substr(1), 16)) : String.fromCharCode(parseInt(code, 10));
  });
}
function escapeDangerHtml5Entities(str) {
  return str.replace(REGEXP_ATTR_VALUE_COLON, ":").replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
}
function clearNonPrintableCharacter(str) {
  var str2 = "";
  for (var i = 0, len = str.length; i < len; i++) {
    str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
  }
  return _$2.trim(str2);
}
function friendlyAttrValue(str) {
  str = unescapeQuote(str);
  str = escapeHtmlEntities(str);
  str = escapeDangerHtml5Entities(str);
  str = clearNonPrintableCharacter(str);
  return str;
}
function escapeAttrValue(str) {
  str = escapeQuote(str);
  str = escapeHtml(str);
  return str;
}
function onIgnoreTagStripAll() {
  return "";
}
function StripTagBody(tags, next) {
  if (typeof next !== "function") {
    next = function() {
    };
  }
  var isRemoveAllTag = !Array.isArray(tags);
  function isRemoveTag(tag) {
    if (isRemoveAllTag) return true;
    return _$2.indexOf(tags, tag) !== -1;
  }
  var removeList = [];
  var posStart = false;
  return {
    onIgnoreTag: function(tag, html, options) {
      if (isRemoveTag(tag)) {
        if (options.isClosing) {
          var ret = "[/removed]";
          var end = options.position + ret.length;
          removeList.push([
            posStart !== false ? posStart : options.position,
            end
          ]);
          posStart = false;
          return ret;
        } else {
          if (!posStart) {
            posStart = options.position;
          }
          return "[removed]";
        }
      } else {
        return next(tag, html, options);
      }
    },
    remove: function(html) {
      var rethtml = "";
      var lastPos = 0;
      _$2.forEach(removeList, function(pos) {
        rethtml += html.slice(lastPos, pos[0]);
        lastPos = pos[1];
      });
      rethtml += html.slice(lastPos);
      return rethtml;
    }
  };
}
function stripCommentTag(html) {
  var retHtml = "";
  var lastPos = 0;
  while (lastPos < html.length) {
    var i = html.indexOf("<!--", lastPos);
    if (i === -1) {
      retHtml += html.slice(lastPos);
      break;
    }
    retHtml += html.slice(lastPos, i);
    var j = html.indexOf("-->", i);
    if (j === -1) {
      break;
    }
    lastPos = j + 3;
  }
  return retHtml;
}
function stripBlankChar(html) {
  var chars = html.split("");
  chars = chars.filter(function(char) {
    var c = char.charCodeAt(0);
    if (c === 127) return false;
    if (c <= 31) {
      if (c === 10 || c === 13) return true;
      return false;
    }
    return true;
  });
  return chars.join("");
}
_default$1.whiteList = getDefaultWhiteList();
_default$1.getDefaultWhiteList = getDefaultWhiteList;
_default$1.onTag = onTag;
_default$1.onIgnoreTag = onIgnoreTag;
_default$1.onTagAttr = onTagAttr;
_default$1.onIgnoreTagAttr = onIgnoreTagAttr;
_default$1.safeAttrValue = safeAttrValue;
_default$1.escapeHtml = escapeHtml;
_default$1.escapeQuote = escapeQuote;
_default$1.unescapeQuote = unescapeQuote;
_default$1.escapeHtmlEntities = escapeHtmlEntities;
_default$1.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
_default$1.clearNonPrintableCharacter = clearNonPrintableCharacter;
_default$1.friendlyAttrValue = friendlyAttrValue;
_default$1.escapeAttrValue = escapeAttrValue;
_default$1.onIgnoreTagStripAll = onIgnoreTagStripAll;
_default$1.StripTagBody = StripTagBody;
_default$1.stripCommentTag = stripCommentTag;
_default$1.stripBlankChar = stripBlankChar;
_default$1.attributeWrapSign = '"';
_default$1.cssFilter = defaultCSSFilter;
_default$1.getDefaultCSSWhiteList = getDefaultCSSWhiteList;
var parser$1 = {};
var _$1 = util;
function getTagName(html) {
  var i = _$1.spaceIndex(html);
  var tagName;
  if (i === -1) {
    tagName = html.slice(1, -1);
  } else {
    tagName = html.slice(1, i + 1);
  }
  tagName = _$1.trim(tagName).toLowerCase();
  if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
  if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
  return tagName;
}
function isClosing(html) {
  return html.slice(0, 2) === "</";
}
function parseTag$1(html, onTag2, escapeHtml2) {
  var rethtml = "";
  var lastPos = 0;
  var tagStart = false;
  var quoteStart = false;
  var currentPos = 0;
  var len = html.length;
  var currentTagName = "";
  var currentHtml = "";
  chariterator: for (currentPos = 0; currentPos < len; currentPos++) {
    var c = html.charAt(currentPos);
    if (tagStart === false) {
      if (c === "<") {
        tagStart = currentPos;
        continue;
      }
    } else {
      if (quoteStart === false) {
        if (c === "<") {
          rethtml += escapeHtml2(html.slice(lastPos, currentPos));
          tagStart = currentPos;
          lastPos = currentPos;
          continue;
        }
        if (c === ">" || currentPos === len - 1) {
          rethtml += escapeHtml2(html.slice(lastPos, tagStart));
          currentHtml = html.slice(tagStart, currentPos + 1);
          currentTagName = getTagName(currentHtml);
          rethtml += onTag2(
            tagStart,
            rethtml.length,
            currentTagName,
            currentHtml,
            isClosing(currentHtml)
          );
          lastPos = currentPos + 1;
          tagStart = false;
          continue;
        }
        if (c === '"' || c === "'") {
          var i = 1;
          var ic = html.charAt(currentPos - i);
          while (ic.trim() === "" || ic === "=") {
            if (ic === "=") {
              quoteStart = c;
              continue chariterator;
            }
            ic = html.charAt(currentPos - ++i);
          }
        }
      } else {
        if (c === quoteStart) {
          quoteStart = false;
          continue;
        }
      }
    }
  }
  if (lastPos < len) {
    rethtml += escapeHtml2(html.substr(lastPos));
  }
  return rethtml;
}
var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9\\_:.-]/gim;
function parseAttr$1(html, onAttr2) {
  var lastPos = 0;
  var lastMarkPos = 0;
  var retAttrs = [];
  var tmpName = false;
  var len = html.length;
  function addAttr(name, value) {
    name = _$1.trim(name);
    name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
    if (name.length < 1) return;
    var ret = onAttr2(name, value || "");
    if (ret) retAttrs.push(ret);
  }
  for (var i = 0; i < len; i++) {
    var c = html.charAt(i);
    var v, j;
    if (tmpName === false && c === "=") {
      tmpName = html.slice(lastPos, i);
      lastPos = i + 1;
      lastMarkPos = html.charAt(lastPos) === '"' || html.charAt(lastPos) === "'" ? lastPos : findNextQuotationMark(html, i + 1);
      continue;
    }
    if (tmpName !== false) {
      if (i === lastMarkPos) {
        j = html.indexOf(c, i + 1);
        if (j === -1) {
          break;
        } else {
          v = _$1.trim(html.slice(lastMarkPos + 1, j));
          addAttr(tmpName, v);
          tmpName = false;
          i = j;
          lastPos = i + 1;
          continue;
        }
      }
    }
    if (/\s|\n|\t/.test(c)) {
      html = html.replace(/\s|\n|\t/g, " ");
      if (tmpName === false) {
        j = findNextEqual(html, i);
        if (j === -1) {
          v = _$1.trim(html.slice(lastPos, i));
          addAttr(v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          i = j - 1;
          continue;
        }
      } else {
        j = findBeforeEqual(html, i - 1);
        if (j === -1) {
          v = _$1.trim(html.slice(lastPos, i));
          v = stripQuoteWrap(v);
          addAttr(tmpName, v);
          tmpName = false;
          lastPos = i + 1;
          continue;
        } else {
          continue;
        }
      }
    }
  }
  if (lastPos < html.length) {
    if (tmpName === false) {
      addAttr(html.slice(lastPos));
    } else {
      addAttr(tmpName, stripQuoteWrap(_$1.trim(html.slice(lastPos))));
    }
  }
  return _$1.trim(retAttrs.join(" "));
}
function findNextEqual(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}
function findNextQuotationMark(str, i) {
  for (; i < str.length; i++) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "'" || c === '"') return i;
    return -1;
  }
}
function findBeforeEqual(str, i) {
  for (; i > 0; i--) {
    var c = str[i];
    if (c === " ") continue;
    if (c === "=") return i;
    return -1;
  }
}
function isQuoteWrapString(text) {
  if (text[0] === '"' && text[text.length - 1] === '"' || text[0] === "'" && text[text.length - 1] === "'") {
    return true;
  } else {
    return false;
  }
}
function stripQuoteWrap(text) {
  if (isQuoteWrapString(text)) {
    return text.substr(1, text.length - 2);
  } else {
    return text;
  }
}
parser$1.parseTag = parseTag$1;
parser$1.parseAttr = parseAttr$1;
var FilterCSS = libExports$1.FilterCSS;
var DEFAULT = _default$1;
var parser = parser$1;
var parseTag = parser.parseTag;
var parseAttr = parser.parseAttr;
var _ = util;
function isNull(obj) {
  return obj === void 0 || obj === null;
}
function getAttrs(html) {
  var i = _.spaceIndex(html);
  if (i === -1) {
    return {
      html: "",
      closing: html[html.length - 2] === "/"
    };
  }
  html = _.trim(html.slice(i + 1, -1));
  var isClosing2 = html[html.length - 1] === "/";
  if (isClosing2) html = _.trim(html.slice(0, -1));
  return {
    html,
    closing: isClosing2
  };
}
function shallowCopyObject(obj) {
  var ret = {};
  for (var i in obj) {
    ret[i] = obj[i];
  }
  return ret;
}
function keysToLowerCase(obj) {
  var ret = {};
  for (var i in obj) {
    if (Array.isArray(obj[i])) {
      ret[i.toLowerCase()] = obj[i].map(function(item) {
        return item.toLowerCase();
      });
    } else {
      ret[i.toLowerCase()] = obj[i];
    }
  }
  return ret;
}
function FilterXSS(options) {
  options = shallowCopyObject(options || {});
  if (options.stripIgnoreTag) {
    if (options.onIgnoreTag) {
      console.error(
        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
      );
    }
    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
  }
  if (options.whiteList || options.allowList) {
    options.whiteList = keysToLowerCase(options.whiteList || options.allowList);
  } else {
    options.whiteList = DEFAULT.whiteList;
  }
  this.attributeWrapSign = options.singleQuotedAttributeValue === true ? "'" : DEFAULT.attributeWrapSign;
  options.onTag = options.onTag || DEFAULT.onTag;
  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
  this.options = options;
  if (options.css === false) {
    this.cssFilter = false;
  } else {
    options.css = options.css || {};
    this.cssFilter = new FilterCSS(options.css);
  }
}
FilterXSS.prototype.process = function(html) {
  html = html || "";
  html = html.toString();
  if (!html) return "";
  var me = this;
  var options = me.options;
  var whiteList = options.whiteList;
  var onTag2 = options.onTag;
  var onIgnoreTag2 = options.onIgnoreTag;
  var onTagAttr2 = options.onTagAttr;
  var onIgnoreTagAttr2 = options.onIgnoreTagAttr;
  var safeAttrValue2 = options.safeAttrValue;
  var escapeHtml2 = options.escapeHtml;
  var attributeWrapSign = me.attributeWrapSign;
  var cssFilter = me.cssFilter;
  if (options.stripBlankChar) {
    html = DEFAULT.stripBlankChar(html);
  }
  if (!options.allowCommentTag) {
    html = DEFAULT.stripCommentTag(html);
  }
  var stripIgnoreTagBody = false;
  if (options.stripIgnoreTagBody) {
    stripIgnoreTagBody = DEFAULT.StripTagBody(
      options.stripIgnoreTagBody,
      onIgnoreTag2
    );
    onIgnoreTag2 = stripIgnoreTagBody.onIgnoreTag;
  }
  var retHtml = parseTag(
    html,
    function(sourcePosition, position, tag, html2, isClosing2) {
      var info = {
        sourcePosition,
        position,
        isClosing: isClosing2,
        isWhite: Object.prototype.hasOwnProperty.call(whiteList, tag)
      };
      var ret = onTag2(tag, html2, info);
      if (!isNull(ret)) return ret;
      if (info.isWhite) {
        if (info.isClosing) {
          return "</" + tag + ">";
        }
        var attrs = getAttrs(html2);
        var whiteAttrList = whiteList[tag];
        var attrsHtml = parseAttr(attrs.html, function(name, value) {
          var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
          var ret2 = onTagAttr2(tag, name, value, isWhiteAttr);
          if (!isNull(ret2)) return ret2;
          if (isWhiteAttr) {
            value = safeAttrValue2(tag, name, value, cssFilter);
            if (value) {
              return name + "=" + attributeWrapSign + value + attributeWrapSign;
            } else {
              return name;
            }
          } else {
            ret2 = onIgnoreTagAttr2(tag, name, value, isWhiteAttr);
            if (!isNull(ret2)) return ret2;
            return;
          }
        });
        html2 = "<" + tag;
        if (attrsHtml) html2 += " " + attrsHtml;
        if (attrs.closing) html2 += " /";
        html2 += ">";
        return html2;
      } else {
        ret = onIgnoreTag2(tag, html2, info);
        if (!isNull(ret)) return ret;
        return escapeHtml2(html2);
      }
    },
    escapeHtml2
  );
  if (stripIgnoreTagBody) {
    retHtml = stripIgnoreTagBody.remove(retHtml);
  }
  return retHtml;
};
var xss$1 = FilterXSS;
(function(module, exports) {
  var DEFAULT2 = _default$1;
  var parser2 = parser$1;
  var FilterXSS2 = xss$1;
  function filterXSS(html, options) {
    var xss2 = new FilterXSS2(options);
    return xss2.process(html);
  }
  exports = module.exports = filterXSS;
  exports.filterXSS = filterXSS;
  exports.FilterXSS = FilterXSS2;
  (function() {
    for (var i in DEFAULT2) {
      exports[i] = DEFAULT2[i];
    }
    for (var j in parser2) {
      exports[j] = parser2[j];
    }
  })();
  if (typeof window !== "undefined") {
    window.filterXSS = module.exports;
  }
  function isWorkerEnv() {
    return typeof self !== "undefined" && typeof DedicatedWorkerGlobalScope !== "undefined" && self instanceof DedicatedWorkerGlobalScope;
  }
  if (isWorkerEnv()) {
    self.filterXSS = module.exports;
  }
})(lib$1, lib$1.exports);
var libExports = lib$1.exports;
const index = /* @__PURE__ */ getDefaultExportFromCjs(libExports);
const xss = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index
}, [libExports]);
const MdWhiteList = {
  img: ["class"],
  // 支持任务列表
  input: ["class", "disabled", "type", "checked"],
  // 主要支持youtobe、腾讯视频、哔哩哔哩等内嵌视频代码
  iframe: [
    "class",
    "width",
    "height",
    "src",
    "title",
    "border",
    "frameborder",
    "framespacing",
    "allow",
    "allowfullscreen"
  ]
};
const XSSPlugin = (md, options) => {
  const { extendedWhiteList = {}, xss: xssOption = {} } = options;
  let xssIns;
  if (typeof xssOption === "function") {
    xssIns = new libExports.FilterXSS(xssOption(xss));
  } else {
    const whiteList = libExports.getDefaultWhiteList();
    const keys = [...Object.keys(extendedWhiteList), ...Object.keys(MdWhiteList)];
    keys.forEach((key) => {
      const xssWhiteItem = whiteList[key] || [];
      const innerWhiteItem = MdWhiteList[key] || [];
      const userDefWhiteItem = extendedWhiteList[key] || [];
      whiteList[key] = [
        .../* @__PURE__ */ new Set([...xssWhiteItem, ...innerWhiteItem, ...userDefWhiteItem])
      ];
    });
    xssIns = new libExports.FilterXSS({
      whiteList,
      // 自定义的优先级最高
      ...xssOption
    });
  }
  md.core.ruler.after("linkify", "xss", (state) => {
    for (let i = 0; i < state.tokens.length; i++) {
      const cur = state.tokens[i];
      switch (cur.type) {
        case "html_block": {
          cur.content = xssIns.process(cur.content);
          break;
        }
        case "inline": {
          const inlineTokens = cur.children || [];
          inlineTokens.forEach((it) => {
            if (it.type === "html_inline") {
              it.content = xssIns.process(it.content);
            }
          });
          break;
        }
      }
    }
  });
};
const attrSet = (token, name, value) => {
  const index2 = token.attrIndex(name);
  const attr = [name, value];
  if (index2 < 0) {
    token.attrPush(attr);
  } else {
    token.attrs = token.attrs || [];
    token.attrs[index2] = attr;
  }
};
const isInline = (token) => {
  return token.type === "inline";
};
const isParagraph = (token) => {
  return token.type === "paragraph_open";
};
const isListItem = (token) => {
  return token.type === "list_item_open";
};
const startsWithTodoMarkdown = (token) => {
  return token.content.indexOf("[ ] ") === 0 || token.content.indexOf("[x] ") === 0 || token.content.indexOf("[X] ") === 0;
};
const isTodoItem = (tokens, index2) => {
  return isInline(tokens[index2]) && isParagraph(tokens[index2 - 1]) && isListItem(tokens[index2 - 2]) && startsWithTodoMarkdown(tokens[index2]);
};
const parentToken = (tokens, index2) => {
  const targetLevel = tokens[index2].level - 1;
  for (let i = index2 - 1; i >= 0; i--) {
    if (tokens[i].level === targetLevel) {
      return i;
    }
  }
  return -1;
};
const beginLabel = (TokenConstructor) => {
  const token = new TokenConstructor("html_inline", "", 0);
  token.content = "<label>";
  return token;
};
const endLabel = (TokenConstructor) => {
  const token = new TokenConstructor("html_inline", "", 0);
  token.content = "</label>";
  return token;
};
const afterLabel = (content, id, TokenConstructor) => {
  const token = new TokenConstructor("html_inline", "", 0);
  token.content = '<label class="task-list-item-label" for="' + id + '">' + content + "</label>";
  token.attrs = [{ for: id }];
  return token;
};
const makeCheckbox = (token, TokenConstructor, options) => {
  const checkbox = new TokenConstructor("html_inline", "", 0);
  const disabledAttr = !options.enabled ? ' disabled="" ' : " ";
  if (token.content.indexOf("[ ] ") === 0) {
    checkbox.content = '<input class="task-list-item-checkbox"' + disabledAttr + 'type="checkbox">';
  } else if (token.content.indexOf("[x] ") === 0 || token.content.indexOf("[X] ") === 0) {
    checkbox.content = '<input class="task-list-item-checkbox" checked=""' + disabledAttr + 'type="checkbox">';
  }
  return checkbox;
};
const todoify = (token, TokenConstructor, options) => {
  token.children = token.children || [];
  token.children.unshift(makeCheckbox(token, TokenConstructor, options));
  token.children[1].content = token.children[1].content.slice(3);
  token.content = token.content.slice(3);
  if (options.label) {
    if (options.labelAfter) {
      token.children.pop();
      const id = "task-item-" + Math.ceil(Math.random() * (1e4 * 1e3) - 1e3);
      token.children[0].content = token.children[0].content.slice(0, -1) + ' id="' + id + '">';
      token.children.push(afterLabel(token.content, id, TokenConstructor));
    } else {
      token.children.unshift(beginLabel(TokenConstructor));
      token.children.push(endLabel(TokenConstructor));
    }
  }
};
const githubTaskLists = (md, options = {}) => {
  md.core.ruler.after("inline", "github-task-lists", (state) => {
    const tokens = state.tokens;
    for (let i = 2; i < tokens.length; i++) {
      if (isTodoItem(tokens, i)) {
        todoify(tokens[i], state.Token, options);
        attrSet(
          tokens[i - 2],
          "class",
          "task-list-item" + (options.enabled ? " enabled" : " ")
        );
        attrSet(tokens[parentToken(tokens, i - 2)], "class", "contains-task-list");
      }
    }
  });
};
const initLineNumber = (md) => {
  md.core.ruler.push("init-line-number", (state) => {
    state.tokens.forEach((token) => {
      if (token.map) {
        if (!token.attrs) {
          token.attrs = [];
        }
        token.attrs.push(["data-line", token.map[0].toString()]);
      }
    });
    return true;
  });
};
const useMarkdownIt = (props, previewOnly) => {
  const { editorConfig, markdownItConfig, markdownItPlugins } = configOption;
  const editorId = inject("editorId");
  const languageRef = inject("language");
  const usedLanguageTextRef = inject(
    "usedLanguageText"
  );
  const showCodeRowNumber = inject("showCodeRowNumber");
  const themeRef = inject("theme");
  const customIconRef = inject("customIcon");
  const rootRef = inject("rootRef");
  const headsRef = ref([]);
  const hljsRef = useHighlight(props);
  const katexRef = useKatex(props);
  const { reRenderRef, replaceMermaid } = useMermaid(props);
  const md = mdit({
    html: true,
    breaks: true,
    linkify: true
  });
  markdownItConfig(md, {
    editorId
  });
  const plugins = [
    {
      type: "image",
      plugin: ImageFiguresPlugin,
      options: { figcaption: true, classes: "md-zoom" }
    },
    {
      type: "admonition",
      plugin: AdmonitionPlugin,
      options: {}
    },
    {
      type: "taskList",
      plugin: githubTaskLists,
      options: {}
    },
    {
      type: "heading",
      plugin: HeadingPlugin,
      options: { mdHeadingId: props.mdHeadingId, headsRef }
    },
    {
      type: "code",
      plugin: codetabs,
      options: {
        editorId,
        usedLanguageTextRef,
        // showCodeRowNumber,
        codeFoldable: props.codeFoldable,
        autoFoldThreshold: props.autoFoldThreshold,
        customIconRef
      }
    },
    {
      type: "xss",
      plugin: XSSPlugin,
      options: {}
    },
    {
      type: "sub",
      plugin: SubPlugin,
      options: {}
    },
    {
      type: "sup",
      plugin: SupPlugin,
      options: {}
    }
  ];
  if (!props.noKatex) {
    plugins.push({
      type: "katex",
      plugin: KatexPlugin,
      options: { katexRef }
    });
  }
  if (!props.noMermaid) {
    plugins.push({
      type: "mermaid",
      plugin: MermaidPlugin,
      options: { themeRef }
    });
  }
  markdownItPlugins(plugins, {
    editorId
  }).forEach((item) => {
    md.use(item.plugin, item.options);
  });
  const userDefHighlight = md.options.highlight;
  md.set({
    highlight: (str, language, attrs) => {
      if (userDefHighlight) {
        const result = userDefHighlight(str, language, attrs);
        if (result) {
          return result;
        }
      }
      let codeHtml;
      if (!props.noHighlight && hljsRef.value) {
        const hljsLang = hljsRef.value.getLanguage(language);
        if (hljsLang) {
          codeHtml = hljsRef.value.highlight(str, {
            language,
            ignoreIllegals: true
          }).value;
        } else {
          codeHtml = hljsRef.value.highlightAuto(str).value;
        }
      } else {
        codeHtml = md.utils.escapeHtml(str);
      }
      const codeSpan = showCodeRowNumber ? generateCodeRowNumber(
        codeHtml.replace(/^\n+|\n+$/g, ""),
        str.replace(/^\n+|\n+$/g, "")
      ) : `<span class="${prefix}-code-block">${codeHtml.replace(/^\n+|\n+$/g, "")}</span>`;
      return `<pre><code class="language-${language}" language=${language}>${codeSpan}</code></pre>`;
    }
  });
  initLineNumber(md);
  const key = ref(`_article-key_${randomId()}`);
  const html = ref(props.sanitize(md.render(props.modelValue)));
  const updatedTodo = () => {
    bus.emit(editorId, BUILD_FINISHED, html.value);
    props.onHtmlChanged(html.value);
    props.onGetCatalog(headsRef.value);
    bus.emit(editorId, CATALOG_CHANGED, headsRef.value);
    nextTick(() => {
      replaceMermaid().then(() => {
        zoomMermaid(rootRef.value.querySelectorAll(`#${editorId} .${prefix}-mermaid`));
      });
    });
  };
  onMounted(updatedTodo);
  const markHtml = () => {
    headsRef.value = [];
    html.value = props.sanitize(md.render(props.modelValue));
    updatedTodo();
  };
  const needReRender = computed(() => {
    return (props.noKatex || katexRef.value) && (props.noHighlight || hljsRef.value);
  });
  watch(
    [toRef(props, "modelValue"), needReRender, reRenderRef, languageRef],
    debounce(markHtml, previewOnly ? 0 : editorConfig.renderDelay)
  );
  watch(
    () => props.setting.preview,
    () => {
      if (props.setting.preview) {
        nextTick(() => {
          replaceMermaid().then(() => {
            zoomMermaid(
              rootRef.value.querySelectorAll(`#${editorId} .${prefix}-mermaid`)
            );
          });
          bus.emit(editorId, CATALOG_CHANGED, headsRef.value);
        });
      }
    }
  );
  onMounted(() => {
    bus.on(editorId, {
      name: PUSH_CATALOG,
      callback() {
        bus.emit(editorId, CATALOG_CHANGED, headsRef.value);
      }
    });
    bus.on(editorId, {
      name: RERENDER,
      callback: () => {
        key.value = `_article-key_${randomId()}`;
        markHtml();
      }
    });
  });
  return { html, key };
};
const template = {
  checked: {
    regexp: /- \[x\]/,
    value: "- [ ]"
  },
  unChecked: {
    regexp: /- \[\s\]/,
    value: "- [x]"
  }
};
const useTaskState = (props, html) => {
  const editorId = inject("editorId");
  const rootRef = inject("rootRef");
  let removeListener = () => {
  };
  const addListener = () => {
    if (!rootRef.value) {
      return false;
    }
    const tasks = rootRef.value.querySelectorAll(".task-list-item.enabled");
    const listener = (e) => {
      var _a;
      e.preventDefault();
      const nextValue = e.target.checked ? "unChecked" : "checked";
      const line = (_a = e.target.parentElement) == null ? void 0 : _a.dataset.line;
      if (!line) {
        return;
      }
      const lineNumber = Number(line);
      const lines = props.modelValue.split("\n");
      const targetValue = lines[Number(lineNumber)].replace(
        template[nextValue].regexp,
        template[nextValue].value
      );
      if (props.previewOnly) {
        lines[Number(lineNumber)] = targetValue;
        props.onChange(lines.join("\n"));
      } else {
        bus.emit(editorId, TASK_STATE_CHANGED, lineNumber + 1, targetValue);
      }
    };
    tasks.forEach((item) => {
      item.addEventListener("click", listener);
    });
    removeListener = () => {
      tasks.forEach((item) => {
        item.removeEventListener("click", listener);
      });
    };
  };
  onBeforeUnmount(() => {
    removeListener();
  });
  watch(
    [html],
    () => {
      removeListener();
      nextTick(addListener);
    },
    {
      immediate: true
    }
  );
};
const contentPreviewProps = {
  modelValue: {
    type: String,
    default: ""
  },
  onChange: {
    type: Function,
    default: () => {
    }
  },
  setting: {
    type: Object,
    default: () => ({ preview: true })
  },
  onHtmlChanged: {
    type: Function,
    default: () => {
    }
  },
  onGetCatalog: {
    type: Function,
    default: () => {
    }
  },
  mdHeadingId: {
    type: Function,
    default: () => ""
  },
  noMermaid: {
    type: Boolean,
    default: false
  },
  sanitize: {
    type: Function,
    default: (html) => html
  },
  // 不使用该函数功能
  noKatex: {
    type: Boolean,
    default: false
  },
  formatCopiedText: {
    type: Function,
    default: (text) => text
  },
  noHighlight: {
    type: Boolean,
    default: false
  },
  previewOnly: {
    type: Boolean,
    default: false
  },
  noImgZoomIn: {
    type: Boolean
  },
  sanitizeMermaid: {
    type: Function
  },
  codeFoldable: {
    type: Boolean
  },
  autoFoldThreshold: {
    type: Number
  }
};
const contentProps = {
  ...contentPreviewProps,
  updateModelValue: {
    type: Function,
    default: () => {
    }
  },
  placeholder: {
    type: String,
    default: ""
  },
  scrollAuto: {
    type: Boolean
  },
  autofocus: {
    type: Boolean
  },
  disabled: {
    type: Boolean
  },
  readonly: {
    type: Boolean
  },
  maxlength: {
    type: Number
  },
  autoDetectCode: {
    type: Boolean
  },
  /**
   * 输入框失去焦点时触发事件
   */
  onBlur: {
    type: Function,
    default: () => {
    }
  },
  /**
   * 输入框获得焦点时触发事件
   */
  onFocus: {
    type: Function,
    default: () => {
    }
  },
  noPrettier: {
    type: Boolean
  },
  completions: {
    type: Array
  },
  catalogVisible: {
    type: Boolean
  },
  theme: {
    type: String,
    default: "light"
  },
  onInput: {
    type: Function
  },
  onDrop: {
    type: Function,
    default: () => {
    }
  },
  inputBoxWitdh: {
    type: String
  },
  onInputBoxWitdhChange: {
    type: Function
  },
  transformImgUrl: {
    type: Function,
    default: (t) => t
  }
};
const ContentPreview = /* @__PURE__ */ defineComponent({
  name: "ContentPreview",
  props: contentPreviewProps,
  setup(props) {
    const editorId = inject("editorId");
    const previewTheme = inject("previewTheme");
    const showCodeRowNumber = inject("showCodeRowNumber");
    const {
      html,
      key
    } = useMarkdownIt(props, props.previewOnly);
    useCopyCode(props, html, key);
    userZoom(props, html);
    useTaskState(props, html);
    return () => {
      return createVNode(Fragment, null, [props.setting.preview && createVNode("div", {
        "id": `${editorId}-preview-wrapper`,
        "class": `${prefix}-preview-wrapper`,
        "key": "content-preview-wrapper"
      }, [createVNode("div", {
        "key": key.value,
        "id": `${editorId}-preview`,
        "class": [`${prefix}-preview`, `${previewTheme == null ? void 0 : previewTheme.value}-theme`, showCodeRowNumber && `${prefix}-scrn`],
        "innerHTML": html.value
      }, null)]), !props.previewOnly && props.setting.htmlPreview && createVNode("div", {
        "id": `${editorId}-html-wrapper`,
        "class": `${prefix}-preview-wrapper`,
        "key": "html-preview-wrapper"
      }, [createVNode("div", {
        "class": `${prefix}-html`
      }, [html.value])])]);
    };
  }
});
const useOnSave = (props, context) => {
  const { editorId } = props;
  const state = reactive({
    // 是否已编译成html
    buildFinished: false,
    // 存储当前最新的html
    html: ""
  });
  watch(
    () => props.modelValue,
    () => {
      state.buildFinished = false;
    }
  );
  onMounted(() => {
    bus.on(editorId, {
      name: BUILD_FINISHED,
      callback(html) {
        state.buildFinished = true;
        state.html = html;
      }
    });
    bus.on(editorId, {
      name: ON_SAVE,
      callback() {
        const htmlPromise = new Promise((rev) => {
          if (state.buildFinished) {
            rev(state.html);
          } else {
            const buildFinishedCallback = (html) => {
              rev(html);
              bus.remove(editorId, BUILD_FINISHED, buildFinishedCallback);
            };
            bus.on(editorId, {
              name: BUILD_FINISHED,
              callback: buildFinishedCallback
            });
          }
        });
        if (props.onSave) {
          props.onSave(props.modelValue, htmlPromise);
        } else {
          context.emit("onSave", props.modelValue, htmlPromise);
        }
      }
    });
  });
};
const useProvidePreview = (props, rootRef) => {
  const { editorId } = props;
  const hljsUrls = configOption.editorExtensions.highlight;
  const hljsAttrs = configOption.editorExtensionsAttrs.highlight;
  provide("editorId", editorId);
  provide("rootRef", rootRef);
  provide(
    "theme",
    computed(() => props.theme)
  );
  provide(
    "language",
    computed(() => props.language)
  );
  provide(
    "highlight",
    computed(() => {
      const { js: jsUrl } = hljsUrls;
      const cssList = {
        ...codeCss,
        ...hljsUrls.css
      };
      const { js: jsAttrs, css: cssAttrs = {} } = hljsAttrs || {};
      const _theme = props.codeStyleReverse && props.codeStyleReverseList.includes(props.previewTheme) ? "dark" : props.theme;
      const codeCssHref = cssList[props.codeTheme] ? cssList[props.codeTheme][_theme] : codeCss.atom[_theme];
      const codeCssAttrs = cssList[props.codeTheme] && cssAttrs[props.codeTheme] ? cssAttrs[props.codeTheme][_theme] : cssAttrs["atom"] ? cssAttrs["atom"][_theme] : {};
      return {
        js: {
          src: jsUrl,
          ...jsAttrs
        },
        css: {
          href: codeCssHref,
          ...codeCssAttrs
        }
      };
    })
  );
  provide("showCodeRowNumber", props.showCodeRowNumber);
  const usedLanguageText = computed(() => {
    const allText = {
      ...staticTextDefault,
      ...configOption.editorConfig.languageUserDefined
    };
    return deepMerge(
      deepClone(staticTextDefault["en-US"]),
      allText[props.language] || {}
    );
  });
  provide("usedLanguageText", usedLanguageText);
  provide(
    "previewTheme",
    computed(() => props.previewTheme)
  );
  provide(
    "customIcon",
    computed(() => props.customIcon)
  );
};
const useProvide = (props, rootRef) => {
  useProvidePreview(props, rootRef);
  provide("tabWidth", props.tabWidth);
};
const useExpansionPreview = (props) => {
  onMounted(() => {
    const { editorExtensions, editorExtensionsAttrs, iconfontType } = configOption;
    if (props.noIconfont) {
      return;
    }
    if (iconfontType === "svg") {
      appendHandler("script", {
        ...editorExtensionsAttrs.iconfont,
        src: editorExtensions.iconfont,
        id: `${prefix}-icon`
      });
    } else {
      appendHandler("link", {
        ...editorExtensionsAttrs.iconfontClass,
        rel: "stylesheet",
        href: editorExtensions.iconfontClass,
        id: `${prefix}-icon-class`
      });
    }
  });
};
const useExpansion = (props) => {
  const { noPrettier, noUploadImg } = props;
  const { editorExtensions, editorExtensionsAttrs } = configOption;
  const noPrettierScript = noPrettier || editorExtensions.prettier.prettierInstance;
  const noParserMarkdownScript = noPrettier || editorExtensions.prettier.parserMarkdownInstance;
  const noCropperScript = noUploadImg || editorExtensions.cropper.instance;
  onMounted(() => {
    if (!noCropperScript) {
      const { js = {}, css: css2 = {} } = editorExtensionsAttrs.cropper || {};
      appendHandler("link", {
        ...css2,
        rel: "stylesheet",
        href: editorExtensions.cropper.css,
        id: `${prefix}-cropperCss`
      });
      appendHandler("script", {
        ...js,
        src: editorExtensions.cropper.js,
        id: `${prefix}-cropper`
      });
    }
    if (!noPrettierScript) {
      const { standaloneJs = {} } = editorExtensionsAttrs.prettier || {};
      appendHandler("script", {
        ...standaloneJs,
        src: editorExtensions.prettier.standaloneJs,
        id: `${prefix}-prettier`
      });
    }
    if (!noParserMarkdownScript) {
      const { parserMarkdownJs = {} } = editorExtensionsAttrs.prettier || {};
      appendHandler("script", {
        ...parserMarkdownJs,
        src: editorExtensions.prettier.parserMarkdownJs,
        id: `${prefix}-prettierMD`
      });
    }
  });
  useExpansionPreview(props);
};
const useErrorCatcher = (props, context) => {
  const { editorId } = props;
  onMounted(() => {
    bus.on(editorId, {
      name: ERROR_CATCHER,
      callback: (err) => {
        if (props.onError instanceof Function) {
          props.onError(err);
        } else {
          context.emit("onError", err);
        }
      }
    });
  });
};
const useConfig = (props, context) => {
  const { editorId } = props;
  const setting = reactive({
    pageFullscreen: props.pageFullscreen,
    fullscreen: false,
    preview: props.preview,
    htmlPreview: props.preview ? false : props.htmlPreview,
    previewOnly: false
  });
  const cacheSetting = reactive({ ...setting });
  const updateSetting = (k, v) => {
    const realValue = v === void 0 ? !setting[k] : v;
    switch (k) {
      case "preview": {
        setting.htmlPreview = false;
        setting.previewOnly = false;
        break;
      }
      case "htmlPreview": {
        setting.preview = false;
        setting.previewOnly = false;
        break;
      }
      case "previewOnly": {
        if (realValue) {
          if (!setting.preview && !setting.htmlPreview) {
            setting.preview = true;
          }
        } else {
          if (!cacheSetting.preview) {
            setting.preview = false;
          }
          if (!cacheSetting.htmlPreview) {
            setting.htmlPreview = false;
          }
        }
        break;
      }
    }
    cacheSetting[k] = realValue;
    setting[k] = realValue;
  };
  let bodyOverflowHistory = "";
  const adjustBody = () => {
    if (setting.pageFullscreen || setting.fullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = bodyOverflowHistory;
    }
  };
  watch(() => [setting.pageFullscreen, setting.fullscreen], adjustBody);
  onMounted(() => {
    bus.on(editorId, {
      name: UPLOAD_IMAGE,
      callback(files, cb) {
        const insertHanlder = (urls) => {
          bus.emit(editorId, REPLACE, "image", {
            desc: "",
            urls
          });
          cb && cb();
        };
        if (props.onUploadImg) {
          props.onUploadImg(files, insertHanlder);
        } else {
          context.emit("onUploadImg", files, insertHanlder);
        }
      }
    });
    bodyOverflowHistory = document.body.style.overflow;
    adjustBody();
  });
  return [setting, updateSetting];
};
const useCatalog = (props) => {
  const { editorId } = props;
  const catalogShow = ref(false);
  onMounted(() => {
    bus.on(editorId, {
      name: CHANGE_CATALOG_VISIBLE,
      callback: (v) => {
        if (v === void 0) {
          catalogShow.value = !catalogShow.value;
        } else {
          catalogShow.value = v;
        }
      }
    });
  });
  const catalogVisible = computed(() => {
    return !props.toolbarsExclude.includes("catalog") && props.toolbars.includes("catalog") && catalogShow.value;
  });
  return catalogVisible;
};
const useExpose$1 = (props, ctx, catalogVisible, setting, updateSetting, codeRef) => {
  const { editorId } = props;
  watch(
    () => setting.pageFullscreen,
    (newVal) => {
      bus.emit(editorId, PAGE_FULL_SCREEN_CHANGED, newVal);
    }
  );
  watch(
    () => setting.fullscreen,
    (newVal) => {
      bus.emit(editorId, FULL_SCREEN_CHANGED, newVal);
    }
  );
  watch(
    () => setting.preview,
    (newVal) => {
      bus.emit(editorId, PREVIEW_CHANGED, newVal);
    }
  );
  watch(
    () => setting.previewOnly,
    (newVal) => {
      bus.emit(editorId, PREVIEW_ONLY_CHANGED, newVal);
    }
  );
  watch(
    () => setting.htmlPreview,
    (newVal) => {
      bus.emit(editorId, HTML_PREVIEW_CHANGED, newVal);
    }
  );
  watch(catalogVisible, (newVal) => {
    bus.emit(editorId, CATALOG_VISIBLE_CHANGED, newVal);
  });
  const exposeParam = {
    on(eventName, callBack) {
      switch (eventName) {
        case "pageFullscreen": {
          bus.on(editorId, {
            name: PAGE_FULL_SCREEN_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
        case "fullscreen": {
          bus.on(editorId, {
            name: FULL_SCREEN_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
        case "preview": {
          bus.on(editorId, {
            name: PREVIEW_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
        case "previewOnly": {
          bus.on(editorId, {
            name: PREVIEW_ONLY_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
        case "htmlPreview": {
          bus.on(editorId, {
            name: HTML_PREVIEW_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
        case "catalog": {
          bus.on(editorId, {
            name: CATALOG_VISIBLE_CHANGED,
            callback(status) {
              callBack(status);
            }
          });
          break;
        }
      }
    },
    togglePageFullscreen(status) {
      updateSetting("pageFullscreen", status);
    },
    toggleFullscreen(status) {
      bus.emit(editorId, CHANGE_FULL_SCREEN, status);
    },
    togglePreview(status) {
      updateSetting("preview", status);
    },
    togglePreviewOnly(status) {
      updateSetting("previewOnly", status);
    },
    toggleHtmlPreview(status) {
      updateSetting("htmlPreview", status);
    },
    toggleCatalog(status) {
      bus.emit(editorId, CHANGE_CATALOG_VISIBLE, status);
    },
    triggerSave() {
      bus.emit(editorId, ON_SAVE);
    },
    insert(generate) {
      bus.emit(editorId, REPLACE, "universal", { generate });
    },
    focus(options) {
      var _a;
      (_a = codeRef.value) == null ? void 0 : _a.focus(options);
    },
    rerender() {
      bus.emit(editorId, RERENDER);
    },
    getSelectedText() {
      var _a;
      return (_a = codeRef.value) == null ? void 0 : _a.getSelectedText();
    },
    resetHistory() {
      var _a;
      (_a = codeRef.value) == null ? void 0 : _a.resetHistory();
    },
    domEventHandlers(handlers) {
      bus.emit(editorId, EVENT_LISTENER, handlers);
    },
    execCommand(direct) {
      bus.emit(editorId, REPLACE, direct);
    },
    getEditorView() {
      var _a;
      return (_a = codeRef.value) == null ? void 0 : _a.getEditorView();
    }
  };
  ctx.expose(exposeParam);
};
const mdHeadingId = (text) => text;
const mdPreviewProps = {
  /**
   * markdown content.
   *
   * @default ''
   */
  modelValue: {
    type: String,
    default: ""
  },
  /**
   * input回调事件
   */
  onChange: {
    type: Function,
    default: void 0
  },
  /**
   * 主题，支持light和dark
   *
   * @default 'light'
   */
  theme: {
    type: String,
    default: "light"
  },
  /**
   * 外层类名
   *
   * @default ''
   */
  class: {
    type: String,
    default: ""
  },
  /**
   * 预设语言名称
   *
   * @default 'zh-CN'
   */
  language: {
    type: String,
    default: "zh-CN"
  },
  /**
   * html变化事件
   */
  onHtmlChanged: {
    type: Function,
    default: void 0
  },
  /**
   * 获取目录结构
   */
  onGetCatalog: {
    type: Function,
    default: void 0
  },
  /**
   * 编辑器唯一标识
   *
   * @default 'md-editor-v3'
   */
  editorId: {
    type: String,
    default: () => getNextId("md-editor-v3_")
  },
  /**
   * 预览中代码是否显示行号
   *
   * @default true
   */
  showCodeRowNumber: {
    type: Boolean,
    default: true
  },
  /**
   * 预览内容样式
   *
   * @default 'default'
   */
  previewTheme: {
    type: String,
    default: "default"
  },
  /**
   * 编辑器样式
   */
  style: {
    type: Object,
    default: () => ({})
  },
  /**
   * 标题的id生成方式
   *
   * @default (text: string) => text
   */
  mdHeadingId: {
    type: Function,
    default: mdHeadingId
  },
  /**
   *
   * 不能保证文本正确的情况，在marked编译md文本后通过该方法处理
   * 推荐DOMPurify、sanitize-html
   *
   * @default (text: string) => text
   */
  sanitize: {
    type: Function,
    default: (html) => html
  },
  /**
   * 不使用该mermaid
   *
   * @default false
   */
  noMermaid: {
    type: Boolean,
    default: false
  },
  /**
   * 不使用katex
   *
   * @default false
   */
  noKatex: {
    type: Boolean,
    default: false
  },
  /**
   * 代码主题
   *
   * @default 'atom'
   */
  codeTheme: {
    type: String,
    default: "atom"
  },
  /**
   * 不插入iconfont链接
   *
   * @default false
   */
  noIconfont: {
    type: Boolean,
    default: void 0
  },
  /**
   * 复制代码格式化方法
   *
   * @default (text) => text
   */
  formatCopiedText: {
    type: Function,
    default: (text) => text
  },
  /**
   * 某些预览主题的代码模块背景是暗色系
   * 将这个属性设置为true，会自动在该主题下的light模式下使用暗色系的代码风格
   *
   * @default true
   */
  codeStyleReverse: {
    type: Boolean,
    default: true
  },
  /**
   * 需要自动调整的预览主题
   *
   * @default ['default', 'mk-cute']
   */
  codeStyleReverseList: {
    type: Array,
    default: ["default", "mk-cute"]
  },
  noHighlight: {
    type: Boolean,
    default: false
  },
  /**
   * 是否关闭编辑器默认的放大缩小功能
   */
  noImgZoomIn: {
    type: Boolean,
    default: false
  },
  /**
   * 自定义的图标
   */
  customIcon: {
    type: Object,
    default: {}
  },
  sanitizeMermaid: {
    type: Function,
    default: (h) => Promise.resolve(h)
  },
  /**
   * 是否开启折叠代码功能
   * 不开启会使用div标签替代details标签
   *
   * @default true
   */
  codeFoldable: {
    type: Boolean,
    default: true
  },
  /**
   * 触发自动折叠代码的行数阈值
   *
   * @default 30
   */
  autoFoldThreshold: {
    type: Number,
    default: 30
  }
};
const editorProps = {
  ...mdPreviewProps,
  /**
   * input回调事件
   */
  onSave: {
    type: Function,
    default: void 0
  },
  /**
   * 上传图片事件
   */
  onUploadImg: {
    type: Function,
    default: void 0
  },
  /**
   * 是否页面内全屏
   *
   * @default false
   */
  pageFullscreen: {
    type: Boolean,
    default: false
  },
  /**
   * 是否展开预览
   *
   * @default true
   */
  preview: {
    type: Boolean,
    default: true
  },
  /**
   * 是否展开html预览
   *
   * @default false
   */
  htmlPreview: {
    type: Boolean,
    default: false
  },
  /**
   * 仅预览模式，不显示toolbar和编辑框
   *
   * @4.0.0开始移除该设置，使用组件MdPreview替换
   *
   * @default false
   */
  // previewOnly: {
  //   type: Boolean as PropType<boolean>,
  //   default: false
  // },
  /**
   * 工具栏选择显示
   *
   * @default allToolbar
   */
  toolbars: {
    type: Array,
    default: allToolbar
  },
  /**
   * 工具栏选择不显示
   *
   * @default []
   */
  toolbarsExclude: {
    type: Array,
    default: []
  },
  /**
   * 格式化md
   *
   * @default true
   */
  noPrettier: {
    type: Boolean,
    default: false
  },
  /**
   * 一个tab等于空格数
   *
   * @default 2
   */
  tabWidth: {
    type: Number,
    default: 2
  },
  /**
   * 表格预设格子数
   *
   * 也可以是[6, 4, 10, 8]
   *
   * @default [6, 4]
   */
  tableShape: {
    type: Array,
    default: [6, 4]
  },
  /**
   * 空提示
   *
   * @default ''
   */
  placeholder: {
    type: String,
    default: ""
  },
  /**
   * 自定义的工具栏列表
   */
  defToolbars: {
    type: [String, Object],
    default: void 0
  },
  /**
   * 内部错误捕获
   */
  onError: {
    type: Function,
    default: void 0
  },
  /**
   * 页脚列表显示顺序
   */
  footers: {
    type: Array,
    default: allFooter
  },
  /**
   * 是否默认激活输入框和预览框同步滚动
   *
   * @default true
   */
  scrollAuto: {
    type: Boolean,
    default: true
  },
  /**
   * 自定义的也叫工具组件列表
   */
  defFooters: {
    type: [String, Object],
    default: void 0
  },
  /**
   * 是否禁用上传图片
   *
   * @default false
   */
  noUploadImg: {
    type: Boolean,
    default: false
  },
  /**
   * 文本区域自动获得焦点
   *
   * @default false
   */
  autoFocus: {
    type: Boolean,
    default: false
  },
  /**
   * 禁用文本区域
   *
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 文本区域为只读
   *
   * @default false
   */
  readOnly: {
    type: Boolean,
    default: false
  },
  /**
   * 文本区域允许的最大字符数
   */
  maxLength: {
    type: Number,
    default: void 0
  },
  /**
   * 是否启用自动识别粘贴代码类别
   * 目前支持 vscode 复制的代码识别
   *
   * @default false
   */
  autoDetectCode: {
    type: Boolean,
    default: false
  },
  /**
   * 输入框失去焦点时触发事件
   */
  onBlur: {
    type: Function,
    default: void 0
  },
  /**
   * 输入框获得焦点时触发事件
   */
  onFocus: {
    type: Function,
    default: void 0
  },
  /**
   * @codemirror/autocomplete匹配关键词的方法列表
   *
   * 它会被像下面这样嵌入编辑器
   *
   * import { autocompletion } from '@codemirror/autocomplete';
   * autocompletion({
   *   override: [...completions]
   * })
   */
  completions: {
    type: Array,
    default: void 0
  },
  /**
   * 是否在工具栏下面显示对应的文字名称
   *
   * @default false
   */
  showToolbarName: {
    type: Boolean,
    default: false
  },
  /**
   * 字符输入事件
   */
  onInput: {
    type: Function,
    default: void 0
  },
  onDrop: {
    type: Function,
    default: void 0
  },
  /**
   * 输入框的默认宽度
   *
   * @example '100px'/'50%'
   * @default '50%
   */
  inputBoxWitdh: {
    type: String,
    default: "50%"
  },
  /**
   * 输入框宽度变化事件
   */
  onInputBoxWitdhChange: {
    type: Function,
    default: void 0
  },
  /**
   * 替换粘贴的图片链接
   *
   * @param t 图片链接
   * @returns
   */
  transformImgUrl: {
    type: Function,
    default: (t) => t
  }
};
const mdPreviewEmits = [
  "onHtmlChanged",
  "onGetCatalog",
  "onChange",
  "update:modelValue"
];
const editorEmits = [
  ...mdPreviewEmits,
  "onSave",
  "onUploadImg",
  "onError",
  "onBlur",
  "onFocus",
  "onInput",
  "onDrop",
  "onInputBoxWitdhChange"
];
const useExpose = (props, ctx) => {
  const { editorId } = props;
  const exposeParam = {
    rerender() {
      bus.emit(editorId, RERENDER);
    }
  };
  ctx.expose(exposeParam);
};
const MdPreview = /* @__PURE__ */ defineComponent({
  name: "MdPreview",
  props: mdPreviewProps,
  emits: mdPreviewEmits,
  setup(props, ctx) {
    const {
      editorId,
      noKatex,
      noMermaid,
      noHighlight
    } = props;
    const rootRef = ref();
    useProvidePreview(props, rootRef);
    useExpansionPreview(props);
    useExpose(props, ctx);
    onBeforeUnmount(() => {
      bus.clear(editorId);
    });
    return () => {
      return createVNode("div", {
        "id": editorId,
        "class": [prefix, props.class, props.theme === "dark" && `${prefix}-dark`, `${prefix}-previewOnly`],
        "style": props.style,
        "ref": rootRef
      }, [createVNode(ContentPreview, {
        "modelValue": props.modelValue,
        "onChange": (value) => {
          if (props.onChange) {
            props.onChange(value);
          }
          ctx.emit("onChange", value);
          ctx.emit("update:modelValue", value);
        },
        "onHtmlChanged": (html) => {
          if (props.onHtmlChanged) {
            props.onHtmlChanged(html);
          } else {
            ctx.emit("onHtmlChanged", html);
          }
        },
        "onGetCatalog": (list) => {
          if (props.onGetCatalog) {
            props.onGetCatalog(list);
          } else {
            ctx.emit("onGetCatalog", list);
          }
        },
        "mdHeadingId": props.mdHeadingId,
        "noMermaid": noMermaid,
        "sanitize": props.sanitize,
        "noKatex": noKatex,
        "formatCopiedText": props.formatCopiedText,
        "noHighlight": noHighlight,
        "noImgZoomIn": props.noImgZoomIn,
        "previewOnly": true,
        "sanitizeMermaid": props.sanitizeMermaid,
        "codeFoldable": props.codeFoldable,
        "autoFoldThreshold": props.autoFoldThreshold
      }, null)]);
    };
  }
});
MdPreview.install = (app) => {
  app.component(MdPreview.name, MdPreview);
  return app;
};
export {
  ContentPreview as C,
  MdPreview as M,
  StrIcon$1 as S,
  editorEmits as a,
  useProvide as b,
  contentProps as c,
  useExpansion as d,
  editorProps as e,
  useErrorCatcher as f,
  useConfig as g,
  useCatalog as h,
  useExpose$1 as i,
  useOnSave as u
};
