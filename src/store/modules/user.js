import { getUserInfo } from "@/utils/api"

const state = {
    id: (JSON.parse(localStorage.getItem('user')) || {}).id,
    username: '',
    userInfo: []
}

const actions = {
    async getUserInfo({commit}, token) {
        const result = await getUserInfo(token);
        if(result.status === 200) {
            commit('SETUSERINFO', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    resetToken({commit}) {
        commit('RESETTOKEN')
    }
}

const mutations = {
    SETID(state, value) {
        state.id = value
    },
    SETNAME(state, value) {
        state.username = value
    },
    SETUSERINFO(state, value) {
        state.userInfo = value
    },
    RESETTOKEN() {
        localStorage.removeItem('token')
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}