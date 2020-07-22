<template>
	<view class="content">
		<view class="uni-textarea">
			<textarea placeholder-style="color:#7F7F7F" 
			maxlength="400"
			@input = "computedLen"
			v-model.trim="desc"
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
			<view class="add" v-if="imgList.length<6" @click="upload()">
				<uni-icons type="plusempty" size="54" color="#B1B1B1"></uni-icons>
			</view>
		</view>
		<button class="btn" @click="publish()">生成二维码</button>
		<view class="swiper-wrap" @touchmove.stop.prevent v-if="mark">
			<view class="current">{{current*1+1}}/{{imgList.length}}</view>
			<swiper class="swiper" :indicator-dots="false" :autoplay="false" :circular="true" :current="current" @change="changeSwiper" @click="hideMark">
				<swiper-item v-for="(v, k) in imgList" :key="k">
					<image :src="getImg(v)" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
			<view id="del" @click="del">删除</view>
		</view>
	</view>
</template>

<script>
	// import url from '../../request/config.js';
	export default {
		data() {
			return {
				len: 0,
				desc: '',
				imgList: [],
				disabled: false,
				current: 0,
				mark: false,
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
						const session = uni.getStorageSync("key") || '';
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
				if(!vm.desc && vm.imgList.length<1) {
					uni.showToast({
	　　　　　　　　　　　　title: "发布内容不能为空",
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　})
					return;
				}
				this.disabled = true;
				this.$api.createMessage({content: vm.desc, uris: JSON.stringify(vm.imgList)}).then(res => {
					// 获得数据 
					const {status_code, message, message_id, content, uris, create_time} = res;
					if(status_code === 0){
						vm.imgList = [];
						vm.desc = '';
						uni.switchTab({
							url: '/pages/index/classSchedule/entrustedQrCode'
						});
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
				this.len = this.desc.length;
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		height: 100%;
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

	.btn {
		width: 330rpx;
		line-height: 70rpx;
		color: #fff;
		font-size: 28rpx;
		background-color: #EB3D28;
		margin-top: 220rpx;
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
		background-color: rgba(13, 13, 13, 1);
		color: #FFFFFF;
		font-size: 32rpx;
		text-align: center;
	}
</style>
