// Wait for DOM to load
function main() {
    displayPosts();
    addNewPostListener();
}
document.addEventListener("DOMContentLoaded", main);

// Base URL
const BASE_URL = "https://json-server-olgr.onrender.com/posts";

// Display all posts
function displayPosts() {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(posts => {
            const postList = document.getElementById("post-list");
            postList.innerHTML = ""; // Clear existing list

            posts.forEach(post => {
                const postItem = document.createElement("div");
                postItem.textContent = post.title;
                postItem.classList.add("post-item");
                postItem.dataset.id = post.id;

                postItem.addEventListener("click", () => handlePostClick(post.id));
                postList.appendChild(postItem);
            });

            if (posts.length > 0) {
                handlePostClick(posts[0].id);
            }
        });
}

// Display a single post’s details
function handlePostClick(id) {
    fetch(`${BASE_URL}/${id}`)
        .then(res => res.json())
        .then(post => {
            renderPostDetail(post);
        });
}

// Render a post in #post-detail
function renderPostDetail(post) {
    const postDetail = document.getElementById("post-detail");
    postDetail.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = post.title;

    const author = document.createElement("p");
    author.textContent = `By: ${post.author}`;

    const image = document.createElement("img");
    image.src = post.image || "";
    image.alt = post.title;
    image.style.maxWidth = "100%";

    const content = document.createElement("p");
    content.textContent = post.content;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => enableEditing(post));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => handleDelete(post.id));

    postDetail.append(title, author, image, content, editBtn, deleteBtn);
}

// Enable editing post
function enableEditing(post) {
    const form = document.getElementById("edit-post-form");
    form.classList.remove("hidden");

    document.getElementById("edit-title").value = post.title;
    document.getElementById("edit-content").value = post.content;

    form.onsubmit = (event) => {
        event.preventDefault();

        const updatedTitle = document.getElementById("edit-title").value;
        const updatedContent = document.getElementById("edit-content").value;

        // Update DOM
        renderPostDetail({
            ...post,
            title: updatedTitle,
            content: updatedContent
        });

        // PATCH to server
        fetch(`${BASE_URL}/${post.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: updatedTitle,
                content: updatedContent
            })
        });

        form.classList.add("hidden");
        form.reset();
    };

    const cancelBtn = document.getElementById("cancel-edit");
    cancelBtn.onclick = () => {
        form.classList.add("hidden");
        form.reset();
    };
}

// Add new post
function addNewPostListener() {
    const form = document.getElementById("new-post-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = form.title.value;
        const author = form.author.value;
        const image = form.image.value;
        const content = form.content.value;

        fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                author,
                image,
                content
            })
        })
        .then(res => res.json())
        .then(newPost => {
            const postList = document.getElementById("post-list");
            const postItem = document.createElement("div");
            postItem.textContent = newPost.title;
            postItem.classList.add("post-item");
            postItem.dataset.id = newPost.id;

            postItem.addEventListener("click", () => handlePostClick(newPost.id));
            postList.appendChild(postItem);

            renderPostDetail(newPost);
            form.reset();
        });
    });
}

// Delete a post
function handleDelete(id) {
    fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        const postItem = document.querySelector(`[data-id="${id}"]`);
        if (postItem) postItem.remove();

        const postDetail = document.getElementById("post-detail");
        postDetail.innerHTML = "<p>Select a post to view its details.</p>";
    });
}
