type Trie = {
  terminates: boolean;
  links: Array<undefined | Trie>;
};

function findWords(board: string[][], words: string[]): string[] {
  const firstCode = 'a'.charCodeAt(0);
  const trie: Trie = {
    terminates: false,
    links: Array(26),
  };

  let maxWordLen = 0;
  // fill up that trie!
  for (const word of words) {
    maxWordLen = Math.max(maxWordLen, word.length);
    let currNode = trie;
    for (let i = 0; i < word.length; i++) {
      const ithCode = word.charCodeAt(i);
      const nextNode = currNode.links[ithCode - firstCode];
      if (nextNode === undefined) {
        for (let j = i; j < word.length; j++) {
          const jthCode = word.charCodeAt(j);
          const newNode: Trie = {
            terminates: false,
            links: Array(26),
          };
          currNode.links[jthCode - firstCode] = newNode;
          currNode = newNode;
        }
        break;
      }
      currNode = nextNode;
    }
    currNode.terminates = true;
  }

  const visited: boolean[][] = Array(board.length);
  for (let i = 0; i < board.length; i++) {
    visited[i] = [];
    for (let j = 0; j < board[0].length; j++) {
      visited[i].push(false);
    }
  }

  const currWord: string[] = [];
  const foundWords = new Set<string>();
  const search = (i: number, j: number, currNode: Trie, len: number): void => {
    if (visited[i][j] || len > 10) {
      return;
    }

    const code = board[i][j].charCodeAt(0);
    const nextNode = currNode.links[code - firstCode];
    if (nextNode === undefined) {
      visited[i][j] = false;
      return;
    }

    currWord.push(board[i][j]);
    visited[i][j] = true;

    if (nextNode.terminates) {
      foundWords.add(currWord.join(''));
    }

    // i+1, j
    if (i+1 < board.length) {
      search(i+1, j, nextNode, len+1);
    }

    // i, j+1
    if (j+1 < board[i].length) {
      search(i, j+1, nextNode, len+1);
    }

    // i-1, j
    if (i-1 >= 0) {
      search(i-1, j, nextNode, len+1);
    }

    // i, j-1
    if (j-1 >= 0) {
      search(i, j-1, nextNode, len+1);
    }

    visited[i][j] = false;
    currWord.pop();
    return;
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      search(i, j, trie, 0);
    }
  }

  const res: string[] = [];
  for (const foundWord of foundWords) {
    res.push(foundWord);
  }

  return res;
};
