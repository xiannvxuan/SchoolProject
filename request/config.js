let url_config = ""
console.log(process.env.NODE_ENV, 'env')
if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'https://cmyk-so.com'
}else{
    // 生产环境
    url_config = 'https://cmyk-so.com'
}

export default url_config;
