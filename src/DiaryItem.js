import React, { useState, useRef } from "react";

const DiaryItem = ({ id, author, content, created_date, emotion, onRemove, onEdit }) => {


    const [isEdit, setIsEdit] = useState(false); //수정하기
    const toggleIsEdit = () => setIsEdit(!isEdit);
    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();

    const handleRemove = () => {
        if (window.confirm(`${id}번재 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id);
        }
    }

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(localContent);
    }

    const handleEdit = () => {
        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }

        if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
            onEdit(id, localContent);
            toggleIsEdit();
        }

    }

    return (<div className="DiaryItem">
        <div className="info">
            <span className="author_info">
                작성자 : {author} | 감정 점수 : {emotion}
            </span>
            <br />
            <span className="date">
                {new Date(created_date).toLocaleString()}
            </span>
        </div>

        <div className="content">{
            isEdit ? (<><textarea ref={localContentInput} value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}></textarea>
            </>)
                : (<>{content}</>)
        }</div>

        {isEdit ? (<>
            <button onClick={handleQuitEdit}>수정 취소</button> {/* idEdit이 true일 때 -> 수정 중 */}
            <button onClick={handleEdit}> 수정 완료</button>
        </>) : (<>
            <button onClick={handleRemove}>삭제하기</button> {/* idEdit이 false일 때 -> 평소 */}
            <button onClick={toggleIsEdit}>수정하기</button>
        </>)}
    </div >
    );
};

export default React.memo(DiaryItem); 