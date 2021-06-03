import { getGoodDetail } from "@/utils/api"

const state = {
    goodDetail: null
}

const actions = {
    async getGoodDetail({commit}, skuId) {
        const result = await getGoodDetail(skuId);
        if(result.status === 200) {
            commit('SET_GOODDETAIL', result.data)
        }
    }
}

const mutations = {
    SET_GOODDETAIL(state, value) {
        state.goodDetail = value
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}