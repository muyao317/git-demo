<template>
<view>
	<view class="welcome">
		<text>欢迎来到</text>
		<text>木瑶私房菜</text>
	</view>
	<!-- 方块 -->
	<view class="people-view">
		<view class="hello">您好，请选择就餐人数</view>
		<view class="table-num">桌号：{{table_number}}</view>
		<!-- 滑动 -->
		<view class="table-num table-scroll">
			<scroll-view scroll-x="true" class="scroll-view_H" :enable-flex="true">
				<view class="table-block">
					<block v-for="(item,index) in people" :key="index">
					<view @click="choIce(index,item)" :class="{activetext: index === num}">{{item}}</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 按钮 -->
		<view class="start-diancan" :class="[num > -1 ? 'start-activ' : '']" @click="stArt()">开始点餐</view>
	</view>
</view>
</template>

<script>
const db = wx.cloud.database()
const _ = db.command
const good_collect= db.collection('order-data')
export default {
	data() {
		return {
			num:-1,
			people: [1,2,3,4,5,6,7,8,9,10],
			table_number:null
		}
	},
	methods: {
		// 选择人数
		choIce(index,item){
			this.num = index  //this储存index数据
			wx.setStorageSync('number_of_diners', item) //用wx.setStorageSync方法储存数据
		},
		
		// 开始点餐
		stArt(){
			if(this.num <= -1)return false  //如果序号小于0返回错误，
			wx.reLaunch({  //否则使用路由跳转到点餐页面
				url:'/pages/home-page/page'
			})
		},
		
		async query_order(){
			// 查询该号桌是否已结账
			try{
				let query = await good_collect.where({table_number:this.table_number,transac_status:'unsettled'}).get()//得到桌号和未结账状态
				if(query.data.length > 0){ //订单数据大于0 
					wx.reLaunch({  //跳转到加菜页面
						url:'/pages/order-details/details'
					})
				}
			}catch(e){
				//TODO handle the exception
			}
		}
	},
	onLoad(e) {
		console.log(e)
		this.table_number = e.number
		wx.setStorageSync('table_num', e.number)
		this.query_order()
	}
}
</script>

<style>
page{
	background-image: url('https://diancan-1308361593.cos.ap-shanghai.myqcloud.com/diancan/17.jpg');
	background-attachment: fixed;
	background-repeat: no-repeat;
	background-size: contain;
}
.welcome{
	color: #4CCE61;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 270rpx;
}
.welcome text{
	display: block;
	font-size: 50rpx;
}
.welcome text:nth-child(1){
	font-family: monospace;
	padding-bottom: 20rpx;
}
/* 方块 */
.people-view{
	background-color: #FFFFFF;
	position: fixed;
	left: 30rpx;
	right: 30rpx;
	bottom: 100rpx;
	height: 550rpx;
	border-radius: 15rpx;
}
.hello{
	height: 80rpx;
	font-size: 35rpx;
	font-weight: bold;
	line-height: 80rpx;
	padding-left: 20rpx;
}
.table-num{
	font-size: 30rpx;
	padding-left: 20rpx;
}
.table-scroll{
	margin-top: 100rpx;
}
.scroll-view_H{
  white-space: nowrap;
  width: 100%;
  height: 75rpx;
}
.table-block{
	display: flex;
	align-items: center;
}
.table-block view{
	height: 75rpx;
	line-height: 75rpx;
	text-align: center;
	background-color: #f7f8f9;
	margin-right: 25rpx;
	padding: 0 70rpx;
	border-radius: 15rpx;
}
/* 按钮 */
.start-diancan{
	height: 90rpx;
	line-height: 90rpx;
	background-color:#82ce8e;
	color: #c2c2c2;
	text-align: center;
	margin: 130rpx 20rpx 0 20rpx;
	border-radius: 15rpx;
}
/* 点击后加上颜色*/
.activetext{
	background-color: #4CCE61 !important;
}
.start-activ{
	background-color: #82ce8e !important;
	color: #000000 !important;
	background:linear-gradient(to right,#82ce8e,#78ce7d,#71ce79,#4CCE61) !important;
}
</style>
