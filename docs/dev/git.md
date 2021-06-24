---
sidebar_position: 1
---

# GIT

:::note Ref

- [git - 简易指南](https://www.bootcss.com/p/git-guide/)
- [Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)
- [git cherry-pick 教程](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

:::

![3d2VE9](https://cdn.jsdelivr.net/gh/honjaychang/icopicture/blog/3d2VE9.png)

#### 工作流

- `workspace` 工作目录 保存实际文件
- `Index` 缓存区

- `Repository` 本地仓库
- `Remote` 远程仓库

#### 记录日常协同开发所用的`git`指令

- `git checkout -b 本地分支名 origin/远程分支名`
  - `git init` 创建新仓库
- `git add <fileName> / .` 提交代码到缓存区

- `git commit -m "xxx"` 提交代码到本地仓库
- `git push origin <master>` 将本地代码推送到远程`master`分支
  - `git push origin 本地分支:远端希望创建的分支`
- `git remote add origin <server>` 将你的改动推送到所添加的服务器

#### 分支

- `git checkout -b <branchName>` 创建一个新分支并切换到新分支
- `git checkout master` 切换到主分支
- `git branch -d <name>` 删除本地分支

- `git branch -a` 查看所有分支

- `git push origin --delete <name>` 删除远程分支

#### 记录日常开发`push`流程

- `git add .`

- `git pull` 拉取代码查看是否有冲突没有冲突跳到
- `git stash` 先将本地修改存储起来
- `git pull` 再次拉取就不会有冲突了
- `git stash pop` 将本地代码合并到最新拉取的代码上，手动解决冲突
- `git commit -m ''`
- `git push`

#### 关于`git stash`

`git stash` 能正确存储的前提是文件必须在 `git` 版本控制中才行

- `git stash` 先将本地修改存储起来

- `git stash save` 功能同上，但可以加一些注释

- `git stash list` 可以查看本地保存的信息

  - `stash@{0}:xxxx`

- `git stash show` ：显示做了哪些改动，默认`show`第一个存储

- `git stash pop [stash@{0}]` 还原暂存的内容

- `git stash drop <stash@{id}>` 删除 stash

- `git stash clear` 清除所有的 stash

- `git stash branch <name>` 根据最近的 stash 创建一个新的分支，然后删除最近的 stash

##### `git stash pop` `git stash apply`对比

- 前者会还原后会`stash list`中删除对应的编号
- 后者还原后还会保存

`merge` `rebase`对比

- `git pull --rebase`
  - `git pull => git fetch + git merge FETCH_HEAD`
  - `git pull --rebase => git fetch + git rebase`
  - `merge` 合并操作 会生成一个新的节点，之前的提交分开显示
  - `rebase` 复位基底 不会生成新的节点，是将两个分支融合成一个线性的提交

```js
git commit <fileName>

git commit .
git restore --staged <file>... // to unstagexs
```

记录自己 MAC 上同时配置 `github` 以及公司的 `gitlab`

```bash
// 取消全局 用户名/邮箱 配置

git config --global --unset user.name
git config --global --unset user.email

// 单独设置每个repo 用户名/邮箱
git config user.email "1599823637@qq.com"
git config user.name "Honjay"

// 查看当前项目的git配置
git config --local --list


ssh-keygen -t rsa -C "xxx@xxx.com"

ssh -T git@github.com
```

- `nvm` 多版本 node 管理
- `nrm` 多源管理

```bash
// 查看源，可以看到设置过的所有的源 npm config get registry

npm config set registry http://npm-registry.qunhequnhe.com/
npm config set registry https://registry.npmjs.org/
```

- `DOMAIN-SUFFIX,qunhequnhe.com,DIRECT` 配置 `clash` 使得公司的域名走直连

```git
//直接拉取并合并最新代码
$ git pull origin master [示例1：拉取远端origin/master分支并合并到当前分支]
$ git pull origin dev [示例2：拉取远端origin/dev分支并合并到当前分支]
```

```git
git checkout master
git pull origin master
git merge dev
git push origin master
```

- [vsCode git 操作提示 Permission denied, please try again](https://blog.csdn.net/yang450712123/article/details/89504563?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-16.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-16.control)

（随时更新...）
