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
    let currNodes: TrieNode[] = [this.rootNode];
    let currTerminates = this.rootNode.terminates;
    for (let i = 0; i < word.length; i++) {
      const nextCurrNodes = [];
      let nextTerminates = false;

      if (word[i] === '.') {
        for (const currNode of currNodes) {
          for (const outLink of currNode.links.filter(l => l !== undefined)) {
            nextCurrNodes.push(outLink);
            nextTerminates = nextTerminates || outLink.terminates;
          }
        }
      } else {
        for (const currNode of currNodes) {
          const ithCode = word.charCodeAt(i);
          const nextNode = currNode.links[ithCode - firstCode];
          if (nextNode !== undefined) {
            nextCurrNodes.push(nextNode);
            nextTerminates = nextTerminates || nextNode.terminates;
          }
        }
      }
      if (nextCurrNodes.length === 0) {
        return false;
      }
      currNodes = nextCurrNodes;
      currTerminates = nextTerminates;
    }
    return currTerminates;
  }
}
