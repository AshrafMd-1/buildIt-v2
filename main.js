const langEl = document.getElementById("lang");
const levelEl = document.getElementById("level");
const questionEl = document.getElementById("question");
const readEl = document.getElementById("read");
const answerEl = document.getElementById("answer");
const submitEl = document.getElementById("submit");
const loadingEl = document.getElementById("loading-progress");

let lang=[];
let level=[];
let question=[];
let read=[];
const baseUrl=`https://2is3lu.deta.dev/api/buildit/`
const updateLang=()=>{
    const url=baseUrl+'compiler'
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.status === "success"){
            lang=data.data;
            const langOption=data.data.map((lang)=>{
                return `<option value="${lang[1]}">${lang[0]}</option>`;
            })
            langEl.innerHTML=langOption.join("\n")
            loadingEl.classList.add("no-opacity");
            langEl.classList.add("fade-in");
            langEl.classList.remove("no-opacity");

        }
    }).catch((error) => {
        console.log(error);
    });
}
const checkLogin = () => {
    const url=baseUrl+"login/?username=21951A6612&password=Ashraf0506$$$$4";
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.status === "success"){
            updateLang();
        }
    }).catch((error) => {
        console.log(error);
    })
};

langEl.addEventListener("change",()=>{
    loadingEl.classList.remove("no-opacity");
    const langValue=langEl.value;
    const url=baseUrl+"level?user_compiler="+langValue;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.status === "success"){
            level=data.data;

            let levelOption= data.data.map((level)=>{
                return `<option value="${level[1]}">${level[0]}</option>`;
            })
            levelEl.innerHTML=levelOption.join("\n")
            loadingEl.classList.add("no-opacity");
            levelEl.classList.add("fade-in");
            levelEl.classList.remove("no-opacity");
        }
    })
    .catch((error) => {
        console.log(error);
    })
})

levelEl.addEventListener("change",()=>{
    loadingEl.classList.remove("no-opacity");
    const levelValue=levelEl.value;
    const url=baseUrl+"question?user_level="+levelValue
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if (data.status === "success"){
            question=data.data;

            let questionOption= data.data.map((question)=>{
                return `<option style="background-color:${question[2].split(" ")[1]}" value="${question[1]}">${question[0]}</option>`;
            })
            questionEl.innerHTML=questionOption.join("\n")
            loadingEl.classList.add("no-opacity");
            questionEl.classList.add("fade-in");
            questionEl.classList.remove("no-opacity");
        }
        else console.log(data.status)
    })
    .catch((error) => {
        console.log(error);
    })
})

questionEl.addEventListener("change",()=>{
    loadingEl.classList.remove("no-opacity");
    const questionValue=questionEl.value;
    const url=baseUrl+"read?user_question="+questionValue
    fetch(url)
    .then((response) => response.json())
    .then((data) => {

        if (data.status === "success"){
            read=data.data;
            readEl.innerText=read.join("\n")
            loadingEl.classList.add("no-opacity");
            readEl.classList.add("fade-in");
            readEl.classList.remove("no-opacity");
        }
        else console.log(data.status)
    })
    .catch((error) => {
        console.log(error);
    })
})






checkLogin();