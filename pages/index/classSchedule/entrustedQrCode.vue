<template>
	<view class="entrustedQrCode_content">
	    <view class="entrustedQrCode_img_wrap">
	      <image :src="url" mode="aspectFit"></image>
	    </view>
	 <!--   <button class="myBtn saveBtn" open-type="share">保存图片</button> -->
	    <button class="myBtn saveBtn" @click="downloadFile">保存图片</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: '../../../static/img/code.jpg'
			}
		},
		onLoad(){
			uni.hideShareMenu();
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '自定义分享标题',
			  imageUrl: "../../static/img/code.jpeg",
		      // path: '/pages/index/classSchedule/entrustedQrCode',
		    }
		},
		methods: {
			downloadFile() {
				let vm = this;
			    uni.downloadFile({
					url: vm.url, 
					success: (res) => {
						if (res.statusCode === 200) {
							let file = res.tempFilePath;
							vm.save(file)
						}
					}
				});
			},
			save(url){
			    let vm = this;
				uni.showLoading({
					title: '保存中...'
				});
				uni.saveImageToPhotosAlbum({
					filePath: url,
					success: () => {
						uni.hideLoading();
						uni.showToast({
		　　　　　　　　　　　　title: "图片已保存",
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　})
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
		　　　　　　　　　　　　title: "保存失败",
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　})
					},
					complete: () => {
					
					}
				});
			},
		}
	}
</script>

<style scoped>
	.entrustedQrCode_content {
		width: 100%;
		height: 100%;
		padding: 0 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.entrustedQrCode_img_wrap {
	  width: 100%;
	  height: 650rpx;
	}
	image {
	  width: 100%;
	  height: 100%;
	}
	.saveBtn {
	  width: 100%;
	  font-size: 32rpx;
	  color: #fff;
	  margin-top: 60rpx;
	  line-height: 90rpx;
	}
</style>
