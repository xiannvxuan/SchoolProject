<template>
	<view class="school">
		<view class="searchBar">
			<uniSearchBar :radius="100" @input="search" @cancel="cancel"></uniSearchBar>
		</view>
		<view class="tab-wrap" v-if="isTag">
			<view class="tabTitle">热门</view>
			<view class="tagList">
				<text v-for="(val, k) in tagList" :key="k" @click="selectSchool(val)">{{val}}</text>
			</view>
		</view>
		<scroll-view class="uni-indexed-list" scroll-y="true" v-else>
			<view v-for="(val,k) in schoolList" :key="k" class="uni-indexed-list-item" @click="selectSchool(val)">{{val}}</view>
		</scroll-view>
	</view>
</template>

<script>
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	export default {
		data() {
			return {
				isTag: true,
				tagList: ["全部"],
				schoolList: [],
				totalList: [],
			}
		},
		components: {
			uniSearchBar
		},
		onLoad(){
			// this.getTag();
			this.getList();
		},
		methods: {
			getList() {
				uni.showLoading({
					mask: true,
				    title: '加载中...'
				});
				this.$api.getSchoolList().then(res => {
				   // 获得数据
				   const {status_code, message, schools} = res;
				   if(status_code === 0){
					    this.schoolList = schools;
						this.totalList = schools;
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
					uni.hideLoading();
				});
			},
			getTag() {
				this.$api.getTag().then(res => {
				   // 获得数据
				   const {status_code, message, tags} = res;
				   if(status_code === 0){
						this.tagList = ["全部"].concat(tags);
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
				});
			},
			search(e) {
				const val = e.value.trim();
				if(val){
					const list = this.totalList.filter((item)=>{
						return item.indexOf(val) > -1;
					});
					this.isTag = false;
					this.schoolList = list;
				} else {
					this.isTag = true;
					this.schoolList = [];
				}
			},
			cancel(){
				this.isTag = true;
				this.schoolList = [];
			},
			selectSchool(val) {
				uni.reLaunch({
				    url: "/pages/dynamic/index?name=" + val
				});
			}
		}
	}
</script>

<style scoped>
	.school {
		padding-top: 120rpx;
	}
	.searchBar {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 999;
		padding: 0 20rpx;
		background-color: #FFFFFF;
	}
	/* tagList */
	.tab-wrap {
		padding: 20rpx 40rpx 40rpx 40rpx;
		background-color: #FFFFFF;
	}
	.tab-wrap .tabTitle {
		color: #9C9C9C;
		font-size: 28rpx;
	}
	.tagList {
		display: flex;
		flex-wrap: wrap;
	}
	.tagList text {
		display: inline-block;
		padding: 0 20rpx;
		background-color: #EEEEEE;
		line-height: 54rpx;
		border-radius: 26rpx;
		font-size: 28rpx;
		color: #333333;
		margin-right: 28rpx;
		margin-top: 20rpx;
	}
	.school .uni-indexed-list{
		background-color: #FFFFFF;
		padding: 0 40rpx;
	}
	.uni-indexed-list-item {
		display: flex;
		align-items: center;
		height: 100rpx;
		font-size: 28rpx;
		color: #4A4A4A;
		border-bottom: 2rpx solid #e5e5e5; 
	}
	.uni-indexed-list-item:last-child {
		border-bottom: none;
	}
	
</style>
