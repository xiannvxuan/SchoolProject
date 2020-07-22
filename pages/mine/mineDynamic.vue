<template>
	<view class="content">
		<view class='dynamic_wrap'>
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
				<view class="swiper-tab-list location ellipsis" @click="goToPage('/pages/dynamic/school')">
					<!-- <uni-icons type="location-filled"  color= "#CCCCCC" size="16"></uni-icons> -->
					<image src="../../static/img/point.png" mode="scaleToFill"></image>
					{{schoolName}}
				</view>
			</scroll-view>
			<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
					<scroll-view
						class="list-scroll-content" 
						scroll-y
						@scrolltolower="loadData"
					>
						<!-- 空白页 -->
						<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
						<view class='dynamic_image_wrap' v-if="tab">
							<view class="dynamic_content">
								<view v-for="(val, k) in swipperList" :key="k">
								   <image :src='val.url' mode="scaleToFill"></image>
								</view>
							</view>
						</view>
						<view class="dynamic_list">
							<view v-for="(item, index) in tabItem.orderList" :key= "index" style="margin-top: 32rpx;" @click="goToPage('/pages/dynamic/dynamicDetail',item)">
								<view class="dynamic_list_wrap">
									<view class="nick_img">
										<image :src="item.avator" mode="scaleToFill"></image>
									</view>
									<view class="dynamic_list_info">
										<view>
											{{item.nickname || "匿名"}}
											<image v-if="item.sex==='男'" src="../../static/img/man.png" mode=""></image>
											<image v-else src="../../static/img/woman.png" mode=""></image>
										</view>
										<view class="">
											<text>{{format(item.create_time)}}</text>
											<text>{{item.school}}</text>
										</view>
									</view>
								</view>
								<view class="dynamic_img_wrap">
									<view v-for="(val, idx) in item.urls" :key="idx">
									    <image :src='val'  mode="aspectFill"></image>
									</view>
								</view>
								<view class="dynamic_list_content ellipsisT">{{item.content}}</view>
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
						<view class="top" v-show="tabItem.topFlag" @click="goTop()">
							<image src="../../static/img/top.png" mode=""></image>
						</view>
						<uni-load-more :status="getStatus(tabItem)"></uni-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import empty from "../../components/empty";
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
    import {swipperList, dynamicList} from "../../Json.js";
	import { formatDate } from '../../utils/date.js'
	export default {
		data() {
			return {
				swipperList: [],
				tab: false,
				tabCurrentIndex: 0,
				scrollLeft: 0,
				schoolName: "全部",
				currentPage: 1,
				dataList: [],
				sex: '男',
				navList: [],
			}
		},
		components: {
			uniLoadMore,
			empty
		},
		onShow(){
			console.log(this.$tabIndex,"$tabIndex");
			const page = this.$mp.page;
			if (typeof page.getTabBar === 'function' &&  
			    page.getTabBar()) {  
				this.$index = 1;
			    page.getTabBar().setData({  
			        current: 1 
			    });
			}
		},
		onLoad(option) {
			this.schoolName = option.name || '全部';
			//this.getSwipperList();
			this.loadData();
			
			// 模拟数据
			this.swipperList = swipperList;
			// let index = this.tabCurrentIndex;
			// let navItem = this.navList[index];
			// navItem.loadingStatus = true;
			// navItem.orderList = navItem.orderList.concat(dynamicList.message_infos);
			// navItem.loadingStatus = false;
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log("======onPullDownRefresh======");
			let index = this.tabCurrentIndex;
			let navItem = this.navList[index];
			navItem.currentPage = 1;
			navItem.hasMore = true;
			// this.getSwipperList();
			// this.onLoad();
			
			
			// 模拟数据
			this.swipperList = swipperList;
			navItem.orderList = dynamicList.message_infos;
		},
		// onPageScroll(obj) {
		// 	let index = this.tabCurrentIndex;
		// 	let navItem = this.navList[index];
		// 	if(obj.screenTop > 400) {
		// 		navItem.topFlag = true;
		// 	} else {
		// 		navItem.topFlag = false;
		// 	}
		// },
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
			loadData(source) {
				let vm = this;
				let index = vm.tabCurrentIndex;
				let navItem = vm.navList[index];
				let state = navItem.state;
				
				if(source === 'tab' && navItem.loaded === true){
					return;
				}
				
				if(navItem.loadingType || !navItem.hasMore){
					return;
				}
				
				navItem.loadingType = true;
				
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
				})
			},
			loadHotData(source){
				let vm = this;
				let index = vm.tabCurrentIndex;
				let navItem = vm.navList[index];
				let state = navItem.state;
				
				if(source === 'tab' && navItem.loaded === true){
					return;
				}
				
				if(navItem.loadingType || !navItem.hasMore){
					return;
				}
				
				navItem.loadingType = true;
				
				this.$api.getHotMessage({index: vm.currentPage, count: 20, message_type: state, schoolName: vm.schoolName}).then(res => {
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
			getStatus(navItem){
				if(navItem.loadingStatus){
					return "loading";
				} else if (navItem.hasMore){
					return "more";
				} else {
					return "noMore";
				}
			},
			format(date) {  
				return formatDate(date, 'yyyy-MM-dd');
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.loadData("tab");
			},
			changeTab(e){
				this.tabCurrentIndex = e.target.current;
				if(this.tabCurrentIndex === 0){
					this.loadData("tab");
				} else {
					this.loadHoteData("tab");
				}
				
			},
			goTop(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			goToPage(url, item) {
				if(!url) return;
				url = item? url + '?dynamicDetail = ' + item : url;
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style scoped>
	/* pages/dynamic/dynamic.wxss */
	.content, .swiper-box, .dynamic_wrap {
		width: 100%;
		height: 100%;
	}
	
	.dynamic_wrap {
		overflow: hidden;
		overflow-y: scroll;
		padding-bottom: 96rpx;
		color: #444444;
		background-color: #EEEEEE;
	}
	.uni-swiper-tab {
	    width: 100%;
	    white-space: nowrap;
	    position: fixed;
	    background: #FFFFFF;
	    z-index: 999;
	    top: var(--window-top);
	    left: 0;
		padding: 0 40rpx;
	}
	.uni-swiper-tab .active {
		color: #000000;
		border-bottom: 4px solid #000000;
	}
	.swiper-tab-list {
		margin: 0 26rpx;
		font-size: 32rpx;
		line-height: 76rpx;
	    display: inline-block;
	    text-align: center;
	    color: #999999;
		cursor: pointer;
		border-bottom: 4px solid #FFFFFF;
	}
	
	.swiper-box {
		margin-top: 84rpx;
	}
	.location{
		width: 280rpx;
		font-size: 28rpx;
		float: right;
		text-align: right;
		color: RGBA(51, 51, 51, 1.00);
	}
	.location uni-icons, .location image {
		width: 42rpx;
		height: 36rpx;
		margin-right: 8rpx;
		vertical-align: middle;
	}

	/* 轮播 */
	.dynamic_image_wrap {
	  margin-top: 32rpx;
	  padding: 0rpx 40rpx 0rpx 40rpx;
	}
	.dynamic_image_wrap .dynamic_content {
		background: #fff;
		display: flex;
		flex-wrap: wrap;
		border-radius: 24rpx;
		overflow: hidden;
		padding: 10rpx;
	}
	.dynamic_content view {
		width: 33.3%;
		padding: 10rpx;
		height: 120rpx;
		font-size: 0;
		overflow: hidden;
	}
	.dynamic_image_wrap image {
	  width: 100%;
	  height: 100%;
	  border-radius: 16rpx;
	}
	/* 轮播 */
	.dynamic_list {
	  padding: 0rpx 40rpx;
	  /* padding: 40rpx 40rpx 28rpx 40rpx; */
	}
	.dynamic_list > view {
		border-radius: 24rpx;
		background: #FFFFFF;
		box-shadow: 2rpx 2rpx 12rpx 1rpx #BFBFBF;
		/* padding: 52rpx 40rpx 40rpx 40rpx; */
		padding: 40rpx 40rpx 28rpx 40rpx;
	}
	.dynamic_list_wrap {
	  display: flex;
	  align-items: center;
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

	.dynamic_img_wrap {
	  display: flex;
	  flex-wrap: wrap;
	}
	.dynamic_img_wrap view {
	  width: 183rpx;
	  height: 183rpx;
	  margin: 20rpx 0;
	}
	.dynamic_img_wrap view:nth-child(3n+2) {
		margin: 20rpx;
	}
	.dynamic_img_wrap view image {
	  width: 100%;
	  height: 100%;
	  border-radius: 16rpx; 
	}
	.dynamic_list_content {
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
	
	
	/* swipper */
	.list-scroll-content{
		height: 100%;
	}
	
	.uni-swiper-item{
		height: auto;
	}
	.order-item{
		display: flex;
		flex-direction: column;
		padding: 30rpx 40rpx 0 30rpx;
		background: #FFFFFF;
		margin-bottom: 16upx;
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
</style>
