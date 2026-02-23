function addTodo() {
  let input = document.getElementById("todoInput");
  let list = document.getElementById("todoList");
  list.insertAdjacentHTML('beforeend', '<li>'+input.value+'</li>');
  input.value="";
}