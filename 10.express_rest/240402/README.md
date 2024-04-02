# CSR

- Client Side Rendering
- 브라우저에서 HTML을 완성한다. 수정한다.

# SSR

- Server Side Rendering
- Server에서 HTML을 완성해서 보낸다.

# Router()에 대하여

<!-- - exports.Router = require("./router"); (코드를 타고 정의부로 링크를 탄 결과)(현재 디렉터리는 express 모듈을 기준으로 한다.)
- 거기에는 Route = require("./router/route) 또한 있었다.
- Route와 Router이 있으며, Route는 이것이다.

function Route(path) {
  this.path = path;
  this.stack = [];

  debug('new %o', path)

  // route handlers for various http methods
  this.methods = {};
}

- debug 함수는 찾아봤더니, 함수를 반환하는 함수로
- 함수가 실행될때마다의 시간 차이를 메시지와 함께 출력한다.
- 잘못 찾은것 같다. 둘은 다른 것 -->

- ./route의 함수는 이것이다.(route/index.js의 파일)

var proto = module.exports = function(options) {
var opts = options || {};

<!-- 위는 옵션의 선택  -->

function router(req, res, next) {
router.handle(req, res, next);
}

<!-- 핸들러로 보내준다. -->

// mixin Router class functions
setPrototypeOf(router, proto)

<!-- proto는 router의 프로토타입이 된다? -->
<!-- proto의 객체와 함수들을 이용한다. -->

router.params = {};
router.\_params = [];
router.caseSensitive = opts.caseSensitive;
router.mergeParams = opts.mergeParams;
router.strict = opts.strict;
router.stack = [];

return router;

<!-- 마지막에는 router함수를 리턴. 함수가 값으로 취급되는 js기에 이것이 가능하다. -->
<!-- 함수를 리턴하는 함수이며 함수에는 각종 값들이 저장된다. handle은 use, set, get, post 같은 함수들로 추정, 그리고 밑의 코드를 확인했을때 함수가 스택 위쪽의 변수들은 스택 외에 저장된다. 그리고 스택에는 layer 객체들이 쌓이며 함수에 대한 값들이 저장, 결국 Router() 함수의 기능은 사실상 가져오는 것이 아니라. 마치 저장하는 것에 가깝다. 그러니까 Router은 저장하는 함수를 만드는 것이고, use함수를 이용해서 층을 쌓아주고 마치 라이브러리를 이용하는 것처럼 .js 파일들을 통합해준다.

그러니까 사실상 일반적인 require 예약어의 강화판라고 이해하면 되지 않을까 생각한다.-->

};

<!-- 밑은 handler에 handler 함수를 추가했다.-->
<!-- proto는 중첩함수며, handle -->

<!-- 이곳은 board.js 이용 -->

[Function: router] {
params: {},
\_params: [],
caseSensitive: undefined,
mergeParams: undefined,
strict: undefined,
stack: []
}

<!-- 전과 후 -->

[Function: router] {
params: {},
\_params: [],
caseSensitive: undefined,
mergeParams: undefined,
strict: undefined,
stack: [
Layer {
handle: [Function: bound dispatch],
name: 'bound dispatch',
params: undefined,
path: undefined,
keys: [],
regexp: /^\/?$/i,
      route: [Route]
    },
    Layer {
      handle: [Function: bound dispatch],
      name: 'bound dispatch',
      params: undefined,
      path: undefined,
      keys: [],
      regexp: /^\/?$/i,
route: [Route]
},
Layer {
handle: [Function: bound dispatch],
name: 'bound dispatch',
params: undefined,
path: undefined,
keys: [],
regexp: /^\/like\/?$/i,
route: [Route]
}
]
}

<!-- 완벽하게는 코드를 까보지 않고선 알 수 없지만, 해당 함수는 함수들이 입력될 때마다, 그걸 스택에 Layer객체로 쌓아준다. 그리고 밑의 코드와 같이 보면 마치 객체 안의 객체처럼 Router를 통해 함수들을 쌓을 때마다 겹겹이 쌓아준다는 사실을 알 수 있다. -->

<!-- 밑은 index.js이용 -->

[Function: router] {
params: {},
\_params: [],
caseSensitive: undefined,
mergeParams: undefined,
strict: undefined,
stack: []
}

<!-- console.log router.use("/board", board) 실행 전과 후의 차이-->

[Function: router] {
params: {},
\_params: [],
caseSensitive: undefined,
mergeParams: undefined,
strict: undefined,
stack: [
Layer {
handle: [Function],
name: 'router',
params: undefined,
path: undefined,
keys: [],
regexp: /^\/board\/?(?=\/|$)/i,
route: undefined
}
]
}

<!-- 자세히 까보진 않았지만 Router 함수는 대략적인 짐작이 가능한게
매개변수로  -->

<!-- 그리고 app 객체를 출력해보니 -->

\_router: [Function: router] {
params: {},
\_params: [],
caseSensitive: false,
mergeParams: undefined,
strict: false,
stack: [
[Layer], [Layer],
[Layer], [Layer],
[Layer], [Layer],
[Layer]
]
}

  <!-- _router속성이 추가됐다. 그리고 추가적으로 확인할 수 있었던 사실은 분명히 겹겹히 쌓였던 코드인데, app객체에선 모두 수평적으로 펼쳐졌다는 것이다. 그렇다는건 정확한 원리는 코드를 뜯어보지 않는 이상 모르지만, router함수에 함수들을 마치 객체처럼 추가하며 exports되고 겹겹히 쌓아주며, app 객체까지 도달하게 되면 그 코드들을 수평적으로 펼쳐서 저장해준다는 사실이다.
  
  이로써 왜 이 코드가 불러오는 함수들로 쓰일 수 있는지 유추해보는걸 끝냈다.
  
  인터넷에서는 그냥 쓰라는 식으로만 돼있어서 라이브러리 추적하며 한참 찾았다.-->
