# 🚀 Welcome to your new awesome project!

This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application


# Babel

- 코드 변환 -> 컴파일러
- ts, ES6 등등 브라우저 등이 읽지 못할 코드를 읽을 수 있는 JS, ES5로 변환해준다.

# Webpack

- HTML, CSS, JS 등등을 모두 하나로 묶어서 내보내준다.
- 번들링 라이브러리
- TS 가능, Babel을 의존성으로 가진다.
- 여러 라이브러리를 함께 사용해서 하나의 묶음으로 내보낼 수 있다.
- 난독화를 포함 -> 애초에 사람이 읽을 수 없게 만든다.

## Test

```bash
npm init -y
npm i -D webpack webpack-cli

npx webpack --mode=development
npx webpack --mode=production

npx webpack init
```