const langEl = document.getElementById("lang");
const levelEl = document.getElementById("level");
const questionEl = document.getElementById("question");
const readEl = document.getElementById("read");
const answerEl = document.getElementById("answer");
const submitEl = document.getElementById("submit");
const loadingEl = document.getElementById("Loading-progress");




const baseUrl = `https://2is3lu.deta.dev/api/buildit/`
const updateLang = () => {
    const url = baseUrl + 'compiler'
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {

                const langOption = data.data.map((lang) => {
                    return `<option value="${lang[1]}">${lang[0]}</option>`;
                })
                langOption.splice(0, 0, `<option value="" disabled selected>Select Language</option>`)
                langEl.innerHTML = langOption.join("\n")
                loadingEl.classList.add("no-opacity");
                langEl.classList.add("fade-in");
                langEl.classList.remove("no-opacity");

            }
        }).catch((error) => {
        console.log(error);
    });
}
const checkLogin = () => {
    const url = baseUrl + "login?username=21951a6636&password=omsairam@7"
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                updateLang();
            }
        }).catch((error) => {
        console.log(error);
    })
};

langEl.addEventListener("change", () => {
    levelEl.innerHTML="<option value='' disabled selected>Select Level</option>"
    questionEl.innerHTML="<option value='' disabled selected>Select Question</option>"
    readEl.innerHTML=`<p style="color:#ff3972">Select The Question</p>`
    answerEl.innerText="No Question Selected"
    answerEl.style.color="#ff3972"
    loadingEl.classList.remove("no-opacity");
    const langValue = langEl.value;
    const url = baseUrl + "level?user_compiler=" + langValue;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {

                let levelOption = data.data.map((level) => {
                    return `<option value="${level[1]}">${level[0]}</option>`;
                })
                levelOption.splice(0, 0, `<option value="" disabled selected>Select Level</option>`)
                levelEl.innerHTML = levelOption.join("\n")
                loadingEl.classList.add("no-opacity");
                levelEl.classList.add("fade-in");
                levelEl.classList.remove("no-opacity");

            }
        })
        .catch((error) => {
            console.log(error);
        })
})

levelEl.addEventListener("change", () => {
    questionEl.innerHTML="<option value='' disabled selected>Select Question</option>"
    readEl.innerHTML=`<p style="color:#ff3972">Select The Question</p>`
   answerEl.innerText="No Question Selected"
    answerEl.style.color="#ff3972"
    loadingEl.classList.remove("no-opacity");
    const levelValue = levelEl.value;
    const url = baseUrl + "question?user_level=" + levelValue
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {

                let questionOption = data.data.map((question) => {
                    return `<option style="background-color:${question[2].split(" ")[1]}" value="${question[1]}">${question[0]}</option>`;
                })
                questionOption.splice(0, 0, `<option value="" disabled selected>Select Question</option>`)
                questionEl.innerHTML = questionOption.join("\n")
                loadingEl.classList.add("no-opacity");
                questionEl.classList.add("fade-in");
                questionEl.classList.remove("no-opacity");
            } else console.log(data.status)
        })
        .catch((error) => {
            console.log(error);
        })
})

const updateAnswer = () => {
    const questionValue = questionEl.value;
    const comp=langEl[langEl.selectedIndex].textContent
    const url = baseUrl + "answer?user_question=" + questionValue+"&user_compiler="+comp
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "success") {
                answerEl.style.color="#ffffff"
                answerEl.innerHTML = `<div class="answer-box"><span class="answer-value">${data.data}</span></div>`
                answerEl.classList.add("fade-in");
                answerEl.classList.remove("no-opacity");
                loadingEl.classList.add("no-opacity");

            } else console.log(data.status)
        })
        .catch((error) => {
            console.log(error);
        })
}

questionEl.addEventListener("change", () => {
    readEl.innerHTML=`<p style="color:#ff3972">Select The Question</p>`
    answerEl.innerText="No Question Selected"
    answerEl.style.color="#ff3972"
    loadingEl.classList.remove("no-opacity");
    const questionValue = questionEl.value;
    const url = baseUrl + "read?user_question=" + questionValue
    fetch(url)
        .then((response) => response.json())
        .then((data) => {

            if (data.status === "success") {
                const readOption = data.data.map((read) => {
                    return `<p class="read-value">${read}<p/>`;
                })
                readEl.innerHTML =`<div class="read-box">${readOption.join("")}</div>`
                readEl.classList.add("fade-in");
                readEl.classList.remove("no-opacity");
                updateAnswer()

            } else console.log(data.status)
        })
        .catch((error) => {
            console.log(error);
        })
})

checkLogin()


