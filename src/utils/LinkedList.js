class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item, null);
    }
  }

  insertAt(item, pos) {
    let currNode = this.head;
    let previousNode = this.head;
    let i = 0;

    if (pos === 0) {
      this.head = new _Node(item, this.head);
      return;
    }

    while (i !== pos) {
      if (currNode.next === null) {
        return console.log('Index does not exist');
      }
      previousNode = currNode;
      currNode = currNode.next;
      i++;
    }
    previousNode.next = new _Node(item, this.head /* currNode */);
  }

  insertAfter(item, keyValue) {
    let currNode = this.head;

    while (currNode.value !== keyValue) {
      if (currNode.next !== null) {
        currNode = currNode.next;
      }
    }
    currNode.next = new _Node(item, currNode.next);
  }

  insertBefore(item, keyValue) {
    let currNode = this.head;
    let previousNode = this.head;

    while (currNode.value !== keyValue) {
      if (currNode.next !== null) {
        previousNode = currNode;
        currNode = currNode.next;
      }
    }
    previousNode.next = new _Node(item, currNode);
  }

  find(item) {
    let currNode = this.head;

    if (!this.head) {
      return null;
    }

    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode;
  }

  remove(item) {
    if (!this.head) {
      return null;
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    let currNode = this.head;
    let previousNode = this.head;

    while (currNode !== null && currNode.value !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }
}

export default LinkedList;
