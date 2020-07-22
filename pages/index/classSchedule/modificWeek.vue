<template>
	<view class="modify">
		 <view class="modify_wrap">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					开始周
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" 
					:value="date" 
					:start="startDate" 
					:end="endDate"
					@change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
					<uni-icons type="arrowdown" size="20"></uni-icons>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					结束周
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" 
					:value="date" 
					:start="startDate" 
					:end="endDate"
					@change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
					<uni-icons type="arrowdown" size="20"></uni-icons>
				</view>
			</view>
		</view>
		<button class="btn">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			}); 
			return {
				date: currentDate
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value;
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style scoped>
	.modify {
		width: 100%;
		height: 100%;
		padding: 0 40rpx;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}
	.modify_wrap {
		padding-top: 40rpx;
	}
	.modify_wrap .uni-list-cell:nth-child(2){
		border-top: 1px solid #F7F6F7;
	}
	.uni-list-cell {
		display: flex;
		align-items: center;
		line-height: 138rpx;
	}
	.uni-list-cell-left {
		width: 276rpx;
		
	}
	/* .modify_wrap .uni-icons {
		width: 46rpx;
	} */
	.uni-list-cell-db {
		flex: 1;
		display: flex;
	}
	.uni-list-cell-db uni-icons{
		margin-left: 20rpx;
	}
	.btn {
		background-color: #439AD0;
		font-size: 36rpx;
		line-height: 84rpx;
		color: #fff;
		margin-top: 90rpx;
	}
</style>
