const pool = require('../../config/dbconnection');


//우선 내가 100원에 10개 팔기로 했는데 동시에 내가 100원에 10개 사기로 했다면. 못하게 해야되고. 
// 내가 100원에 10개 사기로 했는데, 내가 100원에 10개 팔고 있으면 그것도 막아줘야됨. 

//내가 100원에 10개 팔려고 했다면 나한테 코인이 10개 있는지 확인. 
//내가 100원에 10개 사려고 했다면 나한테 1000원이 있는지 확인. 


const createOrder = async(req,res)=>{
  const {userid,qty,price,type} =req.body;

  let connection;
    
  try {
      connection = await pool.getConnection(async conn => conn);
      try {
          const sql = `INSERT INTO USER (kakao_code,nickname,hometown,residence,gender,birth,image,vote_19th) 
          values(?,?,?,?,?,?,?,?)`
          const params = [kakao, nickname, hometown, residence, gender, birth, image, vote19]
          const [result] = await connection.execute(sql, params)
          const user_id = result.insertId;

          const voteSQL = `INSERT INTO vote_result (user_id,vote_id,politician_id) value (?,?,?)`;
          const voteParams = [user_id, vote_id, vote20]
          const [vote] = await connection.execute(voteSQL, voteParams)

          const access_token = createToken(user_id)
          const data = {
              success: true,
              nickname: nickname,
              image: image,
              user_id: user_id,
          }
          res.cookie('AccessToken', access_token, { httpOnly: true, secure: true })
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
  createOrder
}