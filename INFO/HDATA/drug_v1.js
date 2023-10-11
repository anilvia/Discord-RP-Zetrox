    var isMouseDown,initX,initY,height = draggable_v1.offsetHeight,width = draggable_v1.offsetWidth;

draggable_v1.addEventListener('mousedown', function(e) {
  isMouseDown = true;
  document.body.classList.add('no-select');
  initX = e.offsetX;
  initY = e.offsetY;
})

document.addEventListener('mousemove', function(e) {
  if (isMouseDown) {
    var cx = e.clientX - initX,
        cy = e.clientY - initY;
    if (cx < 0) {
      cx = 0;
    }
    if (cy < 0) {
      cy = 0;
    }
    if (window.innerWidth - e.clientX + initX < width) {
      cx = window.innerWidth - width;
    }
    if (e.clientY > window.innerHeight - height+ initY) {
      cy = window.innerHeight - height;
    }
    draggable_v1.style.left = cx + 'px';
    draggable_v1.style.top = cy + 'px';
  }
})

draggable_v1.addEventListener('mouseup', function() {
  isMouseDown = false;
  document.body.classList.remove('no-select_v1');
})