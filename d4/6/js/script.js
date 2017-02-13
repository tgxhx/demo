/**
 * Created by 12 on 2016/11/7.
 */
window.onload = function () {
    waterfall("main", "box");
    var dataInt = {"data": [{"src": "60.jpg"}, {"src": "61.jpg"}, {"src": "62.jpg"}, {"src": "63.jpg"}, {"src": "64.jpg"}, {"src": "65.jpg"}]};
    window.onscroll = function () {
        // checkScrollSlide();
        if (checkScrollSlide()) {
            var oParent = document.getElementById("main");
            //将数据块渲染到页面尾部
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement("div");
                oBox.className = "box";
                oParent.appendChild(oBox);
                var oPic = document.createElement("div");
                oPic.className = "pic";
                oBox.appendChild(oPic);
                var oImg = document.createElement("img");
                oImg.src = "images/" + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
        }
        waterfall("main", "box");
    }
}
function waterfall(parent, box) {
    //将main下所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    //计算整个页面显示的列数（页面宽度/box的宽）
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    //设置main的宽
    oParent.style.cssText = "width:" + oBoxW * cols + "px;margin:0 auto";
    // console.log(cols);]
    var hArr = []; //存放每一列的数组
    for (var i = 0; i < oBoxs.length; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hArr);
            var index = getMinhIndex(hArr, minH);
            oBoxs[i].style.position = "absolute";
            oBoxs[i].style.top = minH + "px";
            // oBoxs[i].style.left = oBoxW * index + "px";
            oBoxs[i].style.left = oBoxs[index].offsetLeft + "px";
            hArr[index] += oBoxs[i].offsetHeight;
        }
        // console.log(minH);

    }
}
//根据class获取元素
function getByClass(parent, clsName) {
    var boxArr = new Array(); //用来存储获取到的所有class为box的元素
    oElements = parent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
function getMinhIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] == val) {
            return i;
        }
    }
}
//检测是否具备了滚条加载数据块的功能
function checkScrollSlide() {
    var oParent = document.getElementById("main");
    var oBoxs = getByClass(oParent, "box");
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // console.log(scrollTop);
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    // console.log(height)
    return (lastBoxH < scrollTop + height) ? true : false;
}