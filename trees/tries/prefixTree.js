class TrieNode {
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let curr = this.root;

    // go through each char, make new node if needed
    for (const c of word) {
      if (!curr.children[c]) {
        curr.children[c] = new TrieNode();
      }
      curr = curr.children[c];
    }
    // curr is now last letter in word
    curr.endOfWord = true;
  }

  search(word) {
    let curr = this.root;

    // go through each char,
    // return false instead of making new nodes
    for (const c of word) {
      if (!curr.children[c]) {
        return false;
      }
      curr = curr.children[c];
    }

    // curr should be last in word;

    return curr.endOfWord;
  }

  // this is why you need a prefix tree
  // allows for this func to be v efficient
  startsWith(prefix) {
    let curr = this.root;

    // go through each char like above
    for (const c of prefix) {
      if (!(c in curr.children)) {
        return false;
      }
      curr = curr.children[c];
    }

    // don't need to check end of word
    return true;
  }
}
