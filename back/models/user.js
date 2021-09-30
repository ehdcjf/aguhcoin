module.exports = (sequelize, DataTypes)=>{
  const User = sequelize.define('user',{
    userid:{
      type:DataTypes.STRING(50),
      allowNull:false,
    },
    userpw:{
      type:DataTypes.STRING(50),
      allowNull:false,
    },
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