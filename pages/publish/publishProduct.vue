<template>
	<view class="content">
		<view class="uni-textarea">
			<textarea placeholder-style="color:#7F7F7F" 
			maxlength="200"
			@input = "computedLen"
			v-model.trim="desc"
			:disable-default-padding='true'
			placeholder="想说什么就写下来吧..."/>
			<view class="len">
				{{len}}/200
			</view>
		</view>
		<view class="upload">
			<view v-for="(v, k) in imgList" :key="k" @click="showMark(k)">
				<image :src="getImg(v)" mode="aspectFill"></image>
			</view>
			<view class="add" v-if="imgList.length<9"  @click="upload">
				<uni-icons type="plusempty" size="54" color="#B1B1B1"></uni-icons>
			</view>
		</view>
		<view>	
			<view class="price">
				<text>入手价</text>
				<view>
					¥
					<input class="uni-input" type="digit" placeholder="0.00" />
				</view>
			</view>
			<view class="price">
				<text>想卖</text>
				<view>
					¥
					<input class="uni-input" type="digit" placeholder="0.00" v-model="money" />
				</view>
			</view>
		</view>
		<view>
			<checkbox-group class="checkboxGroup" @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
					<view>
						<checkbox :value="item.value" :checked="item.checked" />
					</view>
					<view class="listName">{{item.name}}</view>
				</label>
			</checkbox-group>
			<view class="tit">
				类别
			</view>
			<checkbox-group class="checkboxGroup" @change="checkboxChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="item in items1" :key="item.value">
					<view>
						<checkbox :value="item.value" :checked="item.checked" />
					</view>
					<view class="listName">{{item.name}}</view>
				</label>
			</checkbox-group>
		</view>
		<view class="btn_wrap">
			<button class="btn myBtn">商品状态</button>
			<button class="btn myBtn" :disable="disable" @click="createSecondHand">发布</button>
		</view>
		<!-- 图片预览 -->
		<view class="swiper-wrap" @touchmove.stop.prevent v-if="mark">
			<view class="current">{{current*1+1}}/{{imgList.length}}</view>
			<swiper class="swiper" :indicator-dots="false" :autoplay="false" :circular="true" :current="current" @change="changeSwiper" @click="hideMark">
				<swiper-item v-for="(v, k) in imgList" :key="k">
					<image :src="getImg(v)" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
			<view id="del" class="delBtn" @click="del">删除</view>
		</view>
	</view>
</template>

<script>
	import url from '../../request/config.js';
	export default {
		data() {
			return {
				tagList: [],
				len: 0,
				desc: '', //内容
				mark: false,
				current: 0,
				imgList: [],
				value: '',
				money: 0,
				disable: true,
				items: [{
						value: 'USA',
						name: '可小刀'
					},
					{
						value: 'CHN',
						name: '全新',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '包邮'
					},
					{
						value: 'JPN',
						name: '当面交易'
					},
					{
						value: 'ENG',
						name: '几成新'
					}
				],
				items1: [{
						value: 'USA',
						name: '数码产品'
					},
					{
						value: 'CHN',
						name: '美妆品牌',
						checked: 'true'
					},
					{
						value: 'BRA',
						name: '单车电动车'
					},
					{
						value: 'JPN',
						name: '书籍'
					},
					{
						value: 'ENG',
						name: '乐器'
					},
					{
						value: 'ENG',
						name: '健身器材'
					}
				]
			}
		},
		onLoad() {
			//this.getTag();
		},
		methods: {
			//获取标签
			getTag() {
				uni.showLoading({
					title: '加载中...'
				});
				this.$api.getTag().then(res => {
				   // 获得数据
				   const {status_code, message, tags} = res;
				   if(status_code === 0){
						this.tagList = tags;
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
				}).finally(()=>{
					uni.hideLoading();
				})
			},
			//多选框
			checkboxChange: function (e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.value)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			//上传图片
			upload() {
				const vm = this;
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function (res) {
						const tempFilePath = res.tempFilePaths[0];
						const openid = uni.getStorageSync("openid") || '';
						const session = uni.getStorageSync("key") || '';
					    uni.uploadFile({
							url: url + '/upload/image',
							filePath: tempFilePath,
							name: 'image',
							header:{
								'cookie': 'session=' + session +';openid=' + openid,
								'content-type': 'multipart/form-data'
							},
							formData: {
								'image': tempFilePath
							},
							success: (res) => {
								res = JSON.parse(res.data);
								if(res.status_code === 0) {
									vm.imgList.push(res.uri);
								} else {
									uni.showToast({
					　　　　　　　　　　　　title: res.message,
					　　　　　　　　　　　　icon: 'none'
					　　　　　　　　　　});
								}
							},
							fail: (res)=> {
								uni.showToast({
				　　　　　　　　　　　　title: '网络异常，请稍后再试！',
				　　　　　　　　　　　　icon: 'none'
				　　　　　　　　　　})
							}
						});
				    }
				});
			},
			getImg(v){
				return this.$imageUrl + v;
			},
			//图片预览
			showMark(index) {
				this.current = index;
				this.mark = true;
			},
			hideMark() {
				this.mark = false;
				this.current = 0;
			},
			changeSwiper(e) {
				this.current = e.detail.current;
			},
			del(){
				this.imgList.splice(this.current, 1);
				this.mark = false;
			},
			//发布商品
			createSecondHand() {
				if(!this.desc && !this.imgList) {
					uni.showToast({
	　　　　　　　　　　　　title: "发布内容不能为空！",
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　 });
					return;
				}
				if(!this.money) {
					uni.showToast({
	　　　　　　　　　　　　title: "请填写商品价格！",
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　 });
					return;
				}
				uni.showLoading({
					mark: true,
					title: '发布中...'
				});
				this.disable = true;
				const params = {
					content: this.desc,
					uris: JSON.stringify(this.imgList),
					money: this.money,
				};
				this.$api.createSecondHand(params).then(res => {
				    // 获得数据 
				    const {status_code, message, second_hand_info} = res;
				    if(status_code === 0){
						this.desc = '';
						this.imgList = [];
						this.money = 0;
					    this.goToPage('/pages/index/entrust/index');
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
					uni.hideLoading();
					this.disable = false;
				});
			},
			computedLen() {
				this.len = this.desc.length;
			},
			goToPage(url) {
				if(!url) return;
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style scoped>
	.content {
		width: 100%;
		background-color: #FFFFFF;
		padding: 10rpx 40rpx;
		
	}
	.uni-textarea {
		width: 100%;
		position: relative;
	}
	.uni-textarea textarea {
		width: 100%;
		height: 190rpx;
		border-radius: 20rpx;
		padding: 32rpx;
		background-color: #F7F7F7;
		color: #202020;
		font-size: 28rpx;
	}
	.len {
		position: absolute;
		font-size: 24rpx;
		bottom: 10rpx;
		right: 20rpx;
	}
	/* 图片 */
	.upload {
		display: flex;
		flex-wrap: wrap;
		padding:14rpx;
		font-size: 0;
	}
	
	.upload view {
		width: 194rpx;
		height: 194rpx;
		border-radius: 16rpx;
		margin: 10rpx;
	}
	
	.upload image {
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
	}
	
	.add {
		background-color: #F3F3F3;
		text-align: center;
		line-height: 194rpx;
	}
	/* price */
	.price {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #F2F2F2;
		line-height: 98rpx;
		margin-top: 40rpx;
		border-radius: 16rpx;
		padding: 0 20rpx;
	}
	.price text{
		font-size: 32rpx;
		color: #222222;
	}
	.price > view {
		display: flex;
		color: #929292;
		align-items: center;
	}
	.price input {
		width: 150rpx;
		margin-left: 10rpx;
		font-size: 32rpx;
		color: #929292;
		background-color: #F2F2F2;
	}
	/* 选择属性 */
	.checkboxGroup {
		display: flex;
		flex-wrap: wrap;
		font-size: 28rpx;
	}
	.checkboxGroup label {
		display: flex;
		align-items: center;
		width: 33.3%;
	}
	.checkboxGroup checkbox{
		transform:scale(0.7);
	}
	.uni-list-cell {
		margin-top: 36rpx;
	}
	.listName {
		padding-left: 18rpx;
	}
	.tit {
		font-size: 28rpx;
		margin-top: 40rpx;
	}
	/* btn */
	.btn_wrap {
		display: flex;
		margin-bottom: 50rpx;
		margin-top: 40rpx;
		justify-content: space-between;
		padding: 0 30rpx;
	}
	.btn_wrap button {
		margin: 0;
	}
	.btn {
		width: 200rpx;
		line-height: 70rpx;
		color: #fff;
		font-size: 28rpx;
		/* background-color: #EB3D28; */
	}
	
	/* 查看图片 */
	.swiper-wrap {
		width: 100%;
		height: 100%;
		background-color: rgb(0,0,0,0.9);
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
	}
	.swiper {
		flex: 1;
	}
	.swiper image {
		width: 100%;
		height: 100%;
	}
	.current {
		color: #FFFFFF;
		font-size: 36rpx;
		line-height: 120rpx;
		text-align: center;
	}
	#del {
		width: 100%;
		line-height: 120rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		text-align: center;
	}
</style>