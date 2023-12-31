import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RecommentInputContainer, Input, SubmitButton } from './RecommentInput.styled'

export default function RecommentInput({ answerId }) {
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const detailInput = useRef();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if ( detailInput.current.value === '') return alert('공백은 입력할 수 없습니다.')

    const isLogIn = JSON.parse(localStorage.getItem('isLogIn'));
    if( isLogIn !== true ) return alert('로그인을 해주세요!');

    const UID = JSON.parse(localStorage.getItem('UID'));
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));

    const body = {
      commentDetail: detailInput.current.value,
      answerId,
      memberId: UID,
    }

    await axios.post(`${PROXY}/comments`, JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    )
    .then(res => window.location.reload())
    .catch(err => navigate('/*'));
  }

  return (
    <RecommentInputContainer>
      <form onSubmit={onSubmitHandler}>
        <Input ref={detailInput}/>
        <SubmitButton>댓글</SubmitButton>
      </form>
    </RecommentInputContainer>
  )
}