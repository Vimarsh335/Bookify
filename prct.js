function welcome(){
    console.log("Hello");
}
var id1=setTimeout(welcome,1000);
var id2=setInterval(welcome,1000);
clearTimeout(id1);