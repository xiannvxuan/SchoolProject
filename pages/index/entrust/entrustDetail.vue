<template>
	<view class="content">
		<view class="user_wrap">
			<view class="user_info">
				<image src="../../../static/img/mine.jpeg"></image>
				<view>
					<view>{{entrustDetail.nick_name}}</view>
					<view>{{entrustDetail.creat_time}}</view>
				</view>
			</view>
			<view class="entrust_list_main">
				<view class="entrust_list_title">
					<text>
						{{item.user_name + ' ' + item.phone}} 
					</text>
					<text>¥{{item.money}}</text>
				</view>
				<view class="entrust_content">{{entrustDetail.content}}</view>
			</view>
			<view class="status">
				<text>任务状态</text>
				<uni-steps 
				active-color="#439AD0"
				:options="[
					{title: '新发布'}, 
					{title: '被接单'}, 
					{title: '已完成'}, 
					{title: '已结算'}
				]" 
				:active="item.status"
				></uni-steps>
			</view>
			<!-- 委托详情买家 -->
			<!-- <button class="btn">接单</button>
			<button class="btn">申请完成</button>
			<button class="btn">申请结算</button>
			<button class="btn">已完成</button> -->
			<!-- 委托详情卖家 -->
			<button class="btn">允许接单</button>
			<!-- <button class="btn">确认完成</button>
			<button class="btn">结算佣金</button> -->
			<!--  预约-->
			<!-- <button class="btn">立即预约</button> -->
		</view>
		<view class="review">
			<view class="review-tit">
				<uni-icons type="hand-thumbsup-filled" size="16" color="#CCCCCC"></uni-icons>60
			</view>
			<view class="review-tit">
				<uni-icons type="chat-filled" size="16" color="#CCCCCC"></uni-icons>20
			</view>
			<view class="review-list-wrap">
				<view class="review-content-wrap" v-for="(item, k) in dataList" :key="k">
					<view class="review-list">
						<view class="nick_img">
							<image :src="item.url"></image>
						</view>
						<view class="dynamic_list_info">
							<view class="nickname">
								<view class="">
									<view>{{item.user_name}}</view>
									<image v-if="item.sex === 1" src="../../../static/img/man.png"></image>
									<image v-if="item.sex === 2" src="../../../static/img/woman.png"></image>
								</view>
								<view class="good">
									{{item.good1}}<uni-icons type="hand-thumbsup-filled" size="16" color="#CCCCCC"></uni-icons>
								</view>
							</view>
							<view class="nickInfo">
								<view class="ellipsis">{{item.creat_time}}</view>
								<view class="school ellipsis">{{item.school}}</view>
							</view>
						</view>
					</view>
				
					<view class="review-content">{{item.content}}</view>
				</view>
				<uniLoadMore :status="status"></uniLoadMore>
			</view>
		</view>
		<view class="public">
			<input class="uni-input" placeholder="说点什么吧～" />
			<button class="public-btn" @click="createMessage">发布留言</button>
		</view>
	</view>
</template>

<script>
	import uniSteps from '../../../components/uni-steps/uni-steps.vue';
	import uniLoadMore from '../../../components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				entrustDetail: null,
				loadingStatus: false,
				hasMore: true,
				currentPage: 1,
				dataList: []
			}
		},
		components: {
			uniSteps,
			uniLoadMore
		},
		computed: {
			status() {
				if(this.loadingStatus){
					return "loading";
				} else if (this.hasMore){
					return "more";
				} else {
					return "noMore";
				}
			}
		},
		onLoad(option) {
			const type = option.type;
			this.entrustDetail = option.entrustDetail;
			this.loadData();
		},
		//上拉加载更多
		onReachBottom() {
			console.log("上拉加载更多");
			// this.loadData();
		},
		//上拉加载
		methods: {
			//评价列表
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
			//发布评论
			createMessage() {
				if(!this.content && this.uris.length < 1){
					return;
				}
				const params = {
					comment_info: {
						message_id: this.messageId,
						content: this.content,
						uris: this.uris
					}
				}
				this.$api.createMessage(params).then(res => {
					// 获得数据 
					const {status_code, message, comment_info} = res;
					if(status_code === 0){
						this.dataList.comment_infos.unshift(comment_info);
						this.content = '';
						this.uris = [];
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
			//点赞评论
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
			//查看评价 && 查看任务图片
			previewImage(index) {
				const list = this.entrustDetail.imgList;
				uni.previewImage({
					urls: list,
					current: index
				});
			},
			//查看评价详情
		}
	}
</script>

<style scoped>
	.content {
		
	}
	.user_wrap {
		background-color: #fff;
		margin-bottom: 10rpx;
		background-color: #FFFFFF;
		padding:40rpx 40rpx 50rpx 40rpx;
	}
	.user_info {
		display: flex;
		align-items: center;
	}
	.user_info image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	.user_info > view {
		padding-left: 20rpx;
	}
	.user_info > view > view:first-child {
		font-size: 28rpx;
		color: #333333;
	}
	.user_info > view > view:last-child {
		font-size: 24rpx;
		color: #908888;
	}
	.entrust_list_main {
		padding: 0rpx 26rpx;
		background-color: #FFFCF7;
		margin: 40rpx 0;
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

	.status >>> .uni-steps {
		margin-top: 50rpx;
	}
	.status >>> .uni-steps__row-text-container {
		margin-top: 30rpx;
	}
	.btn {
		width: 240rpx;
		line-height: 80rpx;
		background-color: #439AD0;
		font-size: 28rpx;
		color: #fff;
		margin-top: 40rpx;
	}
	.review {
		background-color: #FFFFFF;
		padding: 20rpx 40rpx;
	}
	.review-tit {
		font-size: 24rpx;
		margin-bottom: 10rpx;
	}
	.review-tit uni-icons{
		margin-right: 14rpx;
	}
	.review-list-wrap {
		padding-bottom: 90rpx;
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
	.review .nickname{
		justify-content: space-between;
	}
	.review .nickname image{
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
	
	.nickname {
		display: flex;
		align-items: center;
	}
	
	.nickname view {
		font-size: 28rpx;
		color: #333333;
		display: inline-block;
	}
	
	.nickname image{
		width: 32rpx;
		height: 32rpx;
		margin-left: 20rpx;
	}
	.nickInfo {
		font-size: 24rpx;
		color: #9A9A9A;
		display: flex;
		align-items: center;
	}
	.nickInfo view:first-child {
		width: 160rpx;
	}
	.nickInfo .school {
		width: 360rpx;
		flex:1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.good {
		padding-left: 8rpx;
		font-size: 24rpx;
	}
	.good uni-icons {
		margin-left: 12rpx;
	}
	.public {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		padding: 15rpx 40rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
	.dynamic_list_info {
		padding-left: 20rpx;
	}
	.public input {
		width: 450rpx;
		height: 50rpx;
		background: #F2F2F2;
		border-radius: 25rpx;
		padding: 0 20rpx;
		font-size: 20rpx;
	}
	.public button {
		width: 156rpx;
		background-color: #439AD0;
		color: #fff;
		font-size: 20rpx;
		margin-left: 40rpx;
	}
</style>
