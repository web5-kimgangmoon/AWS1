// 자바에서 인터넷 통신을 위해 자주 쓰이는 generic
// 자바에서는 애초에 배열 안에 다양한 자료형을 쓸 수가 없다.
// 자바에서는 자료형을 자유롭게 받을 수 없었기에 generic이 필요했다.

// 근데 솔직히 자료형이 자유로운 js에서 굳이 써야하나 싶긴 하다.

class Test<T, G> {
  list: T[] = [];
  temp1: T;
  constructor(temp1: T) {
    this.temp1 = temp1;
  }
  setTemp(temp1: T) {
    this.temp1 = temp1;
  }
}

new Test<number, String>(4123123);

export {};
