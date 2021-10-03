const pool = require('../../config/dbconnection');
// const createToken = require('../../jwt');
// const jwtId = require('../../jwtId')

// 아이디 중복 검사
const idCheck = async (req, res) => { 
    let connection;
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            const { userid } = req.query // post로 userid 받아오기
            console.log(req.query)
            const sql = `SELECT * FROM user WHERE user_id=?`
            const params = [userid]
            const result = await connection.execute(sql, params)
            let data = {
                success: false,
            }
            console.log(result[0].length == 0)
            if (result[0].length == 0) { // user_id, userid 상황에 따라 변경 필요
                data.success = true;
            }
            res.json(data);
        } catch (error) {
            console.log('Query Error');
            console.log(error)
            const data = {
                success: null,
                error: "부적절한 입력입니다.",
            }
            res.json(data)
        }
    } catch (error) {
        console.log('DB Error')
        console.log(error)
        const data = {
            success: null,
            error: `${error}: 관리자에게 문의해주세요.`,
        }
        res.json(data)
    } finally {
        connection.release();
    }
}

//============회원가입
const createUser = async (req, res) => { 
  console.log(req.body)
    let connection;
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            const { userid, userpw, username } = req.body;
            const sql = `INSERT INTO USER (user_id, user_pw) 
            values(?,?);
            ` 
            const params = [userid, userpw, username]
            const [result] = await connection.execute(sql, params)

        
            const user_idx = result.insertId;
            const assetSql = `INSERT INTO ASSET (user_idx, input, output, regdate) 
            values(?,?,?,now())`
            const assetParams = [user_idx, input, output, regdate] //sql과 함께 바꿔야 함
            const [assetResult] = await connection.execute(assetSql, params)

            console.log(userid, userpw)
            // const access_token = createToken(user_id)
            const data = {
                success: true,
                userid: userid,
                userpw: userpw,
            }
            // res.cookie('AccessToken', access_token, { httpOnly: true, secure: true })
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


//====================로그인
const loginUser = async (req, res) => { 
    let connection; 
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            let data = {}
            const { userid, userpw } = req.body;
            console.log(req.body)
            const sql = `SELECT * FROM user WHERE user_id = ? AND user_pw = ?`
            const params = [userid, userpw]
            const result = await connection.execute(sql, params)
            console.log('zzz',result)
            if(result[0].length==0){
                console.log('djqtdma')
                data = { login: false }
            } else{
                console.log('dlTdma')
                data = { login: true }
            }
            // 쿠키 관련
            // res.cookie('AccessToken', token2, { httpOnly: true, secure: true })
            // req.session.isLogin = true;


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

const logoutUser = (req, res) => {
    res.clearCookie('AccessToken', { path: '/' })
    const data = {
        isLogout: true,
    }
    res.json(data)
}


const txHistory = async (req, res) => {
    console.log(req.body)
    let connection; 
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            let data = {}
            const { userid } = req.body; // \`order\`
            console.log(req.body)
            const useridSql = `SELECT * FROM user WHERE user_id = ? `
            const useridParams = [userid]
            const [useridResult] = await connection.execute(useridSql, useridParams)
            const user_idx = useridResult.insertId;

        
            
        } catch(e){ console.log(e) }
    } catch(e){ console.log(e) }
}
const outstandingLog = async (req, res) => {

}

module.exports = {
    idCheck,
    createUser,
    loginUser,
    logoutUser,
    txHistory,
    outstandingLog
}
