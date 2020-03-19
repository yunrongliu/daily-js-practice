/**
 * 判断是否为一个纯文本节点
 * @param tag {String}
 * @return flag {boolean}
 */
function isPlainTextElement (tag) {
  const tags = {
    script: true,
    style: true,
    textarea: true,
  }

  return tags[tag]
}

/**
 * 判断是否是一个禁用标签
 * @param tag {String}
 * @return flag {boolean}
 */
function isForbiddenTag (tag) {
  let tags = {
    script: true,
    style: true,
  }

  return tags[tag]
}

/**
 * 判断是否是一个自闭和标签
 * @param tag {String}
 * @return flag {boolean}
 */
function isUnaryTag (tag) {
  const strs = `area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr`
  const unaryTags = makeMap(strs)

  return unaryTags[tag]
}

/**
 * 判断是否是一个可以不用/结束的标签
 * @param tag {String}
 * @return flag {boolean}
 */ 
function isCanBeLeftOpenTag (tag) {
  const strs = `colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source`
  const canBeLeftOpenTags = makeMap(strs)

  return canBeLeftOpenTags[tag]
}

/**
 * 判断是否是一个段落标签
 * @param tag {String}
 * @return flag {boolean}
 */
function isNonPhrasingTag (tag) {
  const strs = `address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track`;
  const nonPhrasingTags = makeMap(strs)

  return nonPhrasingTags[tag]
}

/**
 * 传入字符串，转换为一个字典对象
 * @param strs {string}
 * @return wordMap {object}
 */
function makeMap (strs) {
  let arr = strs.split(',')
  return arr.reduce((ret,current)=> {
    ret[current] = true
    return ret
  },{})
}

export {
  isPlainTextElement,
  isForbiddenTag,
  isUnaryTag,
  isCanBeLeftOpenTag,
  isNonPhrasingTag,
  makeMap,
}