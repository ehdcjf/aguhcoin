import Header from '../Header';
import Space from '../Space';

const MainLayout = ({children}) => {
    return (
        <>
            <Header />
            <div>
                <Space />
                {children}
            </div>
        </>
    )
}

export default MainLayout;