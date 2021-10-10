import styled from 'styled-components';
import HeaderLogo from './HeaderLogo';
import MainMenu from './MainMenu';
import UserMenu from './UserMenu';

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    flex-direction: row;
    width: 100%;
    padding: 20px 10%;
    background: #0a0e13;
    z-index: 1;
`

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderLogo />
            <MainMenu />
            <UserMenu />
        </HeaderContainer>
    );
}

export default Header;