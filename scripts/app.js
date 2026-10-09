(function () {
  "use strict";

  const allowedTags = ["jazz", "security", "fuckinggambling", "other"];
  const list = document.querySelector("#post-list");
  const emptyState = document.querySelector("#empty-state");
  const buttons = Array.from(document.querySelectorAll(".filter"));
  const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];

  function safeText(value) {
    const node = document.createElement("span");
    node.textContent = String(value == null ? "" : value);
    return node.innerHTML;
  }

  function render(tag) {
    const visible = posts
      .filter((post) => tag === "all" || post.tag === tag)
      .sort((a, b) => b.date.localeCompare(a.date));

    list.innerHTML = visible.map((post) => `
      <article class="post-item">
        <div>
          <h2 class="post-title">
            <a href="article.html?slug=${encodeURIComponent(post.slug)}">${safeText(post.title)}</a>
          </h2>
          <p class="post-summary">${safeText(post.summary)}</p>
        </div>
        <div class="post-meta">
          <time datetime="${safeText(post.date)}">${safeText(post.date)}</time>
          <span class="tag">${safeText(post.tag)}</span>
        </div>
      </article>
    `).join("");

    emptyState.hidden = visible.length !== 0;
  }

  function select(tag, updateUrl) {
    const selected = allowedTags.includes(tag) ? tag : "all";
    buttons.forEach((button) => {
      const active = button.dataset.tag === selected;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    render(selected);

    if (updateUrl) {
      const url = selected === "all" ? "./" : `?tag=${encodeURIComponent(selected)}`;
      history.replaceState(null, "", url);
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => select(button.dataset.tag, true));
  });

  const initialTag = new URLSearchParams(location.search).get("tag") || "all";
  document.querySelector("#year").textContent = new Date().getFullYear();
  select(initialTag, false);
})();
