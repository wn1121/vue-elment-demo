<!--倒计时-->
<template>
    <span>{{time}}</span>
</template>
<script>
    export default{
        data(){
            return {
                //time: '',
                now: 0
            };
        },
        props: ['startime','endtime','timestr'],//传过来的时间戳
        methods: {
            formate(time){
                let hour = parseInt(time/1000/3600);
                let min = parseInt((time/1000 - hour * 3600)/60);
                let sec = parseInt(time/1000 - hour * 3600 - min * 60);
                min = min>=10?min:'0' + min;
                sec = sec>=10?sec:'0' + sec;
                return hour + '时' + min + '分' + sec + '秒';
            }
        },
        computed:{
            'time': function(){
                if(this.startime){
                    return this.formate(this.now - this.startime);
                }
                if(this.endtime){
                    return this.formate(this.endtime - this.now);
                }
                if(this.timestr){
                    return this.formate(this.timestr + this.now);
                }
            }
        },
        created(){
            if(this.startime || this.endtime){
                setInterval(()=>{
                    this.now = new Date().getTime();
                }, 1000);
            }
            if(this.timestr){
                setInterval(()=>{
                    this.now = this.now + 1000;
                }, 1000);
            }
        }
    }
</script>