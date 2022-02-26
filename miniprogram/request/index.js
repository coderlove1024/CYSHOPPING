let ajaxTimes = 0;
export function request(config) {
    const baseurl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        ajaxTimes++;
        // 显示加载中 效果
        wx.showLoading({
            title: "加载中",
            mask: true
        });
        wx.request({
            ...config,
            url: baseurl + config.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    //  关闭正在等待的图标
                    wx.hideLoading();
                }
            }

        });
    })
}