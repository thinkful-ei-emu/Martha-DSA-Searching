//linear search
/**
 * Loops through the entire array until it finds the value
 * runtime best O(1) worst O(n) average O(n)
 */
function indexOf(array, value){
  for(let i=0; i <array.length; i++){
    if(array[i] === value){
      return i;
    }
  }
  return -1;
}

//Binary search 
/**
 * divide and conquer; elimnate sub arrays at every step 
 * runtime O(log(n))
 */
function binarySearch(array, value, start, end){
  //if start is not passed in then set to 0?
  start = start === undefined ? 0 : start;
  end = end === undefined ? array.length : end;

  //base case
  if(start > end){
    return -1;
  }

  //middle index
  const index = Math.floor((start + end) / 2);
  //middle item 
  const item = array[index];

  console.log(start, end);
  if(item == value){
    return index;
  }
  //right side
  else if(item < value){
    return binarySearch(array, value, index + 1, end);
  }
  //left side
  else if(item > value){
    return binarySearch(array, value, start, index - 1);
  }
}

//console.log(binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 8));
/**
 * step 1: 0 + 10 = 10/2 = 5 => [3 -> 12]
 * step 2: 0 + 4 = 4/2 = 2 => [6 -> 11]
 * step 3: 3 + 4 = 7/2 = 3 => *** 8
 */

console.log(binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 16));
/**
 * step 1: 0 + 10 = 10/2 = 5 => 12 < 16 ==> [14 -> 18]
 * step 2: 6 + 10 = 16/2 = 8 => 17 > 16 ==> [14 -> 15]
 * step 3: 6 + 7 = 13/2 = 6 => 14 < 16 ==> [14 -> 14]
 * step 4: 7 + 7 = 14/2 = 7 => 15 < 16 ==> 
 * base case => -1
 */

//2. 
let dataset = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];

//3. 
/**
 * Imgaine you are looking for a book in a library with a Dewey 
 * Decimal index. How would you go about it? Can you express this 
 * process as a search algorithm? Implement your algorithm to 
 * find a book whose Dewey and book title is provided.
 * 
 * This would be similar to binary searching, you first look for 
 * the correct high level category find that number 
 * 
 * Then find the next deeper level category
 * 
 */

class _Node{
  constructor(value){
    this.value = value; 
    this.next = null;
  }
}

class Queue {
  constructor(){
    this.first = null;
    this.last = null;
  }
  enqueue(data){
    const node = new _Node(data);
    if(this.first === null){
      this.first = node;
    }
    if(this.last){
      this.last.next = node;
    }
    this.last = node;
  }
  dequeue(){
    if(this.first === null){
      return; 
    }
    const node = this.first;
    this.first = this.first.next;
    if(node === this.last){
      this.last = null;
    }
    return node.value;
  }
}

class BinarySearchTree{
  constructor(key = null, value = null, parent = null){
    this.key = key;
    this.value = value; 
    this.parent = parent; 
    this.left = null; 
    this.right = null;
  }


  //go all the way left then return up one and got right...
  //and again..always pusing the left most first
  /**
   * recursive left 
   * process
   * recursive right
   */
  depthFirstSearch(values=[]){
    if(this.left){
      values = this.left.depthFirstSearch(values);
    }
    values.push(this.values);
    if(this.right){
      values = this.right.depthFirstSearch(values);
    }
    return values;
  }


  breadthFirstSearch(tree, values = []){
    const queue = new Queue();
    const node = tree.root; 
    queue.enqueue(node);
    while(queue.length){
      const node = queue.dequeue();
      values.push(node.value);
      if(node.left){
        queue.enqueue(node.left);
      }
      if(node.right){
        queue.enqueue(node.right);
      }
    }
    return values;
  }
}

//4. 

/**
 * Given a binary search tree whose in-order and pre-order 
 * traversals are respectively 14 15 19 25 27 35 79 89 90 91 
 * and 35 25 15 14 19 27 89 79 91 90. What would be its postorder 
 * traversal?
 * 
 * 
 *
 * 2) The post order traversal of a binary search tree is 
 * 5 7 6 9 11 10 8. What is its pre-order traversal?
 */