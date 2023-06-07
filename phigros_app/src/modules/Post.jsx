import { useState, useEffect } from 'react';
import Axios from 'axios';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import '../style/Post.css';

function Update() {
  const [accuracy, setAccuracy] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [resultMessage, setResultMessage] = useState('');
  const [music, setMusic] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      difficulty: selectedDifficulty,
      accuracy: accuracy,
      name: selectedOption
    };

    try {
      const res = await Axios.post('/scores', data);
      console.log(res);
      setResultMessage(<p style={{ color: 'green' }}>登録に成功しました！</p>);
    } catch (err) {
      console.error(err);
      setResultMessage(<p style={{ color: 'red' }}>登録に失敗しました、再度お試しください。</p>);
    }
  };

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setMusic(data.message));
  }, []);

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleAccuracyChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setAccuracy('');
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
        setAccuracy(value);
      }
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      
      <h1>リザルトを登録</h1>
      <p><a href='../'>トップページに戻る</a></p>
      <p><a href='../calculation'>レート計算をする</a></p>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: '16px', minWidth: '600px' }}>
          <FormControl fullWidth>
            <InputLabel id="name-label">曲名</InputLabel>
            <Select
              labelId="name-label"
              id="name"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              {music?.map((item, idx) => (
                <MenuItem key={idx} value={`${music[idx].name} / ${music[idx].composer}`}>
                  {`${music[idx].name} / ${music[idx].composer}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl fullWidth>
            <InputLabel id="difficulty-label">難易度</InputLabel>
            <Select
              labelId="difficulty-label"
              id="difficulty"
              value={selectedDifficulty}
              onChange={handleDifficultyChange}
            >
              <MenuItem value="Easy">EZ</MenuItem>
              <MenuItem value="Hard">HD</MenuItem>
              <MenuItem value="Insane">IN</MenuItem>
              <MenuItem value="Another">AT</MenuItem>
              <MenuItem value="Legacy">Legacy</MenuItem>
            </Select>
          </FormControl>
          <br />
          <TextField
            fullWidth
            id="accuracy"
            label="精度"
            type="number"
            inputProps={{ step: '0.01', min: '0', max: '100', maxLength: '5' }}
            value={accuracy}
            onChange={handleAccuracyChange}
            autoComplete="off"
          />
          <br />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            登録
          </Button>
        </Box>
      </form>
      {resultMessage !== '' ? resultMessage : null}
    </>
  );
}

export default Update;
