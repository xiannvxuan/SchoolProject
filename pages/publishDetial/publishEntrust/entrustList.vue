<template>
	<view>
		<view class="tit">
			<view>新发布</view>
			<view>我接单</view>
		</view>
		<scroll-view 
			class="scroll-view_H" 
			scroll-x="true" 
			@scroll="scroll" 
			scroll-left="120">
			<view id="demo1" class="scroll-view-item_H uni-bg-red">
				<view class="product_list">
					<view class="nickName">
						<image src="../../../static/img/mine.jpeg" mode=""></image>
						<view class="orderInfo">
							用户昵称
							<view class="order">
								<view>订单编号</view>
								<view>2018-09-08</view>
							</view>
						</view>
					</view>
					<view class="product_wrap">
						<image src="../../../static/img/mine.jpeg" mode=""></image>
						<view class="product_info">
							<view class="product_tit Tellipsis">
								描述米阿西哦地描述米阿西哦地方的风景就好辅导费花都湖的高糊描述米阿西哦地方的风景就好辅导费花都湖的高糊方的风景就好辅导费花都湖的高糊u 风格化度过
							</view>
							<view class="btn_wrap">
								<text>¥0.00</text>
								<button type="default">编辑</button>
							</view>
						</view>
					</view>
				</view>
				<view class="product_list">
					<view class="nickName">
						<image src="../../../static/img/mine.jpeg" mode=""></image>
						<view class="orderInfo">
							用户昵称
							<view class="order">
								<view>订单编号</view>
								<view>2018-09-08</view>
							</view>
						</view>
					</view>
					<view class="product_wrap">
						<image src="../../../static/img/mine.jpeg" mode=""></image>
						<view class="product_info">
							<view class="product_tit Tellipsis">
								描述米阿西哦地描述米阿西哦地方的风景就好辅导费花都湖的高糊描述米阿西哦地方的风景就好辅导费花都湖的高糊方的风景就好辅导费花都湖的高糊u 风格化度过
							</view>
							<view class="btn_wrap">
								<text>¥0.00</text>
								<button type="default">编辑</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view id="demo2" class="scroll-view-item_H uni-bg-green">
				
			</view> -->
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.tit {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 36rpx;
		background-color: #FFFFFF;
	}
	.tit > view {
		width: 280rpx;
		font-size: 28rpx;
		text-align: center;
	}
	.scroll-view_H {
		
	}
	.product_list {
		background-color: #FFFFFF;
		margin-bottom: 10rpx;
		padding: 34rpx 40rpx;
	}
	.nickName {
		display: flex;
		align-items: center;
	}
	.nickName image {
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
	}
	.orderInfo {
	    font-size: 24rpx;
		padding-left: 18rpx;
		flex: 1;
	}
	.order {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20rpx;
		color: #333333;
		line-height: 36rpx;
	}
	/* 商品详情 */
	.product_wrap {
		display: flex;
		align-items: center;
		padding-top: 34rpx;
	}
	.product_wrap image{
		width: 120rpx;
		height: 120rpx;
		
	}
	.product_tit {
		font-size: 24rpx;
	}
	.product_info {
		flex: 1;
		padding-left: 20rpx;
	}
	.btn_wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 16rpx;
	}
	.btn_wrap text {
		color: #F8CC46;
		font-size: 24rpx;
		font-weight: bold;
	}
	.btn_wrap button {
		font-size: 20rpx;
		line-height: 40rpx;
		margin: 0;
		background-color: #FFFFFF;
	}
</style>
