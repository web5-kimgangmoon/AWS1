# cookie-parser

- 쿠키는 기간설정을 정해둬야한다.
- 기간설정이 안된 쿠키는 삭제되지 않는다.

- package.json을 기준으로 하나의 프로젝트가 결정되며, 그 상위로 올려서는 안된다.
- static은 해당 폴더명을 기준으로 그 하위 폴더는 불러오지 못한다. 만약 연결시켜주고자 하면, path.join 함수를 이용해야하며,

- next() 함수에 의해 res, req 값들을 다음으로 넘겨주기 때문에 순서만 조심하면 res(값을 가진 매개변수(할당된 상태))나 req에 값을 할당해 줄 수 있다. 단, cookies나 body, headers처럼 이미 할당되어 있는 객체들에 값을 주면, 재할당이 이뤄지며 http의 응답과 관련된 정보들이 덮여버리기 때문에 할당해주어선 안된다.

# multer

- multer.array() 혹은 multer.single()로 파일을 저장한다.
- req의 single일 경우는 file에, array일 경우는 files 저장한다.
- 서버로 보낼때의 정보, html의 name 값과 multer의 fieldname의 값이 동일하지 않으면 파일을 받을 수 없다.

# static more test

- 문득 static 기능을 쓰다가 궁금해졌다. static을 통해 우리는 우리가 원하는 경로로 맞춰준다. 그렇다면 static 기능의 매개변수는 무얼 기준으로 경로를 찾아주는가.

그래서 여러가지 상황을 만들고 몇 차례 코드를 실행해봤다.

사용한 코드는 이렇다.

```js
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
const multer = require("multer");

const router = require("./router");

const app = express();
app.set("port", process.env.PORT || 3000);
app.use((req, res, next) => {
  if (process.env.NODE_ENV == "deploy") morgan("combined")(req, res, next);
  else morgan("dev")(req, res, next);
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 실제로 쓰인 코드
app.use(express.static("public"));
// app.use(express.static("ss"));
app.use("/findFIle", express.static("/findFile"));
//

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "template"));
const upload = multer({
  Storage: multer.diskStorage({
    destination: (req, file, callback) => {},
    filename: (req, file, callback) => {},
  }),
});

app.use(router);

app.listen(app.get("port"), () => {
  console.log("server open!" + app.get("port"));
});
```

1. findFile이라는 폴더를 넣어줄 상위 디렉터리를 하나 만든다.
2. 그 안에 findFile이라는 이름을 지닌 폴더를 만든다.
3. 그후 그 안에 html 파일을 하나 넣어준다.
4. 그리고 똑같은 이름을 지닌 findFile을 현재 디렉터리에 넣어준다.
5. 그리고 실험해볼 경로를 아무거나 (나의 경우는 헷갈리지 않게 그냥 같게 넣어줬다) 써주고 static의 매개변수로 "findFile"을 사용해준다.

6. 만약 이 경우 해당 프로젝트의 경로를 static은 전부 알고 있다면, 폴더 이름이 같아도 넣어주면 순차적으로 뒤져보고 경로를 맞춰준다.
7. 그러나 static이 한정적으로 경로들의 정보를 보유한다면, 어떤 기준으로 보유할 것인가.

해당의 실험의 결과에선 경로를 찾지 못했다. 그렇다는 것은 static은 모든 경로에 대한 정보를 지니고 있진 않다는 것이다.

그래서 나는 이렇게 생각했다. 혹시 static으로 기본경로를 public으로 지정했으니까, public을 기준으로 경로를 잡고 있는 것은 아닐까? 아니면 path의 \_\_dirname의 경로처럼 현재의 파일을 기준으로 경로를 잡고 있는 것일까?

그래서 나는 다음에는 public의 상위 디렉터리면서, server.js의 경로에 있는 findFile의 폴더에 index.html을 넣어주고, 코드를 다시 돌려봤다.

ps. 여기서 더 눈치챈 사실이 있다. /가 들어간 매개변수, ./가 들어간 매개변수, 그냥 그 폴더명 그 자체를 넣어줬을 경우가 각각 다르다.

거기서 눈치챈 사실이 있었다. /를 통했을 경우에는 경로를 찾을 수 없었고, 현재 경로를 의미하는 ./를 통했을 경우에는 찾았고, 파일명 그 자체를 썼을 때는 찾을 수 없었다.

그리고 public 파일에 해당 파일을 폴더와 함께 넣었을 경우에는 모든 경우에 찾을 수 있었다. 그렇다면 public과 같은 경로로 부정확한 경로를 지정한 static을 미들웨어로 넣을 경우에 /경로명에 새로운 정보가 쌓일까 아니면, 정보가 덮어씌워질까 의문이 들었고, 한 번 해본 결과 여전히 /에서도 작동했다.

루트 디렉터리는 기본적으로 server.js를 기준으로 하고 새로운 경로가 추가될 경우, 하위 폴더의 정보와 ./의 정보는 남아있지만 루트 디렉터리가 바뀌게 된다는 사실을 알게 되었다.

그리고 마지막으로 public 파일에 상위 디렉터리가 존재하는 findFile 폴더에 index.html 파일을 넣고 집어넣자 그 경로를 찾지 못했다.

그래서 나는 생각했다. 루트 디렉터리가 public으로 지정됐으니, /(findFile의 상위 디렉터리명) or (findFile의 상위 디렉터리명) or ./(findFile의 상위 디렉터리명)를 매개변수로 static 미들웨어를 넣어준다면 findFile이 찾아주지 않을까하고. 그러나 실행결과 찾아주지 못했다.

그대신 현재 경로명을 제외한 모든 경로명, 즉 public/(findFile의 상위 디렉터리명)을 매개변수로 써주자 그때서야 경로를 찾아냈다.

그리고 마지막으로 findFile과는 다른 이름의 폴더를 findFile의 상위 디렉터리에 만든 후 그 폴더 안에 index.html 파일을 옮기고 요청으로 올 경로명은 그대로 유지한 후 폴더 이름만 가지고 경로를 처리해봤다. 그 경우 또 문제가 발생했다.

## 결론

path를 이용해 경로를 지정해주지 않아도 project 안의 경로라면 static 미들웨어는 알고 있었다.

server.js를 기준으로 기본 경로가 정해지며, static 미들웨어를 이용해 기본경로를 바꿔줄 순 있다. 그러나 기본경로를 바꿔준다고 해도, 그 기본경로를 기준으로 다른 경로들까지 전부 바뀌는 것은 아니다.

부가적인 기능으로 브라우저에서 받을 요청의 경로와 폴더 경로가 같을 경우는 일부 허용되는 경우도 있었다. 그러나 static으로 지정한 경로를 기준으로 또다른 static 미들웨어로 경로를 지정하자 경로를 제대로 찾지 못했다.

static을 이용해서 또다른 static을 정의하는 행동은 가급적 삼가는 편이 좋을듯하다.
경로에서 몇 단계 위의 디렉터리를 static으로 지정해주고 싶다면 기존에 추가했던 static 미들웨어를 이용하지 말고 직접 경로를 지정해주자.
