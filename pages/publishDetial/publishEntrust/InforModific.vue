<template>
	<view class="content">
		<view class="">
			<view class="checkbox_tit">
				<checkbox value="cb" checked="true" />
				默认每周课程固定时间上课
			</view>
			<view class="checkbox_wrap">
				<view class="date_list">
					周期
					<uni-combox 
						:candidates="candidates" 
						placeholder="请选择周期" 
						v-model="city"
					></uni-combox>
				</view>
				<view class="date_list">
					开始时间
					<uni-combox
						:candidates="candidates" 
						placeholder="请选择开始时间" 
						v-model="city"
					></uni-combox>
				</view>
				<view class="date_list">
					结束时间
					<uni-combox
						:candidates="candidates" 
						placeholder="请选择结束时间" 
						v-model="city"
					></uni-combox>
				</view>
			</view>	
			<button class="add_btn">+</button>
		</view>
		<view class="">
			<view class="checkbox_tit">
				<checkbox value="cb" checked="true" />
				无固定周期点选并在下方添加上课时间
			</view>
			<view class="checkbox_wrap">
				<view class="date_list">
					周期
					<uni-combox
						:candidates="candidates" 
						placeholder="请选择周期" 
						v-model="city"
					></uni-combox>
				</view>
				<view class="date_list">
					开始时间
					<uni-combox
						:candidates="candidates" 
						placeholder="请选择开始时间" 
						v-model="city"
					></uni-combox>
				</view>
				<view class="date_list">
					结束时间
					<uni-combox
						:candidates="candidates" 
						placeholder="请选择结束时间" 
						v-model="city"
					></uni-combox>
				</view>
			</view>
			<button class="add_btn">+</button>
		</view>
		<button class="btn">保存</button>
	</view>
</template>

<script>
	import uniCombox from "../../../components/uni-combox/uni-combox"
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				candidates: ['周一','周二'],
				city: '',
				date: currentDate,
				
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
		components: {
			uniCombox
		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value
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
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		padding: 0 40rpx;
		background-color: #FFFFFF;
	}
	.checkbox_tit {
		font-size: 24rpx;
		color: #999999;
		padding: 40rpx 0;
	}
	.checkbox_tit checkbox {
		transform:scale(0.7);
	}
	
	.checkbox_wrap {
		border-bottom: 1px solid #DADADA;
		margin-bottom: 28rpx;
	}
	.add_btn {
		width: 450rpx;
		font-size: 24rpx;
		line-height: 46rpx;
		background-color: #FFFFFF;
	}
	.date_list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		margin-bottom: 10rpx;
	}
	.date_list >>> .uni-combox__input {
		font-size: 28rpx;
		border-bottom: 1px solid #BABABA;
	}
	.btn {
		width: 670rpx;
		line-height: 84rpx;
		font-size: 36rpx;
		color: #fff;
		background-color: #439AD0;
		margin-top: 210rpx;
		margin-bottom: 60rpx;
	}
</style>
