/**
 * Created by 12 on 2017/1/12.
 */
function $(id) {
    return document.getElementById(id);
}

function addEvent(element, event, callback) {
    if (element.addEventListener) {
        element.addEventListener(event, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, callback);
    }
}

var domSider = $("J_BdSide");
var scrollEvent = function () {
    var sideHeight = domSider.offsetHeight;
    var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollHeight + screenHeight >= sideHeight) {
        domSider.style.cssText = "position:fixed;right:0px;top:" + (-(sideHeight - screenHeight)) + "px";
    } else {
        domSider.style.position = "static";
    }
}
addEvent(window, "scroll", function () {
    scrollEvent();
})

addEvent(window, "resize", function () {
    scrollEvent();
})
scrollEvent();