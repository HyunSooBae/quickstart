import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

type Props = { title: string };

const About = (props: Props) => {
  let [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState<number>(1)
  const navigate = useNavigate()

  useEffect(() => {
    const strPage = searchParams.get('page')
    setPage(parseInt(strPage !== null ? strPage : '1', 10))
  }, [searchParams])

  const goPrev = () => {
    if (page > 1) navigate(location.pathname + '?page=' + (page - 1))
  }
  const goNext = () => {
    navigate(location.pathname + '?page=' + (page + 1))
  }
  return (
    <div className="card card-body">
      <h2>Abou {props.title}</h2>
      <div className="m-2">현재 페이지 : {page}</div>
      <button className="btn btn-secondary m-1" onClick={goPrev}>이전</button>
      <button className="btn btn-secondary m-1" onClick={goNext}>다음</button>
    </div>
  );
};

export default About;