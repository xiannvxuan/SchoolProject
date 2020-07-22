<template>
	<view class="login_wrap">
		<view class="login_tit">
			请输入账号密码
			<view>登录课程管理系统获取课程表信息并同意《课程表管理服务和隐私协议》</view>
		</view>
		<view class="uni-form-wrap">
			<view class="uni-form-item uni-column">
				<input class="uni-input" focus placeholder="请输入您的账号" />
			</view>
			<view class="uni-form-item uni-column">
				<input class="uni-input" placeholder="请输入您的密码" />
			</view>
		</view>
		<button class="btn">同步课程</button>
		<view class="tips">
			同步课程会替换表内已存在的旧课程，请注意保存课程表信息
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
			
		}
	}
</script>

<style scoped>
	.login_wrap {
		height: 100%;
		padding: 70rpx 40rpx;
		background-color: #FFFFFF;
	}
	.login_tit {
		font-size: 36rpx;
	}
	.login_tit view {
		font-size: 20rpx;
		margin-top: 20rpx;
		color: #999999;
	}
	.uni-form-wrap {
		margin-top: 124rpx;
	}
	.uni-form-wrap .uni-form-item {
		border-bottom: 1px solid #E5E5E5;
		padding: 50rpx 0 38rpx 0;
	}
	.uni-input {
		font-size: 28rpx;
		/* line-height: 98rpx; */
		/* margin-bottom: 16rpx; */
	} 
	.btn {
		color: #fff;
		font-size: 36rpx;
		line-height: 80rpx;
		width: 600rpx;
		margin-top: 200rpx;
		background-color: #439AD0;
		border-radius: 40rpx;
	}
	.tips {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 70rpx;
		font-size: 20rpx;
		color: #999999;
		text-align: center;
	}
</style>
