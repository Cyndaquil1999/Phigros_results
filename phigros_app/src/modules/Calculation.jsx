import { useState, useEffect } from 'react';
import { Container, Typography, Link, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Box, Grid } from '@mui/material';

function Calculation() {
  const [results, setResults] = useState([]);
  const [perfect, setPerfect] = useState([]);
  let new_list = [];
  let total = 0;

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setResults(data.message));
  }, []);

  useEffect(() => {
    fetch("/perfect")
      .then((res) => res.json())
      .then((data) => setPerfect(data.perfect));
  }, []);

  results?.map((item, idx) => {
    new_list.push({ "name": results[idx].name, "composer": results[idx].composer, "diff": "EZ", "score": results[idx].Easy });
    new_list.push({ "name": results[idx].name, "composer": results[idx].composer, "diff": "HD", "score": results[idx].Hard });
    new_list.push({ "name": results[idx].name, "composer": results[idx].composer, "diff": "IN", "score": results[idx].Insane });
    new_list.push({ "name": results[idx].name, "composer": results[idx].composer, "diff": "AT", "score": results[idx].Another });
    new_list.push({ "name": results[idx].name, "composer": results[idx].composer, "diff": "Legacy", "score": results[idx].Legacy });
  });

  new_list = new_list?.sort((a, b) => b.score - a.score).slice(0, 30);

  new_list?.map((item, idx) => {
    if (idx <= 18) {
      total += new_list[idx].score;
    }
  });

  perfect?.map((item, idx) => {
    total = total + parseFloat(perfect[idx].maxScore);
  });

  const rating = (total / 20).toPrecision(4);

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Link href="../">トップページに戻る</Link>
        <Link href="../scores">リザルトを登録</Link>
      </Box>

      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item>
          <Typography variant="h3">Rating: {rating}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item>
          <Typography variant="h4">最大譜面定数</Typography>
        </Grid>
        {perfect?.map((item, idx) => (
          <Grid item key={idx}>
            <Typography variant="h4">
              {perfect[idx].name} / {perfect[idx].composer} / {perfect[idx].Difficulty}: {perfect[idx].maxScore}
            </Typography>
          </Grid>
        ))}
      </Grid>

    <Box mb={2}>
        <Typography variant="h3">レート計算は以下の手順で行います。</Typography>
        <ol>
            <Typography component="li" variant="body1">Ranking Scoreの高い方から19譜面のRanking Scoreを合計します。</Typography>
            <Typography component="li" variant="body1">次に理論値譜面の中で最大の譜面定数を足します。</Typography>
            <Typography component="li" variant="body1">最後にこれまでの合計値を20で割ります。これがレートとして与えられます。</Typography>
        </ol>
    </Box>

      <Typography variant="h3">Ranking Score上位30曲</Typography>
      <TableContainer component={Paper} mb={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>順位</TableCell>
              <TableCell>曲名</TableCell>
              <TableCell>Composer</TableCell>
              <TableCell>難易度</TableCell>
              <TableCell>Ranking Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {new_list?.map((val, idx) => (
              <TableRow key={idx} sx={{ bgcolor: idx <= 18 ? '#f5f5f5' : 'inherit' }}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{new_list[idx].name}</TableCell>
                <TableCell>{new_list[idx].composer}</TableCell>
                <TableCell>{new_list[idx].diff}</TableCell>
                <TableCell>{new_list[idx].score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Container>
  );
}

export default Calculation;
