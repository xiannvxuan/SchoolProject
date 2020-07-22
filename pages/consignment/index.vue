<template>
	<view class="content">
		<scroll-view id="tab-bar" 
		class="uni-swiper-tab" 
		scroll-x 
		:scroll-left="scrollLeft">
		    <view 
				v-for="(tab, index) in navList" 
				:key="index" 
				:class="['swiper-tab-list',tabCurrentIndex === index ? 'active' : '']"
		        :id="tab.state" 
				:data-current="index" 
				@click="tabClick(index)">
				{{tab.text}}
			</view>
		</scroll-view>
		<!-- tips -->
		<!-- <view class="tips">
			<view class="tips_tit">
				<image src="../../static/img/tip.png"></image>
				Tips
				<view class="tips_content"></view>
			</view>
			<view class="tips_main">
				同学们，在二手市场交易一定要注意财产安全问题哦～
			</view>
		</view> -->
		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view 
					class="list-scroll-content" 
					scroll-y
					@scrolltolower="loadData"
				>
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					
					<!-- 订单列表 -->
					<view class="order-item-wrap" v-for="(item,index) in tabItem.orderList" :key="index">
						<view
							class="order-item"
						>
							<view class="i-top b-b">
								<view class="i-top-img">
									<image :src="item.url" mode=""></image>
									<view class="i-top-content">
										名称
										<view class="">
											<text>{{item.time}}</text>
											<text class="ellipsis">{{item.school}}</text>
										</view>
									</view>
								</view>
							</view>
							<view 
								v-if="item.goodsList.length > 1" 
								class="goods-box" 
								@click="goToPage('/pages/consignment/consignmentDetail')">
								<view
									class="goods-item"
								>
									<image class="goods-img" :src="item.goodsList[0].image" mode="aspectFill"></image>
								</view>
								<view class="dynamic_list_content Tellipsis">{{item.content}}</view>
							</view>
							<view class="entrust_footer">
								<view>
									<uni-icons type="hand-thumbsup-filled" color= "#CCCCCC" size="16"></uni-icons>
									<text>{{item.good1}}</text>
								</view>
								<view>
									<uni-icons type="chat-filled"  color= "#CCCCCC" size="16"></uni-icons>
									<text>{{item.good2}}</text>
								</view>
								<view>
									<uni-icons type="redo-filled"  color= "#CCCCCC" size="16"></uni-icons>
								</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="getStatus()"></uni-load-more>
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template> 

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	import uniIcons from '../../components/uni-icons/uni-icons.vue'
	import empty from "../../components/empty";
	import {orderList} from "../../Json.js"
	import { formatDate } from '../../utils/date.js';
	export default {
		components: {
			uniLoadMore,
			empty,
			uniIcons
		},
		data() {
			return {
				tabCurrentIndex: 0,
				scrollLeft: 0,
				navList: [{
						state: 0,
						text: '全部',
						loaded: false,
						hasMore: true,
						loadingStatus: true,
						orderList: []
					},
					{
						state: 1,
						text: '书籍',
						loaded: false,
						hasMore: true,
						loadingStatus: true,
						orderList: []
					},
					{
						state: 2,
						text: '生活用品',
						loaded: false,
						hasMore: true,
						loadingStatus: true,
						orderList: []
					},
					{
						state: 3,
						text: '3C数码',
						loaded: false,
						hasMore: true,
						loadingStatus: true,
						orderList: []
					},
					{
						state: 4,
						text: '鞋服美妆',
						loaded: false,
						hasMore: true,
						loadingStatus: true,
						orderList: []
					},
					{
						state: 5,
						text: '其他',
						loaded: false,
						hasMore: true,
						loadingStatus: true,
						orderList: []
					}
				],
			};
		},
		
		onLoad(options) {
			//this.getTag();
			this.loadData();
		},
		onShow(){
		 	const page = this.$mp.page;
		 	if (typeof page.getTabBar === 'function' &&  
		 	    page.getTabBar()) {  
		 	    page.getTabBar().setData({  
		 	        current: 3
		 	    });
		 	}
		},
		computed: {
			getStatus(){
				if(this.loadingStatus){
					return "loading";
				} else if (this.hasMore){
					return "more";
				} else {
					return "noMore";
				}
			},
		},
		methods: {
			getTag() {
				uni.showLoading({
					title: '加载中...'
				});
				this.$api.getTag().then(res => {
				   // 获得数据
				   const {status_code, message, tags} = res;
				   if(status_code === 0){
						this.navList = tags;
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
				}).finally(()=>{
					uni.hideLoading();
				})
			},
			goToPage(url) {
				if(!url) return;
				uni.navigateTo({
					url: url
				});
			},
			//获取订单列表
			loadData(source){
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				
				if(source === 'tabChange' && navItem.loaded === true){
					//tab切换只有第一次需要加载数据
					return;
				}
				if(navItem.loadingStatus || !navItem.hasMore){
					//防止重复加载
					return;
				}
				
				navItem.loadingStatus = true;
				
				this.$api.getMessage({index: vm.currentPage, count: 20, message_type: state, schoolName: vm.schoolName}).then(res => {
					// 获得数据 
					const {status_code, message, message_infos, count, has_more} = res;
					if(status_code === 0){
						navItem.orderList = this.currentPage === 1? message_infos : navItem.orderList.concat(message_infos);
						navItem.hasMore = has_more;
						navItem.loaded = true;
						navItem.currentPage += 1;
					} else {
						uni.showToast({
		　　　　　　　　　　　　title: message,
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　})
					}
				}).catch(res => {
					uni.showToast({
	　　　　　　　　　　　　title: "网络异常，请稍后再试！",
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　 });
				}).finally(()=>{
					navItem.loadingType = false;
				});
			}, 
			//swiper 切换
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index){
				this.tabCurrentIndex = index;
				this.loadData('tabChange');
			},
		},
	}
</script>

<style lang="scss">
	page, .content{
		// background: $page-color-base;
		height: 100%;
	}
	// tips
	.tips {
		padding: 64rpx 40rpx 10rpx 40rpx;
		background-color: #FFFFFF;
	}
	.tips_tit {
		font-size: 48rpx;
		display: flex;
		align-items: center;
	}
	.tips_tit .tips_content{
		font-size: 28rpx;
		margin-left: 20rpx;
	}
	.tips_tit image {
		width: 56rpx;
		height: 56rpx;
		vertical-align: middle;
		margin-right: 16rpx;
	}
	.tips_main {
		font-size: 28rpx;
		color: #818181;
		line-height: 40rpx;
		padding: 0 0 0 50rpx;
	}
	//tit
	.i-top-img {
		display: flex;
		align-items: center;
	}
	.i-top-img image {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	.i-top-content {
		font-size: 28rpx;
		color: #333333;
	}
	.i-top-content view {
		font-size: 24rpx;
		color: #9A9A9A;
		display: flex;
	}
	.i-top-content view text:first-child {
		width: 240rpx;
	}
	.i-top-content view text:last-child {
		width: 240rpx;
		flex: 1;
	}
	.uni-swiper-tab {
	    width: 100%;
		line-height: 72rpx;
	    white-space: nowrap;
	    position: fixed;
	    background: #FFFFFF;
	    z-index: 999;
	    top: var(--window-top);
	    left: 0;
	}
	.swiper-tab-list {
		font-size: 30rpx;
		margin: 0 16rpx;
	    display: inline-block;
	    text-align: center;
	    color: #999999;
		border-bottom: 4px solid #FFFFFF;
	}
	.uni-swiper-tab .active {
		// border-bottom: 4px solid #E84752;
		border-bottom: 4px solid #000;
		color: #000;
	}
	
	.swiper-box{
		height: 100%;
		margin-top: 82rpx;
	}
	.list-scroll-content{
		height: 100%;
	}
	
	
	// uni-swiper-item
	.order-item-wrap {
		padding: 0 40rpx;
		margin-top: 32rpx;
	}
	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding: 40rpx 40rpx 28rpx 40rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		box-shadow: 2rpx 2rpx 12rpx 1rpx #BFBFBF;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
		}
		/* 多条商品 */
		.goods-box{
			// padding: 0rpx 98rpx;
			.goods-item{
				width: 386rpx;
				height: 386rpx;
				display: inline-block;
				padding: 12rpx 0;
				border-radius: 16rpx;
				overflow: hidden;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 16rpx;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}
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
	.dynamic_list_content {
	  background: #fff;
	  line-height: 38rpx;
	  font-size: 28rpx;
	  color: #9B9B9B;
	}
	
	/* entrust_footer */
	.entrust_footer {
		text-align: right;
		padding-top: 10rpx;
	}
	.entrust_footer view {
		display: inline-block;
		color: #CCCCCC;
		font-size: 0rpx;
		margin-left: 48rpx;
		
	}
	.entrust_footer uni-icons {
		color: #CCCCCC;
		vertical-align: top;
	}
	.entrust_footer text {
		color: #6B6B6B;
		font-size: 24rpx;
		vertical-align: top;
		padding-left: 16rpx;
	}
</style>
