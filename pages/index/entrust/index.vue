<template>
	<view class="content">
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" 
					:circular="circular"
					:indicator-dots="indicatorDots" 
					:autoplay="autoplay" 
					:interval="interval" 
					:duration="duration">
						<swiper-item class="swiper-item" v-for="(item,k) in swipperList" :key="k">
							<image :src="item.url" mode="scaleToFill"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="entrust_wrap">
			<view class="entrust_list" v-for="(item, k) in dataList" :key="k">
				<text class="entrust_top_status entrust_top_status1" v-if="item.status === 1">新发布</text>
				<text class="entrust_top_status entrust_top_status2" v-if="item.status === 2">已接单</text>
				<view class="" @click="goToPage(item)">
					<view class="entrust_list_top">
						<view class="entrust_top_info">
							<view class="nick_img">
								<image :src="item.url" mode="aspectFill"></image>
							</view>
							<view class="personal_info">
								<view class="user_img">
									<text>{{item.user_name}}</text>
									<image v-if="item.sex === 1" src="../../../static/img/man.png"></image>
									<image v-if="item.sex === 2" src="../../../static/img/woman.png"></image>
								</view>
								<view>
									<text>{{item.creat_time}}</text>
									<text class="ellipsis">{{item.school}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="entrust_list_main">
						<view class="entrust_list_title">
							<text>{{item.title}}</text>
							<text>¥{{item.money}}</text>
						</view>
						<view class="entrust_content Fellipsis">{{item.content}}</view>
					</view>
				</view>
				<view class="entrust_footer">
					<view @click="digg(k, item.id, item.digg_type)">
						<uni-icons type="hand-thumbsup-filled" color= "#CCCCCC" size="16"></uni-icons>
						<text>{{item.good1}}</text>
					</view>
					<view @click="goToPage(item, 1)">
						<uni-icons type="chat-filled" color= "#CCCCCC" size="16"></uni-icons>
						<text>{{item.good2}}</text>
					</view>
					<view id="share">
						<uni-icons type="redo-filled" color= "#CCCCCC" size="16"></uni-icons>
						<text>{{item.good3}}</text>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="getStatus()"></uni-load-more>
		<view class="top" v-show="topFlag" @click="goTop()">
			<image src="../../../static/img/top.png" mode="scaleToFill"></image>
		</view>
	</view>
</template>

<script>
	import uniIcons from '../../../components/uni-icons/icons.js'
	import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue';
	import { wtList } from '../../../Json.js'
	export default {
		data() {
			return {
				// 轮播
				circular: true,
				indicatorDots: true,
				autoplay: true,
				interval: 4000,
				duration: 800,
				//寄卖
				loadingStatus: false,
				hasMore: true,
				currentPage: 1,
				pageNum: 20,
				dataList: [],
				swipperList: [{
						name: 1,
						url: '../../../static/img/mine.jpeg'
					},
					{
						name: 1,
						url: '../../../static/img/mine.jpeg'
					},
					{
						name: 1,
						url: '../../../static/img/mine.jpeg'
					},
					{
						name: 1,
						url: '../../../static/img/mine.jpeg'
					}],
				topFlag: false
			}
		},
		comments: {
			uniIcons,
			uniLoadMore
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
			}
		},
		onLoad() {
			this.dataList = wtList;
			//this.getSwipperList();
			// this.loadData();
		},
		//上拉加载更多
		onReachBottom() {
			console.log("上拉加载更多");
			// this.loadData();
		},
		//转发
		onShareAppMessage(res) {
			if (res.from === '#share') {// 来自页面内分享按钮
			  console.log(res.target)
			}
			return {
			  title: '分享',
			  path: '/pages/test/test?id=123'
			}
		},
		onPageScroll: function (e) {
		    console.log(e)
		    if (e.scrollTop > 100) {
				this.floorFlag = true;
		    } else {
				this.floorFlag = false;
		    }
		},
		methods: {
			getSwipperList(){
				this.$api.getMessage().then(res => {
					const {status_code, message, message_infos} = res;
					if(status_code === 0){
						this.swipperList = message_infos;
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
				});
			},
			loadData() {
				var vm = this;
				if(this.loadingStatus || !this.hasMore){
					return;
				}
				this.loadingStatus = true;
				this.$api.getMessage({index: vm.currentPage, count: vm.currentPage, message_type: state, schoolName: vm.schoolName}).then(res => {
					// 获得数据 
					const {status_code, message, message_infos, count, has_more} = res;
					if(status_code === 0){
						this.dataList = this.currentPage === 1? message_infos : this.dataList.concat(message_infos);
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
					this.loadingStatus = false;
				});
			},
			//点赞
			digg(k, id, diggType){
				//digg_type 0无意义； 1点赞； 2取消点赞
				diggType = diggType === 1? 2 : 1;
				this.$api.digg({message_id: id, digg_type: diggType}).then(res => {
					// 获得数据 
					const {status_code, message, digg_count} = res;
					if(status_code === 0){
						this.dataList[k].digg_count = digg_count;
						this.dataList[k].digg_type = diggType;
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
				});
			},
			//返回顶部
			goTop: function (e) {  // 一键回到顶部
			    if (uni.pageScrollTo) {
			      uni.pageScrollTo({
			        scrollTop: 0
			      })
			    } else {
			      uni.showModal({
			        title: '提示',
			        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
			      })
			    }
			},
			//评价：1 && 详情：0
			goToPage(detail,type) {
				let url = '/pages/index/entrust/entrustDetail?detail=' + detail;
				url = type? url+'&type=' + type : url;
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style scoped>
	.content {
		padding: 0 40rpx;
	}
	.uni-padding-wrap {
		padding-top: 40rpx;
	}
	.swiper {
		border-radius: 20rpx;
		overflow: hidden;
	}
	.swiper image {
		width: 100%;
		height: 100%;
	}
	
	.entrust_wrap {
		margin-top: 40rpx;
	}
	.entrust_list {
		background-color: #fff;
		padding: 40rpx;
		border-radius: 24rpx;
		margin-bottom: 24rpx;
		position: relative;
		box-shadow: 2rpx 2rpx 12rpx 1rpx #BFBFBF;
	}
	.entrust_top_info {
		display: flex;
		align-items: center;
		padding: 0 0 20rpx 0;
	}
	/* .entrust_top_info image{
		width: 68rpx;
		height: 68rpx;
		border-radius: 50%;
	} */
	.entrust_top_status {
		position: absolute;
		top: 36rpx;
		right: -10rpx;
		padding: 0 20rpx;
		color: #fff;
		font-size: 20rpx;
		line-height: 40rpx;
		border-radius: 20rpx 0 0 20rpx;
		z-index: 999;
	}
	.entrust_top_status1  {
		background: #5FCD79;
	}
	.entrust_top_status2 {
		background: #BB948F;
	}
/* 	.entrust_top_status3 {
		background: #BB948F;
	}
	.entrust_top_status4 {
		background: #BB948F;
	}
	.entrust_top_status5 {
		background: #BB948F;
	} */
	.entrust_top_status::before{
		position: absolute;
		right: 4rpx;
		top: -6rpx;
		z-index: 0;
		content: '';
		display: block;
		width: 0;
		height: 0;
		border: 6rpx solid transparent;
		border-right: 6rpx solid #216B54;
		transform:rotate(-45deg);
		-ms-transform:rotate(-45deg); 	/* IE 9 */
		-moz-transform:rotate(-45deg); 	/* Firefox */
		-webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
		-o-transform:rotate(-45deg); 	/* O
	/* 	margin-top: -5rpx;
		margin-right: -20rpx; */
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
	.user_img image {
		width: 32rpx;
		height: 32rpx;
		margin-left: 20rpx;
		vertical-align: middle;
	}
	.personal_info {
		padding-left: 20rpx;
	}
	.personal_info view:first-child{
	  font-size: 28rpx;
	  color: #333333;
	}
	.personal_info view:last-child{
	  font-size: 24rpx;
	  color: #9A9A9A;
	}
	.personal_info view:last-child text {
		display: inline-block;
		vertical-align: middle;
	}
	.personal_info view:last-child text:first-child {
		width: 190rpx;
	}
	.personal_info view:last-child text:last-child {
		width: 300rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	

	.entrust_list_main {
		padding: 0 26rpx;
		background-color: #FFFDF5;
	}
	.entrust_list_title {
		display: flex;
		justify-content: space-between;
		font-size: 32rpx;
		padding: 24rpx 0;
		border-bottom: 1px solid #E8E8E1;
	}
	.entrust_list_title text:first-child {
		color: #333333;
		
	}
	.entrust_list_title text:last-child {
		color: #ED626C;
	}
	.entrust_content {
		line-height: 48rpx;
		color: #666666;
		font-size: 28rpx;
		padding: 28rpx 0;
	}
	
	/* entrust_footer */
	.entrust_footer {
		text-align: right;
		padding-top: 16rpx;
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
	
	/* top */
	.top {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		position: fixed;
		right: 8rpx;
		bottom: 20rpx;
		display: none;
	}
	.top image{
		width: 100%;
		height: 100%;
	}
	
	.Fellipsis{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 5;
		-webkit-box-orient: vertical;
	}
</style>
