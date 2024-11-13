function getUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Fetched user");
        resolve({ userId: 1, name: "Alice" });
      }, 1000);
    });
  }
  
  function getPosts(userId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Fetched posts for user ${userId}`);
        resolve([{ postId: 1, title: "Post 1" }, { postId: 2, title: "Post 2" }]);
      }, 1000);
    });
  }
  
  function getComments(postId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Fetched comments for post ${postId}`);
        resolve([{ commentId: 1, text: "Nice post!" }]);
      }, 1000);
    });
  }
  
//Promise.all() is used when you want to run multiple promises in parallel and wait for all of them to resolve or any of them to reject.
  Promise.all([getUser(), getPosts(1)])
    .then(([user, posts]) => {
      console.log(user);
      return getComments(posts[0].postId);
    })
    .then((comments) => {
      console.log("Comments:", comments);
    })
    .catch((err) => console.error(err));
  