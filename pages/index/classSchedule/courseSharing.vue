<template>
	<view class="curriculum_wrap">
		<view class="curriculum-head">
			<view class="picker-wrap">
				 <view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
				<view style="padding: 0 30rpx;">至</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<button
				type='default'
				size="mini"
				plain="true">查询
			</button>
		</view>
		<view class="curriculum-hr"></view>
		<view class="curriculum-ul">
			<view class="li">
				<label @click="allCheckfn">
				  <checkbox  class='allCheckfn' :checked="allCheck"/>全选
				</label>
			</view>
		<checkbox-group @change="checkboxChange">
			<view
			class="li"
			v-for="(item, key) in tableList"
			:key="key">
				<checkbox
				class='allCheckfn'
				:value="item.id"
				:checked="item.checked"/>
				<text class="date">{{item.date}}</text>
				<text class="curriculum">{{item.curriculum}}</text>
				<text class="size">{{item.size}}</text>
			</view>
		</checkbox-group>
		</view>
		<view class="curriculum-hr"></view>
		<button
		  class="share"
		  type="default" @click="goToPage('/pages/index/classSchedule/entrustedQrCode')">
		  生成分享码
		</button>
		<view class="tip">选中需要分享的课程后点击生成分享码，就可以分享给小伙伴了</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				date: currentDate,
				allCheck: false,
				tableList: [
				    {
				        id: 1,
				        checked:false,
				        date:'02/10',
				        curriculum:'英语课等课程名',
				        size:'15PM'
				      },
				      {
				        id: 2,
				        checked:false,
				        date:'02/10',
				        curriculum:'英语课等课程名',
				        size:'15PM'
				      },
				      {
				        id: 3,
				        checked:false,
				        date:'02/10',
				        curriculum:'英语课等课程名',
				        size:'15PM'
				    },
				]
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
			goToPage(url) {
				if (!url) return;
				uni.navigateTo({
					url
				});
			},
			// 全选
			allCheckfn(e){
				var items = this.items,
				    data = e.detail.value;
			    const tableList = [...this.tableList];
				this.allCheck = !this.allCheck;
			    for(const item of tableList) item.checked = this.allCheck;
				this.tableList = tableList;
			},
			// 单选
			checkboxChange(e) {
				var items = this.items,
					values = e.detail.value;
					console.log(values)
				this.allCheck = values.length === this.tableList.length? true : false;
			},
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
			}
		}
	}
</script>

<style scoped>
	.curriculum_wrap {
		background-color: #FFFFFF;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
	}
	.curriculum-head{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;
	}
	.curriculum-head .picker-wrap{
		width: calc(100% - 140rpx);
		display: flex;
		align-items: center;
	}
	.uni-list-cell {
		/* width: 220rpx; */
		border: 1px solid #C2C2C2;
		padding: 6rpx 14rpx;
		font-size: 28rpx;
		align-items: center;
	}
	.curriculum-head button {
		width: 120rpx;
		padding: 0;
	}
	.curriculum-hr{
		width: 100%;
		height: 12rpx;
		background: #eeeeee;
		border-radius: 12rpx;
	}
	.curriculum-ul{
		padding: 0 40rpx;
		height: calc(100% - 300rpx);
		overflow-x: hidden;
		overflow-y: auto;
	}
	.curriculum-ul .li{
		display: flex;
		align-items: center;
		padding-top: 40rpx;
	}
	.curriculum-ul .li .date{
		padding-right: 40rpx;
	}
	.curriculum-ul .li .curriculum{
		flex:1;
	}
	.share {
		margin-top: 20rpx;
		width: 50%;
		font-size: 36rpx;
		background: #439CCF !important;
		color: #ffffff !important;
	}
	/*checkbox 选项框大小  */
	checkbox .wx-checkbox-input {
		width: 40rpx;
		height: 40rpx;
		border-radius: 40rpx;
	}
	/*checkbox选中后样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	    background: #439CCF;
	}
	/*checkbox选中后图标样式  */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		width: 28rpx;
		height: 28rpx;
		line-height: 28rpx;
		text-align: center;
		font-size: 22rpx;
		color: #fff;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}
	.tip {
		font-size: 20rpx;
		color: #CBCBCB;
		text-align: center;
		margin-top: 12rpx;
	}
</style>
