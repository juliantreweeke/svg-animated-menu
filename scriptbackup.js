

let menu = document.getElementsByClassName("menu");


let setPath = (curve) => {
  return `M0,0,L60,0,a${curve},255 0,0,1,0,450 L0,450`;
  
}

let animate = (e) => {
  
  
  // store x position of where I clicked
  let startX = e.pageX;
  // console.log('start',startX);
  
  window.addEventListener('mousemove', (e) => {
    let currentX = e.pageX;
    // console.log('moving',currentX);
    
    // how much did I move mouse from where I clicked?;
    let diff = currentX - startX;
    
    if( diff < 0 ) {
      diff = 0;
    } else if ( diff > 300) {
      diff = 300;
    }
    
    let curve = diff/2;
    
    // pass let diff to setPath function
    menu[0].setAttribute('d', setPath(curve));
    
  })  

  
}

let curve = (startX,e) => {
  
  
  
  
  
  
}









menu[0].addEventListener('mousedown',animate);

document.addEventListener('mouseup', () => {
  console.log('mouseup');
  menu[0].removeEventListener('mousedown',animate);


})






