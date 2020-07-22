<template>
	<view class="consignmentNews_wrap">
		<view class='consignmentNews'>留言信息</view>
		<view>
			<view class="consignmentNews_list" v-for="(item, index) in dataList" :key="index">
				<view class='consignmentNews_list_tit'>
					<view class= 'consignmentNews_list_image'>
					    <image :src="item.url"></image>
					    <view>
							<view class='consignmentNews_list_nickname'>{{item.nickname}}</view>
							<view class='consignmentNews_list_dateTime'>{{item.dateTime}}</view>
						</view>
					</view>
					<view class="info">
						<uni-icons type="chat" size="18"></uni-icons>
						<view class='consignmentNews_list_count'>{{item.count}}</view>
					</view>
				</view>
				<text class='consignmentNews_list_info'>{{item.info}}</text>
			</view>
		</view>
	</view> 

</template>

<script>
	export default {
		data() {
			return {
				dataList: [{
				      url: '../../static/img/mine.jpeg',
				      nickname: '昵称',
				      dateTime: '2019-09-21',
				      count: 12,
				      info: '周末可以取一下快递吧...'
				    },
				    {
				      url: '../../static/img/mine.jpeg',
				      nickname: '昵称',
				      dateTime: '2019-09-21',
				      count: 12,
				      info: '周末可以取一下快递吧...'
				    }]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.consignmentNews_wrap {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0 40rpx;
		background-color: #FFFFFF;
	}
	.consignmentNews {
	  font-size: 28rpx;
	  font-weight: bold;
	  padding: 40rpx 0rpx 12rpx 0rpx;
	}
	.consignmentNews_list {
	  border-bottom: 1px solid #D2D2D2;
	  padding: 34rpx 0;
	}
	.consignmentNews_list_tit {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	.consignmentNews_list_tit image {
	  width: 84rpx;
	  height: 84rpx;
	  border-radius: 50%;
	  margin: 0 22rpx;
	}
	.consignmentNews_list_image {
	  display: flex;
	  justify-content: space-between;
	}
	.consignmentNews_list_nickname {
	  font-size: 28rpx;
	  font-weight: bold;
	  line-height: 50rpx;
	}
	.consignmentNews_list_dateTime {
	  font-size: 24rpx;
	}
	.consignmentNews_list_count {
	  font-size: 24rpx;
	}
	.consignmentNews_list_info {
	  font-size: 24rpx;
	  padding: 24rpx 0 0 128rpx;
	}
	.info {
		display: flex;
	}
	.consignmentNews_list_count {
		margin-left: 20rpx;
	}
</style>
