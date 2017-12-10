let startX;
let curve = 0, direction;
let dragged = false;

let menu = document.getElementsByClassName("menu");

// easing animation function taken from http://kodhus.com/easings/
function easeOutElastic(t, b, c, d) {
  // t is current frame
  // b is beginning state of animation
  // c is change
  // d total animation time or total number of frames

  var s=1.70158;var p=0;var a=c;
  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  if (a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
}




let setPath = (x,curve) => {
  if(curve <= 0){
    direction = 0;
  } else {
    direction = 1;
  }
  let path = `M0,0,L${x},0,a${curve},255 0,0,${direction},0,450 L0,450`;
  return path;

}


  animate = () => {

  // 1000 milleseconds
  let duration = 1000;
  // 60 secs devided by 1000 milleseconds
  // monitors are 60 frames per second
  let frameRate = 60/1000;
  let totalFrames = duration * frameRate;


  let currentFrame = 0;
  let endX = 200;
  let newX, newCurve;
  animatePath = () => {
    currentFrame++;
    newX = easeOutElastic(currentFrame, 60, endX - 60, totalFrames);
    newCurve = easeOutElastic(currentFrame, curve, 0 - curve, totalFrames);
    menu[0].setAttribute('d', setPath(newX,newCurve));
    if (currentFrame > totalFrames){
      return;
    }
    requestAnimationFrame(animatePath);
  };

  animatePath();

 };








  drag = (e) => {



  // store x position of where I clicked
  startX = e.pageX;

  // console.log('start',startX);

   listener = (e) => {

    dragged = true;
    
    // hide info text
    info.style.display = "none";

    console.log('moving');

    let currentX = e.pageX;

    // console.log('moving',currentX);

    // how much did I move mouse from where I clicked?;
    let diff = currentX - startX;

    if( diff < 0 ) {
      diff = 0;
    } else if ( diff > 300) {
      diff = 300;
    }

    curve = diff/2;

    // pass let diff to setPath function
    menu[0].setAttribute('d', setPath(60,curve));

  }

  window.addEventListener('mousemove', listener);

  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove',listener,false);
    // when mouse is up do the animate function

    if (dragged){
      // only do this animation if user has dragged the mouse

      animate();
    }

  })

};


menu[0].addEventListener('mousedown',drag);
