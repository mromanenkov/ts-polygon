import * as React from 'react';
import { setColors } from '../actions/actions';
import { store, IColorState } from '../store';

interface ILocalState {
  tempBaseColor: string;
  tempCollisionColor: string;
  message: string;
}

export default class ColorForm extends React.Component<IColorState, ILocalState> {
  constructor(props: IColorState) {
    super(props);
    console.log(props);
    this.state = {
      tempBaseColor: props.base,
      tempCollisionColor: props.collision,
      message: '',
    };
  }

  isHexColorValid(hexColor: string): boolean {
    const regex = /^#([a-f0-9]{3}){1,2}$/i;
    const index = hexColor.search(regex);
    return index >= 0 ? true : false;
  }

  onBaseChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ tempBaseColor: e.currentTarget.value });
  }

  onCollisionChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ tempCollisionColor: e.currentTarget.value });
  }

  onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isBaseColorValid = this.isHexColorValid(this.state.tempBaseColor);
    const isCollisionColorValid = this.isHexColorValid(this.state.tempCollisionColor);
    
    if (isBaseColorValid && isCollisionColorValid) {
      store.dispatch(setColors(this.state.tempBaseColor, this.state.tempCollisionColor));
      this.setState({ message: ' Saved!' });
    }else {
      this.setState({ message: ' Invalid data!' });
    }
  }

  render() {
    return (
      <form onSubmit={e => this.onFormSubmit(e)}>
        <label>Base color </label>
        <input id="color_input" type="text" placeholder="#..." value={this.state.tempBaseColor} 
          onChange={e => this.onBaseChange(e)}/><br/>
        <label>Collision color </label>
        <input id="color_input" type="text" placeholder="#..." 
          value={this.state.tempCollisionColor} onChange={e => this.onCollisionChange(e)}/><br/>
        <input type="submit" value="confirm"/>
        <label>{this.state.message}</label><br/><br/>

        <span>Fill color is {this.props.base}</span><br/>
        <span>Collision color is {this.props.collision}</span>
      </form>
    );
  }
}
