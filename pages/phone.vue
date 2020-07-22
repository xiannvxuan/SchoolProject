<template>
	<view class="auth">
		<view>
			<image src="../static/logo.png"></image>
			<view class="name">四色院</view>
		</view>
		<button type="primary" open-type="getPhoneNumber" @getphonenumber="wxGetPhone">登录/注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			wxGetPhone(e){
				const vm = this;
				uni.login({//获取code
					provider: 'weixin',
					success: function (res) {
						// encryptedData
						// iv
						vm.thirdLogin(res.code);
					},
					catch: function(){
						console.log('login：' + infoRes);
					}
				});
			},
			thirdLogin(code) {
				this.$api.login({code: code}).then(res => {
				   // 获得数据 
				   console.log(res, '请求成功');
				   if(res.status_code === 0){
					    uni.setStorageSync("openid",res.openid);
					    uni.setStorageSync("sessionKey",res.session_key);
						uni.reLaunch({
							url: '/pages/index/index'
						});
				   } else {
					   uni.showToast({
		　　　　　　　　　　　　title: res.message,
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　})
				   }
				}).catch(res => {
				　　// 失败进行的操作
					console.log("请求失败");
				})
			},
			
		}
	}
</script>

<style scoped>
	.auth {
		background-color: #FFFFFF;
		width: 100%;
		height: 100%;
	}
	.auth>view {
		text-align: center;
		padding-top: 220rpx;
	}
	image {
		width: 180rpx;
		height: 180rpx;
	}
	.name {
		font-size: 32rpx;
		line-height: 32rpx;
		text-align: center;
	}
	button{
		background-color: #439AD0;
		margin-top: 180rpx;
		line-height: 80rpx;
		width: 85%;
	}
</style>
