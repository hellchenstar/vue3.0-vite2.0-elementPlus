const keyMove = (trigger, moveHandler) => {
  const triggerMouseDown = (mdown) => {
    const parent = trigger.parentElement || document.body;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    const { clientWidth, clientHeight } = document.documentElement;
    const x = mdown.offsetX;
    const y = mdown.offsetY;
    const mouseMoveHandler = (e) => {
      let tx = e.x + document.body.scrollLeft - document.body.clientLeft - x;
      let ty = e.y + document.body.scrollTop - document.body.clientTop - y;
      tx = tx < 1 ? 1 : tx < clientWidth - width - 1 ? tx : clientWidth - width - 1;
      ty = ty < 1 ? 1 : ty < clientHeight - height - 1 ? ty : clientHeight - height - 1;
      if (moveHandler) {
        moveHandler(tx, ty);
      } else {
        parent.style.left = `${tx}px`;
        parent.style.top = `${ty}px`;
      }
    };
    document.addEventListener("mousemove", mouseMoveHandler);
    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };
    document.addEventListener("mouseup", mouseUpHandler);
  };
  trigger.addEventListener("mousedown", triggerMouseDown);
  return () => {
    trigger.removeEventListener("mousedown", triggerMouseDown);
  };
};
const appendHandler = (tagName, attributes, checkKey = "") => {
  var _a;
  const insertedEle = document.getElementById(attributes.id);
  if (!insertedEle) {
    const attrsCopy = { ...attributes };
    attrsCopy.onload = null;
    const ele = createHTMLElement(tagName, attrsCopy);
    attributes.onload && ele.addEventListener("load", attributes.onload);
    document.head.appendChild(ele);
  } else if (checkKey !== "") {
    if (Reflect.get(window, checkKey)) {
      (_a = attributes.onload) == null ? void 0 : _a.call(insertedEle, new Event("load"));
    } else {
      attributes.onload && insertedEle.addEventListener("load", attributes.onload);
    }
  }
};
const updateHandler = (tagName, attributes) => {
  const insertedEle = document.getElementById(attributes.id);
  insertedEle == null ? void 0 : insertedEle.remove();
  appendHandler(tagName, attributes);
};
const createHTMLElement = (tagName, attributes) => {
  const element = document.createElement(tagName);
  Object.keys(attributes).forEach((key) => {
    if (attributes[key] !== void 0) {
      element[key] = attributes[key];
    }
  });
  return element;
};
const zoomMermaid = /* @__PURE__ */ (() => {
  const addEvent = (container) => {
    if (!container) {
      return;
    }
    const content = container.firstChild;
    let scale = 1;
    let posX = 0;
    let posY = 0;
    let isDragging = false;
    let startX, startY;
    let initialDistance;
    let initialScale = 1;
    const updateTransform = () => {
      content.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    };
    container.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length === 1) {
          isDragging = true;
          startX = event.touches[0].clientX - posX;
          startY = event.touches[0].clientY - posY;
        } else if (event.touches.length === 2) {
          initialDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
          );
          initialScale = scale;
        }
      },
      { passive: false }
    );
    container.addEventListener(
      "touchmove",
      (event) => {
        event.preventDefault();
        if (isDragging && event.touches.length === 1) {
          posX = event.touches[0].clientX - startX;
          posY = event.touches[0].clientY - startY;
          updateTransform();
        } else if (event.touches.length === 2) {
          const newDistance = Math.hypot(
            event.touches[0].clientX - event.touches[1].clientX,
            event.touches[0].clientY - event.touches[1].clientY
          );
          const scaleChange = newDistance / initialDistance;
          const previousScale = scale;
          scale = initialScale * (1 + (scaleChange - 1));
          const centerX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
          const centerY = (event.touches[0].clientY + event.touches[1].clientY) / 2;
          const rect = content.getBoundingClientRect();
          const relativeX = (centerX - rect.left) / previousScale;
          const relativeY = (centerY - rect.top) / previousScale;
          posX -= relativeX * (scale - previousScale);
          posY -= relativeY * (scale - previousScale);
          updateTransform();
        }
      },
      { passive: false }
    );
    container.addEventListener("touchend", () => {
      isDragging = false;
    });
    container.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        const scaleAmount = 0.02;
        const previousScale = scale;
        if (event.deltaY < 0) {
          scale += scaleAmount;
        } else {
          scale = Math.max(0.1, scale - scaleAmount);
        }
        const rect = content.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        posX -= mouseX / previousScale * (scale - previousScale);
        posY -= mouseY / previousScale * (scale - previousScale);
        updateTransform();
      },
      { passive: false }
    );
    container.addEventListener("mousedown", (event) => {
      isDragging = true;
      startX = event.clientX - posX;
      startY = event.clientY - posY;
    });
    container.addEventListener("mousemove", (event) => {
      if (isDragging) {
        posX = event.clientX - startX;
        posY = event.clientY - startY;
        updateTransform();
      }
    });
    container.addEventListener("mouseup", () => {
      isDragging = false;
    });
    container.addEventListener("mouseleave", () => {
      isDragging = false;
    });
  };
  const handler = (containers) => {
    containers.forEach((mm) => {
      addEvent(mm);
    });
  };
  return handler;
})();
export {
  appendHandler as a,
  keyMove as k,
  updateHandler as u,
  zoomMermaid as z
};
