<script setup>
import AuthAPI from '@/api/AuthAPI';
import { inject, onMounted, ref } from 'vue';
import { reset } from '@formkit/vue';
import { useRoute, useRouter } from 'vue-router';

const toast = inject('toast')
const route = useRoute()
const router = useRouter()
const validToken = ref(false)

const { token } = route.params
onMounted(async() => {

  try {
    const { data } = await AuthAPI.verifyPasswordResetToken(token)
    validToken.value = true
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: 'error'
    })
  }
})
const handleSubmit = async({ password }) => {
  try {
    const { data } = await AuthAPI.updatePassword(token, { password })
    toast.open({
      message: data.msg,
      type: 'success'
    })
    reset('newPasswordForm')
    setTimeout(() => {
      router.push({ name: 'login'})
    }, 3000)
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: 'error'
    })
  }
}
</script>

<template>
  <div v-if="validToken">
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Nueva contraseña</h1>
    <p class="text-2xl text-white text-center my-5">Elige una nueva contraseña</p>
    <FormKit
      type="form"
      id="newPasswordForm"
      :actions="false"
      incomplete-message="No se pudo enviar, revisa los mensajes de error"
      @submit="handleSubmit"
    >
      <FormKit
        type="password"
        label="Password"
        name="password"
        placeholder="Tu password - mínimo 8 caracteres"
        validation="required|length:8"
        :validation-messages="{
          required: 'El password es obligatorio',
          length: 'El password es muy corto'
        }"
      />
      <FormKit
        type="password"
        label="Repite tu password"
        name="password_confirm"
        placeholder="Repite tu password"
        validation="required|confirm"
        :validation-messages="{
          required: 'El password es obligatorio',
          confirm: 'Los passwords no son iguales'
        }"
      />
      <FormKit type="submit">Resetear password</FormKit>
    </FormKit>
  </div>
  <div v-else>
    <h3 class="text-2xl text-white text-center font-black">Tóken inválido</h3>
  </div>
</template>



<style lang="scss" scoped>

</style>
