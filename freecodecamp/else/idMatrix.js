function idMatrix(n) {
  // Good luck!
  return Array.from({length: n})
                .map((current,index)=> {
                  return Array.from({length: n})
                                .reduce((ret,innerC,innerInx)=> {
                                  if(index === innerInx) {
                                    ret.push(1)
                                  } else {
                                    ret.push(0)
                                  }

                                  return ret
                                },[])
                })
}