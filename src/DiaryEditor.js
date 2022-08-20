import React, { useEffect, useRef, useState, } from "react";

const DiaryEditor = ({ onCreate }) => {

    const authorInput = useRef(); //돔 요소에 접근
    const contentInput = useRef(); //돔 요소에 접근

    //useState("") : 초기값!!
    // const[state, setState] = useState();
    // const [author, setAuthor] = useState("이예나"); 를 하나로 합혀서!
    const [state, setState] = useState({
        author: "이예나", //기본값
        content: "",
        emotion: 1
    });

    //이벤트 핸들러 함수
    const handleChangeState = (e) => {
        setState({
            ...state, //나머지는 그대로
            [e.target.name]: e.target.value //ex) author : e.trarget.name(변경된 내ㅇ)
        })
    }

    const handleSubmit = () => {
        if (state.author.length < 1) { //입력을 강제하는 함수
            //alert("작성자는 최소 1글자 이상 입력해주세요.");
            authorInput.current.focus(); //현재 가리키는 값을 current로 불러옴
            return;
        }
        if (state.content.length < 5) {
            //alert("일기 본문은 최소 5글자 이상 입력해주세요. ");
            contentInput.current.focus();
            return;
        }

        onCreate(state.author, state.content, state.emotion);
        alert("저장 성공");
        setState({          //일기 작성 폼 초기화
            author: "이예나",
            content: "",
            emotion: 1,
        });
    };

    return <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div>{/* 작성자 입력 받기 */}
            {/* onChange : callback함수, 값이 바뀌었을 때(event가 발생했을 때) 수행하는 함수
                            e(이벤트 객체)를 인자로 받음 */}
            <input
                ref={authorInput} //authorInput을 통해 input에 접근
                name="author"
                value={state.author}
                onChange   //={(e) => {
                // setState({ // 객체의 값을 바꾸려면 객체를 만들어 전달
                //     author: e.target.value, //author 값은 바꿈
                //     content: state.content  //content 값은 유지
                // })
                //}
                ={handleChangeState}
            //author 값을 바꿈
            >
            </input>
        </div>

        <div>{/* 여러 줄 일기 입력 받기*/}
            <textarea ref={contentInput} name="content"
                value={state.content}
                onChange={(e) => {
                    setState({
                        ...state, //스프레드 연산자 : 나머지는 그대로 유지!
                        content: e.target.value
                    })
                }
                } >
            </textarea>
        </div>

        <div>
            오늘의 감정점수 :
            <select name="emotion" value={state.emotion} onChange={handleChangeState}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </div>

        <div> {/* 저장 버튼 */}
            <button onClick={handleSubmit}>일기 저장하기</button>
        </div>
    </div >

};

export default React.memo(DiaryEditor);