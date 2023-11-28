const blogform = document.getElementById('blogform')
const titleInput = document.getElementById('titleInput')
const contentInput = document.getElementById('contentInput')
const blogPostsContainer =document.getElementById('blogPosts')

function displayBlogPosts() {
  blogPostsContainer.innerHTML ='';
  const posts = JSON.parse(localStorage.getItem('blogPosts')) ||[]

  posts.forEach(post => {
    const postElement = document.createElement('div')
    postElement.classList.add('blog-post')
    postElement.innerHTML =`
    <h2>${post.title}</h2>
    <p>${post.content}</p>
    <button onclick="editPost(${post.id})">edit</button>
    <button onclick="deletePost(${post.id})">Delete</button>
    `;
    blogPostsContainer.appendChild(postElement)
  });
}

function updateLocalStorage(posts) {
  localStorage.setItem('blogPosts', JSON.stringify(posts))
  displayBlogPosts();
}

function addOrUpdatePost(postId, title, content) {
  let posts=JSON.parse(localStorage.getItem('blogPosts')) || [];
  const existingPostIndex = posts.findIndex(post => post.id ===postId)

  if (existingPostIndex !== -1) {
    posts[existingPostIndex].title = title
    posts[existingPostIndex.content = content]
  } else {
    posts.push({ id: Date.now(),title,content})
  }
  updateLocalStorage(posts)
}


function addBlogpost(event) {
  event.preventDefault();
  const title = titleInput.value;
  const content = contentInput.value;

  if (title && content) {
    addOrUpdatePost(Date.now(), title, content);
    titleInput.value = '';
    contentInput.value = '';
  } else {
      alert('Please')
  }
}
function editPost(postId) {
  const posts = JSON.parse(localStorage.getItem('blogPosts')) || []
  const postToEdit = posts.find(post => post.id === postId)

  if (postToEdit) {
    const updatedTitle = prompt('Enter updated title: ', postToEdit.title);
    const updatedContent = prompt('Enter Updated Content:', postToEdit.content)
  
    if (updatedTitle !== null && updatedContent !== null) {
      addOrUpdatePost(postId, updatedTitle || postToEdit.title ,updatedContent || postToEdit.content)
    }
  }
}

function deletePost(postId) {
  let posts = JSON.parse(localStorage.getItem('blogPosts')) || []
  posts = posts.filter(post => post.id !== postId)
  updateLocalStorage(posts)
}
blogForm.addEventListener('submit', addBlogpost);
displayBlogPosts();