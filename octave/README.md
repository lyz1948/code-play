# Octave

## 安装 Octave

[Octave 官网](http://wiki.octave.org/Octave_for_GNU/Linux) 查看安装方式

**macOS 平台**

```js
brew install octave
```

**Docker 方式安装**

```js
docker pull mtmiller/octave
docker run mtmiller/octave octave --version
```

## Octave 的运算

加法

```js
5 + 8
```

减法

```js
10 - 2
```

乘法

```js
6 * 7
```

### 比较运算

等于

```js
1 == 2 % false
```

在 octave 里的 `%` 是注释符

不等于

```js
1 ~= 2 % true
```

不等操作符是`~`，而不是`!`

注释符 `%`

```js
1 == 2 % false
```

与`&&`

```js
1 && 2 % and
```

或`||`

```js
1 || 0 % OR
xor(1, 0)
```

### 赋值

```js
a = 42
a // 42

b = 'hello'
b // hello

c = 2 >= 1
c // 1

a = pi

a // 3.1416
```

对于更复杂的命令，使用`disp`来打印

```js
disp(a)
a // 3.1416

disp(sprintf('2 decimals: %0.2f', a))
// 2 decimals: 3.14

disp(sprintf('6 decimals: %0.6f', a))
// 6 decimals: 3.141593
```

`2 decimals:`是字符串， `%0.2f`是代替 a 的值需要放这里, `0.2f`只显示小数点的后 2 位数字

`format long` 命令显示默认的位数， 对应的命令`format short`显示少量的位数，默认是输出小数点后少量的数字

加个'`;`'可阻止输入后打印出赋值的结果

```js
a = 42
```

隐藏命令行前面的`octave`文字与版本号

```js
PS1('>> ')
```

### 向量和矩阵

3 行 2 列的矩阵

```js
A = [1 2; 3 4; 10 20]

A =
  1   2
  3   4
  10  20
```

列向量

```js
v = [1; 2; 3]
```

**3 行一列的向量**
从 1 开始，步长为 0.1，一直增长到 2

```js
v = 1:0.1:2
v = 1:6
```

另外一些生成矩阵的方法

```js
C = ones(2, 3)
```

`ones()`函数来生成一个矩阵，上面的的例子生成了一个 2 行 3 列的矩阵，矩阵里的值都为 1。我们还可以这样

```js
C = 3*ones(2, 3)

C =
  3   3   3
  3   3   3
```

等同于下面这样的操作

```js
C = [3 3 3; 3 3 3]
```

```js
v = once(1, 3)

x = zeros(1, 3)

x = rand(1, 3)
```

`zeros()` 生成 1 行 3 列的值为 0 的矩阵
`rand()` 生成 1 行 3 列的值为 0~1 的随机值的的矩阵

高斯平局分布

```js
w = randn(1, 3)
```

`randn()`生成了 1 行 3 列的 3 个值，它们服从高斯分布，均值为 0。标准差或者方差为 1

```js
w = -6 + sqrt(10) * randn(1, 10000)
hist(w)
hist(w, 20)
```

w 是一个以根号 10 乘以高斯随机变量生成的矩阵, 均值为-6 的高斯分布直方图，这个高斯随机变量的方差为 10， 其标准差是根号 10，约等于 3.1
我们可以用`hist(w)` 函数来生成`w`直方图

`eye()`函数表示生成单位矩阵

```js
H = eye(4)
```

`help` 帮助函数

```js
help eye

help rand

help help
```

## 移动数据

```js
A = [1 2; 3 4; 5 6]

r = size(A)
// 3  2

size(r)
// 1  2

size(A, 1)
// 3

size(A, 2)
// 2
```

`size(A)` 接受一个矩阵，返回矩阵的行列数
`size(A, 1)` 返回 A 矩阵的第一维的大小，A 矩阵的行数，这里是 3
`size(A, 2)` 返回 A 矩阵的第一维的大小，A 矩阵的列数，这里是 2

`length()` 返回向量的大小

```js
v = [1 2 3 4]
length(v) // 4

length(A) // 3
```

A 是 3 行 2 列的矩阵，这里使用`length()` 得到了 3

### 读入文件数据

先切换到文件目录，再使用`load()`函数引入文件

```js
load filename
load('filename')
```

### `who()` 查看已存在的变量

```js
A    H    V    a    ans  b    c    h    r    v    w    x
```

### `whos()` 显示更详细的信息

```js
   Attr Name        Size                     Bytes  Class
   ==== ====        ====                     =====  =====
        A           3x2                         48  double
        H           4x4                         32  double
        V           1x1                          8  double
        a           1x1                          8  double
        ans         1x1                          8  double
        b           1x2                          2  char
        c           2x3                         48  double
        h           1x6                         24  double
        r           1x2                         16  double
        v           3x1                         24  double
        w           1x100                      800  double
        x           1x3                         24  double
```

### `clear` 删除某个变量或文件

```js
clear A

   Attr Name        Size                     Bytes  Class
   ==== ====        ====                     =====  =====
        H           4x4                         32  double
        V           1x1                          8  double
        a           1x1                          8  double
        ans         1x1                          8  double
        b           1x2                          2  char
        c           2x3                         48  double
        h           1x6                         24  double
        r           1x2                         16  double
        v           3x1                         24  double
        w           1x100                      800  double
        x           1x3                         24  double
```

```js
v = w(1:10)
```

将 w 从 1 到 10 的数据赋值给 v

### 保存数据`save`

```js
save hello.mat v;
```

将 v 里的数据保存到名为 hello.mat 的文件里，默认存储的是二进制格式的文件，如果我们想存储为人类看得懂的，可以保存为 txt 格式的文件

```js
save hello.txt v -ascii;
```

### 索引数据的某个值

```js
A = 【1, 2; 3, 4; 5, 6]

A =

   1   2
   3   4
   5   6

A(2, 2) // 4
A(3, 2) // 6
```

### 获取某行的所有元素

```js
A(1, :)
```

这样可以获取第 1 行的所有元素

### 获取某列的所有元素

这样可以获取第 2 行的所有元素

```js
A(:, 2)

ans =

   2
   4
   6
```

以数组的方式来获取多行或者多列的所有元素

```js
A([1, 3], :)
ans =

   1   2
   5   6

A(:, [1, 2])
ans =

   1   2
   3   4
   5   6
```

重新给矩阵的某行或某列赋值

```js
A(:, 2) = [20, 21, 22]

A =
    1   20
    3   21
    5   22
```

### 新增数据

给矩阵 A 新增一列向量

```js
A = [A, [30; 31; 32]]

A =
    1   20   30
    3   21   31
    5   22   32

size(A)

ans =
   3   3
```

### 扁平矩阵

`A(:)` 得到一个扁平后的多行 1 列的向量

```js
B = A(:)

B =
    1
    3
    5
   20
   21
   22
   30
   31
   32
```

### 合并矩阵

```js
A = [1, 2; 3, 4; 5, 6]

B = [10, 11; 12, 13; 14, 15]

C = [A, B]

C =
    1    2   10   11
    3    4   12   13
    5    6   14   15
```

将矩阵 A 和 矩阵 B 合并后赋值给 C,可以得到拼接后的新矩阵，这样的合并方式是拼接到列上的，如果我们希望合并到行上，可以这样

```js
C = [A; B]
```

以'`;`'号分割行 A 后拼接矩阵 B

## 计算数据

```js
A = [1, 2; 3, 4; 5, 6]
A =
   1   2
   3   4
   5   6

B = [10, 11; 12, 13; 14, 15]
B =
   10   11
   12   13
   14   15

C = [2, 3; 4, 5]
C =
   2   3
   4   5

R = A * C
```

我们将矩阵 A 与矩阵 C 相乘，得到下面的结果

```js
R =
   10   13
   22   29
   34   45
```

具体的计算过程为：
A 的第一行与矩阵 C 相乘

```js
1 * 2 + 2 * 4 = 10
1 * 3 + 2 * 5 = 13
```

A 的第二行与矩阵 C 相乘

```js
3 * 2 + 4 * 4 = 22
3 * 3 + 4 * 5 = 29
```

A 的第三行与矩阵 C 相乘

```js
5 * 2 + 6 * 4 = 34
5 * 3 + 6 * 5 = 45
```

如果我们将 A \* B 会得到一行错误

```js
error: operator *: nonconformant arguments (op1 is 3x2, op2 is 3x2)
```

错误的原因是行列的个数不对，A 的第一行只有 2 个元素，而 B 的第一列有 3 个元素，所为无法相乘，A 与 B 的计算可以是这样

```js
A .* B

ans =
   10   22
   36   52
   70   90
```

结算结果是用 A 与 B 的对于元素相乘

```js
1 * 10 = 10
2 * 11 = 22

3 * 12 = 36
4 * 13 = 52

5 * 14 = 60
6 * 15 = 90
```

将矩阵 A 进行乘方

```js
A .^ 2

ans =
    1    4
    9   16
   25   36
```

用 1 除以矩阵 V

```js
v = [1; 2; 3]

1 ./ v

ans =
   1.00000
   0.50000
   0.33333
```

`log(v)`对数运算

```js
log(v)

ans = 0.0
0.69315
1.09861
```

`exp(v)` 以 e 为底, 以 v 为元素的指数的幂运算

```js
exp(v)
ans = 2.7183
7.3891
20.0855
```

`abs(v)` 绝对值

```js
;-v
ans = -1 - 2 - 3

abs(-v)
ans = 1
2
3
```

向量中的每个值加 1

```js
v + ones(length(v), 1)
// or
v + 1
ans = 2
3
4
```

### 行列互换

单引号 `'` 将矩阵行列互换

```js
A =
   1   2
   3   4
   5   6

A'

ans =
   1   3   5
   2   4   6
```

### `max()` 获取最大元素

```js
a = [2, 5, 13, 0.5]

v = max(a)[(val, idx)] = max(a) // 13
// val =  13
// idx =  3
```

如果`max()` 函数传递的是一个矩阵，而不是一个向量的时候，获取的是每一列的最大值

```js
A =
   1   2
   3   4
   5   6

max(A)
ans =
   5   6

```

比较运算获取返回布尔值的向量

```js
a =
    2.00000    5.00000   13.00000    0.50000

a < 3

ans =
  1  0  0  1
```

在 a 中，小于 3 的值有第 1、4 个，所以返回的向量第一个为 true，所以返回了 1， 第 2、3 个不小于 3, 为 false 则返回 0

### `find(a)`函数

```js
find(a < 3)
ans =
   1   4
```

### `magic(3)` 函数

返回幻方矩阵, 幻方矩阵每行的和与每列、斜对角的和都相等

```js
magic(3)

ans =
   8   1   6
   3   5   7
   4   9   2
```

### `sum(a)` 元素求和

```js
sum(a)
ans = 20.5
```

### `prod(a)` 元素乘积

```js
prod(a)
ans = 65
```

### `floor(a)` 向下取整

```js
ans =
    2    5   13    0
```

### `ceil(a)` 向上取整

```js
ans =
    2    5   13    1
```

```js
a = magic(3)
a =
   8   1   6
   3   5   7
   4   9   2

max(a, [], 1) // 列最大值
ans =

   8   9   7

max(a, [], 2) // 行最大值
ans =

   8
   7
   9

max(a) // 默认求每列的最大值
ans =
   8   9   7

max(max(a)) // 矩阵最大值, 相当于 max(a(:))

```

```js
A =

   47   58   69   80    1   12   23   34   45
   57   68   79    9   11   22   33   44   46
   67   78    8   10   21   32   43   54   56
   77    7   18   20   31   42   53   55   66
    6   17   19   30   41   52   63   65   76
   16   27   29   40   51   62   64   75    5
   26   28   39   50   61   72   74    4   15
   36   38   49   60   71   73    3   14   25
   37   48   59   70   81    2   13   24   35

sum(sum(A .* eye(9)))

ans =  369

// 转换对角线
sum(sum(A .* flipud(eye(9))))
ans =  369
```

### 逆矩阵 `pinv(A)`

```js
A = magic(3)

temp = pinv(A)

ans =
   0.147222  -0.144444   0.063889
  -0.061111   0.022222   0.105556
  -0.019444   0.188889  -0.102778

temp * A

ans =
   1.0000e+00   8.3267e-17  -2.9421e-15
  -5.9952e-15   1.0000e+00   6.3838e-15
   2.9976e-15   4.4409e-16   1.0000e+00
```

## 数据绘制

```js
t = [0:0.01:0.98];
y1 = sin(2 * pi * 4 * t)
plot(t, y1)

y2 = cos(2 * pi * 4 * t)
plot(t, y2)
```

`t` 是一个从0开始，每次递增0.01，直到0.98的向量
`y1` 和 `y2` 是在t向量的基础上乘上pi生成的数据

`plot(Y)` 函数将传递的数据生成图像

```js
 -- plot (Y)
 -- plot (X, Y)
 -- plot (X, Y, FMT)
 -- plot (..., PROPERTY, VALUE, ...)
 -- plot (X1, Y1, ..., XN, YN)
 -- plot (HAX, ...)
```

`hold on` 保持当前所绘制的图像

```js
plot(t, y1);

hold on;

plot(t, y2, 'r')
```

`xlabel(str)` 显示在x轴上的内容

```js
xlabel('time')
```

`ylabel(str)` 显示在y轴的内容

```js
ylabel('value')
```

`legend(str1, str2, str3, ..)` 在右上角显示`sin` 和 `cos`曲线各自的颜色

```js
legend('sin', 'cos')
```

`title(str)` 显示title

```js
title('my plot')
```

`figure(number)` 可以同时显示多张图表

```js
figure(1); plot(t, y1)
figure(2); plot(t, y2)
```

`subplot(number, number, number)` 前2个参数是将图像分为1*2个窗格，后一个参数是将数据生成在指定的窗格上

```js
subplot(1, 2, 1);
```

将图片分为高度为100%的2个窗格，将数据写入第一个窗格

`axis(Array)` 第一个参数为数组参数，参数前2个值分别是x轴的x1，x2，关系是从低到高的数值范围，后2个参数是y1， y2轴，第5和6个参数是z轴的z1, z2
-- axis ()
-- axis ([X_LO X_HI])
-- axis ([X_LO X_HI Y_LO Y_HI])
-- axis ([X_LO X_HI Y_LO Y_HI Z_LO Z_HI])
-- axis ([X_LO X_HI Y_LO Y_HI Z_LO Z_HI C_LO C_HI])
-- axis (OPTION)
-- axis (OPTION1, OPTION2, ...)
-- axis (HAX, ...)

```js
axis([0.5, 1, -1, 1])
```

使用`,`逗号可以同时输入多个命令

```js
A = magic(5)

imagesc(A)
imagesc(A), colorbar, colormap gray;
imagesc(magic(12), colorbar, colormap gray)
```

首先是使用`magic(5)`生成一个5*5的上下左右及对角线每个数字之和都相等的矩阵，然后通过`colorbar`来显示颜色条，`colormap gray`来显示颜色

`clf` 清除图像，不关闭图像窗口，只是清除数据

`print` 将数据生成png格式的图片, 可以指定保存的路径

```js
print -dpng 'myPlot.png'
// 将数据生成png格式的图片，并保持到指定位置
cd '/Users/lyz/Desktop'; print -dpng 'myPlot.png'
```

`close` 关闭图像显示

```js
close
```

## 控制语句

### `for, while, if else`语句

```js
v = zeros(10, 1)

for i = 0:10,
   v(i) = 2 ^ i;
end;

v =
      2
      4
      8
     16
     32
     64
    128
    256
    512
   1024
```

通过`zeros(10, 1)`创建生成了 10行1列的矩阵赋值给了`v`，通过使用`for`循环来修改`v`的值

### `break` 语句

```js
v = 1:10;
for i = v,
   disp(i);
end;

i = 1
while true,
   v(i) = 666;
   i = i + 1
   if i == 5,
      break;
   end;
end;
```

### `if` 语句

```js
v = zeros(10, 1)

for i = 1:10,
   v(i) = 2 ^ i;
end;

v(1) = 2
if v(1) == 1,
   disp('The value is one')
elseif v(1) == 2,
   display('The value is two')
else
   disp('the value is not one or two')
end;
```

## 函数

在octave里定义函数，需要先建立一个以.m结尾的文件，文件的名字是你定义的函数名, 下面在桌面创建了一个`square.m`的文件，而我执行命令查看当前地址为`/Users/lyz/Develop`, 查看当前路径的命令为`pwd`，`pwd` 是linux系统的命令

```js
// square.m
function y = square(x)
y = x ^ 2
```

在命令行执行`square(5)` 调用函数，发现报错了, 因为Octave在当前路径下找不到square.m的文件，现在切换到文件所在的目录下执行`square(5)`

```js
cd /Users/lyz/Desktop

square(5)

y =  25
ans =  25
```

另外一种方式是使用`addpath(path)` 函数，将某个路径加入到Octave里，这样在任何地方调用函数，如果当前路径没有该函数，会到添加的路径里找

**函数返回多个值**
在Octave里，行数可以返回多个值, 新建一个`squareAndCube.m`的文件

```js
// squareAndCube.m
function [y1, y2] = squareAndCube(x)

y1 = x ^ 2
y2 = x ^ 3
```

命令行执行`squareAndCube(5)`, 

```js
[a, b] = squareAndCube(5);

>> a
a =  25
>> b
b =  125
```

### 训练函数

```js
X = [1, 1; 1, 2; 1, 3]
y = [1; 2; 3]
theta = [0; 1]
```

`cosFunctionJ.m`文件

```js
// 代价函数
function J = cosFunctionJ(X, y, theta)

% X 是 设计矩阵, 包含我们要训练的例子
% y is the class labels

m = size(X, 1) % 训练样本的数量
predictions = X * theta  % 计算预测值
sqrErrors = (predictions - y).^2    % 计算平方误差
J - 1 / (2 * m) * sum(sqrErrors)
```

```js
cosFunctionJ(X, y, theta)

// j = 0
```

```js
theta = [0; 0]
// j = 2.3333
```

## 矢量

```js
// h(x) = ∑theta(j)x(j)

prediction = 0.0;
for j = 1:n+1,
   prediction = prediction + theta(j) * x(j)
end;

// =============
prediction = theta' * x;
```