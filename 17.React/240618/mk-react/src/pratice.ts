// interface IMyMath {
//   add(a?: number, b?: number): number;
//   add(a: string, b: string): number;
// }

// class MyMath implements IMyMath {
//   add(a?: number | string, b?: number | string): number {
//     a = a ? a : 1;
//     b = b ? b : 1;
//     return +a + +b;
//   }
// }
// // 비트연산자(or)

// const myMath: IMyMath = new MyMath();
// myMath.add();

// type TStudent = {
//   name: string;
//   age: number;
//   [key: string]: any;
// };

// const student = { name: "방지완", age: 29 };
// const key: keyof TSudent = "name";
// console.log(student[key]);

// export interface ICompoent {}

// type State = {
//   [key: string]: any;
//   // name: string;
// };

// export interface IComponent {
//   setState(newState: State): void;
//   componentDidMount(): void;
//   componentDidUpdate(): void;
//   componentWillUnmmount(): void;
//   render(): void;
// }
