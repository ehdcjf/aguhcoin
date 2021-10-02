const pool = require('../../config/dbconnection');


//우선 내가 100원에 10개 팔기로 했는데 동시에 내가 100원에 10개 사기로 했다면. 못하게 해야되고. 
// 내가 100원에 10개 사기로 했는데, 내가 100원에 10개 팔고 있으면 그것도 막아줘야됨. 

//내가 100원에 10개 팔려고 했다면 나한테 코인이 10개 있는지 확인. 
//내가 100원에 10개 사려고 했다면 나한테 1000원이 있는지 확인. 


const createOrder = async (req, res) => {
    const { user_idx, qty, price, order_type, coin_id = 1 } = req.body;

    let connection;

    try {
        connection = await pool.getConnection(async conn => conn);
        try {
            if (type == 0) { //살 때.

            }
            const sql = `SELECT SUM(input)-SUM(output) as asset from asset WHERE user_idx = ?`
            const params = [user_idx]
            const [[result1]] = await connection.execute(sql, params)
            console.log(result1.asset)

            const sql2 = `SELECT SUM(input)-SUM(output) as asset from asset WHERE user_idx = ?`

            res.json(result1);
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

module.exports = {
    createOrder
}