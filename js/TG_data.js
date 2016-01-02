var MAXCOST = 0xFEFEFE,
    FootCost=[
        [0,1,2,3,4,5,6,7,8,9,10,11,12],
        [1,MAXCOST,430,570,MAXCOST,MAXCOST,1300,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST],
        [2,430,MAXCOST,830,670,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST],
        [3,570,830,MAXCOST,1000,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,2500,MAXCOST,MAXCOST],
        [4,MAXCOST,670,1000,MAXCOST,1300,1300,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST],
        [5,MAXCOST,MAXCOST,MAXCOST,1300,MAXCOST,MAXCOST,MAXCOST,1600,1000,970,2100,MAXCOST],
        [6,1300,MAXCOST,MAXCOST,1300,MAXCOST,MAXCOST,1400,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST],
        [7,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,1400,MAXCOST,570,MAXCOST,MAXCOST,MAXCOST,MAXCOST],
        [8,MAXCOST,MAXCOST,MAXCOST,MAXCOST,1600,MAXCOST,570,MAXCOST,1100,MAXCOST,MAXCOST,MAXCOST],
        [9,MAXCOST,MAXCOST,MAXCOST,MAXCOST,1000,MAXCOST,MAXCOST,1100,MAXCOST,MAXCOST,2300,3200],
        [10,MAXCOST,MAXCOST,MAXCOST,2500,970,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,1500,MAXCOST],
        [11,MAXCOST,MAXCOST,MAXCOST,MAXCOST,2100,MAXCOST,MAXCOST,MAXCOST,2300,1500,MAXCOST,1900],
        [12,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,3200,MAXCOST,1900,MAXCOST],
    ],
    DriveCost=[
        [0,1,2,3,4,5,6,7,8,9,10,11,12],
        [1,MAXCOST,430,570,MAXCOST,MAXCOST,1300,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST],
        [2,430,MAXCOST,830,670,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST],
        [3,570,830,MAXCOST,1000,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,2500,MAXCOST,MAXCOST],
        [4,MAXCOST,670,1000,MAXCOST,1300,1300,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST],
        [5,MAXCOST,MAXCOST,MAXCOST,1300,MAXCOST,MAXCOST,MAXCOST,1600,1000,970,2100,MAXCOST],
        [6,1300,MAXCOST,MAXCOST,1300,MAXCOST,MAXCOST,1400,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST],
        [7,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,1400,MAXCOST,570,MAXCOST,MAXCOST,MAXCOST,MAXCOST],
        [8,MAXCOST,MAXCOST,MAXCOST,MAXCOST,1600,MAXCOST,570,MAXCOST,1100,MAXCOST,MAXCOST,MAXCOST],
        [9,MAXCOST,MAXCOST,MAXCOST,MAXCOST,1000,MAXCOST,MAXCOST,1100,MAXCOST,MAXCOST,2300,3200],
        [10,MAXCOST,MAXCOST,MAXCOST,2500,970,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,1500,MAXCOST],
        [11,MAXCOST,MAXCOST,MAXCOST,MAXCOST,2100,MAXCOST,MAXCOST,MAXCOST,2300,1500,MAXCOST,1900],
        [12,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,MAXCOST,3200,MAXCOST,1900,MAXCOST],
    ];

var PointNum = [1,2,3,4,5,6,7,8,9,10,11,12],
    FootSpeed = 3,
    DirveSpeed = 20,
    transportType = "Foot"; // "Drive"

var getCost = function(el1, el2) {
    if (transportType==="Foot") {
        return FootCost[el1][el2];
    } else {
        return DriveCost[el1][el2];
    }
}

var getCostTime = function(len) {
    if (transportType==="Foot") {
        return len/FootSpeed;
    } else {
        return len/DirveSpeed;
    }
}

var dijkstra = function(begin, end) {
    begin = Number(begin.substring(1));
    end = Number(end.substring(1));
    var path = [],
        dist = [],
        visited = [];
    // init
    $(PointNum).each(function(n, val) {
        dist[val] = getCost(begin, val);
        visited[val] = false;
        if (dist[val]!=MAXCOST) {
            path[val] = begin;
        } else {
            path[val] = 0;
        }
    });
    dist[begin] = 0;
    visited[begin] = false;

    for (var i = 1; i < PointNum.length; i++) {
        var minn = begin,
            mindist = MAXCOST;
        $(PointNum).each(function(n, val) {
            if(!(visited[val]) && dist[val] < mindist) {
                mindist = dist[val];
                minn = val;
            }
        });
        visited[minn] = true;
        $(PointNum).each(function(n, val) {
            if (!(visited[val]) && getCost(minn, val) < MAXCOST) {
                if (dist[minn] + getCost(minn, val) < dist[val]) {
                    dist[val] = dist[minn] + getCost(minn, val);
                    path[val] = minn;
                }
            }
        });
    };
    return path;
    // 
};

var getPath = function(begin, end) {
    var rawPath = dijkstra(begin,end);
    begin = Number(begin.substring(1));
    end = Number(end.substring(1));
    var path = [end],
        total = 0,
        now = end;
    while(now != begin) {
        path.push(rawPath[now]);
        total += getCost(rawPath[now],now);
        now = rawPath[now];
    }
    path.reverse();
    return path;
}

// getPath("p1", "p12");



var details = {
    "p1":
    {
        "title": "中山大学",
        "addr": "广州市番禺区大学城",
        "tel": "020-84112828",
        "dis": "中山大学东校区位于广州大学城的东北端，亦称中山大学大学城校区，和广东外语外贸大学同属第一组团，靠近广州地铁四号线大学北站。东校区地理位置优越，南邻中心公园，东邻城市绿化带，总占地面积1.13平方公里，其中教学区87.5万平方米，生活区25.5万平方米。一期工程共有29栋建筑，包括教学区12幢建筑，建筑面积达32万平方米，共有课室111间，座位14454个；生活区共17幢学生宿舍，建筑面积共11万平方米，可容纳 12456名学生入住。",
        "img": "img/1.jpg",
    },
    "p2":
    {
        "title": "GOGO新天地商业区",
        "addr": "广州市番禺区大学城中二横路",
        "tel": "020-39330222",
        "dis": "GOGO新天地位于中山大学旁，总建筑面积有60000㎡。开发经营面积约为50000㎡，由4层构建而成进驻品牌：麦当劳、7-11便利店、万宁、校园超市“生活动力”、盈点KTV、盈点酒店、金逸珠江影城大学城店、J-hotel等。贝岗村，广东省广州市番贝岗村，广东省广州市番禺区小谷围街下辖村，与广州大学城中山大学、广东外语外贸大学相邻。大学城建设后，部分村民仍留原地居住；部分受拆迁影响的村民则搬往谷围新村安置。",
        "img": "img/2.jpg",
    },
    "p3":
    {
        "title": "大学城北地铁站",
        "addr": "番禺区广州大学城综合商业北区",
        "tel": "020-64782369",
        "dis": "大学城北站是一个在营运后更改中文名字的地铁车站，它在2006年5月由“北亭站”更名为“大学城北站”。大学城北站位于广州市小谷围岛大学城北边，车站附近有中山大学、广东外语外贸大学、星海音乐学院、华南师范大学，周边有小山丘。车站北面为大学城的北部商业区，是大学城休闲购物的好地方。车站整体主色调为绿色，代表着青春、活跃和浓郁的书香气息及文化氛围。",
        "img": "img/3.jpg",
    },
    "p4":
    {
        "title": "大学城体育场",
        "addr": "广州市番禺区大学城内环东路208号",
        "tel": "020-38014789",
        "dis": "大学城中心区体育场位于大学城中心湖畔,中心生态公园的北端，北临内环路，南向中心湖，三面环山，屋顶采用“绿白”组合，如同一片白云在山间和水上浮动。中心区体育场包括四百米的标准足球场和四百米跑道的田径训练场，其中体育场占地9.7万平方米，计划投资4亿元，可容纳4万观众，规模仅次于天河体育中心和奥林匹克体育中心，建成后将成为广州第三大体育场，可用于大型活动开幕式、闭幕式、国际级田径、足球比赛主赛场。",
        "img": "img/4.jpg",
    },
    "p5":
    {
        "title": "中心湖公园 ",
        "addr": "广州市番禺区大学城内环西路55号",
        "tel": "020-39318101",
        "dis": "广东省中医院大学城医院是广东省中医院的分院，位于风景如画的广州市番禺区小谷围岛，中心湖轮廓狭长扩展，东西长，南北窄。东面，是大学城轮滑中心，南面，是广工生活区和中心医院，北面是大学城中心体育馆。湖周边植被浓密，湖面风景优美，更有古屋小岛相映照，这些景色使其在建筑群落密集的城市里，成了一个不可多得的放松身心的地方。",
        "img": "img/5.jpg",
    },
    "p6":
    {
        "title": "广药广中医",
        "addr": "广州市番禺区大学城外环东路280号/232号",
        "tel": "020-64782369/39358233",
        "dis": "广东药学院大学城校区座落在广州市番禺区广州大学城，是学校的主校区。广州中医药大学办学基础为创立于1924年的广东中医药专门学校，学校的前身广州中医学院是1956年经国务院批准成立的新中国首批4所高等中医药院校之一。",
        "img": "img/6.jpg",
    },
    "p7":
    {
        "title": "华南理工大学",
        "addr": "广州市番禺区外环东路382华南理工大学大学城校区",
        "tel": "020-39380031",
        "dis": "华南理工大学大学城校区位于广州大学城的东南部，占地面积1667亩，规划建筑面积65万平方米。大学城校区自2003年10月正式筹建以来，经过紧张而高效的建设，一期、二期工程已顺利完工。目前，大学城校区有来自各地的约一万六千名学子入驻学习生活。",
        "img": "img/7.jpg",
    },
    "p8":
    {
        "title": "大学城南地铁站",
        "addr": "番禺区广州大学城南",
        "tel": "020-64782365",
        "dis": "大学城南站是一个在营运后更改中文名字的地铁车站，它在2006年5月由“南亭站（Nanting Station）”更名为“大学城南站（Higher Education Mega Center South Station）”。大学城南站位于小谷围岛上，大学城中环路与岛内中轴线内八号路处的十字路口下。邻近中国电信大楼、综合商业南区等。车站色彩为柠檬黄色，代表了青春活力，未来将会是广州地铁四号线和广州地铁七号线的换乘站。",
        "img": "img/8.jpg",
    },
    "p9":
    {
        "title": "广东工业大学",
        "addr": "广州市大学城外环西路100号广工教学1-2号楼",
        "tel": "020-39322320",
        "dis": "广东工业大学大学城校园，位于广州市番禺区小谷围街广州大学城外环西路100号，占地面积2394.33亩， 设于大学城校园的学院：机电工程学院、自动化学院、轻工化工学院、信息工程学院、土木与交通工程学院、计算机学院、材料与能源学院、环境科学与工程学院、外国语学院、物理与光电工程学院，以及，创新创业学院。",
        "img": "img/9.jpg",
    },
    "p10":
    {
        "title": "华南师范大学",
        "addr": "广东省广州市番禺区广州大学城外环西路378号 ",
        "tel": "020-39312245",
        "dis": "华南师大大学城校区占地面积1500亩，总建筑面积57.6万平方米，坐落在广东省广州市番禺区小谷围岛内。华南师大大学城校区从2003年初开始酝酿、筹备，在广东省委省政府和社会各界的大力支持下，经过全校上下的艰苦奋斗，仅用短短一年的时间，于2004年金秋之际，伴随着首批17个院系4071名同学的迁入，华南师大大学城校区正式启用，华南师大的发展史从此揭开了新的篇章。",
        "img": "img/10.jpg",
    },
    "p11":
    {
        "title": "广大及广大商业区",
        "addr": "广州市番禺区大学城外环西路230号",
        "tel": "020-35679231",
        "dis": "位于广州市番禺区大学城外环西路230号，建有功能齐全、设施先进的教学楼、实验楼、演艺中心、体育馆、图书馆、网络中心和学生公寓。图书馆拥有藏书274.2万册，数字资源量达30230GB。校园网络系统完善，拥有49000个网络信息点，全面覆盖了教学区、办公区和生活区，数字校园建设初具规模。学校教学科研仪器设备总值达5.82亿元。",
        "img": "img/11.jpg",
    },
    "p12":
    {
        "title": "广东科学中心",
        "addr": "广东省广州市番禺区大学城西六路168号",
        "tel": "020-36192369",
        "dis": "广东科学中心位于小谷围岛西端，占地面积45万平方米，建筑面积13.75万平方米，馆内设有儿童天地、实验与发现、数码世界、交通世界、绿色家园、飞天之梦、人与健康、感知与思维8个常设主题展区；三维巨幕、四维、球幕、虚拟航行4座科技影院；数字家庭体验馆、开放实验室和多个临时主题展区。其中三维巨幕影院是亚洲最大的IMAX电影院。",
        "img": "img/12.jpg",
    },
};