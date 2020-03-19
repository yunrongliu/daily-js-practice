import { 
  isPlainTextElement,
  isUnaryTag,
  isCanBeLeftOpenTag,
  isNonPhrasingTag,
  makeMap,
} from "./util/htmlCompile"

const ncname = '[a-zA-Z_][\\w\\-\\.]*'
const qnameCapture = `((?:${ncname}\\:)?${ncname})` // ?: 非匹配捕获
const startTagOpen = new RegExp(`^<${qnameCapture}`) 
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

const comment = /^<!--/

const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|(^\s"'=<>`]+)))?/


export function parseHTML(html,options) {
  let stack = [] // 栈 => 维护层级关系 
  let lastTag // 上一次解析的标签 => 父标签  
  let index = 0 // 唯一标识
  let opt // 保存options引用
  opt = options

  // 循环至 html 为空
  while(html) {
    console.log('30',html)
    // 如果lastTag为空 或者 lastTag 不是一个纯文本元素
    if(!lastTag || !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf('<') // 获取html中 < 的位置
      // 如果是0，则说明是一个元素节点
      if (textEnd === 0) {
        
        // 先处理为注释的情况
        if(html.match(comment)) {
          let commentEnd = html.indexOf('-->')
          if(commentEnd >= 0) {
            if(opt.shouldKeepComment && opt.comment) {
              opt.comment(html.substring(4,commentEnd)) // <!-- => length == 4
            }
            advance(commentEnd + 3) // --> => length == 3
          }
        }

        // 处理条件注释

        // 处理doctype

        // 处理开始标签
        const startTagMatch = parseStartTag() 
        console.log('52 startTagMatch',startTagMatch)
        if(startTagMatch) {
          handleStartTag(startTagMatch)
          continue;
        }

        // 处理结束标签tag
        const endTagMatch = html.match(endTag)
        if(endTagMatch) {
          advance(endTagMatch[0].length)
          parseEndTag(endTagMatch[1])
          continue;
        }

      } 
       // 处理text
       let text
       if(textEnd > 0) {
         text = html.slice(0,textEnd)
         advance(textEnd)
       }

       if(textEnd < 0) {
         text = html
         html = ''
       }

       if(opt.chars) {
         console.log('exec Charts hook , text is ',text)
         opt.chars(text)
       }
    } else {
      let stackedTag = lastTag.toLowerCase() //如果lastTag是一个纯文本节点
      let tagReg = new RegExp('([\\s\\S]*?)(</'+stackedTag+'[^>]*>)','i') // 设置匹配该tag结束的正则
      
      let match = html.match(tagReg) // 如果匹配到了
      if(match) {
        let text = match[1] //将其中的文本保存
        if(opt.chars) {
          opt.chars(text) // 触发chars hook
        }

        advance(text.length + match[2].length)
        parseEndTag(stackedTag) // 处理标签结束
      }
    }
  }

  function advance (n) {
    index += n;
    html = html.substring(n)
  }
  
  /**
   * 解析开始标签
   */
  function parseStartTag () {
    console.log('startParseStartTag')
    const start = html.match(startTagOpen) // 匹配开始标签
    // 如果匹配到了
    if(start) {
      console.log('startTag',start)
      const match = {
        tagName: start[1], // 标签名
        attrs: [],
        start: index
      }
      advance(start[0].length) // start[0] => <div
  
      let end,attr
      // 如果不是一个自闭和标签 或者 开始标签结束标识 > 并且 匹配到了属性
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length) // 截取长度
        match.attrs.push(attr) // 添加属性
      }
      console.log('startTagClose: ',end)
      // 如果是自闭和标签 或者 开始标签结束标识 >
      if(end) {
        match.unarySlash = end[1] // 判断是否是自闭和标签 可能的值 '' | / 
        advance(end[0].length) // 截取长度
        return match
      }
    }
  }
  
  /**
   * 处理结束标签
   */
  function handleStartTag (match) {
    const tagName = match.tagName
    console.log(tagName)
    const unarySlash = match.unarySlash 
  
    if(opt.expectHTML) {
      // 处理 p 下面不能是div元素和其他一下元素的情况，主要是模拟html解析的做法
      console.log('lastTag',lastTag)
      if(lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(tagName) 
      }
    }
  
    let attrs = []
    attrs = match.attrs.reduce((ret, current) => {
      ret.push({
        name: current[1],
        value: current[3]
      })
  
      return ret
    }, [])
  
    // 判断是否是一个自闭和标签
    let unary = isUnaryTag(tagName) || !!unarySlash
  
    // 如果不是一个自闭和标签
    if(!unary) {
      // 推入
      stack.push({
        tag: tagName,
        lowerCasedTag: tagName.toLowerCase(),
        attrs
      })
  
      lastTag = tagName // 设置最近匹配的标签名为该tag
    }
  
    // 触发 start hook
    if(opt.start) {
      opt.start(tagName,attrs,unary)
    }
  }
  
  /**
   * 解析结束标签
   */
  function parseEndTag (tagName) {
    console.log('startParseEndTag')
    let pos = 0
  
    console.log('stack',JSON.stringify(stack))
    if(tagName) {
      tagName = tagName.toLowerCase()
      // 获取当前标签在栈中的位置
      for(pos = stack.length - 1;pos >=0;pos--) {
        if(stack[pos].lowerCasedTag === tagName) {
          break;
        }
      }
    } else {
      pos = 0
    }
    console.log('pos',pos)
    // 在栈中存在
    if(pos >= 0) {
      let i = stack.length - 1 // 获取栈总长度下标
      // 如果不是匹配标签 或者 tagName 不存在
      if(i > pos || !tagName) {
        console.error(`tag <${stack[i - 1].tag}> has no matching end tag.`) // 报错
      }

      // 触发end hook
      if(opt.end) {
        opt.end()
      }

      // 保持栈的长度一致 => 移除当前对象 | 移除
      stack.length = pos 
      console.log('pos && stack[stack.length -1].tag',pos)
      lastTag = pos && stack[stack.length -1].tag
    } else if(tagName === 'br') {
      if(opt.start) {
        opt.start(tagName,[],true)
      }
    } else if(tagName === 'p'){
      if(opt.start) {
        opt.start(tagName,[],false)
      }
      if(opt.end) {
        opt.end()
      }
    }
    
  }
}



