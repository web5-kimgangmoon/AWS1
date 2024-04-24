# (GROUP BY) 그룹화를 통해 그룹으로 묶어준다.

그룹화된 상태에선 개개의 속성을 알아낼 수 없다.
SELECT COUNT(age) AS age FROM user*info;
select address, COUNT(*) AS cnt FROM user*info GROUP BY address;
SELECT address, COUNT(*) AS cnt FROM user_info GROUP BY address ORDER BY cnt DESC;

### (HAVING) 그룹화된 그룹을 처리하는데 쓰는 조건

SELECT address, COUNT(\*) AS cnt FROM user_info GROUP BY address HAVING cnt=1;

(underscored 옵션을 설정해두면 field명을 기준으로 대문자 뒤에 \_(underbar)를 넣어준다.)
SELECT uc.id, uc.user_Id, uc.pw, uc.phone, ui.name, ui.nick, ui.age, ui.address
FROM user_crypto AS uc
INNER JOIN user_info AS ui ON uc.id=ui.id;

### (sub query) 가급적 사용을 자제해야 하는 이유

전체 쿼리문(query)는 main이라고 부른다.

우리 입장에서는 요청을 한 번 보내지만, mysql에서는 작업을 두 번 처리한다.
SELECT \* FROM user_info WHERE age >= (SELECT age FROM user_info WHERE name="방지완");

### (LIMIT)

가져오는 SELECT의 테이블의 갯수에서 제한된 범위를 보여준다.
SELECT \* FROM user_info LIMIT 1, 2;

### etc

SELECT
post._, COUNT(recommend._) AS rec_cnt
FROM post LEFT JOIN recommend
GROUP BY recommend.post_id
ORDER BY rec_cnt;
