<template>

  <div class="square w-1/4 border-r border-b border-gray-400 text-center max-w-sm bg-gray-200">
    <div class="content mb-2">
      <div class="pb-2 flex justify-center items-center">
        <img :src="getImage(company.logo_img)"
             class="image w-48 h-48 object-cover" alt="Company logo">
      </div>
      <div class="flex flex-wrap w-full">

        <h4 class="text-center mx-auto mb-4 uppercase font-bold font-lora">{{ company.company_name }}</h4>
      </div>
      <div class="flex flex-wrap w-full">
        <div class="flex-1">
          <h6 class="text-center mx-auto mb-4 pl-12 mt-1 font-lora">{{ $t('companiesHome.office') }}: {{ company.office_number }}</h6>
        </div>
        <div class=" flex-1 ">
          <router-link
              class=" w-1/2 mx-auto text-xl font-bold px-4 py-2 text-purple-500 hover:bg-purple-500 hover:text-white rounded"
              :to="'/company/' + company.company_name">
            <i class="fas fa-angle-double-right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  props: {
    company: Object
  },
  methods: {
    getImage(image){
      if((/\.(gif|jpg|jpeg|tiff|png)$/i).test(image)){
        return image = 'http://localhost:8000/images/' + image
      }else {
        return image
      }
    }
  }
}
</script>


<style scoped>
.square {
  position: relative;
}

.square:hover {
  background-color: ghostwhite;
}

</style>
