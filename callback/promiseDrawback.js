function fetchTaskFromDatabase(taskId) {
    return new Promise((resolve, reject) => {
      // Simulate fetching task from a database
      setTimeout(() => {
        if (taskId === 1) {
          resolve({ id: taskId, title: 'Test Task' });
        } else {
          reject('Task not found');
        }
      }, 1000);
    });
  }
  
  function processTask(task) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (task.id === 1) {
          task.processed = true;
          resolve(task);
        } else {
          reject('Task processing failed');
        }
      }, 1000);
    });

  }
  
  async function saveTaskToDatabase(task) {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (task.processed) {
          resolve('Task saved');
        } else {
          reject('Failed to save task');
        }
      }, 1000);
    });
    console.log(result);
    return result
  }
  
  fetchTaskFromDatabase(1) 
    .then(processTask)
    .then(saveTaskToDatabase)
    .catch((error) => {
      console.error('Error:', error);  
    });
  