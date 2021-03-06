import {DataTypes} from 'sequelize';
import sequelize from '../databaseConfig';
import bcrypt from 'bcrypt';
import Message from './Message';

const User = sequelize.define('user', {
  username:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
},{
  freezeTableName:true,
  },
);

User.hasMany(Message);

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
})

module.exports = User;


