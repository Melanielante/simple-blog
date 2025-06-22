// waiting for the DOM content tto be loaded

function main() {
    displayPosts();
    addNewPostListener();
}
document.addEventListener("DOMContentLoaded", main);

//fetching all the blog posts in the post-list container

function displayPosts() {
    fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(posts => {
        const postList = document.getElementById("post-list");


        posts.forEach(post => {
            const postItem = document.createElement("div");
            postItem.textContent = post.title;
            postItem.classList.add("post-item");
            postItem.dataset.id = post.id;

            //adding click event to show post details
            postItem.addEventListener("click", () => handlePostClick(post.id));

            postList.appendChild(postItem);
        });
    })
}

// showing post details when the title is clicked on the sidebar

function handlePostClick(id) {
    fetch(`http://localhost:3000/posts/${id}`)
    .then(res => res.json())
    .then(post => {
        const postDetail = document.getElementById("post-detail");

        //clearing old content
        postDetail.innerHTML = "";

        //creating elements for the post

        //title
        const title = document.createElement("h2");
        title.textContent = post.title;

        //author
        const author = document.createElement("p");
        author.textContent = `By: ${post.author}`;

        //image
        const image = document.createElement("img");
        image.src = post.image || "";
        image.alt = post.title;
        image.style.maxWidth = "100%";

        //content
        const content = document.createElement("p");
        content.textContent = post.content;

        //edit button
        const editBtn =  document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => enableEditing(post));

        //appending all created elements to post-detail
        postDetail.append(title, author, image,content, editBtn);


    })
}