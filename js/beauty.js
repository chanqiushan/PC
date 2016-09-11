/**
 * Created by Administrator on 2016/8/6.
 */
//顶部导航中的下载App
var nav = document.getElementById('nav');
var codeBox = utils.getElementsByClass('codeBox',nav)[0];
var code = utils.getElementsByClass('code',codeBox)[0];
codeBox.onmouseover = function () {
    utils.css(code,'display','block');
};
codeBox.onmouseout = function () {
    utils.css(code,'display','none');
};
//右侧导航栏
var fix = document.getElementById('fix');
var fix1 = utils.getElementsByClass('fix1',fix)[0];
var fix1_2 = utils.getElementsByClass('fix1_2',fix)[0];
var fixHeight = utils.win('clientHeight');
utils.css(fix1,'height',fixHeight);
utils.css(fix1_2,'height',fixHeight);
fix1.onmouseover = function () {
    animate(fix1_2,{width:36},300);
    utils.css(fix1_2,'border','1px solid #dddddd');
    utils.css(fix1_2,'borderTop','none');

};
fix1.onmouseout = function () {
    animate(fix1_2,{width:0},300);
    utils.css(fix1_2,'border','none');
};
    //回到顶部 + 内容导航在顶部固定
var rTopBox = utils.getElementsByClass('rTopBox',fix1)[0];
var contentNav = document.getElementById('contentNav');
var contentNav1 = document.getElementById('contentNav1');
rTopBox.onclick = function () {
    utils.win("scrollTop",0);
};
    //默认隐藏，滚动条滚出去的高度大于0时出现
function rTop(){
    var curScrollTop = utils.win('scrollTop');
    //console.log(curScrollTop);
    if(curScrollTop>0){
        utils.css(rTopBox,'display','block')
    }else{
        utils.css(rTopBox,'display','none')
    }
    //内容导航在顶部固定
    var t = utils.offset(contentNav)['top'];
    if(curScrollTop >= t){
        utils.css(contentNav1,"display","block");
    }else{
        utils.css(contentNav1,"display","none");
    }
}
window.onscroll = rTop;


//搜索框中点击店铺placeholder消失
var banner = document.getElementById('banner');
var search1 = utils.getElementsByClass('search1',banner)[0];
var search1Spans = search1.getElementsByTagName('span');
var search2 = utils.getElementsByClass('search2')[0];
//console.log(search1Spans);
var inputBox = utils.getElementsByClass('inputBox',search2)[0];
//console.dir(inputBox);

/*for(var i=0;i<spans.length;i++){
 search1Spans[i].onclick = function () {
 for(var j=0;j<search1Spans.length;j++){
 search1Spans[j].temp=j;
 search1Spans[j].className = '';
 util.css(search1Spans[j],'color','');
 }
 this.className = 'bg';
 util.css(this,'color','white');
 inputBox.placeholder = this.temp == 1 ? '' : "支持奥运之运动鞋买起来!";
 }
 }*/
//上边这种方法也可以实现
for(var i=0;i<search1Spans.length;i++){
    search1Spans[i].index = i;
    search1Spans[i].onclick = function () {
        for(var j=0;j<search1Spans.length;j++){
            search1Spans[j].className = '';
            utils.css(search1Spans[j],'color','');
        }
        this.className = 'bg';
        utils.css(this,'color','white');
        inputBox.placeholder = this.getAttribute('temp') == 1 ? '' : "支持奥运之运动鞋买起来!";
    }
}
//搜索框下拉列表
var search2ul = search2.getElementsByTagName('ul')[0];
var search2lis = search2ul.getElementsByTagName('li');
for(var i=0;i<search2lis.length;i++){
    (function () {
        var curLi = search2lis[i];
        var child = utils.firstEleChild(curLi);
        //console.log(child);
        curLi.onmouseover = function () {
            utils.css(this,'backgroundColor','#f2f0f1');
            utils.css(child,'color', '#ff6699');
        };
        curLi.onmouseout = function () {
            utils.css(this, 'backgroundColor','#ffffff');
            utils.css(child,'color', '#666666');
        }
    })();
}
inputBox.onkeyup = inputBox.onfocus = function(){
    //console.log(this.value);
    var reg = /^\s*$/;
    if(reg.test(this.value)){
        utils.css(search2ul,'display','none');
        return;
    }
    utils.css(search2ul,'display','block');
};
document.body.onclick = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    switch (e.target.id){
        case  "edit":
            break;
        case  "copy":
            break;
        case  "delete":
            break;
    }
    if(e.target.nodeName.toLocaleLowerCase() == 'li'){
        //console.log(e);
        var child = utils.firstEleChild(e.target);
        //console.log(child);
        inputBox.value = child.innerHTML;
        search2ul.style.display = 'none';
    }
};

//轮播图
var contentBanner = document.getElementById('contentBanner');
var contentBannerR1 = utils.getElementsByClass('contentBannerR1',contentBanner)[0];
var lunBo = utils.getElementsByClass('lunBo',contentBannerR1)[0];
var imgs = lunBo.getElementsByTagName('img');
var focus = utils.getElementsByClass('focus',contentBannerR1)[0];
var lis = focus.getElementsByTagName('li');
var left = utils.getElementsByClass('left',contentBannerR1)[0];
var right = utils.getElementsByClass('right',contentBannerR1)[0];

(function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open("get","data.txt?_="+Math.random(),false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)){
            window.data = utils.jsonParse(xhr.responseText);
        }
    }
    xhr.send(null);
})();
console.log(data);

(function dataBind() {
     if(window.data){
         var str = "";
         var strLis = "";
         for(var i=0;i<data.length;i++){
             var curData = data[i];
             str += '<div><img src="" trueSrc="'+curData.src+'"/></div>';
             strLis += i==0 ? '<li class="borderW"></li>' : '<li></li>';
        }
         lunBo.innerHTML = str;
         focus.innerHTML = strLis;
     }
 })();
    //图片延迟加载
function imgDelay(){
    for(var i=0;i<imgs.length;i++){
        (function (i) {
            var curImg = imgs[i];
            if(curImg.isloaded)return;
            var tempImg = new Image();
            tempImg.src = curImg.getAttribute('trueSrc');
            tempImg.onload = function () {
                curImg.src = this.src;
                if(i === 0){
                    utils.css(curImg.parentNode,'zIndex',1);
                    animate(curImg.parentNode,{opacity:1},300);
                }else{
                    utils.css(curImg.parentNode,'zIndex',0);
                    utils.css(curImg.parentNode,'opacity',0);
                }
            }
            tempImg = null;
            curImg.isloaded = true;
        })(i);
    }
}
window.setTimeout(imgDelay,500);
var step = 0;
var interval = 2500;
var timer = window.setInterval(autoMove,interval);
function autoMove(){
    step++;
    if(step == data.length){
        step = 0;
    }
    setBanner();
}
function setBanner(){
    for(var i=0;i<imgs.length;i++){
        var curImg = imgs[i];
        if(i === step){
            utils.css(curImg.parentNode,'zIndex',1);
            animate(curImg.parentNode,{opacity:1},300, function () {
                var sib = utils.siblings(this);
                //console.log(sib);
                for(var i=0;i<sib.length;i++){
                    utils.css(sib[i],'opacity',0);
                }
            })
        }else{
            utils.css(curImg.parentNode,'zIndex',0);
        }
    }
    for(var i=0;i<lis.length;i++){
        lis[i].className = i == step ? "borderW" : "";
    }
}
(function focusLis(){
    for(var i=0;i<lis.length;i++){
        lis[i].index = i;
        lis[i].onclick = function () {
            step = this.index;
            setBanner();
        }
    }
})();
contentBannerR1.onmouseover = function () {
    left.style.display = right.style.display = 'block';
    window.clearInterval(timer);
};
contentBannerR1.onmouseout = function () {
    left.style.display = right.style.display = 'none';
    timer = window.setInterval(autoMove,interval);
};
left.onclick = function () {
    if(step == 0){
        step = data.length;
    }
    step--;
    setBanner();
}
right.onclick = autoMove;




