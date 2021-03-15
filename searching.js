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

//1
//console.log(binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 8));
/**
 * step 1: 0 + 10 = 10/2 = 5 => [3 -> 12]
 * step 2: 0 + 4 = 4/2 = 2 => [6 -> 11]
 * step 3: 3 + 4 = 7/2 = 3 => *** 8
 */

//console.log(binarySearch([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 16));

//console.log(indexOf([3, 5, 6, 8, 11, 12, 14, 15, 17, 18], 5));
/**
 * step 1: 0 + 10 = 10/2 = 5 => 12 < 16 ==> [14 -> 18]
 * step 2: 6 + 10 = 16/2 = 8 => 17 > 16 ==> [14 -> 15]
 * step 3: 6 + 7 = 13/2 = 6 => 14 < 16 ==> [14 -> 14]
 * step 4: 7 + 7 = 14/2 = 7 => 15 < 16 ==> 
 * base case => -1
 */

//2 other file

//3. 
/**
 * Imgaine you are looking for a book in a library with a Dewey 
 * Decimal index. How would you go about it? Can you express this 
 * process as a search algorithm? Implement your algorithm to 
 * find a book whose Dewey and book title is provided.
 * 
 * Then find the next deeper level category
 *  cat1 cat2 cat3 cat4 -> go to specified category
 * [b1, b2, b3, b4, b5, b6, b7, b8] 
  * each book belongs to many growing categories 
  * in order to find a specific book start at the top level and 
  * eliminate groups of books along the way until you have gotten 
  * specific enough that you only have 1 book left. 
  * 
  *   more specifically if you list of all books is: (assuming the library sorts their books)
  * [110.2, 123.4, 543.4, 300.2]
  *   and you are searching for 123.4
  * 
  * check the first numbers of each book and only consider books with the same 
  * first number 
  * then same for second number until no numbers left
 * 
 */


//4. 

//in-order - (left child, parent, right child) 
//pre-order (parent, left child, right child) 
//post-order (left child, right child, parent)

/**
 * Given a binary search tree whose in-order and pre-order 
 * traversals are respectively 14 15 19 25 27 35 79 89 90 91 
 * and 35 25 15 14 19 27 89 79 91 90. What would be its postorder 
 * traversal?
 *  
 * in-order : 14, 15, 19, 25,   27,  35, 79, 89, 90, 91
 * pre-order : 35, 25, 15, 14, 19, 27, 89, 79, 91, 90
 * 
 * post-order:
 *           
 *             27         
 *      /              \ 
 *    15               90
 *   / \              /     \
 * 14   19           79     91
 *        \          /\
 *        25        35 89
 *                  
 *                 
 * 
 * 2) The post order traversal of a binary search tree is 
 * 5 7 9 11 10 8. What is its pre-order traversal?
 * 
 * 5 6 7 8 9 10 11
 * 
 *        8
 *   6         10
 * 5  7      9   11
 * 
 * 
 *    6 5 7 8 10 9 11
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
  insert(key, value){
    if(this.key === null){
      this.key = key; 
      this.value = value;
    }
    else if(key < this.key){
      if(this.left === null){
        this.left = new BinarySearchTree(key, value, this);
      }else{
        this.left.insert(key, value);
      }}
    else{
      if(this.right === null){
        this.right = new BinarySearchTree(key, value, this);
      }else{
        this.right.insert(key, value);
      }}
  }

  find(key){
    if(this.key === key){
      return this.value;
    }else if(key < this.key && this.left){
      return this.left.find(key);
    }else if(key > this.key && this.right){
      return this.right.find(key);
    }else{
      throw new Error('Key Error');
    }}

  remove(key){
    if(this.key === key){
      if(this.left && this.right){
        //findMin is a helper method
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      } else if (this.left){
        this._replaceWith(this.left);
      } else if(this.right){
        this._replaceWith(this.right);
      } else{
        this._replaceWith(null);
      }} else if (key < this.key && this.left){
      this.left.remove(key);
    } else if(key > this.key && this.right){
      this.right.remove(key);
    } else{
      throw new Error('Key Error');
    }}

  _replaceWith(node){
    if(this.parent){
      if(this === this.parent.left){
        this.parent.left = node;
      } else if (this === this.parent.right){
        this.parent.right = node;
      } if(node){
        node.parent = this.parent;
      }} else{
      if(node){
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else{
        this.key = null;
        this.value = null;
        this.left = null; 
        this.right = null;
      }}
  }

  _findMin(){
    if(!this.left){
      return this;
    }
    return this.left._findMin();
  }
  //go all the way left then return up one and got right...
  //and again..always pusing the left most first
  /**
   * In Order?
   * recursive left 
   * process
   * recursive right
   */
  depthFirstSearch(values=[]){
    if(this.left){
      console.log('step 1');
      values = this.left.depthFirstSearch(values);
    }
    values.push(this.values);
    if(this.right){
      console.log('step 2');
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

  dsfPreOrder(){
    //preOrder
    console.log(this.key);
    if(this.left){
      this.left.dsfPreOrder();
    }
    if(this.right){
      this.right.dsfPreOrder();
    }
  }
  dsfInOrder(){
    if(this.left){
      this.left.dsfInOrder();
    }
    console.log(this.key);
    if(this.right){
      this.right.dsfInOrder();
    }
  }

  dsfPostOrder(){
    if(this.left){
      this.left.dsfPostOrder();
    }
    if(this.right){
      this.right.dsfPostOrder();
    }
    console.log(this.key);
  }
}


function main(){
  let bst = new BinarySearchTree();
  bst.insert(25);
  bst.insert(15);
  bst.insert(50);
  bst.insert(10);
  bst.insert(24);
  bst.insert(35);
  bst.insert(70);
  bst.insert(4);
  bst.insert(12);
  bst.insert(18);
  bst.insert(31);
  bst.insert(44);
  bst.insert(66);
  bst.insert(90);
  bst.insert(22);
  return bst;
}

let tree = main();
//console.log(tree.dsfPreOrder());
//console.log(tree.dsfInOrder());
//console.log(tree.dsfPostOrder());


function nextCommanding(tree){
  console.log(tree.key);
  if(tree.left){
    console.log(tree.left.key);
  }
  if(tree.right){
    console.log(tree.right.key);
  }
  if(tree.left && tree.right){
    nextCommanding(tree.left);
    nextCommanding(tree.right);
  }
}
let rank = new BinarySearchTree();
rank.insert(5);
rank.insert(2);
rank.insert(3);
rank.insert(1);
rank.insert(4);
rank.insert(7);
rank.insert(6);
rank.insert(9);


function maxProfit(){

}

console.log(maxProfit([128, 97, 121, 123, 98, 97, 105]));

//s m t w th f s
/**
 * want the index of the largest and smallest 
 */

/**
 * Rank:           5
 *             2      7     
 *           1   3   6  9
 *                4
 */
console.log(nextCommanding(rank));



//interview question
/**
 * given postorder 
 * construct the BinarySearchTree 
 * 
 * input: 8, 12, 10, 16, 25, 20, 15
 * 
 *  left-child right-child parent
 * 
 * output:
 * 
 *        15
 *   10       20
 * 8  12    16  25
 * 
 * start with last: that's your root
 * find the next value that is smaller than the
 * roo (ie 10)
 * then find the next smallest...
 * 
 */

// function postToBST(arr, start = 0, end = length - 1){
//   if(start => end){
//     return;
//   }
//   let bst = new bst(arr[end]);
//   let i=0;
//   for(i=end; i>=start; i--){
//     if(arr[i]<bst.key){
//       break;
//     }
//   }
//   bst.left = postToBST(arr, start, i);
//   bst.right = postToBST(arr, i+1, end -1);
// }