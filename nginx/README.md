重启 nginx

```js
nginx -s reload -c /etc/nginx/nginx.conf
```

查看 log 记录

```js
tail -n 200 /var/log/nginx/access.log
```
