<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { inject } from 'vue';
import AuthAPI from '@/api/AuthAPI';
const toast = inject('toast')
const route = useRoute()
const router = useRouter()
const { token } = route.params
const confirmado = ref(false)

onMounted(async() => {
  try {
    const { data } = await AuthAPI.verifyAccount(token)
    toast.open({
      type: 'success',
      message: data.msg
    })
    confirmado.value = true
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 5000)
  } catch (error) {
    console.log(error)
    toast.open({
      message: error.response.data.msg,
      type: 'error'
    })
    confirmado.value = false
  }
})

</script>

<template>
  <div>
    <h1 v-if="confirmado" class="text-white text-2xl">Tu cuenta ha sido confirmada con exito.</h1>
    <h1 v-else class="text-white text-2xl">Hubo un error, esta cuenta ya ha sido confirmada o no existe.</h1>
  </div>
</template>



<style lang="scss" scoped>

</style>
