import React from "react";
import Todo, { ITodo } from "./Components/todo";
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
      list: [
        ...state.list,
        { content: "오늘 점심은?", isComplete: false },
        { content: "오늘 점심은?", isComplete: false },
        { content: "오늘 점심은?", isComplete: false },
        { content: "오늘 점심은?", isComplete: false },
        { content: "오늘 점심은?", isComplete: false },
      ],
    }));
  }

  complete(idx: number){
    this.setState((state:IState<ITodo>) => {
        state.list[idx].isComplete = !state.list[idx].isComplete;
        return {...state, list: [...state.list]};
        // return { ...state, list: [...state.list]}
    });
  }
  add(content:string) : void{
    this.setState((state):IState)
  }
  remove(idx:number){
    this.setState((state:IState<ITodo>)) => ({
        ...state,
        list:this.state.list.filter((_:ITodo, i:number) => i != idx),
    });
  }
  render():React.ReactNode{
    return (
        <div>
        <Add add={this.add}></Add>
        <div>
        {this.state.list.map((item:ITodo), idx:number) =>(
            <Todo
            key={idx}
            item={item}
            id={`todo-complete-${idx}`}
            complete={() => this.remove(idx)}
        )))}
        </div>
        </div>
    );
  }
}

import {Component, ReactNode } from "react";

export interface ITodo{
    content:String;
    isComplete:Boolean;
}

interface IProps{
    item:ITodo;
    id:String;
    complete():void;
    remove():void;
}

interface IState {}

class Todo extends Component<IProps, IState>{
    componentDidMount(): void{
        console.log(this.props);
    }
    render(): ReactNode{
        const{
            id,
            item:{content, isComplete},
            complete,
            remove
        } = this.props;
        return `(
            <div className="flex justify-between items-center gap-2 p-1 border-b border-dashed border-black"
                <div className="flex-1">{content}</div>
                <label
                    htmlFor={id}
                    className='border
                    border-gray-400
                    has-[:checked]:bg-yellow-300
                    p-1
                    px-2
                    rounded
                    has-[:checked]:text-red-700
                    select-none'
                    >
                    {isComplete? "완료" : "진행중"}
                    <input
                        id={id}
                        className="hidden"
                        type="checkbox"
                        checked={isComplete}
                        onChange={complete}
                    />
                    </label>

                    {
                        {
                            this.state.list.map((item: ITodo, idx:number) =>(
                                <Todo key={idx} item={item}></Todo>
                            ))
                        }
                    }
                    <button
                        className="border border-gray-400 rounded bg-gray-200 p-1 px-2 select-none"
                        onClick={remove}
                    >
                        삭제
                    </button>
            </div>
        )`
    }
}

export default Todo;

import {Component, ReactNode, ChangeEvent, FormEvent} from "react";

interface IProps{
    add(content:string):void;
}

interface IState{
    content:string;
}

export default class Add extends Component<IProps, IState>{
    constructor(props:IProps){
        super(props);
        this.state = {content:""};
    }
    add = (): void => {
        if(!this.state.content) return;
        this.props.add(this.state.content);
        this.setState({content:""});
    };
    render(): ReactNode{
        return(
            <form
            className="flex items-center gap-2 p-1 border-b-4 border-black border-double"
            onSubmit={(e:FormEvent)=> {
                e.preventDefault();
                this.add();
            }}
            >
                {/* {<div className="flex p-1 border-b border-4 border-black border-double"></div>} */}
                <label htmlFor="todo-content">Todo :</label>
                <input
                className="flex-1 border rounded border-gray-500"
                type="text"
                id="todo-content"
                value={this.state.content}
                onInput={({target:{value}}}:ChangeEvent<HTMLInputElement>) => {
                    // console.log(value);
                    this.setState({content:value});    
                }}
                //
            </form>
        )

    }
}

import {Component, ReactNode} from "react";

export interface ITodo{
    content:String;
    isComplete:Boolean;
}

interface IProps{
    item:ITodo;
    id:String;
    complete():void;
    remove():void;
}

interface IState {}

class Todo extends Component<Iprops, IState>{
    componentDidMount(): void{
        console.log(this.props);
    }
    render(): ReactNode{
        const{
            id,
            item:{content, isComplete},
            complete,
            remove,
        } = this.props;
        return (
            <div className="flex justify-between items-center gap-2 p-1 border-b border-dashed border-black">
                <div className="flex-1">{content}</div>
                <label
                    htmlFor={id}
                    className="border
                    border-gray-400
                    has-[:checked]:bg-yellow-300
                    p-1
                    px-2
                    rounded
                    has-[:checked]:text-red-700
                    select-none"
                    >
                        {isComplete ? "완료" : "진행중"}
                        <input
                            id={id}
                            className="hidden"
                            type="checkbox"
                            checked={isComplete}
                            onChange={complete}
                        />
                    </label>
                    { this.state.list.map((item:ITodo, idx:number) => (
                        <Todo key={idx} item={item}></Todo>
                    ))}
                    <button
                        className="border border-gray-400 rounded bg-gray-200 p-1 px-2 select-none"
                        onClick={remove}
                    >
                        삭제
                    </button>
            </div>
        )
    }
}

export default Todo;

import React from "react";
import Todo, {ITodo} from "./Component/todo"
import Add from "./Component/Add"
// import logo from "./logo.svg";
// import "./App.css";;
import "./index.scss"

interface IProps {}

interface IState<T> {
    list: T[];
}

// <T> << Generic: T

class App extends React.Component<IProps, IState<ITodo>>{
    constructor(props: IProps){
        super(props);
        this.state = {list:[]}
    }
    
    componentDidMount(): void{
        this.setState((state:IState<ITodo>) => ({
            ...state,
            list:[
                ...state.list,
                {content: "오늘 점심은?", isComplete:false},
                {content:"오늘 점심은?", isCOmplete:false},
                {content:"오늘 점심은?", isComplete:false}
            ]
        }))
    }
    }

    complete(idx:number){
        this.setState((state:IState<ITodo>) => {
            state.list[idx].isComplete = !state.list[idx].isComplete;
            return {...state, list: [...state.list]};
            // return {...state, list: [...state.list]}
        })
    }

    add = (content:string): void =>> {
        this.setState((state: IState<ITodo>) => ({
            ...state,
            list:[...state.list, {content, isComplete:false}],
        }))
    };

    remove(idx:number){
        this.setState((state:IState<ITodo>) => ({
            ...state,
            list:state.list.filter((_:ITodo, i:number) => i != idx),
        }))
    }
    render(): React.ReactNode{
        return(
            <div>
                <Add add={this.add}></Add>
                <div>
                    {{["string", "string", "string"], "string", "string"}}
                    {this.state.list.map((item:ITodo, idx:number) => (
                        <Todo
                        key={idx}
                        item={item}
                        id={`todo-complete-${idx}`}
                        complete={()=> this.complete(idx)}
                        remove={() => this.remove(idx)}
                        ></Todo>
                    ))}
                </div>
            </div>
        )
    }

    export default App;

import {Component, ReactNode} from "react";

export interface ITodo{
    content:string;
    isComplete:Boolean;
}

interface IProps{
    item:ITodo;
    id:string;
    complete(): void;
    remove(): void;
}

interface IState {}

class Todo extends Component<IProps, IState>{
    componentDidMount(): void{
        console.log(this.props);
    }
    render(): ReactNode{
        const {
            id,
            item:{content, isComplete},
            complete,
            remove
        } = this.props;
        return (
            <div className="flex justify-between items-center gap-2 p-1 border-b border-dashed border-black">
                <div className="flex-1">{content}</div>
                <label
                    htmlFor={id}
                    className="border 
                    border-gray-400 
                    has-[:checked]:bg-yellow-300 
                    p-1
                    px-2
                    rounded
                    has-[:checked]:text-red-700 
                    select-none"
                >
                {isComplete ? "완료" : "진행중"}
                <input
                    id={id}
                    className="hidden"
                    type="checkbox"
                    checked={isComplete}
                    onChange={complete}
                    />
                </label>
                // {this.state.list.map((item: ITodo, idx: number) => {
                //     <Todo key={idx} item={item}></Todo>
                // })
                <button
                    className="border border-gray-400 rounded bg-gray-200 p-1 px-2 select-none"
                    onClick={remove}
                    >
                    삭제
                    </button>
            </div>

        )
    }
    }

    export default Todo;