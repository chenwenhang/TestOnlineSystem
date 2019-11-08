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
![index.png](https://img03.sogoucdn.com/app/a/100520146/034be5e888de42f694d8aeed98837016)
#### 登录
![login.png](https://img04.sogoucdn.com/app/a/100520146/21ed15bd951614624d7bcf4a175be40b)
#### 考试列表
![formal-exam.png](https://img02.sogoucdn.com/app/a/100520146/71176d1270a682e8609127ca91490e52)
#### 当前考试
![start-exam.png](https://img03.sogoucdn.com/app/a/100520146/310e4002e4b6f57565bbe7e12700352f)
#### 个人信息
![userinfo.png](https://img04.sogoucdn.com/app/a/100520146/24acd42ca7b3a4fc514adcab072bfd54)
#### 考试记录
![exam-history.png](https://img03.sogoucdn.com/app/a/100520146/b0d6808feec879f1e45be573e07e14a1)
#### 模拟考试
![mock-exam.png](https://img03.sogoucdn.com/app/a/100520146/865367d895836b193f36f98fcaf3f182)
#### 我的收藏
![my-collection.png](https://img04.sogoucdn.com/app/a/100520146/3018b10de9a876ebe8a51dc57aaa609a)
#### 考卷管理
![paper-manage.png](https://img04.sogoucdn.com/app/a/100520146/839c0cb2187d16e86c1916774a423fb9)
#### 考卷详情
![paper-detail.png](https://img04.sogoucdn.com/app/a/100520146/f33393161c7e44deb29260e3b17ebdb5)
#### 试题管理
![question-manage.png](https://img01.sogoucdn.com/app/a/100520146/a3dc5f113e9f8a413def096a14d38086)
#### 试题详情
![question-detail.png](https://img03.sogoucdn.com/app/a/100520146/7f42540afc88f3341f7487364ca77230)
#### 职业管理
![occupation.png](https://img02.sogoucdn.com/app/a/100520146/e25f68abcf98953cf37d24a410d7c1b9)
#### 标签管理
![tag.png](https://img01.sogoucdn.com/app/a/100520146/6f788034ca922d62f3626c2eddfecf7d)
#### 用户管理
![user.png](https://img01.sogoucdn.com/app/a/100520146/6f788034ca922d62f3626c2eddfecf7d)
#### 锁定系统
![lock.png](https://img01.sogoucdn.com/app/a/100520146/c0f2dd00edb8bb129d0f8e7d4c3d7986)
#### 数据分析
![data.png](https://img01.sogoucdn.com/app/a/100520146/0fa868f42b2717912c2fcc18a3bd4b23)
## 链接

+ [Ng Alain](https://github.com/ng-alain)
+ [Ng ZORRO](https://ng.ant.design)
+ [Angular](https://angular.cn)
