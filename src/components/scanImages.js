import QrScanner from "qr-scanner";

export default function scanImages(imgs, whenDone, whenNoResult) {
  let promises = [];
  for (let i of imgs) {
    promises.push(QrScanner.scanImage(i));
  }
  Promise.allSettled(promises).then((scanResults) => {
    let toPass = {
      result: [],
      noResult: [],
    };
    scanResults.forEach((v, i) => {
      if (v.status === "fulfilled") {
        toPass.result.push({
          file: imgs[i],
          result: v.value,
        });
      } else if (v.status === "rejected") {
        toPass.noResult.push(imgs[i]);
      }
    });
    if (toPass.result.length > 0) {
      if (whenDone) whenDone(toPass);
    } else {
      if (whenNoResult) whenNoResult();
    }
  });
}
