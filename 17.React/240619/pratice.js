// ["./src/**/*.{js,tsx,ts,jsx}"];

// body{
//     margin:0;
// }

// @tailwind base;
// @tailwind CompositionEvent;
// @tailwind utilities;

// import React from "react";
// import Todo, {ITodo} from "./Components/Todo";
// // import logo from "./logo.svg";
// // import "./App.css";
// import "./index.scss";

// interface IProps{}

// interface IState<T>{
//     list: T[];
// }

// // <T> << Generic: T
// class App extends React.Component<IProps, IState<ITodo>>{
//     constructor(props:IProps){
//         super(props);
//         this.state = {list: []};
//     }

//     componentDidMount(): void{
//         this.setState((state:IState<ITodo>) => ({
//             ...state,
//             list:[...App
//                 state.list, {content:"오늘 점심은?", isComplete:false}
//             ]
//         }))
//     }

//     render(): React.ReactNode{
//         return(
//             <div>
//                 {this.state.list.map((item:ITodo, idx:number)=> (
//                     <Todo key={idx} item={item}></Todo>
//                 ))}
//             </div>
//         )
//     }
// }

// import {Component, ReactNode} from "react";

// export interface ITodo{
//     content:String;
//     isComplete:Boolean;
// }

// interface IProps{
//     item:ITodo;
// }

// interface IState{}

// class Todo extends Component<IProps, IState>{
//     componentDidMount():void{
//         console.log(this.props);
//     }
//     render():ReactNode{
//         return <div>Todo Item</div>;
//     }
// }

// export default Todo;

// import {Component, ReactNode} from "react";

// export interface ITodo{
//     content:String;
//     isComplete:Boolean;
// }

// interface IProps{
//     item:ITodo;
// }

// interface IState{}

// class Todo extends Component<IProps, IState>{
//     componentDidMount(): void{
//         console.log(this.props);
//     }
//     render(): ReactNode{
//         return <div>Todo Item</div>;
//     }
// }

// export default Todo;

import { Component, ReactNode } from "react";

export interface ITodo {
  constent: String;
  isComplete: Boolean;
}

interface IProps {
  item: ITodo;
}

interface IState {}

class Todo extends Component<IProps, Istate> {
  componentDidMount(): void {
    console.log(this.props);
  }
  render(): ReactNode {
    return <div>Todo Item</div>;
  }
}

import { Component, ReactNode } from "react";

export interface ITodo {
  content: String;
  isComplete: Boolean;
}

interface IProps {
  item: ITodo;
}

interface IState {}

class Todo extends Component<IProps, IState> {
  componentDidMount(): void {
    console.log(this.props);
  }
  render(): ReactNode {
    return <div>Todo Item</div>;
  }
}

import React from "react";
import Todo, { ITodo } from "./Components/Todo";
// import logo from "./logo.svg";
// import "./App.css";
import "./index.scss";

interface IProps {}

interface IState<T> {
  list: T[];
}

// <T> << Generic: T
class App extends React.Component<IProps, IState<ITodo>> {
  constructor(props: IProps) {
    super(props);
    this.state = { list: [] };
  }

  componentDidMount(): void {
    this.setState((state: IState<ITodo>) => ({
      ...state,
      list: [...state.list, { content: "오늘 점심은?", isComplete: false }],
    }));
  }
}

import React from "react";
import Todo, { ITodo } from "./Components/Todo";
// import logo from "./logo.svg";
// import "./App.css";
import "./index.scss";

interface IProps {}

interface IState<T> {
  list: T[];
}

// <T> << Generic: T

class App extends React.Component<IProps, IState<ITodo>> {
  constructor(props: IProps) {
    super(props);
    this.state = { list: [] };
  }

  componentDidMount(): void {
    this.setState((state: IState<ITodo>) => ({
      ...state,
      list: [...state.list, { content: "오늘 점심은?", isComplete: false }],
    }));
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.state.list.map((item: ITodo, idx: number) => (
          <Todo key={idx} item={item}></Todo>
        ))}
      </div>
    );
  }
}

import React from "react";
import Todo, { ITodo } from "./Components/Todo";
// import log from "./logo.svg";
// import "./App.css";
import "./index.scss";

interface IProps {}

interface IState<T> {
  list: T[];
}

// <T> << Generic: T
class App extends React.Component<IProps, IState<ITodo>> {
  constructor(props: IProps) {
    super(props);
    this.state = { list: [] };
  }

  componentDidMount(): void {
    this.setState((state: IState<ITodo>) => ({
      ...state,
      list: [...state.list, { content: "오늘 점심은?", isCOmplete: false }],
    }));
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.state.list.map((item: ITodo, idx: number) => (
          <Todo key={idx} item={item}></Todo>
        ))}
      </div>
    );
  }
}

import React from "react";
import Todo, { ITodo } from "./Components/Todo";
// import logo from "./logo.svg";
// import "./App.css";
import "./index.scss";

interface IProps {}

interface IState<T> {
  list: T[];
}

// <T> << Generic: T

class App extends React.Component<IProps, IState<ITodo>> {
  constructor(props: IProps) {
    super(props);
    this.state = { list: [] };
  }

  componentDidMount(): void {
    this.setState((state: IState<ITodo>) => ({
      ...state,
      list: [...state.list, { content: "오늘 점심은?", isComplete: false }],
    }));
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.state.list.map((item: ITodo, idx: number) => (
          <Todo key={idx} item={item}></Todo>
        ))}
      </div>
    );
  }
}

import React from "react";
import Todo, {ITodo} from "./Components/Todo";
// import logo from "./logo.svg";
// import "./App.css";
import "./index.scss";

interface IProps {}

interface IState<T>{
    list:T[];
}

// <T> << Generic: T
class App extends React.Component<IProps, IState<ITodo>>{
    constructor(props: IProps){
        super(props);
        this.state = {list: []};
    }

    componentDidMount(): void{
        this.setState(state: IState<ITodo>) => ({
            ...this.state,
            list:[...
                state.list, {content: "오늘 점심은?", isComplete:false}],
            
        })
    }

    render():React.ReactNode{
        return (
            <div>
                {this.state.list.map((item: ITodo, idx:number) => (
                    <Todo key={idx} item={item}></Todo>
                ))}
            </div>
        );
    }
}

import {Component, ReactNode} from "react";

export interface ITodo{
    content:String;
    isComplete:Boolean;
}

interface IProps{
    item: ITodo;
}

class Todo extends Component<IProps, IState>{
    componentDidMount():void{
        console.log(this.props);
    }
    render(): ReactNode{
        return <div>Todo Item</div>;
    }
};

import {Component, ReactNode} from "react";

export interface ITodo{
    content: String;
    isComplete:Boolean;
}

interface IProps{
    item:ITodo;
}

interface IState{}

class Todo extends Component<IProps, IState>{
    componentDidMount(): void{
        console.log(this.props);
    }
    render():ReactNode{
        return <div>Todo Item</div>
    }
}

export default Todo;

export interface IComponent {}

type State = {
    [key: string] : AnalyserNode;
}

export interface IComponent{
    setState(newState: state): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount():void;
    render(): void;
}

export default class Component{
    protected state: State = {};
    private parent: HTMLElement;
    // React에서 가장 기초되는 단위 << 어떤 단위?
    // 엘리먼트(영역)
    // 필요한 메서드는?
    constructor(parent: HTMLElement){
        this.parent = parent;
        this.rerender();
        this.componentDidMount();
    }
    setState(newState: State):void{
        let isNewState = false;
        Object.keys(newState).forEach((key: keyof State) => {
            if(this.state[key] != newState[key]){
                isNewState = true;
            }
        });
        if(isNewState){
            this.state = {...this.state, ...newState};
            this.rerender();
            this.componentDidUpdate();
        }
    }
    componentDidMount(): void{}
    componentDidUpdate(): void{}
    componentWillUnmount():void{}

    render(): string{
        return "";
    }
    private rerender(): void{
        this.parent.innerHTML = this.render();
    }
}

import Component from "./Component";

export default class Counter extends Component{
    constructor(parent: HTMLElement){
        super(parent);
        this.setState({count:0});
        // document.getElementById("count-btn").onclick =this.handlerCount;
        document.getElementById("count-btn")!.onclick = () => {
            // function => thisbinding => this에 대해서 상위 객체를 가리킨다.
            // arrow function => 왜 카운트가 나왔을까? => thisbinding X
            // console.log(this);
            this.handlerCount();
        }
        // document.getElementById("count-btn")!.addEventListener("click", () => {
        //     this.handlerCount();
        // });
    }
    componentDidUpdate(): void{
        document.getElementById("count-btn")!.onclick = () => {
            this.handlerCount();
        }
    }
    handlerCount() {
        this.setState({count:this.state.count});
    }
    render(){
        return `<button onclick="(${this.handlerCount})()"> count : ${this.state.count}</button>`
    }
}

import Component from "./lib/Components/Component";
import Counter from "./lib/Component/Counter";

export default class App extends Component{
    constructor(parent: HTMLElement){
        super(parent);
        this.setState({test:1});
        new Counter(document.getElementById("counter")!);
    }
    override componentDidMount():void{
        console.log("now test");
    }
    override componentDidUpdate(): void{
        console.log("testing update");
        setTimeout(() => {
            this.setState({test:this.state.test + 1});
        }, 1000);
    }
    override render() {
        console.log(this.state);
        return `<div>
            ${this.state?.test}
            <div id="counter"></div>
            </div>
        `
    }
}

import App from "./App";

new App(document.getElementsByTagName("div")[0]);