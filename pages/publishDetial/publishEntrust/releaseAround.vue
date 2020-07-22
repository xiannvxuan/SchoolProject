<template>
	<view class="content">
		<view class="main">
			<view>
				标题
				<input class="uni-input" placeholder="请输入文字" />
			</view>
			<view>
				简介
				<input class="uni-input" placeholder="请输入文字" />
			</view>
		</view>
		<view class="uni-padding-wrap">
			<label class="radio"><radio value="r1" color="#409CD4"/>包化妆</label>
			<label class="radio"><radio value="r2" color="#409CD4"/>包服装</label>
			<label class="radio"><radio value="r2" color="#409CD4"/>包造型</label>
		</view>
		<view class="upload_desc">介绍</view>
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
		<view class="upload_tit">活动图片</view>
		<view class="upload">
			<!-- <image src="../../../static/img/mine.jpeg" ></image> -->
			<image src="../../../static/img/mine.jpeg" ></image>
			<image src="../../../static/img/mine.jpeg" ></image>
			<view class="add" v-if="imgList.length<3">
				<uni-icons type="plusempty" size="54" color="#B1B1B1"></uni-icons>
			</view>
		</view>
		<view class="price">
			<view class="price_tip">服务价格</view>
			<view class="price_total">
				<input class="uni-input" placeholder="最低三元起" />元
			</view>
		</view>
		<view class="btn_wrap">
			<button class="btn">发布</button>
		</view>
	</view>
</template>

<script>
	import uniCombox from "../../../components/uni-combox/uni-combox"
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
	.uni-padding-wrap {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		padding: 40rpx;
		background-color: #FFFFFF;
	}
	.uni-padding-wrap radio {
		transform:scale(0.7);
	}
	/* 图片 */
	.upload_desc {
		font-size: 28rpx;
		background-color: #FFFFFF;
		padding: 0 40rpx;
	}
	.upload_tit {
		font-size: 28rpx;
		background-color: #FFFFFF;
		padding: 40rpx 40rpx 30rpx 40rpx;
	}
	.upload {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0rpx 40rpx 12rpx 40rpx;
		background-color: #FFFFFF;
	}
	.upload image {
		width: 194rpx;
		height: 194rpx;
		border-radius: 16rpx;
		margin-bottom: 28rpx;
	}
	.add {
		width: 194rpx;
		height: 194rpx;
		border-radius: 16rpx;
		background-color: #F3F3F3;
		text-align: center;
		line-height: 194rpx;
		margin-bottom: 28rpx;
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
	.price_tip{
		color: #000000;
		font-size: 28rpx;
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
</style>