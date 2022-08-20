import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

//https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);   //일기 데이터
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_data: new Date().getTime(),
        id: dataId.current++,
      }
    });
    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);      //일기 상태 변화 함수, 함수형 업데이트
  }, []);

  const onRemove = useCallback((targetId) => { //지울 일기를 제외한 나머지 일기 배열
    setData((data) => data.filter((it) => it.id !== targetId));
  }, []);

  const onEdit = useCallback((targetId, newContent) => { //특정 일기 데이터 수정
    setData((data) =>
      data.map((it) => //모든 요소를 순회하면서
        it.id === targetId ? { ...it, content: newContent } : it) //수정 대상이면 content 수정
    );
  }, []);

  const getDiaryAnalysis = useMemo( // 기억된 연산 결과 활용, 함수 값을 리턴 받게 됨
    () => {
      const goodCount = data.filter((it) => it.emotion >= 3).length; //기분이 좋은 일기의 개수
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      return { goodCount, badCount, goodRatio }; //객체로 return
    }, [data.length]); //data의 길이가 바뀔 때만 실행

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //함수 호출 -> return 값을 비구조화 할당 받음

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length} </div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
};

export default App;
