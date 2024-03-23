let lang = "en";
let namecolor = "blue";
let avatar = 0;
let code = Math.floor(100000 + Math.random() * 900000);

document.getElementById('signup').onclick = function() {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let pass = document.getElementById('pass').value;
        let cpass = document.getElementById('cpass').value;
        let nick = document.getElementById('nick').value;
        let text = document.getElementById('attention');
    
        if (name.length < 3 || name.length > 16) {
            text.setAttribute('data-i18n', 'tooShortOrLongUsername');
            text.textContent = i18next.t('tooShortOrLongUsername');
        }
        else if (pass.length < 8 || pass.length > 24) {
            text.setAttribute('data-i18n', 'tooShortOrLongPassword');
            text.textContent = i18next.t('tooShortOrLongPassword');
        }
        else if (email.length == 0) {
            text.setAttribute('data-i18n', 'enterEmail');
            text.textContent = i18next.t('enterEmail');
        }
        else if (nick.length == 0) {
            text.setAttribute('data-i18n', 'enterNickname');
            text.textContent = i18next.t('enterNickname');
        }
        else if (pass !== cpass) {
            text.setAttribute('data-i18n', 'passwordsDoNotMatch');
            text.textContent = i18next.t('passwordsDoNotMatch');
        }
        else if (!/^[a-zA-Z0-9]+$/.test(nick)) {
            text.setAttribute('data-i18n', 'invalidNickname');
            text.textContent = i18next.t('invalidNickname');
        }
    
        else {
            text.textContent = "";   
            createAccount();
        }
}

let passwordChange = true;

document.getElementById('passwordimage').onclick = function() {
    let changeButton = document.getElementById('passwordimage');
    let buttonImage = document.getElementById('buttonImage');
    if (passwordChange == true) {
        pass.type = "text";
        cpass.type = "text";
        changeButton.style.background = "#e0e0e0";
        buttonImage.src = "passwordhide.png";
        passwordChange = false;
    }
    else {
        pass.type = "password";
        cpass.type = "password";
        changeButton.style.background = "#0077dd";
        buttonImage.src = "passwordshow.png";
        passwordChange = true;   
    }

}
    
    async function createAccount() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;
    let nick = document.getElementById('nick').value;
    let text = document.getElementById('attention');

    let dataObject = {};
    dataObject[nick] = {
        name: name,
        email: email,
        password: pass,
        nickname: nick,
        language: lang,
        namecolor: namecolor,
        avatar: avatar,
        code: code
    };

    const response = await fetch('https://red-rc.github.io/locales/accounts.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
        },
        body: JSON.stringify(dataObject),
    });
}

const userLanguage = navigator.language || navigator.userLanguage;
const mainLanguage = userLanguage.split('-')[0];

i18next.init({
    lng: mainLanguage,
    path: 'https://red-rc.github.io/locales/locales.json',
    fallbackLng: 'en',
    debug: true,
    resources: { }
})

async function fetchData() {
    const response = await fetch('https://red-rc.github.io/locales/locales.json');
    const data = await response.json();
    i18next.addResources(mainLanguage, 'translation', data[mainLanguage]);
    
     document.body.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = i18next.t(key);
    });
}
fetchData();
