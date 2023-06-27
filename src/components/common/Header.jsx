import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setSearch } from '../../modules/searchSlice';
import { Link } from "react-router-dom";
import LoginBtn from "../button/login/LoginBtn";
import Logo from "../../assets/logo-stackoverflow.svg";
import { HeaderContainer, LogoContainer, LogoImg, Nav } from "../common/Header.styled";
import LogoutBtn from "../button/login/LogoutBtn";
import { UserImgSm, Img } from "../user/UserCommon.styled";
import QuestionBtn from '../button/question/QuestionBtn';
import User from '../../assets/user.png'

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogIn, setIsLogin] = useState(false);
  const [userInfo, setUserInfo]= useState('');
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const parsedCheck = JSON.parse(localStorage.getItem('isLogIn'));
    if (parsedCheck !== undefined) setCheck(parsedCheck)
    else setCheck(false);
  }, [check]);

  useEffect(() => {
    if (check) {
      const parsedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      setUserInfo(parsedUserInfo);
      setIsLogin(true);
    }
  }, [check]);

  return (
    <HeaderContainer>
      <LogoContainer onClick={()=> dispatch(setSearch(''))}>
        <Link to="/">
          <LogoImg src={Logo} alt="logo" />
        </Link>
      </LogoContainer>
      <Nav>
        {isLogIn ? (
          <>
            <QuestionBtn />
            <LogoutBtn setIsLogin={setIsLogin} />
            <UserImgSm className="cursor-pointer" onClick={()=> navigate('/mypage')}>
              <Img
                src={userInfo === null ? User : userInfo.picture }
                alt="userImg"
              />
            </UserImgSm>
          </>
        ) : (
          <LoginBtn />
        )}
      </Nav>
    </HeaderContainer>
  );
}
