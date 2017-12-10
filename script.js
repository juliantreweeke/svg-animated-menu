let startX;

let menu = document.getElementsByClassName("menu");


let setPath = (curve) => {
  return `M0,0,L60,0,a${curve},255 0,0,1,0,450 L0,450`;

}

let animate = (e) => {
  // hide info text
  info.style.display = "none";

  // store x position of where I clicked
  startX = e.pageX;

  // console.log('start',startX);

  let listener = (e) => {
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

    let curve = diff/2;

    // pass let diff to setPath function
    menu[0].setAttribute('d', setPath(curve));

  }

  window.addEventListener('mousemove', listener);

  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove',listener,false);
  })

};



menu[0].addEventListener('mousedown',animate);
