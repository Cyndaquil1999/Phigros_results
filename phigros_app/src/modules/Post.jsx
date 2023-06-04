import { useState, useEffect, React } from 'react';
import Axios from 'axios';
import '../style/Post.css';

function Update() {
    const [accuracy, setaccuracy] = useState(0);
    const [selecteddifficulty, setselecteddifficulty] = useState('');
    const [resultMessage, setresultMessage] = useState('');
    const [music, setMessage] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);

    const submit = async(e) => {
        e.preventDefault();

        const data = {
            difficulty: selecteddifficulty,
            accuracy: accuracy,
            name: selectedOption
        };

        await Axios.post('/scores', data)
        .then(res => {
            console.log(res);
            setresultMessage(<p>登録に成功しました！</p>);
        }).catch(err => {
            console.error(err);
            setresultMessage(<p>登録に失敗しました、再度お試しください。</p>);
        })
    }

    useEffect(() => {
      fetch("/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
      }, []);

    const handledifficultychange = (e) => {
      setselecteddifficulty(e.target.value);
    };

    const handleSelectChange = (e) => {
      setSelectedOption(e.target.value);
  };

    return (
        <>
          {resultMessage !== '' ? resultMessage : null}
          <h1>リザルトを登録</h1>
          <p><a href='../'>トップページに戻る</a></p>
          <p><a href='../calculation'>レート計算をする</a></p>
          <form onSubmit={submit}>
            <div>
            <label htmlFor={'name'}>曲名 : </label>
            <select value={selectedOption} onChange={handleSelectChange}>
                {music?.map((item, idx) => {
                    console.log(idx, item)
                    return <option value={music[idx].name}>{music[idx].name} / {music[idx].composer}</option>
                })}
            </select>
            </div>
            <br />
            <div>
              <label htmlFor={'difficulty'}>難易度 : </label>
              <select id={'difficulty'} name={'difficulty'} value={selecteddifficulty} onChange={handledifficultychange}>
                <option value="" selected>選択してください</option>
                <option value="Easy">EZ</option>
                <option value="Hard">HD</option>
                <option value="Insane">IN</option>
                <option value="Another">AT</option>
                <option value="Legacy">Legacy</option>
              </select>
            </div>
            <br />
            <div>
              <label htmlFor={'accuracy'}>精度 : </label>
              <input 
                id={`accuracy`} 
                type={`text`} 
                name={`accuracy`}
                placeholder={``}
                onChange={(e) => {
                  setaccuracy(e.target.value)
                }}
                autoComplete="off"
              />
            </div>

            <button type="submit">登録</button>
          </form>
        </>

      )
    }
    
export default Update;