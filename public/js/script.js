//Script

const currentNum = parseInt(window.location.pathname.replace('/',''))
const prevButton = document.getElementById("Previous")
const nextButton = document.getElementById("Next")
const randButton = document.getElementById("Random")
console.log('Script', currentNum)

prevButton.onclick = ()=>{
    window.location.href = '/' + (currentNum - 1)
};

nextButton.onclick = ()=>{
    window.location.href = '/' + (currentNum + 1)
};

randButton.onclick = ()=>{
    window.location.href = '/' + (Math.floor(Math.random()*2000))
};





