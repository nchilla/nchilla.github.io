console.log('hello world');

const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

window.addEventListener('load',function(){
  // updateRefWidth();
})
// window.addEventListener('resize',updateRefWidth);
//
//
// function updateRefWidth(){
//   const ref=document.querySelector('.reference');
//   const w=document.querySelector('.reference').offsetWidth;
//   document.documentElement.style.setProperty('--refwidth', w + 'px');
// }
