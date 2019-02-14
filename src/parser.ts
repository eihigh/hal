
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
    src: Token[] = [];
    offset: number = 0;
    index: number = 0;
    next() { }
    get isEnd() { return false; }
    get toNumber() { return 0; }
  }

  class List {
    src: Token[] = [];
    offset: number = 0;
    get length() { return this.src[this.offset].a; }
    get first() { return new ValueIter; }
  }

  class PairIter {
    src: Token[] = [];
    offset: number = 0;
    index: number = 0;
    next() { }
    get key() { return ""; }
    get first() { return new ValueIter; }
  }

  function hogehoge() {
    const root = new List;
    for (let i = root.first; !i.isEnd; i.next()) {
      console.log(i.toNumber);
    }
  }
}
