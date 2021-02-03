<template>
  <div>

    <div class="flex justify-center text-center">
      <div class="m-12 w-1/3">
        <h2></h2>
        <div class="below-title links">
          <span>You are logged in as the admin of this website!</span>
        </div>
      </div>
    </div>

    <CRUDBuildingOwner v-bind:building_owners="building_owners"></CRUDBuildingOwner>
  </div>
</template>

<script>
import CRUDBuildingOwner from "@/components/admin/CRUDBuildingOwner";
import axios from "axios";

export default {
  name: 'DashboardAdmin',
  components: {
    CRUDBuildingOwner
  },
  data(){
    return {
      user: localStorage.getItem('user'),
      building_owners: []
    }
  },
  created() {
    axios.get('http://localhost:8000/api/building_owner')
        .then(response => {
          this.building_owners = response.data
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
