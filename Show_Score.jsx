import { useState, useEffect } from 'react';
import { Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

function Results() {
  const [results, setResults] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    fetch('/results')
      .then((res) => res.json())
      .then((data) => setResults(data.results));
  }, []);


  const filteredResults = selectedDifficulty
    ? results.filter((result) => result[selectedDifficulty] === '100.00')
    : results;

  return (
    <>
                <header>
                <h1>Phigros リザルト保管・レート計算機</h1>
            </header>
            <p>
        <a href="/scores">リザルトを登録</a>
      </p>
      <p>
        <a href="../calculation">レート計算をする</a>
      </p>

      <h2>全曲の精度</h2>
      <TableContainer component={Paper} style={{ marginTop: '16px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>曲名</TableCell>
              <TableCell>Composer</TableCell>
              <TableCell>EZ(%)</TableCell>
              <TableCell>HD(%)</TableCell>
              <TableCell>IN(%)</TableCell>
              <TableCell>AT(%)</TableCell>
              <TableCell>Legacy(%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResults.map((result, idx) => (
              <TableRow key={idx}>
                <TableCell>{result.name}</TableCell>
                <TableCell>{result.composer}</TableCell>
                <TableCell>{result.EZ}</TableCell>
                <TableCell>{result.HD}</TableCell>
                <TableCell>{result.IN}</TableCell>
                <TableCell>{result.AT}</TableCell>
                <TableCell>{result.Legacy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Results;
