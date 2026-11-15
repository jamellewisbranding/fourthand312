/* Fourth & 312 site script. Everything here is an extra: if this file fails
   to load, the page still reads and works.
   1. Ribbon board: builds the hero ticker from this week's Rundown.
   2. Scoreboard flip: flips the Rundown numbers once when they scroll in.
   3. Facebook: loads the Page's posts only when the visitor gets close.
   4. Instagram: shows the latest posts from a Behold JSON feed, if one is set. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;

  function onNear(el, margin, fn) {
    if (!el) return;
    if (!hasIO) { fn(); return; }
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) { io.disconnect(); fn(); return; }
      }
    }, { rootMargin: margin });
    io.observe(el);
  }

  function text(el) {
    return el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  }

  /* 1. Ribbon board */
  (function ribbon() {
    var board = document.querySelector(".ribbon");
    var track = board && board.querySelector(".ribbon__track");
    if (!track) return;

    var items = [];
    var tiles = document.querySelectorAll(".scoreboard li");
    for (var i = 0; i < tiles.length; i++) {
      var label = text(tiles[i].querySelector(".scoreboard__label"));
      var value = text(tiles[i].querySelector(".scoreboard__value"));
      if (label && value) items.push([label, value]);
    }
    var titles = document.querySelectorAll(".story__title");
    for (var j = 0; j < titles.length; j++) {
      if (text(titles[j])) items.push([text(titles[j]), ""]);
    }
    if (!items.length) return;

    function run() {
      var frag = document.createDocumentFragment();
      items.forEach(function (it) {
        var item = document.createElement("span");
        item.className = "ribbon__item";
        item.appendChild(document.createTextNode(it[0]));
        if (it[1]) {
          var b = document.createElement("b");
          b.textContent = it[1];
          item.appendChild(document.createTextNode(" "));
          item.appendChild(b);
        }
        var sep = document.createElement("span");
        sep.className = "ribbon__sep";
        frag.appendChild(item);
        frag.appendChild(sep);
      });
      return frag;
    }
    // Two copies side by side so the loop is seamless.
    track.appendChild(run());
    track.appendChild(run());
    board.hidden = false;

    // Same reading speed on every screen: about 70 pixels a second.
    var half = track.scrollWidth / 2;
    track.style.setProperty("--ribbon-duration", Math.max(20, Math.round(half / 70)) + "s");

    var toggle = board.querySelector(".ribbon__toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var paused = board.classList.toggle("is-paused");
        toggle.setAttribute("aria-pressed", paused ? "true" : "false");
      });
    }
  })();

  /* 2. Scoreboard flip */
  (function scoreboard() {
    var board = document.querySelector(".scoreboard");
    if (!board || reduceMotion || !hasIO) return;
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

  /* 3. Facebook Page posts (official Page plugin, loaded late to keep the page fast) */
  (function facebook() {
    var box = document.querySelector(".fb[data-page]");
    if (!box) return;
    onNear(box, "600px 0px", function () {
      var width = Math.max(180, Math.min(500, Math.floor(box.clientWidth)));
      var height = window.innerWidth < 820 ? 560 : 640;
      var src = "https://www.facebook.com/plugins/page.php?href=" + encodeURIComponent(box.getAttribute("data-page")) +
        "&tabs=timeline&width=" + width + "&height=" + height +
        "&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false";
      var frame = document.createElement("iframe");
      frame.src = src;
      frame.width = width;
      frame.height = height;
      frame.title = "Fourth & 312 posts on Facebook";
      frame.loading = "lazy";
      frame.setAttribute("scrolling", "no");
      frame.setAttribute("allow", "encrypted-media; web-share");
      box.appendChild(frame);
      box.classList.add("is-loaded");
    });
  })();

  /* 4. Instagram posts from a Behold JSON feed (https://behold.so) */
  (function instagram() {
    var wrap = document.querySelector(".ig[data-feed]");
    var url = wrap && wrap.getAttribute("data-feed");
    if (!url || !window.fetch) return; // no feed yet: the Instagram card stays
    var grid = wrap.querySelector(".ig__grid");
    var fallback = wrap.querySelector(".ig__fallback");

    onNear(wrap, "600px 0px", function () {
      fetch(url).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      }).then(function (data) {
        var posts = (data && data.posts) || [];
        posts.slice(0, 6).forEach(function (p) {
          var size = p.sizes && (p.sizes.medium || p.sizes.small);
          var img = (size && size.mediaUrl) || p.thumbnailUrl || p.mediaUrl;
          if (!img || !p.permalink) return;
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = p.permalink;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          var pic = document.createElement("img");
          pic.src = img;
          pic.alt = (p.prunedCaption || p.caption || "Instagram post").slice(0, 140);
          pic.loading = "lazy";
          pic.decoding = "async";
          a.appendChild(pic);
          if (p.mediaType === "VIDEO") a.classList.add("is-video");
          li.appendChild(a);
          grid.appendChild(li);
        });
        if (grid.children.length) {
          grid.hidden = false;
          if (fallback) fallback.classList.add("ig__fallback--small");
        }
      }).catch(function () { /* keep the Instagram card */ });
    });
  })();
})();
