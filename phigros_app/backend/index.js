const express = require('express')
require('dotenv').config();
const mysql = require('mysql2')
const app = express()
const port = process.env.SERVER_PORT

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

app.get('/api', (req, res) => {
  sql_api = `SELECT DISTINCT music_diff.name, composer, 
  CASE WHEN 
      Easy >= 0.70 THEN 
      ROUND(diff_EZ*POWER(((Easy*100-55)/45), 2), 2) ELSE 0 
  END AS Easy,
  CASE WHEN 
      Hard >= 0.70 THEN 
      ROUND(diff_HD*POWER(((Hard*100-55)/45), 2), 2) ELSE 0 
  END AS Hard,
  CASE WHEN 
      Insane >= 0.70 THEN 
      ROUND(diff_IN*POWER(((Insane*100-55)/45), 2), 2) ELSE 0 
  END AS Insane,
  
  CASE WHEN 
      Another >= 0.70 THEN 
      ROUND(diff_AT*POWER(((Another*100-55)/45), 2), 2) ELSE 0 
  END AS Another,
  CASE WHEN
      Legacy >= 0.70 THEN 
      ROUND(diff_Legacy*POWER(((Legacy*100-55)/45), 2), 2) ELSE 0 
  END AS Legacy
  FROM music_diff JOIN music_results ON music_diff.name = music_results.name ORDER BY name; 
  `
  connection.query(sql_api, 
    function (err, results) {
      if (err) {
        console.log("データベースからの読み込みでエラーが発生しました")
        throw err;
      }
      res.json({message:results})  
    }
  )

  console.log("正常に終了しました")
})

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})


app.post('/scores', (req, res) => {
  console.log(req.body)
  const { difficulty, accuracy, name } = req.body;
  const params = [difficulty, parseFloat(accuracy/100), name];
  console.log(params);

  connection.query(
    'UPDATE music_results SET ?? = ? WHERE name = ?;',
    params,
    function (err, results) {
      if (err) {
        console.log('データベースの登録でエラーが発生しました')
        res.sendStatus(500);
        throw err;
      } else {
      console.log('正常に登録できました');
      res.sendStatus(200);
    }
  }
  );
})


app.get('/perfect', (req, res) => {
  sql_perfect = `SELECT maxScores.name, maxScores.composer, maxScores.maxScore,
  CASE
    WHEN maxScores.maxScore = maxScores.maxDiff_EZ THEN 'Easy'
    WHEN maxScores.maxScore = maxScores.maxDiff_HD THEN 'Hard'
    WHEN maxScores.maxScore = maxScores.maxDiff_IN THEN 'Insane'
    WHEN maxScores.maxScore = maxScores.maxDiff_AT THEN 'Another'
    WHEN maxScores.maxScore = maxScores.maxDiff_Legacy THEN 'Legacy'
    ELSE ''
  END AS Difficulty
FROM (
  SELECT music_diff.name, music_diff.composer,
    GREATEST(
      MAX(CASE WHEN music_results.Easy = 1 THEN music_diff.diff_EZ ELSE 0 END),
      MAX(CASE WHEN music_results.Hard = 1 THEN music_diff.diff_HD ELSE 0 END),
      MAX(CASE WHEN music_results.Insane = 1 THEN music_diff.diff_IN ELSE 0 END),
      MAX(CASE WHEN music_results.Another = 1 THEN music_diff.diff_AT ELSE 0 END),
      MAX(CASE WHEN music_results.Legacy = 1 THEN music_diff.diff_Legacy ELSE 0 END)
    ) AS maxScore,
    MAX(CASE WHEN music_results.Easy = 1 THEN music_diff.diff_EZ ELSE 0 END) AS maxDiff_EZ,
    MAX(CASE WHEN music_results.Hard = 1 THEN music_diff.diff_HD ELSE 0 END) AS maxDiff_HD,
    MAX(CASE WHEN music_results.Insane = 1 THEN music_diff.diff_IN ELSE 0 END) AS maxDiff_IN,
    MAX(CASE WHEN music_results.Another = 1 THEN music_diff.diff_AT ELSE 0 END) AS maxDiff_AT,
    MAX(CASE WHEN music_results.Legacy = 1 THEN music_diff.diff_Legacy ELSE 0 END) AS maxDiff_Legacy
  FROM music_diff
  JOIN music_results ON music_diff.name = music_results.name
  WHERE music_results.Easy = 1 OR music_results.Hard = 1 OR music_results.Insane = 1 OR music_results.Another = 1 OR music_results.Legacy = 1
  GROUP BY music_diff.name, music_diff.composer
) AS maxScores
ORDER BY maxScores.maxScore DESC
LIMIT 1;
`

  connection.query(sql_perfect,
    function (err, results) {
      if (err) {
        console.error("データベースからの読み込みでエラーが発生しました");
        throw err;
      }
      res.json({perfect: results})
    }
    )
})