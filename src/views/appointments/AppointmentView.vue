<script setup>
import { onMounted, ref } from 'vue';
import SelectedService from '@/components/SelectedService.vue';
import { formatCurrency } from '@/helpers';
import { useAppointmentsStore } from '@/stores/appointments';
import VueTailwindDatepicker from 'vue-tailwind-datepicker'

const appointments = useAppointmentsStore()

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM'
})

const disableDate = (date) => {
  const today = new Date()
  return date < today || date.getMonth() > today.getMonth() + 1 || [0,6].includes(date.getDay())
}

</script>
<template>
    <h2 class="text-4xl font-extrabold text-white">Detalles de la Cita y Resumen</h2>
    <p class="text-white text-lg">A continuación verifica la informacion y confirma tu cita</p>
    <h3 class="text-3xl font-extrabold text-white">Servicios seleccionados:</h3>
    <p v-if="appointments.noServicesSelected" class="text-2xl text-white text-center">No hay servicios seleccionados</p>
    <div v-else class="grid gap-5">
      <SelectedService v-for="service in appointments.services" :key="service._id" :service="service"/>
      <p class="text-2xl text-white text-right">Total a pagar: <span class="font-black">{{  formatCurrency(appointments.total) }}</span></p>
    </div>
    <div class="space-y-8" v-if="!appointments.noServicesSelected">
      <h3 class="text-3xl font-extrabold text-white">
        Fecha y Hora
      </h3>
      <div class="lg:flex gap-5 items-start">
        <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
          <VueTailwindDatepicker
            v-model="appointments.date"
            :disable-date="disableDate"
            i18n="es-mx"
            as-single
            no-input
            :formatter="formatter" />

        </div>
        <div v-if="appointments.isDateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
          <button
            v-for="hour in appointments.hours"
            :key="hour"
            class="block cursor-pointer rounded-lg text-xl font-black p-3 hover:bg-blue-900 hover:text-white transition-all disabled:opacity-10"
            :class="appointments.time === hour ? 'bg-blue-500 text-white':'bg-white text-blue-500'"
            @click="appointments.time = hour"
            :disabled="appointments.disableTime(hour) ? true : false"
            >
            {{ hour }}
          </button>
        </div>
      </div>
      <div class="flex justify-end">
        <button
          v-if="appointments.isAppointmentValid"
          class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white hover:bg-blue-900 transition-all cursor-pointer"
          @click="appointments.saveAppointment()">
          Confirmar cita
        </button>
      </div>
    </div>
</template>



<style lang="scss" scoped>

</style>
