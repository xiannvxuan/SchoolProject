<template>
	<view>
		<view class="schedule">
			<view class="schedule_title">
				<text>微机课</text>
				<button @click="goToPage('/pages/index/classSchedule/courseEditor')">编辑</button>
			</view>
			<view class="schedule_detail_wrap">
				<view class="schedule_detail">
					<text class="iconfont iconzan1"></text>
					<text>教室</text>
					<text>第三件事</text>
				</view>
				<view class="schedule_detail">
					<text class="iconfont iconzan1"></text>
					<text>周数</text>
					<text>1-25周</text>
				</view>
				<view class="schedule_detail">
					<text class="iconfont iconzan1"></text>
					<text>节数</text>
					<text>周一 3-5节</text>
				</view>
				<view class="schedule_detail">
					<text class="iconfont iconzan1"></text>
					<text>老师</text>
					<text>刘老师</text>
				</view>
			</view>
		</view>
		<view class="classroomClassmate">
			<view>
				<text class="iconfont iconzan1"></text>
				课堂同学
			</view>
			<view>
				暂无课堂同学	
				<uni-icons type="forward" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style scoped>
	.schedule {
		padding:40rpx;
		background-color: #fff;
	}
	.schedule_title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.schedule_title text {
		font-size: 36rpx;
		
	}
	.schedule_title button {
		margin: 0;
		border-radius: 30rpx;
		line-height: 60rpx;
		color: #49A5C1;
		border: 1px solid #49A5C1;
		font-size: 28rpx;
		padding: 0 20rpx;
	}
	.schedule_detail_wrap {
		margin-top: 20rpx;
	}
	.schedule_detail {
		padding:20rpx 0;
		
	}
	
	.schedule_detail text{
		font-size: 32rpx;
		line-height: 40rpx;
	}
	.schedule_detail .iconfont {
		color: #75D0C0;
	}
	.schedule_detail text:nth-child(2) {
		padding:0 20rpx;
	}
	.classroomClassmate {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 36rpx 40rpx;
		margin-top: 28rpx;
		background-color: #fff;
	}
	.classroomClassmate view:first-child {
		font-size: 32rpx;
	}
	.classroomClassmate view:first-child text {
		margin-right: 32rpx;
		color: #8DCBDB;
	}
	.classroomClassmate view:last-child {
		font-size: 28rpx;
		color: #ADADAD;
	}
	.classroomClassmate uni-icons {
		margin-left: 28rpx;
	}
</style>
