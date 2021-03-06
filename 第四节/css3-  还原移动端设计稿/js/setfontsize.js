//copy from taobao
!function (win) {
    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        width / dpr > 540 && (width = 540 * dpr), win.rem = width / 16, docEl.style.fontSize = win.rem + "px"
    }

    var dpr, scale, tid, doc = win.document, docEl = doc.documentElement, metaEl = doc.querySelector('meta[name="viewport"]'), flexibleEl = doc.querySelector('meta[name="flexible"]');
    if (metaEl) {
        var match = metaEl.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
        match && (scale = parseFloat(match[2]), dpr = parseInt(1 / scale))
    } else if (flexibleEl) {
        var match2 = flexibleEl.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
        match2 && (dpr = parseFloat(match2[2]), scale = parseFloat((1 / dpr).toFixed(2)))
    }
    if (!dpr && !scale) {
        var k = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi)), devicePixelRatio = win.devicePixelRatio;
        dpr = k ? devicePixelRatio >= 3 ? 3 : devicePixelRatio >= 2 ? 2 : 1 : 1, scale = 1 / dpr
    }
    if (docEl.setAttribute("data-dpr", dpr), !metaEl) if (metaEl = doc.createElement("meta"), metaEl.setAttribute("name", "viewport"), metaEl.setAttribute("content", "initial-scale=" + scale + ", maximum-scale=" + scale + ", minimum-scale=" + scale + ", user-scalable=no"), docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(metaEl);
    } else {
        var l = doc.createElement("div");
        l.appendChild(metaEl), doc.write(l.innerHTML)
    }
    win.dpr = dpr, win.addEventListener("resize", function () {
        clearTimeout(tid), tid = setTimeout(refreshRem, 300)
    }, !1), win.addEventListener("pageshow", function (e) {
        e.persisted && (clearTimeout(tid), tid = setTimeout(refreshRem, 300))
    }, !1), "complete" === doc.readyState ? doc.body.style.fontSize = 12 * dpr + "px" : doc.addEventListener("DOMContentLoaded", function () {
        doc.body.style.fontSize = 12 * dpr + "px"
    }, !1), refreshRem()
}(window);
