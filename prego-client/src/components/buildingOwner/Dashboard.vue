<template>
<div>

  <div class="flex justify-center text-center">
    <div class="m-12 w-1/3">
      <h2>{{  building_owner.building_name }} </h2>
      <div class="below-title links">
        <span>Building manager: {{building_owner.first_name}} {{building_owner.last_name}}</span>
      </div>
    </div>
  </div>

  <CRUDCompany></CRUDCompany>
</div>
</template>

<script>
import CRUDCompany from '@/components/buildingOwner/CRUDCompany'
import axios from "axios";

export default {
  name: 'DashboardBuildingOwner',
  components: {
    CRUDCompany
  },
data(){
    return {
      user: localStorage.getItem('user'),
      building_owner: '',
      companies: []
    }
},
  created() {
    axios.get('http://localhost:8000/api/' + localStorage.getItem('user_id') + '/companies')
            .then(response => {
              this.companies = response.data
            })
            .catch(error => {
              console.log(error.message);
            })
    axios.get('http://localhost:8000/api/building_owner/' + localStorage.getItem('user_id'))
        .then(response => {
          this.building_owner = response.data[0]
        })
        .catch(error => {
          console.log(error.message);
        })
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


h2 {
  font-size: 35px;
  line-height: 1.4em;
}
</style>
