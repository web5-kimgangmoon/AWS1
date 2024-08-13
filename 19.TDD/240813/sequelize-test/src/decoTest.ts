function info(constructor: Function) {
  console.log(constructor);
}

function log(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<any>
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Method ${String(propertyKey)} was Called`);
    console.log(args);
    return originalMethod.apply(this, args);
  };
}

function readOnly(target: Object, propertyKey: string | symbol) {
  let value = target[propertyKey as keyof Object];

  Object.defineProperty(target, propertyKey, {
    configurable: true,
    // ...target,
    get() {
      return value;
    },
    set(newValue) {
      if (value === undefined) value = newValue;
      else throw new Error("오버라이딩 학습 중");
    },
  });
}

@info
// @log
class Test {
  @readOnly
  value1: number = 1;

  @log
  sayHello(name: string) {
    console.log(`Hello ${name}`);
  }
}

const test1 = new Test();
test1.sayHello("AWS");
console.log(test1.value1);
// test1.value1 = 4;
