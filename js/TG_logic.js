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
        ConnectionOverlays: [
            ["Arrow", {
                location: 0.5,
                width: 12,
                height: 4,
                foldback: 0.85,
            }]
        ],
        Container : "container",
    });

    // basic UI
    var stateId = 1;
    var CreatePoint = function(X, Y){
        var newState = $('<div>').attr('id', 'p'+stateId).addClass('item').text(stateId);
        newState.css({
            top : Y+"px",
            left : X+"px"
        })
        newState.click(function(event) {
            event.stopPropagation();
            $(".detail-box").fadeOut("fast");
            showDetailBox(X, Y, newState.attr("id"));
            $(".active").removeClass("active");
            $(this).addClass("active");
        })
        newState.hide();
        $("#container").append(newState);
        newState.fadeIn();
        stateId++;
    };

    var showDetailBox = function(X, Y, iden) {
        $(".sidebar").animate({
            "left": "-300px"
        },"fast");
        $(".sidebar").animate({
            "left": "0px"
        },"600","easeOutBounce");
        $(".detail-title").text(details[iden]["title"]);
        $(".detail-addr").text(details[iden]["addr"]);
        $(".detail-tel").text(details[iden]["tel"]);
        $(".detail-dis").text(details[iden]["dis"]);
        $(".detail-img").attr("src", details[iden]["img"])
    }


    var MyConnect = function(el1, el2) {
        el1 = "p"+el1;
        el2 = "p"+el2;
        var common = {
            endpoint: "Blank",
            connector: ["Bezier"],
            anchor: "AutoDefault"
        };
        instance.connect({source: el1, target: el2}, common);
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

    // check if begin and end points both exit
    var checkAndDraw = function() {
        var begin = $(".begin").attr("id"),
            end = $(".end").attr("id");
        if (begin && end) {
            instance.detachEveryConnection();
            drawPath(begin, end);
        }
    };

    // auto fix background
    var autoFix = function(){
        var scale = $(window).width()/1920;
        $('#container').css({
          '-webkit-transform' : 'scale(' + scale + ')',
          '-moz-transform'    : 'scale(' + scale + ')',
          '-ms-transform'     : 'scale(' + scale + ')',
          '-o-transform'      : 'scale(' + scale + ')',
          'transform'         : 'scale(' + scale + ')'
        });
    };

    // autoFix();

    var drawPath = function(begin, end) {
        var path = getPath(begin, end);
        for (var i = 1; i < path.length; i++) {
            MyConnect(path[i-1], path[i]);
        };
    };


    var init = function(){
        CreatePoint(992, 208);
        CreatePoint(1003, 296);
        CreatePoint(859, 358);
        CreatePoint(1007, 513);
        CreatePoint(964, 591);
        CreatePoint(1224, 353);
        CreatePoint(1295, 639);
        CreatePoint(1214, 746);
        CreatePoint(993, 838);
        CreatePoint(753, 532);
        CreatePoint(571, 741);
        CreatePoint(338, 808);
    };

    init();
    console.log("Done.");
});