
#  Blog Post Manager

This project is a dynamic blog post manager built using **vanilla JavaScript**. It allows users to view, create, and edit blog posts by interacting with a mock REST API powered by `json-server`.

---

## Features Implemented

### Core Deliverables

- **View All Posts**  
  On page load, the app fetches all blog posts and displays their titles in the sidebar (`#post-list`).

- **View Single Post Details**  
  Clicking a title shows the post's full details (title, author, image, and content) in the main view (`#post-detail`).

- **Create New Post**  
  A form (`#new-post-form`) allows users to add new blog posts, which appear instantly in the post list and detail section. Posts are saved to the backend via a `POST` request.

- **Main Initialization Function**  
  All setup logic (event listeners, fetching data) is wrapped inside a `main()` function that runs after `DOMContentLoaded`.

---

###  Advanced Features

- **Show First Post on Page Load**  
  As soon as the app loads, it automatically displays the first blog post in the detail section without requiring a click.

- **Edit Existing Post (DOM Only)**  
  An "Edit" button in the detail view reveals a pre-filled form where the post title and content can be edited. Changes are reflected immediately on the page (but not persisted to the server).

---

##  Project Structure

## 🛠 Tech Stack

* HTML5
* CSS3 (styled with shades of blue )
* JavaScript (DOM, Fetch API)
* JSON Server (`npm install -g json-server@0.17.4`)

---

##  Setup Instructions

1. Clone or download the repo
2. Install `json-server` if you haven't:

   ```bash
   npm install -g json-server@0.17.4
   ```
3. Start the server:

   ```bash
   json-server db.json
   ```
4. Open `index.html` using Live Server (or similar)

---

## Author

Created by **MELANIE** 

---

## Notes

* Posts are saved to the backend using POST requests.
* Edits are currently DOM-only — persistence is an optional stretch goal.
* Styling uses calming shades of blue for a clean, modern interface.

## LICENSE
MIT license
