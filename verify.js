const fs = require('fs');

const verifyRequest = (body, origin) => {
  if (origin === 'https://red-rc.github.io/locales/signup.html') {
    const { name, email, password, nickname, language, namecolor, avatar, code } = body;
    if (name && email && password && nickname && language && namecolor && avatar && code) {
      return { success: true, data: { name, email, password, nickname, language, namecolor, avatar, code } };
    } else {
      return { success: false, error: 'Missing required fields' };
    }
  } else {
    return { success: false, error: 'Access Forbidden' };
  }
};

const saveToDb = (data) => {
    const existingData = fs.readFileSync('db.json', 'utf-8');
    const newData = JSON.parse(existingData || '[]');
    newData.push(data);
    fs.writeFileSync('db.json', JSON.stringify(newData, null, 2), 'utf-8');
    return true; 
};

module.exports = {
  verifyRequest,
  saveToDb,
};
