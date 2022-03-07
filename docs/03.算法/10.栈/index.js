function isValid(s) {
  // 处理边界
  if (!s) {
    return false;
  }
  const len = s.length;
  if (len % 2 === 1) {
    // 长度为奇数，不可能是一个有效的合法字符
    return false;
  }
  // 消除法的主要核心逻辑:
  const stack = [];
  const isEmpty = () => stack.length === 0;
  for (let i = 0; i < len; i++) {
    const item = s[i];
    if (item === "(") {
      // 入栈
      stack.push(item);
    } else if (item === ")") {
      if (isEmpty()) {
        // 出栈失败
        return false;
      }
      // 出栈
      stack.pop();
    }
  }

  return isEmpty();
}

// test
console.log("==== isValid ====");
console.log(isValid("()()(())"));
console.log(isValid("()()(()"));

/*****
 * ** =========== 深度优化 ==========
 * 栈中相邻的内容相同引入计数，这样就可以不用入栈了，减少内存消耗
 * ***********/
function isValid_deep(s) {
  // 处理边界
  if (!s) {
    return false;
  }
  const len = s.length;
  if (len % 2 === 1) {
    // 长度为奇数，不可能是一个有效的合法字符
    return false;
  }
  // 消除法的主要核心逻辑:
  let leftBraceNum = 0; // 记录相邻相同的内容个数
  const isEmpty = () => leftBraceNum === 0;
  for (let i = 0; i < len; i++) {
    const item = s[i];
    if (item === "(") {
      // 如果是'('，那么压栈
      leftBraceNum++;
    } else if (item === ")") {
      // 如果是')'，那么就尝试弹栈
      if (isEmpty()) {
        // 如果弹栈失败，那么返回false
        return false;
      }
      // 出栈
      leftBraceNum--;
    }
  }

  return isEmpty();
}

console.log("==== isValid_deep ====");
console.log(isValid_deep("()()(())"));
console.log(isValid_deep("()()(()"));

/*****
 * ** =========== 广度优化 ==========
 * 引入不同的元素
 * ***********/
function isValid_width(s) {
  // 处理边界
  if (!s) {
    return false;
  }
  const len = s.length;
  if (len % 2 === 1) {
    // 长度为奇数，不可能是一个有效的合法字符
    return false;
  }
  // 消除法的主要核心逻辑:
  const stack = [];
  const isEmpty = () => stack.length === 0;
  for (let i = 0; i < len; i++) {
    const item = s[i];
    if (item === "(" || item === "{" || item === "[") {
      // 入栈
      stack.push(item);
    } else if (item === ")") {
      // 出栈
      const result = stack.pop();
      if (!result || result !== "(") {
        return false;
      }
    } else if (item === "}") {
      // 出栈
      const result = stack.pop();
      if (!result || result !== "{") {
        return false;
      }
    } else if (item === "]") {
      // 出栈
      const result = stack.pop();
      if (!result || result !== "[") {
        return false;
      }
    }
  }

  return isEmpty();
}

console.log("==== isValid_width ====");
console.log(isValid_width("()()(())({{[]}}[])"));
console.log(isValid_width("()()(()"));

/***
 * 大鱼吃小鱼
 *
 * 栈中存放内容
 */
function solution(fishSize, fishDirection) {
  // 如果鱼的数量小于等于1，那么直接返回鱼的数量
  const len = fishSize.length;
  if (len <= 1) {
    return len;
  }

  const stack = [],
    left = 0, // 0表示鱼向左游
    right = 1; // 1表示鱼向右游
  let direction = fishDirection[0]; // 栈中鱼的方向，栈中只有一个方法，相反方向的鱼，大鱼会打小鱼吃掉

  for (let i = 0; i < len; i++) {
    // 当前鱼的情况：1，游动的方向；2，大小
    const curFishDirection = fishDirection[i];
    const curFishSize = fishSize[i];
    // 当前的鱼是否被栈中的鱼吃掉了
    let hasEat = false;
    while (stack.length && curFishDirection !== direction) {
      const last = stack[stack.length - 1];
      if (last < curFishSize) {
        stack.pop();
      } else {
        hasEat = true;
        break;
      }
    }

    if (stack.length === 0) {
      direction = curFishDirection;
    }

    if (!hasEat) {
      stack.push(curFishSize);
    }
  }

  return stack.length;
}

// test
console.log("=== solution ====");
console.log(solution([4, 2, 5, 3, 1], [1, 1, 0, 0, 0]));
console.log(solution([4, 2, 5, 3, 1], [0, 1, 0, 0, 0]));

/***
 * 大鱼吃小鱼
 *
 * 栈中存放索引
 */
function solution_index(fishSize, fishDirection) {
  // 如果鱼的数量小于等于1，那么直接返回鱼的数量
  const len = fishSize.length;
  if (len <= 1) {
    return len;
  }

  const stack = [],
    left = 0, // 0表示鱼向左游
    right = 1; // 1表示鱼向右游
  let direction = fishDirection[0]; // 栈中鱼的方向，栈中只有一个方法，相反方向的鱼，大鱼会打小鱼吃掉

  for (let i = 0; i < len; i++) {
    // 当前鱼的情况：1，游动的方向；2，大小
    const curFishDirection = fishDirection[i];
    const curFishSize = fishSize[i];
    // 当前的鱼是否被栈中的鱼吃掉了
    let hasEat = false;
    while (stack.length && curFishDirection !== direction) {
      const last = stack[stack.length - 1];
      if (fishSize[last] < curFishSize) {
        stack.pop();
      } else {
        hasEat = true;
        break;
      }
    }

    if (stack.length === 0) {
      direction = curFishDirection;
    }

    if (!hasEat) {
      stack.push(i);
    }
  }

  return stack.length;
}

// test
console.log("=== solution_index ====");
console.log(solution_index([4, 2, 5, 3, 1], [1, 1, 0, 0, 0]));
console.log(solution_index([4, 2, 5, 3, 1], [0, 1, 0, 0, 0]));

function findRightSmall(list) {
  const result = [];
  const stack = []; // 单调栈
  const peek = () => stack[stack.length - 1]; // 取栈顶元素
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    while (stack.length && list[peek()] > item) {
      // 消除的时候，记录一下被谁消除了
      result[peek()] = i;
      // 消除时候，值更大的需要从栈中消失
      stack.pop();
    }
    stack.push(i);
  }
  // 栈中剩下的元素，由于没有人能消除他们，因此，只能将结果设置为-1。
  while (stack.length) {
    result[peek()] = -1;
    stack.pop();
  }
  return result;
}

// test
console.log("=== findRightSmall ====");
console.log(findRightSmall([5, 2]));
console.log(findRightSmall([1, 2, 4, 9, 4, 0, 5]));

function findRightBig(list) {
  const result = [];
  const stack = []; // 单调栈
  const peek = () => stack[stack.length - 1]; // 取栈顶元素
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    while (stack.length && list[peek()] < item) {
      // 消除的时候，记录一下被谁消除了
      result[peek()] = i;
      // 消除时候，值更大的需要从栈中消失
      stack.pop();
    }
    stack.push(i);
  }
  // 栈中剩下的元素，由于没有人能消除他们，因此，只能将结果设置为-1。
  while (stack.length) {
    result[peek()] = -1;
    stack.pop();
  }
  return result;
}

// test
console.log("=== findRightBig ====");
console.log(findRightBig([5, 2]));
console.log(findRightBig([1, 2, 4, 9, 4, 0, 5]));

function findLeftSmall(nums) {
  const result = [];
  const stack = []; // 单调栈
  const peek = () => stack[stack.length - 1]; // 取栈顶元素
  for (let i = 0; i < nums.length; i++) {
    debugger;
    const item = nums[i];
    while (stack.length && peek() >= item) {
      debugger;
      // 消除时候，值更大的需要从栈中消失
      const temp = stack.pop();
      if (stack.length === 0) {
        result[temp] = -1;
      }
    }
    if (stack.length) {
      // 消除的时候，记录一下被谁消除了
      result[peek()] = i;
    }
    stack.push(i);
  }

  // 栈中剩下的元素，由于没有人能消除他们，因此，只能将结果设置为-1。
  while (stack.length) {
    result[peek()] = -1;
    stack.pop();
  }
  return result;
}

// test
console.log("=== findLeftSmall ====");
// console.log(findLeftSmall([5, 2]));
console.log(findLeftSmall([1, 2, 4, 9, 4, 0, 5]));

function findSmallSeq(nums, k) {
  const result = [];
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    const left = nums.length - i;
    // 注意我们想要提取出k个数，所以注意控制扔掉的数的个数
    while (
      stack.length &&
      stack.length + left > k &&
      stack[stack.length - 1] > item
    ) {
      stack.pop();
    }
    stack.push(item);
  }

  // 如果递增栈里面的数太多，那么我们只需要取出前k个就可以了。
  // 多余的栈中的元素需要扔掉。
  while (stack.length > k) {
    stack.pop();
  }

  // 把k个元素取出来，注意这里取的顺序!
  for (let i = k - 1; i >= 0; i--) {
    result[i] = stack.pop();
  }

  return result;
}

// test
console.log("=== findSmallSeq ====");
console.log(findSmallSeq([3, 5, 2, 6], 2));
console.log(findSmallSeq([9, 2, 4, 5, 1, 2, 3, 0], 3));
