//Page Object
import { request } from "../../request/index.js"
Page({
    data: {
        swiperList: [],
        navList: [],
        floorList: []

    },
    //options(Object)
    onLoad: function(options) {
        this.getSwiperList()
        this.getNavList()
        this.getfloorList()

    },
    getSwiperList() {
        request({ url: "/home/swiperdata" }).then(
            result => {
                this.setData({
                    swiperList: result,
                })
            }
        )
    },
    getNavList() {
        request({ url: "/home/catitems" }).then(
            result => {
                this.setData({
                    navList: result,
                })

            }
        )
    },
    getfloorList() {
        request({ url: "/home/floordata" }).then(
            result => {
                this.setData({
                    floorList: result,
                })

            }
        )
    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});