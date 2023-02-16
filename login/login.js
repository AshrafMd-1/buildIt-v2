const imgEl = document.getElementById('login_img');
const userEl = document.getElementById('username');
const passEl = document.getElementById('password');
const logEl = document.getElementById('log');
const errEl = document.getElementById('status');

window.onload = function () {
    const x = Math.ceil(Math.random() * 5);
    imgEl.src = './assets/' + x + '.jpg';
};


logEl.addEventListener('click', function (e) {
    e.preventDefault();
    const user = userEl.value;
    const pass = passEl.value;
    if (user === '' || pass === '') {
        errEl.innerHTML = 'Please fill all the fields';
        return;
    }
    const options = {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"username": user, "password": pass}),


    }
    fetch('https://scrapbit-1-b5725673.deta.app/login', options)
        .then(res => res.json()).then(data => {
        if (data.status === 'success') {
            window.location.href = '../home/index.html';
        } else {
            errEl.innerHTML = data.message;
        }
    }).catch(err => {
        errEl.innerHTML = err.message;
    })
});


