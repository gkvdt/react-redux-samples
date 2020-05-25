import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import {
  INCREASE_COUNTER,
  DESCREASE_COUNTER,
} from "../redux/actions/counterActions";
import PropTypes from 'prop-types';



class Counter extends Component {
  render() {
    return (
      <div className="container justify-content-center align-items-center mt-5">
        <div className="row ">
          <div className="col-md-1 offset-md-4">
            <button className="btn btn-primary" onClick={this.props.descrease}>
              -
            </button>
          </div>
          <div className="col-md-1">{this.props.counter}</div>
          <div className="col-md-1">
            <button className="btn btn-primary" onClick={this.props.increase}>
              +
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Counter.propTypes = {
  counter : PropTypes.number,
  descrease:PropTypes.func,
  increase : PropTypes.func,
}


const mapStateToProps = (state) => ({
  counter: state.counter,
});

const dispatchStateToProps = (dispatch) => ({
  increase: () => dispatch({ type: INCREASE_COUNTER }),
  descrease: () => dispatch({ type: DESCREASE_COUNTER }),
});

export default connect(mapStateToProps, dispatchStateToProps)(Counter);
