export interface IComponent {}

type State = {
  [key: string]: any;
  // name: string;
};

export interface IComponent {
  setState(newState: State): void;
  componentDidMount(): void;
  componentDidUpdate(): void;
  componentWillUnmount(): void;
  render(): void;
}
export default class Component {
  protected state: State = {};
  private parent: HTMLElement;
  // React애서 가장 기초되는 단위 << 어떤 단위?
  // 엘리먼트(영역)
  // 필요한 메서드는?
  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.rerender();
    this.componentDidMount();
  }
  setState(newState: State): void {
    let isNewState = false;
    Object.keys(newState).forEach((key: keyof State) => {
      if (this.state[key] != newState[key]) {
        isNewState = true;
      }
    });
    if (isNewState) {
      this.state = { ...this.state, ...newState };
      this.rerender();
      this.componentDidUpdate();
    }
  }
  componentDidMount(): void {}
  componentDidUpdate(): void {}
  componentWillUnmount(): void {}

  render(): string {
    return "";
  }
  private rerender(): void {
    this.parent.innerHTML = this.render();
  }
}
