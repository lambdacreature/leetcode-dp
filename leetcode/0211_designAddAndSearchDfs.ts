type TrieNode = {
  terminates: boolean;
  links: Array<undefined | TrieNode>;
}

class WordDictionary {
  rootNode: TrieNode;

  constructor() {
    this.rootNode = {
      terminates: false,
      links: Array(26),
    };
  }

  addWord(word: string): void {
    const firstCode = 'a'.charCodeAt(0);
    let currNode = this.rootNode;
    for (let i = 0; i < word.length; i++) {
      const ithCode = word.charCodeAt(i);
      const nextNode = currNode.links[ithCode - firstCode];
      if (nextNode === undefined) {
        // fill missing nodes
        for (let j = i; j < word.length; j++) {
          const jthCode = word.charCodeAt(j);
          const newNode: TrieNode = {
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

  search(word: string): boolean {
    const firstCode = 'a'.charCodeAt(0);
    const dfs = (startNode: TrieNode, startIndex: number): boolean => {
      if (startIndex === word.length) {
        return startNode.terminates;
      }

      let currNode = startNode;
      for (let i = startIndex; i < word.length; i++) {
        if (word[i] === '.') {
          for (const link of currNode.links) {
            if (link !== undefined && dfs(link, i+1)) {
              return true;
            }
          }
          return false;
        }

        const ithCode = word.charCodeAt(i);
        const nextNode = currNode.links[ithCode - firstCode];
        if (nextNode === undefined) {
          return false;
        }
        currNode = nextNode;
      }
      return currNode.terminates;
    };

    return dfs(this.rootNode, 0);
  }
}
