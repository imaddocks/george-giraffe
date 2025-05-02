const giraffe = document.getElementById('giraffe');

giraffe.addEventListener('click', (e) => {
  const rect = giraffe.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const spot = document.createElement('div');
  spot.classList.add('spot');
  spot.style.left = `${x}px`;
  spot.style.top = `${y}px`;

  giraffe.appendChild(spot);
  makeDraggable(spot);
});

function makeDraggable(el) {
  let offsetX, offsetY;

  el.addEventListener('mousedown', (e) => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    el.style.cursor = 'grabbing';

    function moveAt(moveEvent) {
      const rect = giraffe.getBoundingClientRect();
      let x = moveEvent.clientX - rect.left - offsetX;
      let y = moveEvent.clientY - rect.top - offsetY;

      // Bounds
      x = Math.max(0, Math.min(x, giraffe.clientWidth - el.clientWidth));
      y = Math.max(0, Math.min(y, giraffe.clientHeight - el.clientHeight));

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    }

    function stopDrag() {
      document.removeEventListener('mousemove', moveAt);
      document.removeEventListener('mouseup', stopDrag);
      el.style.cursor = 'grab';
    }

    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', stopDrag);
  });
}