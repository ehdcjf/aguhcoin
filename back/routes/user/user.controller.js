const pool = require('../../config/dbconnection');
// const createToken = require('../../jwt');
// const jwtId = require('../../jwtId')

// 아이디 중복 검사
const idCheck = async (req, res) => { 
    let connection;
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            const { userid } = req.body // post로 userid 받아오기
            const sql = `SELECT COUNT(user_id) as count,user_id FROM user WHERE nickname=?`
            // SELECT * from users where userid = ?
            const params = [userid]
            const [[result]] = await connection.execute(sql, params)
            let data = {
                success: false,
            }
            if (result.count == 0 || result.user_id == userid) { // user_id, userid 상황에 따라 변경 필요
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
            const { userid, userpw } = req.body;
            const sql = `INSERT INTO USER (user_id, user_pw) 
            values(?,?)` //임시데이터
            const params = [userid, userpw]
            const [result] = await connection.execute(sql, params)
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
            const data = {}
            const { userid, userpw } = req.body;
            const sql = `SELECT userid, userpw FROM user WHERE userid = ?, userpw = ?`
            const params = [userid, userpw]
            const result = await connection.execute(sql, params)
            console.log(result)
            if(result.count == 0){
                data = { login: false }
            } else{
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


// const deleteUser = async (req, res) => {
//     const { id } = req.query;
//     const AccessToken = req.cookies.AccessToken;
//     if (AccessToken == undefined) {
//         const data = {
//             success: false,
//             error: '접근권한이 없습니다'
//         }
//         res.json(data)
//     } else {

//         const client = jwtId(AccessToken)
//         if (id != client) {
//             const data = {
//                 success: false,
//                 error: '접근권한이 없습니다'
//             }
//             res.json(data)
//         } else {
//             let connection;
//             try {
//                 connection = await pool.getConnection(async conn => conn);
//                 try {
//                     const sql = `UPDATE user SET state=1,kakao_code=NULL WHERE user_id=? ;`
//                     const params = [id]
//                     const [result] = await connection.execute(sql, params)
//                     const data = {
//                         success: true,
//                         result: result,
//                     }
//                     res.json(data);
//                 } catch (error) {
//                     console.log('Query Error');
//                     console.log(error)
//                     const data = {
//                         success: false,
//                         error: error.sqlMessage
//                     }
//                     res.json(data)
//                 }
//             } catch (error) {
//                 console.log('DB Error')
//                 console.log(error)
//                 const data = {
//                     success: false,
//                     error: error.sqlMessage
//                 }
//                 res.json(data)
//             } finally {
//                 connection.release();
//             }
//         }
//     }
// }



const logoutUser = (req, res) => {
    res.clearCookie('AccessToken', { path: '/' })
    const data = {
        isLogout: true,
    }
    res.json(data)
}



module.exports = {
    idCheck,
    createUser,
    loginUser,
    // updateUser,
    // deleteUser,
    logoutUser,
}




const hideInfo = (data) => {
    let temp = { ...data };
    const show = data.show;
    for (let i = 0; i < 5; i++) {
        if (!(show & (1 << i))) {
            switch (i) {
                case 0:
                    temp.gender = null;
                    break;
                case 1:
                    temp.birth = null;
                    break;
                case 2:
                    temp.hometown = null;
                    break;
                case 3:
                    temp.residence = null;
                    break;
                case 4:
                    temp.vote_19th = null;
                    temp.vote_list = null;
                    break;
                

                default:
                    break;
            }
        }
    }

    return temp
}