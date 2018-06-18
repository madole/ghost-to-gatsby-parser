const fs = require("fs");
const data = fs.readFileSync(process.env.PATH_TO_GHOST_DUMP, "utf8");

const blog = JSON.parse(data);

// uncomment if you need to make the directory
// fs.mkdirSync('./blog-posts')

function parseBlogPost(post) {
    const { published_at, slug, markdown, title } = post;
    const template = `---
title: "${title}"
date: "${new Date(published_at).toISOString()}"
slug: "/${slug}/"
---
${markdown}
    `;
    fs.mkdirSync(`./blog-posts/${slug}`);
    fs.writeFileSync(`./blog-posts/${slug}/index.md`, template, "utf8");
}

blog.db[0].data.posts.forEach(parseBlogPost);
