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
        Endpoint: "Rectangle", //连接点的默认形状
        connector: ["Flowchart", {
            stub: [40, 60],
            gap: 70,
            cornerRadius: 5,
            alwaysRespectStubs: false
        }],
        ConnectionOverlays: [
            ["Arrow", {
                location: 0.8,
                width: 15,
                height: 7,
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
            $(".detail-box").fadeOut("fast");
            showDetailBox(X, Y, newState.attr("id"));
            event.stopPropagation();
        })
        $("#container").append(newState);
        instance.makeSource(newState);
        instance.makeTarget(newState);
        stateId++;
    };

    var showDetailBox = function(X, Y, iden) {
        $(".sidebar").animate({
            "left": "0px"
        })
        $(".detail-title").text(details[iden]["title"]);
        $(".detail-addr").text(details[iden]["addr"]);
        $(".detail-tel").text(details[iden]["tel"]);
        $(".detail-dis").text(details[iden]["dis"]);
        $(".detail-img").attr("src", details[iden]["img"])
    }


    // click events
    $("#container").click(function() {
        $(".detail-box").fadeOut("fast");
    });

    $(".detail-close").click(function() {
        $(".sidebar").animate({
            "left": "-300px"
        })
    });

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

    instance.connect({
      source:$("#1"), 
      target:$("#2")
    });

    console.log($("#1"));

    init();
    console.log("Done.");
});