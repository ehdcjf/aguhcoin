import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Asset = styled.div`
    display: flex;
    flex-direction: column;
    height: 250px;
    padding: 20px;
    color: gray;
    border-bottom: 2px solid #eee;

    p {
        font-size: 20px;
        font-weight: 600;
        color: #000;    
    }
    
    span {
        margin-left: 10px;
        font-size: 12px;
        font-weight: normal;
        color: #999;
    }
`

const FirstRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 30%;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;

    & > div {
        display: flex;
        flex-direction: row;
        width: 50%;
        padding: 0 20px;
        align-items: center;
    }
    & > div:last-child {
        border-left: 1px solid #eee;
    }

    & > div > div {
        width: 50%;
    }
`

const SecondRow = styled.div`
    display: flex;
    flex-direction: row;
    height: 70%;

    & > div {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding-top: 20px;
    }

    & > div > div {
        display: flex;
        flex-direction: row;
        height: 100%;
        padding: 0 20px;
        align-items: center;
    }
    & > div:last-child > div {
        border-left: 1px solid #eee;
    }

    & > div > div > div {
        width: 50%;
    }
`

const MyCoinAsset = () => {
    const {myAsset,myCoin,coinValue} = useSelector(state=>state.user);
    const {nowPrice} = useSelector(state=>state.exchange);


    return (
        <Asset>
            <FirstRow>
                <div>
                    <div>보유 KRW</div>
                    <div>
                        <p>{myAsset}<span>KRW</span></p>
                    </div>
                </div>
                <div>
                    <div>총 보유자산</div>
                    <div>
                        <p>{myCoin*nowPrice+myAsset}<span>KRW</span></p>
                    </div>
                </div>
            </FirstRow>
            <SecondRow>
                <div>
                    <div>
                        <div>총매수금액</div>
                        <div>
                            <p>{coinValue}<span>KRW</span></p>
                        </div>
                    </div>
                    <div>
                        <div>총평가금액</div>
                        <div>
                            <p>{myCoin*nowPrice}<span>KRW</span></p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>총평가손익</div>
                        <div>
                            <p>{myCoin*nowPrice - coinValue}<span>KRW</span></p>
                        </div>
                    </div>
                    <div>
                        <div>총평가수익률</div>
                        <div>
                        {coinValue<myCoin*nowPrice
                            ?<p style={{ color: "red" }}>
                                {Math.floor((coinValue-myCoin*nowPrice)/coinValue*10000)/100}<span>%</span>
                            </p>
                            :<p style={{ color: "blue" }}>
                                -{Math.floor((coinValue-myCoin*nowPrice)/coinValue*10000)/100}<span>%</span>
                            </p>}
                        </div>
                    </div>
                </div>
            </SecondRow>
        </Asset>
    );
}

export default MyCoinAsset;