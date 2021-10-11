
import { useEffect,useState } from 'react'
import styled from 'styled-components'
import Buy from '../components/Buy';
import Sell from '../components/Sell'


const TradingContain = styled.div`
.trading{
    width: 500px;
    height: 500px;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid black;
    background: white;
    position: relative;
}

/* .sub_header> span > a {
    padding: 2px;
    box-sizing: border-box;
    display: inline-block;
    width: 100px;
    height: 40px;
    border: 1px solid #ededed;
    text-align: center;
    color: black;
    border-bottom: 3px solid crimson;
    font-size: 19px;
} */

.sub_header{
    padding: 3px;
    box-sizing: border-box;
    display: inline-block;
    width: 100px;
    height: 40px;
    border: 1px solid #ededed;
    text-align: center;
    color: #222;
    font-size: 18px;
    float: left;
}

.sub_header:hover{
    cursor: pointer;
    border-bottom: 3px solid crimson;

}

/* 매수 */
.buy_contain{
    width: 100%;
    height: 400px;
    margin-top: 70px;
    padding: 4px;
}
.possible_asset{
    display: inline-block;
}

.buy_contain>li{
    display: flex;
    padding: 9px;
    margin-top: 10px; 
}

.buy_contain>li>a{
    line-height: 40px;
    height: 25px;
    font-size: 14px;
    width: 130px;
    color: gray;
    
}

.buy_contain>li>input{
    width: 280px;
    height: 35px;
    border: 2px solid #ededed;
}
.cf{
    margin-top: 20px;
    /* padding: 8px; */
    width: 420px;
    font-size: 8px;
    display: inline-block;
    text-align: right;
}

.buy_button{
    width: 250px;
    height: 34px;
    padding: 4px;
    box-sizing: border-box;
    background: crimson;
    border: none;
    color: white;
    border-radius: 4px;
    display: inline-block;
    position: relative;
    left: 50%;
    top: 20%;
    transform: translateX(-50%);
}
.buy_button:hover{
    cursor: pointer;
    background: rgb(185, 17, 51);
}

.hi{
    color: turquoise;
}
    width: 480px;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid black;
    background: white;
`

const Trading = ()=>{
    const Subheader = ["매수","매도"];

    const [currentClick,setCurrentClick] = useState(0)
    const [prevClick , setPrevClick] = useState(null);

    const handleClick = e =>{
        setCurrentClick(e.target.id)
    }

    useEffect(() => {
        if (currentClick !== null) {
            let current = document.getElementById(currentClick);
            current.style.color = '#DC143C';
            current.style.borderBottomColor = '#DC143C';
        }

        if (prevClick !== null) {
            let prev = document.getElementById(prevClick);
            prev.style.color = '#000';
            prev.style.borderBottomColor = "#eee";
        }
        setPrevClick(currentClick);
    }, [currentClick]);

    return(
        <>
            <TradingContain>
                {
                    Subheader.map((e,k)=>{
                        return(
                            <div key={k}>
                                <a 
                                id={k} 
                                onClick={handleClick}
                                className="sub_header"
                                >
                                {e}
                                </a>
                            </div>
                        )
                    })
                }
                {
                    currentClick == 0
                    ? 
                    <Buy/>
                    :(currentClick == 1 
                        ?
                        <Sell/>
                        :'page error') 
                }
            </TradingContain>
        </>
    )
}

export default Trading;

