// pages/index/index.js
import {
	IndexModel
} from '../../models/index.js'


const indexModel = new IndexModel();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		articleList: [],
		markTypeList:[],
		recommendInfo:{},
		flag:false,
		scrollArr:['青芒','兴趣','物质','世界','新事','灵魂'],
		navActive:0
	},
	//获取当前日期
	getDate(){
		const month = new Date().getMonth() +1;
		const day = new Date().getDate();
		const date = [month,day];
		this.setData({
			date
		})
	},
	//获取首页文章信息
	getData(magazineId = 0) {
		let that = this;
		const articleList = indexModel.getIndexArticleList(magazineId);
		const markTypeList = indexModel.getMarkTypeList(magazineId);
		const recommendInfo=indexModel.getRecommendInfo(magazineId);
		Promise.all([articleList, markTypeList,recommendInfo]).then(res => {
			console.log(res[0][0], res[1],res[2]);
			that.setData({
				articleList: res[0],
				markTypeList:res[1],
				recommendInfo:res[2]
			})
		})
	},
	//更新页面的渲染信息
	upData(magazineId = 0) {
		const count = this.data.articleList.length;
		const articlePromise = indexModel.getIndexArticleList(magazineId, count);
		articlePromise.then(res => {
			const articleList = this.data.articleList.concat(res);
			if(articleList.length == count){
				this.setData({
					flag:true,
				})
				return;
			}
			this.setData({
				articleList,
			})
		})
	
	},
	

	//监听index页面上拉触底事件
	onReachBottom() {
		if(this.data.flag){
			return;
		}
		this.upData(this.data.navActive);
	},
	//导航栏点击事件
	turnPage(e){
		const index = e.currentTarget.dataset.index;
		this.setData({
			navActive:index,
			flag:false
		})
		this.getData(index);
		wx.pageScrollTo({
			scrollTop:0,
			duration:0,
		})
	},
	
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.getData()
		this.getDate()
		
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
