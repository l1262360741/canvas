window.onload = function(){
  var yyy = document.getElementById('xxx')
  var ctx = yyy.getContext('2d')
  var lineWidth = 5

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
    ctx.fillStyle = 'red'
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
  //画线
  function drawLine(x1,y1,x2,y2){
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineWidth = lineWidth
    ctx.lineTo(x2,y2)
    ctx.stroke() //路径
    ctx.closePath()
  }
  red.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
    ctx.strokeStyle = 'red'
    pen.classList.add('changeRed')
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    pen.classList.remove('changeGreen')
    pen.classList.remove('changeBlue')
  }
  green.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
    ctx.strokeStyle = 'green'
    pen.classList.add('changeGreen')
    pen.classList.remove('changeRed')
    pen.classList.remove('changeBlue')
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
  }
  blue.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
    ctx.strokeStyle = 'blue'
    pen.classList.add('changeBlue')
    pen.classList.remove('changeRed')
    pen.classList.remove('changeGreen')
    blue.classList.add('active')
    green.classList.remove('active')
    red.classList.remove('active')
  }
  /*****橡皮擦 ******/
  var eraserEnabled = false
  eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
    pen.classList.remove('changeBlue')
    pen.classList.remove('changeRed')
    pen.classList.remove('changeGreen')
    blue.classList.remove('active')
    green.classList.remove('active')
    red.classList.remove('active')
  }
  pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
    pen.classList.remove('changeBlue')
    pen.classList.remove('changeRed')
    pen.classList.remove('changeGreen')
    blue.classList.remove('active')
    green.classList.remove('active')
    red.classList.remove('active')
    ctx.strokeStyle = 'red'
  }
  //画笔粗细
  thin.onclick = function(){
    lineWidth = 5
  }
  thick.onclick = function(){
    lineWidth = 10
  }
  clear.onclick = function(){
    ctx.clearRect(0,0,yyy.width,yyy.height)
  }
  //保存
  downLoad.onclick = function(){
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.target = '_blank'
    a.click()
  }
}
