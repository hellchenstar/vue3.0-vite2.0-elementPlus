"use strict";
const getSlot = ({
  instance,
  ctx,
  props = {}
}, name = "default") => {
  const targetSlot = (instance == null ? void 0 : instance.$slots[name]) || (ctx == null ? void 0 : ctx.slots[name]);
  return (targetSlot ? targetSlot(instance) : "") || props[name];
};
exports.getSlot = getSlot;
