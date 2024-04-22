const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      // column, field
      user_Id: {
        field: "user_id", // column 명을 지정할 수 있다.
        type: Sequelize.STRING(50),
        allowNull: false, // default: true
        unique: true,
      },
      name: {
        type: Sequelize.STRING(10),
        allowNull: false, //default : true
        //unique: true
      },
      password: {
        type: Sequelize.STRING(64),
        allowNull: false, //default : true
      },
      age: {
        type: Sequelize.TINYINT.UNSIGNED,
      },
    },
    {
      modelName: "User", // Sequelize가 이해하는 Table 이름(모델명)
      tableName: "user", // DB에서의 Table 이름
      underscored: true, // 필드를 대문자에서 소문자로 만들어준다.
      //   createdAt: false, // default: true
      //   updatedAt: false, // default: true
      //소문자로 만들어준다.
      paranoid: true, // 삭제 시 완전 삭제가 아닌 deleted_at을 통해서 확인한다.
    }
    //옵션은 빼도 상관은 없지만, 있으면 개발자의 임의로 다양한 설정을 해줄 수 있다.
  );
};
