// modules/userModule.js

let users = [];

// Function to add a user
const addUser = (name, age) => {
  const user = { id: users.length + 1, name, age };
  users.push(user);
  console.log(`User added: ${name}`);
  return user;
};

// Function to get all users
const getUsers = () => {
  return users;
};

// Function to delete a user
const deleteUser = (id) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    console.log(`User deleted: ${deletedUser[0].name}`);
    return deletedUser[0];
  }
  console.log("User not found");
  return null;
};

// Exporting functions to be used in other files
module.exports = {
  addUser,
  getUsers,
  deleteUser,
};
