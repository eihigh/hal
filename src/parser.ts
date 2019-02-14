
namespace sette {
  // item types
  export const LIST = 0; // a: elements, b: items
  export const TABLE = 1; // a: pairs, b: items
  export const KEY = 2; // a: fields, b: items
  export const NUMBER = 3; // a: number
  export const STRING = 4; // a: start, b: end
  export const BOOL = 5; // a: 1 | 0
  export const NULL = 6;

  class Item {
    typ: number = 0;
    val: number = 0; // value for number/boolean
    str: string = ""; // string for string/heredoc
    totalLength: number = 0; // total length in src items for table/list
  }

  function err(message: string) { }

  class ValueIter {
    next() {
      if (this.isEnd) { return; }
      const succ = this.item.typ === LIST || this.item.typ === TABLE ? this.item.totalLength : 1;
      this.index += succ;
    }

    get isEnd() {
      if (this.item.typ === LIST) {
        return this.item.totalLength < 0;
      } else if (this.item.typ === KEY) {
        return true;
      }
      return false;
    }

    get item() { return this.src[this.index]; }

    constructor(
      private src: Item[],
      private index: number,
    ) { }
  }

  class PairIter {
    next() {
      if (this.isEnd) { return; }
      const succ = this.item.typ === LIST || this.item.typ === TABLE ? this.item.totalLength : 1;
      this.index += succ;
    }

    get isEnd() {
      if (this.item.typ === TABLE) {
        return this.item.totalLength < 0;
      }
      return false;
    }

    get key() { return this.item.str; }
    get first() { return new ValueIter(this.src, this.index + 1); }
    get item() { return this.src[this.index]; }

    constructor(
      private src: Item[],
      private index: number,
    ) { }
  }

  class List {
    get length() { return this.src[this.offset].val; }
    get first() { return new ValueIter(this.src, this.offset + 1); }

    *[Symbol.iterator]() {
      for (let i = this.first; !i.isEnd; i.next()) {
        yield i;
      }
    }

    constructor(
      private src: Item[],
      private offset: number,
    ) { }
  }

  class Table {
    get length() { return this.src[this.offset].val; }
    get first() { return new PairIter(this.src, this.offset + 1); }

    *[Symbol.iterator]() {
      for (let i = this.first; !i.isEnd; i.next()) {
        yield i;
      }
    }

    constructor(
      private src: Item[],
      private offset: number,
    ) { }
  }

  function hogehoge() {
    const src: Item[] = [];
    const li = new List(src, 0);
    for (const i of li) {
      console.log(i);
    }
  }
}
