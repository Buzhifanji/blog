# SSL_ERROR_SYSCALL in connection to github.com:443

git 提交代码的时候报错：SSL_ERROR_SYSCALL in connection to github.com:443 处理方案：

```linux
    git config --global http.sslBackend "openssl"
````

## 参考来源： https://blog.csdn.net/w5688414/article/details/99816109