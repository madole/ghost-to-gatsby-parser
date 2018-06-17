const fs = require("fs");
const data = fs.readFileSync(process.env.PATH_TO_GHOST_DUMP, "utf8");

const blog = JSON.parse(data);

// uncomment if you need to make the directory
// fs.mkdirSync('./blog-posts')

function getTemplate(post) {
    const { published_at, slug, markdown, title } = post;
    const template = `---
title: "${title}"
date: "${new Date(published_at).toISOString()}"
path: "/${slug}/"
---
${markdown}
    `;
    fs.mkdirSync(`./blog-posts/${slug}`);
    fs.writeFileSync(`./blog-posts/${slug}/index.md`, template, "utf8");
    return template;
}

blog.db[0].data.posts.map(post => getTemplate(post));
