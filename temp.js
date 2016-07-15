var car = function(){
  this.names;
  this.colors;
  this.speeds;

  this.break = function(){
    this.speeds--;
  }
  this.setColor(spray){
    this.colors = spray.color
  }
}
function spray(){
  this.color;
}
var myspray = new spray();

myspray.color = "pink"

var obj = new car();

obj.setColor(myspray);
