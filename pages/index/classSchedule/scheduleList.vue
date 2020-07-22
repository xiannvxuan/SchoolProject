<template>
	<view>
		<view>
			<view class="top">
			  <view v-for="(item, k) in dateArr" :key='k' class="top-text">
					<text>周{{item.date}}</text>
					<text>周{{item.day}}</text>
			  </view>
			</view>
			<scroll-view scroll-y="true" class="scroll">
				<view style="height:1200rpx;width:730rpx;display:flex;">
					<view>
						<view class="left" style="position: fixed;top: 0;left: 0;z-index: 999;background: #FFFFFF">
							一月
						</view>
						<view v-for="(item1, k2) in list" :key="k2" class="left">
							{{item1}}
						</view>
					</view>
					<view v-for="(item, ind) in dataList" :key='ind'>
						<view class="flex-item kcb-item" 
						@click="goToPage('/pages/index/classSchedule/scheduleCard')"
						data-statu="open"
						:style="{
							marginLeft: (item.week_num-1)*100+'rpx',
							marginTop: (item.class_num-1)*100+5+'rpx',
							height: item.count*100 + 5 + 'rpx', 
							backgroundColor: colorArrays[ind%9]}">
							<view class="smalltext" >{{item.course_name+ "@" + item.place}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="btn_wrap">
			<button
				type="primary"
				@click="goToPage('/pages/index/classSchedule/courseSharing')">课程表分享</button>
			<button
				type="primary"
				@click="goToPage('/pages/index/classSchedule/curriculumSync')">课程表同步</button>
		</view>
	</view>
</template>

<script>
	import { formatDate } from '../../../utils/date.js';
	export default {
		data() {
			return {
				dateArr: [],
				list: [1,2,3,4,5,6,7,8,9,10,11,12],
				colorArrays: [ "#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD",'#C99590'],
				dataList: []
			}
		},
		onLoad(option) {
			const schoolName = option.schoolName;
			const week = option.week; 
			console.log(week, "week")
			this.computedDate();
			this.getWeekCourse(schoolName, week);
		},
		methods: {
			computedDate() {
				const dateList = [];
				const arr = ['日','一','二','三','四','五','六'];
				const date = new Date();
				const month = date.getMonth() + 1;
				const day = date.getDate();
				const week = arr[date.getDay()];
				
				// for(var k=0;k<7;k++) {
					
				// }
				
				console.log( date,month,week,day)
			},
			getWeekCourse(schoolName, week) {
				uni.showLoading({
					title: '正在加载...'
				})
				this.$api.getWeekCourse({school_name: schoolName, week: week}).then(res => {
				   // 获得数据 
				   const {status_code, week, school_name, message, courses, alert_message} = res;
				   if(status_code === 0){
					    const coursesList = [];
						for(var i=0; i<courses.length; i++){
							var count = 1;
							var flag = false;
							var item = {};
							for(var k=0;k<coursesList.length;k++){
								if( courses[i].week_num === coursesList[k].week_num &&
									courses[i].course_name === coursesList[k].course_name && 
									courses[i].class_num === coursesList[k].class_num*1 + 1) {
									coursesList[k].count++;
									flag = true;
								}
							}
							if(!flag) {
								item = {
									week_num: courses[i].week_num,
									class_num: courses[i].class_num,
									course_name: courses[i].course_name,
									teacher_name: courses[i].teacher_name,
									place: courses[i].place,
									count: count
								}
								coursesList.push(item);
							}
						}
						this.dataList = coursesList;
				   } else {
						uni.showToast({
		　　　　　　　　　　　　title: message,
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　})
				   }
				}).catch(res => {
					uni.showToast({
	　　　　　　　　　　　　title: '网络异常，请稍后再试！',
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　})
				}).finally(() => {
					uni.hideLoading();
				})
			},
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style scoped>
	.flex-item {
	  width: 95rpx;
	  height: 100px;
	}
	
	.kcb-item {
	  position: absolute;
	  justify-content: center;
	  display: flex;
	  align-items: center;
	  border-radius: 5px;
	}
	
	.smalltext {
	  font-size: 8pt;
	  color: #fff;
	  padding-left: 2px;
	}
	
	.top {
	  display: flex;
	  flex-direction: row;
	  margin-left: 35rpx;
	  background-color: #FDFDFE;
	  /* color: #7cba23; */
	}
	
	.top-text {
	  width: 100rpx;
	  height: 100rpx;
	  font-size: 9pt;
	  justify-content: center;
	  display: flex;
	  align-items: center;
	}
	
	.scroll {
	  /* height: 1170rpx; */
	  z-index: 101;
	  position: fixed;
	  background-color: #FFFFFF;
	}
	
	.left {
	  width: 35rpx;
	  height: 100rpx;
	  font-size: 9pt;
	  justify-content: center;
	  display: flex;
	  align-items: center;
	}
	.btn_wrap {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: center;
		z-index: 999;
		display: flex;
		justify-content: center;
	}
	.btn_wrap button {
		margin: 0;
		width: 35%;
		line-height: 80rpx;
		background-color: #439AD0;
		color: #fff;
		font-size: 36rpx;
	}
	.btn_wrap button:last-child {
		margin-left: 10%;
	}
</style>
