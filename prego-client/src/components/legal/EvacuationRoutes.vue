<template>
<div>
  <h1 class="text-center text-5xl text-indigo-800 font-bold m-8 font-opensans">Emergency evacuation routes for {{company.company_name}}</h1>
  <div class="route w-full flex justify-center"><img class="max-h-screen" :src="'http://localhost:8000/images/' + company.img1"></div>
</div>
</template>

<script>

export default {
  name: "EvacuationRoutes",
  props: ['company'],
}
</script>

<style scoped>
</style>
