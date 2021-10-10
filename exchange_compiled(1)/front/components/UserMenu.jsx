import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BsCaretUpFill, BsCaretDownFill } from 'react-icons/bs';
import Link from 'next/link';
import styled from 'styled-components';
import MenuLogin from './MenuLogin';
import HideMenu from './HideMenu';
import Timer from './Timer';

const Menu2 = styled.div`
    display: flex;
    position: relative;
    flex-direction: row;
    margin: 0 auto;
    padding: 20px 30px;
    float: right;
    
    & > div {
        padding: 0px 10px;
        border-right: 1px solid;
        border-color: gray;
    }
    & > div:nth-child(1) {
        border-left: 1px solid;
        border-color: gray;
    }

    & > div > a {
        margin: 0 10px;
        color: #fff;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;
        user-select: none;
    }

    & > div > a > span {
        margin-left: 10px;
    }
`

const UserMenu = () => {
    const { isLogin, userid } = useSelector((state) => state.user);

    const [hide, setHide] = useState(true);

    const handleClick = () => {
        setHide(!hide);
    }

    return (
        <>
            <Menu2>
                {/* 로그인 만료 시간 */}
                {
                    isLogin == true && <Timer />
                }
                <div>
                    {
                        isLogin == false
                        ? <MenuLogin />
                        : (
                            <a onClick={handleClick}>
                                {userid} 님
                                <span>
                                    {
                                        hide
                                        ? (
                                            <BsCaretDownFill
                                                color="steelblue"
                                                size="10"
                                            />
                                        )
                                        : (
                                            <BsCaretUpFill
                                                color="steelblue"
                                                size="10"
                                            />
                                        )
                                    }
                                    
                                </span>
                            </a>
                        )
                    }
                </div>
                {
                    isLogin == false
                    ? (
                        <div>
                            <Link href="/join">
                                <a>회원가입</a>
                            </Link>
                        </div>
                    )
                    : null
                }
            </Menu2>
            {
                isLogin == true
                ? (
                    !hide
                    ? <HideMenu />
                    : null
                )
                : null
                
            }
        </>
    );
}

export default UserMenu;