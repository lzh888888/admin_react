# ****后台管理
- 基于ant-design-pro(v1.2.1)：https://github.com/ant-design/ant-design-pro

## 使用
```
$ cd 项目目录
$ yarn
$ npm start
```

## svn ignore
  ```
  node_modules // checkout yarn
  app/src/devInfo.js  // checkout 复制文件"暂存/devInfo.js"
  ```

## bug
  - [√] 弹出框编辑数据，该数据的头像为失败的资源，编辑新头像成功后刷新列表数据，没有显示新的头像，
  但store中已经是新的头像url

## keng
  - 修改models文件后刷新才生效
  - models文件重名后要在新标签打开项目才不会报错，貌似是因为热加载缓存的原因
  - 在Modal使用this属性值，Modal关闭后并不会清空，需要手动

## 兼容性
现代浏览器及IE11。

## 备注
  打包把.webpackrc.js publicPath 改为 './'，这样子目录才能访问资源，开发时 '/'