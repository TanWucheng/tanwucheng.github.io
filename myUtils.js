/**
 * 根据UA获取浏览器平台信息
 * @constructor
 */
const BrowserType = () => {
  const ua = navigator.userAgent.toLowerCase();
  const testUa = (regexp) => regexp.test(ua);
  const testVs = (regexp) =>
    ua
      .match(regexp)
      .toString()
      .replace(/[^0-9|_.]/g, "")
      .replace(/_/g, ".");

  /**系统*/
  let system = "unknown";
  if (testUa(/windows|win32|win64|wow32|wow64/g)) {
    system = "windows"; // windows系统
  } else if (testUa(/macintosh|macintel/g)) {
    system = "macos"; // macos系统
  } else if (testUa(/x11/g)) {
    system = "linux"; // linux系统
  } else if (testUa(/android|adr/g)) {
    system = "android"; // android系统
  } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
    system = "ios"; // ios系统
  }

  /**系统版本*/
  let systemVersion = "unknown";
  if (system === "windows") {
    if (testUa(/windows nt 5.0|windows 2000/g)) {
      systemVersion = "2000";
    } else if (testUa(/windows nt 5.1|windows xp/g)) {
      systemVersion = "xp";
    } else if (testUa(/windows nt 5.2|windows 2003/g)) {
      systemVersion = "2003";
    } else if (testUa(/windows nt 6.0|windows vista/g)) {
      systemVersion = "vista";
    } else if (testUa(/windows nt 6.1|windows 7/g)) {
      systemVersion = "7";
    } else if (testUa(/windows nt 6.2|windows 8/g)) {
      systemVersion = "8";
    } else if (testUa(/windows nt 6.3|windows 8.1/g)) {
      systemVersion = "8.1";
    } else if (testUa(/windows nt 10.0|windows 10/g)) {
      systemVersion = "10";
    }
  } else if (system === "macos") {
    systemVersion = testVs(/os x [\d._]+/g);
  } else if (system === "android") {
    systemVersion = testVs(/android [\d._]+/g);
  } else if (system === "ios") {
    systemVersion = testVs(/os [\d._]+/g);
  }

  /**平台*/
  let platform = "unknown";
  if (system === "windows" || system === "macos" || system === "linux") {
    platform = "desktop"; // 桌面端
  } else if (system === "android" || system === "ios" || testUa(/mobile/g)) {
    platform = "mobile"; // 移动端
  }

  /**内核*/
  let engine = "unknown";
  /**载体*/
  let supporter = "unknown";
  if (testUa(/applewebkit/g)) {
    engine = "webkit"; // webkit内核
    if (testUa(/edge/g)) {
      supporter = "edge"; // edge浏览器
    } else if (testUa(/opr/g)) {
      supporter = "opera"; // opera浏览器
    } else if (testUa(/chrome/g)) {
      supporter = "chrome"; // chrome浏览器
    } else if (testUa(/safari/g)) {
      supporter = "safari"; // safari浏览器
    }
  } else if (testUa(/gecko/g) && testUa(/firefox/g)) {
    engine = "gecko"; // gecko内核
    supporter = "firefox"; // firefox浏览器
  } else if (testUa(/presto/g)) {
    engine = "presto"; // presto内核
    supporter = "opera"; // opera浏览器
  } else if (testUa(/trident|compatible|msie/g)) {
    engine = "trident"; // trident内核
    supporter = "iexplore"; // ie浏览器
  }

  /**内核版本*/
  let engineVersion = "unknown";
  if (engine === "webkit") {
    engineVersion = testVs(/applewebkit\/[\d._]+/g);
  } else if (engine === "gecko") {
    engineVersion = testVs(/gecko\/[\d._]+/g);
  } else if (engine === "presto") {
    engineVersion = testVs(/presto\/[\d._]+/g);
  } else if (engine === "trident") {
    engineVersion = testVs(/trident\/[\d._]+/g);
  }

  /**载体版本*/
  let supporterVersion = "unknown";
  if (supporter === "chrome") {
    supporterVersion = testVs(/chrome\/[\d._]+/g);
  } else if (supporter === "safari") {
    supporterVersion = testVs(/version\/[\d._]+/g);
  } else if (supporter === "firefox") {
    supporterVersion = testVs(/firefox\/[\d._]+/g);
  } else if (supporter === "opera") {
    supporterVersion = testVs(/opr\/[\d._]+/g);
  } else if (supporter === "iexplore") {
    supporterVersion = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
  } else if (supporter === "edge") {
    supporterVersion = testVs(/edge\/[\d._]+/g);
  }

  /**外壳*/
  let shell = "none";
  /**外壳版本*/
  let shellVersion = "unknown";
  if (testUa(/micromessenger/g)) {
    shell = "wechat"; // 微信浏览器
    shellVersion = testVs(/micromessenger\/[\d._]+/g);
  } else if (testUa(/qqbrowser/g)) {
    shell = "qq"; // QQ浏览器
    shellVersion = testVs(/qqbrowser\/[\d._]+/g);
  } else if (testUa(/ucbrowser/g)) {
    shell = "uc"; // UC浏览器
    shellVersion = testVs(/ucbrowser\/[\d._]+/g);
  } else if (testUa(/qihu 360se/g)) {
    shell = "360"; // 360浏览器(无版本)
  } else if (testUa(/2345explorer/g)) {
    shell = "2345"; // 2345浏览器
    shellVersion = testVs(/2345explorer\/[\d._]+/g);
  } else if (testUa(/metasr/g)) {
    shell = "sougou"; // 搜狗浏览器(无版本)
  } else if (testUa(/lbbrowser/g)) {
    shell = "liebao"; // 猎豹浏览器(无版本)
  } else if (testUa(/maxthon/g)) {
    shell = "maxthon"; // 遨游浏览器
    shellVersion = testVs(/maxthon\/[\d._]+/g);
  }

  return Object.assign(
    {
      engine, // webkit gecko presto trident
      engineVersion,
      platform, // desktop mobile
      supporter, // chrome safari firefox opera iexplore edge
      supporterVersion,
      system, // windows macos linux android ios
      systemVersion,
    },
    shell === "none"
      ? {}
      : {
          shell, // wechat qq uc 360 2345 sougou liebao maxthon
          shellVs: shellVersion,
        }
  );
};

/**
 * 获取当前日期的中国农历二十四节气
 */
const getNowSolarTerm = () => {
  let dateNow = new Date();
  const solarTermStr = new Array(
    "小寒",
    "大寒",
    "立春",
    "雨水",
    "惊蛰",
    "春分",
    "清明",
    "谷雨",
    "立夏",
    "小满",
    "芒种",
    "夏至",
    "小暑",
    "大暑",
    "立秋",
    "处暑",
    "白露",
    "秋分",
    "寒露",
    "霜降",
    "立冬",
    "小雪",
    "大雪",
    "冬至"
  );
  const DifferenceInMonth = new Array(
    1272060,
    1275495,
    1281180,
    1289445,
    1299225,
    1310355,
    1321560,
    1333035,
    1342770,
    1350855,
    1356420,
    1359045,
    1358580,
    1355055,
    1348695,
    1340040,
    1329630,
    1318455,
    1306935,
    1297380,
    1286865,
    1277730,
    1274550,
    1271556
  );
  const differenceInYear = 31556926;
  const beginTime = new Date(1901 / 1 / 1);
  beginTime.setTime(947120460000);
  for (; dateNow.getFullYear() < beginTime.getFullYear(); ) {
    beginTime.setTime(beginTime.getTime() - differenceInYear * 1000);
  }
  for (; dateNow.getFullYear() > beginTime.getFullYear(); ) {
    beginTime.setTime(beginTime.getTime() + differenceInYear * 1000);
  }
  let M = -1;
  for (M = 0; dateNow.getMonth() > beginTime.getMonth(); M++) {
    beginTime.setTime(beginTime.getTime() + DifferenceInMonth[M] * 1000);
  }
  if (dateNow.getDate() > beginTime.getDate()) {
    beginTime.setTime(beginTime.getTime() + DifferenceInMonth[M] * 1000);
    M++;
  }
  if (dateNow.getDate() > beginTime.getDate()) {
    beginTime.setTime(beginTime.getTime() + DifferenceInMonth[M] * 1000);
    M == 23 ? (M = 0) : M++;
  }
  let dayStr = "";
  if (dateNow.getDate() === beginTime.getDate()) {
    dayStr = "今天";
  } else if (dateNow.getDate() === beginTime.getDate() - 1) {
    dayStr = "明天";
  } else if (dateNow.getDate() === beginTime.getDate() - 2) {
    dayStr = "后天";
  } else {
    if (dateNow.getMonth() === beginTime.getMonth()) {
      dayStr = `本月${beginTime.getDate()}日`;
    } else {
      dayStr = `下月${beginTime.getDate()}日`;
    }
  }
  return { date: dayStr, solarTerm: solarTermStr[M] };
};
