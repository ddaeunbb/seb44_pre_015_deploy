import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterData } from '../../modules/searchSlice';
import axios from 'axios';
import { MainContainer } from '../main/Main.styled'
import SearchBox from '../../components/search/SearchBox'
import MainPostCard from '../../components/card/MainPostCard'



export default function Search() {
  const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  const dispatch = useDispatch();
  const { searchWord } = useParams();
  const datas = useSelector(state => state.search.searchData);

  useEffect(()=>{
    axios(`${PROXY}/questions/get/recent?page=0&size=100`)
    .then(res => dispatch(filterData(res.data)));
  }, [searchWord])

    return(
      <MainContainer>
        <SearchBox />
          {
            datas.map(data => <MainPostCard key={data.questionId} title={data.title} detail={data.detail} status={data.solutionStatus.toString()} viewCount={data.viewCount} votesCount={data.votesCount} answerCount={data.answerCount} questionId={data.questionId} createdAt={data.createdAt} memberInfo={data.memberInfoDto} answers={data.answers}/>)
          }
        <div />
      </MainContainer>
    )
  
}
