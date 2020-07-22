import urlConfig from './config.js';

const request = {};
let headers = {
	'content-type': 'application/x-www-form-urlencoded'
};
const PORT1 = '/baseinfo';

request.globalRequest = (url, method, data, dataType) => {
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
== 不通过access_token校验的接口
== 文件下载接口列表
== 验证码登录 */
    // switch (power){
    //     case 1:
    //         headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
    //         break;
    //     case 2:
    //         headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
    //         break;
    //     case 3:
    //         responseType = 'blob'
    //         break;
    //     default:
    //         headers['Authorization'] = `Bearer ${
    //             this.$store.getters.userInfo
    //         }`
    //         headers['TENANT-ID'] = this.$store.getters.userInfo.tenant_id
    //         break;
    // }
   //          if(method === "POST"){
			// 	headers = {
			// 		'content-type': 'application/x-www-form-urlencoded',
			// 		//'content-type': 'multipart/form-data'
			// 	}
			// } else {
			// 	headers = {};
			// }
			const openid = uni.getStorageSync("openid") || '';
			const sessionKey = uni.getStorageSync("sessionKey") || '';
			if(url != '/login'){
				headers['cookie'] = 'session=' + sessionKey +';openid=' + openid;
				console.log(headers['cookie'], "cookie")
			}
			console.log(data, "params")
    return uni.request({
        url: urlConfig + url,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
       if (res[1].statusCode === 200 && res[1].data.status_code === 0) {
           return res[1].data;
       } else {
           throw res[1].data;
       }
    }).catch(parmas => {
		  console.log(parmas, "catch")
　　　　　　switch (parmas.status_code) {
　　　　　　　　case 10001:
// 　　　　　　　　　 uni.clearStorageSync();
				uni.reLaunch({
					url: '/pages/auth'
				});
　　　　　　　　　　break;
　　　　　　　　default:
　　　　　　　　　　uni.showToast({
　　　　　　　　　　　　title: parmas.message,
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　})
　　　　　　　　　　return Promise.reject()
　　　　　　　　　　break
　　　　　　}
　　})
 } 

export default request