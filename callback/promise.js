let passexam = true;

let res = new Promise(function (resolve, reject) {
    setTimeout(() => {
        if (passexam) {
            resolve("Dad gifted the new mobile.");
        } else {
            reject("Dad has not gifted the mobile.");
        }
    }, 5 * 1000);
});

res.then((result) => {
    console.log(result); 
}).catch((error) => {
    console.error(error); 
});
console.log('Async')