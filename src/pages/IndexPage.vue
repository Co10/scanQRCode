<template>
  <q-page class="column flex-center">
    <q-btn
      class="q-mb-xl"
      push
      color="primary"
      size="50px"
      round
      icon="qr_code_scanner"
      @click="openPage"
    />
    <CodeHistory />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import CodeHistory from "components/CodeHistory.vue";

export default defineComponent({
  name: "IndexPage",
  components: { CodeHistory },
  setup() {
    const router = useRouter();
    function openPage() {
      router.push("scan");
    }

    return { openPage };
  },
});
</script>