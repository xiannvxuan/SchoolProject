<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					学校
				</view>
				<view class="uni-list-cell-db">
					<picker @change="bindPickerChange" :value="index" :range="schoolList">
						<view class="uni-input">{{schoolList[index]}}</view>
					</picker>
				</view>
			</view>
		</view>
		<button type="primary" :disabled="disabled" @click="setSchool">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: "",
				schoolList: [],
				disabled: false,
				// schoolName: "",
				// stuId: "",
				// stuPassword: "",
				// verifyCode: ""
			}
		},
		created(){
			this.getSchoolList();
		},
		methods: {
			getSchoolList(){
				this.$api.getSchoolList().then(res => {
				   // 获得数据 
				   if(res.status_code === 0){
						this.schoolList = res.schools;
				   } else {
					   this.schoolList = [];
					   uni.showToast({
		　　　　　　　　　　　　title: res.message,
		　　　　　　　　　　　　icon: 'none'
		　　　　　　　　　　})
				   }
				}).catch(res => {
					this.schoolList = [];
					console.log("请求失败");
				});
			},
			bindPickerChange(e){
				this.index = e.target.value;
				this.disabled = true;
			},
			setSchool(){
				this.$api.setSchool({school_name: schoolName,stu_id: stuId,stu_password: stuPassword,verify_code: verifyCode}).then(res => {
				    uni.showToast({
	　　　　　　　　　　　　title: res.message,
	　　　　　　　　　　　　icon: 'none'
	　　　　　　　　　　})
					if(res.status_code === 0){
						
				    } else {
					   
				    }
				}).catch(res => {
					console.log("设置学校  失败");
				});
			}
		}
	}
</script>

<style>

</style>
