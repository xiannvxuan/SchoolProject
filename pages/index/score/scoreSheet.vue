<template>
	<view>
		<view class="sheet-header">
		  <text class="header-text">成绩查询</text>
		  <button type='default' size="mini" class="header-btn" plain="true" @click="refresh">同步成绩</button>
		</view>
		<view class="total">
			<view>
				<view class="">
						<text>81.6</text>
						<text>平均成绩</text>
					</view>
					<view class="">
						<text>81.6</text>
						<text>已修学分</text>
					</view>
				</view>
			</view>
		<empty v-if="!hasMore && dataList.length < 1"></empty>
		<view class="table_wrap" v-if="dataList.length > 0">
			
			<view class="table sheet-table">
				<view class="table-title">
					<text>2016-2017</text><text>第一学期</text>
				</view>
				<view class="table-content">
					<view class="tr tr-title">
						<view class="th">课程名称</view>
						<view class="th">学分</view>
						<view class="th ">成绩</view>
					</view>
					<view
						  class="tr tr-content"
						  v-for="(item, key) in dataList"
						  :key="key">
						  <view class="td">{{item.value1}}</view>
						  <view class="td">{{item.value2}}</view>
						  <view class="td">{{item.value3}}</view>
					</view>
				</view>
			</view>
			<view class="table sheet-table">
				<view class="table-title">
					<text>2016-2017</text><text>第一学期</text>
				</view>
				<view class="table-content">
					<view class="tr tr-title">
						<view class="th">课程名称</view>
						<view class="th">学分</view>
						<view class="th ">成绩</view>
					</view>
					<view
						  class="tr tr-content"
						  v-for="(item, key) in dataList"
						  :key="key">
						  <view class="td">{{item.value1}}</view>
						  <view class="td">{{item.value2}}</view>
						  <view class="td">{{item.value3}}</view>
					</view>
				</view>
			</view>
			<view class="table sheet-table">
				<view class="table-title">
					<text>2016-2017</text><text>第一学期</text>
				</view>
				<view class="table-content">
					<view class="tr tr-title">
						<view class="th">课程名称</view>
						<view class="th">学分</view>
						<view class="th ">成绩</view>
					</view>
					<view
						  class="tr tr-content"
						  v-for="(item, key) in tableList"
						  :key="key">
						  <view class="td">{{item.value1}}</view>
						  <view class="td">{{item.value2}}</view>
						  <view class="td">{{item.value3}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="getStatus()"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue';
	import empty from '../../../components/empty.vue'
	export default {
		data() {    
			return {
				hasMore: true,
				dataList:[
				  {value1: '综合训练', value2: '2	.00', value3: '88'},
				  {value1: '创业就业指导', value2: '99.99', value3: '60.99'},
				  {value1: '经济法', value2: '2', value3: '79.3'},
				  {value1: '毛泽东思想和中国特色社会主义理论体系概论', value2: '9.99', value3: '79.99'},
				]
			}
		},
		components:{
			uniLoadMore,
			empty
		},
		onLoad() {
			console.log("成绩查询onLoad");
			//this.loadData();
		},
		//上拉加载更多
		// onReachBottom() {
		// 	console.log("上拉加载更多");
		// 	this.loadData();
		// },
		methods: {
			loadData() {
				var vm = this;
				if(this.loadingStatus || !this.hasMore){
					return;
				}
				uni.showLoading({
					title: '加载中...'
				})
				this.$api.getMessage({index: vm.currentPage, count: vm.currentPage, message_type: state, schoolName: vm.schoolName}).then(res => {
					// 获得数据 
					const {status_code, message, message_infos, count, has_more} = res;
					if(status_code === 0){
						this.dataList = message_infos;
						this.hasMore = false;
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
				});
			},
			//刷新成绩列表
			refresh() {
				this.hasMore = true;
				this.loadData();
			},
			getStatus(){
				if(this.loadingStatus){
					return "loading";
				} else if (this.hasMore){
					return "more";
				} else {
					return "noMore";
				}
			}
		}
	}
</script>

<style scoped>
	page{
	  padding: 0;
	}
	.sheet-header{
	  display: flex;
	  align-items: center;
	  padding:20rpx 40rpx;
	  width: 100%;
	  position: fixed;
	  left: 0;
	  top: 0;
	  background-color: #FFFFFF;
	}
	.sheet-header .header-text{
	  width: calc(100% - 160rpx);
	  white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}
	.sheet-header .header-btn{
	  width: 150rpx;
	  font-size: 24rpx;
	  padding: 0;
	}
	
	/* table */
	.table-title {
		padding: 0 20rpx 20rpx 20rpx;
		font-size: 32rpx;
		/* display: flex;
		justify-content: space-between;
		align-items: center; */
		color: #2B2B2B;
	}
	.table-content {
		background-color: #FEFDF4;
		padding: 20rpx;
		border-radius: 24rpx;
	}
	.table_wrap {
		padding: 0rpx 40rpx 20rpx 40rpx;
	}
	.table {
		border-radius: 24rpx;
		box-shadow: 2rpx 2rpx 12rpx 1rpx #BFBFBF;
		margin-top: 38rpx;
		background-color: #FFFFFF;
	}
	
	.sheet-table.table {
	  padding: 40rpx;
	}
	
	.sheet-table.table .tr {
	  width: 100%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.tr-title {
		font-size: 32rpx;
		height: 80rpx;
		text-align: center;
		color: #2B2B2B;
	}
	
	.tr-content {
		font-size: 28rpx;
		text-align: center;
		color: #6D6D6D;
		padding: 16rpx 0rpx;
	}
	.tr-content .td {
		
	}
	.sheet-table.table .tr .th,
	.sheet-table.table .tr .td {
		width: 100rpx;
	}
	
	.sheet-table.table .tr .th:first-child,
	.sheet-table.table .tr .td:first-child {
		flex: 1;
		text-align: left;
		padding-right: 8rpx;
	} 
	
	/* total */
	.total {
		padding: 0 40rpx;
	}
	.total > view {
		display: flex;
		height: 136rpx;
		margin-top: 136rpx;
		box-shadow: 2rpx 2rpx 12rpx 1rpx #BFBFBF;
		border-radius: 24rpx;
		overflow: hidden;
	}
	.total > view view{
		flex:1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		background: #FFFFFF;
	}
	
	.total > view view text:first-child{
		font-size: 36rpx;
	}
	.total > view view text:last-child{
		color: #6D6D6D;
		font-size: 24rpx;
		border-radius: 0 24rpx 24rpx 0;
	}
</style>
