<template>
	<view class="content">
		<view class="user_wrap">
			<view class="dynamic_list_wrap">
				<view class="user_img">
					<image :src="dynamicDetail.url"></image>
				</view>
				<view class="dynamic_list_info">
					<view class="nickname">
						<view>{{dynamicDetail.nickname}}</view>
						<image v-if="nickname" src="../../static/img/man.png"></image>
						<image v-else src="../../static/img/woman.png"></image>
					</view>
					<view class="nickInfo">
						<view>{{dynamicDetail.date}}</view>
						<view class="school">河北大学</view>
					</view>
				</view>
			</view>
			<view class="dynamic_img_wrap">
				<view v-for="(val, idx) in dynamicDetail.imgList" :key="idx">
				  <image :src='val'  @click="previewImage(idx)" mode="aspectFill"></image>
				</view>
			</view>
			<view class="dynamic_list_content ellipsisT">{{dynamicDetail.content}}</view>
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
							<image :src="item.user_info.profile_photo"></image>
						</view>
						<view class="dynamic_list_info">
							<view class="nickname">
								<view class="">
									<view>{{item.user_info.user_name}}</view>
									<image v-if="item.user_info.sex === 1" src="../../static/img/man.png"></image>
									<image v-if="item.user_info.sex === 2" src="../../static/img/woman.png"></image>
								</view>
								<view class="good">
									{{item.digg_count}}<uni-icons type="hand-thumbsup-filled" size="16" color="#CCCCCC" @click="digg(k, item.digg_type, 1)"></uni-icons>
								</view>
							</view>
							<view class="nickInfo">
								<view>{{item.create_time}}</view>
								<view class="school">{{item.user_info.school_name}}</view>
							</view>
						</view>
					</view>
					<view class="review-content" v-if="item.comment_main_info.content">
						{{item.comment_main_info.content}}
					</view>
					<!-- 评论的图片 -->
					<view class="review-image" v-if="item.comment_main_info.uris">
						<view v-for = "(val,ind) in item.comment_main_info.uris" :key="ind">
							<image :src="val" mode="aspectFill"></image>
						</view>
					</view>
					<view class="replyCount" v-if="item.comment_infos.reply_count">
						共{{item.comment_infos.reply_count}}条回复 >
					</view>
				</view>
			</view>
			<uniLoadMore :status="status"></uniLoadMore>
		</view>
		<div class="public">
			<input class="uni-input" placeholder="说点什么吧～" v-model.trim="content"/>
			<button class="public-btn" @click="createMessage">发布留言</button>
		</div>
	</view>
</template>
 
<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	
	export default {
		data() {
			return {
				dynamicDetail:  null,
				currentPage: 1,
				pageNum: 20,
				hasMore: true,
				loadingType: true,
				dataList: [],
				messageId: 0,
				content: '',
				uris: []
			}
		},
		components: {
			uniLoadMore
		},
		computed: {
			status() {
				if(this.loadingType){
					return "loading";
				} else if (this.hasMore){
					return "more";
				} else {
					return "noMore";
				}
			}
		},
		onLoad(option){
			this.dynamicDetail = option.dynamicDetail;
			this.messageId = this.dynamicDetail.message_id;
			this.loadData();
		},
		//上拉加载更多
		onReachBottom() {
			console.log("上拉加载更多");
			// this.loadData();
		},
		methods: {
			loadData() {
				var vm = this;
				if(!hasMore || loadingType){
					return;
				}
				this.loadingType = true;
				const params = {
					message_id: this.dynamicDetail.message_id,
					index: this.currentPage,
					count: this.pageNum
				}
				this.$api.getComment(params).then(res => {
					// 获得数据 
					const {status_code, message, comment_infos, next_index, has_more} = res;
					if(status_code === 0){
						this.dataList = comment_infos;
						this.hasMore = has_more;
						this.currentPage += 1;
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
					this.loadingType = false;
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
			previewImage(index) {
				const list = this.dynamicDetail.imgList;
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
	.user_wrap {
		background-color: #fff;
		margin-bottom: 16rpx;
		background-color: #FFFFFF;
		padding-bottom: 40rpx;
	}
	.dynamic_list_wrap {
	  display: flex;
	  align-items: center;
	  background: #fff;
	  padding: 20rpx 40rpx 0 40rpx;
	}
	.user_img {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
	}
	.user_img image {
	  width: 100%;
	  height: 100%;
	  border-radius: 50%;
	}
	.dynamic_list_info {
	  padding: 0 0rpx 0 24rpx;
	  flex: 1;
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
	/* dynamic_img_wrap */
	.dynamic_list_wrap button {
	  width: 120rpx;
	  height: 40rpx;
	  line-height: 36rpx;
	  border-radius: 18rpx;
	  border: 1px solid #8A8A8A;
	  font-size: 20rpx;
	  margin: 0;
	}
	
	.dynamic_img_wrap {
	  display: flex;
	  flex-wrap: wrap;
	  background: #fff;
	  padding: 20rpx 40rpx;
	}
	.dynamic_img_wrap view {
		width: 210rpx;
		height: 210rpx;
		margin: 10rpx 0;
	}
	.dynamic_img_wrap view:nth-child(3n+2) {
		margin: 10rpx 20rpx;
	}
	.dynamic_img_wrap view image {
	   width: 100%;
	   height: 100%;
	   border-radius: 16rpx; 
	}
	.dynamic_list_content {
	  padding: 0 40rpx;
	  background: #fff;
	  line-height: 38rpx;
	  font-size: 28rpx;
	  color: #9B9B9B;
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
	.review-image {
		display: flex;
		flex-wrap: wrap;
	}
	.review-image view {
		width: 183rpx;
		height: 183rpx;
		margin: 20rpx 0;
	}
	.review-image view:nth-child(3n+2) {
		margin: 20rpx;
	}
	.review-image view image {
	  width: 100%;
	  height: 100%;
	  border-radius: 16rpx; 
	}
	.replyCount {
		background-color: #FAFAFA;
		color: #007AFF;
		padding: 10rpx;
		font-size: 24rpx;
		line-height: 32rpx;
		border-radius: 16rpx;
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
		box-shadow: 0rpx 0rpx 8rpx 8rpx #EFEFEF;
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
