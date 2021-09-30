module.exports = (sequelize, DataTypes)=>{
  const User = sequelize.define('user',{
    user_id:{
      type:DataTypes.STRING(50),
      allowNull:false,
    },
    user_pw:{
      type:DataTypes.STRING(50),
      allowNull:false,
    },
    user_name:{
      type:DataTypes.STRING(10),
      allowNull:false,
    }
  },{
    timestamps:false,
    underscored:false,
    paranoid:false,
    modelName:"user",
    tableName:"user",
    charset:"utf8mb4",
    collate:"utf8mb4_general_ci"
  })

  User.associate = (models)=>{
    User.hasMany(models.Assets),{
      onDelete:'cascade',
      foreignKey:'userid'
    }
  }

  return User
}

//sequelize-cli model:generate --name:User2 --attributes userid:string,userpw:string,username:string