
## Environment

`Node >= 6`

## Start

 - Clone or download this repository
 - Enter your local directory, and install dependencies:

``` bash
npm install
```

## Develop

``` bash
# serve with hot reload at localhost:8010
npm run dev
```

## Build

``` bash
# build for develop with minification
npm run build-dev
# build for test with minification
npm run build-test
# build for production with minification
npm run build-online
```
## 本地调试 解决跨域问题 

``` bash
# 修改webpack.config.js文件 devServer配置
proxy: {
    '/api/': {
        target: 'http://mc.cn/api/',//接口域名
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        }
    }
},
```

## 本地mock数据调试
- 搭建mock server （如：Json-Server）

## 代码规范
- 代码工整、缩进（4个空格）
- 模块注释、功能点注释、方法注释

## 命名方式
### 自定义class类命名
- 语义化命名，分割线方式 （如：.nav-left）
- 自定义样式写在style.scss中，需要覆盖element ui的样式放在element-ui.scss中
- 只作用于单个组件的样式，写在组件中，添加scoped属性
### 文件及方法命名
- 驼峰式（如：addFunction）

##涉及技术栈
- es6（https://github.com/lukehoban/es6features）
- webpack （https://webpack.js.org/guides/）
- vue 2.x（https://cn.vuejs.org/v2/api/）
- vue-router（https://router.vuejs.org/zh-cn/）
- vuex（https://vuex.vuejs.org/zh-cn/）
- element Ui 1.4.1（http://element.eleme.io/#/zh-CN）

##常用页面demo: 
- views/demo/ 完善中
- 将包含表单、表格、分页、dialog框、面包屑等
- 新加高德地图 vue-amap 文档：https://elemefe.github.io/vue-amap/#/

## elmentUi 爬过的坑
###表单注意点：
- el-form rules，model属性绑定，ref标识
- el-form-item prop属性绑定 不然validateField、resetFields不生效
- el-date-picker 时间插件获取的时间需要格式化，自带的change可以，
也可以使用项目中的moment
- el-tree setCheckedKeys 该方法开发环境不生效（原因不知）；采用default-checked-keys设置默认项
- el-switch 默认是boolean类型,需要number类型的话用:on-value、:off-value设置，change回调函数中的参数callback就是开关当前的状态值
table中可以使用@change='changeStatus($event,scope.row)


## element-Ui 升级2.0 注意点：

1、主题css文件路径变化
2、scope换成了slop-scope
3、input内部icon类名变化
。。。。

