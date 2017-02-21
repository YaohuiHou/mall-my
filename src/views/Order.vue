<template>
    <div>
        <!-- <div v-if="noDetailLinkShow"> -->
            <TitleBar :titleBar="titleBar" :Empty="Empty"></TitleBar>
            <div class="title-logo" v-if="appData.showFooter">
                <a href="http://m.360che.com/" class="logo">卡车之家</a>
                <span>卡车之家车商城<var>您的专属买车顾问</var></span>
                <a href="tel:400-800-1616" class="phone">话</a>
            </div>
            <section>
                <p class="nothing" v-if="appData.isShowNothing">您还没有订单~</p>
                <ul class="order-list">
                    <li v-for="item in appData.data" >
                        <!-- <div :data-href="'http://test-website-api.mall.com/order/view?id=' + item.id +'&user_name=1&uid=1'"   @click="routerLink(item.id)"> -->
                        <router-link :to="{name:'Detail',params:{id:item.id}}">
                            <p>下单时间：{{ item.date }}</p>
                            <p>订单编号：{{ item.id }}<var>{{ item.order_status }}</var></p>
                            <div class="info">
                                <figure class="car-img">
                                    <img v-bind:src="item.productInfo.imguri" />
                                </figure>
                                <ul class="car-info">
                                    <li class="info-title">{{ item.productInfo.name }}</li>
                                    <li>颜色：{{ item.productInfo.color }}</li>
                                    <li>卡车之家现价：<var>{{ item.productInfo.price }}</var></li>
                                </ul>
                            </div>
                        <!-- </div> -->
                        </router-link>
                        <div class="footer-buy" v-if="item.isPay">
                            <a v-bind:href="item.payUrl">去支付</a>
                        </div>
                    </li>
                </ul>
            </section>
            <div class="contact" v-if="appData.showFooter">
                <a href="tel:400-800-1616">客服电话：400-800-1616</a>
            </div>
        <!-- </div>
        <DetailLink v-if="DetailLinkShow" :appData="appData"></DetailLink> -->
    </div>
</template>

<script>
    import { mallIndex } from '../index.js'
    import TitleBar from '../components/title-bar'
    // import DetailLink from './Detail'
    // import Router from 'vue-router'

    export default {
        components: {
            TitleBar
        },
        data () {
            return {
                loaded : true,
                isShowToast : false,
                noting : false,
                titleBar : "我的订单",
                Empty : false,
                DetailLinkShow : false,
                noDetailLinkShow : true,
                uid : '',
                allList : 'http://test-website-api.mall.com/order/index',
                detailLink : 'http://test-website-api.mall.com/order/view',
                ajaxData : {}
            }
        },
        props: {
            appData: {
                type: Object
            }
        },
        created (){
            this.uid = window.userid;

            this.urlDelivery();
        },
        methods : {
            urlDelivery : function(){
                mallIndex.$emit('urlDelivery',{
                    url : this.allList,
                    loadSome : true
                });
            },
            routerLink:function(id){

                $route.params(id)
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/css/my-order/my-order.less";
    @import "../assets/css/footer/footer.less";
    @import "../assets/css/title-bar/bar.less";
    @import "../assets/css/title-bar/title-logo.less";
</style>