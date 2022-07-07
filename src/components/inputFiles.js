export default function inputFiles() {
  return new Promise((resolve, reject) => {
    let input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*";
    input.onchange = (e) => {
      resolve(e.target.files);
    };
    input.click();
  });
}
