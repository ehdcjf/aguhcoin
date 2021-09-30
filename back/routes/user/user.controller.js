const pool = require('../../config/dbconnection');
// const createToken = require('../../jwt');
// const jwtId = require('../../jwtId')


const idCheck = async (req, res) => { // 아이디 중복 검사
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

const createUser = async (req, res) => { //회원가입
    let connection;
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            const { userid, userpw } = req.body;
            const sql = `INSERT INTO USER (userid, userpw) 
            values(?,?)` //임시데이터
            const params = [userid, userpw]
            const [result] = await connection.execute(sql, params)

            // const access_token = createToken(user_id)
            const data = {
                success: true,
                userid: userid,
                userpw: userpw,
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



const loginUser = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            const { userid, userpw } = req.body;
            const sql = `SELECT userid, userpw FROM user WHERE userid = ?, userpw = ?`
            const params = [userid, userpw]
            const result = await connection.execute(sql, params)
            if (result[0][0].state == 1) {//탈퇴했을경우
                const data = {
                    success: false,
                    error: 'quit',
                }
                res.json(data)
            } else {
                const voteSQL = `SELECT * 
                                FROM vote_result
                                NATURAL JOIN politician  
                                NATURAL JOIN vote_title
                                WHERE user_id = ?
                `
                const voteParams = [id];
                const [voteResult] = await connection.execute(voteSQL, voteParams)
                console.log(voteResult);
                let data = { ...result[0][0], success: true,vote_list:voteResult }
                if (client == id) { //본인 정보를 조회할 경우
                    data.isMine = true;
                    res.json(data);
                } else {//타인의 정보를 조회할 경우 가려줘야함. 
                    data.isMine = false;
                    res.json(hideInfo(data));
                }
            }
        } catch (error) {
            console.log('Query Error');
            console.log(error)
            if (error.errno == 1062) {
                const data = {
                    success: false,
                    error: "방금 다른 누군가가 닉네임을 가져갔습니다.\n\n닉네임을 다시 설정해 주세요."
                }
                res.json(data)
            }
            else {
                const data = {
                    success: false,
                    error: error.sqlMessage,
                }
                res.json(data)
            }
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

const updateUser = async (req, res) => {
    const { id } = req.query;
    const { nickname, residence, image, show } = req.body;
    const AccessToken = req.cookies.AccessToken;
    if (AccessToken == undefined) {
        const data = {
            success: false,
            error: '접근권한이 없습니다'
        }
        res.json(data)
    } else {
        const client = jwtId(AccessToken)
        if (id != client) {
            const data = {
                success: false,
                error: '접근권한이 없습니다'
            }
            res.json(data)
        } else {
            let connection;
            try {
                connection = await pool.getConnection(async conn => conn);
                try {
                    const sql = `UPDATE user 
                                    SET nickname=?,
                                    residence=?,
                                    image=?,
                                    user.show = ?
                                    WHERE user_id=? ;`
                    const params = [nickname, residence, image, show, id]
                    const [result] = await connection.execute(sql, params)
                    const data = {
                        success: true,
                        result: result,
                    }
                    res.json(data);
                } catch (error) {
                    console.log('Query Error');
                    console.log(error)
                    if (error.errno == 1062) {
                        const data = {
                            success: false,
                            error: "방금 다른 누군가가 닉네임을 가져갔습니다.\n\n닉네임을 다시 설정해 주세요."
                        }
                        res.json(data)
                    }
                    else {
                        const data = {
                            success: false,
                            error: error.sqlMessage,
                        }
                        res.json(data)
                    }
                }
            } catch (error) {
                console.log('DB Error')
                console.log(error)
                const data = {
                    success: false,
                    error: error.sqlMessage
                }
                res.json(data)
            } finally {
                connection.release();
            }
        }
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.query;
    const AccessToken = req.cookies.AccessToken;
    if (AccessToken == undefined) {
        const data = {
            success: false,
            error: '접근권한이 없습니다'
        }
        res.json(data)
    } else {

        const client = jwtId(AccessToken)
        if (id != client) {
            const data = {
                success: false,
                error: '접근권한이 없습니다'
            }
            res.json(data)
        } else {
            let connection;
            try {
                connection = await pool.getConnection(async conn => conn);
                try {
                    const sql = `UPDATE user SET state=1,kakao_code=NULL WHERE user_id=? ;`
                    const params = [id]
                    const [result] = await connection.execute(sql, params)
                    const data = {
                        success: true,
                        result: result,
                    }
                    res.json(data);
                } catch (error) {
                    console.log('Query Error');
                    console.log(error)
                    const data = {
                        success: false,
                        error: error.sqlMessage
                    }
                    res.json(data)
                }
            } catch (error) {
                console.log('DB Error')
                console.log(error)
                const data = {
                    success: false,
                    error: error.sqlMessage
                }
                res.json(data)
            } finally {
                connection.release();
            }
        }
    }
}



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
    showUser,
    updateUser,
    deleteUser,
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