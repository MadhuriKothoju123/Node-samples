//Callback Hell

function getUser(callback) {
    setTimeout(() => {
      console.log("Fetched user");
      callback(null, { userId: 1, name: "Alice" });
    }, 1000);
  }
  
  function getPosts(userId, callback) {
    setTimeout(() => {
      console.log(`Fetched posts for user ${userId}`);
      callback(null, [{ postId: 1, title: "Post 1" }, { postId: 2, title: "Post 2" }]);
    }, 1000);
  }
  
  function getComments(postId, callback) {
    setTimeout(() => {
      console.log(`Fetched comments for post ${postId}`);
      callback(null, [{ commentId: 1, text: "Nice post!" }]);
    }, 1000);
  }
  
  // Using nested callbacks
  getUser((err, user) => {
    if (err) return console.error(err);
    getPosts(user.userId, (err, posts) => {
      if (err) return console.error(err);
      getComments(posts[0].postId, (err, comments) => {
        if (err) return console.error(err);
        console.log("Comments:", comments);
      });
    });
  });
  