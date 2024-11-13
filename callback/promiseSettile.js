function getUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Fetched user");
        resolve({ userId: 1, name: "Alice" });
      }, 1000);
    });
  }
  
  function getPosts(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`Fetched posts for user ${userId}`);
        reject("Failed to fetch posts");
      }, 1000);  // Simulating a failure
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
  
  // Using Promise.allSettled to handle all promises and their results (success or failure)
  //Purpose: Promise.allSettled() is used when you want to wait for all promises to settle (either resolve or reject),
  // and you want to know the outcome of each promise (whether it was resolved or rejected).
  Promise.allSettled([getUser(), getPosts(1), getComments(1)])
    .then((results) => {
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          console.log('Success:', result.value);
        } else {
          console.log('Failure:', result.reason);
        }
      });
    });
  