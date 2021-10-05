---
sidebar_position: 1
---

# GIT

:::note Ref

- [git - 简易指南](https://www.bootcss.com/p/git-guide/)
- [Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)
- [git cherry-pick 教程](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)
- [vsCode git 操作提示 Permission denied, please try again](https://blog.csdn.net/yang450712123/article/details/89504563?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-16.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7Edefault-16.control)
- [面试官：你知道git xx 和git xx的区别吗？看完这篇Git指南后直呼：内行！](https://juejin.cn/post/6986868722136776718)

:::

![git流程图](https://cdn.jsdelivr.net/gh/honjaychang/bp/dev/git.png)

## 工作流

- `workspace` 工作目录 保存实际文件
- `Index` 缓存区
- `Repository` 本地仓库
- `Remote` 远程仓库

## [基础命令](https://juejin.cn/post/6986868722136776718)

`git fetch`

```bash
# 获取远程仓库特定分支的更新
git fetch origin <分支名>

# 获取远程仓库所有分支的更新
git fetch --all
```

`git pull`

```bash
# 从远程仓库拉取代码，并合并到本地，相当于 git fetch && git merge 
git pull origin <远程分支名>:<本地分支名>

# 拉取后，使用rebase的模式进行合并
git pull --rebase origin <远程分支名>:<本地分支名>
```

`git branch`

```bash
# 基于当前分支，新建一个本地分支，但不切换
git branch <branch-name> 

# 查看本地分支
git branch

# 查看本地和远程分支
git branch -a

# 删除本地分支
git branch -D/-d <branch-name>

# 基于旧分支创建一个新分支
git branch <new-branch-name> <old-branch-name> 

# 基于某提交点创建一个新分支
git branch <new-branch-name> <commit-id> 

# 重新命名分支
git branch -m <old-branch-name> <new-branch-name>
```

`git checkout`

```bash
# 切换到某个分支上
git checkout <branch-name>

# 基于当前分支，创建一个分支并切换到新分支上
git checkout -b <branch-name>
```

`git add`

```bash
# 添把当前工作区修改的文件添加到暂存区，多个文件可以用空格隔开
git add xxx

# 添加当前工作区修改的所有文件到暂存区
git add .

git restore --staged <file>... // to unstagexs
```

- `git init` 创建新仓库
- `git push origin --delete <name>` 删除远程分支
- `git remote add origin <server>` 将你的改动推送到所添加的服务器



## 日常使用

#### 记录日常协同开发所用的`git`指令

- `git checkout -b 本地分支名 origin/远程分支名`
- `git add <fileName> / .` 提交代码到缓存区

- `git commit -m "xxx"` 提交代码到本地仓库
- `git push origin <master>` 将本地代码推送到远程`master`分支
  - `git push origin 本地分支:远端希望创建的分支`

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

### `git merge`

自动创建一个新的合并提交点`merge-commit`，且包含两个分支记录。

- `git merge --ff`
  - 默认 被 `merge` 的分支和当前分支在图形上并为一条线，被 `merge` 的提交点 `commit` 合并到当前分支，没有新的提交点`merge`
- `git merge --no--ff`
  - 推荐 被 `merge` 的分支和当前分支不在一条线上，被 `merge` 的提交点 `commit` 还在原来的分支上，并在当前分支产生一个新提交点 `merge`
  - 利于回滚版本
- `git merge --squash`
  - 把多次分支commit历史压缩为一次



![image.png](https://cdn.jsdelivr.net/gh/honjaychang/bp/fe/GitMerge.image)



### `git rebase`

- 不产生`merge commit`，变换起始点位置 为一条直线，且能使用命令合并多次commit。



#### 区别

- `merge` 会保留两个分支的 `commit` 信息，而且是交叉着的，多用于自己 `dev` 合并进 `master`。
- `rebase`意思是变基，改变分支的起始位置，在 `dev` 上`git rebase master`，将dev的多次 `commit` 一起拉到要 `master` 最新提交的后面(时间最新)，变成一条线，多用于整理自己的dev提交历史，然后把 `master`最新代码合进来。



`merge` `rebase`对比

- `git pull --rebase`
  - `git pull => git fetch + git merge FETCH_HEAD`
  - `git pull --rebase => git fetch + git rebase`
  - `merge` 合并操作 会生成一个新的节点，之前的提交分开显示
  - `rebase` 复位基底 不会生成新的节点，是将两个分支融合成一个线性的提交
  
  

## 代码回退

- `git checkout`
- `git reset`
  - `--hard`：硬重置，影响【工作区、暂存区、本地仓库】
  - `--mixed`：默认，影响【暂存区、本地仓库】，被重置的修改内容还留在工作区
  - `--soft`：软重置，影响 【本地仓库】，被重置的修改内容还留在工作区和暂存区

- `git revert`

```bash
# 撤回工作区该文件的修改，多个文件用空格隔开
git checkout -- <file-name>
# 撤回工作区所有改动
git checkout .

# 放弃已git add到暂存区的指定文件的缓存（HEAD表示最新版本）
git reset HEAD <file-name>
# 放弃所有的缓存
git reset HEAD .
# 丢弃已commit的其他版本，hard参数表示同时重置工作区的修改
git reset --hard <commit-id>  
# 回到上一个commit的版本，hard参数表示同时重置工作区的修改
git reset --hard HEAD^

# 撤销0ffaacc这次提交
git revert 0ffaacc     
# 撤销最近一次提交
git revert HEAD       
# 撤销最近2次提交，注意：数字从0开始
git revert HEAD~1      

# 回退后要执行强制推送远程分支
git push -f 
```

区别

- `reset` 是根据来移动 `HEAD` 指针，在该次提交点后面的提交记录会丢失。
- `revert` 会产生新的提交，来抵消选中的该次提交的修改内容，不会丢失中间的提交记录。



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



```bash
//直接拉取并合并最新代码
git pull origin master // 拉取远端origin/master分支并合并到当前分支
git pull origin dev // 拉取远端origin/dev分支并合并到当前分支
```

```git
git checkout master
git pull origin master
git merge dev
git push origin master
```



```bash
yarn start
rm -rf 
rimraf

yarn cache clean --force
```



#### 工作流程

在多人协作的分支管理中,我们定义了 `master(稳定) => sit(测试) => release(beta) => 流转release到线上 => 合并release到master `这样一个工作流




（随时更新...）
