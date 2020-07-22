<template>
	<view class="content">
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" 
					:circular="circular"
					:indicator-dots="indicatorDots" 
					:autoplay="autoplay" 
					:interval="interval" 
					:duration="duration">
						<swiper-item class="swiper-item" v-for="(item,k) in swipperList" :key="k">
							<image :src="item.url" mode="scaleToFill" ></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="image_list_wrap">
			<view @click="goToPage(1)">
				<image src="../../static/img/index_school.png" mode="scaleToFill"></image>
				<view>第二大学</view>
			</view>
			<view @click="goToPage(2)">
				<image src="../../static/img/index_entrust.png" mode="scaleToFill"></image>
				<view>委托</view>
			</view>
			<view @click="goToPage(3)">
				<image src="../../static/img/index_grade.png" mode="scaleToFill"></image>
				<view>成绩查询</view>
			</view>
			<view @click="goToPage(4)">
				<image src="../../static/img/index_qrcode.png" mode="scaleToFill"></image>
				<view>二维码</view>
			</view>
		</view>
		
		<view class="curriculum_list_wrap">
			<view class="tip_info" v-if="dataList.length>0" @click="goToPage(5)">
				<view class="tip_info_left">
					<image src="../../static/img/tip.png"></image>
					<text>{{weekNum}}</text>
					<text>第{{week}}周</text>
				</view>
				<view class="tip_info_right">
					<text v-text="totalCourse()"></text>
				</view>
			</view>
			<template v-for="(v, k) in dataList">
				<view class="curriculum_list"  :key="k" @click="goToPage(6)">
					<text v-if="v.class_num">{{v.class_num}}</text>
					<view class="curriculum_list_content">
						<view class="curriculum_content_info">
							<view>{{v.course_name}}</view>
							<view v-if="v.place" class="place">
								<image src="../../static/img/point.png" mode=""></image>
								{{v.place}}
							</view>
						</view>
						<text v-if="v.time">{{v.time}}</text>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
import {swipperList, courseList} from "../../Json.js";
export default {
	data() {
		return {
			circular: true,
			indicatorDots: false,
			autoplay: true,
			interval: 4000,
			duration: 800,
			swipperList: [],
			weekNum: '',
			week: '',
			schoolName: '',
			dataList: [],
			weekInd: 0
		};
	},
	onLoad() {
		console.log("======onLoad======");
		uni.stopPullDownRefresh();
		//获取轮播图
		//this.getSwipperList();
		//获取课程表
		this.loadData();
		
		// 模拟数据
		this.swipperList = swipperList;
	},
	onPullDownRefresh() {
		console.log("======onPullDownRefresh======");
		this.dataList = [];
		this.loadData();
		
		//模拟数据
		this.swipperList = swipperList;
	},
	onShow(){
		console.log("======onShow======")
		const page = this.$mp.page;
		if (typeof page.getTabBar === 'function' &&  
		    page.getTabBar()) {  
		    page.getTabBar().setData({  
		        current: 0
		    });
		}
	},
	methods: {
		getSwipperList(){
			this.$api.getMessage().then(res => {
				const {status_code, message, message_infos} = res;
				if(status_code === 0){
					this.swipperList = message_infos;
				} else {
					uni.showToast({
	　　　　　　　　　　　　title: message,
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　});
				};
			}).catch(res => {
				uni.showToast({
　　　　　　　　　　　　title: "网络异常，请稍后再试！",
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　});
			});
		},
		loadData() {
			const ind = new Date().getDay();
			const arr1 = [7,1,2,3,4,5,6];
			const arr2 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
			const numArr = ['','一', '二', '三', '四','五','六','七','八','九','十', '十一', '十二'];
			const weekNum = arr1[ind];
			this.weekNum = arr2[ind];
			uni.showLoading({
				title: '加载中...'
			});
			this.$api.getCurrentCourse().then(res => {
			   // 获得数据 
			   const {status_code, week, school_name, message, courses, alert_message} = res;
			   this.week = numArr[week];
			   this.weekInd = week;
			   this.schoolName = school_name;
			   this.dataList = [];
			   if(status_code === 0){
				   for(var i=0; i<courses.length; i++){
					   if(courses[i].week_num === weekNum){
						   this.dataList.push(courses[i]);
					   }
				    }
			   } else {
				   uni.showToast({
   　　　　　　　　　　　　title: message,
   　　　　　　　　　　　　icon: 'none'
   　　　　　　　　　　})
			   }
			}).catch(res => {
				uni.showToast({
　　　　　　　　　　　　title: "网络异常，请稍后再试！",
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　 });
			}).finally(()=>{
				uni.hideLoading();
			});
		},
		totalCourse(){
			const len = this.dataList.length;
			return  len>0? "今天共"+len+"门课" : '';
		},
		goToPage(type) {
			let url = '';
			switch(type) {
				case 1:
				url = '/pages/index/aboutBeat/index';
				break;
				case 2:
				url = '/pages/index/entrust/index';
				break;
				case 3:
				url = '/pages/index/score/scoreSheet';
				break;
				case 4:
				url = '/pages/index/qrCode/index';
				break;
				case 5:
				url = '/pages/index/classSchedule/scheduleList?week='+ this.weekInd + '&schoolName=' + this.schoolName;
				break;
				case 6:
				url = '/pages/index/classSchedule/scheduleCard';
				break;
				
			}
			uni.navigateTo({
				url: url
			});
		}
	}
};
</script>
	
<style scoped>
.content {
	text-align: center;
	box-sizing: border-box;
	/* height: 400upx; */
}

.uni-padding-wrap {
	padding: 40rpx 40rpx 0 40rpx;
	background-color: #FFFFFF;
}
.swiper{
	border-radius: 20rpx;
	overflow: hidden;
}

.swiper image {
	width: 100%;
	height: 100%;
}
.image_list_wrap {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 32rpx 60rpx;
	background-color: #FFFFFF;
}
.image_list_wrap > view {
	font-size: 24rpx;
	color: #3F3F3F;
	text-align: center;
}
.image_list_wrap > view image {
	width: 90rpx;
	height: 90rpx;
	border-radius: 32rpx;
	margin-bottom: 10rpx;
}
.curriculum_list_wrap {
	border-bottom: 10rpx solid #E6E6E6;
	padding: 24rpx 40rpx 0 40rpx;
	background-color: #FFFFFF;
}

/* tip */
.tip_info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	
}
.tip_info image {
	width: 56rpx;
	height: 56rpx;
	vertical-align: middle;
}
.tip_info_left text:nth-child(2) {
	font-size: 40rpx;
	padding: 0 16rpx;
}
.tip_info_left text:last-child {
	font-size: 28rpx;
}
.tip_info_right text:last-child {
	display: inline-block;
	font-size: 26rpx;
	line-height: 50rpx;
	color: #fff;
	padding: 0 20rpx;
	background-color: #C99590;
	border-radius: 28rpx;
	margin-left: 36rpx;
}
/* 课程 */
.curriculum_list {
	display: flex;
	align-items: center;
}
.curriculum_list > text {
	width: 80rpx;
}
.curriculum_list > view {
	flex: 1;
	text-align: left;
	border-bottom: 1px solid #EBEBEB;
}
.curriculum_list_content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;
}
.curriculum_list_content > text {
	/* width: 120rpx; */
	fons-size: 24rpx;
	padding-right: 26rpx;
}
.curriculum_content_info > view {
	font-size: 32rpx;
}
.curriculum_content_info > .place {
	font-size: 24rpx;
	color: #ACACAC;
}
.curriculum_content_info .iconfont {
	font-size: 24rpx;
	margin-right: 12rpx;
	
}
.curriculum_list_wrap .curriculum_list:last-child .curriculum_list_content {
	border-bottom: none;
}
.curriculum_list image {
	width: 26rpx;
	height: 26rpx;
	margin-right: 12rpx;
	vertical-align: middle;
}

</style>
