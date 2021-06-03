import axios from "./ajax";
// 发送 POST 请求， 返回登录的验证状态码
export const login = function(username, password) {
  return axios({
    method: "POST",
    url: "/login",
    data: {
      username,
      password,
    },
  });
};

export const register = function(username, password, id) {
  return axios({
    method: 'POST',
    url: '/register',
    data: {
      username,
      password,
      id
    }
  });
};

export const getBanner = function() {
  return axios({
    method: 'GET',
    url: '/banner',
  });
};

export const getGoods = function() {
  return axios({
    method: 'GET',
    url: '/goods',
  });
};

export const getSearchGoods = function(params) {
  return axios({
    method: 'GET',
    url: `/goods/${params}`,
  });
};

export const getGoodDetail = function(skuId) {
  return axios({
    method: 'GET',
    url: `/detail/${skuId}`
  })
}

export const addCart = function(skuId, userId) {
  return axios({
    method: 'POST',
    url: `/cart/addToCart/${skuId}`,
    data: {
      userId
    }
  })
}

export const getUserInfo = function(token) {
  return axios({
    method: 'POST',
    url: '/login',
    data: {
      id: token
    }
  })
}

export const getCart = function() {
  return axios({
    method: 'GET',
    url: '/getCart',
  })
}

export const checkOneCart = function(skuId, isChecked) {
  return axios({
    method: 'GET',
    url:  `/checkOneCart/${skuId}/${isChecked}`,
  })
}

export const checkAllCart = function(isChecked) {
  return axios({
    method: 'GET',
    url:  `/checkAllCart/${isChecked}`,
  })
}

export const changeSkuNum = function(skuId, skuNum) {
  return axios({
    method: 'GET',
    url:  `/changeSkuNum/${skuId}/${skuNum}`,
  })
}

export const deleteOneCart = function(skuId) {
  return axios({
    method: 'DELETE',
    url:  `/deleteOneCart/${skuId}`,
  })
}