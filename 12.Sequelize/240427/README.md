# sequelize.findAll 함수에 대해

findAll로 값을 받아 그 값을 그대로 대입한다. 그전에는 그렇게 써먹었기에 아무 문제가 없었다.

그러나 시험을 보면서, 테이블에는 없는 값을 객체에 함께 넣어 사용해야 됐고, 그러면서 문제가 발생했다. 그것은 아무리 객체 안에 값을 집어넣어도 undefined로 뜨는 것이었다.

2시간 가까이 헤매고, 인터넷을 뒤지고 해보고 console.log도 돌려보고, 개인적으로 고민도 해본 결과 이런 결론에 도달했다.

findAll이 반환하는 것은 SequelizeInstance 클래스에 의해 생성된 클래스 인스턴스이며, 우리가 편리하게 쓸 수 있는 것은 단순히 그게 가능하도록 함수를 오버라이딩해 설정해 둔 것 뿐이라는 것을.

.이나 []도 일종의 함수로 취급받고, 이것들을 오버라이딩해서 새로운 함수를 만들 수 있다. 물론 굳이 그렇게 하기보단 새로운 함수를 만들어 쓰지만, sequelize는 이 연산자들을 오버라이딩해서 쓰고 있기에 편리하게 사용할 수 있는 것이었다.

하지만 당연히 객체가 아니므로 단순한 구조의 객체처럼은 쓸 수 없다. 예를 들어, 스프레드 연산자를 이용했더니, 새로운 SequelizeInstance를 깊은 복사로 반환할 뿐이었고, 내가 원했던 단순한 구조의 키, 값의 객체를 반환해주진 않았다.

그러므로 SequelizeInstance 클래스의 객체 그 자체를 보내는 경우가 아니면, 번거롭더라도 스프레드 연산자나 그 자체에 값을 추가하지 말고 일일이 값을 반환받아 새로운 객체를 만들어주자.

추가: for-of를 이용했을 때는 다행히 받을 수 있었다.

ps.여담으로 그룹함수로 붙인 별칭이 아닌 일반 필드에 별칭을 붙이면 res.send로 출력해받을 때는 제대로 받을 수있지만, 값을 전달할 때는 .나 []연산자로 값을 반환받지 못했다. 일반 필드 값에는 별칭을 붙이지 말기로 하자.

ps. 별칭을 붙여도 찾을 수 있는 방법을 찾았다. get 메소드를 이용하면 별칭을 지닌 값도 얻을 수 있다.

추가적으로 await 키워드와 if를 함꼐 쓰지 말자, 왠지 실행이 안된다.

따라 쳐보고 그 객체 자체만으로는 써봤는데, 자세히 들여다 보진 못했다.
시험에선 모르고 썼는데, console.log좀 찍어볼걸 그랬다.
