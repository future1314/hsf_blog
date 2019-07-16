//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    classficationList: [],
    articleList:[],
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 4000,
    duration: 1000,

    loading: false, // 正在加载
    loadingHasData: true, //是否还有有数据
    size: 10,
    page: 0,
    dataList: [],
  },

  onLoad: function() {
    this.initSwiper();
    this.initClassfication();
    this.initArticleList();
  },
  initArticleList(){
    var _this = this;
    wx.showLoading({
      title: '正在加载...',
    })
    db.collection('article').get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        _this.setData({
          articleList: res.data
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  initClassfication() {
    var _this = this;
    wx.showLoading({
      title: '正在加载...',
    })
    db.collection('classfication').get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        _this.setData({
          classficationList: res.data
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  },
  initSwiper() {
    var _this = this;
    wx.showLoading({
      title: '正在加载...',
    })
    db.collection('top_images').get({
      success: function(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        _this.setData({
          imgUrls: res.data
        })
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh() //停止下拉刷新
    this.setData({
      page: 0,
      dataList: [],
    });
    // this.fetchSearchList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.loading)
      return;

    if (!this.data.loadingHasData)
      return;

    this.setData({
      loading: true,
      loadingHasData: true,
    });
    // this.fetchSearchList();
  },
})