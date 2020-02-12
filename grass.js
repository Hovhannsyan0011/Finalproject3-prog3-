var LivingCreature =require("./livingcreature.js");
var random = require("./random.js");




module.exports = class Grass extends LivingCreature {
    mult() {
        var empty = random(this.chooseCell(0))
        this.multiply++
        if (empty && this.multiply > 3) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 1
            var newGr = new Grass(newX, newY)
            grassArr.push(newGr);
            grassHashiv++;
        }
    }
}
