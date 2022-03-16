// 题目: https://leetcode-cn.com/problems/binary-tree-level-order-traversal/submissions/

//  二叉树的层序遍历
// 分层遍历
function levelOrder(root) {
  const result = [];
  const queue = []; // 先用数组，正常应该 链表实现队列，因为链表实现队列的复杂度为O(1)

  // 边际情况
  if (root) {
    queue.push(root);
  }

  while (queue.length) {
    const temp = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const current = queue.shift();
      temp.push(current.val);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    result.push(temp);
  }

  return result;
}

function levelOrder_2(root) {
  
}