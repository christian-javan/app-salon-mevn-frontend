<script setup>

import AdminAppointment from '@/components/AdminAppointment.vue';
import { useUserStore } from '@/stores/user';
const user = useUserStore()


</script>
<template>
  <h2 class="text-2xl text-white font-black">Próximas citas</h2>
  <p class="text-white text-lg mt-5">A continuacion podrás administrar tus próximas citas</p>
  <p v-if="user.loading" class="text-white text-2xl text-center mt-5">
    ...Cargando
  </p>

  <div v-else>
    <p v-if="user.noAppointments" class="text-white text-2xl mt-5 text-center"> No tienex próximas citas</p>
    <div v-else class="grid grid-cols-1 gap-5 mt-10">
      <p class="text-white">Appointments:</p>

      <AdminAppointment v-for="appointment in user.appointments" :key="appointment._id" :appointment="appointment"/>
    </div>
  </div>
</template>



<style lang="scss" scoped>

</style>
