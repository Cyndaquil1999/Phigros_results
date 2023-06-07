import { useState, useEffect, React } from 'react';
import '../style/Show.css';

function Show() {
    const [music, setMessage] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
    fetch("/api")
    .then((res) => res.json())
    .then((data) => setMessage(data.message));
    }, []);

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <>  
            <h3>選択した曲のRanking Score</h3>
            <p><a href='/scores'>リザルトを登録</a></p> 
            <p><a href='../calculation'>レート計算をする</a></p>
            <select value={selectedOption} onChange={handleSelectChange}>
                {music?.map((val, idx) => {
                    console.log(idx, val)
                    return <option value={idx}>{music[idx].name} / {music[idx].composer}</option>
                })}
            </select>
            <br />
            <table border="3">
                <tr>
                    <th>曲名</th>
                    <th>Composer</th>
                    <th>EZ</th>
                    <th>HD</th>
                    <th>IN</th>
                    <th>AT</th>
                    <th>Legacy</th>
                </tr>
                <tr>
                    <td>{music.length > 0 ? music[selectedOption].name : null}</td>
                    <td>{music.length > 0 ? music[selectedOption].composer : null}</td>
                    <td>{music.length > 0 ? music[selectedOption].Easy : null}</td>
                    <td>{music.length > 0 ? music[selectedOption].Hard : null}</td>
                    <td>{music.length > 0 ? music[selectedOption].Insane : null}</td>
                    <td>{music.length > 0 ? music[selectedOption].Another : null}</td>
                    <td>{music.length > 0 ? music[selectedOption].Legacy : null}</td>
                </tr>
            </table>
        </>
    );

}

export default Show;