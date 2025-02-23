<script setup>
import { useAppointmentsStore } from '@/stores/appointments';
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const appointments = useAppointmentsStore()

onMounted(() => {
  console.log('DESDE NUEVA CITA', route.name)
  appointments.clearState()
})
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{name: 'new-appointment'}"
      class="flex-1 text-center uppercase font-extrabold hover:bg-blue-800 hover:text-white p-1 transition-all"
      :class="route.name === 'new-appointment' ? 'bg-blue-500 text-white': 'bg-white text-blue-500'"
    >
      Servicios
    </RouterLink>
    <RouterLink
      :to="{name: 'appointment-details'}"
      class="flex-1 text-center uppercase font-extrabold hover:bg-blue-800 hover:text-white p-1 transition-all"
      :class="route.name === 'appointment-details' ? 'bg-blue-500 text-white': 'bg-white text-blue-500'"
      >
      Cita y Resumen
    </RouterLink>
  </nav>
  <div class="space-y-5">
    <RouterView />
  </div>

</template>



<style lang="scss" scoped>

</style>
