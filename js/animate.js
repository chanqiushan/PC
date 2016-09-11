/**
 * Created by Administrator on 2016/7/31.
 */
window.animate = (function (){
    function animate(ele,target,duration,effect,callback){ // time begin change duration
        //准备time,begin,change,duration
        window.clearInterval(ele.timer);
        var effectObj = {
            //匀速
            Linear: function (t, b, c, d) {
                return c * t / d + b;
            }
        };
        var tempEffect = effectObj.Linear;
        if(typeof effect == "number"){
            switch (effect){
                case 0:
                    tempEffect = effectObj.Linear;
                    break;
            }
        }else if(effect instanceof Array){ //['Expo','easeIn']
            tempEffect = effectObj[effect[0]][effect[1]];
        }else if(typeof effect == 'function'){ //第四个传了一个函数进来
            callback = effect;
        }

        var time = 0;
        //target要保证是一个object  "[object Object]"
        var begin = {};
        var change = {};
        var interval = 10;
        for(var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key] - begin[key];
        }
        ele.timer = window.setInterval(function (){
            time += interval;
            if(time >= duration){ //这才是到达终点，到达终点之后发生的事情叫做回调函数
                window.clearInterval(ele.timer);
                for(var key in target){
                    utils.css(ele,key,target[key]);
                }
                //到达之后我要做什么，
                //ele.style.backgroundColor = "red"; //
                if(typeof callback == 'function'){
                    callback.call(ele); //
                }
                return;
            }
            for(var key in change){
                if(change[key]){ //这个值为真的时候才改变呢
                    var curWeidu = tempEffect(time,begin[key],change[key],duration);
                    utils.css(ele,key,curWeidu);
                }
            }
        },interval);
    }
    return  animate; //暴露出接口
    //window.animate = animate; //暴露出接口

})();
