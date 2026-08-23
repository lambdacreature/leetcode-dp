function findAllConcatenatedWordsInADict(words: string[]): string[] {
  const concatenatedWords: string[] = [];

  const set = new Set(words);

  for (let i = 0; i < words.length; i++) {
    const targetWord = words[i];
    // dp[u] === targetWord[0..u] is a concatenated word
    const dp: boolean[] = Array(30).fill(false);

    // handle base cases for targetWord
    for (let j = 0; j < targetWord.length-1; j++) {
      dp[j] = set.has(targetWord.slice(0, j+1));
    }

    for (let u = 0; u < targetWord.length; u++) {
      for (let len = 1; len < targetWord.length; len++) {
        const prevEnd = u-len;
        if (prevEnd >= 0 && dp[prevEnd]) {
          if (set.has(targetWord.slice(prevEnd+1, prevEnd+1+len))) {
            dp[u] = true;
          }
        }
      }
    }

    if (dp[targetWord.length-1]) {
      concatenatedWords.push(targetWord);
    }
  }

  return concatenatedWords;
};
