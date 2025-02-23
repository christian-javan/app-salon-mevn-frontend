<script setup>
import { inject } from 'vue';
import { reset } from '@formkit/vue';
import AuthAPI from '@/api/AuthAPI';
import { useRouter } from 'vue-router';

const toast = inject('toast')
const router = useRouter()
const handleSubmit = async ({ ...formData }) => {

  try {
    const { data } = await AuthAPI.login(formData)
    const jwt = data.jwt
    reset('loginForm')
    localStorage.setItem('JWT', jwt)
    router.push({ name: 'my-appointments' })
  } catch (error) {
    console.log(error)
    toast.open({
      message: error.response.data.msg,
      type: 'error'
    })
  }
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10"> Login</h1>
  <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>
  <FormKit
    type="form"
    id="loginForm"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa los mensajes de error"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Tu email"
      validation="required|email"
      :validation-messages="{
        required: 'El email es obligatorio',
        email: 'El email no es válido'
      }"
    />
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

    <FormKit type="submit">Login</FormKit>
  </FormKit>
</template>

