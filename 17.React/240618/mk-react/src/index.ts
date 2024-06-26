import App from "./App";

new App(document.getElementsByTagName("div")[0]);

console.log("Hello World!");

// num = 1; <<

let numStr: string = "1";
//console.log(num==numStr);
// Type에 대해서 정확하고 && 명확하게

let Obj: { a: number; b: string } = {
  a: 1,
  b: "1",
  // c:"testing", << 위에서 얘기하는 Type에 포함되지 않는다.
};

let obj2: any = {
  a: 1,
  b: "1",
  c: "testing",
};

function add(a: number, b: number): number {
  return a + b;
}

let obj3: unknown; // any 이외에 다른 타입을 할당할 수 없다.
// any : 모든 타입을 할당할 수 있다.

type Test = {
  a: number;
  b: string;
};
type Test2 = Test & {
  c: Function;
};

let test: Test;
let test1: Test2 = { a: 1, b: "1", c: (): void => {} };
let test2: Test;
let test3: Test;

// interface ITestClass {
//   getA(): number;
//   getB(): string;
// }
// class TestClass implements ITestClass {
//   a: number;
//   b: string;
//   constructor() {
//     this.a = 1;
//     this.b = "123";
//   }
//   getA = (): number => {
//     return this.a;
//   };
//   getB = (): string => {
//     return this.b;
//   };
// }

class TestClass {
  private a: number;
  private b: string;
  constructor() {
    this.a = 1;
    this.b = "123";
  }
  getA = (): number => {
    return this.a;
  };
  getB = (): string => {
    return this.b;
  };
}
const testClass = new TestClass();
// 업캐스팅의 일종, 멤버의 갯수가 제한되어 private같은 효과를 낸다.
// getter, setter

console.log(testClass.getA());
console.log(testClass.getB());
// 결합도, 응집도 => 객체지향

class Person {
  private name: string;
  private className: string;
  constructor(name: string, className: string) {
    this.name = name;
    this.className = className;
  }
  getName(): string {
    return this.name;
  }
  getClassName(): string {
    return this.className;
  }
}
class Student extends Person {
  //   company: string;
  constructor(name: string, className: string) {
    super(name, className);
    // this.company = company;
  }
}
class Company extends Student {
  company: string;
  constructor(name: string, className: string, company: string) {
    super(name, className);
    // this.company = company;
    this.company = company;
  }
}
// interface ITeacher extends Person {
//   getJob(): string;
// }
// class Teacher implements ITeacher {
//   //   name: string;
//   //   className: string;
//   job: string;
//   constructor(name: string, className: string, job: string) {
//     super(name, className);
//     this.job = job;
//   }
//   getJob(): string {
//     return this.job;
//   }
// }
// const ljb = new Student("이정배", "AWS");
// const jkh = new Teacher("정경훈", "AWS", "교수");
// // const jkh = new Teacher("");

// const arr: Array<Person> = [ljb, jkh];
// arr.push(ljb);
// arr.push(jkh);
// console.log(arr);
// jkh.getJob();
// (arr[1] as ITeacher).getJob;
// [[]];
