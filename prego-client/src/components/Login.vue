<template>

  <div class="flex justify-center mt-10 mb-16">
    <div class="form flex flex-col justify-center">
      <div class="text-center text-5xl text-gray-700 mb-4">{{ $t('logInPage.header') }}</div>
      <div class="text-center text-gray-600 text-sm mb-10">{{ $t('logInPage.subheader') }} <br>
      </div>
      <form class="mb-4 flex flex-col justify-between">
        <div v-if="authError!=''" class="flex items-center bg-red-300 text-white text-sm font-bold px-4 py-3"
             role="alert">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path
                d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/>
          </svg>
          <p>{{ authError }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 md:pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" v-model="user.email" type="text" :placeholder="$t('logInPage.emailPlaceholder')">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            {{ $t('logInPage.password') }}
          </label>
          <input
              class="shadow appearance-none border rounded w-full py-2 px-3 md:pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password" v-model="user.password" :type="type" :placeholder="$t('logInPage.passwordPlaceholder')">
          <label class="inline-flex items-center mt-3">
            <input class="mr-2 form-checkbox h-5 w-5 text-purple-600" type="checkbox" @click="showPassword">{{
              show
            }}</label>
        </div>


        <div class="mb-4 mt-4 flex justify-center">
          <button @click.prevent="login"
                  class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-16 rounded focus:outline-none focus:shadow-outline"
                  type="button">
            {{ $t('logInPage.header') }}
          </button>
        </div>
      </form>
      <footer class="flex flex-col md:flex-row text-center mx-auto">
        <a class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-800 mr-4"
           href="#">
          {{ $t('logInPage.forgotPassword') }}
        </a>
        <a class="inline-block align-baseline font-bold text-sm text-gray-600 hover:text-gray-800" href="#">
          {{ $t('logInPage.termsConditions') }}
        </a>
      </footer>
    </div>


  </div>


</template>

<script>
export default {

  name: "LogIn",

  data() {
    return {
      type: 'password',
      messagePassword: this.$t('logInPage.showPassword'),
      user: {
        email: '',
        password: '',
      },
      authError: '',
    }
  },
  computed: {
    show() {
      return this.messagePassword;
    }
  },
  methods: {
    showPassword() {
      if (this.type === 'password') {
        this.type = 'text'
        this.messagePassword = this.$t('logInPage.hidePassword')
      } else {
        this.type = 'password'
        this.messagePassword = this.$t('logInPage.showPassword')
      }
    },
    login() {
      let email = this.user.email
      let password = this.user.password
      if (email === '' || password === '') {
        this.authError = 'Please fill out all fields!'
        return
      }
      this.$store.dispatch('login', {email, password})
          .then(() => {
            let role = localStorage.getItem("role_id")
            if (role === "1") {
              this.$router.push('/admin/dashboard')
            } else if (role === "2") {
              this.$router.push('/building/dashboard')
            } else if (role === "3") {
              this.$router.push('/office/dashboard')
            } else if (role === "4") {
              this.$router.push('/employee/dashboard')
            }
    })
    .catch(err => {
      this.authError = 'Incorrect email or password!';
      console.log(err)
    })

    // this.$store.dispatch('currentUser/loginUser',this.user)
    //     .then(this.$router.push('/'))
  }
}
}

</script>


<style scoped>

</style>
