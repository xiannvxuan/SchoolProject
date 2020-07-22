<template>
	<view class="content">
		<view class="uni-textarea">
			<textarea placeholder-style="color:#7F7F7F" 
			maxlength="400"
			@input = "computedLen"
			v-model.trim="content"
			:disable-default-padding='true'
			placeholder="想说什么就写下来吧..."/>
			<view class="len">
				{{len}}/400
			</view>
		</view>
		<view class="upload">
			<view v-for="(v, k) in imgList" :key="k" @click="showMark(k)">
				<image :src="getImg(v)" mode="aspectFill"></image>
			</view>
			<view class="add" v-if="imgList.length<9" @click="upload">
				<uni-icons type="plusempty" size="54" color="#B1B1B1"></uni-icons>
			</view>
		</view>
		<view class="addUrl">
			<!-- <view class="addUrl_top">
				选择发布的圈子
				<uni-icons type="arrowright" size="16" color="#040404"></uni-icons>
			</view> -->
			<!-- <view class="addUrl_top location">
				所属位置
				<view>
					<image src="../../static/img/point.png" mode="scaleToFill"></image>
					<uni-icons type="location-filled" size="16" color="#4D4D4D"></uni-icons>
					北京大学
				</view>
			</view> -->
			<view class="addUrl_bot">
				<checkbox-group @change="changeType">
					<checkbox :checked="messageType"/>
				</checkbox-group>
				匿名消息
				<uni-icons type="help" size="12" color="#4D4D4D"></uni-icons>
			</view>
			<!-- <view class="addUrl_bot">
				<radio :value="value"/>
				十分钟后清除
				<uni-icons type="help" size="12" color="#B1B1B1"></uni-icons>
			</view> -->
		</view>
		<view class="btn-wrap">
			<button class="btn myBtn" :disabled="disabled" @click="publish">发布</button>
		</view>
		<view class="swiper-wrap" @touchmove.stop.prevent v-if="mark">
			<view class="current">{{current*1+1}}/{{imgList.length}}</view>
			<swiper class="swiper" :indicator-dots="false" :autoplay="false" :circular="true" :current="current" @change="changeSwiper" @click="hideMark">
				<swiper-item v-for="(v, k) in imgList" :key="k">
					<image :src="getImg(v)" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
			<view id="del" class="delBtn" @click="del">删除</view>
		</view>
	</view>
</template>

<script>
	import url from '../../request/config.js';
	export default {
		data() {
			return {
				len: 0,
				content: '',
				imgList: [],
				disabled: false,
				current: 0,
				mark: false,
				messageType: false
			}
		},
		methods: {
			upload() {
				const vm = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						const tempFilePath = res.tempFilePaths[0];
						const openid = uni.getStorageSync("openid") || '';
						const session = uni.getStorageSync("sessionKey") || '';
					    uni.uploadFile({
							url: url + '/upload/image',
							filePath: tempFilePath,
							name: 'image',
							header:{
								'cookie': 'session=' + session +';openid=' + openid,
								'content-type': 'multipart/form-data'
							},
							formData: {
								'image': tempFilePath
							},
							success: (res) => {
								res = JSON.parse(res.data);
								if(res.status_code === 0) {
									vm.imgList.push(res.uri);
								} else {
									uni.showToast({
					　　　　　　　　　　　　title: res.message,
					　　　　　　　　　　　　icon: 'none'
					　　　　　　　　　　});
								}
							},
							fail: (res)=> {
								uni.showToast({
				　　　　　　　　　　　　title: '网络异常，请稍后再试！',
				　　　　　　　　　　　　icon: 'none'
				　　　　　　　　　　})
							}
						});
				    }
				});
			},
			getImg(v){
				return this.$imageUrl + v;
			},
			publish(){
				const vm = this;
				if(!vm.content && vm.imgList.length<1) {
					uni.showToast({
	　　　　　　　　　　　　title: "发布内容不能为空",
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　})
					return;
				}
				this.disabled = true;
				const messageType = this.messageType? 2 : 1;
				// var params = {
				// 	content: '10.1想去爬香山，有一起去的小伙伴吗',
				// 	message_type: 2,
				// 	uris: JSON.stringify(["000000000041.jpeg","000000000042.jpeg","000000000043.jpeg","000000000044.jpeg","000000000045.jpeg","000000000046.jpeg","000000000047.jpeg","000000000048.jpeg","000000000049.jpeg"])
				// }	
				var params = {content: vm.content, uris: JSON.stringify(vm.imgList), message_type: messageType}
				this.$api.createMessage(params).then(res => {
				    // 获得数据 
				    const {status_code, message, message_info} = res;
				    if(status_code === 0){
						vm.imgList = [];
						vm.content = '';
					    uni.switchTab({
						    url: '/pages/dynamic/index'
					    })
				    } else {
					    uni.showToast({
		　　　　　　　　　　　　title: message,
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　});
				   }
				}).catch(res => {
					uni.showToast({
	　　　　　　　　　　　　title: '网络异常，请稍后再试！',
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　});
				}).finally(() => {
					this.disabled = false;
				})
			},
			showMark(index) {
				this.current = index;
				this.mark = true;
			},
			hideMark() {
				this.mark = false;
				this.current = 0;
			},
			changeSwiper(e) {
				this.current = e.detail.current;
			},
			del(){
				this.imgList.splice(this.current, 1);
				this.mark = false;
			},
			computedLen() {
				this.len = this.content.length;
			},
			changeType(){
				this.messageType = !this.messageType;
			},
			goToPage(url) {
				if(!url) return;
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		background-color: #FFFFFF;
		padding: 10rpx 40rpx;
		
	}
	.uni-textarea {
		width: 100%;
		position: relative;
	}
	.uni-textarea textarea {
		width: 100%;
		border-radius: 20rpx;
		padding: 32rpx;
		background-color: #F7F7F7;
		color: #202020;
		font-size: 28rpx;
	}
	.len {
		position: absolute;
		font-size: 24rpx;
		bottom: 10rpx;
		right: 20rpx;
	}
	.upload {
		display: flex;
		flex-wrap: wrap;
		padding:14rpx;
		font-size: 0;
	}
	
	.upload view {
		width: 194rpx;
		height: 194rpx;
		border-radius: 16rpx;
		margin: 10rpx;
	}
	
	.upload image {
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
	}
	
	.add {
		background-color: #F3F3F3;
		text-align: center;
		line-height: 194rpx;
	}
	
	.addUrl > view {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #4D4D4D;
	}

	.addUrl_top {
		display: flex;
		justify-content: space-between;
		padding: 40rpx;
		border-bottom: 1px solid #EAEAEA;
	}
	.location {
		margin-bottom: 40rpx;
	}
	.location uni-icons, .location image {
		padding-right: 8rpx;
	}
	.location image {
		width: 38rpx;
		height: 38rpx;
		vertical-align: middle;
	}
	.addUrl_bot {
		padding-bottom: 6rpx;
	}
	.addUrl_bot checkbox{
		transform:scale(0.7);
	}
	.addUrl_bot uni-icons {
		margin-left: 16rpx;
	}
	.btn-wrap {
		height: 70rpx;
		margin-bottom: 40rpx;
		margin-top: 120rpx;
	}
	.btn {
		width: 150rpx;
		float: right;
		line-height: 70rpx;
		color: #fff;
		font-size: 28rpx;
		/* background-color: #EB3D28; */
	}
	/* 查看图片 */
	.swiper-wrap {
		width: 100%;
		height: 100%;
		background-color: rgb(0,0,0,0.9);
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
	}
	.swiper {
		flex: 1;
	}
	.swiper image {
		width: 100%;
		height: 100%;
	}
	.current {
		color: #FFFFFF;
		font-size: 36rpx;
		line-height: 120rpx;
		text-align: center;
	}
	#del {
		width: 100%;
		line-height: 120rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		text-align: center;
	}
</style>
