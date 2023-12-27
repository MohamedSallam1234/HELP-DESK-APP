import React, { useEffect, useState } from 'react';
import './KnowledgeBase.css';

function KnowledgeBase() {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState("");

    async function fetchData() {
        try {
            const response = await fetch('https://localhost:5000/api/v1/access', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    category: category // send category in the body of the request
                }),
            });
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.log(error);
        }
    }

    // Call fetchData when the component mounts
    useEffect(() => {
        fetchData().then(r => console.log(r)).catch(e => console.log(e));
    }, []);

    return (
        <div className={"knowledgeBase"}>
            <button onClick={fetchData}> Search Category</button>
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
            />
            <div>
                {data.map((item, index) => (
                    <div key={index}>
                        <p>Question: {item.question}</p>
                        <p>Answer: {item.answer}</p>
                        <p>Category: {item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default KnowledgeBase;
