<template>
    <div>
        <header class="title-bars">
            <router-link tag="div" to="/Order">
                <a class="back">返回</a>
            </router-link>
            <h1>订单详情</h1>
        </header>
        <div class="title-logo">
            <a href="http://m.360che.com/" class="logo"></a>
            <span>卡车之家车商城<var>您的专属买车顾问</var></span>
            <a href="tel:400-800-1616" class="phone">话</a>
        </div>
        <section v-for="item in arrData">
            <!-- 公共 -->
            <div class="car-info">
                <p>下单时间：{{ item.date }}</p>
                <p>订单编号：{{ item.id }}<var>{{ item.order_status }}</var></p>
                <div class="info">
                    <figure class="car-img">
                        <img :src="item.productInfo.imguri">
                    </figure>
                    <ul class="car-info">
                        <li class="info-title">{{ item.productInfo.name }}</li>
                        <li v-if="item.status == 0 || item.status == 7">车架号：{{ item.productInfo.vin }}</li>
                        <li>颜色：{{ item.productInfo.color }}</li>
                        <li>卡车之家现价：<var>{{ item.productInfo.price }}</var></li>
                    </ul>
                </div>
            </div>
            <!-- 公共 -->

            
            <div class="pay-info" v-if="item.status == 1 || item.status == 4 || item.status == 5 || item.status == 6 || item.status == 2">
                <p v-bind:class="waitClass">在线支付：<var>{{ item.payInfo.margin }}元（需交款）</var></p>
                <p>支付渠道：{{ item.payInfo.method }}</p>
                <p>付款时间：{{ item.payInfo.pay_time }}</p>
                <p v-bind:class="waitClass">裸车尾款：<var>{{ item.payInfo.amount }}元</var>{{ item.payInfo.balance }}</p>
            </div>

            <div class="card-num" v-if="item.status == 1 || item.status == 4 || item.status == 5 || item.status == 2">
                提车单号：<span>{{ item.code }}</span>
            </div>

            <div class="pay-info" v-if="item.status == 0">
                <p>需支付：<var>{{ item.payInfo.margin }}元（需交款）</var></p>
                <p>到店支付：<var>{{ item.payInfo.balance }}</var>（定金）</p>
            </div>

            <div class="pay-info">
                <p>购车人：{{ item.purchaseInfo.name }}（说明：下单时填写的真实姓名）</p>
                <p>手机号码：{{ item.purchaseInfo.phone }}</p>
            </div>

            <div class="contact" v-if="item.status == 1 || item.status == 4 || item.status == 5 || item.status == 2">
                <ul>
                    <li>经销商：{{ item.dealerInfo.name }}</li>
                    <li>经销商地址：{{ item.dealerInfo.address }}</li>
                    <li>验车有效期至：{{ item.dealerInfo.expiry }}</li>
                    <li>负责人：{{ item.dealerInfo.sales }}<a :href="'tel:'+ item.dealerInfo.phone">电话：{{ item.dealerInfo.phone }}</a></li>
                </ul>
                <a :href="'tel:'+ item.dealerInfo.phone" class="phone">话</a>
            </div>
            <div class="pay-info pay-off" v-if="item.status == 6">
                <p>当前状态：{{ item.refundInfo.refund_status }}</p>
                <p>退款时间：{{ item.refundInfo.time }}</p>
            </div>
            <div class="pay-info" v-if="item.status == 1 || item.status == 2 || item.status == 3">
                <p>验车状态：{{ item.inspectionInfo.status }}</p>
                <p>验车时间：{{ item.inspectionInfo.time }}</p>
            </div>
            <div class="pay-info shipment" v-if="item.status == 3">
                <p>当前状态：{{ item.extractInfo.status }}</p>
                <p>提车时间：{{ item.extractInfo.time }}</p>
            </div>
            <div class="pay-info pay-off" v-if="item.status == 8">
                <p>当前状态：{{ item.abolishInfo.status }}</p>
                <p>作废时间：{{ item.abolishInfo.time }}</p>
            </div>
            
            <div class="pay-info" v-if="item.refundInfo.length > 0">
                <p>退款申请状态：{{ item.refundInfo[0].refund_status }}</p>
                <p v-if="item.refundInfo.status >= 0">申请时间：{{ item.refundInfo[0].apply_time }}</p>
                <p v-if="item.refundInfo.status >= 2">审核时间：{{ item.refundInfo[0].audit_time }}</p>
                <p v-if="item.refundInfo.status == 3">退款时间：{{ item.refundInfo[0].refund_time }}</p>
            </div>

            <div class="hint-link">
                <p>如果您将现有车牌使用于新车，请提前交易旧车或提车4s经销商办理二手车置换业务</p>
                <div class="link"><a href="tel:400-800-1616">客服电话：400-800-1616</a></div>
            </div>
            
            <!-- button -->
            <footer class="order-btn" v-if="item.status == 0 || item.status != 7">
                <a data-href="http://test-website-api.mall.com/cancel/create" class="order-cancel" v-if="item.isCancel" @click="isCancel($event,item.id)">取消定单</a>
                <a :href="item.payUrl" class="order-buy" v-if="item.isPay">去支付</a>
                <a data-href="http://test-website-api.mall.com/verify/inspection" class="car-verify" v-if="item.isInspection" @click="isCancel($event,item.id,item.inspection_id)">完成验车</a>
                <a data-href="http://test-website-api.mall.com/verify/extract" class="car-verify" v-if="item.isExtract" @click="isCancel($event,item.id,item.extract_id)">确认提车</a>
                <a :href="item.refundUrl" class="car-cancel" v-if="item.isRefund">申请退款</a>
            </footer>
        </section>
        <ChangeToast v-show="isShowToast" :ToastMsg="ToastMsg"></ChangeToast>
    </div>
</template>

<script>
    import { mallIndex } from '../index.js'
    import ChangeToast from '../components/changeToast'

    export default {
        components: {
            ChangeToast
        },
        data () {
            return {
                loaded : true,
                isShowToast : false,
                noting : false,
                titleBar : "我的订单",
                Empty : false,
                DetailLinkShow : false,
                uid : '',
                allList : 'http://test-website-api.mall.com/order/view',
                url : '',
                needPay : false,
                payType : false,
                btnType : false,
                codeContent : false,
                payInfo : false,
                arrData:[],
                waitClass : '',
                goodsInfo : [],
                timeIfo : [],
                changeItem : '',
                ToastMsg : ""
            }
        },
        created (){
            this.uid = window.userid;

            this.routerLink();
            this.urlDelivery();

            // 删除关闭
            mallIndex.$on('isShowToast', (text) => {
                this.isShowToast = text.ShowToast;
                this.changeItem = text.changeNum;
            });
        },
        updated : function(){   //数据变化执行
            if(this.changeItem == 1){
                // 判断是否有id
                this.isShowToast = false
                this.ajaxFunction();
                this.changeItem = '';
            }
        },
        methods : {
            urlDelivery : function(){
                mallIndex.$emit('urlDelivery',{
                    url : '',
                    over : true
                });
            },
            isCancel:function(e,id,pid){
                var event = e.target,
                    url = this.url = event.dataset['href'] + '?uid='+ window.userid +'&user_name='+ window.nickname + '&id=' + id;
                if(pid){
                    url = this.url =  url + '&pid=' + pid;
                }
                this.toastMsgInfo('\u786e\u5b9a\u6267\u884c\u6b64\u64cd\u4f5c') //确定执行此操作
            },
            ajaxFunction : function(){
                var ajaxRequest = new XMLHttpRequest();
                ajaxRequest.onreadystatechange = function () {
                    if (ajaxRequest.readyState === XMLHttpRequest.DONE) {
                        if (ajaxRequest.status === 200) {
                            alert(result.errInfo)
                        }else{
                            alert('\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u91cd\u8bd5') // 网络不给力，请重试
                        }
                    }
                };
                ajaxRequest.open('get', this.url);
                ajaxRequest.send();
            },
            routerLink:function(){
                var me = this;
                if( me.routerLink.DetailLinkShow ) return
                var ajaxRequest = new XMLHttpRequest();
                ajaxRequest.onreadystatechange = function () {
                    if (ajaxRequest.readyState === XMLHttpRequest.DONE) {
                        if (ajaxRequest.status === 200) {
                            var result = JSON.parse(ajaxRequest.responseText);
                            if(result.status == 1){
                                me.routerLink.DetailLinkShow = true;
                                me.DetailLinkShow = true;
                                me.arrData.push(result.data);
                            }else{
                                alert(result.errInfo)
                            }
                        }else{
                            alert('\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u91cd\u8bd5') // 网络不给力，请重试
                        }
                    }
                };
                ajaxRequest.open('get', this.allList + '?uid='+ window.userid +'&user_name='+ window.nickname + '&id=' + this.$route.params.id);
                ajaxRequest.send();
            },
            toastMsgInfo : function(msg){
                this.isShowToast = true;
                this.ToastMsg = msg;
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/css/detail/car-info.less";
    @import "../assets/css/detail/money.less";
    @import "../assets/css/detail/hint.less";
    @import "../assets/css/detail/footer.less";
    @import "../assets/css/detail/car-info/car-info.less";
    @import "../assets/css/detail/card.less";
    @import "../assets/css/detail/contact.less";
    @import "../assets/css/detail/process.less";
    @import "../assets/css/detail/link.less"; 
</style>