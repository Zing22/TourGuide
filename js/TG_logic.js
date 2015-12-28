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

    var CreatePoint = function(){
        var newState = $('<div>').attr('id', 'p0').addClass('item').text("Zero");
        newState.css({
            top : "20px",
            left : "40px"
        })
        $("#container").append(newState);
        instance.draggable(newState, {
            containment: 'parent'
        });
    };

    CreatePoint();

    console.log("Done.");
});