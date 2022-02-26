// pages/cart/index.js
import { showModal, showToast } from "../../utils/asynWX.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cart: [],
        address: "",
        username: "",
        tel: "",
        allchecked: false,
        totalprice: 0,
        totalnum: 0

    },
    handeItemChange(e) {
        // 1 获取被修改的商品的id
        const goods_id = e.currentTarget.dataset.id;
        // 2 获取购物车数组 
        let { cart } = this.data;
        // 3 找到被修改的商品对象
        let index = cart.findIndex(v => v.goods_id === goods_id);
        // 4 选中状态取反
        cart[index].checked = !cart[index].checked;

        this.setCart(cart);
    },
    handleItemAllCheck() {
        let { cart, allchecked } = this.data;
        allchecked = !allchecked;
        cart.forEach(v => {
            v.checked = allchecked
        })
        this.setCart(cart)


    },
    async handleItemNumEdit(e) {
        const { operation, id } = e.currentTarget.dataset
        let { cart } = this.data
        let index = cart.findIndex(item => item.goods_id === e.currentTarget.dataset.id)
        if (cart[index].num === 1 && operation == -1) {
            const res = await showModal({ content: "您是否删除" })
            if (res.confirm) {
                cart.splice(index, 1)
                this.setCart(cart);
            }

        } else {
            cart[index].num += parseInt(operation);
            this.setCart(cart)

        }
    },
    handeItemChange(e) {
        // 1 获取被修改的商品的id
        const goods_id = e.currentTarget.dataset.id;
        // 2 获取购物车数组 
        let { cart } = this.data;
        // 3 找到被修改的商品对象
        let index = cart.findIndex(v => v.goods_id === goods_id);
        // 4 选中状态取反
        cart[index].checked = !cart[index].checked;

        this.setCart(cart);

    },
    setCart(cart) {

        let allchecked = true;
        let totalnum = 0;
        let totalprice = 0;
        cart.forEach(e => {
            if (e.checked) {
                totalprice += e.goods_price * e.num;
                totalnum += e.num;
            } else {
                allchecked = false
            }

        });
        allchecked = cart.length != 0 ? allchecked : false
        this.setData({
            cart,
            totalnum,
            totalprice,
            allchecked

        });
        wx.setStorageSync("cart", cart);
    },

    handleChooseAddress() {
        wx.chooseAddress({
            success: (result) => {
                console.log(result);
                this.setData({
                    username: result.userName,
                    address: result.provinceName + result.cityName + result.countyName + result.detailInfo,
                    tel: result.telNumber
                })
                wx.setStorageSync("username", this.data.username)
                wx.setStorageSync("tel", this.data.tel)
                wx.setStorageSync("address", this.data.address)

            },

        })
    },
    async handlePay() {
        const { address, totalnum } = this.data;
        if (!address) {
            await showToast({ title: "您还没有选地址" })
            return
        }
        if (totalnum === 0) {
            await showToast({ title: "您还没有选商品" });
            return;
        }
        wx.navigateTo({
            url: '/pages/pay/index'
        });
    },
    onShow() {
        const cart = wx.getStorageSync("cart") || [];
        this.setCart(cart)
    }

})