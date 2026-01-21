<script>
const track = document.getElementById("track");
const overlay = document.getElementById("overlay");
const page = document.getElementById("page");
const current = document.getElementById("current");
const locks = document.querySelectorAll(".lock");

const currentIndex = Number(current.dataset.index);

const offset =
  window.innerWidth / 2 -
  current.offsetLeft -
  current.offsetWidth / 2;

requestAnimationFrame(() => {
  track.style.transform = `translateX(${offset}px)`;
});

locks.forEach((lock, i) => {
  if (i < currentIndex) {
    setTimeout(() => {
      lock.classList.add("unlocked");
    }, 1400 + i * 300);
  }
});

setTimeout(() => {
  const lockRect = current.getBoundingClientRect();
  const originX = lockRect.left + lockRect.width / 2;
  const originY = lockRect.top + lockRect.height / 2;

  track.style.transformOrigin = `${originX}px ${originY}px`;
  track.classList.add("zoom");
}, 4200);

setTimeout(() => {
}, 5200);

setTimeout(() => {
  overlay.classList.add("fade");
}, 5600);

setTimeout(() => {
  overlay.remove();
  page.classList.add("show");
  document.body.style.overflow = "auto";
}, 6400);
</script>
