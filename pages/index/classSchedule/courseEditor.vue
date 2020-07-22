<template>
	<view class="schedule_wrap">
		<view class="schedule">
			<view class="schedule_title">
				<text>微机课</text>
				<uni-icons type="forward" size="20"></uni-icons>
			</view>
			<view class="schedule_detail_wrap">
				<view class="schedule_detail">
					<view>
						<text class="iconfont iconzan1"></text>
						<text>教室</text>
						<text>第三件事</text>
					</view>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view class="schedule_detail" @click="goToPage('/pages/index/classSchedule/modificWeek')">
					<view>
						<text class="iconfont iconzan1"></text>
						<text>周数</text>
						<text>1-25周</text>
					</view>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view class="schedule_detail">
					<view>
						<text class="iconfont iconzan1"></text>
						<text>节数</text>
						<text>周一 3-5节</text>
					</view>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view class="schedule_detail">
					<view>
						<text class="iconfont iconzan1"></text>
						<text>老师</text>
						<text>刘老师</text>
					</view>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
			</view>
		</view>
		<view class="classroomClassmate">
			<button class="btn">确认</button>
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
	.schedule_wrap {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}
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
		/* width: 100rpx; */
		/* height: 60rpx; */
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
	.schedule_detail {
		display: flex;
		align-items: center;
		justify-content: space-between;
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
		padding: 0 40rpx;
		margin-top: 310rpx;
	}
	.btn {
		background-color: #439AD0;
		font-size: 36rpx;
		line-height: 84rpx;
		color: #fff;
		border-radius: 42rpx;
	}
</style>
