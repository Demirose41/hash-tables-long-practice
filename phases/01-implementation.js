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
    if(this.count >= this.capacity * 0.7) this.resize()
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

      // If we dont return out of the while loop then that key does 
      // not exist in the list
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
    // check if key exists in bucket
    let index = this.hashMod(key);
    if(!this.read(key)) return "Key not found" 
    if(this.data[index]){
      let node = this.data[index]
      if(node.key === key && node.next === null) this.data[index] = null;
      while(node.next){
        if(node.key === key) {
          node = node.next;
          this.data[index] = node
          this.count--;
          return;
        }if(node.next.key === key){
          if(node.next.next === null){
            node.next = null;
            this.count--;
            return
          }else{
            node.next = node.next.next;
            this.count--;
            return
          }
        }
        node = node.next;
      }
      this.count--;
    }


  }
}


module.exports = HashTable;