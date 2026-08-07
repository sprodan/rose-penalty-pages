// iOS/mobile fix: app.js accidentally assigns the scroll-to-top handler to window.top.
window.onclick = null;
const backToTopButton = document.getElementById('top');
if (backToTopButton) {
  backToTopButton.onclick = (event) => {
    event.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}
