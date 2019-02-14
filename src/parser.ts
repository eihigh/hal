
namespace sette {
  // token types
  export const LIST = 0;
  export const TABLE = 1;

  class Token {
    typ: number = 0;
    a: number = 0;
    b: number = 0;
  }

  class ValueIter {
    next() {
      if (this.isEnd) { return; }
      const succ = this.cur.typ === LIST || this.cur.typ === TABLE ? this.cur.b : 1;
      this.index += succ;
    }

    get isEnd() { return this.cur.b === -1; }
    get toNumber() { return this.cur.a; }

    get cur() {
      return this.src[this.index];
    }

    constructor(
      private src: Token[],
      private index: number,
    ) { }
  }

  class List {
    src: Token[] = [];
    offset: number = 0;
    get length() { return this.src[this.offset].a; }
    get first() { return new ValueIter(this.src, this.offset + 1); }

    *[Symbol.iterator]() {
      for (let i = this.first; !i.isEnd; i.next()) {
        yield i;
      }
    }
  }

  class PairIter {
    src: Token[] = [];
    offset: number = 0;
    index: number = 0;
    next() { }
    get key() { return ""; }
    get first() { return new ValueIter(this.src, this.offset + 1); }
  }

  function hogehoge() {
    const root = new List;
    for (let i = root.first; !i.isEnd; i.next()) {
      console.log(i.toNumber);
    }
    for (const i of root) {
      console.log(i.toNumber);
    }
  }
}
