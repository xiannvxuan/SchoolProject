<template>
    <view class="">
    	<view class="TabBar">
    	    <view class="tab" v-for="(item,index) in TabBarList" :key="index" @tap="switchTab(item.url,index)">
    	        <image class="imgsize" v-if="item.type == 0" :src="current == index ? item.selectIcon : item.icon" mode="widthFix"></image>
    	        <image class="addimgsize" 
					v-if="item.type == 1" 
					:src="current == index ? item.selectIcon : item.icon"
					mode="widthFix"
					@click.stop="togglePopup"></image>
    	        <view class="text" :style="current == index ? 'text' : 'active'">{{item.name}}</view>
    	    </view>
    	</view>
		<view class=""> 
			<uni-popup ref="showshare" :type="type" @change="change">
				<view class="uni-share">
					<view class="uni-share-content">
						<view class="uni-share-content-text" @click="switchTab('/pages/publish/publishProduct')">
							<image src="../static/img/tabbar/product.png" mode=""></image>
							<view>发布寄卖</view>
						</view>
						<view class="uni-share-content-wrap" @click="switchTab('/pages/publish/publishDynamic')">
							<view class="uni-share-content-text justify">
								<image src="../static/img/tabbar/dynamic.png" mode=""></image>
								<view>发布动态</view>
							</view>
								
							<view class="uni-share-content-text justify" @click="switchTab('/pages/publish/publishEntrust')">
								<image src="../static/img/tabbar/entrust.png" mode=""></image>
								<view>发布委托</view>
							</view>
						</view>
					</view>
					<view class="uni-share-btn">
						<image @click="cancel('share')" src="../static/img/tabbar/add.png" mode=""></image>
					</view>
				</view>
			</uni-popup>
		</view>
    </view>
</template>

<script>
	import uniPopup from '../components/uni-popup/uni-popup.vue'
	
    export default {
        data() {
            return {
                TabBarList: [{
                        type: 0,
                        icon: '../static/img/tabbar/home.png',
                        selectIcon: '../static/img/tabbar/home.png',
                        name: '首页',
                        url: '/pages/index/index'
                    },
                    {
                        type: 0,
                        icon: '../static/img/tabbar/dynamic.png',
                        selectIcon: '../static/img/tabbar/dynamic.png',
                        name: '动态',
                        url: '/pages/dynamic/index'
                    },
                    {
                        type: 1,
                        icon: '../static/img/tabbar/add.png',
                        selectIcon: '../static/img/tabbar/add.png',
                        name: '',
                        url: ''
                    },
                    {
                        type: 0,
                        icon: '../static/img/tabbar/news.png',
                        selectIcon: '../static/img/tabbar/news.png',
                        name: '寄卖',
                        url: '/pages/consignment/index'
                    },
                    {
                        type: 0,
                        icon: '../static/img/tabbar/me.png',
                        selectIcon: '../static/img/tabbar/me.png',
                        name: '我的',
                        url: '/pages/mine/index'
                    }
                ],
				type: "",
				current: null
            }
        },
		components: {
			uniPopup
		},
		onLoad() {
			this.$refs['showshare'].open();
		},
        methods: {
			togglePopup(e) {
				console.log("togglePopup")
				this.type = "bottom";
				this.$refs['showshare'].open();
			},
			cancel() {
				this.$refs['showshare'].close();
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
            switchTab(url,index) {
				if(!url && !index) return;
				console.log("switchTab",url,index)
				if(url && index){
					uni.switchTab({
					    url: url
					});
					this.current = index;
				} else if(url) {
					uni.navigateTo({
						url: url
					});
				}
			}
        }
    }
</script>

<style scoped>
.TabBar {
    position: fixed;
    bottom: 0;
	left: 0;
	right: 0;
    height: 120rpx;
    background-color: #fff;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
	background:url(../static/img/tabbar/tabBg.png) no-repeat;
	background-size: 100% 100%;
}
.tab {
    display: flex;
    flex-direction: column;
    align-items: center;
	position: relative;
}
.imgsize {
    width: 56rpx;
    height: 56rpx;
}
.addimgsize {
	position: absolute;
    width: 116rpx;
    height:116rpx;
    z-index: 999;
    bottom: 0rpx;
	box-shadow: 0px 0px 15px 4px #FEFEFE;
	border-radius: 50%;
}
.text {
    font-size: 24rpx;
	padding-top: 6rpx;
}
.tab .active {
	color: #BB948F;
}

/* 遮罩层*/
.uni-share {
	display: flex;
	flex-direction: column;
	padding: 100rpx 0 200rpx 0;
	background: url(../static/img/tabbar/midBg2.png) no-repeat;
	background-size: 100% 100%;
}

.uni-share-content-wrap {
	display: flex;
	justify-content: center;
}
.uni-share-content > view {
	text-align: center;
}

.uni-share-content-text {
	text-align: center;
	font-size: 24rpx;
	/* color: #1F1F1F; */
	color: #484848;
}

.justify {
	width: 45%;
}

.uni-share-content-text image {
	width: 80rpx;
	height: 80rpx;
}

.uni-share-btn {
	width: 160rpx;
	height: 160rpx;
	position: fixed;
	bottom: 80rpx;
	left: 50%;
	margin-left: -80rpx;
	box-shadow: 0px 0px 15px 4px #FEFEFE;
	border-radius: 50%;
}
.uni-share-btn image{
	width: 100%;
	height: 100%;
}
</style>