const slider = document.querySelector('.slider')
const sliderList = document.querySelector('.slider-list')
const slideItems = document.querySelectorAll('.slide')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let activeSlide = 0
let timeMove = 1000
let slideMove = 100
let dir = 'X'

slideItems.forEach(function(slide,key){
    if(key != activeSlide){
        slide.style.transform = `translate${dir}(${slideMove}%)`
    }
    if(key == slideItems.length - 1){
        slide.style.transform = `translate${dir}(${-slideMove}%)`
    }
})
btnPrev.addEventListener('click', function(){move(btnPrev)})
btnNext.addEventListener('click', function(){move(btnNext)})

function move(btn){
    btnNext.disabled = true
    btnPrev.disabled = true
    setTimeout(function(){
        btnNext.disabled = false
        btnPrev.disabled = false
    }, timeMove + 300)
    let btnPrevOrNext = btnNext == btn ? -slideMove : slideMove
    slideItems.forEach(function(slide,key){
        if(key != activeSlide){
            slideItems[activeSlide].style.transform = `translate${dir}(${-btnPrevOrNext}%)`
            slideItems[activeSlide].style.transition = '0'
        }
    })

    slideItems[activeSlide].style.transform = `translate${dir}(${btnPrevOrNext}%)`
    slideItems[activeSlide].style.transition = `${timeMove}ms`

    if(btnNext == btn){
        activeSlide++
        if(activeSlide > slideItems.length - 1){
            activeSlide = 0
        }
    }
    else if(btnPrev == btn){
        activeSlide--
        if(activeSlide < 0){
            activeSlide = slideItems.length - 1
        }
    }
    slideItems[activeSlide].style.transform = `translate${dir}(0%)`
    slideItems[activeSlide].style.transition = `${timeMove}ms`
}

// create dots

const ul = document.createElement('ul')
ul.classList.add('slider-dots')
slideItems.forEach(function(){
    const li = document.createElement('li')
    ul.append(li)
})
slider.append(ul)
const sliderDots = document.querySelectorAll('.slider-dots li')
sliderDots[activeSlide].classList.add('active')
sliderDots.forEach(function(dot, dotKey){
    dot.addEventListener('click', function(){controllersDots(dotKey)})
})
function controllersDots(dotKey){
    if(dotKey != activeSlide){
        console.log(dotKey)
        let moveLeftOrRigth =  activeSlide < dotKey ? -slideMove : slideMove
        slideItems.forEach(function(slide, key){
            if(key != activeSlide){
                slideItems[activeSlide].style.transform = `translate${dir}(${-moveLeftOrRigth}%)`
                slideItems[activeSlide].style.transition = `0ms`
            }
        })
        sliderDots.forEach(function(dot){
            dot.classList.remove('active')
        })
        setTimeout(function(){
            sliderDots[activeSlide].classList.remove('active')
            slideItems[activeSlide].style.transform = `translate${dir}(${moveLeftOrRigth}%)`
            slideItems[activeSlide].style.transition = `${timeMove}ms`
            activeSlide = dotKey
            sliderDots[activeSlide].classList.add('active')
            slideItems[activeSlide].style.transform = `translate${dir}(0%)`
            slideItems[activeSlide].style.transition = `${timeMove}ms`
        },100)
 
    }
}