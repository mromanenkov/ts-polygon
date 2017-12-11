import * as React from 'react';

interface IControlProps {
  baseColor: string;
  collisionColor: string;
}

interface IControlState {
  baseColor: string;
  collisionColor: string;
  
  inputBaseColor: string;
  inputCollisionColor: string;
  message: string;
}

class Control extends React.Component<IControlProps, IControlState> {
  constructor(props: IControlProps) {
    super(props);
    this.state = {
      baseColor: this.props.baseColor,
      collisionColor: this.props.collisionColor,

      inputBaseColor: '',
      inputCollisionColor: '',
      message: '',
    };
  }

  public onBaseChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ inputBaseColor: e.currentTarget.value });
  }

  public onCollisionChange(e: React.FormEvent<HTMLInputElement>): void {
    this.setState({ inputCollisionColor: e.currentTarget.value });
  }

  onButtonClick() {
    console.log('Add button was pressed');
  }

  onFormSubmit(e: any) {
    const isBaseColorValid = this.isHexColorValid(this.state.inputBaseColor);
    const isCollisionColorValid = this.isHexColorValid(this.state.inputCollisionColor);

    if (isBaseColorValid && isCollisionColorValid) {
      this.setState({ baseColor: this.state.inputBaseColor });
      this.setState({ collisionColor: this.state.inputCollisionColor });
      this.setState({ message: ' Saved!' });
    }else {
      this.setState({ message: ' Invalid data!' });
    }
    e.preventDefault();
  }

  isHexColorValid(hexColor: string): boolean {
    const regex = /^#([a-f0-9]{3}){1,2}$/i;
    const index = hexColor.search(regex);
    return index >= 0 ? true : false;
  }

  public render() {
    return (
      <div>
        <form onSubmit={e => this.onFormSubmit(e)}>
            <span>Base color </span>
            <input type="text" placeholder="#..." onChange={e => this.onBaseChange(e)}/><br/>
            <span>Collision color </span>
            <input type="text" placeholder="#..." onChange={e => this.onCollisionChange(e)}/><br/>
            <input type="submit" value="Confirm"/>
            <span>{this.state.message}</span><br/><br/>

            <span>Base color is {this.state.baseColor}</span><br/>
            <span>Collision color is {this.state.collisionColor}</span>
        </form>
        <div>
          <span>Add random polygon </span>
          <button onClick={this.onButtonClick}>Add</button>
        </div>
    </div>);
  }
}

export default Control;
