import { useState, React, useEffect } from 'react';

function Calculation() {
    const [results, setresults] = useState([]);
    const [perfect, setperfect] = useState([]);

    useEffect(() => {
        fetch("/api")
        .then((res) => res.json())
        .then((data) => setresults(data.message));
        }, []);
    
    useEffect(() => {
        fetch("/perfect")
        .then((res) => res.json())
        .then((data) => setperfect(data.perfect));
        }, []);
    
    let new_list = [];
    let total = 0;  
    
    results?.map((item, idx) => {
            new_list.push({ "name":results[idx].name, "composer" : results[idx].composer, "diff":"EZ", "score":results[idx].Easy})
            new_list.push({ "name":results[idx].name, "composer" : results[idx].composer, "diff":"HD", "score":results[idx].Hard})
            new_list.push({ "name":results[idx].name, "composer" : results[idx].composer, "diff":"IN", "score":results[idx].Insane})
            new_list.push({ "name":results[idx].name, "composer" : results[idx].composer, "diff":"AT", "score":results[idx].Another})
            new_list.push({ "name":results[idx].name, "composer" : results[idx].composer, "diff":"Legacy", "score":results[idx].Legacy})
    })

    new_list = new_list?.sort((a, b) => b.score - a.score).slice(0,30);
    console.log(new_list);
    
    new_list?.map((item, idx) => {
        if (idx <= 18) {
            total += new_list[idx].score;
            console.log(idx, total);
        }
    })

    perfect?.map((item, idx) => {
        total = total + parseFloat(perfect[idx].maxScore);
        //console.log(parseFloat(perfect[idx].maxScore), total)
    })
    console.log(total);
    console.log(total/20);


    

    return (
        <>
            <p><a href='../'>トップページに戻る</a></p>
            <p><a href='../scores'>リザルトを登録</a></p>
            <p>レート: {total/20}</p>
            
            <p>理論値を取っている譜面の中で最大の譜面定数</p>
            {perfect?.map((item, idx) => {
                return <p>{perfect[idx].name} / {perfect[idx].composer} / {perfect[idx].Difficulty}: {perfect[idx].maxScore}</p>
            })}



            <h2>Ranking Score上位30曲</h2>
            <table border="2">
                <tr>
                    <th>曲名</th>
                    <th>Composer</th>
                    <th>難易度</th>
                    <th>Ranking Score</th>

                </tr>
                {new_list?.map((item, idx) => {
                    return <>
                        <tr>
                            <td>{new_list[idx].name}</td>
                            <td>{new_list[idx].composer}</td>
                            <td>{new_list[idx].diff}</td>
                            <td>{new_list[idx].score}</td>
                        </tr> 
                    </>
                })}
            </table>

        </>
    )

}

export default Calculation;