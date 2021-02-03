<template>
    <div class="md:container mx-auto flex p-4 pb-6 justify-between">
        <router-link to="/">
            <img src="@/assets/img/Preg.png" width="64" alt="">
        </router-link>
        <div class="flex">
            <button v-for="entry in languages" class="lg:mr-8" 
                :key="entry.title" 
                @click="changeLocale(entry.language)">  
                <flag :iso="entry.flag" v-bind:squared="false" /> 
                <h2 class="p-4 text-gray-700 rounded-lg hover:bg-gray-300">{{entry.title}}</h2>  
            </button>
            <router-link to="/" class="lg:mr-8">
                <h2 class="p-4 text-gray-700 rounded-lg hover:bg-gray-300">{{ $t('menuitems.home') }}</h2>
            </router-link>
          <router-link to="/companies" class="lg:mr-8">
            <h2 class="p-4 text-gray-700 rounded-lg hover:bg-gray-300">{{ $t('menuitems.companies') }}</h2>
          </router-link>

          <router-link v-if="isLoggedIn && (role==='1')" to="/admin/dashboard" class="lg:mr-8">
            <h2 class="p-4 text-gray-700 rounded-lg hover:bg-gray-300">{{ $t('menuitems.dashboard') }}</h2>
          </router-link>
            <router-link v-if="isLoggedIn && (role==='2')" to="/building/dashboard" class="lg:mr-8">
                <h2 class="p-4 text-gray-700 rounded-lg hover:bg-gray-300">{{ $t('menuitems.dashboard') }}</h2>
            </router-link>
          <router-link v-if="isLoggedIn && (role==='3')" to="/office/dashboard" class="lg:mr-8">
            <h2 class="p-4 text-gray-700 rounded-lg hover:bg-gray-300">{{ $t('menuitems.dashboard') }}</h2>
          </router-link>
          <router-link v-if="isLoggedIn && (role==='4')" to="/employee/dashboard" class="lg:mr-8">
            <h2 class="p-4 text-gray-700 rounded-lg hover:bg-gray-300">{{ $t('menuitems.dashboard') }}</h2>
          </router-link>
            <router-link v-if="!isLoggedIn" to="/login" class="lg:mr-8">
                <h2 class="p-4 text-gray-700 rounded-lg hover:bg-gray-300">{{ $t('menuitems.login') }}</h2>
            </router-link>
            <div v-if="isLoggedIn" class="lg:mr-8">
                <button @click.prevent="logout" class="p-4 text-gray-700 rounded-lg hover:bg-gray-300 align-middle">
                    {{ $t('menuitems.logout') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import i18n from '@/plugins/i18n';

    let token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

    export default {
        data() {    
            return {   
            languages: [            
                { flag: 'us', language: 'en', title: 'English' }, 
                { flag: 'nl', language: 'nl', title: 'Nederlands' }       
            ]
            };
        },
        name: "Nav",
        computed: {
            isLoggedIn() {
                return this.$store.getters.isLoggedIn;
            },
            role(){
                if(this.isLoggedIn)
                {
                    return localStorage.getItem('role_id');
                }
                else { return 0; }
            }
        },
        methods: {
            
            // logout() {
            //     this.$store.dispatch('currentUser/logout')
            //     this.$router.push('/login')
            // }
            changeLocale(locale) {
                i18n.locale = locale; 
            },
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/login')

                    })
            }
        }
    }
</script>

<style scoped>

</style>
