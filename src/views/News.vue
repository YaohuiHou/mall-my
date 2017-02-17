<template>
    <div>
        <TitleBar :titleBar="titleBar" :Empty="appData.showFooter"></TitleBar>
        </section>
            <p class="nothing" v-if="appData.isShowNothing">您还没有作何消息~</p>
            <ul class="my-news">
                <li class="new" v-for="item in appData.data" v-bind:id="item.id">
                    <i>信<em v-if="!item.type"></em></i>
                    <p>{{ item.content }}</p>
                    <span>{{ item.add_time }}</span>
                    <em @click="changeDelete($event)">删</em>
                </li>
            </ul>
        </section>
        <div class="contact" v-if="appData.showFooter">
            <a href="tel:400-800-1616">客服电话：400-800-1616</a>
        </div>
        <ChangeToast v-show="isShowToast" :ToastMsg="ToastMsg"></ChangeToast>
    </div>
</template>

<script>
    import { mallIndex } from '../index.js'
    import TitleBar from '../components/title-bar'
    import ChangeToast from '../components/changeToast'
    import axios from 'axios'

    export default {
        components: {
            TitleBar,
            ChangeToast
        },
        data () {
            return {
                loaded : true,
                isShowToast : false,
                noting : false,
                ToastMsg : '',
                id : '',
                changeItem : '',
                titleBar : "我的消息",
                Empty : true,
                urlSingle : "http://test-website-api.mall.com/message/delete",
                urlAll : "http://test-website-api.mall.com/message/batch-delete",
                allList : 'http://test-website-api.mall.com/message/index'
            }
        },
        props: {
            appData: {
                type: Object
            }
        },
        created (){
            // 清空消息
            mallIndex.$on('changeEmpty', (text) => {
                this.isShowToast = text.ShowToast;
                this.ToastMsg = text.ToastInfo;
            });
            // 删除关闭
            mallIndex.$on('isShowToast', (text) => {
                this.isShowToast = text.ShowToast;
                this.changeItem = text.changeNum;
            });


            this.urlDelivery();
            // 改变消息状态
            axios.get( "http://test-website-api.mall.com/message/batch-update").then(function(res){}).catch(function(err){})
        },
        updated : function(){   //数据变化执行
            if(this.changeItem == 1){
                // 判断是否有id
                this.isShowToast = false
                if(this.id == ''){
                    this.deleteItem(this.urlAll);
                }else{
                    this.deleteItem(this.urlSingle);
                }
                
            }
        },
        methods : {
           deleteItem : function(url){
                var me = this,
                    mid = '';
                if(me.deleteItem.ajaxDis) return;
                me.deleteItem.ajaxDis = true;
                // o.append('uid', 1 );
                if(me.id != ''){
                    mid = '&mid='+me.id
                }

                var ajaxRequest = new XMLHttpRequest();
                ajaxRequest.onreadystatechange = function () {
                    if (ajaxRequest.readyState === XMLHttpRequest.DONE) {
                        if (ajaxRequest.status === 200) {
                            me.deleteItem.ajaxDis = false;
                            var result = JSON.parse(ajaxRequest.responseText);
                            if(result.status == 1){
                                if(mid == ''){
                                    document.querySelector('.my-news').style.display = 'none';
                                    mallIndex.$emit('notingNews',{
                                        isShowNothing : true
                                    })
                                }else{
                                   // 取消收藏后刷新页面
                                    mallIndex.$emit('isShowToast',{
                                        ShowToast : false,
                                        page : 1,
                                        Refresh : true,
                                        toastInfo : result.errInfo
                                    }) 
                                }
                            }else{
                                mallIndex.$emit('ShowToast',{
                                    ShowToast : true,
                                    toastInfo : result.errInfo
                                })
                            }
                        }else{
                            me.deleteItem.ajaxDis = false;
                            mallIndex.$emit('ShowToast',{
                                ShowToast : true,
                                toastInfo : '\u7f51\u7edc\u4e0d\u7ed9\u529b\uff0c\u8bf7\u91cd\u8bd5'  // 网络不给力，请重试
                            })
                        }
                    }
                };
                ajaxRequest.open('get', url +'?uid=1&user_name=12' + mid);
                ajaxRequest.send();
                me.id = '';
           },
           changeDelete : function(e){
                var event = e.target;
                var that = this;

                that.id = event.parentElement.id;
                that.toastMsgInfo('\u786e\u8ba4\u5220\u9664\u8fd9\u6761\u4fe1\u606f\u5185\u5bb9~'); // 确认删除这条信息内容~
           },
           urlDelivery : function(){
                mallIndex.$emit('urlDelivery',{
                    url : this.allList,
                    loadSome : true
                });
           },
           toastMsgInfo : function(msg){
                this.isShowToast = true;
                this.ToastMsg = msg;
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/css/my-news/news.less";
    @import "../assets/css/footer/footer.less";
</style>