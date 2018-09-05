var phoneReg = /^1[3-578]\d{9}$/;
function isPhoneAvailable(phonevalue) {
  if (phoneReg.test(phonevalue)) {
    return true;
  } else {
    return false;
  }
}
// ^ 1 以数字1 开头
// [3 - 578] 手机号第二位允许是 3 、4 、5、7、8 中的任意一位
// \d{ 9 } 任意9位数字组合
// $ 只能以数字作为结尾
module.exports = {
  isPhoneAvailable: isPhoneAvailable
}