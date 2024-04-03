# 정규표현식

- 여유가 있다면 정규표현식을 공부하자

옹알이 문제

내가 짠 코드

function solution(babbling) {
var answer = 0;
let temp;
const words = ["aya", "ye", "woo", "ma"];
babbling.forEach((item)=> {
temp = item;
words.forEach((elem) => {
temp = temp.replace(elem, " ");
})
temp = temp.trim();
if(!temp) answer++;
})
return answer;
}

사람들이 짠 코드

function solution(babbling) {
var answer = 0;
const regex = /^(aya|ye|woo|ma)+$/;

babbling.forEach(word => {
if (regex.test(word)) answer++;  
 })

return answer;
}

실행시켜보니 명백하게 밑의 코드가 더 빨랐다.

정리의 출처: https://velog.io/@anjaekk/%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D-%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D%EC%9D%98-%EC%9D%98%EB%AF%B8

3. 정규표현식의 패턴

1) 기본패턴
   패턴 설명 예시 예시설명
   ^(캐럿) 시작하는 문자열 찾음 ^W 'W'로 시작하는 문자열 찾기
   $(달러)	끝나는 문자열 찾음	W$ 'W'로 끝나는 문자열 찾기
   .(애니) 문자 or 숫자 or 공백 하나 ... 문자열 길이가 3글자 이상인 것을 찾기
   [](브라켓) []안에 있는 문자열 찾음 [dH]. 'd+문자(.)' or 'H+문자(.)' 문자열 찾기
   -(레인지) 해당하는 범위의 문자열 찾음 A-C 'A'부터 'C'까지
   [^문자](부정) 괄호 안에 문자를 포함하지 않는 문자열 찾음 [^ABC] 'A' or 'B' or 'C'를 제외한 문자열 찾기
2) 서브패턴
   패턴 설명 예시 예시설명
   (|)(or) 또는 (on|yes|day) 'on' or 'yes' or 'day' 문자열 찾기
3) 수량자(Quantifiers)
   수량자(Quantifiers): 어떠한 패턴이 얼만큼 등장하는가
   수량자 설명 예시 예시설명

- 0개 이상 나타나는 문자 a\*b 'a'가 앞에 있을수도있고 여러개 있을수도 있고 'b'도 뒤에 있을수도 있고 여러개 있을 수도 있음 'aab', 'ab', 'b'모두 가능

* 1이상 나타나는 문자 a+b 'a'가 한개이상, 'b'도 한개 이상 있어야 함
  ? 없거나 1개인 경우 a?b 'a'가 없거나 한개, 'b'가 없거나 한개
  {m,n} m회 이상 n회 이하 나타나는 문자 [els]{1,3} 'e' or 'l' or 's'가 1개 이상 3개 이하
  ? 없거나 1개인 경우 a?b 'a'가 없거나 한개, 'b'가 없거나 한개

4. 패턴의 활용
   패턴 설명
   r.*? *뒤에 '?' 오면(수량자 뒤에 ?가 오면) \*수량자의 가장 최소단위인 '0'을 뜻함 즉, r뒤에 '.'은 0이라는 뜻이라서 오직 'r'만 나타냄
   r.+? '+' 수량자의 가장 최소 단위인 1을 나타냄 즉, 'r'과 'r' 다음 나오는 문자 하나
   r.?? '?'의 최소단위인 0을 나타내면서 오직 'r'만 나타냄
