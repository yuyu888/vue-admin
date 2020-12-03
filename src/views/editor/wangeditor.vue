<template>
<div>
    <div>文档：http://www.wangeditor.com/</div>
    <div>github：https://github.com/wangeditor-team/wangEditor/</div>
    <div>一个支持markdown的编辑器，github：https://github.com/hinesboy/mavonEditor</div>
    <div>这个也不错，https://www.yuque.com/chaojie-vjiel/vbwzgu/zg6zcq</div>
    <div id="editor"></div>
</div>
</template>

<script>
import E from "wangeditor";

export default {
    name: 'Wangeditor',
    data() {
        return {}
    },
    // created() {
    //     this.init() //需要使用setTimeout， 生命周期要清楚
    // },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            // setTimeout(function () {
                const editor = new E("#editor");
                // 默认情况下，显示所有菜单
                // editor.config.menus = [
                //     'head',
                //     'bold',
                //     'fontSize',
                //     'fontName',
                //     'italic',
                //     'underline',
                //     'strikeThrough',
                //     'indent',
                //     'lineHeight',
                //     'foreColor',
                //     'backColor',
                //     'link',
                //     'list',
                //     'justify',
                //     'quote',
                //     'emoticon',
                //     'image',
                //     'video',
                //     'table',
                //     'code',
                //     'splitLine',
                //     'undo',
                //     'redo',
                // ];
                // 配置颜色（文字颜色、背景色）
                // editor.config.colors = [
                //     '#000000',
                //     '#eeece0',
                //     '#1c487f',
                //     '#4d80bf'
                // ]

                // 配置字体
                // editor.config.fontNames = [
                //     '黑体',
                //     '仿宋',
                //     '楷体',
                //     '标楷体',
                //     '华文仿宋',
                //     '华文楷体',
                //     '宋体',
                //     '微软雅黑',
                //     'Arial',
                //     'Tahoma',
                //     'Verdana',
                //     'Times New Roman',
                //     'Courier New',
                // ]
                // 配置行高
                // editor.config.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3']

                //配置表情图标
                // const SINA_URL_PATH = 'http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal'
                // editor.config.emotions = [{
                //         title: '新浪', // tab 的标题
                //         type: 'image', // 'emoji' 或 'image' ，即 emoji 形式或者图片形式
                //         content: [{
                //                 alt: '[坏笑]',
                //                 src: `${SINA_URL_PATH}/50/pcmoren_huaixiao_org.png`
                //             },
                //             {
                //                 alt: '[舔屏]',
                //                 src: `${SINA_URL_PATH}/40/pcmoren_tian_org.png`
                //             },
                //             {
                //                 alt: '[污]',
                //                 src: `${SINA_URL_PATH}/3c/pcmoren_wu_org.png`
                //             },
                //         ]
                //     },
                //     {
                //         title: 'emoji', // tab 的标题
                //         type: 'emoji', // 'emoji' / 'image'
                //         // emoji 表情，content 是一个数组即可
                //         content: '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐'.split(/\s/),
                //     }
                // ]

                // 挂载highlight插件
                //【引入】
                // npm install highlight.js -S
                // import hljs from 'highlight.js'
                // import 'highlight.js/styles/monokai_sublime.css'
                // [end]
                // editor.highlight = hljs

                // 配置 onchange 回调函数
                // editor.config.onchange = function (newHtml) {
                //     console.log('change 之后最新的 html', newHtml)
                // }
                // 配置触发 onchange 的时间频率，默认为 200ms
                // editor.config.onchangeTimeout = 500 // 修改为 500ms

                // editor.config.onblur = function (newHtml) {
                //     console.log('onblur', newHtml) // 获取最新的 html 内容
                // }
                // editor.config.onfocus = function (newHtml) {
                //     console.log('onfocus', newHtml) // 获取最新的 html 内容
                // }

                // 插入网络图片的回调
                // editor.config.linkImgCallback = function (src) {
                //     console.log('图片 src ', src)
                // }
                // 设置 editor.config.uploadImgShowBase64 = true 可使用 base64 格式保存图片

                //==================================image upload======================================
                // 配置 server 接口地址
                // editor.config.uploadImgServer = '/upload-img'
                // 接口要返回 application/json 格式，格式要求如下：

                // {
                //     // errno 即错误代码，0 表示没有错误。
                //     //       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
                //     "errno": 0,

                //     // data 是一个数组，返回图片的线上地址
                //     "data": [
                //         "图片1地址",
                //         "图片2地址",
                //         "……"
                //     ]
                // }
                // editor.config.uploadImgMaxSize = 2 * 1024 * 1024 // 2M
                // editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
                // editor.config.uploadImgMaxLength = 5 // 一次最多上传 5 个图片
                // editor.config.uploadImgParams = {
                //     token: 'xxxxx',
                //     x: 100
                // }
                // 如果需要将参数拼接到 url 中， 可再加上如下配置。
                // editor.config.uploadImgParamsWithUrl = true
                // editor.config.uploadFileName = 'your-custom-fileName'
                // editor.config.uploadImgHeaders = {
                //     Accept: 'text/x-json',
                //     a: 100,
                // }
                // 跨域上传中如果需要传递 cookie 需设置 withCredentials。

                // editor.config.withCredentials = true
                // editor.config.uploadImgTimeout = 5 * 1000
                // editor.config.uploadImgHooks = {
                //     // 上传图片之前
                //     before: function (xhr) {
                //         console.log(xhr)

                //         // 可阻止图片上传
                //         return {
                //             prevent: true,
                //             msg: '需要提示给用户的错误信息'
                //         }
                //     },
                //     // 图片上传并返回了结果，图片插入已成功
                //     success: function (xhr) {
                //         console.log('success', xhr)
                //     },
                //     // 图片上传并返回了结果，但图片插入时出错了
                //     fail: function (xhr, editor, resData) {
                //         console.log('fail', resData)
                //     },
                //     // 上传图片出错，一般为 http 请求的错误
                //     error: function (xhr, editor, resData) {
                //         console.log('error', xhr, resData)
                //     },
                //     // 上传图片超时
                //     timeout: function (xhr) {
                //         console.log('timeout')
                //     },
                //     // 图片上传并返回了结果，想要自己把图片插入到编辑器中
                //     // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
                //     customInsert: function (insertImgFn, result) {
                //         // result 即服务端返回的接口
                //         console.log('customInsert', result)

                //         // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
                //         insertImgFn(result.data[0])
                //     }
                // }

                // editor.config.customUploadImg = function (resultFiles, insertImgFn) {
                //     // resultFiles 是 input 中选中的文件列表
                //     // insertImgFn 是获取图片 url 后，插入到编辑器的方法

                //     // 上传图片，返回结果，将图片插入到编辑器中
                //     insertImgFn(imgUrl)
                // }

                // 设置 editor.config.showLinkImg = false 即可隐藏插入网络图片的功能，即只保留上传本地图片。



                editor.create();
                editor.txt.html('初始化数据， 这个只是一个例子，需要用的时候单独封装')
                //editor.txt.clear()
            // }, 100);

        }
    }
}
</script>
