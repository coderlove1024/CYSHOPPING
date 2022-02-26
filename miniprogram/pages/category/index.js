// pages/category/index.js
import { request } from "../../request/index.js"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cates: [],
        currentindex: 0,
        cateRight: [],
        scrollTop: 0

    },
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const Cates = wx.getStorageSync("cates");
        if (!Cates) {
            this.getCates()
        } else {
            // 有旧的数据 定义过期时间  10s 改成 5分钟
            if (Date.now() - Cates.time > 1000 * 10) {
                // 重新发送请求
                this.getCates();
            } else {
                // 可以使用旧的数据
                this.Cates = Cates.data;
                let cates = this.Cates
                let cateRight = this.Cates[0].children;
                this.setData({
                    cates,
                    cateRight
                })
            }
        }

    },
    async getCates() {
        const res = await request({ url: "/categories" })
        this.Cates = res,
            wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
        let cates = this.Cates
        let cateRight = this.Cates[0].children;
        this.setData({
            cates,
            cateRight
        })
    },
    cateItemclick(e) {
        console.log(e);
        const { index } = e.currentTarget.dataset;
        console.log(index)
        this.setData({
            currentindex: index,
            scrollTop: 0,
            cateRight: this.data.cates[index].children
        })

    }
})