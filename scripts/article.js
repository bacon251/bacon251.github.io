(function () {
  "use strict";

  const slug = new URLSearchParams(location.search).get("slug");
  const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];
  const post = posts.find((item) => item.slug === slug);
  const article = document.querySelector("#article");
  const notFound = document.querySelector("#not-found");

  if (!post) {
    notFound.hidden = false;
    return;
  }

  document.title = `${post.title} · Yanlei Wang`;
  document.querySelector('meta[name="description"]').content = post.summary;
  document.querySelector("#article-title").textContent = post.title;
  document.querySelector("#article-date").textContent = post.date;
  document.querySelector("#article-date").dateTime = post.date;

  const tag = document.querySelector("#article-tag");
  tag.textContent = post.tag;
  tag.href = `./?tag=${encodeURIComponent(post.tag)}`;

  document.querySelector("#article-content").innerHTML = post.content;
  article.hidden = false;
})();
