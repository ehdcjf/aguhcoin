const pool = require('../../config/dbconnection');



const createUser = async (req, res) => {

  console.log(req.body)
  let connection;
  
  try {
      connection = await pool.getConnection(async conn => conn);
      try {
          const { user_id,user_pw,user_name} = req.body;
          const sql = `INSERT INTO USER (user_id,user_pw,user_name) 
          values(?,?,?)`
          const params = [user_id,user_pw,user_name]
          const [result] = await connection.execute(sql, params)
          console.log(result)

          // const voteSQL = `INSERT INTO vote_result (user_id,vote_id,politician_id) value (?,?,?)`;
          // const voteParams = [user_id, vote_id, vote20]
          // const [vote] = await connection.execute(voteSQL, voteParams)

          // const access_token = createToken(user_id)
          // const data = {
          //     success: true,
          //     nickname: nickname,
          //     image: image,
          //     user_id: user_id,
          // }
          // res.cookie('AccessToken', access_token, { httpOnly: true, secure: true })
          const data = {
            result
          }
          res.json(data);
      } catch (error) {
          console.log('Query Error');
          console.log(error)
          const data = {
              success: false,
              error: error.sqlMessage,
          }
          res.json(data)
      }
  } catch (error) {
      console.log('DB Error')
      console.log(error)
      const data = {
          success: false,
          error: error.sqlMessage,
      }
      res.json(data)
  } finally {
      connection.release();
  }
}


module.exports={
  createUser
}