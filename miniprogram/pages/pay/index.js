// pages/pay/index.js
import { request } from "../../request/index.js";
import { showModal, showToast, requestPayment } from "../../utils/asynWX.js";


Page({
    data: {
        cart: [],
        address: "",
        username: "",
        tel: "",
        totalprice: 0,
        totalnum: 0



    },
    onShow() {
        const address = wx.getStorageSync("address");
        let cart = wx.getStorageSync("cart") || [];
        const username = wx.getStorageSync("username");
        const tel = wx.getStorageSync("tel");
        console.log(cart)
        cart = cart.filter(v => v.checked)

        this.setData({
            address,
            username,
            tel
        })
        let totalprice = 0;
        let totalnum = 0;
        cart.forEach(v => {
            totalprice += v.num * v.goods_price;
            totalnum += v.num;
        })
        this.setData({
            cart,
            totalprice,
            totalnum,
            address
        });




    },
    async handleOrderPay() {
        try {
            const token = wx.getStorageSync("token")
            if (!token) {
                wx.navigateTo({
                    url: '/pages/auth/index',
                });
                return
            }
            const order_price = this.data.totalprice
            const consignee_addr = this.data.address
            const cart = this.data.cart
            let goods = []
            cart.forEach(v => {
                goods_id: v.goods_id;
                goods_number: v.num;
                goods_price: v.goods_price

            })
            const orderParams = { order_price, consignee_addr, goods }
            const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams });
            const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });
            // 6 发起微信支付 
            await requestPayment(pay);
            // 7 查询后台 订单状态
            const res = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } });
            await showToast({ title: "支付成功" });
            let newCart = wx.getStorageSync("cart");
            newCart = newCart.filter(v => !v.checked);
            wx.setStorageSync("cart", newCart);
            wx.navigateTo({
                url: '/pages/order/index'
            });

        } catch (error) {
            await showToast({ title: "支付失败" })
            console.log(error);
        }


    }












})