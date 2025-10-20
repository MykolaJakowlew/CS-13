let sliderIndex = 0;

const slides = document.querySelectorAll('.slider > .slide')




slides[0].classList.add('active')

const changeSlide = (index) => {
    document.querySelector('.slider > .slide.active')
        .classList.remove('active')
    slides[index].classList.add('active')

    document.querySelector('.dots > .dot.active')
        .classList.remove('active')
    dotElems[index].classList.add('active')
}
// function createInterval (time) {
//     return setInterval(() => {
//         nextBtnFunc();
//     }, time)
// }
const createInterval = (time) => {
    return setInterval(() => {
        nextBtnFunc();
    }, time)
}
let nextIntervalFunc = createInterval(5 * 1000 /* 5s */)

const dots = document.querySelector('.dots')
for (let i = 0; i < slides.length; i += 1) {
    const dot = document.createElement('div')
    dot.classList.add('dot')
    dots.appendChild(dot)
    dot.textContent = i + 1

    dot.addEventListener('click', () => {
        sliderIndex = i;
        changeSlide(sliderIndex)
        clearInterval(nextIntervalFunc)
        nextIntervalFunc = createInterval(5 * 1000 /* 5s */)
    })
}

const dotElems = document.querySelectorAll('.dot')
dotElems[0].classList.add('active')


const nextBtn = document.querySelector('.next')
const nextBtnFunc = () => {
    // sliderIndex = sliderIndex + 1;
    sliderIndex += 1;
    if (sliderIndex === slides.length) {
        sliderIndex = 0;
    }
    changeSlide(sliderIndex)
}
// nextBtn.addEventListener('click', () => nextBtnFunc())
// nextBtn.addEventListener('click', () => { nextBtnFunc() })
nextBtn.addEventListener('click', nextBtnFunc)

const prevbtn = document.querySelector('.prev')
prevbtn.addEventListener('click', () => {
    // sliderIndex = sliderIndex - 1;
    sliderIndex -= 1;
    if (sliderIndex === -1) {
        sliderIndex = slides.length - 1;
    }
    changeSlide(sliderIndex)
})