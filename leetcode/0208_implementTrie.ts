type TrieNode = {
  terminates: boolean;
  links: Array<undefined | TrieNode>;
}

class Trie {
  rootNode: TrieNode;

  constructor() {
    this.rootNode = {
      terminates: false,
      links: Array(26),
    };
  }

  insert(word: string): void {
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
    let currNode = this.rootNode;
    for (let i = 0; i < word.length; i++) {
      const ithCode = word.charCodeAt(i);
      const nextNode = currNode.links[ithCode - firstCode];
      if (nextNode === undefined) {
        return false;
      }
      currNode = nextNode;
    }
    return currNode.terminates;
  }

  startsWith(prefix: string): boolean {
    const firstCode = 'a'.charCodeAt(0);
    let currNode = this.rootNode;
    for (let i = 0; i < prefix.length; i++) {
      const ithCode = prefix.charCodeAt(i);
      const nextNode = currNode.links[ithCode - firstCode];
      if (nextNode === undefined) {
        return false;
      }
      currNode = nextNode;
    }
    return true;
  }
}
