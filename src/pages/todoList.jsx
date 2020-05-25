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
