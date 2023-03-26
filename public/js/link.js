const posts = document.querySelectorAll(".blog-post");
posts.forEach((post) => {
    post.querySelector("h2").addEventListener("click", () => {
        document.location.replace(`/forum-post/${post.getAttribute("post")}`);
    });
});

const comments = document.querySelectorAll(".comment");
comments.forEach((comment) => {
    comment.querySelector("h2").addEventListener("click", () => {
        document.location.replace(`/forum-post/${comment.getAttribute("post-id")}`);
    });
});