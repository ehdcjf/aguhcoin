const pool = require('../../config/dbconnection');
const createToken = require('../../jwt');
const jwtId = require('../../jwtId')


const createUser = async (req, res) => {

    let connection;

    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            const { kakao, nickname, hometown, residence, gender, birth, image, vote19, vote20, vote_id } = req.body;
            const sql = ` USER (kakao_code,nickname,hometown,residence,gender,birth,image,vote_19th) 
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



const showUser = async (req, res) => {

    const { id } = req.query;
    const AccessToken = req.cookies.AccessToken;
    let client = 0;
    if (AccessToken != undefined) {
        client = jwtId(AccessToken)
    }
    let connection;
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            // ///더미데이터 만들기
            // let x = Math.floor(Math.random()*10000000)
            //             for(let i = 500; i<1500;i++){
            //                 let rd=x+i
            //                 let kakao =rd%1000000;
            //                 let nickname = rd%100000
            //                 let hometown =rd%16;
            //                 let residence =rd%16;
            //                 let gender = rd%2;
            //                 let birth = rd%100+1930;
            //                 let image = null;
            //                 let vote19 = rd%10;
            //                 let vote_id = 6;
            //                 let vote20 = 21+rd%4;

            //                 const sql = `INSERT INTO USER (kakao_code,nickname,hometown,residence,gender,birth,image,vote_19th) 
            //             values(?,?,?,?,?,?,?,?)`
            //             const params = [kakao, nickname, hometown, residence, gender, birth, image, vote19]
            //             const [result] = await connection.execute(sql, params)
            //             const user_id = result.insertId;

            //             const voteSQL = `INSERT INTO vote_result (user_id,vote_id,politician_id) value (?,?,?)`;
            //             const voteParams = [user_id, vote_id, vote20]
            //             const [vote] = await connection.execute(voteSQL, voteParams)

            //             }
            // //////
            const sql = `SELECT image,nickname,gender,birth,hometown,residence,vote_19th,user.show,user.state FROM user WHERE user_id = ?`
            const params = [id]
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
                let data = { ...result[0][0], success: true, vote_list: voteResult }
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


const nicknameCheck = async (req, res) => {
    const nickname = req.params.nickname;
    const AccessToken = req.cookies.AccessToken;
    let client = null;
    if (AccessToken != undefined) {
        client = jwtId(AccessToken)
    }
    let connection;
    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            const sql = `SELECT COUNT(user_id) as count,user_id FROM user WHERE nickname=?`
            const params = [nickname]
            const [[result]] = await connection.execute(sql, params)
            let data = {
                success: false,
            }
            if (result.count == 0 || result.user_id == client) {
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






module.exports = {
    createUser,
    showUser,
    updateUser,
    deleteUser,
    logoutUser,
    nicknameCheck,
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



