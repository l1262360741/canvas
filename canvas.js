window.onload = function(){
  var yyy = document.getElementById('xxx')
  var ctx = yyy.getContext('2d')

  autoSetCanvas(yyy)
  listenToMouse(yyy)
/*********************/


  function autoSetCanvas(canvas){
    getSize()
    window.onresize = function(){
      getSize()
    }
    function getSize(){
      var pageWidth = document.documentElement.clientWidth
      var pageHeight = document.documentElement.clientHeight
      canvas.width = pageWidth
      canvas.height = pageHeight
    }
  }

  function listenToMouse(canvas){
    var using = false
    var lastPoint = {x:undefined,y:undefined}
    //特性检测
    if(document.body.ontouchstart !== undefined){
      canvas.ontouchstart = function(a){
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        using = true
        if(eraserEnabled){
          ctx.clearRect(x-5,y-5,10,10)
        }else{
          lastPoint = {x:x,y:y}
        }
      }

      //触屏
      canvas.ontouchmove = function(a){
        var x = a.touches[0].clientX
        var y = a.touches[0].clientY
        if(!using){return}

        if(eraserEnabled){
            ctx.clearRect(x-5,y-5,10,10)
        }else{
            var newPoint = {x:x,y:y}
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint = newPoint
        }
      }
      //抬起鼠标
      canvas.ontouchend = function(a){
        using = false
      }
    }else{
      //按下去鼠标
      canvas.onmousedown = function(a){
        var x = a.clientX
        var y = a.clientY
        using = true
        if(eraserEnabled){
          ctx.clearRect(x-5,y-5,10,10)
        }else{
          lastPoint = {x:x,y:y}
        }
      }

      //移动鼠标
      canvas.onmousemove = function(a){
        var x = a.clientX
        var y = a.clientY
        if(!using){return}

        if(eraserEnabled){
            ctx.clearRect(x-5,y-5,10,10)
        }else{
            var newPoint = {x:x,y:y}
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint = newPoint
        }
      }
      //抬起鼠标
      canvas.onmouseup = function(a){
        using = false
      }
    }
  }

  color = {
    'y':'yellow','r':'red','b':'blue'
  }
  //画圈
  function drawCircle(x, y, radius) {
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
  //画线
  function drawLine(x1,y1,x2,y2){
    ctx.beginPath()
    ctx.strokeStyle = 'black'
    ctx.moveTo(x1,y1)
    ctx.lineWidth = 5
    ctx.lineTo(x2,y2)
    ctx.stroke() //路径
    ctx.closePath()
  }
  /*****橡皮擦 ******/
  var eraserEnabled = false
  eraser.onclick = function(){
    eraserEnabled = true
    actions.className = 'actions x'
  }
  brush.onclick = function(){
    eraserEnabled = false
    actions.className = 'actions'
  }
}
