import * as React from 'react';
import { connect } from 'react-redux';
import ColorForm from '../components/color-form';
import { IState } from '../store';

class App extends React.Component<IState> {
  render() {
    return <ColorForm {...this.props.color}></ColorForm>;
  }
}

const mapStateToProps = (state: IState) => {
  return state;
};

export default connect(mapStateToProps)(App);
