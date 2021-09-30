module.exports = (sequelize, DataTypes)=>{
  const Assets = sequelize.define('asset',{
    input:{
      type:DataTypes.STRING(255),
      allowNull:false,
    },
    output:{
      type:DataTypes.STRING(10),
      allowNull:false,
    },
    reg_date:{
      type:DataTypes.DATE,
      allowNull:false,
    }
  },{
    timestamps:false,
    underscored:false,
    paranoid:false,
    modelName:"asset",
    tableName:"asset",
    charset:"utf8mb4",
    collate:"utf8mb4_general_ci"
  })

  Assets.associate = (models)=>{
    Assets.belongsTo(models.User),{
      onDelete:'cascade',
      foreignKey:{
        allowNull:true,
      }
    }
  }

  return Assets
}

//sequelize-cli model:generate --name:User2 --attributes userid:string,userpw:string,username:string