import { uid } from "quasar";

export default function scanResultProcess(value, from) {
  let type = "text";
  let time = new Date().getTime();
  let id = uid();
  if (value.indexOf("http://") === 0 || value.indexOf("https://") === 0)
    type = "url";
  return {
    time,
    id,
    type,
    value,
    from,
  };
}
