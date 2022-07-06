class CodeHistory {
  constructor() {
    this.localKey = "codeHistory";
    this.get();
  }
  #set(a) {
    try {
      localStorage.setItem(this.localKey, JSON.stringify(a));
    } catch (e) {
      console.error(e);
    }
  }
  get() {
    let tmp = localStorage.getItem(this.localKey);
    let result = [];
    if (tmp !== null) {
      try {
        result = JSON.parse(tmp);
      } catch (e) {
        console.error(e);
        this.#set([]);
      }
    }
    return result;
  }
  push(a) {
    let result = this.get();
    result.unshift(a);
    this.#set(result);
    return result;
  }
  clear() {
    this.#set([]);
    return [];
  }
  remove(id) {
    let result = this.get();
    let res = result.filter((a) => a.id !== id);
    this.#set(res);
    return res;
  }
}

export default new CodeHistory();
