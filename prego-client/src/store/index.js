import Vue from 'vue'
import Vuex from 'vuex'
import currentUser from './modules/currentUser'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user: state => state.user
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token, user){
            state.status = 'success'
            state.token = token
            state.user = user
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'http://localhost:8000/api/login', data: user, method: 'POST' })
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp.data.user
                        localStorage.setItem('token', token)
                        localStorage.setItem('user', user)
                        localStorage.setItem('user_id', user.id)
                        localStorage.setItem('role_id', user.role_id)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        commit('auth_success', token, user)
                        resolve(resp)
                        console.log(user);
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        localStorage.removeItem('user_id')
                        localStorage.removeItem('role_id')
                        reject(err)
                    })
            })
        },
        logout({commit}){
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('user_id')
                localStorage.removeItem('role_id')
                localStorage.removeItem('company_id')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        }
    },
    modules: {
        currentUser: currentUser
    }
})
