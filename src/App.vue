<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="md:flex h-screen">
    <div class="h-64 md:h-auto bg-cover bg-center md:w-1/3 columna-izquierda">

    </div>
    <div class="md:w-2/3 px-10 py-5 min-h-ffull overflow-y-scroll">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.columna-izquierda {
  background-image: url('/img/1.jpg');
}
</style>
