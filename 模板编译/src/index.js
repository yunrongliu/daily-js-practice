import {
  isForbiddenTag,
} from './util/htmlCompile'
import {parseHTML} from './html-parse'
/**
 * @infos {
 *  type: {
 *    1: 元素节点,
 *    2: 带有表达式文本的节点,
 *    3: 文本节点 || isComment ? 注释节点
 *    
 * 
 *  }
 * }
 */

/**
 * 创建AST格式的元素对象
 * @param tag {string} 标签名
 * @param attrs {Array} 属性数组
 * @param parent {ASTElement} 父节点
 * 
 * @return {
 *  type: {number} 标签类型
 *  tag: {string} 标签名
 *  attrsList: {Array} 属性数组
 *  parent: {ASTElement} 属性数组
 *  children: [Array->ASTElement] 属性数组
 * }
 */
function createASTElement (tag,attrs,parent) {
  // 遍历属性数组 转换成键值对 对象
  let attrsMap = attrs.reduce((ret, current) => {
    ret[current.name] = current.value

    return ret
  }, {})

  return {
    type: 1,
    tag,
    attrsList: attrs,
    attrsMap,
    parent,
    children: []
  }
}

// entry
/**
 * 解析模板
 * @param template {string} 模板字符串
 * @param options {object} 解析配置对象
 * 
 * @return ASTElement 
 */
export function parse (template,options) {
  let root // 根节点 对应template里面只能有一个父标签的规则
  let currentParent // 当前元素的父级元素，默认为undefined
  let stack = [] // 栈结构 => 维护模板解析时当前元素与父元素的关系

  parseHTML(template,{
    expectHTML: true, 
    shouldKeepComment: options.comments,
    // delimiters: options.delimiters, //此选项可以改变模板中变量解析规则 默认 {{}} 
    // 解析开始标签后的钩子函数
    start (tag,attrs,unary) {
      // 初始化元素节点 （只有元素节点可以进入）
      let element = createASTElement(tag,attrs,currentParent)

      // 如果不是一个script或者style标签
      if(isForbiddenTag(tag)) {
        element.forbidden = true
        console.error(`this tag ${tag} can't be resolved,must be a UI Element`)
      }

      // 默认第一个为根节点
      if(!root) {
        root = element
      }

      // 如果父节点存在 并且当前节点不是一个被禁用节点
      if(currentParent && !element.forbidden) {
        // 父元素 与 子元素 添加映射关系
        currentParent.children.push(element) // 将当前元素添加到父元素的children中
        element.parent = currentParent // 将父元素添加到当前元素的parent中
      }

      // 如果不是一个自闭和标签 
      if(!unary) {
        currentParent = element // 设置当前元素为父元素
        stack.push(element) // 向当前栈推入此元素 => 永远保持父元素是栈的最后一个元素
      }
    },
    // 标签解析结束钩子
    end () {
      let element = stack.pop() // 解析当前标签完毕 将元素推出栈
      currentParent = stack[stack.length -1] // 设置当前父节点为栈中最后一个元素
    },
    // 文本解析钩子
    chars (text) {
      // 如果无当前父级元素
      if(!currentParent) {
        // todo error
        console.error(`there must be have a parent Element!`)
      } else {
        const children = currentParent.children // 取出当前父节点的children 
        /**
         * <p>text<p>
         * 触发chars时 currentParent为p 
         */
        if(text) {
          let res = parseText(text) // 处理文本是否为包含变量的情况
          console.log('parseText','text:',text,'res: ',res)
          // 如果res存在，则说明是一个包含变量的文本
          if(res) {
            children.push({
              type: 2, // 标记类型
              expression: res.expression, // 保存表达式
              tokens: res.tokens, 
              text
            })
          } else {
            children.push({
              type: 3, // 标记类型
              text
            })
          }
        }
      }
    },
    // 注释节点钩子
    comment (text) {
      // 如果存在注释节点钩子
      if(currentParent) {
        currentParent.children.push({
          type: 3, // 标记类型
          text,
          isComment: true // 标记是否为注释
        })
      }
    }
  })

  return root // 将根节点return
  /**
   * 首先设置一个根节点，通过不断的解析截取html，借助对象弱引用完成节点树的创建
   */
}

/**
 * @param text {string} 要解析的文本
 * @return parsedTxt {string} 解析后的文本
 */
function parseText (text) {
  // 全局匹配 {{}}
  const tagRE = /\{\{((?:.|\n)+?)\}\}/g
  // 如果没有匹配到 则说明是普通文本 return 
  if(!tagRE.test(text)) {
    return 
  }

  const expression = []
  const tokens = [] // 储存字符串的数组
  let lastIndex = tagRE.lastIndex = 0 // 初始化 lastIndex 和 tagRE 的lastIndex 为 0
  let match,index 

  // exec返回匹配结构，每一次会从上一次的位置进行
  /**
   * 返回格式： 
   *  0: "{{name}}"
      1: "name"
      index: 3
      input: "姓名：{{name}}，年龄：{{age}}，请联系我吧"
      groups: undefined
      length: 2
   */
  while((match = tagRE.exec(text))) {
    console.log(match)
    index = match.index // 拿到匹配到patten的位置
    // 如果 匹配的位置 大于 最近一次匹配的位置
    if(index > lastIndex) {
      let value = text.slice(lastIndex,index)
      expression.push(JSON.stringify(value)) // 推入截取的字符串片段
      tokens.push(value)
    }


    expression.push(`_s(${match[1].trim()})`) // 推入需要处理变量的字符串

    lastIndex = index + match[0].length // 设置 最近一次的位置为 开始位置 + 整个{{}}表达式的位置
  }

  // 如果最后一次匹配的下标 小于text 的总长度 则说明剩下的都是普通文本
  if(lastIndex < text.length) {
    let value = text.slice(lastIndex)
    expression.push(JSON.stringify(value)) // 一次性推入
    tokens.push(value)
  }

  return {
    expression: expression.join('+'), // 组合成字符串，+为了方便在 new Function 中执行
    tokens
  } 
}


const template = `<div id="app" class="demo"><!-- 注意看注释 --><p><b>很粗</b></p>很简单，我就是一程序员<br/><h1>姓名：{{name}}，年龄：{{age}}，请联系我吧</h1><div><p><div></div></p></div></div>`

const res = parse(template,{comments: true})

console.log('res',res)