

function generateRandomString(length) {
    const randomString = 'abcdefghijklmnopqrstuvw0123456789';
    let str = '';
    for (let i = 0; i < length; i++) {
      str += randomString[Math.floor(Math.random() * length)];
    }
    return str;
  }
  
  
module.exports = {
    generateRandomString,
}
  