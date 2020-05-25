import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  EDIT_INPUT_TODO,
} from "../redux/actions/todoActions";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      todos: [
        {
          id: 1,
          todo: "I have a todo",
          status: 0,
        },
      ],
      todo: "qwdqwd",
      todoId: 0,
    };
    
    //? binding
    this.card = this.card.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.todos = this.todos.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.generateId = this.generateId.bind(this);
  }
  
  editTodo(id) {
    let t = this.state.todos.filter((e) => e.id === id);
    this.setState({
      todo: t[0].todo,
      todoId: t[0].id,
    });
  }
  deleteTodo(id) {
    this.setState({
      todos: [...this.state.todos.filter((e) => e.id != id)],
    });
  }
  toggleTodo(id) {
    this.setState({
      todos: [
        ...this.state.todos.map((e) => {
          let res = e;
          if (e.id == id) {
            e.status = e.status == 1 ? 0 : 1;
            return res;
          } else {
            return res;
          }
        }),
      ],
    });
  }
  addTodo() {
    if (this.state.todo.length < 2) return;
    if (this.state.todoId == 0) {
      let newItem = {
        id: this.generateId(),
        todo: this.state.todo,
        status: 0,
      };
      this.setState({
        todos: [...this.state.todos, newItem],
        todo: "",
        todoId: 0,
      });
    } else {
      let newTodos = this.state.todos.map((todo) => {
        if (this.state.todoId === todo.id) {
          return { ...todo, todo: this.state.todo };
        }
        return todo;
      });
      this.setState({
        todos: newTodos,
        todo: "",
        todoId: 0,
      });
    }
  }
  
  generateId() {
    let id;
    do {
      id = Math.floor(Math.random() * 99999);
    } while (console.log(this.state.todos.some((e) => e.id == id)));
    return id;
  }
  /*
  */
 
  todos() {
    const list = this.state.todos.map((item) => {
      return this.card(item);
    });

    return list;
  }

  card({ id, todo, status }) {
    return (
      <div className="row">
        <div className="col mt-3">
          <div className={status == 1 ? "card bg-primary" : "card"}>
            <div className="card-body">
              <h5 className="card-title">Todo</h5>
              <p className="card-text">{todo}</p>
              <button
                onClick={() => this.props.editTodo(id)}
                className="btn btn-warning mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => this.props.deleteTodo(id)}
                className="btn btn-danger mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => this.props.toggleTodo(id)}
                className="btn btn-success"
              >
                {status === 1 ? "Uncheck" : "Check"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container mt-5 justify-content-center">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="row">
              <div className="col">
                <div className="input-group mb-3">
                  <input
                    value={this.props.todos.todo}
                    onChange={(e) => this.props.editInputTodo(e.target.value)}
                    className="form-control"
                    placeholder="Enter todo"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon2"
                      onClick={() => this.props.addTodo()}
                    >
                      {this.props.todos.todoId == 0 ? "Add" : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {this.props.todos.todos.map((item) => this.card(item))}
          </div>
        </div>
      </div>
    );
  }
}

TodoList.propTypes = {
  addTodo: PropTypes.func,
  editTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  toggleTodo: PropTypes.func,
  editInputTodo: PropTypes.func,
  todo: PropTypes.string,
  todos: PropTypes.object,
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const dispatchStateToProps = (dispatch) => ({
  addTodo: () =>
    dispatch({
      type: ADD_TODO,
    }),

  editTodo: (id) =>
    dispatch({
      type: EDIT_TODO,
      payload: { id : id },
    }),

  deleteTodo: (id) =>
    dispatch({
      type: DELETE_TODO,
      payload: { id:id },
    }),

  toggleTodo: (id) =>
    dispatch({
      type: TOGGLE_TODO,
      payload: { id: id },
    }),

  editInputTodo: (todo) =>
    dispatch({
      type: EDIT_INPUT_TODO,
      payload: { todo:todo },
    }),
});

export default connect(mapStateToProps, dispatchStateToProps)(TodoList);
