<template>
<!-- 弹出购物车 -->
<view>
	<view class="details-back" @click="cLose()"></view>
	<view class="goods-details coup-anim">
		<view class="empty">
			<image src="/static/tab/qingkong.svg" mode="widthFix"></image>
			<text @click="empTy()">清空已点</text>
		</view>
		<!-- 商品列表 -->
		<block v-for="(item,index) in shopping_card" :key="index">
		<view class="goods-list" v-if="item.quantity > 0">
			<view class="goods-list-image"><image :src="item.image[0].url" mode="aspectFill"></image></view>
			<view class="goods-list-name">
				<view>{{item.name}}</view>
				<view class="list-text">
					<text>¥</text>
					<!-- 总价 -->
					<text>{{item.total_price}}</text>
				</view>
			</view>
			<view class="goods-quantity">
				<view><image src="/static/tab/jian1.png" mode="widthFix" @click="reduce(index,item.quantity,item._id,item.cid,item.good_index,item.unitprice)"></image></view>
				<view>{{item.quantity}}</view>
				<view><image src="/static/tab/jia1.png" mode="widthFix" @click="plus(index,item.quantity,item._id,item.cid,item.good_index,item.unitprice)"></image></view>
			</view>
		</view>
		</block>
		<view style="height: 100rpx;"></view>
	</view>
</view>
</template>

<script>
export default{
	props:{shopping_card:Array},
	methods:{
		cLose(){
			// 调用父组件的pop_Shopping()
			this.$parent.pop_Shopping(false)
		},
		// -
		reduce(index,quantity,_id,cid,good_index,unitprice){
			const QU = quantity - 1
			this.$parent.shopping_Cart_add_sub(index,QU,_id,cid,good_index,unitprice)
		},
		// +
		plus(index,quantity,_id,cid,good_index,unitprice){
			const QU = quantity + 1
			this.$parent.shopping_Cart_add_sub(index,QU,_id,cid,good_index,unitprice)
		},
		// 清空已点
		empTy(){
			this.$parent.empty_data()
		}
	}
}
</script>

<style scoped>
@import '../../../style/shadow.css';
.empty image{
	width: 25rpx;
	height: 25rpx;
	display: block;
	padding-right: 10rpx;
}
.empty{
	font-size: 25rpx;
	color: #aaaaaa;
	height: 90rpx;
	border-bottom: 1rpx solid #f2f2f2;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin: 0 20rpx;
}
.goods-list-image image{
	display: block;
	width: 130rpx;
	height: 130rpx;
	border-radius: 10rpx;
}
.goods-quantity image{
	display: block;
	width: 50rpx;
	height: 50rpx;
}
.goods-quantity{
	display: flex;
	align-items: center;
	align-self: flex-end;
	width: 200rpx;
	justify-content: space-between;
}
.goods-list{
	display: flex;
	justify-content: space-between;
	padding: 0 20rpx;
	height: 130rpx;
	font-size: 30rpx;
	margin: 25rpx 0 45rpx 0;
}
.goods-list-name{
	flex: 1;
	position: relative;
	padding: 0 20rpx;
}
.list-text text{
	display: block;
}
.list-text{
	display: flex;
	align-items: center;
	position: absolute;
	bottom: 0;
}
.list-text text:nth-child(1){
	font-size: 25rpx;
	padding-right: 5rpx;
}
</style>
