<template>
	<view class="detail-content">
		<view class="dynamic_top">
			<view class="dynamic_list_wrap">
				<view class="nick_img">
					<image :src="consignmentDetail.avator" mode="scaleToFill"></image>
				</view>
				<view class="dynamic_list_info">
					<view>
						{{consignmentDetail.nickname || "匿名"}}
						<image v-if="consignmentDetail.sex===1" src="../../static/img/man.png" mode=""></image>
						<image v-if="consignmentDetail.sex===2" src="../../static/img/woman.png" mode=""></image>
					</view>
					<view class="">
						<text>{{consignmentDetail.create_time}}</text>
						<text>{{consignmentDetail.school}}</text>
					</view>
				</view>
			</view>
			<!-- <view @click="previewImage">
				<image class="image-content" :src="currentSrc" mode="aspectFill"></image>
			</view> -->
			<!-- <scroll-view 
			id="tab-bar" 
			class="uni-swiper-tab" 
			scroll-x 
			:scroll-left="scrollLeft">
				<view
					v-if="dataList.urls.length > 1"
					v-for="(item, k) in dataList.urls" 
					:key='k'
					:class="currentIndex === k? 'goods-item active' : 'goods-item'"
					@click="setIndex(k)">
					<image class="goods-img" :src="item" mode="aspectFill"></image>
				</view>
			</scroll-view> -->
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" 
						:circular="false"
						:indicator-dots="false" 
						:autoplay="false" 
						:interval="interval" 
						:duration="duration">
							<swiper-item class="swiper-item" v-for="(item,k) in dataList.urls" :key="k" @click="previewImage(k)">
								<image :src="item" mode="aspectFill" ></image>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<view class="dynamic_list_content">{{dataList.content}}</view>
		</view>
		<view class="review">
			<view class="review-tit">评价</view>
			<view class="review-list-wrap">
				<view class="review-content-wrap" v-for="(item, k) in dataList" :key="k">
					<view class="review-list">
						<view class="nick_img">
							<image :src="item.url" mode="scaleToFill"></image>
						</view>
						<view class="dynamic_list_info">
							<view class="nickname">
								<view class="">
									<view>{{item.nickname}}</view>
									<image v-if="item.sex === 1" src="../../static/img/man.png"></image>
									<image v-if="item.sex === 2" src="../../static/img/woman.png"></image>
								</view>
								<!-- <view class="good">
									60<uni-icons type="hand-thumbsup-filled" size="16" color="#CCCCCC"></uni-icons>
								</view> -->
							</view>
							<view class="nickInfo">
								<view>{{item.date}}</view>
								<view class="school">{{item.school}}</view>
							</view>
						</view>
					</view>
					<view class="review-content">{{item.content}}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
		<div class="btn_wrap">
			<view class="btn_price">
				<text>¥2.00</text>
				<text>¥3.00</text>
			</view>
			<button class="btn">我想要</button>
		</div>
	</view>
</template> 

<script>
	import { formatDate } from '../../utils/date.js';
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	import empty from "../../components/empty";
	import { dynamicDetail } from '../../Json.js';
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				consignmentDetail: null,
				tabCurrentIndex: 0,
				scrollLeft: 0,
				interval: 4000,
				duration: 800,
				// currentSrc: "https://img.alicdn.com/imgextra/i4/3470687433/O1CN0124mMQOSERr18L1h_!!3470687433.jpg_430x430q90.jpg",
				currentIndex: 0,
				dataList: [],
				loadingType: "noMore"
			};
		},
		
		onLoad(options){
			this.dataList = dynamicDetail;
		},
		 
		methods: {
			goToPage(url) {
				if(!url) return;
				uni.navigateTo({
					url: url
				});
			},
			format(date) {
				console.log(date, "date")
				return formatDate(date, 'yyyy-MM-dd');
			},
			//预览图片
			previewImage(index) {
				const list = this.dataList.urls;
				this.currentIndex = index;
				uni.previewImage({
					urls: list,
					current: this.currentIndex
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.detail-content {
		padding-bottom: 80rpx;
	}
	.dynamic_top{
		padding: 0 40rpx;
		background-color: #FFFFFF;
	}
	//昵称
	.dynamic_list_wrap {
	  display: flex;
	  align-items: center;
	  padding: 20rpx 0;
	}
	.nick_img {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
	}
	.nick_img > image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.dynamic_list_info {
		padding-left: 20rpx;
	}
	.dynamic_list_info image {
		width: 32rpx;
		height: 32rpx;
		margin-left: 20rpx;
		vertical-align: middle;
	}
	.dynamic_list_info view:first-child{
	  font-size: 28rpx;
	  color: #333333;
	}
	.dynamic_list_info view:last-child{
	  /* display: flex; */
	  font-size: 24rpx;
	  color: #9A9A9A;
	}
	.dynamic_list_info view:last-child text {
		display: inline-block;
		vertical-align: middle;
	}
	.dynamic_list_info view:last-child text:first-child {
		width: 190rpx;
	}
	.dynamic_list_info view:last-child text:last-child {
		width: 300rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.dynamic_list_content {
	  padding: 40rpx 0 36rpx 0;
	  line-height: 38rpx;
	  font-size: 28rpx;
	  color: #9B9B9B;
	}
	.uni-padding-wrap {
		background-color: #FFFFFF;
	}
	.swiper{
		// border-radius: 20rpx;
		overflow: hidden;
		height: 750rpx;
	}
	
	.swiper image {
		width: 100%;
		height: 100%;
	}
	// 图片
	// .image-content {
	// 	width: 100%;
	// 	height: 670rpx;
	// }
	// .uni-swiper-tab {
	//     width: 100%;
	// 	white-space: nowrap;
	// }
	// .goods-item {
	// 	display: inline-block;
	// 	vertical-align: middle;
	// 	width: 160rpx;
	// 	height: 160rpx;
	// 	// margin-right: 10rpx;
	// 	border: 8rpx solid #FFFFFF;
	// }
	// .uni-swiper-tab .active {
	// 	border-color: #439AD0;
	// }
	// .goods-item image {
	// 	width: 100%;
	// 	height: 100%;
	// }
	
	// 评价
	.list-scroll-content{
		// height: 100%;
	}
	
	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}
	
	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}
	
	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}
	
	.uni-load-more__img>view {
		position: absolute
	}
	
	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}
	
	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}
	
	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}
	
	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}
	
	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}
	
	.load2 {
		transform: rotate(30deg)
	}
	
	.load3 {
		transform: rotate(60deg)
	}
	
	.load1 view:nth-child(1) {
		animation-delay: 0s
	}
	
	.load2 view:nth-child(1) {
		animation-delay: .13s
	}
	
	.load3 view:nth-child(1) {
		animation-delay: .26s
	}
	
	.load1 view:nth-child(2) {
		animation-delay: .39s
	}
	
	.load2 view:nth-child(2) {
		animation-delay: .52s
	}
	
	.load3 view:nth-child(2) {
		animation-delay: .65s
	}
	
	.load1 view:nth-child(3) {
		animation-delay: .78s
	}
	
	.load2 view:nth-child(3) {
		animation-delay: .91s
	}
	
	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}
	
	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}
	
	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}
	
	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}
	
	@-webkit-keyframes load {
		0% {
			opacity: 1
		}
	
		100% {
			opacity: .2
		}
	}
	// 评价
	.review {
		background-color: #FFFFFF;
		padding: 20rpx 40rpx;
		margin-top: 20rpx;
	}
	.review-tit {
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}
	
	.review-list {
		display: flex;
		align-items: center;
		margin-top: 40rpx;
	}
	.nick_img {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
	}
	.nick_img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.nickname {
		display: flex;
		align-items: center;
	}
	
	.nickname view {
		font-size: 28rpx;
		color: #333333;
		display: inline-block;
	}
	.nickname view view {
		vertical-align: middle;
	}
	.nickname image{
		width: 32rpx;
		height: 32rpx;
		margin-left: 20rpx;
		vertical-align: middle;
	}

	.review-list > .review_item {
		flex: 1;
	}
	
	.review-content {
		padding: 12rpx 0 0 96rpx ;
		font-size: 28rpx;
		color: #A9A9A9;
	}
	// 按钮
	.btn_wrap {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		background: #FFFFFF;
		padding-left: 52rpx;
		box-shadow: 0rpx 16rpx 30rpx 4rpx #292929;
	}
	.btn_wrap .btn_price text {
		font-weight: bolder;
	}
	.btn_wrap .btn_price text:first-child{
		color: #F8CC46;
		font-size: 46rpx;
	}
	.btn_wrap .btn_price text:last-child{
		color: #C9C9C9;
		font-size: 24rpx;
		text-decoration: line-through;
		margin-left: 16rpx;
	}
	.btn_wrap .btn {
		width: 200rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #fff;
		background-color: #439AD0;
		margin: 0;
		border-radius: 0;
	}
</style>
