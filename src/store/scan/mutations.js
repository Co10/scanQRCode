import ch from "components/codeHistory";

export function HAS_CAMERA(state, value) {
  state.hasCamera = value;
}

export function SCAN_RESULT(state, value) {
  state.currentResult.unshift(value);
  ch.push(value);
}

export function SCAN_CLEAR(state) {
  state.currentResult.length = 0;
}

export function CLEAR_HISTORY(state) {
  ch.clear();
  state.removeID = new Date().getTime().toString(16);
}

export function RESULT_HEIGHT(state, value) {
  state.resultHeight = value;
}

export function REMOVE_TEMP(state, value) {
  state.currentResult = state.currentResult.filter((a) => a.id !== value);
  ch.remove(value);
  state.removeID = value;
}

export function REMOVE_LOCAL(state, value) {
  ch.remove(value);
  state.removeID = value;
}

export function SCAN_IMAGES(state, value) {
  ch.pushArr(value.result);
  state.newImgs = value;
}
