<template>
	<view class="mineCon">
		<view class="nick_wrap">
		<!-- 昵称部分 -->
			<view class='mine_nick_left'>
				<view class="mine_nickName ellipsis">
					{{nickName}}
					<image v-if="sex==='男'" src="../../static/img/man.png" mode=""></image>
					<image v-else src="../../static/img/woman.png" mode=""></image>
				</view>
				<view class="mine_message ellipsis">{{message}}</view>
			</view>
			<view class="mine_nick_img">
			  <image :src='avator'></image>
			</view>
		</view>
		
		<view class="mineCon_content">
			<!-- 课程表部分 -->
			<view class="scheduleList">
			  <view class="schedule_title">
				<text>课程表</text> 
				<text>修改课程 ></text>
			  </view>
			  <view class="schedule_order_wrap">
				<!-- <view>
				  <image src="../../static/img/mine_school.png"></image>
				  <text>第二大学</text>
				</view> -->
				<view>
				  <image src="../../static/img/index_entrust.png"></image>
				  <text>我的委托</text>
				</view>
				<view>
				  <image src="../../static/img/tabbar/news.png"></image>
				  <text>我的寄卖</text>
				</view>
				<view>
				  <image src="../../static/img/tabbar/dynamic.png"></image>
				  <text>我的动态</text>
				</view>
			  </view>
			 <!-- <view class="mine-bg">
				  <image src="../../static/img/mine_bg.png" mode=""></image>
			  </view> -->
			</view>
			
			<view class="card">
				<!-- 底部列表 -->
				<view class="mine_list_wrap">
					<view bindtap='no_pay_order' class="mine_list" @click="goToPage('/pages/mine/allfunction')">
					  <view class="mine_list_img">
						<image src='../../static/img/mine_allFun.png'></image>
					  </view>
					  <view class='mine_list_all'>
						<text>全部功能</text>
						<uni-icons type="forward"></uni-icons>
					  </view>
					</view>
					<view @click="goToPage('/pages/mine/consignmentNews')" class="mine_list">
					  <view class="mine_list_img">
						<image src='../../static/img/mine_consignmentInfo.png'></image>
					  </view>
					  <view>
						<view class="mine_list_title">寄卖消息</view>
						<view class='mine_list_msg'>门前小卖部：还是很好</view>
					  </view>
					</view>
					<view bindtap='no_pay_order' class="mine_list">
					  <view class="mine_list_img">
						<image src='../../static/img/index_entrust.png'></image>
					  </view>
					  <view>
						<view class="mine_list_title">委托消息</view>
						<view class='mine_list_msg'>卖卖门前小卖门前小卖卖卖门前小卖门前小卖卖卖门前小卖门前小卖</view>
					  </view>
					</view>
					<view bindtap='no_pay_order' class="mine_list">
					  <view class="mine_list_img">
						<image src='../../static/img/mine_friendInfor.png'></image>
					  </view>
					  <view>
						<view class="mine_list_title">好友信息</view>
						<view class='mine_list_msg'>门前小卖部：还是很好</view>
					  </view>
					</view>
					<view bindtap='no_pay_order' class="mine_list">
					  <view class="mine_list_img">
						<image src='../../static/img/mine_friendInfor.png'></image>
					  </view>
					  <view>
						<view class="mine_list_title">学校社团</view>
						<view class='mine_list_msg'>门前小卖部：还是很好</view>
					  </view>
					</view>
				</view>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: '小柴火',
				sex: "男",
				message: '写点什么吧介绍一下自己',
				avator: '../../static/img/avator.png'
			}
		},
		onLoad() {
			console.log(this.$tabIndex, "$tabIndex");
			console.log(this.$imageUrl, "$imageUrl");
			this.$tabIndex = 4;
		},
		onShow(){
			const page = this.$mp.page;
			if (typeof page.getTabBar === 'function' &&  
			    page.getTabBar()) {  
			    page.getTabBar().setData({  
			        current: 4
			    });
				this.$index = 4;
			}
		},
		methods: {
			wxGetUserInfo() {
				const openid = uni.getStorageSync("openid");
				const key = uni.getStorageSync("key");
				if(openid && key){
					console.log(openid ,key ,"open-key");
					uni.checkSession({
						success: function(data){
							console.log(data, 'checkSession');
							uni.navigateTo({
								url: '/pages/index/classSchedule/curriculumSync'
							});
						},
						fail: function(){
							console.log('checkSession失效');
							this.login();
						}
					})
					
				} else {
					console.log("未登录过")
					this.login();
				}
				// uni.getUserInfo({
				// 	provider: 'weixin',
				// 	success: function (infoRes) {
				// 		// const encryptedData = infoRes.encryptedData;
				// 		// const iv = infoRes.iv;
				// 		// uni.setStorage("userInfo", infoRes.userInfo);
				// 		// const openid = uni.setStorage("userInfo", userInfo);
				// 		console.log('用户昵称为：' + infoRes);
				// 		//this.thirdLogin(res.code);
				// 	},
				// 	fail: function() {
				// 		console.log('授权失败')
				// 	}
				// });
			},
			login(){
				var vm = this;
				uni.login({
					provider: 'weixin',
					success: function (res) {
						uni.setStorageSync("userInfo",res.userInfo);
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
						vm.thirdLogin(res.code);
					},
					catch: function(){
						console.log('catch用户昵称为：' + infoRes);
					}
				});
			},
			thirdLogin(code) {
				this.$api.login({code: code}).then(res => {
				   // 获得数据 
				   console.log(res, '请求成功');
				   if(res.status_code === 0){
					     
				   } else {
					   uni.showToast({
		　　　　　　　　　　　　title: res.message,
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　})
				   }
				}).catch(res => {
				　　// 失败进行的操作
					console.log("请求失败");
					 // int32 status_code = 1; //状态码，0是成功，其它是错误码
					 //    string message = 2; // 错误信息，0时为success
					 //    string openid = 3; // 身份id
					 //    string session_key = 4; //session
				})
			},
			goToPage(url) {
				if(!url) return;
				uni.navigateTo({
					url: url
				});
			}
		},
	}
</script>

<style scoped>
	.mineCon {
		width: 100%;
		height: 100%;
		overflow: hidden;
		overflow-y: scroll;
		padding-bottom: 96rpx;
		color: #444444;
		background-color: #EEEEEE;
	}
	.ellipsis {
	  white-space: nowrap;
	  text-overflow: ellipsis;
	  overflow: hidden;
	}
	
	.mineCon_content{
		margin-top: -40rpx;
		padding: 40rpx;
		background: #FFFFFF;
		border-radius: 40rpx 40rpx 0 0;
	}
	/* .card {
		background: #FFFFFF;
		border-radius: 48rpx 48rpx 0 0;
	} */
	/* 昵称部分 */
	.nick_wrap{
	  display: flex;
	  justify-content: space-between;
	  padding: 40rpx 40rpx 120rpx 40rpx;
	  background-image: linear-gradient(to right, #F2F9EB, #E6F3D8);
	  /* background:url(../../static/img/mine.gif) no-repeat; */
	  background-size: 100% 100%;
	  /* border-radius: 0 0 60rpx 60rpx; */
	}

	.nick_wrap .mine_nick_img {
	  width: 136rpx;
	  height: 136rpx;
	  border-radius: 50%;
	}
	.nick_wrap image {
	  width: 100%;
	  height: 100%;
	}
	.mine_nickName {
	  font-size: 36rpx;
	  line-height: 70rpx;
	  width: 100%;
	}
	.mine_nickName image {
		width: 24rpx;
		height: 24rpx;
		margin-left: 12rpx;
	}
	.mine_message {
	  font-size: 24rpx;
	  width: 100%;
	}
	
	
	/* 课程表部分 */
	.scheduleList {
	  /* background-image: linear-gradient(to right, #464258, #2B2A34); */
	  /* background-image: linear-gradient(to right, #F6D147, #EEB24B); */
	  /* background-image: linear-gradient(to right, #424C9E, #323D94); */
	  
	  /* background-image: linear-gradient(to right, #FBF6EC, #F6EBD8); */
	  /* background-image: linear-gradient(to right, #FAEFF0, #F5E1E1); */
	  background-image: linear-gradient(to right, #F4F4F5, #E8E8EA);
	
	  position: relative;
	  background-color: #C4E1EB;
	  /* border-radius: 40rpx 40rpx 0rpx 0rpx; */
	  border-radius: 16rpx;
	  /* color: #fff; */
	  /* margin-top: 46rpx; */
	}
	.schedule_title {
	  line-height: 80rpx;
	  border-bottom: 2rpx solid #8A898E;
	  padding: 0px 22rpx;
	  display: flex;
	  justify-content: space-between;
	}
	.schedule_title text:first-child {
	  font-size: 32rpx;
	}
	.schedule_title text:last-child {
	  font-size: 24rpx;
	}
	.schedule_order_wrap {
	  align-items: center;
	  display: flex;
	  padding: 32rpx 0px;
	}  
	.mine-bg{
		background-color: #FFFFFF;
		font-size: 0;
	}
	.mine-bg image{
		width: 100%;
		height: 14rpx;
	}
	.schedule_order_wrap > view {
	  flex: 1;
	  text-align: center;
	}
	.schedule_order_wrap image {
	  width: 68rpx;
	  height: 68rpx;
	}
	
	.schedule_order_wrap text {
	  font-size: 24rpx;
	  display: block;
	  margin-top: 2rpx;
	  /* color: #FBFCF7; */
	}
	
	
	
	/* 底部列表 */
	.mine_list {
	  display: flex;
	  align-items: center;
	  flex-direction: row;
	  flex-wrap: nowrap;
	}
	
	.mine_list:first-child {
	  border-top: none;
	}
	
	.mine_list > view:nth-child(2){
	  padding: 28rpx 0;
	  width: 80%;
	  border-top: 2rpx solid #D3D3D3;
	}
	
	.mine_list_img{
	  width: 72rpx;
	  height: 72rpx;
	  margin-right: 24rpx;
	}
	
	.mine_list image {
	  width: 100%;
	  height: 100%;
	  border-radius: 50%;
	}
	
	.mine_list .mine_list_all {
	  line-height: 72rpx;
	  padding: 6rpx 0;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  font-size: 32rpx;
	  border-top: none !important;
	  color: #525252;
	  position: relative;
	}
	
	.mine_list_title {
	  color: #525252;
	  font-size: 32rpx;
	}
	
	.mine_list_msg {
	  margin-top: 8rpx;
	  color: #969596;
	  font-size: 20rpx;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	  overflow: hidden;
	}
</style>
