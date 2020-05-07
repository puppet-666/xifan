<template>
    <div class="noteContainer">
        <calendar style="max-width: 100%;" class="canderContainer isToday containall choseday" 
        v-on:choseDay="clickDay"
        v-on:isToday="clickToday"
        :markDate=arr>
        </calendar>
        <div v-if="status==0" ref="notePanel">
            <van-panel  :title=item.note_title style="border:1px solid;margin-top:10px;" v-for="(item,index) in resData" :key="index" class="font">
                <div style="text-align:center;padding:2px;word-wrap:break-word">
                    {{item.note_content}}
                </div>
                <div slot="footer">
                    <van-button style="margin-left:50%" size="small" type="primary" color="black" class="font" @click="changeUpdate(item.note_title,item.note_date)">修改笔记</van-button>
                    <van-button style="margin-left:10px" size="small" type="primary" color="black" @click="delNote(phone,item.note_date,item.note_title)" class="font">删除笔记</van-button>
                </div>
            </van-panel>
            <div  style="text-align:center;height:60px"></div>
        </div>
        <div v-else style="text-align:center;margin-top:70px;font-size:30px;color:#cccccc" class="font">似乎还没有笔记</div>
        <div style="text-align:center;margin-top:-30px" v-if="isToday==1">
            <van-button icon="plus" type="primary" color="black" round style="margin-top:40px" @click="changeConnect" class="font">添加笔记</van-button>
            <div  style="text-align:center;height:80px"></div>
        </div>
        <van-dialog v-model="showConnect" title="添加笔记" show-cancel-button :beforeClose="beforeCloseConnect" >
            <div style="text-align: center;margin-top:20px;margin-bottom:20px">
                <van-field v-model="title" size="large" placeholder="请输入标题内容" />
                <van-field  v-model="message" rows="3" autosize  type="textarea"  placeholder="请输入笔记内容(不要超过150字噢)" />
            </div>
        </van-dialog>
        <van-dialog v-model="showUpdate" title="修改笔记" show-cancel-button :beforeClose="beforeCloseUpdate" >
            <div style="text-align: center;margin-top:20px;margin-bottom:20px">
                <van-field  v-model="updatemessage" rows="3" autosize  type="textarea"  placeholder="请输入笔记内容(不要超过150字噢)" />
            </div>
        </van-dialog>
    </div>
</template>

<script>
import Calendar from 'vue-calendar-component';
import Vue from 'vue';
import store from "store";
import { Panel,Button, Toast,Dialog,Field } from 'vant';
Vue.use(Panel)
.use(Button)
.use(Dialog)
.use(Field);
export default {
    name:"Note",
    data () {
        return {
            status:0,
            isToday:1,
            date:"",
            phone:"",
            title:"",
            resData:[],
            showConnect:false,
            showUpdate:false,
            message:"",
            updatemessage:"",
            updatetitle:"",
            updateday:"",
            arr:[]
            // choseDate:""
        }
    },
    components:{
        "calendar":Calendar
    },
    methods:{
        clickDay(data) {
            // this.choseDate=data.replace(/\//g, '-');
            data=data.replace(/\//g, '-');
            this.getNote(this.phone,data);
            if(data!=this.date){
                this.isToday=0
            }
            else{
                this.isToday=1
            }
        },
        // changeDate(data) {
        //     Toast(data); //左右点击切换月份
        //     if(data!=this.date){
        //         this.isToday=0
        //     }
        //     else{
        //         this.isToday=1
        //     }
        // },
        clickToday(data) {
            this.date=data.replace(/\//g, '-');
            // this.getNote(this.phone,this.date);
            // Toast(data); // 跳到了本月
        },
         // 获取笔记
        async getNote(phone,date) {
            try {
                // 尝试登录
                let res = await this.$api.note.getNote(phone,date)
                if(res.length){
                    this.status=0;
                    this.resData=res;
                }else{
                     this.status = res.status
                }
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        },
        // 删除笔记
        async delNote(phone,date,title) {
            try {
                // 尝试登录
                let res = await this.$api.note.delNote(phone,date,title)
                this.getNote(phone,date)
                Toast.success(res.message)
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        },
         // 添加笔记
        async addNote(phone,title,message,date) {
            try {
                let res=await this.$api.note.addNote(phone,title,message,date)
                if(res.status==1){
                    Toast.fail(res.message);
                }
                else{
                    this.getNote(phone,date)
                }
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        },
        // 修改笔记
        async updateNote(content,phone,date,title) {
            try {
                let res=await this.$api.note.updateNote(content,phone,date,title)
                if(res.status==1){
                    Toast.fail(res.message);
                }
                else{
                    this.getNote(phone,date)
                }
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        },
        // 获取标记笔记
        async noteDate(phone) {
            try {
                let res=await this.$api.note.noteDate(phone);
                this.arr=res;
            } catch (e) {
                // eslint-disable-next-line
                console.log("​catch -> e", e);
            }
        },
        beforeCloseConnect(action, done){
            if (action === 'cancel') {//取消按钮
                this.title="";
                this.message="";
                done();
            }else if (action === 'confirm') {//确定按钮
                if(this.message.length>150){
                    Toast.fail('笔记字数超过150字');
                    done(false);
                }
                else if(this.title.length>50){
                    Toast.fail('标题字数超过50字');
                    done(false);
                }
                else{
                    if(this.message.length!=0 && this.title.length!=0){
                        this.addNote(this.phone,this.title,this.message,this.date);
                        Toast.success('笔记添加成功');
                        done();
                        this.title="";
                        this.message="";
                    }
                    else{
                        Toast.fail("标题、内容不能为空");
                        done(false);
                    }
                }
            }
        },
        beforeCloseUpdate(action, done){
            if (action === 'cancel') {//取消按钮
                this.updatemessage = "";
                this.updatetitle = "";
                done();
            }else if (action === 'confirm') {//确定按钮
                if(this.updatemessage.length>150){
                    Toast.fail('笔记字数超过150字')
                    done(false) 
                }
                else if(this.updatemessage.length==0){
                    Toast.fail("修改内容不能为空");
                    done(false);
                }
                else{
                    this.updateNote(this.updatemessage,this.phone,this.updateday,this.updatetitle);
                    Toast.success('笔记修改成功');
                    done();
                    this.updatemessage="";
                    this.updatetitle="";
                }
            }
        },
        changeConnect(){
            this.showConnect = true;
        },
        changeUpdate(title,day){
            this.showUpdate = true;
            this.updatetitle = title;
            this.updateday = day;
        }
    },
    mounted:function () {
        let user=store.get('user');
        this.phone=user.phone;
        this.getNote(this.phone,this.date);
        this.noteDate(this.phone);
    }
}
</script>

<style lang="scss" scoped>
@import  '@/scss/index.scss';
.font{
    font-family:"Microsoft JhengHei";
    font-weight: 550;
}
.noteContainer{
    background: white;
}
.isToday /deep/ .wh_isToday{
    background:black;
}
.choseday /deep/ .wh_chose_day{
    background: #ccc;
}
.containall /deep/ .wh_content_all{
    background-color:#555555;
}

</style>