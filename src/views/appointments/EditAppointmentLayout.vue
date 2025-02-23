<script setup>
import AppointmentsAPI from '@/api/AppointmentsAPI';
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppointmentsStore } from '@/stores/appointments';

const appointments = useAppointmentsStore()

const route = useRoute()
const router = useRouter()

const { id } = route.params

onMounted(async() => {
  try {
    await appointments.clearState()
    console.log('MONTANDO EDITAR CITA')
    const { data } = await AppointmentsAPI.getAppointmentById(id)
    appointments.setSelectedAppointment(data)
  } catch (error) {
    console.log(error)
    router.push({ name: 'my-appointments'})
  }
})

</script>

<template>
  <h1 class="text-2xl text-white w-full">Editar cita 2</h1>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{name: 'edit-appointment'}"
      class="flex-1 text-center uppercase font-extrabold hover:bg-blue-800 hover:text-white p-1 transition-all"
      :class="route.name === 'edit-appointment' ? 'bg-blue-500 text-white': 'bg-white text-blue-500'"
    >
      Servicios
    </RouterLink>
    <RouterLink
      :to="{name: 'edit-appointment-details'}"
      class="flex-1 text-center uppercase font-extrabold hover:bg-blue-800 hover:text-white p-1 transition-all"
      :class="route.name === 'edit-appointment-details' ? 'bg-blue-500 text-white': 'bg-white text-blue-500'"
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
