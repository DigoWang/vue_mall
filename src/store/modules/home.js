import {getBanner, getGoods} from '@/utils/api'
const state = {
    banner: [],
    goodsList: []
}

const actions = {
    async getBanner(miniStore) {
        const result = await getBanner();
        if(result.status === 200) {
            miniStore.commit('GETBANNER', result.data)
        }
    },
    async getGoods(miniStore) {
        const result = await getGoods();
        if(result.status === 200) {
            miniStore.commit('GETGOODS', result.data)
        }
    },
    
}

const mutations = {
    GETBANNER(state, banner) {
        state.banner = banner
    },
    GETGOODS(state, goods) {
        state.goodsList = goods
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}