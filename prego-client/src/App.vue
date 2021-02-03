<template>
  <div id="app" class="background min-h-screen">
    <Nav/>
    <hr>
    <router-view></router-view>
    <Foot class="mt-16"/>
  </div>
</template>

<script>
import Nav from './components/Nav'
import Foot from "./components/Foot";

export default {
  name: 'App',
  components: {
    Nav,
    Foot
  },
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=PT+Serif&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap');

  .background{
    background-image: url("assets/img/background.jpg");
    background-size: cover;
    background-repeat: repeat;
  }
</style>

