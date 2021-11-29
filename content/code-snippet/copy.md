---
title: copy
author: buzhifanji
tag: js
sidebar: 'code-snippet'
---

#  JS复制文字到剪切板

- JS代码实现：

```js
function copy(value) {
    if(value) {
        if(navigator.clipboard) {
            // clipboard api 复制
            navigator.clipboard.writeText(value);
        } else {
            const textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
            // 隐藏此输入框
            textarea.style.position = 'fixed';
            textarea.style.clip = 'rect(0 0 0 0)';
            textarea.style.top = '10px';
            // 赋值
            textarea.value = text;
            // 选中
            textarea.select();
            // 复制
            document.execCommand('copy', true);
            // 移除输入框
            document.body.removeChild(textarea);
        }
    }
}
```


