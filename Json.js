// 首页轮播图
const swipperList = [{
	url: '../../static/img/mine.jpeg'
},{
	url: '../../static/img/mine.jpeg'
},{
	url: '../../static/img/mine.jpeg'
}]

// 首页课程表
const courseList = {
	"status_code":0,
	"message":"success",
	"alert_message":"",
	"school_name":"北京大学",
	"week":1,
	"courses":[
		{"week_num":1,"class_num":1,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":1,"class_num":2,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":2,"class_num":3,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":2,"class_num":4,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":3,"class_num":1,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":3,"class_num":4,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":4,"class_num":5,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":4,"class_num":6,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":4,"class_num":3,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":5,"class_num":1,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":6,"class_num":1,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":7,"class_num":1,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
	],
}

//课程列表
const courseListTwo = {
	"status_code":0,
	"message":"success",
	"alert_message":"",
	"school_name":"北京大学",
	"week":1,
	"courses":[
		{"week_num":1,"class_num":1,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":1,"class_num":2,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":2,"class_num":3,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":2,"class_num":4,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":3,"class_num":1,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":3,"class_num":4,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":4,"class_num":5,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":4,"class_num":6,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":4,"class_num":3,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":5,"class_num":1,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":6,"class_num":1,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
		{"week_num":7,"class_num":1,"course_name":"高等数学","teacher_name":"张翠芳","place":"1号楼B432"},
	],
}

//动态列表
const dynamicList = {"status_code":0,
"message":"success",
"message_infos":[
	{
	"message_id":17,
	"content":"",
	"nickname": "手里的老干妈突然不香了",
	"school": "北京大学",
	"sex": "男",
	"good1": "23",
	"good1": "232",
	"avator": "https://cmyk-so.com/source/image/origin/00000000003d.png",
	"urls":[
		"https://cmyk-so.com/source/image/origin/00000000003c.png",
		"https://cmyk-so.com/source/image/origin/00000000003d.png",
		"https://cmyk-so.com/source/image/origin/00000000003e.png",
		"https://cmyk-so.com/source/image/origin/00000000003f.png"],
	"create_time":1592133236,
	},
	{
		"message_id":16,
		"nickname": "哈哈哈",
		"content":"动态动态",
		"school": "河北科技大学",
		"sex": "男",
		"good1": "23",
		"good2": "232",
		"avator": "https://cmyk-so.com/source/image/origin/00000000003f.png",
		"urls":["https://cmyk-so.com/source/image/origin/000000000039.png","https://cmyk-so.com/source/image/origin/00000000003a.png","https://cmyk-so.com/source/image/origin/00000000003b.png"],"create_time":1592133051},
	{
		"message_id":15,
		"content":"动态动态",
		"nickname": "大鱼",
		"school": "成都理工大学",
		"sex": "女",
		"good1": "23",
		"good2": "232",
		"avator": "https://cmyk-so.com/source/image/origin/000000000039.png",
		"urls":["https://cmyk-so.com/source/image/origin/000000000039.png","https://cmyk-so.com/source/image/origin/00000000003a.png","https://cmyk-so.com/source/image/origin/00000000003b.png"],"create_time":1592133037},
	{
		"message_id":14,
		"content":"哈哈",
		"nickname": "丑小鸭",
		"school": "中国地质大学",
		"sex": "男",
		"good1": "23",
		"good2": "232",
		"avator": "https://cmyk-so.com/source/image/origin/000000000038.png",
		"urls":["https://cmyk-so.com/source/image/origin/000000000038.png"],"create_time":1592132783}],"count":0,"has_more":false}

//动态详情
const dynamicDetail = {
	"message_id":17,
	"content":"",
	"nickname": "手里的老干妈突然不香了",
	"school": "北京大学",
	"sex": "男",
	"good1": "23",
	"good1": "232",
	
	"avator" : "https://cmyk-so.com/source/image/origin/00000000003d.png",
	"urls":[
		"https://cmyk-so.com/source/image/origin/00000000003c.png",
		"https://cmyk-so.com/source/image/origin/00000000003d.png",
		"https://cmyk-so.com/source/image/origin/00000000003e.png",
		"https://cmyk-so.com/source/image/origin/00000000003f.png"],
	"create_time":"2020-07-10",
	"content": "这里是商品描述描述啊这里是商品描述描述啊这里是商品描述描述啊这里是商品描述描述啊这里是商品描述描述啊这里是商品描述描述啊"
};
//委托列表
const wtList = [
	{
		url: '../../../static/img/mine.jpeg',
		user_name :'小火柴',
		sex: 1,
		creat_time: '2019-09-10',
		school: '广州科技职业技术大学2018级',
		title: '其他任务',
		money: '3',
		content: '区域快线上使命，需要声扽这个木在诸多互动的。区域快线上使命，需要声扽这个木在诸多互动的区域快线上使命，需要声扽这个木在诸多互动的区域快线上使命，需要声扽这个木在诸多互动的',
		good1: 23,
		good2: 24,
		good3: 25,
		status:1
		
	},
	{
		url: '../../../static/img/mine.jpeg',
		user_name :'小火柴',
		sex: 1,
		creat_time: '2019-09-10',
		school: '广州科技职业技术大学2018级',
		title: '其他任务',
		money: '3',
		content: '区域快线上使命，需要声扽这个木在诸多互动的。区域快线上使命，需要声扽这个木在诸多互动的区域快线上使命，需要声扽这个木在诸多互动的区域快线上使命，需要声扽这个木在诸多互动的',
		good1: 23,
		good2: 24,
		good3: 25,
		status:2
		
	}
];
//委托详情
const entrustDetail = {
	nick_name :'小火柴',
	creat_time: '2019-09-10',
	content: '区域快线上使命，需要声扽这个木在诸多互动的。区域快线上使命，需要声扽这个木在诸多互动的区域快线上使命，需要声扽这个木在诸多互动的区域快线上使命，需要声扽这个木在诸多互动的',
	user_name: '王五',
	phone: '182*****099',
	money: '3.5',
	status: 1,
	
	
}
//评价列表
const reviewList = [{
	url: '../../../static/img/mine.jpeg',
	user_name :'小火柴',
	sex: 1,
	creat_time: '2019-09-10',
	school: '广州科技职业技术大学2018级',
	title: '其他任务',
	money: '3',
	content: '区域快线上使命，需要声扽这个木在诸多互动的。区域快线上使命，需要声扽这个木在诸多互动的区域快线上使命，需要声扽这个木在诸多互动的区域快线上使命，需要声扽这个木在诸多互动的',
	good1: 23,
	good2: 24,
	good3: 25,
	status:1
}]
//课程列表
const scheduleList ={
	status_code: 0,
	courses: [
		{
			week_num: 1,
			class_num: 2,
			course_name: '啦啦',
			place: '502'
		},
		{
			week_num: 1,
			class_num: 3,
			course_name: '啦啦',
			place: '502'
		},{
			week_num: 1,
			class_num: 5,
			course_name: '哦哦',
			place: '502'
		},{
			week_num: 3,
			class_num: 6,
			course_name: '哦哦',
			place: '502'
		},{
			week_num: 4,
			class_num: 2,
			course_name: '啊一',
			place: '502'
		},{
			week_num: 5,
			class_num: 1,
			course_name: '啊一',
			place: '502'
		}
	],
	message: ''
} 
//寄卖/二手商品列表
const productList = [];
/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: 'Leo yo',
		portrait: 'http://img.61ef.cn/news/201409/28/2014092805595807.jpg'
	},
	msg: '提示'
}
/* 首页轮播图 */
const carouselList = [{
		src: "/static/temp/banner3.jpg",
		background: "rgb(203, 87, 60)",
	},
	{
		src: "/static/temp/banner2.jpg",
		background: "rgb(205, 215, 218)",
	},
	{
		src: "/static/temp/banner4.jpg",
		background: "rgb(183, 73, 69)",
	}
]
/* 商品列表 */
const goodsList = [{
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
		image2: "http://pic.rmb.bdstatic.com/819a044daa66718c2c40a48c1ba971e6.jpeg",
		image3: "http://img001.hc360.cn/y5/M00/1B/45/wKhQUVYFE0uEZ7zVAAAAAMj3H1w418.jpg",
		title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
		price: 179,
		sales: 61,
	},
	{
		image: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554013048&di=a3dc9fd1406dd7bad7fbb97b5489ec04&imgtype=jpg&er=1&src=http%3A%2F%2Fimg009.hc360.cn%2Fhb%2FnKo44ac2656F831c684507E3Da0E3a26841.jpg",
		image3: "http://img.zcool.cn/community/017a4e58b4eab6a801219c77084373.jpg",
		title: "潘歌针织连衣裙",
		price: 78,
		sales: 16,
	},
	{
		image: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg",
		image2: "http://m.360buyimg.com/n12/jfs/t247/42/1078640382/162559/3628a0b/53f5ad09N0dd79894.jpg%21q70.jpg",
		image3: "http://ikids.61kids.com.cn/upload/2018-12-29/1546070626796114.jpg",
		title: "巧谷2019春夏季新品新款女装",
		price: 108.8,
		sales: 5,
	}, {
		image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=756705744,3505936868&fm=11&gp=0.jpg",
		image2: "http://images.jaadee.com/images/201702/goods_img/30150_d85aed83521.jpg",
		image3: "http://img13.360buyimg.com/popWaterMark/jfs/t865/120/206320620/138889/dcc94caa/550acedcN613e2a9d.jpg",
		title: "私萱连衣裙",
		price: 265,
		sales: 88,
	}, {
		image: "https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg",
		image2: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553418265666&di=d4a7f7eb0ae3c859edeb921641ee1c3a&imgtype=0&src=http%3A%2F%2Fimg003.hc360.cn%2Fy3%2FM02%2FF8%2F9F%2FwKhQh1TuSkGELIlQAAAAAPuLl4M987.jpg",
		image3: "http://img.ef43.com.cn/product/2016/8/05100204b0c.jpg",
		title: "娇诗茹 ulzzang原宿风学生潮韩版春夏短",
		price: 422,
		sales: 137,
	}, {
		image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg",
		image2: "http://image5.suning.cn/uimg/b2c/newcatentries/0070158827-000000000622091973_2_800x800.jpg",
		image3: "http://img.61ef.cn/news/201903/20/2019032009251784.jpg",
		title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
		price: 179,
		sales: 95,
	},
]

//详情展示页面
const detailData = {
	title: '纯种金毛幼犬活体有血统证书',
	title2: '拆家小能手 你值得拥有',
	favorite: true,
	imgList: [{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
		},
		{
			src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
		},
		{
			src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
		},
	],
	episodeList: [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
	],
	guessList: [{
			src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg',
			title: '猫眼指甲油',
			title2: '独树一帜的免照灯猫眼指甲'
		},
		{
			src: 'http://m.china-7.net/uploads/14778449362891.jpg',
			title: '创意屋',
			title2: '创意屋形上下双层高低床'
		},
		{
			src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg',
			title: 'MissCandy 指甲油',
			title2: '十分适合喜欢素净的妹纸，尽显淡雅的气质'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2108933440,2194129200&fm=214&gp=0.jpg	',
			title: 'RMK 2017星空海蓝唇釉',
			title2: '唇釉质地，上唇后很滋润。少女也会心动的蓝色，透明液体形状。'
		}
	],
	evaList: [{
			src: 'http://gss0.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/77c6a7efce1b9d1663174705fbdeb48f8d546486.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '评论不要太苛刻，不管什么产品都会有瑕疵，客服也说了可以退货并且商家承担运费，我觉得至少态度就可以给五星。'
		},
		{
			src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg',
			nickname: 'Ranth Allngal',
			time: '09-20 12:54',
			zan: '54',
			content: '楼上说的好有道理。'
		}
	]
}
const shareList = [{
		type: 1,
		icon: '/static/temp/share_wechat.png',
		text: '微信好友'
	},
	{
		type: 2,
		icon: '/static/temp/share_moment.png',
		text: '朋友圈'
	},
	{
		type: 3,
		icon: '/static/temp/share_qq.png',
		text: 'QQ好友'
	},
	{
		type: 4,
		icon: '/static/temp/share_qqzone.png',
		text: 'QQ空间'
	}
]
const lazyLoadList = [{
		src: 'http://img0.imgtn.bdimg.com/it/u=2396068252,4277062836&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/itbbs/1309/06/c4/25310541_1378426131583.jpg'
	},
	{
		src: 'http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1610/26/c4/28926240_1477451226577_mthumb.jpg'
	},
	{
		src: 'http://picture.ik123.com/uploads/allimg/190219/12-1Z219105139.jpg'
	},
	{
		src: 'http://img5.imgtn.bdimg.com/it/u=2904900134,438461613&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img1.imgtn.bdimg.com/it/u=1690475408,2565370337&fm=26&gp=0.jpg'
	},
	{
		src: 'http://img.99114.com/group1/M00/7F/99/wKgGS1kVrPGAe5LmAAU2KrJmb3Q923_600_600.jpg'
	},
	{
		src: 'http://img4.imgtn.bdimg.com/it/u=261047209,372231813&fm=26&gp=0.jpg'
	},
	{
		src: 'http://i2.17173cdn.com/i7mz64/YWxqaGBf/tu17173com/20150107/eMyVMObjlbcvDEv.jpg'
	},
	{
		src: 'http://img008.hc360.cn/m4/M02/E7/87/wKhQ6FSrfU6EfUoyAAAAAITAfyc280.jpg'
	},
	{
		src: 'http://pic1.win4000.com/wallpaper/d/5991569950166.jpg'
	},
	{
		src: 'http://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/6f061d950a7b0208f9fe945e60d9f2d3572cc85e.jpg'
	},
	{
		src: 'http://pic41.nipic.com/20140429/18169759_125841756000_2.jpg'
	},
	{
		src: 'http://www.k73.com/up/allimg/130415/22-130415093527.jpg'
	},
	{
		src: 'http://img.52z.com/upload/news/image/20180530/20180530081619_31029.jpg'
	},
	{
		src: 'http://b-ssl.duitang.com/uploads/item/201410/02/20141002111638_tXAzU.jpeg'
	},
	{
		src: 'http://img2.ph.126.net/C4JW6f57QWSB21-8jh2UGQ==/1762596304262286698.jpg'
	},
	{
		src: 'http://att.bbs.duowan.com/forum/201405/17/190257nzcvkkdg6w2e8226.jpg'
	},
	{
		src: 'http://attach.bbs.miui.com/forum/201504/10/223644v3intigyvva0vgym.jpg'
	},
	{
		src: 'http://pic1.win4000.com/mobile/3/57888a298d61d.jpg'
	},
]

const orderList = [{
		time: '2019-04-06 11:37',
		state: 1,
		url: "../../static/img/mine.jpeg",
		school: "河北大学",
		good1: "98",
		good2: "34",
		content: "这里是商品描述的额滴 额我们的的的额的额滴  额我们的的的额的额滴 额我们的的的额的额滴 额",
		goodsList: [{
				image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553187020783&di=bac9dd78b36fd984502d404d231011c0&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201609%2F26%2F20160926173213_s5adi.jpeg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
			},
			{
				image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
			}
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 9,
		url: "https://img.alicdn.com/imgextra/i2/1069876356/TB2ocTQG4WYBuNjy1zkXXXGGpXa_!!1069876356.jpg_430x430q90.jpg",
		school: "北京大学",
		good1: "98",
		good2: "34",
		content: "这里是商品描述的额滴 额我们的的的额的额滴  额我们的的的额的额滴 额我们的的的额的额滴 额",
		goodsList: [{
			title: '古黛妃 短袖t恤女 春夏装2019新款韩版宽松',
			price: 179.5,
			image: 'https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg',
			number: 1,
			attr: '珊瑚粉 M'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		url: "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg",
		school: "河北北方学院",
		good1: "98",
		good2: "34",
		content: "这里是商品描述的额滴 额我们的的的额的额滴  额我们的的的额的额滴 额我们的的的额的额滴 额",
		goodsList: [
			{
				image: 'https://img.alicdn.com/imgextra/i2/1069876356/TB2ocTQG4WYBuNjy1zkXXXGGpXa_!!1069876356.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		url: "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg",
		school: "河北北方学院",
		good1: "98",
		good2: "34",
		content: "这里是商品描述的额滴 额我们的的的额的额滴  额我们的的的额的额滴 额我们的的的额的额滴 额",
		
		goodsList: [{
			title: '回力女鞋高帮帆布鞋女学生韩版鞋子女2019潮鞋女鞋新款春季板鞋女',
			price: 69,
			image: 'https://img.alicdn.com/imgextra/i3/2128794607/TB2gzzoc41YBuNjy1zcXXbNcXXa_!!2128794607.jpg_430x430q90.jpg',
			number: 1,
			attr: '白色-高帮 39'
		}]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		url: "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg",
		school: "河北北方学院",
		good1: "98",
		good2: "34",
		content: "这里是商品描述的额滴 额我们的的的额的额滴  额我们的的的额的额滴 额我们的的的额的额滴 额",
		
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/3358098495/O1CN01dhYyid2Ccl5MWLDok_!!3358098495.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i3/3358098495/O1CN01AWsnFA2Ccl5OzvqsL_!!3358098495.jpg_430x430q90.jpg',
			},
		]
	},
	{
		time: '2019-04-06 11:37',
		state: 1,
		url: "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i4/2120460599/O1CN01YsmgwZ1GINkv38rkn_!!2120460599.jpg_430x430q90.jpg",
		school: "河北北方学院",
		good1: "98",
		good2: "34",
		content: "这里是商品描述的额滴 额我们的的的额的额滴  额我们的的的额的额滴 额我们的的的额的额滴 额",
		
		goodsList: [{
				image: 'https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg',
			},
			{
				image: 'https://img.alicdn.com/imgextra/i3/2888462616/O1CN01ERra5J1VCAbZaKI5n_!!0-item_pic.jpg_430x430q90.jpg',
			},
			{
				image: 'https://gd3.alicdn.com/imgextra/i3/819381730/O1CN01YV4mXj1OeNhQIhQlh_!!819381730.jpg_400x400.jpg',
			},
		]
	}

]
export {
	carouselList,
	detailData,
	lazyLoadList,
	userInfo,
	shareList,
	goodsList,
	
	//模拟数据
	swipperList,
	courseList,
	courseListTwo,
	dynamicList,
	dynamicDetail,
	wtList,
	productList,
	orderList,
	reviewList,
	entrustDetail,
	scheduleList,
	
}
