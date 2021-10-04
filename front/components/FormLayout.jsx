import styled from 'styled-components';

const Background = styled.div`
    display: block;
    width: 100%;
    min-height: 100vh;
    background: #000;
`

const Logo = styled.div`
    
`

const FormLayout = ({children}) => {
    return (
        <>
            <Background>
                <Logo>

                </Logo>
                {children}
            </Background>
        </>
    )
}

export default FormLayout;