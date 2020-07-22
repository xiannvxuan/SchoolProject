<script>
import uniPopup from "./components/uni-popup/uni-popup.vue"
import tabBar from "./pages/tabBar.vue"
export default {
	onLaunch: function() {
		this.checkUpdate(); //检查更新
		this.login();
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		login(){
			const openid = uni.getStorageSync("openid");
			const key = uni.getStorageSync("key");
			
			if(openid && key){ //登陆过
				console.log(openid, key, "密钥");
				uni.checkSession({ //登陆信息是否过期
				 	success: function(data){
						console.log(data, 'checkSession');
						uni.reLaunch({
							url: '/pages/info'
						});
					},
					fail: function(){
						console.log('checkSession失效');
						// this.login();
						uni.reLaunch({
							url: '/pages/auth'
						});
					}
				})
				
			} else {
				console.log("未登录过")
				// this.login();
				uni.reLaunch({
					url: '/pages/auth'
				})
			}
		},
		//检查更新
		checkUpdate() {
			if (uni.canIUse("getUpdateManager")) {
				const updateManager = uni.getUpdateManager();
				updateManager.onCheckForUpdate(function (res) {
					if(res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							uni.showModal({
								title: "更新提示",
								content: "新版本已经准备好，是否重启应用？",
								success: function(res) {
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate();
									}
								}
							});
						});
					}
				});
				updateManager.onUpdateFailed(function() {
					// 新的版本下载失败
					uni.showModal({
						title: "更新提示",
						content: "新版本下载失败，请您删除当前小程序重新下载！"
					});
				});	
			} else {
				uni.showModal({
					title: "提示",
					content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
				});
			}
		}
	}
	
};
</script>

<style>
/*每个页面公共css */ 
@import './static/common/iconfont.css';

page, view, scroll-view, swiper, movable-area, cover-view, text, icon, rich-text,
progress, button, checkbox-group, checkbox, form, input, label, picker,
picker-view, radio-group, slider, switch, textarea, navigator, audio, image,
video, live-player, live-pusher, open-data, web-view {
    box-sizing: border-box;
}

page {
	width: 100%;
	height: 100%;
	overflow: hidden;
	overflow-y: scroll;
	/* box-sizing: border-box; */
	/* background: #F2F2F2; */
	background-color: #EEEEEE;
}

.ellipsis {
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.Tellipsis {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.myBtn {
	background-color: #439AD0;
}
.myBg {
	background-color: #C4E1EB;
}
/* 动态
	margin-top: 32rpx;
	border-radius: 24rpx; 
	box-shadow: 2rpx 2rpx 12rpx 1rpx #BFBFBF;
*/

/* 轮播图
	border-radius: 24rpx;
 */

/* 图片
	border-radius: 16rpx;
 */
</style>
