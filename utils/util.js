const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const hideTel= tel =>{
  if (tel ==''){
    return "";
  }
  const hidedTel = tel.substring(0, 3) + "****" + tel.substring(7);
  return hidedTel
}

const hideIdCard = idcard => {
  if (idcard == '') {
    return "";
  }
  let hidedIdcard=  "****" ;
  if (idcard.length == 18){
    hidedIdcard = idcard.substring(0, 6) + "********" + idcard.substring(14);
  }
  else{
    hidedIdcard = idcard.substring(0, 6) + "********" + idcard.substring(14);
  }
  return hidedIdcard;
}

module.exports = {
  formatTime: formatTime,
  hideTel: hideTel,
  hideIdCard: hideIdCard,
}
