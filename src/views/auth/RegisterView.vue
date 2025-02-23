<script setup>
import { inject } from 'vue';
import { reset } from '@formkit/vue';
import AuthAPI from '@/api/AuthAPI';

const toast = inject('toast')

// eslint-disable-next-line no-unused-vars
const handleSubmit = async ({ password_confirm, ...formData}) => {

  try {
    const { data } = await AuthAPI.register(formData)

    toast.open({
      message: data.msg,
      type: 'success'
    })

    reset('registerForm')

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
  <h1 class="text-6xl font-extrabold text-white text-center mt-10"> Crea una cuenta</h1>
  <p class="text-2xl text-white text-center my-5">Crear una cuenta en App Salon</p>
  <FormKit
    type="form"
    id="registerForm"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa los mensajes de error"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Tu nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El nombre es obligatorio',
        length: 'El nombre es muy corto'
      }"
    />
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
    <FormKit type="submit">Crear Cuenta</FormKit>
  </FormKit>
</template>



<style lang="scss" scoped>

</style>
