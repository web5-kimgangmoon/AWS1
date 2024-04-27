# 평가 문제

- DB.drawio 참고

### 현재 기능

- 회원가입
- 로그인
- 글쓰기(카테고리는 자유로 고정됨)
- 글 보기
- 추천 | 비추천

subList.js(Model)

```sql
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SubList extends Model {
    static init() {
      return super.init(
        {
          id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
          },
        },
        {
          sequelize,
          modelName: "SubList",
          tableName: "sub_list",
          timestamps: false,
          paranoid: false,
          underscored: true,
        }
      );
    }
    static associate(db) {}
  }
  return SubList.init();
};
```

topList.js(Model)

```sql
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TopList extends Model {
    static init() {
      return super.init(
        {
          id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            autoIncrement: true,
          },
          img: {
            type: DataTypes.STRING(20),
          },
          name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
          },
        },
        {
          sequelize,
          modelName: "TopList",
          tableName: "top_list",
          timestamps: false,
          paranoid: false,
          underscored: true,
        }
      );
    }
    static associate() {}
  }
  return TopList.init();
};
```
