const { search } = require('.');
const pool = require('../../config/dbconnection');
const {createToken,jwtId}  = require('../../jwt')


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
  console.log(req.body,'asd')
    let connection;
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            const { userid, userpw } = req.body;
            const sql = `INSERT INTO USER (user_id, user_pw) values(?,?);` 
            const params = [userid, userpw]
            const [result] = await connection.execute(sql, params)

            const user_idx = result.insertId;
            const assetSql = `INSERT INTO ASSET (user_idx, input, output) values(?,?,?)`
            const assetParams = [user_idx, 1000000, 0] //sql과 함께 바꿔야 함
            const [assetResult] = await connection.execute(assetSql, assetParams)
            
            console.log(assetResult)

            const data = {
                success: true,
                userid: userid,
                userpw: userpw,
            }
            console.log(data,'data')

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
            const [result] = await connection.execute(sql, params)
            // const myAsset = calcAsset(connection,user_idx);
            console.log('zzz',result)
            if(result.length == 0){ //회원정보 없으면
                console.log('회원정보 없음')
                data = { 
                    success: false,
                    isLogin: false, 
                }
                res.json(data)
            } else{ // 있으면
                console.log('회원정보 있음')
                const user_id = result[0].user_id
                const user_idx = result[0].id  
                    console.log('dlTdma')
                    data = { 
                        success: true,
                        isLogin: true, 
                        userid: user_id, 
                        user_idx
                    }
                // 쿠키 관련
                const access_token = createToken(user_idx)
                res.cookie('aguhToken', access_token, { httpOnly: true, secure: true })
                res.json(data)
            }
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
    console.log('logout')
    res.clearCookie('aguhToken', { path: '/' })
    const data = {
        isLogin: false,
    }
    res.json(data)
}


const txHistory = async (req, res) => {
    let connection; 
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            let data = {}
            const { userid } = req.body; // order_list
            let { searchType } = req.body

            const useridSql = `SELECT * FROM user WHERE user_id = ? `
            const useridParams = [userid]
            const [useridResult] = await connection.execute(useridSql, useridParams)
            if(useridResult.length == 0){
                data = {
                    success:false,
                    msg: '잘못된 접근입니다.',
                    quote: '로그인 상태인데 db에서 해당 id를 못가져옴'
                }
                res.json(data)
            } else{
                let srcInterval
                switch(searchType){
                    case '1day':
                    srcInterval = '1 day'
                    break;
                    case '7day':
                    srcInterval = '7 day'
                    break;
                    case '1month':
                    srcInterval = '1 month'
                    break;
                    case '3month':
                    srcInterval = '3 month'
                    break;
                    case '6month':
                    srcInterval = '6 month'
                    break;
                }

                const user_idx = useridResult[0].id; 
                // userid가 없으면 임의 로 user_idx 0으로 설정.
                let dataSql 
                if(srcInterval == undefined || 
                    srcInterval == null){
                    dataSql = `SELECT * FROM order_list 
                    WHERE user_idx = ? ;`
                } else{
                    dataSql = `SELECT * FROM order_list 
                               WHERE user_idx = ? AND
                               order_Date>date_add(now(),interval - ${srcInterval});` // del=1 취소된 거래에 대한 내용.
                }
                const dataParams = [user_idx]
                const [result] = await connection.execute(dataSql, dataParams)
                data = {
                    success: true,
                    txList: result[0],
                }
                res.json(data);
            }
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

const outstandingLog = async (req, res) => {
    const Token = req.cookies.aguhToken;
    if (Token == undefined) {
        const data = {
            success: false,
            error: '접근권한이 없습니다'
        }
        res.json(data)
    } else {
        const client = jwtId(Token)
        if (id != client) {
            const data = {
                success: false,
                error: '접근권한이 없습니다'
            }
        res.json(data)
        }
        else{
            let connection; 
            try {
                connection = await pool.getConnection(async conn => conn);
                try {
                    let data = {}
                    const { userid } = req.body; // order_list
                 
                    const useridSql = `SELECT * FROM user WHERE user_id = ? `
                    const useridParams = [userid]
                    const [useridResult] = await connection.execute(useridSql, useridParams)
                  
                    const user_idx = useridResult[0].id;
                    const dataSql = `SELECT * FROM order_list WHERE user_idx = ? AND leftover > 0`
                    const dataParams = [user_idx]
                    const [result] = await connection.execute(dataSql, dataParams)
                    console.log(result)
                    data = {
                        success: true,
                        txList: result,
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
    }
}


module.exports = {
    idCheck,
    createUser,
    loginUser,
    logoutUser,
    txHistory,
    outstandingLog,
}
