async function fetchTodo() {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      let data = await response.json();
  
      console.log(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  fetchTodo();
  