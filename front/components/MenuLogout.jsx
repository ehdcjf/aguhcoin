import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { UserLogoutAction } from '../reducers/user';

const MenuLogout = () => {
    const dispatch = useDispatch();
    const { isLogin, userid, useridx } = useSelector((state) => state.user);

    const handleLogout = () => {
        const data = {
            isLogin: !isLogin,
            userid: userid,
            useridx: useridx,
        }
        dispatch(UserLogoutAction(data));
        // 로그아웃 시 initialState에 남아있던 txList 등 정보 삭제해야함
        // setTimeout을 1초로 하는게 맞는걸까
        setTimeout(()=>{
            Router.push('/');
        }, 1000);
    }

    return (
        <>
            <li onClick={handleLogout}>로그아웃</li>
        </>
    );
}

export default MenuLogout;