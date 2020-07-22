<template>
	<view class="content">
		<view class="uni-textarea">
			<textarea placeholder-style="color:#7F7F7F" 
			maxlength="150"
			@input = "computedLen"
			v-model.trim="desc"
			:disable-default-padding='true'
			placeholder="想说什么就写下来吧..."/>
			<view class="len">
				{{len}}/150
			</view>
		</view>
		<view class="main">
			<view class="">
				任务标题
				<input class="uni-input" placeholder="请输入文字" />
			</view>
			<view class="combox">
				任务内容
				<uni-combox :candidates="candidates" placeholder="请选择任务" v-model="city"></uni-combox>
			</view>
			<view class="">
				任务地址
				<input class="uni-input" placeholder="请输入文字" />
			</view>
			<view class="">
				任务时间
				<input class="uni-input" placeholder="请输入文字" />
			</view>
		</view>
		<view class="upload">
			<view v-for="(v, k) in imgList" :key="k" @click="showMark(k)">
				<image :src="getImg(v)" mode="aspectFill"></image>
			</view>
			<view class="add" v-if="imgList.length<3">
				<uni-icons type="plusempty" size="54" color="#B1B1B1"></uni-icons>
			</view>
		</view>
		<view class="price">
			<view class="price_tip">
				<text>赏金</text>
				<view class="">给勤劳的小蜜蜂一点肯定</view>
			</view>
			<view class="price_total">
				<input class="uni-input" placeholder="最低三元起"/>元
			</view>
		</view>
		<view class="btn_wrap">
			<button class="btn" @click="goToPage('/pages/tabbar-3-detial/tabbar-3-qa/releaseAround')">下单</button>
		</view>
		<!-- 图片预览 -->
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
	import uniCombox from "../../components/uni-combox/uni-combox"
	export default {
		data() {
			return {
				len: 0,
				desc: '',
				imgList: [],
				value: '',
				city: '',
				candidates: ['取快递', '寄快递'],
			}
		},
		components: {
			uniCombox
		},
		methods: {
			checkboxChange: function (e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			//上传图片
			upload() {
				const vm = this;
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
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
			//图片预览
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
			},
			goToPage(url) {
				if(!url) return;
				uni.navigateTo({
					url
				});
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		
	}
	.uni-textarea {
		width: 100%;
		background-color: #FFFFFF;
		position: relative;
		padding: 30rpx 40rpx 0 40rpx;
	}
	.uni-textarea textarea {
		width: 100%;
		height: 190rpx;
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
		right: 60rpx;
	}
	/* main */
	.main {
		padding: 0 40rpx;
		background-color: #FFFFFF;
	}
	.main > view {
		padding: 40rpx 0;
		border-bottom: 1px solid #D5D5D5;
		font-size: 28rpx;
		color: #000000;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.main > view:last-child {
		border-bottom: none;
	}
	.combox {
		padding: 20rpx 0 !important;
	}
	.main input {
		width: 180rpx;
	}
	.main uni-combox {
		width: 410rpx;
		background-color: #FFFFFF;
	}
	.main uni-combox >>> input {
		font-size: 28rpx;
	}
	/* 图片 */
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
	/* price */
	.price {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 0 14rpx 0;
		background-color: #FFFFFF;
		padding: 20rpx 40rpx 110rpx 40rpx;
		margin-top: 16rpx;
		background-color: #FFFFFF;
	}
	.price_tip text{
		color: #000000;
		font-size: 28rpx;
	}
	.price_tip view {
		color: #949494;
		font-size:20rpx;
		margin-top: 8rpx;
	}
	.price_total {
		font-size: 28rpx;
		display: flex;
	}
	
	.price_total input{
		width: 200rpx;
		color: #959595;
		padding-left: 10rpx;
	}
	/* btn */
	.btn {
		width: 100%;
		line-height: 100rpx;
		color: #fff;
		font-size: 46rpx;
		background-color: #439AD0;
		position: fixed;
		bottom: 0;
		left: 0;
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