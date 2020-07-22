<template>
	<view class="auth">
		<view>
			<image src="../static/logo.png"></image>
			<view class="name">四色院</view>
		</view>
		<button type="primary" open-type="getUserInfo" @getuserinfo="wxGetUserInfo">微信授权</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			wxGetUserInfo() {
				var vm = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function (res) {
						uni.setStorageSync("userInfo",res.userInfo);
						uni.setStorageSync("encryptedData",res.encryptedData);
						uni.setStorageSync("iv",res.iv);
						uni.reLaunch({
							url: '/pages/phone'
						});
						// encryptedData: "p285TmcK04xPgs7MmT2PTqoYO/Iy73zdMw/56C7q7LWphXS1GlClXKtQd1dElInBeu6jV8c0Dz8H6onJpVSz8CNIYMB9fRDGiwOnZkysfnVTmCA+eTA6C270eCNsWubw4p99OjsZgmHxxWiSYbkj2Eq/eKJSmtiCMcDgnGuWR6R+zuF68Qcco2heB+WKgxZlUXMTB0dmZ9//kpcjqhJ7bPIV3sls7ZfnfjHd7qS50AXl7AMekVYklr3RDC96kztEyKcAkZQMov3KIAZAWUhgezQxUQk/DEJ13m679I43ZE6mKpBw1blztMtQt/Q1wCY6CkWS17HzqUHI5TpLdNzskbM+N4W//LmLyGi6MHVV0mEUelkxJxtiOqjZ9q6dvvc/EYJ87kSRqUcRtaGj45YquPuBak9cC0pmuSyhWoRFk+Iet/l2Ko07EltXzm8wxZrOGcyfak1j4oF12gD+NCXhqJfLi8/xOnaLWXAlKTJhuwZssl8GoACIX2gNW3aBQqSC"
						// errMsg: "getUserInfo:ok"
						// iv: "UHp6t/Jl9kL75O0zaF/CqA=="
						// rawData: "{"nickName":"M1","gender":0,"language":"zh_CN","city":"Palmerston","province":"Northern Territory","country":"Australia","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/3EkrxwOock5CqfJe6Tf8ic8eibYrT6Rx13f9ySicDbGpvpVs2uHkZ1WVLHUnhlLBXUAc5GeyicCcCMUpkLYaLakkcQ/132"}"
						// signature: "50021af0bcd5648ffdb3dbc4b9e6bf00b41ef385"
						// avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/3EkrxwOock5CqfJe6Tf8ic8eibYrT6Rx13f9ySicDbGpvpVs2uHkZ1WVLHUnhlLBXUAc5GeyicCcCMUpkLYaLakkcQ/132"
						// city: "Palmerston"
						// country: "Australia"
						// gender: 0
						// language: "zh_CN"
						// nickName: "M1"
						// province: "Northern Territory"
						console.log('用户昵称为：' + res);
						//this.thirdLogin(res.code);
					},
					fail: function() {
						console.log('授权失败')
					}
				});
			}
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
