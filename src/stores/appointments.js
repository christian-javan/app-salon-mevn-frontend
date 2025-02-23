import { ref, computed, onMounted, watch } from 'vue'
import { defineStore } from 'pinia'
import AppointmentsAPI from '@/api/AppointmentsAPI'
import { convertToDMY, convertToISO } from '@/helpers/dates'
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './user'
import App from '@/App.vue'


export const useAppointmentsStore = defineStore('appointments', () => {

  const services = ref([])
  const date = ref('')
  const hours = ref([])
  const time = ref('')
  const appointmentId = ref('')

  const router = useRouter()
  const user = useUserStore()
  const toast = inject('toast')
  const appointmentsByDate = ref([])

  onMounted(() => {
    const startHour = 10
    const endHour = 19
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour+':00')
    }
  })

  watch(date, async() => {
    try {
      time.value = ''
      if(date.value === '') {
        return
      }
      const { data } = await AppointmentsAPI.getByDate(date.value)
      if(appointmentId.value) {
        appointmentsByDate.value = data.appointments.filter( appointment => appointment._id !== appointmentId.value )
        const currentAppointment = data.appointments.filter( appointment => appointment._id === appointmentId.value )[0].time
        time.value = currentAppointment
      } else {
        appointmentsByDate.value = data.appointments
      }
    } catch (error) {
      console.log(error)
    }

  })

  function setSelectedAppointment(appointment) {
    appointmentId.value = appointment._id
    services.value = appointment.services
    date.value = convertToDMY(appointment.date)
    time.value = appointment.time

    console.log('time', time.value)
  }

  function onServiceSelect(service) {
    if(services.value.some(selectedService => selectedService._id === service._id)){
      services.value = services.value.filter (selectedService => selectedService._id !== service._id)
    } else{
      if(services.value.length === 2) {
        alert('Maximo 2 servicios por cita')
        return
      }
      services.value.push(service)
    }
  }

  async function saveAppointment () {
    const appointment = {
      services: services.value.map(service => service._id),
      date: convertToISO(date.value),
      time: time.value,
      total: total.value
    }

    console.log(appointmentId.value)
    if(appointmentId.value) {
      try {
        const { data } = await AppointmentsAPI.updateAppointment(appointmentId.value, appointment)

        toast.open({
          message: data.msg,
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const { data } = await AppointmentsAPI.create(appointment)

        toast.open({
          message: data.msg,
          type: 'success'
        })
      } catch (error) {
        console.log(error)
      }
    }
    clearState()
    user.getUserAppointments()
    router.push({ name: 'my-appointments' })

  }

  async function cancelAppointment(id) {
    console.log('cancelando cita', id)
    if(confirm('¿Deseas cancelar esta cita?')) {
      try {
        const { data } = await AppointmentsAPI.delete(id)
        toast.open({
          message: data.msg,
          type: 'success'
        })

        user.appointments = user.appointments.filter(appointment => appointment._id !== id)
      } catch (error) {
        toast.open({
          message: error.response.data.msg,
          type: 'error'
        })
      }
    }

  }

  function clearState() {
    services.value = []
    date.value = ''
    time.value = ''
    appointmentId.value = ''
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some(service => service._id === id)
  })

  const noServicesSelected = computed (() => services.value.length === 0)

  const total = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  const isAppointmentValid = computed (() => {
    return services.value.length && date.value.length && time.value.length
  })

  const isDateSelected = computed(() => {
    return date.value ? true : false
  })

  const disableTime = computed(() => {
    return (hora) => appointmentsByDate.value.find(appointment => appointment.time === hora)
  })
  return {
    services,
    date,
    hours,
    time,
    isAppointmentValid,
    isServiceSelected,
    noServicesSelected,
    total,
    isDateSelected,
    cancelAppointment,
    clearState,
    setSelectedAppointment,
    onServiceSelect,
    saveAppointment,
    disableTime
   }
})
