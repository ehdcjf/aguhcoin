for(let i = 0; i<300; i++){
    const asd = i.toString()
    if(asd.length===1){
        console.log(`INSERT INTO user (user_id, user_pw) VALUES ('000${asd}', '1234');`)
        console.log(`INSERT INTO asset (user_idx, input, output, reg_date) VALUES (000${asd},1000000,0,NOW());`)
    } else if(asd.length===2){
        console.log(`INSERT INTO user (user_id, user_pw) VALUES ('00${asd}', '1234');`)
        console.log(`INSERT INTO asset (user_idx, input, output, reg_date) VALUES (00${asd},1000000,0,NOW());`)
    } else if(asd.length===3){
        console.log(`INSERT INTO user (user_id, user_pw) VALUES ('0${asd}', '1234');`)
        console.log(`INSERT INTO asset (user_idx, input, output, reg_date) VALUES (0${asd},1000000,0,NOW());`)
    }
    
}