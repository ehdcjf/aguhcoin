import styled from 'styled-components';
import MenuLogout from './MenuLogout';

const Menu3 = styled.div`
    position: fixed;
    width: 100%;
    margin-top: 5.4%;
    margin-right: 12.6%;
    top:0;
    right: 0;

    & > ul {
        width: 15%;
        float: right;
        background: #0a0e13;
        
    }

    & > ul > li {
        padding: 20px;
        cursor: pointer;
    }
    & > ul > li:hover {
        background: #555;
    }
`

const HideMenu = () => {
    return (
        <>
            <Menu3>
                <ul>
                    <li>로그인 연장</li>
                    <MenuLogout />
                </ul>
            </Menu3>
        </>
    );
}

export default HideMenu;