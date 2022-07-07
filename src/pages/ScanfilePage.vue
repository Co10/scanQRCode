<template>
  <div>
    <q-file
      color="teal"
      filled
      v-model="files"
      label="Upload Images here"
      multiple
      accept="image/*"
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>
    <q-card v-show="f.show">
      <q-card-section>
        <div class="text-h6">Results</div>
      </q-card-section>
      <q-card-section>
        <FileResult :results="f.result" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref, watch, reactive } from "vue";
import { useQuasar } from "quasar";
import FileResult from "components/FileResult.vue";
import scanImages from "components/scanImages";
import scanResultProcess from "components/scanResultProcess";
import ch from "components/codeHistory";

export default {
  components: { FileResult },
  setup() {
    const $q = useQuasar();

    let f = reactive({
      show: false,
      result: null,
    });
    let files = ref(null);
    watch(files, () => {
      if (files.value !== null) {
        try {
          scanImages(
            files.value,
            (sres) => {
              sres.result.forEach((i) => {
                i.result = scanResultProcess(i.result, "file");
              });
              ch.pushArr(sres.result);
              f.result = sres;
              f.show = true;
            },
            () => {
              $q.notify("None has Result!");
            }
          );
        } catch (e) {
          console.error(e);
        }
      }
    });

    return { files, f };
  },
};
</script>

<style>
</style>