<template>
  <div>

    <div class="flex justify-center">
      <div class="flex-wrap justify-center my-20">
        <h2 class="flex-col text-center"> {{ $t('dashboardCompanyOwner.title') }}</h2>
        <p class="flex-col text-center text-gray-500 my-6 text-xl">{{ $t('dashboardCompanyOwner.subtitle') }}</p>
      </div>
    </div>

    <div class="flex flex-wrap justify-center items-center ml-20 mr-20 text-center" @dblclick="edit()">

      <div class="rounded overflow-hidden m-8 w-56 h-56 jus">
        <div class="flex justify-center "><i class="fas fa-building text-6xl"></i></div>
        <div class="px-6 py-4">
          <div class="text-2xl mb-2">{{ $t('dashboardCompanyOwner.mainInfo.company') }}</div>
          <p v-if="!editing" class="text-gray-700 text-xl mt-2 text-base">
            {{ company.company_name }}
          </p>
          <input
              class="w-11/12 text-center mr-6 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-if="editing" v-model="company.company_name" type="text">
        </div>
      </div>
      <div class="rounded overflow-hidden m-8 w-56 h-56">
        <div class="flex justify-center"><i class="fas fa-sort-numeric-up text-6xl"></i></div>
        <div class="px-6 py-4">
          <div class="text-2xl mb-2">{{ $t('dashboardCompanyOwner.mainInfo.office') }}</div>
          <p v-if="!editing" class="text-gray-700 text-xl mt-2 text-base">
            {{ company.office_number }}
          </p>
          <input
              class=" w-11/12 text-center mr-6 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-if="editing" v-model="company.office_number" type="text">
        </div>
      </div>
      <div class=" rounded overflow-hidden m-8 w-56 h-56">
        <div class="flex justify-center "><i class="fas fa-user text-6xl"></i></div>
        <div class="px-6 py-4">
          <div class="text-2xl mb-2">{{ $t('dashboardCompanyOwner.mainInfo.manager') }}</div>
          <p v-if="!editing" class="text-gray-700 text-xl mt-2 text-base">
            {{ company.manager_name }}
          </p>
          <input
              class="w-11/12 text-center mr-6 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-if="editing" v-model="company.manager_name" type="text">
        </div>
      </div>
      <button v-if="editing" @click="save(company)"
              class=" bg-purple-500 hover:bg-purple-700 p-4 m-4 rounded-full shadow-md flex justify-center items-center focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
             width="24" height="24"
             viewBox="0 0 50 50"
             style=" fill:#ffffff;">
          <path
              d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"></path>
        </svg>
      </button>
    </div>
    <div class="flex justify-center ">
      <div class=" flex-initial w-2/6 m-5 rounded-lg shadow bg-gray-100">
        <h2 class="text-center p-4">{{ $t('dashboardCompanyOwner.companyDetails.section') }}</h2>
        <div>
          <div class=" md:flex justify-center md:items-center mb-6 p-5 ">

            <div class="profile-img rounded-3xl w-48 h-48">
              <img class="rounded-3xl object-cover"
                   :src="this.image"
                   alt="ProfileImage"/>
              <div class="file rounded-full h-4 w-4 flex items-center justify-center shadow-xl">
                <i class="fas fa-pencil-alt"></i>
                <input type="file" name="file" class="form-control-file " id="picture" @change="onFileChange">
              </div>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6 p-5" @dblclick="editMore()">
            <div class="md:w-1/3">
              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                {{ $t('dashboardCompanyOwner.companyDetails.description') }}
              </label>
            </div>
            <div class="md:w-2/3 overflow-auto h-48">
              <p v-if="!additionalEditing" class="text-gray-700 text-xl mt-2 text-base">
                {{ company.description }}
              </p>
              <textarea v-if="additionalEditing"
                  class="appearance-none bg-transparent border-b border-black w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-black"
                  v-model="company.description" cols="40" rows="3"></textarea>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6 p-5" @dblclick="editMore()">
            <div class="md:w-1/3 ">
              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Safety rules <br><span class="text-gray-400 text-sm"> (separated by coma)</span>
              </label>
            </div>
            <div class="md:w-2/3 overflow-auto h-48">
              <p v-if="!additionalEditing" class="text-gray-700 text-xl mt-2 text-base">
                {{ company.history }}
              </p>
              <textarea v-if="additionalEditing"
                  class="appearance-none bg-transparent border-b border-black w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none border-b border-black"
                  v-model="company.history" cols="40" rows="3"></textarea>
            </div>
          </div>
<!--          Three images -->
          <div class="md:flex md:items-center mb-6 p-5" @dblclick="editMore()">
            <div class="md:w-1/3">
              <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Additional images
              </label>
            </div>
            <div v-if="!additionalEditing" class="md:w-2/3">
              <span class=""><b>Evacuation report: </b>{{company.img1}}</span><br>
              <span class=""><b>Image: </b> {{company.img2}}</span><br>
              <span class=""><b>Image:  </b>{{company.img3}}</span>
            </div>
            <div v-if="additionalEditing"  class="md:w-2/3 overflow-auto flex text-center">
              <label class="w-28 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-200 hover:text-gray-900">
                <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 text-base leading-normal text-sm">Evacuation route</span>
                <input type='file' class="hidden" @change="onEvacuation"/>
              </label>
              <label class="w-28 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-200 hover:text-gray-900">
                <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 text-base leading-normal text-sm">Select an image</span>
                <input type='file' class="hidden" @change="onImg2"/>
              </label>
              <label class="w-28 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-200 hover:text-gray-900">
              <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal text-sm">Select an image</span>
              <input type='file' class="hidden" @change="onImg3"/>
            </label>
            </div>
          </div>

          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3 mb-4">
              <button v-if="!additionalEditing" @click="editMore"
                      class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-5 rounded"
                      type="button">
                {{ $t('dashboardCompanyOwner.companyDetails.editButton') }}
              </button>
              <button v-if="additionalEditing" @click="save(company)"
                      class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-5 rounded"
                      type="button">
                Save
              </button>
            </div>
          </div>

        </div>
      </div>
      <div class="flex-initial w-3/6 mx-5">
        <CRUDEmployee v-bind:employees="employees"></CRUDEmployee>
      </div>
    </div>

<!--    Alert -->
    <!--Toast-->
    <div v-if="success" class="alert-toast fixed bottom-0 right-0 m-8 w-5/6 md:w-full max-w-sm">
      <input type="checkbox" class="hidden" id="footertoast">

      <label class="close cursor-pointer flex items-start justify-between w-full p-2 bg-green-500 h-24 rounded shadow-lg text-white" title="close" for="footertoast">
        Information edited successfully!
        <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </label>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import CRUDEmployee from "@/components/Company/CRUDEmployee";

export default {
  name: 'DashboardCompanyOwner',
  components: {CRUDEmployee},
  data() {
    return {
      companies: [],
      editing: false,
      additionalEditing: false,
      employees: [],
      success: false,
      pictureUpload: '', evacuation: '', img2: '', img3: '',
      image: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
      company: ''
    }
  },
  methods: {
    onFileChange(event) {
      this.pictureUpload = event.target.files[0];
      this.image = URL.createObjectURL(this.pictureUpload);
    },
    onEvacuation(event) {
      this.evacuation = event.target.files[0];
    },
    onImg2(event) {
      this.img2 = event.target.files[0];
    },
    onImg3(event) {
      this.img2 = event.target.files[0];
    },
    edit() {
      this.editing = !this.editing;
    },
    editMore() {
      this.additionalEditing = !this.additionalEditing;
    },
    save(company) {
      let formData = new FormData();

      formData.append("image", this.pictureUpload);
      formData.append("company_name", this.company.company_name);
      formData.append("office_number", this.company.office_number);
      formData.append("description", this.company.description);
      formData.append("history", this.company.history);
      formData.append("img1", this.evacuation);
      formData.append("img2", this.img2);
      formData.append("img3", this.img3);

      formData.append("id", this.company.id);

      formData.append('_method', 'PUT')

      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
      }
      let config = { headers: { 'Content-Type': 'multipart/form-data' } }
      axios.post('/api/companies/' + company.id, formData, config)
          .then(() => {
            this.editing = false;
            this.additionalEditing = false;
            this.success = true;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getEmployees(){
      axios.get('http://localhost:8000/api/' + localStorage.getItem("company_id") + '/employees')
          .then(response => {
            this.employees = response.data
          })
          .catch(error => {
            console.log(error.message);
          })
    }
  },
  created() {
    axios.get('http://localhost:8000/api/' + localStorage.getItem('user_id') + '/company')
        .then(response => {
          this.companies = response.data
          console.log(this.companies)
          this.company = this.companies[0]
          this.image = 'http://localhost:8000/images/' + this.company.logo_img
          localStorage.setItem("company_id", this.company.id)
          this.getEmployees()
        })
        .catch(error => {
          console.log(error.message);
        })
  },
}
</script>

<style scoped>


.links {
  text-transform: uppercase;
  letter-spacing: 2px;
}

.below-title {
  border-top: dotted 1px #999;
  border-bottom: dotted 1px #999;
  padding-top: 10px;
  padding-bottom: 10px;
  color: darkgray;
  font-size: smaller;
}


h2 {
  font-size: 35px;
  line-height: 1.4em;
}

.profile-img {
  text-align: center;
  max-width: 15rem;
}

.profile-img img {
  width: 100%;
  height: 100%;
}

.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -15%;
  padding: 22px;
  font-size: 15px;
  background: #efefef;
}

.profile-img .file input {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}


/*Alert */
/*Toast open/load animation*/
.alert-toast {
  -webkit-animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/*Toast close animation*/
.alert-toast input:checked ~ * {
  -webkit-animation: fade-out-right 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: fade-out-right 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

/* -------------------------------------------------------------
 * Animations generated using Animista * w: http://animista.net,
 * ---------------------------------------------------------- */

@-webkit-keyframes slide-in-top{0%{-webkit-transform:translateY(-1000px);transform:translateY(-1000px);opacity:0}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@keyframes slide-in-top{0%{-webkit-transform:translateY(-1000px);transform:translateY(-1000px);opacity:0}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@-webkit-keyframes slide-out-top{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}100%{-webkit-transform:translateY(-1000px);transform:translateY(-1000px);opacity:0}}@keyframes slide-out-top{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}100%{-webkit-transform:translateY(-1000px);transform:translateY(-1000px);opacity:0}}@-webkit-keyframes slide-in-bottom{0%{-webkit-transform:translateY(1000px);transform:translateY(1000px);opacity:0}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@keyframes slide-in-bottom{0%{-webkit-transform:translateY(1000px);transform:translateY(1000px);opacity:0}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}}@-webkit-keyframes slide-out-bottom{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}100%{-webkit-transform:translateY(1000px);transform:translateY(1000px);opacity:0}}@keyframes slide-out-bottom{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}100%{-webkit-transform:translateY(1000px);transform:translateY(1000px);opacity:0}}@-webkit-keyframes slide-in-right{0%{-webkit-transform:translateX(1000px);transform:translateX(1000px);opacity:0}100%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes slide-in-right{0%{-webkit-transform:translateX(1000px);transform:translateX(1000px);opacity:0}100%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes fade-out-right{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}100%{-webkit-transform:translateX(50px);transform:translateX(50px);opacity:0}}@keyframes fade-out-right{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}100%{-webkit-transform:translateX(50px);transform:translateX(50px);opacity:0}}


</style>
