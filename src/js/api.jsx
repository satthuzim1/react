import Cookies from 'js-cookie';
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const domain = isLocal
  ? 'http://localhost:3000/api/'
  : 'http://192.168.1.35:3000/api/';
// const domain = "http://192.168.1.32:3000/api/";
// const domain = "http://localhost:3000/api/";

export const getProduct = {
  url: domain + 'product',
  method: 'GET',
  auth: false
};
export const putProduct = {
  url: domain + 'product',
  method: 'PUT',
  auth: false
};
export const postLogin = {
  url: domain + 'login',
  method: 'POST',
  auth: false
}
export const getCategories = {
  url: domain + 'category',
  method: 'GET',
  auth: false
}
export const postProduct = {
  url: domain + 'product',
  method: 'POST',
  auth: true
};
export const getProductWithToken = {
  url: domain + 'product',
  method: 'GET',
  auth: true
};
export const apiDeleteProduct = {
  url: domain + 'product',
  method: 'DELETE',
  auth: true
};
export const apiUpload = {
  url: domain + 'upload',
  method: 'POST',
  auth: true
};
export const excell = {
  url: domain + 'excel',
  method: 'GET',
  auth: false
};
export const postExcel = {
  url: domain + 'excel',
  method: 'POST',
  auth: false
};
export const apiGetCities = {
  url: domain + 'cities',
  method: 'GET',
  auth: false
};
export const apiGetDistrict = {
  url: domain + 'districts',
  method: 'GET',
  auth: false
};
export const apiPostWard = {
  url: domain + 'wards',
  method: 'POST',
  auth: false
};
export const apiGetWard = {
  url: domain + 'wards',
  method: 'GET',
  auth: false
};
export const apiPostOrder = {
  url: domain + 'order',
  method: 'POST',
  auth: false
};
export const apiGetSellerOrder = {
  url: domain + 'order',
  method: 'GET',
  auth: true
}
export const apiUpdateOrderItemState = {
  url: domain + 'order-item',
  method: 'PUT',
  auth: true
}

export const apiGetLabel = {
  url: domain + 'label',
  method: 'GET',
  auth: true
}

export const apiGetKeyWord = {
  url: domain + 'search',
  method: 'GET',
  auth: false
}
export const apiUploadBulkImg = {
  url: domain + 'upload-img',
  method: 'POST',
  auth: false
}
export const apiGetTag = {
  url: domain + 'ai-tag',
  method: 'GET',
  auth: false
}
export const apiPostViTag = {
  url: domain + 'ai-tag',
  method: 'POST',
  auth: false
}
export const apiGetImg = {
  url: domain + 'img-train',
  method: 'GET',
  auth: false
}

export const callApi = (api, data, params) => {
  let token = '';
  return new Promise(async (resolve, reject) => {
    try {
      if (api.auth) {
        token = Cookies.get('user');
        token = JSON.parse(token).token
      }
      let response = await fetch(api.url + params, {
        method: api.method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': api.auth ? 'Bearer ' + token : null

        },
        body: data ? JSON.stringify(data) : null
      });
      if (!response.ok) {
        throw new Error('Lỗi kết nối!?!');
      }
      resolve(response.json());
    } catch (err) {
      reject(err)
    }
  })
}

export const callApiFormData = (api, data, params) => {
  let token = '';
  return new Promise(async (resolve, reject) => {
    try {
      if (api.auth) {
        token = Cookies.get('user');
        token = JSON.parse(token).token
      }
      let response = await fetch(api.url + params, {
        method: api.method,
        headers: {
          'Authorization': api.auth ? 'Bearer ' + token : null
        },
        body: data
      });
      if (!response.ok) {
        throw new Error('Lỗi kết nối!?!');
      }
      resolve(response.json());
    } catch (err) {
      reject(err)
    }
  })
}
