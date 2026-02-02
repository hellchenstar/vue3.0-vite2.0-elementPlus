import { p as prefix } from "./config.mjs";
const base642File = (base64, fileName = "image.png") => {
  const arr = base64.split(",");
  const regResult = arr[0].match(/:(.*?);/);
  if (regResult) {
    const mime = regResult[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  }
  return null;
};
const generateCodeRowNumber = (code, source) => {
  if (!code) {
    return code;
  }
  const list = source.split("\n");
  const rowNumberList = ['<span rn-wrapper aria-hidden="true">'];
  list.forEach(() => {
    rowNumberList.push("<span></span>");
  });
  rowNumberList.push("</span>");
  return `<span class="${prefix}-code-block">${code}</span>${rowNumberList.join("")}`;
};
const getRelativeTop = (element, container) => {
  if (!element || !container) {
    return 0;
  }
  const eleRect = element == null ? void 0 : element.getBoundingClientRect();
  if (container === document.documentElement) {
    return eleRect.top - container.clientTop;
  }
  const conRect = container == null ? void 0 : container.getBoundingClientRect();
  return eleRect.top - conRect.top;
};
const getNextId = /* @__PURE__ */ (() => {
  let count = 0;
  return (prefix2) => {
    return prefix2 + ++count;
  };
})();
const getZIndexIncrement = /* @__PURE__ */ (() => {
  let startIndex = 0;
  return () => {
    return ++startIndex;
  };
})();
export {
  getNextId as a,
  base642File as b,
  getRelativeTop as c,
  getZIndexIncrement as d,
  generateCodeRowNumber as g
};
