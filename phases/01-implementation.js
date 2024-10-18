class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(numBuckets).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    let idx = this.hashMod(key)
    let newPair = new KeyValuePair(key, value);
    if(this.data[idx]){
      let node = this.data[idx];
      // check for existing nodes with same key
      while(node){
        if(node.key === key){
          // update if found
          node.value = value;
          return;
        }
        node = node.next;
      }
      // If we dont return out of the while loop then that key does not exist in the list
      newPair.next = this.data[idx];
      // set new pair to head
      this.data[idx] = newPair
      this.count++
    }else{
      this.data[idx] = newPair
      this.count++;
    }

  }


  read(key) {
    let idx = this.hashMod(key);
    if(this.data[idx]){
      let node = this.data[idx];
      while(node){
        if(node.key === key){
          return node.value;
        }
        node = node.next
      }
    }else{
      return undefined
    }
  }


  resize() {
    // double capacity
    this.capacity = this.capacity * 2;
    // copy old data
    let oldData = this.data;
    // create new data array of double size
    this.data = new Array(this.capacity).fill(null)
    // reset count
    this.count = 0;
    // iterate through all data including linkedlists
    for(const node of oldData){
      //if node is null then we continue to the next;
      if(node === null) continue;
      // if node exist
      if(node){
        //check if it is a single node
        if(node.next === null){
          this.insert(node.key, node.value)
        }else{
          let leafNode = node;
          while(leafNode){
            this.insert(leafNode.key, leafNode.value);
            leafNode = leafNode.next;
          }
        }
      }
    }
    // rehash each one with built in functions
  }


  delete(key) {
    // hash key for index
    let index = this.hashMod(key);
    // check data[index] exists
    // if not return error string
    if(this.data[index] === null) return "Key not found"
    // check if index does exist and the key matchs
    if(this.data[index] && this.data[index].key === key){
      // check if data is a linked list
      if(this.data[index].next){
        this.data[index] = this.data[index].next;
      }else{
        this.data[index] = null;
      }
    }
    if(this.data[index] && this.data[index].next){
      let leafnode = this.data[index]
      while(leafnode){
        if(leafnode.next.key === key){
          leafnode.next = null;
        }
        leafnode = leafnode.next;
      }
    }


  }
}


module.exports = HashTable;