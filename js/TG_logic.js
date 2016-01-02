jsPlumb.ready(function(){
    var instance = window.jsp = jsPlumb.getInstance();

    instance.importDefaults({
        DragOptions: {
            cursor: 'crosshair',
            zIndex: 2000
        },
        PaintStyle: {
            strokeStyle: '#110B11'
        }, //元素的默认颜色
        EndpointStyle: {
            width: 20,
            height: 16,
            strokeStyle: '#110B11'
        }, //连接点的默认颜色
        connector: ["Straight", {
            stub: [40, 60],
            gap: 10,
            cornerRadius: 5
        }],
        Container : "container",
    });

    // basic UI
    var stateId = 1;
    var CreatePoint = function(X, Y){
        var pat = $('<span>').addClass("glyphicon glyphicon-tower");
        var newState = $('<div>').attr('id', 'p'+stateId).addClass('item');
        newState.append(pat);
        newState.css({
            top : Y+"px",
            left : X+"px"
        })
        newState.click(function(event) {
            event.stopPropagation();
            $(".detail-box").fadeOut("fast");
            showSidebar(newState.attr("id"));
            $(".active").removeClass("active");
            $(this).addClass("active");
        })
        newState.hide();
        $("#container").append(newState);
        newState.fadeIn();
        stateId++;
    };

    var showSidebar = function(iden) {
        $(".sidebar").animate({
            "left": "-300px"
        },"fast",function(){
            $(".detail-title").text(details[iden]["title"]);
            $(".detail-addr").text(details[iden]["addr"]);
            $(".detail-tel").text(details[iden]["tel"]);
            $(".detail-dis").text(details[iden]["dis"]);
            $(".detail-img").attr("src", details[iden]["img"]);
        });
        $(".sidebar").animate({
            "left": "0px"
        },"600","easeOutBounce");
        
    }


    var MyConnect = function(el1, el2, len) {
        el1 = "p"+el1;
        el2 = "p"+el2;
        var common = {
            endpoint: "Blank",
            connector: ["Bezier"],
            anchor: "AutoDefault",
            overlays:[
                [ "Arrow", {
                    location: 1,
                    id: "arrow",
                    length: 14,
                    foldback: 0.8
                } ],
                [ "Label", { label: len, id: "label", cssClass: "aLabel" }]
            ]
        };
        instance.connect({source: el1, target: el2}, common);
        $("#"+el1).addClass("path");
        $("#"+el2).addClass("path");
    };

    // click events
    $("#container").click(function() {
        $(".detail-box").fadeOut("fast");
        $(".active").removeClass("active");
    });

    $(".detail-close").click(function() {
        $(".sidebar").animate({
            "left": "-300px"
        },"400","easeInBack")
    });

    $("#set-beg").click(function(event){
        $(".begin").removeClass("begin");
        $(".active").removeClass("end");
        $(".active").addClass("begin");
        checkAndDraw();
    });

    $("#set-end").click(function(event){
        $(".end").removeClass("end");
        $(".active").removeClass("begin");
        $(".active").addClass("end");
        checkAndDraw();
    });

    $("#fix-btn").click(function(event) {
        event.stopPropagation();
        showProgress();
    });
    
    $("#port-btn").click(function(event) {
        event.stopPropagation();
        showItems(0, $(".item"));
    });

    $("#rebuild-btn").click(function(event) {
        event.stopPropagation();
        rebuildAll(100);
    });

    $("#trans-btn").click(function(event) {
        if (transportType==="Foot") {
            transportType = "Drive";
            $("#trans-btn").text("我要走路");
        } else {
            transportType = "Foot";
            $("#trans-btn").text("我要开车");
        }
    });

    // check if begin and end points both exit
    var checkAndDraw = function() {
        var begin = $(".begin").attr("id"),
            end = $(".end").attr("id");
        $(".path").removeClass("path");
        instance.detachEveryConnection();
        if (begin && end) {
            drawPath(begin, end);
        }
    };

    // auto fix background
    var autoFix = function(){
        var w = $(window),
            scale = w.height()/1080;
        var t = -(1080*(1-scale)/2),
            l = -(1920*(1-scale)/2)
        $('#container').css({
          '-webkit-transform' : 'scale(' + scale + ')',
          '-moz-transform'    : 'scale(' + scale + ')',
          '-ms-transform'     : 'scale(' + scale + ')',
          '-o-transform'      : 'scale(' + scale + ')',
          'transform'         : 'scale(' + scale + ')',
          top : t+"px",
          left : l+"px"
        });
    };

    var lightPath = function ltp(path, begin, end) {
        var newBegin = $(".begin").attr("id"),
            newEnd = $(".end").attr("id");
        if (begin===newBegin && end===newEnd) {
            var items = [];
            for (var i = 0; i < path.length; i++) {
                items.push("#p"+path[i]);
            };
            showItems(0, items);
            setTimeout(function(){
                ltp(path, begin, end);
            }, path.length*600);
        }
    }

    var drawPath = function(begin, end) {
        var path = getPath(begin, end),
            len = 0,
            totalLen = 0;
        for (var i = 1; i < path.length; i++) {
            len = String(getCost(el1, el2));
            MyConnect(path[i-1], path[i], len);
            totalLen += len;
        };
        lightPath(path, begin, end);
        PathDetail(begin, end, path, totalLen);
    };


    var PathDetail = function(begin, end, path, totalLen) {
        var t = getCostTime(totalLen);
    };

    var init = function(){
        $(".mask").hide();
        CreatePoint(990, 205);  //1
        CreatePoint(1003, 296)  //2
        CreatePoint(859, 358)   //3
        CreatePoint(982, 462)   //4
        CreatePoint(964, 591)   //5
        CreatePoint(1224, 353)  //6
        CreatePoint(1294, 637)  //7
        CreatePoint(1214, 746)  //8
        CreatePoint(993, 838)   //9
        CreatePoint(753, 532)   //10
        CreatePoint(571, 741)   //11
        CreatePoint(333, 806)   //12
    };
    init();

    var realProgress = function rp(i) {
        setTimeout( function() {
            $(".progress-bar").attr("aria-valuenow", i);
            $(".progress-bar").css({"width": i+"%"});
            if (i===10) {
                $("#shell").scrollTop(0);
            } else if (i===30) {
                $(".detail-close").click();
            } else if (i===60) {
                $("#shell").css({
                    "overflow": "hidden"
                })
            } else if (i===90) {
                autoFix();
            }
            if (i<100) {
                rp(i+1);
            } else {
                $(".mask").fadeOut();
            }
        }, 30);
    }

    var showProgress = function() {
        $(".progress-bar").attr("aria-valuenow", 0);
        $(".progress-bar").css({"width": "0%"});
        $(".mask").fadeIn();
        realProgress(1);
    }

    var showItems = function sit(i, items) {
        if(i>=items.length) {
            return;
        } else {
            var now = $(items[i]);
            now.addClass("hover");
            setTimeout(function(){
                now.removeClass("hover");
                sit(i+1, items);
            }, 600);
        }
    };


    //////// BUG exites!!!!!!! ///////////
    var rebuildAll = function ra(i) {
        if(i===100) {
            $(".mask").fadeIn();
            $(".detail-close").click();
            $(".progress-bar").css({"width": "100%"});
            $(".progress-bar").attr("aria-valuenow", 100);
        }
        setTimeout( function() {
            $(".progress-bar").attr("aria-valuenow", i);
            $(".progress-bar").css({"width": i+"%"});
            if (i===90) {
                instance.detachEveryConnection();
            } else if (i===60) {
                $(".begin").removeClass("begin");
                $(".end").removeClass("end");
            } else if (i===30) {
                $(".path").removeClass("path");
                $("#shell").css({
                    "overflow": "hidden"
                })
            } else if (i===10) {
                $('#container').css({
                  '-webkit-transform' : 'scale(1.0)',
                  '-moz-transform'    : 'scale(1.0)',
                  '-ms-transform'     : 'scale(1.0)',
                  '-o-transform'      : 'scale(1.0)',
                  'transform'         : 'scale(1.0)',
                  top : "0px",
                  left : "0px"
                });
                $("#shell").css({
                    "overflow": "scroll"
                });
            }
            if (i) {
                ra(i-1);
            } else {
                $(".mask").fadeOut();
            }
        }, 30);
    };

    console.log("Done.");
});