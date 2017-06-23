(function() {
    function q(G) {
        if ("string" == typeof G || G instanceof String) {
            return document.getElementById(G)
        } else {
            if (G && G.nodeName && (G.nodeType == 1 || G.nodeType == 9)) {
                return G
            }
        }
        return null
    }

    function y(G) {
        return G.replace(new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"), "")
    }

    function i(G) {
        return (G.search(/[^*()<>"']/) == -1) ? true : false
    }

    function H(M, I, G, J, L) {
        var K = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="' + G + '" height="' + J + '" id="' + M + '" align="middle">';
        K += '<param name="allowscriptaccess" value="always">';
        K += '<param name="quality" value="high">';
        K += '<param name="movie" value="' + I + '">';
        K += '<param name="flashvars" value="' + L + '">';
        K += '<embed src="' + I + '" flashvars="' + L + '" quality="high" width="' + G + '" height="' + J + '" name="' + M + '" align="middle" allowscriptaccess="always" wmode="window" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer">';
        K += "</object>";
        return K
    }

    function c(G) {
        return document[G] || window[G]
    }

    function B(G) {
        var I = G.sort();
        var K = {};
        for (var J = 0, M = G.length - 1; J < M; J++) {
            if (I[J + 1] == I[J]) {
                var L = I[J];
                K[L] = J
            }
        }
        return K
    }

    function x(I) {
        var G = [];
        var K = document.getElementsByTagName("*");
        var J = 0;
        while (elm = K[J++]) {
            elm[I] ? G[G.length] = elm[I] : null
        }
        return G
    }

    function j(I) {
        var G = x(I);
        return B(G)
    }

    function v(G) {
        if (G && G.preventDefault) {
            G.preventDefault()
        } else {
            window.event.returnValue = false
        }
        return false
    }

    function a(G) {
        var G = G || window.event;
        if (G.stopPropagation) {
            G.stopPropagation()
        } else {
            window.event.cancelBubble = true
        }
    }

    function C(G) {
        return G.match(/^(http|https):\/\/(.*?)($|\/)/i)[2]
    }

    function d(J, K) {
        var I = new RegExp("(^|&|\\?)" + J + "=([^&]*)(&|\x24|#)");
        var G = K.match(I);
        if (G) {
            return G[2]
        }
    }
    var s = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
    var t = /msie (\d+\.\d)/i.test(navigator.userAgent) ? parseFloat(RegExp["\x241"]) : 0;
    var m = (/(\d+\.\d)(\.\d)?\s+safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent)) ? parseFloat(RegExp["\x241"]) : 0;
    var r = /webkit/i.test(navigator.userAgent);
    var z = /opera\/(\d+\.\d)/i.test(navigator.userAgent) ? parseFloat(RegExp["\x241"]) : 0;
    var p = document.compatMode == "CSS1Compat";

    function A(G) {
        return String(G).replace(/[-_]\D/g, function(I) {
            return I.charAt(1).toUpperCase()
        })
    }

    function o(J, I, G) {
        J = q(J);
        I = I.replace(/^on/i, "").toLowerCase();
        if (J.attachEvent) {
            J.attachEvent("on" + I, G)
        } else {
            if (J.addEventListener) {
                J.addEventListener(I, G, false)
            }
        }
    }

    function g(I, G) {
        I = q(I);
        G = A(G);
        var K = I.style[G];
        if (K) {
            return K
        }
        var J = I.currentStyle || (t ? I.style : getComputedStyle(I, null));
        K = J[G];
        return K
    }

    function D(J) {
        var J = q(J);
        var N = (J.nodeType == 9) ? J : J.ownerDocument || J.document;
        var M = s > 0 && N.getBoxObjectFor && g(J, "position") == "absolute" && (J.style.top === "" || J.style.left === "");
        var O = {
            left: 0,
            top: 0
        };
        var I = (t && !p) ? N.body : N.documentElement;
        if (J == I) {
            return O
        }
        var K = null;
        var L;
        if (J.getBoundingClientRect) {
            L = J.getBoundingClientRect();
            O.left = Math.floor(L.left) + Math.max(N.documentElement.scrollLeft, N.body.scrollLeft);
            O.top = Math.floor(L.top) + Math.max(N.documentElement.scrollTop, N.body.scrollTop);
            O.left -= N.documentElement.clientLeft;
            O.top -= N.documentElement.clientTop;
            if (t && !p) {
                O.left -= 2;
                O.top -= 2
            }
        } else {
            if (N.getBoxObjectFor && !M) {
                L = N.getBoxObjectFor(J);
                var G = N.getBoxObjectFor(I);
                O.left = L.screenX - G.screenX;
                O.top = L.screenY - G.screenY
            } else {
                K = J;
                do {
                    O.left += K.offsetLeft;
                    O.top += K.offsetTop;
                    if (r > 0 && g(K, "position") == "fixed") {
                        O.left += N.body.scrollLeft;
                        O.top += N.body.scrollTop;
                        break
                    }
                    K = K.offsetParent
                } while (K && K != J);
                if (z > 0 || (browser.isWebkit > 0 && g(J, "position") == "absolute")) {
                    O.top -= N.body.offsetTop
                }
                K = J.offsetParent;
                while (K && K != N.body) {
                    O.left -= K.scrollLeft;
                    if (!b.opera || K.tagName != "TR") {
                        O.top -= K.scrollTop
                    }
                    K = K.offsetParent
                }
            }
        }
        return O
    }

    function n(G, J, I) {
        var G = q(G);
        while (G && G != document.body) {
            if (g(G, J) == I) {
                return true
            }
            G = G.parentNode
        }
        return false
    }

    function w(I, G) {
        var I = q(I);
        while (I && I != document.body) {
            if (I.tagName == G) {
                return true
            }
            I = I.parentNode
        }
        return false
    }
    var l = function(G) {
        function K() {
            var M = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var L = M.length;
            return M.charAt(Math.floor(Math.random() * L))
        }
        var I = G || 8;
        var J = "";
        while (I--) {
            J += K()
        }
        if (l.uniqueIdMap[J]) {
            return l(I)
        } else {
            l.uniqueIdMap[J] = 1;
            return J
        }
    };
    l.uniqueIdMap = {};
    var k = function() {
        var J = false,
            L = false,
            K = [];

        function G() {
            if (!J) {
                J = true;
                for (var N = 0, M = K.length; N < M; N++) {
                    K[N]()
                }
            }
        }

        function I() {
            if (L) {
                return
            }
            L = true;
            var O = document,
                M = window;
            if (O.addEventListener && !z) {
                O.addEventListener("DOMContentLoaded", z ? function() {
                    if (J) {
                        return
                    }
                    for (var P = 0; P < O.styleSheets.length; P++) {
                        if (O.styleSheets[P].disabled) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                    }
                    G()
                } : G, false)
            } else {
                if (t && M == top) {
                    (function() {
                        if (J) {
                            return
                        }
                        try {
                            O.documentElement.doScroll("left")
                        } catch (P) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        G()
                    })()
                } else {
                    if (m) {
                        var N;
                        (function() {
                            if (J) {
                                return
                            }
                            if (O.readyState != "loaded" && O.readyState != "complete") {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            if (N === undefined) {
                                N = 0;
                                var S = O.getElementsByTagName("style");
                                var Q = O.getElementsByTagName("link");
                                if (S) {
                                    N += S.length
                                }
                                if (Q) {
                                    for (var R = 0, P = Q.length; R < P; R++) {
                                        if (Q[R].getAttribute("rel") == "stylesheet") {
                                            N++
                                        }
                                    }
                                }
                            }
                            if (O.styleSheets.length != N) {
                                setTimeout(arguments.callee, 0);
                                return
                            }
                            G()
                        })()
                    }
                }
            }
            M.attachEvent ? M.attachEvent("onload", G) : M.addEventListener("load", G, false)
        }
        return function(M) {
            I();
            J ? M() : (K[K.length] = M)
        }
    }();

    function h(J, I) {
        var G = typeof J === "string" ? document.getElementById(J) : J;
        if (t) {
            G.innerHTML = I;
            return G
        } else {
            var K = G.cloneNode(false);
            K.innerHTML = I;
            G.parentNode.replaceChild(K, G);
            return K
        }
    }
    var F = function() {};
    F.hex = function(L) {
        var J = "0123456789abcdef";
        var I = parseInt(L);
        if (I == 0 || isNaN(L)) {
            return "00"
        }
        I = Math.round(Math.min(Math.max(0, I), 255));
        var G = I % 16;
        var K = (I - G) / 16;
        return J.charAt(K) + J.charAt(G)
    };
    F.convertToHex = function(G) {
        return F.hex(G[0]) + F.hex(G[1]) + F.hex(G[2])
    };
    F.rgbToHex = function(G) {
        return "#" + F.convertToHex(G.match(/\d+/gi))
    };
    F.trim = function(G) {
        return (G.charAt(0) == "#") ? G.substring(1, 7) : G
    };
    F.convertToRGB = function(J) {
        var I = F.trim(J);
        var G = [];
        G[0] = parseInt(I.substring(0, 2), 16);
        G[1] = parseInt(I.substring(2, 4), 16);
        G[2] = parseInt(I.substring(4, 6), 16);
        return G
    };
    F.getHexByAlpha = function(K, I, J) {
        var M = F.convertToRGB(K);
        var G = F.convertToRGB(I);
        var L = [];
        L[0] = M[0] * J + (1 - J) * G[0];
        L[1] = M[1] * J + (1 - J) * G[1];
        L[2] = M[2] * J + (1 - J) * G[2];
        return F.convertToHex(L)
    };
    var E = {
        flashUrl: "https://tongji.baidu.com/hm-web/flash/sender.swf",
        webroot: "https://tongji.baidu.com/hm-web",
        flashCallBack: "HM_callback" + l(8),
        flashId: "TrackerSenderFlash" + l(8),
        flashContainer: "TrackerSenderFlashContent" + l(8),
        flashStyle: "position:absolute; width:1px; height:1px; top:0; left:0; z-index:200000;",
        maxLinkNum: 1000,
        conFirmTip: "视窗大小进行了改变，是否重新绘制链接点击图?\n 注意：由于数据量较大，需要较长耗时。"
    };
    var u = function(W) {
        function ak(I, G) {
            return (I << G) | (I >>> (32 - G))
        }

        function aj(aB, I) {
            var aD, G, aA, aC, az;
            aA = (aB & 2147483648);
            aC = (I & 2147483648);
            aD = (aB & 1073741824);
            G = (I & 1073741824);
            az = (aB & 1073741823) + (I & 1073741823);
            if (aD & G) {
                return (az ^ 2147483648 ^ aA ^ aC)
            }
            if (aD | G) {
                if (az & 1073741824) {
                    return (az ^ 3221225472 ^ aA ^ aC)
                } else {
                    return (az ^ 1073741824 ^ aA ^ aC)
                }
            } else {
                return (az ^ aA ^ aC)
            }
        }

        function V(G, az, I) {
            return (G & az) | ((~G) & I)
        }

        function U(G, az, I) {
            return (G & I) | (az & (~I))
        }

        function T(G, az, I) {
            return (G ^ az ^ I)
        }

        function R(G, az, I) {
            return (az ^ (G | (~I)))
        }

        function Y(az, I, aD, aC, G, aA, aB) {
            az = aj(az, aj(aj(V(I, aD, aC), G), aB));
            return aj(ak(az, aA), I)
        }

        function K(az, I, aD, aC, G, aA, aB) {
            az = aj(az, aj(aj(U(I, aD, aC), G), aB));
            return aj(ak(az, aA), I)
        }

        function ag(az, I, aD, aC, G, aA, aB) {
            az = aj(az, aj(aj(T(I, aD, aC), G), aB));
            return aj(ak(az, aA), I)
        }

        function X(az, I, aD, aC, G, aA, aB) {
            az = aj(az, aj(aj(R(I, aD, aC), G), aB));
            return aj(ak(az, aA), I)
        }

        function J(aB) {
            var aE;
            var aA = aB.length;
            var az = aA + 8;
            var I = (az - (az % 64)) / 64;
            var aD = (I + 1) * 16;
            var aF = Array(aD - 1);
            var G = 0;
            var aC = 0;
            while (aC < aA) {
                aE = (aC - (aC % 4)) / 4;
                G = (aC % 4) * 8;
                aF[aE] = (aF[aE] | (aB.charCodeAt(aC) << G));
                aC++
            }
            aE = (aC - (aC % 4)) / 4;
            G = (aC % 4) * 8;
            aF[aE] = aF[aE] | (128 << G);
            aF[aD - 2] = aA << 3;
            aF[aD - 1] = aA >>> 29;
            return aF
        }

        function ae(az) {
            var I = "",
                aA = "",
                aB, G;
            for (G = 0; G <= 3; G++) {
                aB = (az >>> (G * 8)) & 255;
                aA = "0" + aB.toString(16);
                I = I + aA.substr(aA.length - 2, 2)
            }
            return I
        }

        function ai(I) {
            I = I.replace(/\r\n/g, "\n");
            var G = "";
            for (var aA = 0; aA < I.length; aA++) {
                var az = I.charCodeAt(aA);
                if (az < 128) {
                    G += String.fromCharCode(az)
                } else {
                    if ((az > 127) && (az < 2048)) {
                        G += String.fromCharCode((az >> 6) | 192);
                        G += String.fromCharCode((az & 63) | 128)
                    } else {
                        G += String.fromCharCode((az >> 12) | 224);
                        G += String.fromCharCode(((az >> 6) & 63) | 128);
                        G += String.fromCharCode((az & 63) | 128)
                    }
                }
            }
            return G
        }
        var af = Array();
        var ao, M, ah, Z, L, ay, ax, aw, av;
        var ar = 7,
            ap = 12,
            am = 17,
            al = 22;
        var ad = 5,
            ac = 9,
            ab = 14,
            aa = 20;
        var S = 4,
            Q = 11,
            P = 16,
            O = 23;
        var au = 6,
            at = 10,
            aq = 15,
            an = 21;
        W = ai(W);
        af = J(W);
        ay = 1732584193;
        ax = 4023233417;
        aw = 2562383102;
        av = 271733878;
        for (ao = 0; ao < af.length; ao += 16) {
            M = ay;
            ah = ax;
            Z = aw;
            L = av;
            ay = Y(ay, ax, aw, av, af[ao + 0], ar, 3614090360);
            av = Y(av, ay, ax, aw, af[ao + 1], ap, 3905402710);
            aw = Y(aw, av, ay, ax, af[ao + 2], am, 606105819);
            ax = Y(ax, aw, av, ay, af[ao + 3], al, 3250441966);
            ay = Y(ay, ax, aw, av, af[ao + 4], ar, 4118548399);
            av = Y(av, ay, ax, aw, af[ao + 5], ap, 1200080426);
            aw = Y(aw, av, ay, ax, af[ao + 6], am, 2821735955);
            ax = Y(ax, aw, av, ay, af[ao + 7], al, 4249261313);
            ay = Y(ay, ax, aw, av, af[ao + 8], ar, 1770035416);
            av = Y(av, ay, ax, aw, af[ao + 9], ap, 2336552879);
            aw = Y(aw, av, ay, ax, af[ao + 10], am, 4294925233);
            ax = Y(ax, aw, av, ay, af[ao + 11], al, 2304563134);
            ay = Y(ay, ax, aw, av, af[ao + 12], ar, 1804603682);
            av = Y(av, ay, ax, aw, af[ao + 13], ap, 4254626195);
            aw = Y(aw, av, ay, ax, af[ao + 14], am, 2792965006);
            ax = Y(ax, aw, av, ay, af[ao + 15], al, 1236535329);
            ay = K(ay, ax, aw, av, af[ao + 1], ad, 4129170786);
            av = K(av, ay, ax, aw, af[ao + 6], ac, 3225465664);
            aw = K(aw, av, ay, ax, af[ao + 11], ab, 643717713);
            ax = K(ax, aw, av, ay, af[ao + 0], aa, 3921069994);
            ay = K(ay, ax, aw, av, af[ao + 5], ad, 3593408605);
            av = K(av, ay, ax, aw, af[ao + 10], ac, 38016083);
            aw = K(aw, av, ay, ax, af[ao + 15], ab, 3634488961);
            ax = K(ax, aw, av, ay, af[ao + 4], aa, 3889429448);
            ay = K(ay, ax, aw, av, af[ao + 9], ad, 568446438);
            av = K(av, ay, ax, aw, af[ao + 14], ac, 3275163606);
            aw = K(aw, av, ay, ax, af[ao + 3], ab, 4107603335);
            ax = K(ax, aw, av, ay, af[ao + 8], aa, 1163531501);
            ay = K(ay, ax, aw, av, af[ao + 13], ad, 2850285829);
            av = K(av, ay, ax, aw, af[ao + 2], ac, 4243563512);
            aw = K(aw, av, ay, ax, af[ao + 7], ab, 1735328473);
            ax = K(ax, aw, av, ay, af[ao + 12], aa, 2368359562);
            ay = ag(ay, ax, aw, av, af[ao + 5], S, 4294588738);
            av = ag(av, ay, ax, aw, af[ao + 8], Q, 2272392833);
            aw = ag(aw, av, ay, ax, af[ao + 11], P, 1839030562);
            ax = ag(ax, aw, av, ay, af[ao + 14], O, 4259657740);
            ay = ag(ay, ax, aw, av, af[ao + 1], S, 2763975236);
            av = ag(av, ay, ax, aw, af[ao + 4], Q, 1272893353);
            aw = ag(aw, av, ay, ax, af[ao + 7], P, 4139469664);
            ax = ag(ax, aw, av, ay, af[ao + 10], O, 3200236656);
            ay = ag(ay, ax, aw, av, af[ao + 13], S, 681279174);
            av = ag(av, ay, ax, aw, af[ao + 0], Q, 3936430074);
            aw = ag(aw, av, ay, ax, af[ao + 3], P, 3572445317);
            ax = ag(ax, aw, av, ay, af[ao + 6], O, 76029189);
            ay = ag(ay, ax, aw, av, af[ao + 9], S, 3654602809);
            av = ag(av, ay, ax, aw, af[ao + 12], Q, 3873151461);
            aw = ag(aw, av, ay, ax, af[ao + 15], P, 530742520);
            ax = ag(ax, aw, av, ay, af[ao + 2], O, 3299628645);
            ay = X(ay, ax, aw, av, af[ao + 0], au, 4096336452);
            av = X(av, ay, ax, aw, af[ao + 7], at, 1126891415);
            aw = X(aw, av, ay, ax, af[ao + 14], aq, 2878612391);
            ax = X(ax, aw, av, ay, af[ao + 5], an, 4237533241);
            ay = X(ay, ax, aw, av, af[ao + 12], au, 1700485571);
            av = X(av, ay, ax, aw, af[ao + 3], at, 2399980690);
            aw = X(aw, av, ay, ax, af[ao + 10], aq, 4293915773);
            ax = X(ax, aw, av, ay, af[ao + 1], an, 2240044497);
            ay = X(ay, ax, aw, av, af[ao + 8], au, 1873313359);
            av = X(av, ay, ax, aw, af[ao + 15], at, 4264355552);
            aw = X(aw, av, ay, ax, af[ao + 6], aq, 2734768916);
            ax = X(ax, aw, av, ay, af[ao + 13], an, 1309151649);
            ay = X(ay, ax, aw, av, af[ao + 4], au, 4149444226);
            av = X(av, ay, ax, aw, af[ao + 11], at, 3174756917);
            aw = X(aw, av, ay, ax, af[ao + 2], aq, 718787259);
            ax = X(ax, aw, av, ay, af[ao + 9], an, 3951481745);
            ay = aj(ay, M);
            ax = aj(ax, ah);
            aw = aj(aw, Z);
            av = aj(av, L)
        }
        var N = ae(ay) + ae(ax) + ae(aw) + ae(av);
        return N.toLowerCase()
    };

    function e() {
        this.aList = {};
        this.normalStyle = "position:absolute;overflow:hidden;filter:alpha(opacity=90);opacity:0.9;padding:1px 5px; cursor:pointer; font-size:12px; color:#fff;";
        this.totalPv = 1000;
        this.innerDiv = "HM_INNERHTML_CONTAINER";
        this.aPrefix = "HM_LINK_PREFIX";
        this.divPrefix = "HM_DIV_PREFIX";
        this.zIndex = 1000;
        this.tipMapId = "HM_MapId";
        this.topColor = "#294f8a";
        this.bottomColor = "#a3c9ff";
        this.totalNum = 100000;
        this.maxNum = 10;
        this.flight = 10;
        this.zIndex = 2147483001;
        this.oldIndex = 1;
        this.rankWeight;
        this.clickCallback;
        this.sendHistory;
        this.data
    }
    e.prototype = {
        init: function(I) {
            if (I) {
                var G = I.data;
                this.totalNum = I.total;
                this.data = G;
                this.creatWeight(G);
                if (q(this.innerDiv)) {
                    q(this.innerDiv).innerHTML = ""
                } else {
                    this.initDom();
                    this.creatContainer()
                }
                this.innerHTMLLayer(G);
                this.bindEvent()
            }
        },
        getHistory: function(G) {
            var J = [];
            if (G.data) {
                var K = G.data;
                for (var I = 0, L = K.length; I < L; I++) {
                    if (!this.aList[K[I][0]]) {
                        J.push(K[I])
                    }
                }
            }
            this.sendHistory.call(this, J)
        },
        highlight: function(N) {
            if (N && N.url && N.color) {
                var L = this.aList[N.url];
                for (var K = 0, G = L.length; K < G; K++) {
                    var M = L[K];
                    var O = q(M);
                    var J = O.getAttribute(this.tipMapId);
                    if (J) {
                        var I = q(J);
                        I.style.backgroundColor = N.color
                    }
                }
            } else {
                alert("die")
            }
        },
        clearhighlight: function(L) {
            if (L && L.url) {
                var M = this.aList[L.url];
                for (var K = 0, J = M.length; K < J; K++) {
                    var I = M[K];
                    var N = q(I);
                    var P = N.getAttribute(this.tipMapId);
                    if (P) {
                        var G = q(P);
                        var O = G.getAttribute("HM_BG");
                        G.style.backgroundColor = O
                    }
                }
            } else {
                alert("die")
            }
        },
        initDom: function() {
            var G = document.getElementsByTagName("a");
            for (var K = 0, L = G.length; K < L; K++) {
                var J = G[K];
                J.id = J.id || (this.aPrefix + K);
                var I = J.href.replace(/[\/]$/, "");
                if (this.aList[I]) {
                    this.aList[I].push(J.id)
                } else {
                    this.aList[I] = [J.id]
                }
            }
        },
        resetLayer: function() {
            var M = this.data;
            var J = M.length;
            var Q = (new Date().getTime());
            for (var N = 0; N < J; N++) {
                var O = M[N];
                var P = this.aList[O[0]];
                if (P) {
                    for (var L = 0, K = P.length; L < K; L++) {
                        var I = P[L];
                        var R = q(I);
                        var T = R.getAttribute(this.tipMapId);
                        if (T) {
                            var G = q(T);
                            var S = D(R);
                            G.style.left = S.left + "px";
                            G.style.top = S.top + "px"
                        }
                    }
                }
            }
        },
        innerHTMLLayer: function(N) {
            if (!q(this.innerDiv)) {
                return false
            }
            var I = N.length;
            var Q = [];
            var S = this.zIndex - 1;
            for (var O = 0; O < I; O++) {
                var P = N[O];
                var W = P[0];
                var J = P[1];
                var R = this.aList[W];
                if (R) {
                    for (var M = 0, K = R.length; M < K; M++) {
                        var G = R[M];
                        var T = q(G);
                        var V = this.divPrefix + l(16);
                        T.setAttribute(this.tipMapId, V);
                        var U = D(T);
                        var L = this.getColor(J);
                        Q.push("<div");
                        Q.push(' id="' + V + '"');
                        Q.push(' style="');
                        Q.push(this.normalStyle);
                        Q.push("left:" + U.left + "px;");
                        Q.push("top:" + U.top + "px;");
                        Q.push("z-index:" + Math.floor(S - O) + ";");
                        Q.push("background-color:#" + L + ";");
                        Q.push("width:" + T.offsetWidth + "px;");
                        Q.push("height:" + T.offsetHeight + "px;");
                        Q.push("line-height:" + T.offsetHeight + "px;");
                        Q.push('"');
                        Q.push(" " + this.tipMapId + '="' + G + '"');
                        Q.push(' HM_BG = "#' + L + '"');
                        Q.push(' title = "' + J + "(" + P[2] + ')"');
                        Q.push(">");
                        Q.push(J + "(" + P[2] + ")");
                        Q.push("</div>")
                    }
                }
            }
            h(q(this.innerDiv), Q.join(""))
        },
        bindEvent: function() {
            var G = q(this.innerDiv);
            o(G, "click", this.clickHandle());
            o(G, "onmouseover", this.overHandle());
            o(G, "onmouseout", this.overHandle());
            window.onresize = this.resizeHandle()
        },
        creatContainer: function() {
            var G = document.createElement("DIV");
            G.id = this.innerDiv;
            document.body.appendChild(G)
        },
        resizeHandle: function() {
            var G = this;
            return function() {
                if (G.ResizeTimer) {
                    clearTimeout(this.ResizeTimer)
                }
                G.ResizeTimer = setTimeout(function() {
                    G.resetLayer()
                }, 50)
            }
        },
        overHandle: function() {
            var G = this;
            return function(J) {
                a(J);
                var J = J || window.event;
                var L = J.target || J.srcElement;
                var I = L.getAttribute(G.tipMapId);
                if (I) {
                    var K = J.type.indexOf("over") > -1 ? true : false;
                    if (K) {
                        G.oldIndex = g(L, "z-index");
                        L.style.zIndex = G.zIndex
                    } else {
                        L.style.zIndex = G.oldIndex
                    }
                }
            }
        },
        clickHandle: function() {
            var G = this;
            return function(K) {
                a(K);
                var K = K || window.event;
                var N = K.target || K.srcElement;
                var I = N.getAttribute(G.tipMapId);
                if (I) {
                    var M = q(I);
                    if (G.clickCallback) {
                        var J = {};
                        var L = D(N);
                        J.url = M.href.replace(/[\/]$/, "");
                        J.left = L.left;
                        J.top = L.top;
                        J.width = N.offsetWidth;
                        J.height = N.offsetHeight;
                        G.clickCallback.call(N, J)
                    }
                }
            }
        },
        getColor: function(I) {
            var G = (I / this.maxNum).toFixed(2);
            return F.getHexByAlpha(this.topColor, this.bottomColor, G)
        },
        creatWeight: function(K) {
            var I = 0;
            for (var J = 0, G = K.length; J < G; J++) {
                I = Math.max(I, K[J][1])
            }
            this.maxNum = I
        }
    };
    var f = function() {
        f.linker = new e();
        f.regWindow();
        f.creatFlash();
        f.callFlashLoadedFunction();
        f.interval = 1000
    };
    f.regWindow = function() {
        window[E.flashCallBack] = f.callBack
    };
    f.callBack = function(I) {
        if (I && I.type) {
            var G = I.data;
            switch (I.type) {
                case "highlight":
                    f.linker.highlight(G);
                    break;
                case "clearhighlight":
                    f.linker.clearhighlight(G);
                    break;
                case "drawLink":
                    f.drawLink(G);
                    break;
                case "gethistory":
                    f.linker.getHistory(G);
                    break;
                case "com":
                    clearInterval(f.timer);
                    break
            }
        } else {
            alert("die call")
        }
    };
    f.drawLink = function(G) {
        f.linker.clickCallback = function() {
            f.sendData({
                type: "pop",
                data: arguments[0]
            })
        };
        f.linker.sendHistory = function() {
            f.sendData({
                type: "history",
                data: arguments[0]
            })
        };
        f.linker.init(G)
    };
    f.callFlashLoadedFunction = function() {
        var G = c(E.flashId);
        f.timer = setInterval(function() {
            if (G.sendData) {
                f.sendData({
                    type: "com",
                    data: f.getDoc()
                })
            }
        }, 1000)
    };
    f.getDoc = function() {
        var K = {};
        var J = document;
        var G = J.body;
        var I = J.documentElement;
        K.wh = Math.max(G.clientHeight, I.clientHeight);
        K.ww = Math.max(G.clientWidth, I.clientWidth);
        K.dh = Math.max(Math.max(G.scrollHeight, I.scrollHeight), Math.max(G.offsetHeight, I.offsetHeight), K.wh);
        K.dw = Math.max(Math.max(G.scrollWidth, I.scrollWidth), Math.max(G.offsetWidth, I.offsetWidth), K.ww);
        return K
    };
    f.sendData = function(I) {
        var G = c(E.flashId);
        G.sendData(I)
    };
    f.creatFlash = function() {
        var L = document.location.hash.substring(1);
        var K = encodeURIComponent(d("cla", L));
        var J = encodeURIComponent(d("clb", L));
        var I = H(E.flashId, E.flashUrl + "?" + l(8), "1", "1", "allowdomain=" + document.domain + "&cla=" + K + "&clb=" + J + "&callBack=" + E.flashCallBack);
        var G = q(E.flashContainer);
        if (G) {
            G.innerHTML = I
        } else {
            var M = document.createElement("DIV");
            M.id = E.flashContainer;
            M.style.cssText = E.flashStyle;
            document.body.appendChild(M);
            M.innerHTML = I
        }
    };
    if (document.readyState == "interactive" || document.readyState == "complete") {
        f()
    } else {
        k(f)
    }
})();