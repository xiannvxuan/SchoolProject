<template>
	<view class="content">
		<view class="allfunction_list" @click="goToPage('/pages/mine/personalInformation')">
			<text>个人信息</text>
			<uni-icons type="forward" size="20"></uni-icons>
		</view>
		<view class="allfunction_list" @click="showModal(1)">
			<text>清除缓存</text>
			<uni-icons type="forward" size="20"></uni-icons>
		</view>
		<view class="allfunction_list">
			<text>官方合作</text>
			<uni-icons type="forward" size="20"></uni-icons>
		</view>
		<view class="allfunction_list" @click="showModal(2)">
			<text>退出登录</text>
			<uni-icons type="forward" size="20"></uni-icons>
		</view>
		<button class="btn myBtn" open-type="contact">联系客服</button>
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
					url: url
				});
			},
			showModal(ind){
				let message = "";
				let successMsg = "";
				switch(ind){
					case 1:
					message = "您确定要清除缓存吗？";
					successMsg = "清除成功";
					break;
					case 2:
					message = "您确定要退出登录吗？";
					successMsg = "退出成功";
					break;
				}
				uni.showModal({
				    title: '提示',
				    content: message,
				    success: function (res) {
				        if (res.confirm) {
				           uni.showModal({
				               title: '提示',
				               content: successMsg,
							   showCancel: false
				           });
						   uni.clearStorageSync();
						   if(ind === 2){
							   this.goToPage("/pages/index/index");
						   }
				        }
				    }
				});
			}
		}
	}
</script>

<style scoped>
	.content {
		box-sizing: border-box;
		width: 100%;
		padding: 0 40rpx;
		background: #FFFFFF;
	}
	.allfunction_list {
	  line-height: 140rpx;
	  font-size: 32rpx;
	  display: flex;
	  color: #3E3E3E;
	  justify-content: space-between;
	  border-bottom: 1px solid #D2D1D2;
	}
	.content > view:nth-child(4){
		border:none;
	}
	.btn {
		width: 100%;
		line-height: 100rpx;
		color: #fff;
		font-size: 36rpx;
		position: fixed;
		bottom: 0;
		left: 0;
	}
</style>
