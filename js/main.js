const postIdInput = document.getElementById('postId');
const searchButton = document.getElementById('searchButton');
const postContainer = document.getElementById('postContainer');

function getPostById(postId) {
  return new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('The post was not found');
        }
        return response.json();
      })
      .then(post => resolve(post))
      .catch(error => reject(error));
  });
}

function getCommentsByPostId(postId) {
  return new Promise((resolve, reject) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(response => {
        if (!response.ok) {
          throw new Error('No comments found');
        }
        return response.json();
      })
      .then(comments => resolve(comments))
      .catch(error => reject(error));
  });
}

searchButton.addEventListener('click', () => {
  const postId = parseInt(postIdInput.value);
  if (postId >= 1 && postId <= 100) {
    postContainer.innerHTML = '';

    getPostById(postId)
      .then(post => {
        const postElement = document.createElement('div');
        postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;

        const commentsButton = document.createElement('button');
        commentsButton.textContent = 'Show comments';
        commentsButton.addEventListener('click', () => {
          getCommentsByPostId(postId)
            .then(comments => {
              const commentsList = document.createElement('ul');
              comments.forEach(comment => {
                const commentItem = document.createElement('li');
                commentItem.textContent = comment.body;
                commentsList.appendChild(commentItem);
              });
              postElement.appendChild(commentsList);
            })
            .catch(error => console.error('Error:', error));
        });

        postElement.appendChild(commentsButton);
        postContainer.appendChild(postElement);
      })
      .catch(error => console.error('Error:', error));
  } else {
    console.log('Enter the correct post ID from 1 to 100');
  }
});
