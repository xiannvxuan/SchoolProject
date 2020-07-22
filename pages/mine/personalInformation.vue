<template>
	<view class="content">
		 <view class="allfunction_list" @click="goToPage('/pages/tabbar/mine/personalInformation')">
			<text>头像</text>
			<view class="avator">
				<image src="../../static/img/mine.jpeg"></image>
				<uni-icons type="forward" size="18" color="#D7D7D7"></uni-icons>
			</view>
		</view>
		<view class="allfunction_list">
			<text>昵称</text>
			<view>
				<text class="ellipsis">小火柴</text>
				<uni-icons type="forward" size="18" color="#D7D7D7"></uni-icons>
			</view>
		</view>
		<view class="allfunction_list" @click="goToPage('/pages/mine/modifyInformation')">
			<text>自我介绍</text>
			<view class="">
				<text class="ellipsis"></text>
				<uni-icons type="forward" size="18" color="#D7D7D7"></uni-icons>
			</view>
		</view>
		<view class="allfunction_list">
			<text>性别</text>
			<view class="sex">
				<image v-if="sex==='男'" src="../../static/img/man.png"></image>
				<image v-else src="../../static/img/woman.png"></image>
				<text>男</text>
			</view>
		</view>
		<view class="allfunction_list">
			<text>学校</text>
			<view>
				<text class="ellipsis">北京理工大学</text>
			</view>
		</view>
		<view class="allfunction_list">
			<text>年级</text>
			<view>
				<text class="ellipsis">2020级</text>
			</view>
		</view>
		<view class="footer_info">
			性别，学校，年级等信息设置后若需修改，请联系客服。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sex: "男"
			}
		},
		methods: {
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
	.content {
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: 32rpx 40rpx;
		background-color: #FFFFFF;
	}
	.allfunction_list {
		line-height: 120rpx;
		font-size: 32rpx;
		color: #3E3E3E;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #D1D1D1;
	}
	.allfunction_list > text {
		width: 240rpx;
	}
	.allfunction_list > view {
		width: 400rpx;
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.allfunction_list > view text{
		color:#999999;
	}
	.allfunction_list uni-icons {
		margin-left: 10rpx;
	}
	.avator > image {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
	}
	.sex image {
		width: 32rpx;
		height: 32rpx;
		margin-right: 20rpx;
	}
	.footer_info {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #999999;
	}
	/* .btn {
		width: 100%;
		line-height: 100rpx;
		color: #fff;
		font-size: 32rpx;
		background-color: #EB3568;
		position: fixed;
		bottom: 0;
		left: 0;
	} */
</style>
