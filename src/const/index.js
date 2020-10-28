// const MAIN_HOST = (process.env.NODE_ENV === 'development' || process.env.IS_DEV) ? 'test.myproject.com' : 'www.myproject.cn'
console.log(process.env.NODE_ENV)
var host = '127.0.0.1:8199'
if(process.env.NODE_ENV === 'development'){
  host = 'dev.myproject.com'
}else if(process.env.NODE_ENV === 'test'){
  host = 'test.myproject.com'
}else{
  host = 'www.myproject.com'
}
const UTIL = {
  AJAX_BASEURL: window.location.protocol+'//' + host
}
export default UTIL