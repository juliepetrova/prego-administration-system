import axios from 'axios'

const state = {
    user: {}
};
const getters = {};
const actions = {
    // eslint-disable-next-line no-empty-pattern
    loginUser( {}, user){
        axios.post("http://localhost:8000/api/login",{
            email: user.email,
            password: user.password,
            password_confirmation: user.password
        }).then(response => {
            console.log(response.data)
            if(response.data.token){
                //save token
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user_id', response.data.user.id)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            }
        })
    },
    logout(){
        axios.post('http://localhost:8000/api/logout')
        return new Promise((resolve) => {
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
};
const mutations = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    axios
}

