class FrankensteinList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.asc_head = null;  
      this.desc_head = null; 
      this.size = 0;
    }
  
    createNode(item) {
      return {
        item: item,
        next: null,
        prev: null,
        greater: null,
        lesser: null,
      };
    }
  
    insertAt(item, pos) {
      if (pos === 0) {
        return this.pushFront(item);
      }
      if (pos >= this.size) {
        return this.pushBack(item);
      }
  
      const node = this.createNode(item);
      let count = 0;
      let cur = this.head;
      
      while (count !== pos) {
        cur = cur.next;
        count++;
      }
  
      node.prev = cur.prev;
      node.next = cur;
      cur.prev.next = node;
      cur.prev = node;
  
      this.size++;
      this.putInSortedOrder(node);
    }
  
    pushFront(item) {
      const node = this.createNode(item);
      if (!this.head) {
        this.head = this.tail = node;
        this.asc_head = this.desc_head = node;
      } else {
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
      }
  
      this.size++;
      this.putInSortedOrder(node);
    }
  
    pushBack(item) {
      const node = this.createNode(item);
      if (!this.tail) {
        this.head = this.tail = node;
        this.asc_head = this.desc_head = node;
      } else {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      }
  
      this.size++;
      this.putInSortedOrder(node);
    }
  
    putInSortedOrder(node) {
      let current = this.asc_head;
      while (current && current.item < node.item) {
        current = current.greater;
      }
      
      if (current) {
        if (current.prev) {
          current.prev.greater = node;
        }
        node.greater = cur;
      } else {
        this.asc_head = node;
      }
  
      cur = this.desc_head;
      while (cur && cur.item > node.item) {
        cur = cur.lesser;
      }
      
      if (cur) {
        if (cur.prev) {
          cur.prev.lesser = node;
        }
        node.lesser = cur;
      } else {
        this.desc_head = node;
      }
    }
  
    size() {
      return this.size;
    }
  
    printAsc() {
      let cur = this.asc_head;
      let result = [];
      while (cur) {
        result.push(cur.item);
        cur = cur.greater;
      }
      console.log("Ascending Order: ", result);
    }
  
    printDesc() {
      let cur = this.desc_head;
      let result = [];
      while (cur) {
        result.push(cur.item);
        cur = cur.lesser;
      }
      console.log("Descending Order: ", result);
    }
  }
  
  
  const list = new FrankensteinList();
  
  list.pushBack(10);
  list.pushBack(20);
  list.pushFront(5);
  list.pushBack(15);
  list.pushBack(25);
  
  list.printAsc(); 
  list.printDesc(); 
  
  list.insertAt(18, 2);
  list.printAsc();
  list.printDesc();
  
