import config from '../js/config'
export const style1 = `/**
 *
 * 你好啊. 我叫孙先富. 我是一个前端开发工程师.
 *
 * 我做了这个网页，以为我觉得很有意思
 *
 * 随着代码在屏幕上慢慢展示，代码也实际应用到了网页中，感觉贼强.
 */

* {
  transition: all 1s;
}

/**
 * 上面只是开胃菜. 咱们走着.
 *
 * 先来搞点颜色上去,
 * 先从html开始.
 */

html {
  background: #f13254;
  font-size: 10px;
  overflow: hidden;
}

/***
 * Hold on...
 */

pre, a {
  color: #ffffff;
}

/**
 * 现在看起来舒服多了.
 *
 * 不过在这么大个屏幕上看起来不怎么协调.
 *
 * 给他设一个宽高吧.
 */

pre:not(:empty) {
  ${config.isMobile?
  `max-height: 46%;
  width: calc(100% - 2rem);`
  :
  `max-height: 92%;
  width: 49%;`}
  font-size: 1.4rem;
  overflow: auto;
  background: rgb(48, 48, 48);
  border: 1px solid #ccc;
  padding: 1rem 1rem 2rem;
  white-space: pre-wrap;
  outline: 0;
}

#style-editor {
  ${config.isMobile?'':'transform: translateX(95%);'}
  position: absolute;
  left: 1rem;
  top: 1rem;
}

/**
 * 有宽高稍微协调点了, 再给代码搞个高亮!
 * 用prismjs插件，这个插件比较方便.
 */

#style-editor  { color: #DEDEDE }
.comment       { color: #857F6B; font-style: italic; }
.selector      { color: #D7BA7D; }
.keyword       { color: #569CD6; }
.property      { color: #569CD6; }
.function      { color: #C366A3; }
.punctuation   { color: #FFCF00; }

/**
 * 加点动效.
 */

body {
  perspective: 100rem;
}

#style-editor {
  ${config.isMobile?'transform: rotateX(-10deg);':'transform: translateX(98.5%) rotateY(-10deg);'}
  transform-origin: right;
}

/**
 * 大概就是这么个意思吧.
 * 再来加点东西.
 */

 #resume-content {
 ${config.isMobile?`position: absolute;
 left: 1rem;
 bottom: 3rem;
 height: 48%;`
  :`position: absolute;
  left: 1rem;
  top: 1rem;
  transform: rotateY(10deg);
  transform-origin: left;`}
}
`

export const style2 = `/**
 * 左边的好像有点不协调，盘他.
 */

#resume-content{
  padding: 2rem;
  font-size: 1.4rem;
}
#resume-content h1{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 2.5rem 0 1rem;
  font-size: 2.6rem;
}
#resume-content a{
  color: #ffffff;
  text-decoration: none;
}
#resume-content ul> li{
  margin-bottom: .3rem;
}
#resume-content ul> li::before{
  content: '•';
  margin-right: .5rem;
  color: '#ffffff';
}

/**
 * 好了, 页面也展示的差不多了.
 *
 * 我是看了这个网页 http://strml.net/， 觉得很牛逼才搞了了这个页面.
 *
 * 首先感谢百度和谷歌，再感谢康康，哇哈哈哈哈哈哈.
 *
 * 拜拜啦您嘞，溜了溜了.
 *
 */`
