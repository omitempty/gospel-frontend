function formatNumber(num) {
  let isNumber = isType("Number");
  if (!isNumber(num)) return;
  return num >= 10 ? String(num) : "0" + String(num);
}

function isType(type) {
  return (arg) => {
    return Object.prototype.toString.call(arg) === `[object ${type}]`;
  };
}

function formatDate(time, type = "YYYY-MM-DD") {
  const y = formatNumber(time.getFullYear());
  const m = formatNumber(time.getMonth() + 1);
  const d = formatNumber(time.getDate());
  const h = formatNumber(time.getHours());
  const mm = formatNumber(time.getMinutes());
  const s = formatNumber(time.getSeconds());
  if (type === "YYYY-MM-DD HH-MM-SS") {
    return `${y}-${m}-${d} ${h}:${mm}:${s}`;
  } else if (type === "YYYY-MM-DD") {
    return `${y}-${m}-${d}`;
  } else if (type === "YYYY-MM") {
    return `${y}-${m}`;
  } else if (type === "HH-MM-SS") {
    return `${h}:${mm}:${s}`;
  } else if (type === "HH") {
    return `${h}`;
  }
}

const formatTime = (date) => {
  const targetDate = new Date(date);
  const nowTime = new Date(formatDate(new Date())).getTime();
  const targetTime = new Date(formatDate(targetDate)).getTime();
  const daysAgo = (nowTime - targetTime) / 86400000;
  const yearsAgo = new Date().getFullYear() - targetDate.getFullYear();
  const year = `${targetDate.getFullYear()}年`;
  const monthAndDay = `${formatNumber(
    targetDate.getMonth() + 1
  )}月${formatNumber(targetDate.getDate())}日`;
  const hourAndMinute =
    formatNumber(targetDate.getHours()) +
    ":" +
    formatNumber(targetDate.getMinutes());
  if (daysAgo < 1) {
    return hourAndMinute;
  } else if (1 <= daysAgo && daysAgo < 2) {
    return `昨天 ${hourAndMinute}`;
  } else if (yearsAgo < 1) {
    return monthAndDay + " " + hourAndMinute;
  } else {
    return year + monthAndDay + " " + hourAndMinute;
  }
};

//test
// console.log(formatTime("2022-11-12 17:32:00"));

export { formatTime };
