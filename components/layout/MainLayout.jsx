import Header from '../Header';

const MainLayout = ({children}) => {
    return (
        <>
            <Header />
            <div className="container">
                {children}
            </div>
        </>
    )
}

export default MainLayout;