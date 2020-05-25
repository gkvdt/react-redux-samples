import {
  EDIT_TODO,
  DELETE_TODO,
  ADD_TODO,
  TOGGLE_TODO,
  EDIT_INPUT_TODO
} from "../actions/todoActions";

const initialState = {
  todos: [
    {
      id: 1,
      todo: "I have a todo",
      status: 1,
    },
    {
      id: 2 ,
      todo: "I have a todo",
      status: 0,
    },
  ],
  todo: "qwdqwd",
  todoId: 0,
};
const todosReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_TODO:
      let t = state.todos.filter((e) => e.id === payload.id);
      state = { ...state, todo: t[0].todo, todoId: t[0].id };
      return state;

    case DELETE_TODO:
      return state ={...state, todos:[...state.todos.filter((e) => e.id != payload.id)]};

    case TOGGLE_TODO:
      return state = {
        ...state,
        todos:[
          ...state.todos.map((e) => {
            let res = e;
            if (e.id == payload.id) {
              e.status = e.status == 1 ? 0 : 1;
              return res;
            } else {
              return res;
            }
          }),
        ]

      }

    case ADD_TODO:
      if (state.todo.length < 2) return state;
      if (state.todoId == 0) {
        let newItem = {
          id: generateId(state),
          todo: state.todo,
          status: 0,
        };
        state = {
          todos: [...state.todos, newItem],
          todo: "",
          todoId: 0,
        };
      } else {
        let newTodos = state.todos.map((todo) => {
          if (state.todoId === todo.id) {
            return { ...todo, todo: state.todo };
          }
          return todo;
        });
        state = {
          todos: newTodos,
          todo: "",
          todoId: 0,
        };
      }
      return state;
    case EDIT_INPUT_TODO:
      state = { ...state, todo: payload.todo };
      return state;
    default:
      return state;
  }
};

function generateId(state) {
  let id;
  do {
    id = Math.floor(Math.random() * 99999);
  } while (console.log(state.todos.some((e) => e.id == id)));
  return id;
}

export default todosReducer;
