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
    var stateId = 0;
    var CreatePoint = function(X, Y){
        var newState = $('<div>').attr('id', 'p'+stateId).addClass('item').text(stateId);
        newState.css({
            top : Y+"%",
            left : X+"%"
        })
        newState.click(function(event) {
            $(".detail-box").fadeOut("fast");
            showDetailBox(X, Y, newState.attr("id"));
            event.stopPropagation();
        })
        $("#container").append(newState);
        stateId++;
    };

    var showDetailBox = function(X, Y, iden) {
        $(".sidebar").animate({
            "left": "0px"
        })
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


    CreatePoint(40, 20);
    CreatePoint(60, 30);
    console.log("Done.");
});