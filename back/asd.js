// new Date(tesmp).setMinutes(temp.getMinutes()+1) 
let getNow = new Date().getTime()  // 현재시간

let newTime =  getNow - 1*1000*30
let newnewTime = new Date(newTime)
console.log(newnewTime.toUTCString())
function getRandomPrice(){
    return Math.floor(Math.random()*500)
}

function getRandomAmount(){
    return Math.floor(Math.random()*10)
}

function everyThirtySec(){
    for(let i = 0; i<1000; i++){
        let newTime =  getNow - i*1000*30
        let newnewTime = new Date(newTime)
        let convertedTime = newnewTime.getTime()
        let amount = getRandomAmount()
        let sql = `INSERT INTO transaction (a_orderid,a_amount,a_commission,b_orderid,b_amount,b_commission,price,txid, tx_date, coin_id)
                   VALUES (${i+1},${amount}, 10, ${i+1001}, ${amount}, 10, ${getRandomPrice()}, ${i+1}, ${convertedTime}, 1);`
        console.log(sql)
    }
}

everyThirtySec()