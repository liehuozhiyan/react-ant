import $$ from 'cmn-utils';
import config from '@/config';
import { MyModal } from 'components/Notification';

export const generateOrgTree = function (orgList) {
  orgList || (orgList = []);
  return orgList.map(item => {
    if (item.children && item.children.length > 0) {
      return {
        ...item,
        key: item.id,
        label: item.text,
        value: item.id,
        children: generateOrgTree(item.children)
      }
    } else {
      return {
        ...item,
        key: item.id,
        label: item.text,
        value: item.id,
      }
    }
  })
}

export const generateSenseArray = function (senseArray) {
  senseArray || (senseArray = []);
  senseArray.sort((item1, item2) => {
    return item1.width - item2.width;
  })
  return senseArray.map(item => {
    let sense = item.width + 'x' + item.height;
    return {
      code: sense,
      codeName: sense,
    }
  })
}

export const mathDivide = function (param, compare) {
  return parseInt(parseInt(param, 10) / compare, 10);
}

export const mathMultiply = function (param, compare) {
  return Math.round(((param * compare) * 10000) / 10000);
}

export const getMaxWidthHeight = function (sense, maxWidth = 300, maxHeight = 300) {
  let divWH = { width: maxWidth, height: maxHeight };
  if (sense) {
    let picWidth = parseInt(sense.split('x')[0], 10);
    let picHeight = parseInt(sense.split('x')[1], 10);
    let divWidth = picWidth > maxWidth ? maxWidth : picWidth;
    let divHeight = picHeight > maxHeight ? maxHeight : picHeight;
    if (picWidth > picHeight) {
      divHeight = divWidth / (picWidth / picHeight);
    } else if (picWidth < picHeight) {
      divWidth = (picWidth / picHeight) * divHeight
    }

    divWH.width = divWidth;
    divWH.height = divHeight;
  }
  return divWH;
}

/**
 * 获取当前浏览器窗口宽高
 */
export const getWinSize = function () {
  // 窗口大小
  let { innerWidth: winWidth, innerHeight: winHeight } = window;
  // winWidth = winWidth * detectZoom();
  // winHeight = winHeight * detectZoom();
  // winWidth = winWidth < 1440 ? 1440 : winWidth;
  // winHeight = winHeight < 800 ? 800 : winHeight;
  return {
    winWidth,
    winHeight,
  }
}
export const getMenuWidth = function (type) {
  var value = 0;
  if ('leftSideBar' == type) {
    value = 200;
  } else if ('materialTree' == type || 'playlistTree' == type) {
    value = 220;
  } else if ('clientTree' == type || 'orgTree' == type) {
    value = 220;
  } else if ('materialMaxWidth' == type) {
    value = 252;
  } else if ('materialMaxHeight' == type) {
    value = 280 - 100;
  }
  return value;
}
/**
 * 浏览器类型及版本
 * 
 * let browser = getBrowserInfo();//取到完整信息
 * let b_name = (browser + "").replace(/[0-9./]/ig, "");//根据正则将所有数字、‘.’‘/’全部去掉，剩下浏览器名
 * let b_version = parseInt((browser + "").replace(/[^0-9.]/ig, ""));//根据正则将所有非数字全部去掉，剩下版本
 */
export const getBrowserInfo = function () {
  let agent = navigator.userAgent.toLowerCase();
  let regStr_ie = /msie [\d.]+;/gi;
  let regStr_ff = /firefox\/[\d.]+/gi
  let regStr_chrome = /chrome\/[\d.]+/gi;
  let regStr_saf = /safari\/[\d.]+/gi;
  let isIE = agent.indexOf("compatible") > -1 && agent.indexOf("msie" > -1); //判断是否IE<11浏览器  
  let isEdge = agent.indexOf("edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
  let isIE11 = agent.indexOf('trident') > -1 && agent.indexOf("rv:11.0") > -1;
  if (isIE) {
    let reIE = new RegExp("msie (\\d+\\.\\d+);");
    reIE.test(agent);
    let fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return "IE/7";
    } else if (fIEVersion == 8) {
      return "IE/8";
    } else if (fIEVersion == 9) {
      return "IE/9";
    } else if (fIEVersion == 10) {
      return "IE/10";
    }
  } //isIE end 
  if (isIE11) {
    return "IE/11";
  }
  //firefox
  if (agent.indexOf("firefox") > 0) {
    return agent.match(regStr_ff);
  }
  //Safari
  if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
    return agent.match(regStr_saf);
  }
  //Chrome
  if (agent.indexOf("chrome") > 0) {
    return agent.match(regStr_chrome);
  }
}

/**
 * ES6下的对象深度克隆
 * 
 * @param {*} obj 待克隆对象
 * 
 * 返回克隆后的对象
 */
export const deepClone = (obj) => {
  //如果obj为undefined，或者为null，则直接返回
  if (!obj) {
    return obj;
  }

  let objJson = JSON.stringify(obj);
  return JSON.parse(objJson);
}

/** 是不是正整数 */
export const isInteger = function (str) {
  return /[0-9]{1,}$/.test(str);
}

/** 是不是小数或正整数 */
export const isDouble = function (str) {
  return /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(str);
}

/** 自定义正则 */
export const regularTest = function (str, regular) {
  return regular.test(str);
}

/** 四舍五入保留2位小数 */
export const To_String = function (num, len) {
  return num.toFixed(len);
}

//计算区域百分比
export const showPCNT = function (type, value, total) {
  value = value / total * 100;
  return parseFloat(value.toFixed(2));
}

//计算区域值，整数
export const showInteger = function (type, value, total) {
  return parseInt(total * value / 100, 10);
}

export const RGB2RGBA = function (rgb_color, alp) {
  //注：rgb_color的格式为#FFFFFFF，alp为透明度
  let r = parseInt("0x" + rgb_color.substr(1, 2), 16);
  let g = parseInt("0x" + rgb_color.substr(3, 2), 16);
  let b = parseInt("0x" + rgb_color.substr(5, 2), 16);
  let a = alp;
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

export const RGBA2RGB = function (rgba_color) {
  //注：rgba_color的格式为rgba(0,0,0,0.1)
  let BGcolur = 1;
  let arr = rgba_color.split("(")[1].split(")")[0].split(",");
  let a = arr[3];
  let r = BGcolur * (1 - a) + arr[0] * a;
  let g = BGcolur * (1 - a) + arr[1] * a;
  let b = BGcolur * (1 - a) + arr[2] * a;
  return "rgb(" + r + "," + g + "," + b + ")";
}

/**
 * 秒相加
 */
export const multime = function (t1, t2) {
  let time1 = t1.split(":");
  let time2 = t2.split(":");

  let second = 0;
  let minute = 0;
  let hour = 0;

  second = parseInt(time1[2], 10) + parseInt(time2[2], 10);
  minute = parseInt(time1[1], 10) + parseInt(time2[1], 10);
  hour = parseInt(time1[0], 10) + parseInt(time2[0], 10);

  if (second >= 60) {
    minute = minute + Math.floor(second / 60);
    second = Math.floor(second % 60);
  }
  if (minute >= 60) {
    hour = hour + Math.floor(minute / 60);
    minute = Math.floor(minute % 60);
  }
  if (hour > 99) {
    hour = 99;
  }

  if (second < 10) {
    second = '0' + second;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  return hour + ":" + minute + ":" + second;
}

//等比例压缩方法
export const scalingSize = function (originalWidth, originalHeight, width, height) {
  let newWidth = 0;
  let newHeight = 0;

  if (originalWidth > 0 && originalHeight > 0) {
    if (originalWidth / originalHeight >= width / height) {
      if (originalWidth > width) {
        newWidth = width;
        newHeight = (originalHeight * width) / originalWidth;
      } else {
        newWidth = originalWidth;
        newHeight = originalHeight;
      }
    } else {
      if (originalHeight > height) {
        newHeight = height;
        newWidth = (originalWidth * height) / originalHeight;
      } else {
        newWidth = originalWidth;
        newHeight = originalHeight;
      }
    }
  }

  return [newWidth, newHeight];
}

/**
 * 获取字符串的中文字符个数、英文字符个数、宽度、高度
 * @param {*} content 字符串
 * @param {*} size 文字大小
 */
export const getContentParam = function (content, size = 12, ) {
  let isReg = content.match(/[^\x00-\xff]/ig);
  let clength = isReg == null ? 0 : isReg.length;
  let elength = content.length - clength;
  let length = clength + parseInt(Math.ceil(elength / 2), 10);
  let width = length * size;
  let height = size;
  return { clength, elength, length, width, height };
}

/**
 * 将超出范围的字符串省略
 * @param {*} content 字符串
 * @param {*} size 文字大小
 * @param {*} showLength 显示字符的长度
 */
export const textEllipsis = function (content, showLength) {
  if (!content) {
    return "";
  }
  let { clength, elength } = getContentParam(content);
  // let totalLength = clength * 2 + elength;
  let totalLength = clength + elength;
  if (totalLength <= showLength + 1) {
    return content;
  }
  let index = content.lastIndexOf(".");
  if (index !== -1) {
    let name = content.substring(0, index);
    let suffix = content.substring(index, content.length);
    showLength = showLength - suffix.length;
    let showLength1 = Math.floor(showLength / 2);
    let showLength2 = showLength - showLength1;
    let startStr = getPrefixContent(name, showLength1);
    let endStr = getSuffixContent(name.replace(startStr.replace("...", ""), ""), showLength2);
    return startStr + endStr + suffix;
  } else {
    return getPrefixContent(content, showLength);
  }
}

export const getPrefixContent = function (content, showLength) {
  let startLength = 0;
  let startStr = "";
  for (let i = 0; i < content.length; i++) {
    let item = content.charAt(i);
    startLength++;
    if (escape(item).length > 4) {
      //中文字符的长度经编码之后大于4  
      startLength++;
    }
    startStr += item;
    if (startLength > showLength) {
      startStr += "...";
      return startStr;
    }
  }
  //如果给定字符串小于指定长度,则返回源字符串 
  if (startLength < showLength) {
    return content;
  }
}

export const getSuffixContent = function (content, showLength) {
  let endLength = 0;
  let endStr = "";
  for (let i = content.length - 1; i >= 0; i--) {
    let item = content.charAt(i);
    endLength++;
    if (escape(item).length > 4) {
      //中文字符的长度经编码之后大于4  
      endLength++;
    }
    endStr += item;
    if (endLength >= showLength) {
      return endStr.split("").reverse().join("");
    }
  }
  //如果给定字符串小于指定长度,则返回源字符串
  if (endLength < showLength) {
    return content;
  }
}

function isNumber(str) {
  let reg = /^\d+$/;
  if (reg.test(str))
    return true;
  else
    return false;
}

function checkTime(str) {
  let regExp = new RegExp("^[0-9]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1}$");
  return regExp.test(str);
}

/**
 * 时间转秒
 */
export const timetonum = (time) => {
  if (!checkTime(time)) {
    time = '00:00:00';
  }

  let times = time.split(":");

  let hour = parseInt(times[0], 10);
  let minute = parseInt(times[1], 10);
  let second = parseInt(times[2], 10);

  return hour * 3600 + minute * 60 + second;
}

/**
 * 秒转时间
 */
export const numtotime = (num) => {
  if (!isNumber(num)) {
    num = 0;
  }

  let hour = Math.floor(num / 3600) + "";
  let minute = Math.floor(num % 3600 / 60) + "";
  let second = Math.floor(num % 3600 % 60) + "";

  hour = hour + "";
  hour = hour.length === 2 ? hour : "0" + hour;
  minute = minute.length === 2 ? minute : "0" + minute;
  second = second.length === 2 ? second : "0" + second;

  return hour + ":" + minute + ":" + second;
}

/**
 * 秒相乘
 */
export const multiTime = function (time, count) {
  let times = parseInt(timetonum(time), 10);
  let totalTimes = times * count;
  return numtotime(totalTimes);
}

let flag = true;
export const forceHomepage = function () {
  //防止多次弹框
  if (flag && window.location.href.indexOf('/sign/login') < 0) {
    //删除缓存登录用户
    $$.removeStore('user');

    MyModal.warn({
      className: 'custom-modal',
      title: window.language['cdms.tip'],
      content: window.language['cdms.sessionexpire'],
      message: window.language['cdms.sessionexpire'],
      onOk: () => {
        flag = true;
        window.location.href = window.contextPath + '#/sign/login';
      },
      onCancel: () => {
        flag = true;
        window.location.href = window.contextPath + '#/sign/login';
      }
    });

    flag = false;
  }
}

/**
 * 下载文件方法
 * @param {url} 请求链接
 * @param {params} 请求参数对象
 * @param {headers} 请求头对象，可以不传
 * 
 * 如果headers参数不传，默认以application/x-www-form-urlencoded传参
 * 此时params参数必须是如下格式“param1=value1&param2=value2”等，多个参数用&连接
 * 
 * 如果headers参数传{"Content-Type": "application/json"}，则以json格式传参
 * 此时params参数必须是json格式，里面key和value只能都是字符串
 */
export const downloadFile = function (url, params, headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}) {
  const target = config.request.prefix;

  let formElement = document.createElement('form');
  formElement.style.display = "display:none;";
  formElement.method = 'post';
  formElement.action = target + "/" + url;
  formElement.target = '_self';
  formElement.acceptCharset = 'UTF-8';
  let paramArr = params.split("&");

  //将传参录入form表单
  for (let i = 0; i < paramArr.length; i++) {
    let paramItem = paramArr[i].split("=");
    let inputElement = document.createElement('input');
    inputElement.type = 'hidden';
    inputElement.name = paramItem[0];
    inputElement.value = paramItem[1];
    formElement.appendChild(inputElement);
  }

  //form表单最后追加一个token验证
  let inputElement = document.createElement('input');
  inputElement.type = 'hidden';
  inputElement.name = 'token';
  inputElement.value = $$.getStore("token");
  formElement.appendChild(inputElement);

  document.body.appendChild(formElement);
  formElement.submit();
  document.body.removeChild(formElement);
}

/**
 * windows 窗口打开查看原文件方法
 * @param {url} 请求链接
 * @param {params} 请求参数对象
 * @param {headers} 请求头对象，可以不传
 * 
 * 如果headers参数不传，默认以application/x-www-form-urlencoded传参
 * 此时params参数必须是如下格式“param1=value1&param2=value2”等，多个参数用&连接
 * 
 * 如果headers参数传{"Content-Type": "application/json"}，则以json格式传参
 * 此时params参数必须是json格式，里面key和value只能都是字符串
 */
export const openFile = function (url, params, headers = {
  "Content-Type": "application/x-www-form-urlencoded"
}) {
  //给请求头传token
  headers.token = $$.getStore("token");

  const target = config.request.prefix;

  fetch(target + "/" + url, {
    method: "POST",
    headers,
    body: params
  }).then(response => response.blob().then(blob => {
    if (response.status === 200) {
      //URL.createObjectURL()方法会根据传入的参数创建一个指向该参数对象的URL。
      //这个URL的生命仅存在于它被创建的这个文档里，新的对象URL指向执行的File对象或者是Blob对象。
      let openUrl = window.URL.createObjectURL(blob);
      window.open(openUrl);
      //每次调用createObjectURL时，即使你已经为同一个文件创建过一个URL，也会创建一个新的URL对象。
      //如果你不再需要这个对象，需要使用URL.revokeObjectURL()方法释放它。
      //虽然当页面被关闭，浏览器会自动释放它，但是为了最佳性能和内存使用，当确保不再用得到它时，就应该释放它。
      window.URL.revokeObjectURL(openUrl);
    } else {
      const notice = config.notice;
      notice.error("下载失败：" + response.status);
    }
  })).catch((error) => {
    const notice = config.notice;
    notice.error("下载失败：" + error);
  });
}

//num表示天数，接受正负数
export const getPointDate = (curDate, num) => {
  if (!curDate || !num) {
    return new Date();
  }
  curDate = curDate.replace(/-/g, '/');
  const d = new Date(curDate);
  d.setDate(d.getDate() + parseInt(num, 10));
  return d;
}

//num表示天数，接受正负数
export const getPointMonth = (curDate, num) => {
  if (!curDate || !num) {
    return new Date();
  }
  curDate = curDate.replace(/-/g, '/');
  const d = new Date(curDate);
  d.setMonth(d.getMonth() + parseInt(num, 10));
  return d;
}

export const detectZoom = () => {
  let ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();
  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  }
  else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  }
  else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }
  // if (ratio) {
  //     ratio = Math.round(ratio * 100);
  // }
  // document.body.style.zoom = 100 / ratio;
  document.body.style.zoom = 1 / ratio;
  return ratio;
}

Date.prototype.format = function (format) {
	/*
	 * eg:format="YYYY-MM-dd hh:mm:ss";
	 */
  let o = {
    "M+": this.getMonth() + 1, // month
    "d+": this.getDate(), // day
    "h+": this.getHours(), // hour
    "m+": this.getMinutes(), // minute
    "s+": this.getSeconds(), // second
    "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
    "S": this.getMilliseconds()
    // millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

/**
 * 图片等比缩放
 * 
 * @param {*} width 原宽度
 * @param {*} height 原高度
 * @param {*} maxWidth 最大宽 
 * @param {*} maxHeight 最大高
 */
export const calculateWH = function (width, height, maxWidth, maxHeight) {
  //传参可能是String，需要转成Number
  width = Number(width);
  height = Number(height);
  maxWidth = Number(maxWidth);
  maxHeight = Number(maxHeight);

  //缩放到的宽度
  let calcWidth = 0;

  //缩放到的高度
  let calcHeight = 0;

  if (width / height >= maxWidth / maxHeight) {
    if (width > maxWidth) {
      calcWidth = maxWidth;
      calcHeight = (calcWidth * height) / width;
    } else {
      calcWidth = width;
      calcHeight = height;
    }
  } else {
    if (height > maxHeight) {
      calcHeight = maxHeight;
      calcWidth = (calcHeight * width) / height;
    } else {
      calcHeight = height;
      calcWidth = width;
    }
    }

  return {
    'width' : calcWidth,
    'height' : calcHeight
  };
}

/**
 * 根据类型，返回加减后的时间
 * @param {*} time 
 * @param {*} type hour
 * @param {*} number 
 */
export const getAddTime = function(time, type, number){
  if(time === null || time ==='' 
  || time.length !== 5 || time.indexOf(":") === -1){
    return "00:00";
  }
  if(type === 'hour'){
    let arr = time.split(":");
    let h = parseInt(arr[0]);
    let m = arr[1];
    if(h>=23){
      return '23:59';
    }else{
      h = h+number;
      if(h<10){
        return '0'+h+":"+m;
      }else{
        return h+":"+m;
      }
    }
  }
  return "00:00";
}