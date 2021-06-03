import { getGoodDetail, addCart } from "@/utils/api"

const state = {
    
}

const actions = {
    async addCart({commit}, info) {
        const result = await addCart(info.skuId, info.userId);
        if(result.status === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    }
}

const mutations = {

}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}