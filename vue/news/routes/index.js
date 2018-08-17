const express = require('express');
const router = express.Router();
const superagent= require('superagent');
const cheerio = require('cheerio');
const nightmare = require('nightmare')();
let hotNews = [], localNews=[], news=[];
/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({
    'hotNews': hotNews,
    'localNews': localNews,
    'news': news
  });
});
getUrl();
function getUrl(){
  superagent.get('http://news.baidu.com/').end((err, resN)=>{
    if (err) {
      console.log('抓取失败');
    } else {
      hotNews = getHotNews(resN.text);
    }
  })

  /*nightmare
  .goto('http://news.baidu.com/')
  .wait("div#local_news")
  .evaluate(() => document.querySelector("div#local_news").innerHTML)
  .then(htmlStr => {
    // 获取本地新闻数据
    localNews = getLocalNews(htmlStr);
  })
  .catch(error => {
    console.log(`本地新闻抓取失败 - ${error}`);
  })*/

  nightmare
  .goto('http://news.baidu.com/')
  .scrollTo(1500, 0)
  // .wait(3000)
  .evaluate(() => document.querySelector("#body").innerHTML)
  .then(htmlStr => {
    // 获取全部新闻数据
    localNews = getLocalNews(htmlStr);
  })
  .catch(error => {
    console.log(`新闻抓取失败 - ${error}`);
  })

  nightmare
  .goto('http://site.baidu.com/')
  // .scrollTo(1500, 0)
  .wait('.main')
  .evaluate(() => document.querySelector(".main").innerHTML)
  .then(htmlStr => {
    // 获取全部新闻数据
    news = getNews(htmlStr);
  })
  .catch(error => {
    console.log(`新闻抓取失败 - ${error}`);
  })
}

let getHotNews = (res)=>{
  let hotNews = [];
  let $ = cheerio.load(res);
  $('div#pane-news ul li a').each((index, val)=>{
    let arrObj = {
      href: val.attribs.href,
      text: $(val).text()
    };
    hotNews.push(arrObj);
  })
  return hotNews;
}

let getLocalNews = (res) => {
  let news = [];
  let $ = cheerio.load(res);

  $('li a').each((index, val)=>{
    if ($(val).text()!='' && $(val).attr('href').indexOf('javascript')==-1) {
      let arrObj = {
        href: decodeURI(val.attribs.href),
        text: $(val).text()
      };
      news.push(arrObj);
    }
  })
  return news;
}

let getNews = (res) => {
  let news = [];
  let $ = cheerio.load(res);

  $('.clr-black').each((index, val)=>{
    if ($(val).text()!='' && $(val).attr('href').indexOf('javascript')==-1) {
      let arrObj = {
        href: decodeURI(val.attribs.href),
        text: $(val).text()
      };
      news.push(arrObj);
    }
  })
  return news;
}
module.exports = router;
