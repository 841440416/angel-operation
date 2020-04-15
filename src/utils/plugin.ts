import * as dd from "dingtalk-jsapi";
import { Toast } from "vant";

const formatNumber = (n: any) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

/**
 * @desc 格式化日期（01-01）
 * @param {String} value 日期（2019-01-01 10:00:00）
 */
const formatDate = (value: string): string => (value ? value.substr(5, 5) : "--");

/**
 * @desc 格式化日期（01-01 10:00）
 * @param {String} value 日期（2019-01-01 10:00:00）
 */
const formatDate1 = (value: string): string => (value ? value.substr(5, 11) : "--");

/**
 * @desc 格式化日期（2019-01-01 10:00）
 * @param {String} value 日期（2019-01-01 10:00:00）
 */
const formatDate2 = (value: string): string => (value ? value.substr(0, 16) : "--");

/**
 * @desc 格式化日期（2019-01-01）
 * @param {String} value 日期（2019-01-01T08:00:00.000000Z）
 */
export const formatTime = (value: string): string => {
  if (value) {
    let date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map(formatNumber).join("-");
  }
  return "";
};

/**
 * @desc 格式化日期（2019-01-01 10:00:00）
 * @param {String} value 日期（2019-01-01T08:00:00.000000Z）
 */
export const formatTime1 = (value: string): string =>
  value ? formatTime(value) + " " + formatTime2(value) : "";

/**
 * @desc 格式化日期（10:00:00）
 * @param {*} value 日期（2019-01-01T08:00:00.000000Z）
 */
export const formatTime2 = (value: string): string => {
  if (value) {
    let date = new Date(value);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [hour, minute, second].map(formatNumber).join(":");
  }
  return "";
};

/**
 * @desc 格式化日期（10:00）
 * @param {*} value 日期（2019-01-01T08:00:00.000000Z）
 */
export const formatTime3 = (value: string): string => {
  if (value) {
    let date = new Date(value);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return [hour, minute].map(formatNumber).join(":");
  }
  return "";
};

/**
 * @desc 格式化日期（2019-01-01 10:00）
 * @param {String} value 日期（2019-01-01T08:00:00.000000Z）
 */
export const formatTime4 = (value: string): string =>
  value ? formatTime(value) + " " + formatTime3(value) : "";

/**
 * @desc 格式化日期
 * @param {String} type 日期类型
 * @param {String} value 日期值
 */
export const formatter = (type: string, value: string) => {
  if (type === "year") {
    return `${value}年`;
  } else if (type === "month") {
    return `${value}月`;
  }
  switch (type) {
    case "year":
      return `${value}年`;
    case "month":
      return `${value}月`;
    case "day":
      return `${value}日`;
    case "hour":
      return `${value}时`;
    case "minute":
      return `${value}分`;
    default:
      break;
  }
};

/**
 * @desc 校验手机号
 * @param {any} phone 手机
 */
export const verifyPhone = (phone: any): boolean =>
  /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(
    phone
  );

/**
 * @desc 校验邮箱
 * @param {String} mail 邮箱
 */
export const verifyMail = (mail: string): boolean =>
  /^\s*[\w.%+\-&'#!\$\*=\?\^_`\{\}~\/]+@([A-Z0-9-]+\.)*[A-Z0-9-]+\.[\w-]{2,}\s*$/i.test(
    mail
  );


/**
 * @desc 根据对象value值找对应的key
 * @param {*} obj
 * @param {*} value
 * @param {*} compare
 */
export const findKey = (obj: { [x: string]: any; }, value: any, compare = (a: any, b: any) => a === b) =>
  Object.keys(obj).find(k => compare(obj[k], value));

/**
 * android手机监听软键盘弹起收起
 */
export const onresize = (callback1: () => void, callback2: () => void) => {
  let originalHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  window.onresize = () => {
    //键盘弹起与隐藏都会引起窗口的高度发生变化
    let resizeHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    if (resizeHeight - 0 < originalHeight - 0) {
      //当软键盘弹起，在此处操作
      if (typeof callback1 === "function") callback1 && callback1();
    } else {
      //当软键盘收起，在此处操作
      if (typeof callback2 === "function") callback2 && callback2();
    }
  };
};

/**
 * @desc 设置钉钉导航栏右侧单个按钮 默认为更多
 * @param {Boolean} show 控制按钮显示， true 显示， false 隐藏， 默认true
 * @param {String} text 控制显示文本，空字符串表示显示默认文本
 * @param {Function} callback 回调函数
 */
export const setDdRight = (show: boolean | undefined, text: string | undefined, callback: () => void) => {
  if (dd.ios || dd.android) {
    dd.biz.navigation.setRight({
      show: show,
      control: true, // 是否控制点击事件, 默认false
      text: text,
      onSuccess: () => {
        callback && callback();
      }
    });
  }
};

/**
 * @desc 钉钉内部导航栏右侧按钮
 * @param {*} url icon名
 * @param {*} callback 回调函数
 */
export const ddNavigation = (url: any, callback: () => void) => {
  if (dd.ios || dd.android) {
    dd.biz.navigation.setMenu({
      items: [
        {
          id: "1",
          text: "操作",
          url: require(`@/assets/images/${url}.png`)
        }
      ],
      onSuccess: () => {
        if (typeof callback == "function") {
          callback && callback();
        }
      }
    });
  }
};

/**
 * @desc 控制钉钉左侧导航按钮(IOS)
 * @param {*} $callback 点击callback函数
 */
export const ctrLeftIos = (callback: () => void) => {
  if (dd.env.platform !== "notInDingTalk") {
    dd.biz.navigation.setLeft({
      control: true, //是否控制点击事件，默认false
      text: "", //控制显示文本，空字符串表示显示默认文本
      onSuccess: () => {
        // alert('开始操作')
        if (typeof callback === "function") callback && callback();
      }
    });
  }
};

/**
 * @desc 设置钉钉导航栏标题
 * @param {String} title 标题
 */
export const setDdTitle = (title: string) => {
  if (dd.env.platform !== "notInDingTalk") {
    dd.biz.navigation.setTitle({
      title: title
    });
  }
};

/**
 * @desc 设置Toast
 * @param {String} message 提示消息
 * @param {String} duration 提示时长
 */
export const _toast = (message: string | number | undefined, icon: string | undefined, duration: any) => {
  Toast({ message: message, icon: icon, duration: duration || 1500 });
};

/**
 * @desc 根据屏幕尺寸判断苹果手机
 */
export const iosModel = () => {
  if (/iphone/gi.test(navigator.userAgent)) {
    if (screen.height == 896 && screen.width == 414) {
      return "iphoneXSMAX";
    } else if (screen.height == 812 && screen.width == 375) {
      return "iphoneX";
    } else if (screen.height == 736 && screen.width == 414) {
      return "iphone7P";
    } else if (screen.height == 667 && screen.width == 375) {
      return "iphone7";
    } else if (screen.height == 568 && screen.width == 320) {
      return "iphone5";
    } else {
      return "iphone4";
    }
  }
};

/**
 * @desc 判断手机系统类型
 */
export const device = () => {
  let u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    //安卓手机
    return "Android";
  } else if (u.indexOf("iPhone") > -1) {
    //苹果手机
    return "iPhone";
  } else if (u.indexOf("Windows Phone") > -1) {
    //winphone手机
    return "WindowsPhone";
  }
};

class Filter {
  install(Vue: any) {
    Vue.filter("formatTime", formatTime);
    Vue.filter("formatTime1", formatTime1);
    Vue.filter("formatTime2", formatTime2);
    Vue.filter("formatTime3", formatTime3);
    Vue.filter("formatTime4", formatTime4);
    Vue.filter("formatDate", formatDate);
    Vue.filter("formatDate1", formatDate1);
    Vue.filter("formatDate2", formatDate2);
  }
}

export default new Filter();
