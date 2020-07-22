import request from './request.js';

const api = {}
//const PORT1 = 'baseinfo'
// 注册获取验证码
//api.register = params => request.globalRequest(`${PORT1}/mobile/signUp`, 'GET //必须大写，为了兼容其他应用', params, 1)

//登录
api.login = params => request.globalRequest('/login', 'POST', params);

//设置自己的学校
// api.setSchool = params => request.globalRequest('/set_school', 'POST', params);

//获取图片验证码
// api.getVerifyCode = params => request.globalRequest('/set_school/verify_code', 'GET', params);
//设置当前周
// api.setCurWeek = params => request.globalRequest('/set_course/cur_week', 'POST', params);
//获取图片验证码
//api.getVerifyCode = params => request.globalRequest('/set_school/verify_code', 'GET', params);


//								-----全局-----
//图片上传
api.uploadImg = params => request.globalRequest('/upload/image', 'POST', params);
//获取学校列表
api.getSchoolList = params => request.globalRequest('/get_schools', 'POST', params);
//获取评论列表
api.getComment = params => request.globalRequest('/get/comment', 'GET', params);
//点赞
api.digg = params => request.globalRequest('/digg', 'POST', params);
//发布评论
api.createMessage = params => request.globalRequest('/create/message', 'POST', params);


// 								-----首页-----
//获取当前课程表
api.getCurrentCourse = params => request.globalRequest('/get_course/current', 'GET', params);
//获取第week周的课程表
api.getWeekCourse = params => request.globalRequest('/get_course/by_week', 'GET', params);
//获取tag标签
api.getTag = params => request.globalRequest('/get_tag', 'GET', params);


//  							-----动态-----
//发布动态
api.createMessage = params => request.globalRequest('/create/message', 'POST', params);
//获取全部动态
api.getSelfMessage = params => request.globalRequest('/get/self_message', 'GET', params);
//获取全部动态
api.getMessage = params => request.globalRequest('/get/message', 'GET', params);
//获取热门动态
api.getHotMessage = params => request.globalRequest('/get/hot_message', 'GET', params);
//获取自己动态
api.getUserMessage = params => request.globalRequest('/get/user_message', 'GET', params);


// 								 -----寄卖-----
//创建二手商品
api.createSecondHand = params => request.globalRequest('/create/second_hand', 'POST', params);
//获取自己的二手商品
api.getSelfSecondHand = params => request.globalRequest('/get/self_second_hand', 'GET', params);




export default api;