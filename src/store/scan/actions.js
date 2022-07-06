import { uid } from "quasar";

export function hasCamera(context, value) {
  context.commit("HAS_CAMERA", value);
}

export function scanResult(context, value) {
  let type = "text";
  let time = new Date().getTime();
  let id = uid();
  if (value.indexOf("http://") === 0 || value.indexOf("https://") === 0)
    type = "url";
  context.commit("SCAN_RESULT", {
    time,
    id,
    type,
    value,
  });
}

export function scanClear(context, value) {
  context.commit("SCAN_CLEAR", value);
}

export function clearHistory(context, value) {
  context.commit("CLEAR_HISTORY", value);
}

export function listHeight(context, value) {
  context.commit("RESULT_HEIGHT", value);
}

export function removeItem(context, value) {
  if (value.temp) {
    context.commit("REMOVE_TEMP", value.id);
  } else {
    context.commit("REMOVE_LOCAL", value.id);
  }
}
