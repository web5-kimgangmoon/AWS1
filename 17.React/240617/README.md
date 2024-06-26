# 수업 내용

- 교과목 : (전공)프론트엔드 프로그램 개발하기
- 능력단위 : UI 구현
- 교재 : NCS 학습모듈 - 2

```bash
npm init -y
npm i -D webpack webpack-cli
npx webpack init
y
Typescript
y
y
n
SASS
y
y
only for Production
y
npm
```

# 객체지향 (Object oriented programming)

- SOLID

5원칙

## S - SRP

- single responsibility principle단일 책임 원칙
  하나의 모듈은 하나의 책임만 지니고 있다.

## O - open-closed principle

- 확장에는 열려있고, 수정에는 닫혀있다.
  (setter, getter)(디자인 패턴에 이용됨)

## L - LSP

- liskov substitution principle
  상위 타입의 객체를 하위 타입의 객체로 치환해도 상위 타입을 사용하는 프로그램은 정상적으로 동작해야 한다.

## I - ISP

- Interface segregation principle
  클라이언트는 자신이 사용하는 메소드에만 의존해야 한다.

## D - DIP

- Dependency inversion principle
  상속관계가 역전하면 안된다.
  (역참조를 해선 안된다.)
