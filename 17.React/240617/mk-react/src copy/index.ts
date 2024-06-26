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

let obj3: unknown;
