"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},list=[{date:"2018.11.02.",img:"/dist/img_sp/20181102.jpg",desc:"我们加了微信，说了第一句问候语，任静哈，你好，请多指教。",init:!1},{date:"2018.11.10.",img:"/dist/img_sp/20181110.jpg",desc:"粗心的我买错了回老家的高铁票，还没办法改签，但也错打正着，在那个周末，我们约了第一次吃饭和看电影，那时候觉得你是个可爱的爱吃鱼头的话痨女孩子。",init:!1},{date:"2018.11.18.",img:["/dist/img_sp/20181118_1.jpg","/dist/img_sp/20181118_2.jpg"],desc:"那个时候我经常流鼻血，鼻炎也一直拖着不好，你硬是拉着我说陪我去医院，现在想起来真是个暖宝宝呢，嘻嘻。",init:!1},{date:"2018.11.25.",img:"/dist/img_sp/20181125.jpg",desc:"天下着毛毛细雨，我们依然坚持去了云台花园和白云山，我抱着害羞又激动的心情问你：“我可以牵着你吗”，没想到这一整天的大手牵小手，让我“难受”了一整天，我连抱着你都不敢靠太近（害羞脸）。",init:!1},{date:"2018.12.09.",img:"/dist/img_sp/20181209.jpg",desc:"谢谢你和我拍了很多好看的照片，我会继续进修我的拍照技术。",init:!1},{date:"2018.12.25.",img:["/dist/img_sp/20181225_1.jpg","/dist/img_sp/20181225_2.jpg","/dist/img_sp/20181225_3.jpg"],desc:"我们过的第一个有意义的节日，在夜色的陪伴下，我们坐在华工运动场，我把你的礼物拆开之后，我对你的好感突然就升华成喜欢了，忍不住跟你表了白，还第一次亲吻了你涂满口红的嘴唇（害我一嘴红）和...（嘻嘻）。",init:!1},{date:"2019.01.01.",img:["/dist/img_sp/20190101_1.jpg","/dist/img_sp/20190101_2.jpg"],desc:"元旦，你来了我家，我们做饭吃，看电影，看跨年晚会，看你的朱老师，喝早茶……",init:!1},{date:"2019.01.17.",img:"/dist/img_sp/20190117.jpg",desc:"第二天你就要回湖北了，超级不舍，所以给你留了点纪念。",init:!1},{date:"2019.01.19.",img:"/dist/img_sp/20190119.jpg",desc:"我们第一次视频聊天，一聊就坚持了十几天，我看到了一个不一样的你，我这个p得还不错吧（骄傲脸）。",init:!1},{date:"未来",img:"/dist/img_sp/love.png",desc:"想跟你留下更多回忆，想跟你一直走下去。（本来想在这里贴朱老师和二硕的照片的，还是算了，看本帅宝就行了）",init:!1}],x=void 0,y=void 0,isStarted=!1;function start(){console.log("start");for(var i=document.querySelector("#first"),e=document.querySelector("#second"),t="",s=0;s<list.length;s++){var n="";if(list[s].img&&"object"===_typeof(list[s].img))if(s<2){for(var l=0;l<list[s].img.length;l++)n+='<img src="'+list[s].img[l]+'" alt="" class="list-img"">';list[s].init=!0}else for(var c=0;c<list[s].img.length;c++)n+='<img data-src="'+list[s].img[c]+'" alt="" class="list-img" src="/dist/img_sp/love.png">';else list[s].img&&(s<2?(n='<img src="'+list[s].img+'" alt="" class="list-img">',list[s].init=!0):n='<img data-src="'+list[s].img+'" alt="" class="list-img" src="/dist/img_sp/love.png">');t+='<li class="li">\n\t\t\t<div class="list-icon">\n\t\t\t\t<div class="list-icon-ver"></div>\n\t\t\t\t<div class="list-icon-hor"></div>\n\t\t\t</div>\n\t\t\t<p class="list-date">\n\t\t\t\t'+list[s].date+"\n\t\t\t</p>\n\t\t\t"+n+'\n\t\t\t<p class="list-desc">\n\t\t\t\t'+list[s].desc+"\n\t\t\t</p>\n\t\t</li>"}e.innerHTML=t,i.className="left",i.addEventListener("animationend",function(t){i.style.display="none",e.style.position="static",isStarted=!0});var o=document.querySelector(".img-default");e.addEventListener("click",function(t){t.preventDefault(),"img"===t.target.tagName.toLowerCase()&&(o.style.backgroundImage="url('"+t.target.src+"')",o.style.display="block")}),o.addEventListener("click",function(t){o.style.backgroundImage="",o.style.display="none"});var d=!1;window.addEventListener("scroll",function(){if(d)return!1;d=!0,setTimeout(function(){window.scrollY;for(var t=document.documentElement.clientHeight,i=0;i<list.length;i++)if(!list[i].init){list[i].el||(list[i].el=document.querySelectorAll("#second li")[i],list[i].img=list[i].el.querySelectorAll("img"));var e=list[i].el.getBoundingClientRect(),s=e.top;0<s+e.height&&s<t-30&&(list[i].img.forEach(function(t){t.src=t.getAttribute("data-src")}),list[i].init=!0)}d=!1},250)})}document.querySelector(".bottom").addEventListener("click",function(){if(isStarted)return document.querySelector(".bottom").removeEventListener("click"),!1;start()}),document.documentElement.addEventListener("touchstart",function(t){if(isStarted)return!1;var i=t.targetTouches&&t.targetTouches[0];x=i.clientX,y=i.clientY}),document.documentElement.addEventListener("touchend",function(t){if(isStarted)return!1;var i=t.changedTouches&&t.changedTouches[0];i.clientX;i.clientY-y<-50&&start()});var $music=document.querySelector("#music"),$icon=document.querySelector("#icon");$music.addEventListener("canplay",function(){$icon.style.display="block",$icon.addEventListener("click",function(){this.className?(this.className="",$music.play()):(this.className="paused",$music.pause())})});