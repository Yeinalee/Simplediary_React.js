import DiaryItem from './DiaryItem';

const DiaryList = ({ diaryList, onRemove, onEdit }) => {
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it) => (
                    <DiaryItem key={it.id} {...it} onRemove={onRemove} onEdit={onEdit} /> //it 객체의 모든 데이터를 전달
                    // <div key={it.id} >
                    //     <div>작성자 : {it.author}</div>
                    //     <div>일기 : {it.content}</div>
                    //     <div>감정 : {it.emotion}</div>
                    //     <div>작성 시간 : {it.creater_date}</div>
                    // </div>
                ))}
            </div>
        </div >
    );
};

DiaryList.defaultProps = { //undefined일때의 error해결 
    diaryList: [], //일기가 하나도 없을 때는 default로 빈 배열 설정
};

export default DiaryList;