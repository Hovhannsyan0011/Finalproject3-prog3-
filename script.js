
//! Setup function fires automatically

socket = io();


var side = 16;
function setup() {


    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let gishatichCountElement = document.getElementById('gishatichCount');
    let tangCountElement = document.getElementById('tangCount');
    let arjCountElement = document.getElementById('arjCount');
    let wheaterclientElement = document.getElementById('wheaterclient')


    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
     
        //! after getting data pass it to matrix variable
        matrix = data.matrix;


        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCount;
        gishatichCountElement.innerText = data.gishatichCount;
        tangCountElement.innerText = data.tangCount;
        arjCountElement.innerText = data.arjCount;
        wheaterclientElement.innerText = data.wheaterclient;
        weather = wheaterclient.data
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');


        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if(weather  == "Winter"){
                        fill("white");
                        rect(j * side, i * side, side, side);
                    }
                    fill("green");
                    rect(j * side, i * side, side, side);
                  
                }
               
                else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('brown');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('purple');
                    rect(j * side, i * side, side, side);
                }
               
                }

            }
        }
    }






function mousePressed() {
    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    var arr = [x,y];
    console.log(arr)
    socket.emit("fire",arr)
    }




