<template>
	<view class="content">
		<view class="image-list">
			<view class="image-item" v-for="(item,index) in dataList" :key="index">
				<view class="image-content">
					<image  :src="item.src" @error="imageError"></image>
				</view>
				<button class="contactBtn" open-type="contact"></button>
				<view class="image-title">{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadingStatus: false,
				hasMore: true,
				currentPage: 1,
				pageNum: 20,
				dataList: [{
						mode: 'scaleToFill',
						text: '联系客服',
						src: '../../../static/img/mine.jpeg'
					}
				],
				
			}
		},
		onLoad() {
			//this.loadData();
		},
		methods: {
			loadData() {
				var vm = this;
				if(this.loadingStatus || !this.hasMore){
					return;
				}
				uni.showLoading({
				    title: '加载中...'
				});
				this.loadingStatus = true;
				this.$api.getMessage({index: vm.currentPage, count: vm.pageNum, message_type: state, schoolName: vm.schoolName}).then(res => {
					// 获得数据 
					const {status_code, message, message_infos, count, has_more} = res;
					if(status_code === 0){
						this.dataList = message_infos;
						this.currentPage = this.currentPage*1+1;
						this.hasMore = has_more;
					} else {
						uni.showToast({
		　　　　　　　　　　　　title: message,
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　});
					};
				}).catch(res => {
					uni.showToast({
	　　　　　　　　　　　　title: "网络异常，请稍后再试！",
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　});
				}).finally(() => {
					uni.hideLoading();
					this.loadingStatus = false;
				});
			},
			imageError: function(e) {
				console.error(e.detail.errMsg);	
			}
		}
	}
</script>

<style scoped>
	.content {
		padding: 0 40rpx;
	}
	.btn_wrap {
		padding: 0 40rpx;
	}
	.btn {
		border-radius: 50rpx;
		margin: 40rpx 0;
	}
	.image-item {
		position: relative;
		margin-top: 38rpx;
		border-radius: 24rpx;
		font-size: 0;
		overflow: hidden;
	}
	.image-list {
		padding-bottom: 40rpx;
	}
	.image-content image {
		width: 100%;
		height: 320rpx;
		border-radius: 24rpx;
	}
	.image-title {
		position: absolute;
		left: 40rpx;
		top: 30rpx;
		font-size: 32rpx;
		color: RGBA(51, 51, 51, 1.00);
	}
	.contactBtn {
		opacity: 0;
		width: 100%;
		height: 320rpx;
		line-height: 320rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 99;
	}
</style>
