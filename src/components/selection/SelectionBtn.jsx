import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectionBtnContainer, SelectionBtnText } from './SelectionBtn.styled';
import { AiOutlineCheck } from "react-icons/ai";

export default function SelectionBtn({ solutionStatus, answerId, writer }) {
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const navigate = useNavigate();
  const [writerId, setWriterId] = useState(1);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(()=>{
    if (writer !== undefined) setWriterId(writer);
    if (solutionStatus !== undefined) setIsSelected(solutionStatus);
  }, [writer, solutionStatus])

  const onClickHandler = () => {
    const UID = JSON.parse(localStorage.getItem('UID'));
    if(UID !== writer) return alert('작성자만 답변 채택이 가능합니다.');

    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    axios(`${PROXY}/answers/selection?answerId=${answerId}&memberId=${UID}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${accessToken}`,
      }
    })
    .then(res => setIsSelected(res.data))
    .catch(err => navigate('/*'));
  }

  return (
    <SelectionBtnContainer isSelected={isSelected} onClick={onClickHandler}>
      <AiOutlineCheck color={ isSelected ? '#03B800' : '#DCDCDC'} />
      <SelectionBtnText isSelected={isSelected}>selection</SelectionBtnText>
    </SelectionBtnContainer>
  )
}
