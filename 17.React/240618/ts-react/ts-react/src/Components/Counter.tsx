import { Component, ReactNode } from "react";
// type TCount = {
//   count: number;
// };

export default class Count extends Component<
  {},
  {
    count: number;
  }
> {
  constructor(props: {}) {
    super(props);
    this.setState({ count: 1 });
  }
  handlerCount() {
    this.setState((state: { count: number }) => ({ count: state.count + 1 }));
  }

  render(): ReactNode {
    return (
      <button
        onClick={() => {
          this.setState({ count: this.state.count + 1 });
        }}
      >
        {this.state.count}
      </button>
    );
    // return <button onClick={this.handlerCount}>{this.state.count}</button>;
  }
}
