import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthAPI from '@/api/AuthAPI'
import AppointmentsAPI from '@/api/AppointmentsAPI'
export const useUserStore = defineStore('user', () => {

  const router = useRouter()
  const user = ref ({})
  const appointments = ref([])
  const loading = ref(true)

  const getUsername = computed (() => user.value?.name ? user.value.name : '')
  onMounted(async() => {
    try {
      const { data } = await AuthAPI.auth()
      user.value = data
      await getUserAppointments()
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  })

  function logout () {
    localStorage.removeItem('JWT')
    user.value = {}
    router.push({ name: 'login' })
  }

  async function getUserAppointments() {
    const { data } = await AppointmentsAPI.getUserAppointments(user.value._id)
    appointments.value = data
  }

  const noAppointments = computed(() => appointments.value.length === 0)

  return {
    user,
    appointments,
    getUsername,
    noAppointments,
    loading,
    logout,
    getUserAppointments

  }
})
