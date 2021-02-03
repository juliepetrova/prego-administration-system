<template>
    <div>
        <div class=" text-center justify-center m-32 mt-12">
            <div class="pb-4">
                <span class="links text-purple-500 underline">{{ $t('companiesHome.section') }} </span>
            </div>
            <h2> {{ $t('companiesHome.header') }} </h2>
            <div class="below-title links mt-3 w-1/3 mx-auto">
                <span>{{ $t('companiesHome.subheader') }} </span>
            </div>
        </div>
        <div class="flex flex-wrap justify-end mx-56 my-5">
            <div>
                <fieldset class="border-b border-black p-0 mr-5">
                    <input v-model="search" class="bg-transparent p-3 m-0 w-64 active:border-0 focus:outline-none" :placeholder="$t('companiesHome.searchbarContent')" >
                    <button class="float-right mr-2 pt-3"><i class="fas fa-search"></i></button>
                </fieldset>
            </div>
            <div class="sort px-2">
                <div class="dropdown inline-block relative">
                    <button class="bg-transparent text-purple-700 hover:bg-purple-500 font-semibold hover:text-white py-2 px-5 rounded inline-flex items-center border border-purple-500">
                        <span class="mr-1">{{ $t('companiesHome.sort.title') }}</span>
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                    </button>
                    <ul class="dropdown-menu absolute hidden text-purple-700 pt-1">
                        <li class=""><a class="rounded-t bg-purple-100 hover:bg-purple-300 py-2 px-4 block whitespace-no-wrap " href="#" @click="sortTable('company_name', 'asc')">{{ $t('companiesHome.sort.sortByNameAsc') }}</a></li>
                        <li class=""><a class="bg-purple-100 hover:bg-purple-300 py-2 px-4 block whitespace-no-wrap" href="#" @click="sortTable('company_name', 'desc')">{{ $t('companiesHome.sort.sortByNameDesc') }}</a></li>
                        <li class=""><a class="bg-purple-100 hover:bg-purple-300 py-2 px-4 block whitespace-no-wrap" href="#" @click="sortTable('office_number', 'asc')">{{ $t('companiesHome.sort.sortByBuildingNameAsc') }}</a></li>
                        <li class=""><a class="rounded-b bg-purple-100 hover:bg-purple-300 py-2 px-4 block whitespace-no-wrap" href="#" @click="sortTable('office_number', 'desc')">{{ $t('companiesHome.sort.sortByBuildingNameDesc') }}</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="flex flex-wrap justify-center items-center ml-20 mr-20">
            <CompanyCard v-for="company in pageOfItems" :key="company.id" :company="company"></CompanyCard>
        </div>
      <div class="card-footer flex flex-wrap justify-center items-center pb-0 pt-5">
        <jw-pagination :pageSize=12 :items="filteredList" :styles="customStyles" @changePage="onChangePage"></jw-pagination>
      </div>
        <section class="sticky bottom-0 ">
            <div class="search-section m-20 mx-0 bg-white p-5">
                <div class="flex justify-center">
                    <fieldset class="w-1/2 border-b border-black p-0">
                        <input v-model="search" class="bg-transparent p-3 m-0 w-3/4 active:border-0 focus:outline-none" :placeholder="$t('companiesHome.searchbarContent')" >
                        <button class="float-right mr-2 pt-3"><i class="fas fa-search"></i></button>
                    </fieldset>
                    <div class="w-1/6 search-button">
                        <button class="ml-12 p-3 px-12 border border-black hover:bg-black hover:text-white" @click="clearSearch()">{{ $t('companiesHome.viewAllCompanies') }}</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
  import axios from 'axios'
  import CompanyCard from './CompanyCard'

  const customStyles = {
    ul: {
    },
    li: {
      display: 'inline-block',
      // border: '1px solid gray',
    },
    a: {
      color: 'gray',
      transition: 'background-color .3s',
    }
  };
export default {
  name: "CompaniesHome",
  components: {
    CompanyCard,
  },
  data() {
    return {
      search: '',
      sort: '',
      companies: [],
      pageOfItems: [],
      customStyles
    }
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    sortTable(key, direction){
      this.sort = `${key} > ${direction}`
      if (direction === 'asc') {
        this.companies.sort((a, b) => a[key] > b[key] ? 1: -1)
      } else {
        this.companies.sort((a, b) => a[key] < b[key] ? 1: -1)
      }
    },
    clearSearch(){
      this.search = '';
    }
  },
  created() {
    axios.get('http://localhost:8000/companies')
    .then(response => {
      console.log(response.data)
      this.companies = response.data
    })
  },
  computed: {
    filteredList() {
        return this.companies.filter(company => {
          return company.company_name.toLowerCase().includes(this.search.toLowerCase())
        })

    }
  }
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

.dropdown:hover .dropdown-menu {
  display: block;
}

h2 {
  font-size: 35px;
  line-height: 1.4em;
}

.sort{
  z-index: 2;
  position: relative;
}
</style>
