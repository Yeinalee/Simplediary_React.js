simple diary using React.js

# React Lifecycle - useEffect

1. Mount(화면에 나타남) → Update(리렌더) → UnMount(화면에서 사라짐)
    
    class에서만 사용 가능

2. **React Hooks**
    1. use 키워드를 사용해 함수형 컴포넌트에서 사용
    2. 두 개의 파라미터 전달
        1. callback 함수
        2. deps (dependency array) 
        → 하나라도 변화하면 callback 함수 실행
            1. **mount → 빈 배열**
            2. **update → 두번째 인자X**
            3. **unmount → callback함수가 return 값 가지면!**
    
    
3. Lifecycle 예시
    
    ```jsx
    import React, { useEffect, useState } from 'react';
    
    const Lifecycle = () => {
    
        const [count, setCount] = useState(0);
        const [text, setText] = useState("");
    
        useEffect(() => {
            console.log("Mount!");
        }, []); //두번째 인자 빈 배열 -> mount된 시점에만 수행됨
    
        useEffect(() => {
            console.log("Update");
        }); //두번째 인자 없음 -> update된 시점에만 수행됨
    
        useEffect(() => {
            if (count > 5) {
                alert("count가 5를 넘었습니다. 따라서 1로 초기화합니다.");
                setCount(1);
            }
        }, [count]); //count state가 변할 때만 수행됨
    
        return <div style={{ padding: 20 }}>
            <div>
                {count}
                <button onClick={() => setCount(count + 1)}> + </button>
            </div>
            <div>
                <input value={text} onChange={(e) => setText(e.target.value)} />
            </div>
    
        </div>
    }
    
    export default Lifecycle;
    ```
    
4. unmount 예시
    
    ```jsx
    import React, { useEffect, useState } from 'react';
    
    const UnmountTest = () => {
    
        useEffect(() => {
            console.log("Mount!");
            return () => {
                //return 값 -> unmount시점에 실행
                console.log("UnMount");
            }
        })
        return <div>Unmount Testing Component</div>
    }
    
    const Lifecycle = () => {
    
        const [isVisible, setVisible] = useState(false);
        const toggle = () => setVisible(!isVisible);
    
        return (
            <div style={{ padding: 20 }}>
                <button onClick={toggle}> ON/OFF</button>
                {isVisible && <UnmountTest />}
            </div>
        );
    };
    
    export default Lifecycle;
    ```
    

# React에서 API 호출하기 fetch

1. JSONPlaceholder 이용
2. `fetch()`
    1. promise 반환
    2. 기본 구조
        1. `then`은 "`fetch`다 끝나고나서 이 일을 해줘"의 뜻
        2. 첫번째 then 함수에 전달된 인자 res는 http 통신 요청과 응답에서 응답의 정보를 담고 있는 객체
    
    ```jsx
    fetch('api 주소')
    .then(res => res.json())
    .then(res => {
      // data를 응답 받은 후의 로직
    });
    ```
    
3. API 호출 예시

```jsx
const getData = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments')
     .then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
				created_data : new Date().getTime(),
        id: dataId.current++
      }
    });

    setData(initData);
  };

  useEffect(() => { //mount되자마자 실행
    getData();
  }, []);
```

# React developer tools

chrome 확장 기능

Components 계층 구조, props, state 확인 가능

## 최적화

# 연산 결과 재사용 - useMemo

1. Memoization을 이용한 연산 과정 최적화    
2. 함수로써, 함수 결과값을 리턴!!
3. 예시
    
    감정 점수는 수정이 불가하므로 data가 추가될 때, 즉 data의 길이가 변화할때만 실행하면 됨
    
    함수로써 결과값을 반환하므로 getDiaryAnalysis는 값!! 함수X
    
    ```jsx
    const getDiaryAnalysis = useMemo( // 기억된 연산 결과 활용, 함수 값을 리턴 받게 됨
        () => {
          const goodCount = data.filter((it) => it.emotion >= 3).length; //기분이 좋은 일기의 개수
          const badCount = data.length - goodCount;
          const goodRatio = (goodCount / data.length) * 100;
          return { goodCount, badCount, goodRatio }; //객체로 return
        }, [data.length]); //data의 길이가 바뀔 때만 실행
    
      const { goodCount, badCount, goodRatio } = getDiaryAnalysis; //함수 호출 -> return 값을 비구조화 할당 받음
    ```
    

---

```jsx
const goodCount = data.filter((it) => it.emotion >= 3).length;
```

for문 사용하지 않고 emotion≥3인 객체의 길이를 구함!

# 컴포넌트 재사용 - React.memo

1. 함수형 컴포넌트에 업데이트 조건 걸기 → 불필요한 리렌더 해결    
2. 컴포넌트가 동일한 props로 동일한 결과를 렌더링해낸다면, `React.memo`를 호출, 결과를 메모이징(Memoizing)하도록 래핑하여 경우에 따라 성능 향상
 → React는 컴포넌트를 렌더링하지 않고 마지막으로 렌더링된 결과를 재사용
3. React.memo는 고차 컴퍼넌트
고차 컴퍼넌트는 컴퍼넌트를 가져와 새 컴퍼넌트를 반환하는 함수
    
    ```jsx
    import React, { useEffect, useState } from "react";
    
    const Textview = React.memo(({ text }) => { //text가 바뀔 때만 랜더링
        useEffect(() => {
            console.log(`Update :: Text : ${text}`);
        })
        return <div>{text}</div>
    });
    
    const CountView = ({ count }) => { //뭐든 바뀔 때마다 랜더링
        useEffect(() => {
            console.log(`Update :: Count : ${count}`);
        })
        return <div>{count}</div>
    }
    
    const OptimizeTest = () => {
    
        const [count, setCount] = useState(1);
        const [text, setText] = useState("");
    
        return (
            <div style={{ padding: 50 }}>
                <div>
                    <h2>count</h2>
                    <CountView count={count} />
                    <button onClick={() => setCount(count + 1)}>+</button>
                </div>
                <div>
                    <h2>text</h2>
                    <Textview text={text} />
                    <input value={text} onChange={(e) => setText(e.target.value)} />
                </div>
            </div>
        );
    };
    
    export default OptimizeTest;
    ```
    

## 객체를 비교하는 방법

js 기본 객체 비교 → 얕은 비교
값에 의한 비교X, 주소에 의한 비교

1. `areEqual`이 true 반환 → 리렌더X
    
    ```jsx
    function MyComponent(props) {
      /* props를 사용하여 렌더링 */
    }
    function areEqual(prevProps, nextProps) {
      /*
      nextProps가 prevProps와 동일한 값을 가지면 true를 반환하고, 그렇지 않다면 false를 반환
      */
    }
    export default **React.memo(MyComponent, areEqual);**
    ```
    

# 컴포넌트 & 함수 재사용 - useCallback

1. useCallback
    1. 메모이제이션된 콜백함수 반환
    
    ```jsx
    const memoizedCallback = useCallback(
      () => {
        doSomething(a, b);
      },
      [a, b],
    );
    ```
    
2. 재사용할 컴포넌트 찾기
react developer tools에서 Components의 Highlight updates when components render. 이용
3. **DiaryEditor.js 최적화하기**
    1. `export default React.memo(DiaryEditor);`
    2. DiaryEditor의 인자 onCreate 함수 최적화
    
    ```jsx
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
    ```
