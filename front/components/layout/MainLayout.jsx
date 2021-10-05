import Header from '../Header';
import Space from '../Space';

const MainLayout = ({children}) => {
    return (
        <>
            <Header />
            <div className="container">
                <Space />
                {children}
            </div>
        </>
    )
}

export default MainLayout;