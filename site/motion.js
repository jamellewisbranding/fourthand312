/* Fourth & 312: flips the Rundown scoreboard once, the first time it scrolls
   into view. Styles live in styles.css under "Motion". If this file never
   loads, the scoreboard simply shows as normal. */
(function () {
  var board = document.querySelector(".scoreboard");
  if (!board) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (!("IntersectionObserver" in window)) return;

  board.classList.add("is-armed");
  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        board.classList.add("is-live");
        io.disconnect();
        return;
      }
    }
  }, { threshold: 0.5 });
  io.observe(board);
})();
