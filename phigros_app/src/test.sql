SELECT music_diff.name, music_diff.composer,
    CASE WHEN music_results.Easy = 1 THEN music_diff.diff_EZ ELSE 0 END AS maxEasy,
    CASE WHEN music_results.Hard = 1 THEN music_diff.diff_HD ELSE 0 END AS maxHard,
    CASE WHEN music_results.Insane = 1 THEN music_diff.diff_IN ELSE 0 END AS maxInsane,
    CASE WHEN music_results.Another = 1 THEN music_diff.diff_AT ELSE 0 END AS maxAnother,
    CASE WHEN music_results.Legacy = 1 THEN music_diff.diff_Legacy ELSE 0 END AS maxLegacy
FROM music_diff
JOIN music_results ON music_diff.name = music_results.name
WHERE music_results.Easy = 1 OR music_results.Hard = 1 OR music_results.Insane = 1 OR music_results.Another = 1 OR music_results.Legacy = 1
ORDER BY GREATEST(maxEasy, maxHard, maxInsane, maxAnother, maxLegacy) DESC
LIMIT 1;



SELECT maxScores.name, maxScores.composer, maxScores.maxScore
FROM (
  SELECT music_diff.name, music_diff.composer,
    GREATEST(
      MAX(CASE WHEN music_results.Easy = 1 THEN music_diff.diff_EZ ELSE 0 END),
      MAX(CASE WHEN music_results.Hard = 1 THEN music_diff.diff_HD ELSE 0 END),
      MAX(CASE WHEN music_results.Insane = 1 THEN music_diff.diff_IN ELSE 0 END),
      MAX(CASE WHEN music_results.Another = 1 THEN music_diff.diff_AT ELSE 0 END),
      MAX(CASE WHEN music_results.Legacy = 1 THEN music_diff.diff_Legacy ELSE 0 END)
    ) AS maxScore
  FROM music_diff
  JOIN music_results ON music_diff.name = music_results.name
  WHERE music_results.Easy = 1 OR music_results.Hard = 1 OR music_results.Insane = 1 OR music_results.Another = 1 OR music_results.Legacy = 1
  GROUP BY music_diff.name, music_diff.composer
) AS maxScores
ORDER BY maxScore DESC
LIMIT 1;



SELECT maxScores.name, maxScores.composer, maxScores.maxScore, maxScores.maxDifficulty
FROM (
  SELECT music_diff.name, music_diff.composer,
    GREATEST(
      MAX(CASE WHEN music_results.Easy = 1 THEN music_diff.diff_EZ ELSE 0 END),
      MAX(CASE WHEN music_results.Hard = 1 THEN music_diff.diff_HD ELSE 0 END),
      MAX(CASE WHEN music_results.Insane = 1 THEN music_diff.diff_IN ELSE 0 END),
      MAX(CASE WHEN music_results.Another = 1 THEN music_diff.diff_AT ELSE 0 END),
      MAX(CASE WHEN music_results.Legacy = 1 THEN music_diff.diff_Legacy ELSE 0 END)
    ) AS maxScore,
    CASE GREATEST(
      MAX(CASE WHEN music_results.Easy = 1 THEN music_diff.diff_EZ ELSE 0 END),
      MAX(CASE WHEN music_results.Hard = 1 THEN music_diff.diff_HD ELSE 0 END),
      MAX(CASE WHEN music_results.Insane = 1 THEN music_diff.diff_IN ELSE 0 END),
      MAX(CASE WHEN music_results.Another = 1 THEN music_diff.diff_AT ELSE 0 END),
      MAX(CASE WHEN music_results.Legacy = 1 THEN music_diff.diff_Legacy ELSE 0 END)
    )
    WHEN MAX(CASE WHEN music_results.Easy = 1 THEN music_diff.diff_EZ ELSE 0 END) THEN 'Easy'
    WHEN MAX(CASE WHEN music_results.Hard = 1 THEN music_diff.diff_HD ELSE 0 END) THEN 'Hard'
    WHEN MAX(CASE WHEN music_results.Insane = 1 THEN music_diff.diff_IN ELSE 0 END) THEN 'Insane'
    WHEN MAX(CASE WHEN music_results.Another = 1 THEN music_diff.diff_AT ELSE 0 END) THEN 'Another'
    WHEN MAX(CASE WHEN music_results.Legacy = 1 THEN music_diff.diff_Legacy ELSE 0 END) THEN 'Legacy'
    ELSE ''
    END AS maxDifficulty
  FROM music_diff
  JOIN music_results ON music_diff.name = music_results.name
  WHERE music_results.Easy = 1 OR music_results.Hard = 1 OR music_results.Insane = 1 OR music_results.Another = 1 OR music_results.Legacy = 1
  GROUP BY music_diff.name, music_diff.composer
) AS maxScores
ORDER BY maxScore DESC
LIMIT 1;






SELECT 'Easy' AS column_name, column1 AS combined_column, name, composer
FROM (
  SELECT name, composer, Easy, Hard, Insane, Another, Legacy,
    CASE WHEN Easy >= 0.70 THEN ROUND(diff_EZ*POWER(((Easy*100-55)/45), 2), 2) ELSE 0 END AS diff_EZ,
    CASE WHEN Hard >= 0.70 THEN ROUND(diff_HD*POWER(((Hard*100-55)/45), 2), 2) ELSE 0 END AS diff_HD,
    CASE WHEN Insane >= 0.70 THEN ROUND(diff_IN*POWER(((Insane*100-55)/45), 2), 2) ELSE 0 END AS diff_IN,
    CASE WHEN Another >= 0.70 THEN ROUND(diff_AT*POWER(((Another*100-55)/45), 2), 2) ELSE 0 END AS diff_AT,
    CASE WHEN Legacy >= 0.70 THEN ROUND(diff_Legacy*POWER(((Legacy*100-55)/45), 2), 2) ELSE 0 END AS diff_Legacy
  FROM music_diff JOIN music_results ON music_diff.name = music_results.name
) AS subquery1

UNION ALL

SELECT 'Hard' AS column_name, column2 AS combined_column, name, composer
FROM (
  SELECT name, composer, Easy, Hard, Insane, Another, Legacy,
    CASE WHEN Easy >= 0.70 THEN ROUND(diff_EZ*POWER(((Easy*100-55)/45), 2), 2) ELSE 0 END AS diff_EZ,
    CASE WHEN Hard >= 0.70 THEN ROUND(diff_HD*POWER(((Hard*100-55)/45), 2), 2) ELSE 0 END AS diff_HD,
    CASE WHEN Insane >= 0.70 THEN ROUND(diff_IN*POWER(((Insane*100-55)/45), 2), 2) ELSE 0 END AS diff_IN,
    CASE WHEN Another >= 0.70 THEN ROUND(diff_AT*POWER(((Another*100-55)/45), 2), 2) ELSE 0 END AS diff_AT,
    CASE WHEN Legacy >= 0.70 THEN ROUND(diff_Legacy*POWER(((Legacy*100-55)/45), 2), 2) ELSE 0 END AS diff_Legacy
  FROM music_diff JOIN music_results ON music_diff.name = music_results.name
) AS subquery2

UNION ALL

SELECT 'Insane' AS column_name, column3 AS combined_column, name, composer
FROM (
  SELECT name, composer, Easy, Hard, Insane, Another, Legacy,
    CASE WHEN Easy >= 0.70 THEN ROUND(diff_EZ*POWER(((Easy*100-55)/45), 2), 2) ELSE 0 END AS diff_EZ,
    CASE WHEN Hard >= 0.70 THEN ROUND(diff_HD*POWER(((Hard*100-55)/45), 2), 2) ELSE 0 END AS diff_HD,
    CASE WHEN Insane >= 0.70 THEN ROUND(diff_IN*POWER(((Insane*100-55)/45), 2), 2) ELSE 0 END AS diff_IN,
    CASE WHEN Another >= 0.70 THEN ROUND(diff_AT*POWER(((Another*100-55)/45), 2), 2) ELSE 0 END AS diff_AT,
    CASE WHEN Legacy >= 0.70 THEN ROUND(diff_Legacy*POWER(((Legacy*100-55)/45), 2), 2) ELSE 0 END AS diff_Legacy
  FROM music_diff JOIN music_results ON music_diff.name = music_results.name
) AS subquery3

SELECT 'Another' AS column_name, column4 AS combined_column, name, composer
FROM (
  SELECT name, composer, Easy, Hard, Insane, Another, Legacy,
    CASE WHEN Easy >= 0.70 THEN ROUND(diff_EZ*POWER(((Easy*100-55)/45), 2), 2) ELSE 0 END AS diff_EZ,
    CASE WHEN Hard >= 0.70 THEN ROUND(diff_HD*POWER(((Hard*100-55)/45), 2), 2) ELSE 0 END AS diff_HD,
    CASE WHEN Insane >= 0.70 THEN ROUND(diff_IN*POWER(((Insane*100-55)/45), 2), 2) ELSE 0 END AS diff_IN,
    CASE WHEN Another >= 0.70 THEN ROUND(diff_AT*POWER(((Another*100-55)/45), 2), 2) ELSE 0 END AS diff_AT,
    CASE WHEN Legacy >= 0.70 THEN ROUND(diff_Legacy*POWER(((Legacy*100-55)/45), 2), 2) ELSE 0 END AS diff_Legacy
  FROM music_diff JOIN music_results ON music_diff.name = music_results.name
) AS subquery4

SELECT 'Legacy' AS column_name, column5 AS combined_column, name, composer
FROM (
  SELECT name, composer, Easy, Hard, Insane, Another, Legacy,
    CASE WHEN Easy >= 0.70 THEN ROUND(diff_EZ*POWER(((Easy*100-55)/45), 2), 2) ELSE 0 END AS diff_EZ,
    CASE WHEN Hard >= 0.70 THEN ROUND(diff_HD*POWER(((Hard*100-55)/45), 2), 2) ELSE 0 END AS diff_HD,
    CASE WHEN Insane >= 0.70 THEN ROUND(diff_IN*POWER(((Insane*100-55)/45), 2), 2) ELSE 0 END AS diff_IN,
    CASE WHEN Another >= 0.70 THEN ROUND(diff_AT*POWER(((Another*100-55)/45), 2), 2) ELSE 0 END AS diff_AT,
    CASE WHEN Legacy >= 0.70 THEN ROUND(diff_Legacy*POWER(((Legacy*100-55)/45), 2), 2) ELSE 0 END AS diff_Legacy
  FROM music_diff JOIN music_results ON music_diff.name = music_results.name
) AS subquery5

ORDER BY name;





SELECT music_diff.name, composer,
  CASE 
    WHEN Easy >= Hard AND Easy >= Insane AND Easy >= Another AND Easy >= Legacy THEN 'Easy'
    WHEN Hard >= Easy AND Hard >= Insane AND Hard >= Another AND Hard >= Legacy THEN 'Hard'
    WHEN Insane >= Easy AND Insane >= Hard AND Insane >= Another AND Insane >= Legacy THEN 'Insane'
    WHEN Another >= Easy AND Another >= Hard AND Another >= Insane AND Another >= Legacy THEN 'Another'
    WHEN Legacy >= Easy AND Legacy >= Hard AND Legacy >= Insane AND Legacy >= Another THEN 'Legacy'
  END AS difficulty,
  CASE 
    WHEN Easy >= Hard AND Easy >= Insane AND Easy >= Another AND Easy >= Legacy THEN ROUND(diff_EZ*POWER(((Easy*100-55)/45), 2), 2)
    WHEN Hard >= Easy AND Hard >= Insane AND Hard >= Another AND Hard >= Legacy THEN ROUND(diff_HD*POWER(((Hard*100-55)/45), 2), 2)
    WHEN Insane >= Easy AND Insane >= Hard AND Insane >= Another AND Insane >= Legacy THEN ROUND(diff_IN*POWER(((Insane*100-55)/45), 2), 2)
    WHEN Another >= Easy AND Another >= Hard AND Another >= Insane AND Another >= Legacy THEN ROUND(diff_AT*POWER(((Another*100-55)/45), 2), 2)
    WHEN Legacy >= Easy AND Legacy >= Hard AND Legacy >= Insane AND Legacy >= Another THEN ROUND(diff_Legacy*POWER(((Legacy*100-55)/45), 2), 2)
  END AS value
FROM music_diff 
JOIN music_results ON music_diff.name = music_results.name 
ORDER BY value DESC;



SELECT name, composer, value
FROM (
    SELECT name, composer, value,
    ROW_NUMBER() OVER (ORDER BY value DESC) AS rank
    FROM (
        SELECT music_diff.name, composer,
        CASE
            WHEN Easy >= 0.70 THEN ROUND(diff_EZ * POWER(((Easy * 100 - 55) / 45), 2), 2) ELSE 0
        END AS Easy,
        CASE
            WHEN Hard >= 0.70 THEN ROUND(diff_HD * POWER(((Hard * 100 - 55) / 45), 2), 2) ELSE 0
        END AS Hard,
        CASE
            WHEN Insane >= 0.70 THEN ROUND(diff_IN * POWER(((Insane * 100 - 55) / 45), 2), 2) ELSE 0
        END AS Insane,
        CASE
            WHEN Another >= 0.70 THEN ROUND(diff_AT * POWER(((Another * 100 - 55) / 45), 2), 2) ELSE 0
        END AS Another,
        CASE
            WHEN Legacy >= 0.70 THEN ROUND(diff_Legacy * POWER(((Legacy * 100 - 55) / 45), 2), 2) ELSE 0
        END AS Legacy,
        GREATEST(
            CASE WHEN Easy >= 0.70 THEN ROUND(diff_EZ * POWER(((Easy * 100 - 55) / 45), 2), 2) ELSE 0 END,
            CASE WHEN Hard >= 0.70 THEN ROUND(diff_HD * POWER(((Hard * 100 - 55) / 45), 2), 2) ELSE 0 END,
            CASE WHEN Insane >= 0.70 THEN ROUND(diff_IN * POWER(((Insane * 100 - 55) / 45), 2), 2) ELSE 0 END,
            CASE WHEN Another >= 0.70 THEN ROUND(diff_AT * POWER(((Another * 100 - 55) / 45), 2), 2) ELSE 0 END,
            CASE WHEN Legacy >= 0.70 THEN ROUND(diff_Legacy * POWER(((Legacy * 100 - 55) / 45), 2), 2) ELSE 0 END
        ) AS value
        FROM music_diff
        JOIN music_results ON music_diff.name = music_results.name
    ) AS subquery
) AS subquery2
WHERE rank <= 30
ORDER BY rank;
