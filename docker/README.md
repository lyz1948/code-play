# Docker

## Vagrant install Docker

首先到vagrant官网下载vagrant安装包文件，安装成功后，在命令行查看是否安装成功

```js
vagrant --v
```

通过vagrant 创建一个虚拟机, 如果事先已经下好了.box的系统文件，直接安装下载好的

```js
vagrant box add ${name} ${box path}
```

然后在执行初始化vagrantfile文件，`vagrant up`执行安装

```js
// 初始化vagrantfile文件
vagrant init centos/6
vagrant up
```

安装成功后，如何连接到虚拟机里呢？
通过`vagrant ssh` 可连接到虚拟机

```js
vagrant ssh
```

`vagrant`的一些其他命令，可通过`vagrant -h` 查看帮助

```js
// 查看状态
vagrant status
```

如果需要停止虚拟机，进入到虚拟机的目录下面，执行 `vagrnat halt` 停止正在运行的虚拟机

```js
// 停止虚拟机
vagrant halt
```

删除虚拟机

```js
vagrant destroy
```

## CentOS 中安装docker

[docker官网安装教程](https://docs.docker.com/install/linux/docker-ce/centos/)

```js
// 启动docker
sudo systemctl start docker
```

## Docker Machine

## Machine driver

## docker playground

## DIY docker image

创建一个C语言的简单镜像
`hello.c`文件写入下面的内容

```js
#include<stdio.h>

int main() {
  printf("hello docker\n");
}
```

```js
history | grep yum
```

## Dockerfile

### 使用Dockerfile 构建image镜像

创建一个`Dockerfile`文件,

```js
FROM centos
RUN yum install -y vim
```

执行构建命令
`lzy1948`是dockhub的用户名 `/centos-tools-vim` 是镜像名字，最后还有一个 `'.'`

```js
docker build -t lzy1948/centos-tools-vim .
```

### Dockerfile文件命令详解

`FROM` 劲量使用官方的镜像作为底层镜像

```js
FROM scratch // base image
// or
FROM centos // 基于centos镜像上构建
// or
FROM ubuntu:14.04 // 基于ubuntu:14.04镜像上构建
```

`LABEL` 版本信息，包括作者、版本及描述

```js
LABEL maintainer="who@vip.com"
LABEL version="1.0"
LABEL description="This is my image description"
```

`RUN` 执行命令并创建新的Image Layer, 每执行一次`RUN` 都会生成一层，所以尽量少些，用`\`反斜线来分割每个执行命令

```js
RUN yum update && yum install -y vim \
    python-dev
```

```js
RUN apt-get update && apt-get install -y perl \
    pwgen --no-install-recommends && rm -rf \
    /var/lib/apt/lists/* // 清理cache
```

```js
RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'
```

`WORKDIR` 设定当前工作目录
`WORKDIR /build` 如果当前目录里没有要则自动创建`build`目录，下面一行`WORKDIR dist`则会在`build`目录下创建`dist`目录，目录结构为`build/dist`, 尽量使用`WORKDIR` 少用 `RUN cd`! 尽量使用绝对目录，不要使用相对目录

```js
WORKDIR /root

WORKDIR /build

WORKDIR dist
```

`ADD` 将本地文件添加的`image`里, ADD 不光可以将文件添加到目录，还可以解压缩文件

```js
ADD src /

ADD abc.tar.gz / // 添加到根目录并解压缩
```

将`hello`文件添加到 `/root/test`目录下

```js
WORKDIR /root
ADD hello test/ // /root/test/hello
```

`COPY` 命令

```js
WORKDIR /root
COPY hello test/
```

> `ADD` 和 `COPY` 命令的区别在于`ADD`可以解压缩文件，大部分情况`COPY` 优于 `ADD`, 如果要添加远程文件，需要使用`curl` 或者 `wget`

`ENV` 设置环境变量，增加可维护性

```js
ENV MYSQL_VERSION 5.7 // 设置常亮
RUN apt-get install -y mysql-serve= "${MYSQL_VERSION}" \
    && rm -rf /var/lib/apt/lists/* // 引用常量
```

`VOLUME` 存储

`EXPOSE` 网络

`CMD` 设置容器启动后默认执行的命令和参数，如果有多条CMD的时候，只会执行最后一条

`shell` 格式命令

```js
RUN apt-get install -y vim
CMD echo 'hello my love'
ENTRYPOINT echo 'hello my docker'
```

`Exec`格式

```js
RUN ["apt-get", "install", "-y", "vim"]
CMD ["/bin/echo", "hello my lover"]
ENTRYPOINT ["/bin/echo", "hello my docker"]
```

`ENTRYPOINT` 设置容器启动时运行的命令, 让容器以应用程序或者服务形式运行，不会被忽略一定会执行

例子1：

```js
FROM centos
ENV name Docker
ENTRYPOINT echo "hello $name"
```

Dockerfile文件写入上面的内容，执行构建命令

```js
docker build -t centos-entrypoint-shell .
```

```js
docker images

docker run centos-entrypoint-shell
```

构建完成后，执行`docker run centos-entrypoint-shell`命令，打印出了`hello Docker`

例子2：

```js
FROM centos
ENV name Docker
ENTRYPOINT ["/bin/echo", "hello $name"]
```

同样我们构建好image镜像后，运行镜像，发现打印出来的是`hello $name` 设置的env常量并没有生效, 而只是单纯的echo, exec格式下面，我们需要指明具体执行命令是通过shell运行的

```js
FROM centos
ENV name Docker
ENTRYPOINT ["/bin/bash", "-c" "echo hello $name"]
```

## image push到dockhub

首先你应该有一个dockhub的账号，可通过客户端登录也可以通过命令行登录

```js
docker login
```

输入用户名与密码后，如果账户密码正确，会打印一条login success的记录

```js
docker push lzy1948/my-docker-image:latest
```

push成功后，可登录dockhub查看，也可以尝试拉去刚才push到dockhub的镜像，如果拉取成功，说明发布成功。

## 私有的dockhub

## 镜像与容器的操作

### 拉取Image镜像

从dockerhub 获取image镜像，可以通过`docker search ubuntu`来查看有关ubuntu的镜像, 然后在拉取指定名称的镜像

```js
docker pull ${image name}
docker pull ubuntu
docker pull ubuntu:14.04
```

### 镜像的删除

```js
docker rmi ubuntu
```

### 容器的运行

```js
docker run --name web nginx
```

### 容器的停止

```js
docker stop ${container id}
```

### 容器的删除

删除容器之前，需要先将容器停止掉后，才能删除

**单个容器的删除**

```js
docker rm ${container id}
```

**同时删除多个容器**

```js
docker rm ${container id1} ${container id2} ${container idn}
```

### 容器的交互

```js
docker exec -it ${容器id} ${交互方式}

docker exec -it 632fca6f8be8 /bin/bash
docker exec -it 632fca6f8be8 python
docker exec -it 632fca6f8be8 ip a
```

## stress工具

运行`ubuntu`容器后，安装`stress`工具

```js
docker run -it ubuntu:16.04

apt-update && apt-get install -y stress
```

启动一个stress, 默认内存 256M, 也可指定内存大小, 如果指定的内容超出虚拟机的内存会报错

```js
stress --vm 1
// debugger 模式
stress --vm 1 --verbose
stress --vm 1 --vm-bytes 10000M --verbase
```

### 制作stress镜像

```js
FROM ubuntu
RUN apt-get update && apt-get install -y stress
ENTRYPOINT ["/usr/bin/stress"]
// []的时候，接受传进的命令
CMD []
```

```js
docker build -t lzy1948/stress-tools .
```

### 容器的内存

启动一个限定内存的容器，限定容器的内存最大为200M

```js
docker run --mermory=200M lzy1948/stress-tools --vm 1 --verbase
```

启动一个限定cpu的容器`--cpu-shares`属性来设定容器的cup权重，下面启动2个容器，第一个权重是10， 第二个权重是5，我们先启动第一个容器`--cpu-shares=5`的容器，在新开一个窗口，查看启动容器占用cpu的情况，可以发现是100%的占用了cpu。当我们启动`--cpu-shares=10`的容器的时候，再查看占用情况，发现权重为10的容器占用的cpu是--cpu-shares=5的容器的2倍

```js
docker run --cpu-shares=5 --name=test2 lzy1948/stress-tools --cup 1
docker run --cpu-shares=10 --name=test1 lzy1948/stress-tools --cup 1
```

## 容器的网络

创建网络

```js
docker network create -d bridge my-bridge
docker network ls
```

创建容器，指定链接的网络

```js
docker run -d --name test --network my-bridge busybox /bin/sh -c "while true; do sleep 3600; done"

// 查看网络
brctl show
docker network inspect ${容器id}

// 从新链接容器
docker network connect my-bridge test2
```

如何将Nginx 服务映射到外部，提供用户访问？

首先，启动一个nginx服务, 默认端口为80, 默认链接到brigde

```js
// 启动服务
docker run --name webserver -d nginx

// 进入容器
docker exec -it webserver /bin/bash

// 查看nginx端口
ps -ef | grep nginx

// 查看
telnet 172.17.0.2 80

// 访问网站
curl http://172.17.0.2

// 将容器内的nginx端口映射到本地的80端口
docker run -d -p 80:80 --name web nginx
```

**docker网络 -- none**
链接到none网络的容器， 没有ip地址，外部无法访问

```js
// 启动容器
docker run -d --name test1 --network none busybox /bin/sh -c "while true; do sleep 3600; done"

// 查看none网络
docker network inspect none

// 进入容器
docker exec -it test1 /bin/sh

// 查看ip
ip a

// 退出删除
docker stop test1
docker rm test1
```

**docker网络 -- host**
从新启动一个链接到host网络的容器，host网络的容器与本机是共享了主机的网络命名空间的

```js
docker run -d --name test1 --network host busybox /bin/sh -c "while true; do sleep 3600; done"

docker network inspect host

docker exec -it test1 /bin/sh

ip a
```

启动一个redis容器

```js
// 启动redis
docker run -d --name redis redis

// 启动flask-redis容器
docker run -d --link redis --name flask-redis -e REDIS_HOST=redis lzy1948/flask-redis

// 进入容器
docker exec -it flask-redis /bin/bash

// 查看环境变量
env

// 访问flask-redis容器
curl 127.0.0.1:5000
```

此时，在容器内访问5000端口是没有问题的，如果退出容器，将无法访问到，我们在启动启动容器的时候，将容器内的nginx端口映射到本地的80端口

```js
docker run -d --link redis --name flask-redis -p 5000:5000 -e REDIS_HOST=redis lzy1948/flask-redis
```

## Volume 数据持久化

查看`volume`

```js
docker volume ls
```

显示有一个`volume`

```js
DRIVER              VOLUME NAME
local               3748c897da8a0be32a9fd12bab15f9e6d73be0f05cce54a69552c71986362972
```

查看`volume` 信息

```js
docker volume inspect 3748c897da8a0be32a9fd12bab15f9e6d73be0f05cce54a69552c71986362972
```

删除`volume`

```js
docker volume rm 3748c897da8a0be32a9fd12bab15f9e6d73be0f05cce54a69552c71986362972
```

volume的名字是随机并且太长不方便查看，启动容器的时候给volume命名volume

```js
docker run -d -v mysql:/var/lib/mysql --name mysql1 -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql

// 查看 volume
docker volume ls

// 进入容器
docker exec -it mysql1 /bin/bash

// 进入Mysql
mysql -u root

// 查看数据库
show databases;

// 创建一个数据库
create database docker;
```

```js
docker run -d --name mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql
```

开发中使用下面这样的绑定方式

```js
docker run -d -v $(pwd):/usr/share/nginx/html -p 80:80 --name web nginx
```

## Docker Componse

### 部署`WordPress`

```js
docker run -d --name mysql -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpress mysql

docker run -d -e WORDPRESS_DB_HOST=mysql:3306 --link mysql -p 8080:80 wordpress
```

**Services**
一个service代表一个container，这个container可从dockerhub的image来创建，或者从本地Dockerfile build而来

Service 的启动类似docker run， 我们可以给它指定network 和 volume， 所以可以给service指定network和volume的引用

`docker-compose.yml`

```yml
version: '3'

services:
  wordpress:
    image: wordpress
    ports:
      - 8080:80
    environment:
      WORDPRESS_DB_HOST: mysql
      WORDPRESS_DB_PASSWORD: root
    network:
      - my-bridge

  mysql:
    image: mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: wordpress
    volumes:
      - mysql-data:/var/lib/mysql
    network:
      - my-bridge
volumes:
  mysql-data:

networks:
  my-bridge:
    driver: bridge
```

启动docker-compose

默认启动文件为docker-compose.yml, 当执行`docker-compose up`的时候，docker会在当前目录找`docker-compose.yml`的文件

```js
docker-compose up
```

如果yml文件名不是`docker-compose.yml`的话，需要指定文件名

```js
docker-compose -f docker-custom.yml up
```

查看启动的容器

```js
docker-compose ps
```

进入容器

```js
docker-compose exec ${service name} bash
```

停止所有容器

```js
docker-compose stop
```

查看启动的images

```js
docker-compose images
```

停止并删除容器

```js
docker-compose down
```

**--scale命令**
同时启动多个服务

```js
docker-compose up --sacle web=5 -d
```

## Docker Swarm

初始化`docker swarm` --advertise-addr= 容器ip, 容器ip可以通过 `ip a`查看

```js
docker swarm init --advertise-addr=${ip}
```

初始化完成后，会得到下面一条命令, 复制该命令，退出当前的swarm-manage容器，进入另外一个需要管理的容器

```js
docker swarm join --token SWMTKN-1-0531ywb2mfvxduaa4nj842rjwf17nweldaj2um59hrhclgsbv6-919i2hve92qspcivvsmnqko8o 192.168.205.11:2377
```


进入另外一个虚拟机容器，执行上面的添加命令

```js
docker-machine ssh swarm-worker1
```

在虚拟机里，执行上面的命令，有的时候并不那么顺利，会报下面的错误

```js
Error response from daemon: rpc error: code = Unavailable desc = all SubConns are in TransientFailure, latest connection error: connection error: desc = "transport: Error while dialing dial tcp 192.168.205.10:2377: connect: no route to host"
```

本人使用的是`vagrant`与`virtualbox`的虚拟机搭建的`centos`系统的，解决的办法是关闭防火墙

```js
sudo systemctl stop firewalld.service
```

添加成功后，到swarm-manage虚拟机容器里, 通过`docker node ls`查看已经添加子节点

```js
docker-machine ssh swarm-manage
docker node ls

ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
9yh72lode2208h5tiedux3t8i *   docker-manager      Ready               Active              Leader              18.09.6
dg0cpns1rrilfnez6rverkn4h     docker-worker1      Ready               Active                                  18.09.6
juxmn2gh01jrtdsnlsf8hv2pj     docker-worker2      Ready               Active                                  18.09.6
```

### service命令

```js
docker service create --name demo busybox sh -c "while true;do sleep 3600;done"
```

同时创建多个service, `demo=5` `demo` 是上面创建的`service`的名称, 5是扩展的数量

```js
// 横向扩展容器数量
docker service scale demo=5

// 查看启动的service容器情况
docker service ls

// 查看每个service的详细信息
docker service ps demo
```

删除service

```js
docker service rm demo
```

### docker swarm 搭建 wordpress

1.创建网络

```js
docker network create -d overlay wpblog
```

2.启动mysql

```js
docker service create --name mysql --env MYSQL_ROOT_PASSWORD=root --env MYSQL_DATABASE=wordpress --network wpblog --mount type=volume,source=mysql-data,destination=/var/lib/mysql mysql
```

3.启动wordpress

```js
docker service create --name wordpress -p 80:80 --network wpblog --env WORDPRESS_DB_PASSWORD=root --env WORDPRESS_DB_HOST=mysql wordpress
```

### ping

### telnet

### wireshark
