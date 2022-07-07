<template>
  <div
    class="video-container flex flex-center"
    :style="{ '--qr-hl': hl_w + 'px', '--scan-height': scanHeight + 'px' }"
  >
    <div class="btn-area flex justify-between" v-show="camEnabled">
      <q-btn round color="grey-9" icon="close" @click="closePage" />
      <q-btn
        round
        color="grey-9"
        :icon="camPaused ? 'play_arrow' : 'pause'"
        @click="pauseCam"
      />
      <q-btn
        v-if="flashState > 0"
        round
        color="grey-9"
        :icon="flashIcon"
        @click="toggleFlash"
      />
      <q-btn round color="grey-9" icon="wallpaper" @click="inputImages" />
    </div>
    <video class="camera-area" ref="vTag"></video>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import QrScanner from "qr-scanner";

import inputFiles from "./inputFiles";
import scanImages from "./scanImages";

export default {
  name: "ScanArea",
  props: ["scanHeight"],
  setup() {
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();
    const hasCamera = QrScanner.hasCamera(); // async

    let vTag = ref(null);
    let camEnabled = ref(false);
    let qrScanner = null;
    let lastScan = "";

    // adjust scan area highlight width & height
    let hl_w = ref(400);
    function change_hl() {
      let w = document.body.scrollWidth;
      if (w <= 500) {
        hl_w.value = w * 0.9;
      } else {
        hl_w.value = 450;
      }
    }
    window.addEventListener("resize", () => change_hl());

    // start & pause camera
    function startCamera() {
      try {
        const cs = qrScanner.start();
        cs.then(() => {
          console.log("camera permission granted");
          camEnabled.value = true;
        }).catch((e) => {
          console.error("camera permission needed!", e);
          camEnabled.value = false;
        });
      } catch (e) {
        console.error(e);
      }
    }
    let camPaused = ref(0);
    function pauseCam() {
      camPaused.value = !camPaused.value;
      if (camPaused.value) {
        qrScanner.stop();
      } else {
        startCamera();
      }
    }
    function pauseCamera() {
      camPaused.value = true;
      qrScanner.stop();
    }

    onMounted(() => {
      change_hl();
      hasCamera
        .then((hasCameraResult) => {
          if (hasCameraResult) {
            store.dispatch("scan/hasCamera", true);

            // QrScanner.listCameras().then((a) => console.log(a));

            nextTick(() => {
              qrScanner = new QrScanner(
                vTag.value,
                ({ data }) => {
                  if (lastScan === data) return;
                  lastScan = data;
                  store.dispatch("scan/scanResult", data);
                },
                {
                  highlightScanRegion: true,
                  highlightCodeOutline: true,
                  // preferredCamera: ,
                  // maxScansPerSecond: ,
                }
              );
              startCamera();
            });
          } else {
            store.dispatch("scan/hasCamera", false);
          }
        })
        .catch((e) => console.error(e));
    });

    let flashState = ref(-1); // uninitialized, no flash, flash off, flash on
    let flashIcon = computed(() => {
      if (flashState.value === 1) return "flash_off";
      else if (flashState.value === 2) return "flash_on";
      else return "no_flash";
    });
    function toggleFlash() {
      if (flashState.value < 1) return;
      else if (flashState.value === 1) {
        try {
          qrScanner.turnFlashOn().then((a) => {
            if (a) flashState.value = 2;
          });
        } catch (e) {
          console.error("err in turning on flash", e);
        }
      } else {
        try {
          qrScanner.turnFlashOff().then((a) => {
            if (a) flashState.value = 1;
          });
        } catch (e) {
          console.error("err in turning off flash", e);
        }
      }
    }
    watchEffect(() => {
      if (camEnabled.value === true) {
        if (flashState.value === -1) {
          qrScanner
            .hasFlash()
            .then((a) => {
              if (a) flashState.value = 1;
              else flashState.value = 0;
            })
            .catch((e) => console.error("flash err: ", e));
        }
      }
    });

    function closePage() {
      store.dispatch("scan/scanClear", 0);
      qrScanner.stop();
      router.replace("/");
    }

    function inputImages() {
      let res = inputFiles();
      res
        .then((imgs) => {
          scanImages(
            imgs,
            (sres) => {
              pauseCamera();
              store.dispatch("scan/newImages", sres);
            },
            () => {
              $q.notify("None has Result!");
            }
          );
        })
        .catch((e) => console.error(e));
    }

    return {
      vTag,
      closePage,
      camPaused,
      pauseCam,
      camEnabled,
      hl_w,
      flashState,
      flashIcon,
      toggleFlash,
      inputImages,
    };
  },
};
</script>

<style>
.video-container {
  width: 100vw;
  height: var(--scan-height, 100vh);
  background: black;
  overflow: hidden;
  position: relative;
}
.camera-area {
  display: block;
}

.btn-area {
  position: fixed;
  z-index: 5;
  top: 5vh;
  width: 90%;
}
.btn-area > button {
  opacity: 0.6;
}

.scan-region-highlight {
  transform: translate(-50%, -50%) !important;
  width: var(--qr-hl, 400px) !important;
  height: var(--qr-hl, 400px) !important;
  left: 50% !important;
  top: 50% !important;
}
</style>