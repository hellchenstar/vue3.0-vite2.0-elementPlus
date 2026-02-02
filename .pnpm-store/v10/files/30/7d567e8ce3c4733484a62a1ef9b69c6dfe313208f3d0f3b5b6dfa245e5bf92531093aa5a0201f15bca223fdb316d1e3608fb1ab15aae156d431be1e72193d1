var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class Bus {
  constructor() {
    // 事件池
    __publicField(this, "pools", {});
  }
  // 移除事件监听
  remove(race, name, func) {
    const targetRace = this.pools[race];
    const events = targetRace && this.pools[race][name];
    if (events) {
      this.pools[race][name] = events.filter((item) => item !== func);
    }
  }
  // 清空全部事件，由于单一实例，多次注册会被共享内容
  clear(race) {
    this.pools[race] = {};
  }
  // 注册事件监听
  on(race, event) {
    if (!this.pools[race]) {
      this.pools[race] = {};
    }
    if (!this.pools[race][event.name]) {
      this.pools[race][event.name] = [];
    }
    this.pools[race][event.name].push(event.callback);
    return this.pools[race][event.name].includes(event.callback);
  }
  // 触发事件
  emit(race, name, ...params) {
    if (!this.pools[race]) {
      this.pools[race] = {};
    }
    const targetRace = this.pools[race];
    const events = targetRace[name];
    if (events) {
      events.forEach((item) => {
        try {
          item(...params);
        } catch (error) {
          console.error(`${name} monitor event exception！`, error);
        }
      });
    }
  }
}
const bus = new Bus();
const ON_SAVE = "onSave";
const CHANGE_CATALOG_VISIBLE = "changeCatalogVisible";
const CHANGE_FULL_SCREEN = "changeFullscreen";
const PAGE_FULL_SCREEN_CHANGED = "pageFullscreenChanged";
const FULL_SCREEN_CHANGED = "fullscreenChanged";
const PREVIEW_CHANGED = "previewChanged";
const PREVIEW_ONLY_CHANGED = "previewOnlyChanged";
const HTML_PREVIEW_CHANGED = "htmlPreviewChanged";
const CATALOG_VISIBLE_CHANGED = "catalogVisibleChanged";
const BUILD_FINISHED = "buildFinished";
const ERROR_CATCHER = "errorCatcher";
const REPLACE = "replace";
const UPLOAD_IMAGE = "uploadImage";
const OPEN_MODALS = "openModals";
const CTRL_Z = "ctrlZ";
const CTRL_SHIFT_Z = "ctrlShiftZ";
const CATALOG_CHANGED = "catalogChanged";
const PUSH_CATALOG = "pushCatalog";
const RERENDER = "rerender";
const EVENT_LISTENER = "eventListener";
const TASK_STATE_CHANGED = "taskStateChanged";
export {
  BUILD_FINISHED as B,
  CHANGE_FULL_SCREEN as C,
  ERROR_CATCHER as E,
  FULL_SCREEN_CHANGED as F,
  HTML_PREVIEW_CHANGED as H,
  OPEN_MODALS as O,
  PUSH_CATALOG as P,
  REPLACE as R,
  TASK_STATE_CHANGED as T,
  UPLOAD_IMAGE as U,
  CHANGE_CATALOG_VISIBLE as a,
  bus as b,
  ON_SAVE as c,
  CTRL_SHIFT_Z as d,
  CTRL_Z as e,
  EVENT_LISTENER as f,
  CATALOG_CHANGED as g,
  RERENDER as h,
  PAGE_FULL_SCREEN_CHANGED as i,
  PREVIEW_CHANGED as j,
  PREVIEW_ONLY_CHANGED as k,
  CATALOG_VISIBLE_CHANGED as l
};
