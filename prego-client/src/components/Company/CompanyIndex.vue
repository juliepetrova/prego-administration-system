<template>
  <div class="flex-column min-h-screen">
    <div class="flex p-24">
      <div class="w-1/3 p-2">
        <!--                -->
        <!--                IMAGE OF THE COMPANY-->
        <!--                -->
        <img :src="getImage(company.logo_img)"
             alt="Company logo">
      </div>
      <div class="flex-1 px-12">
        <div class="text-5xl font-bold mb-10">{{ company_name }}</div>
        <div class="text-2xl font-light">{{ company.description }}
        </div>
        <div class="flex mt-10">
          <router-link :to="'/company/' + id + '/form'"
                       class="bg-blue-500 px-10 py-3 rounded-full shadow-lg hover:bg-blue-600 text-white mr-8 focus:outline-none">
            <span class="text-xl">Pre-register</span></router-link>
          <button
              class="bg-white px-10 py-3 border border-blue-500 rounded-full shadow-lg hover:bg-gray-200 text-blue-500 focus:outline-none mr-8">
            <span class="text-xl">Email</span></button>
          <router-link :to="'/company/' + company_name + '/form/settings'" v-if="user_id == manager_id"
                       class="bg-white px-10 py-3 border border-blue-500 rounded-full shadow-lg hover:bg-gray-200 text-blue-500 focus:outline-none mr-8">
            <span class="text-xl">Settings</span></router-link>
<!--          Evac page link-->
          <router-link :to="{ name: 'evacuationroute', params: {company: company } }"
                       class="bg-white px-10 py-3 border border-blue-500 rounded-full shadow-lg hover:bg-gray-200 text-blue-500 focus:outline-none">
            <span class="text-xl">Evacuation</span></router-link>
        </div>
      </div>
    </div>
    <div class="flex p-24 bg-white">
      <div class="flex-1 px-12">
        <div class="text-4xl font-bold mb-10">Safety regulations</div>
        <div class="text-2xl font-light">
          <ol class="list-decimal leading-10">
          <li class="ml-24" v-for="rule in safetyRules" :key="rule">
            {{ rule }}
          </li>
        </ol>
        </div>
      </div>
      <div class="w-1/3 bg-white rounded-lg shadow-lg">
        <!--                -->
        <!--                IMAGE OF THE COMPANY-->
        <!--                -->
        <img src="https://www.simac.com/uploads/media/5652f8b130907/Simac%20logo%20full%20colour%20rgb.jpg"
             alt="">
      </div>
    </div>
    <vueper-slides autoplay>
      <vueper-slide v-for="(slide, i) in slides"
                    :key="i"
                    :image="slide.image"
                    :title="slide.title"
                    :content="slide.content" class="text-white text-3xl shadow-lg"/>
    </vueper-slides>
  </div>
</template>

<script>
import {VueperSlide, VueperSlides} from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import axios from 'axios'

export default {
  name: "CompanyIndex",
  components: {VueperSlides, VueperSlide},
  computed: {
    user_id: () => {
      return localStorage.getItem('user_id');
    }
  },
  methods: {
    getImage(image) {
      if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(image)) {
        return image = 'http://localhost:8000/images/' + image
      } else {
        return image
      }
    }
  },
  created() {
    //make request to get info about company
    axios.get('http://localhost:8000/api/companies/?name=' + this.$route.params.company_name)
        .then(response => {
          console.log(response.data)
          this.company = response.data[0]
          this.id = response.data[0].id
          this.company_name = response.data[0].company_name
          this.manager_id = response.data[0].manager_id;
          this.company_logo = response.data[0].logo_img
          this.safetyRules = (response.data[0].history).split(";")
          this.evac = 'http://localhost:8000/images/' + response.data[0].img1
        })
  },
  data() {
    return {
      id: '',
      manager_id: '',
      company_name: '',
      company_logo: '',
      company: '',
      evac: '',
      safetyRules: [],
      slides: [
        {
          title: 'Slide 1',
          content: 'Photo',
          // You can also provide a URL for the image.
          image: 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        },
        {
          title: 'Slide 2',
          content: 'Photo',
          // You can also provide a URL for the image.
          image: 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        },
        {
          title: 'Slide 3',
          content: 'Photo',
          // You can also provide a URL for the image.
          image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>
