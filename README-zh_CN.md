<!--
 * @Author: Chen Wenhang
 * @Date: 2019-10-19 22:00:30
 * @LastEditTime: 2019-11-08 17:25:23
 * @Description: 
 * @Github: https://github.com/chenwenhang
 -->
<h1 align="center">
TestOnlineSystem
</h1>

<div align="center">

  一个基于 Ng Alain 脚手架的在线教育课程考评系统。

  [![NPM version](https://img.shields.io/npm/v/ng-alain.svg?style=flat-square)](https://www.npmjs.com/package/ng-alain)
  [![ng-zorro-vscode](https://img.shields.io/badge/ng--zorro-VSCODE-brightgreen.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=cipchk.ng-zorro-vscode)
  [![ng-alain-vscode](https://img.shields.io/badge/ng--alain-VSCODE-brightgreen.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=cipchk.ng-alain-vscode)

</div>

[English](README.md) | 简体中文

## 快速入门

这是TestOnlineSystem的前端。

**本项目的正常运行还需要同时启动[IT教育课程考评系统后端](https://github.com/chenwenhang/TestOnlineSystem-Backend)**

TestOnlineSystem采用Angular 7、Nodejs开发平台、Express框架和MongoDB数据库等多种技术，为计算机行业的求职者，开发一款支持发布者发布试题和试卷、考生在线考试的一个基于Web的IT教育课程考评系统，并允许考生根据自身职业特点自行选择相关技术标签进行精准考试。该系统采用模块化设计，低耦合高内聚。能够承受瞬时密集用户访问，具有稳定性强和安全性高的特点。

* 启动方式一

以Nginx为例：直接将打包好的`dist`文件夹复制到Nginx目录下的`html`目录中。

* 启动方式二

手动部署：
```bash
npm install # 注意：不要使用cnpm命令构建项目，具体细节查看 https://github.com/ng-alain/ng-alain/issues/413 
ng serve # 监听 localhost:4200
```

## 特点

* 允许用户自定义试题类型
* 支持单选题、多选题、判断题、排序题、填空题
* 模块化设计，高内聚低耦合
* 全栈采用轻量技术，支持高并发

## 系统截图

#### 主页
![index.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/index.png)
#### 登录
![login.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/login.png)
#### 考试列表
![formal-exam.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/formal-exam.png)
#### 当前考试
![start-exam.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/start-exam.png)
#### 个人信息
![UTOOLS1573301709401.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/userinfo.png)
#### 考试记录
![exam-history.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/exam-history.png)
#### 模拟考试
![mock-exam.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/mock-exam.png)
#### 我的收藏
![my-collection.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/my-collection.png)
#### 考卷管理
![paper-manage.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/paper-manage.png)
#### 考卷详情
![paper-detail.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/paper-detail.png)
#### 试题管理
![question-manage.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/question-manage.png)
#### 试题详情
![question-detail.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/question-detail.png)
#### 职业管理
![occupation.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/occupation.png)
#### 标签管理
![tag.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/tag.png)
#### 用户管理
![user.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/user.png)
#### 锁定系统
![lock.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/lock.png)
#### 数据分析
![data.png](http://echo-picture.oss-cn-beijing.aliyuncs.com/Github/TestOnlineSystem/data.png)
## 链接

+ [Ng Alain](https://github.com/ng-alain)
+ [Ng ZORRO](https://ng.ant.design)
+ [Angular](https://angular.cn)
