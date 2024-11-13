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
  
  // Using Promises
  getUser()
    .then((user) =>{
      console.log(user);
      return getPosts(user.userId)})
    .then((posts) => getComments(posts[0].postId))
    .then((comments) => console.log("Comments:", comments))
    .catch((err) => console.error(err));
  
    