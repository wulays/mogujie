<template>
    <div class="profile">
        <van-nav-bar fixed title="我的档案" :border="false" />
        <div class="user">
            <div class="user-avatar">
                <van-icon name="manager" />
            </div>
            <div class="user-info">
                <span>登陆/注册</span>
                暂无绑定手机号
            </div>
        </div>
        <van-grid :column-num="3" clickable>
            <van-grid-item text="我的余额">
                <template #icon>
                    <div class="van-grid-item-title"><span>0.00</span>元</div>
                </template>
            </van-grid-item>
            <van-grid-item text="我的优惠">
                <template #icon>
                    <div class="van-grid-item-title"><span>0</span>个</div>
                </template>
            </van-grid-item>
            <van-grid-item text="我的积分">
                <template #icon>
                    <div class="van-grid-item-title"><span>0</span>积分</div>
                </template>
            </van-grid-item>
        </van-grid>
        <div class="message">
                <van-cell clickable title="我的消息" icon="envelop-o" />
                <van-cell clickable title="积分商城" icon="gift-o" />
                <van-cell clickable title="会员卡" icon="gem-o" />
        </div>
        <div class="service">
            <van-cell clickable title="我的购物车" to="/cart" icon="cart-o" />
            <van-cell clickable title="下载购物APP" icon="scan" />
        </div>
    </div>
</template>

<style lang="less" scoped>
.profile {
    padding: 46px 0 50px;
    .user {
        background-color: #f9496f;
        display: flex;
        padding: 15px;
        .user-avatar {
            width: 50px;
            line-height: 50px;
            background-color: #eee;
            border-radius: 50%;
            text-align: center;
            color: #ccc;
            font-size: 24px;
        }
        .user-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 15px;
            font-size: 12px;
            color: #fff;
            span {
                padding: 5px 0;
                display: block;
                font-size: 16px;
            }
        }
    }
    .van-grid {
        .van-grid-item {
            .van-grid-item-title {
                padding: 5px 0;
                font-size: 12px;
                span {
                    font-size: 18px;
                    font-weight: bold;
                    padding: 0 5px;
                    color: #f9496f;
                }
            }
        }
    }
    .message {
        padding: 15px 0;
        background-color: #ececec;
    }
    .service,
    .message{
        .van-cell{
            .van-icon{
                color: #f9496f;
            }
        }
    }
}
</style>
