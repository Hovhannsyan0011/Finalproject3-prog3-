var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

Grass = require("./grass.js");
Xotaker = require("./xotaker.js");
Gishatich = require("./gishatich.js");
Tang = require("./tang.js");
Arj = require("./arj.js");

random = require("./random.js");

grassArr = [];
xotakerArr = [];
GishatichArr = [];
TangArr = [];
arjArr = [];
weather = "Summer";
weatherinit = 1;
grassHashiv = 0;
grasEaterhashiv = 0;
gishatichhashiv = 0;
tanghashiv = 0;
arjhashiv = 0;


var n = 20;
var m = 20;

function fillMatrix(n, m) {
    var mx = []
    for (var i = 0; i < n; i++) {
        mx.push([])
        for (var j = 0; j < m; j++) {
            mx[i].push(Math.round(Math.random() * 
        5.6))
        }
    }
    return mx;
}


matrix = fillMatrix(n, m);
function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
                grassHashiv++;
            }
            else if (matrix[y][x] == 2) {
                var xt = new Xotaker(x, y)
                xotakerArr.push(xt);
                grasEaterhashiv++;

            }
            else if (matrix[y][x] == 3) {
                var gsh = new Gishatich(x, y)
                GishatichArr.push(gsh)
                gishatichhashiv++;
            }
            else if (matrix[y][x] == 4) {
                var mr = new Tang(x, y)
                TangArr.push(mr);
                tanghashiv++;
            }
            else if (matrix[y][x] == 5) {
                var end = new Arj(x, y)
                arjArr.push(end)
                arjhashiv++;
            }
        }
    }
}



creatingObjects();



function getwheather() {

    weatherinit++;
    if (weatherinit == 5) {
        weatherinit = 0;
    }
    else if (weatherinit == 4) {
        weather = "Winter";
    }
    else if (weatherinit == 3) {
        weather = "Autumn";
    }
    else if (weatherinit == 1) {
        weather = "Spring";
    }
    else if (weatherinit == 2) {
        weather = "Summer";
    }


}

// if(weather == "Winter"){
//     for (var i = 0; i < matrix.length; i++){
//         for (var j = 0; j < matrix[i].length; j++){
//             if (matrix[i][j] == 1){
//                 fill("white");
//                 rect(j * side, i * side, side, side);
//             }
//         }
//     }

// }







io.on("connection", function (socket) {
    socket.on("fire", function (arr) {
        console.log(arr)
        var x = arr[0];
        var y = arr[1];

        var directions = [
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1]
        ];
        if (matrix[y][x] == 1) {
            for (var i in grassArr) {
                if (y === grassArr[i].y && x === grassArr[i].x) {
                    grassArr.splice(i, 1);
                    break;
                };
            }
        }
        else if (matrix[y][x] == 2) {
            for (var i in xotakerArr) {
                if (y == xotakerArr[i].y && x == xotakerArr[i].x) {
                    xotakerArr.splice(i, 1);
                    break;
                };
            }
        }
        else if (matrix[y][x] == 3) {
            for (var i in GishatichArr) {
                if (y == GishatichArr[i].y && x == GishatichArr[i].x) {
                    GishatichArr.splice(i, 1);
                    break;
                };
            }
        }
        else if (matrix[y][x] == 4) {
            for (var i in TangArr) {
                if (y == TangArr[i].y && x == TangArr[i].x) {
                    TangArr.splice(i, 1);
                    break;
                };
            }
        }
        else if (matrix[y][x] == 5) {
            for (var i in arjArr) {
                if (y == arjArr[i].y && x == arjArr[i].x) {
                    arjArr.splice(i, 1);
                    break;
                };
            }
        }
        matrix[y][x] = 0;
        for (var i in directions) {
            harevanx = directions[i][0];
            harevany = directions[i][1];

            if (matrix[harevany][harevanx] == 1) {
                for (var i in grassArr) {
                    if (harevany == grassArr[i].y && harevanx == grassArr[i].x) {
                        grassArr.splice(i, 1);
                        break;
                    };
                }
            }
            else if (matrix[harevany][harevanx] == 2) {
                for (var i in xotakerArr) {
                    if (harevany == xotakerArr[i].y && harevanx == xotakerArr[i].x) {
                        xotakerArr.splice(i, 1);
                        break;
                    };
                }
            }
            else if (matrix[harevany][harevanx] == 3) {
                for (var i in GishatichArr) {
                    if (harevany == GishatichArr[i].y && harevanx == GishatichArr[i].x) {
                        GishatichArr.splice(i, 1);
                        break;
                    };
                }
            }
            else if (matrix[harevany][harevanx] == 4) {
                for (var i in TangArr) {
                    if (harevany == TangArr[i].y && harevanx == TangArr[i].x) {
                        TangArr.splice(i, 1);
                        break;
                    };
                }
            }
            else if (matrix[harevany][harevanx] == 5) {
                for (var i in arjArr) {
                    if (harevany == arjArr[i].y && harevanx == arjArr[i].x) {
                        arjArr.splice(i, 5);
                        break;
                    };
                }
            }
            matrix[harevany][harevanx] = 0;
        }
   
        io.sockets.emit("data", sendData);
    });

});






function drawserver() {


    for (var i in grassArr) {
        grassArr[i].mult()
    }


    for (var i in xotakerArr) {
        xotakerArr[i].eat()
        xotakerArr[i].move()
        xotakerArr[i].mult()
        xotakerArr[i].die()
    }
    for (var i in GishatichArr) {
        GishatichArr[i].eat()
        GishatichArr[i].move()
        GishatichArr[i].mult()
        GishatichArr[i].die()
    }
    for (var i in TangArr) {
        TangArr[i].eat()
        TangArr[i].move()
        TangArr[i].mult()
        TangArr[i].die()
    }

    for (var i in arjArr) {
        arjArr[i].eat()
        arjArr[i].move()
        arjArr[i].mult()
        arjArr[i].die()
    }
    sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCount: grasEaterhashiv,
        gishatichCount: gishatichhashiv,
        tangCount: tanghashiv,
        arjCount: arjhashiv,
        wheaterclient: weather

    }

    io.sockets.emit("data", sendData);


}
///write file
var obj = { "info": [] };

function writefile() {
    var fileName = "Statics.json";
    obj.info.push({ "cnvac xoteri qanak ": grassHashiv });
    fs.writeFileSync(fileName, JSON.stringify(obj, null, 3));
}


setInterval(drawserver, 2000);
setInterval(getwheather, 2000);
setInterval(writefile, 6000);




