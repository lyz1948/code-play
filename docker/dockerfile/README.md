# Dockerfile 实例

先建立一个目录，目录下面创建2个文件，一个`app.py`文件，一个是`Dockerfile`文件

`app.py`文件内容如下

```python
from flask import Flask
app = Flask(__name__)
@app.router('/')
def hello():
    return "hello docker"
if __name__ == '__main__':
    app.run()
```

`Dockerfile` 文件内容如下

```js
FROM python:2.7
LABEL maintainer="lyz<22980937@qq.com>"
RUN pip install flask
COPY app.py /app/
WORKDIR /app
EXPOSE 4900
CMD ["python", "app.py"]
```