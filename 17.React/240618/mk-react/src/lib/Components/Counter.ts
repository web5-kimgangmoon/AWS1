import Component from "./Component";

export default class Counter extends Component {
  constructor(parent: HTMLElement) {
    super(parent);
    this.setState({ count: 0 });
    // document.getElementById("count-btn").onclick = this.handlerCount;
    // document.getElementById("count-btn").onclick = () => {
    //   this.handlerCount();
    // };
    // document.getElementById("count-btn").onclick = this.handlerCount;
    document.getElementById("count-btn")!.onclick = () => {
      // function => thisbinding => this에 대해서 상위 객체를 가리킨다.
      // arrow function => 왜 카운트가 나왔을까? => thisbinding X
      //   console.log(this);
      this.handlerCount();
    };
    // document.getElementById("count-btn")!.addEventListener("click", () => {
    //   this.handlerCount();
    // });
  }
  componentDidUpdate(): void {
    document.getElementById("count-btn")!.onclick = () => {
      this.handlerCount();
    };
  }
  handlerCount() {
    this.setState({ count: this.state.count });
  }
  render() {
    return `<button onclick="(${this.handlerCount})()"> count : ${this.state.count}</button>`;
  }
}
