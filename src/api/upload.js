import request from '../router/axios.js';
export default function customUpload (obj) {
    const { action, data, file, filename, headers, onError, onSuccess } = obj;
    const formData = new FormData();
    const { url } = data;
    formData.append(filename, file);
    // formData.append("url", url);
    request({
        url: action,
        method: 'post',
        headers:{'Content-Type': 'multipart/form-data'},
        formData,
      })
    // post(action, formData, {
    //   'Content-Type': 'multipart/form-data',
    //   ...headers,
    // })
    . then(res => {
      const { obj, code, msg } = res;
      // console.log(obj);
      if (code === 200) {
        onSuccess(obj);
      } else {
        onError({ event: new Error(msg), body: res });
      }
    });
  }