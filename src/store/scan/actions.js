import scanResultProcess from "components/scanResultProcess";

export function hasCamera(context, value) {
  context.commit("HAS_CAMERA", value);
}

export function scanResult(context, value) {
  context.commit("SCAN_RESULT", scanResultProcess(value, "camera"));
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

export function newImages(context, value) {
  value.result.forEach((i) => {
    i.result = scanResultProcess(i.result, "file");
  });
  context.commit("SCAN_IMAGES", value);
}
