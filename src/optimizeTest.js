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