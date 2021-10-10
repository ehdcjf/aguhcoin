import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { UserLogoutAction } from '../reducers/user';
import { NonTrading_REQUEST, Transaction_REQUEST } from '../reducers/wallet';

const MenuLogout = () => {
    const dispatch = useDispatch();
    const { userid, useridx } = useSelector((state) => state.user);

    // 로그아웃
    const handleLogout = () => {
        const data = {
            userid: userid,
            useridx: useridx,
        }
        dispatch(UserLogoutAction(data));
        dispatch(NonTrading_REQUEST());
        dispatch(Transaction_REQUEST());
        Router.push('/');
    }

    return (
        <>
            <li onClick={handleLogout}>로그아웃</li>
        </>
    );
}

export default MenuLogout;