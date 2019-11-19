> ## 此片文章描述浏览器的渲染过程

* 渲染过程用于理解浏览器行为和原理

>  在浏览器输入一个url，主进程会开启一个下载线程
   先将url进行dns域名解析，获取域名对应的ip地址
   向此ip地址的机器发送http请求
   经服务器处理后返回http请求，浏览器拿到返回内容
   随后将内容通过RendererHost接口转交给Renderer进程

   主要的下面的内容

   先解析html，构建dom树（前端日常工作中接触最多的数据结构就是树，关于树的操作一定要掌握好）
   解析css生成cssom （css）
   dom he cssom 结合 生成render树 负责各元素尺寸、位置的计算
   绘制render树，绘制页面像素信息
   浏览器将各层的信息发送给GPU,GPU将各层合成，显示在屏幕上


   DOMContentLoaded 事件监听dom树生成完毕的事件
   onload 事件监听render树生成完毕的事件

   如果在头部引入css，因为css的引入是异步的，所以不会妨碍dom树的构建
   但因为render树依赖cssom树，所以会影响render树的建立

   就是先把结构给解析好了，然后再解析cssom，然后构建render


   
   