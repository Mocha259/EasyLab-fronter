import SockJS from 'sockjs-client';
import  Stomp from 'stompjs';
export default{
    ws:null ,
    setWs:function(newWs){
        this.ws=newWs;
    },
    connect(){
        var that=this;
        var sockjs=new  SockJS('http://localhost:89/easyLab/endpointWisely');
        var stompClient= Stomp.over(sockjs);
        that.setWs(stompClient);
        that.ws.connect({}, function (frame) {
            console.log('开始进行连接Connected: ' + frame);
        })
    },
    disconnect:function(){
        if(this.ws!=null){
            this.ws.disconnect();
            this.ws=null;
        }
    }

}