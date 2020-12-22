// 导航栏及返回顶部按钮
const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");
window.addEventListener("scroll", () => {
    let height = headerEl.getBoundingClientRect().height;
    if (window.pageYOffset - height > 800){
        if (!headerEl.classList.contains("sticky")){
            headerEl.classList.add("sticky");
        }
    } else {
        headerEl.classList.remove("sticky")
    }

    if (window.pageYOffset > 2000) {
        scrollToTop.style.display = 'block'
    } else {
        scrollToTop.style.display = 'none'
    }
});


const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");
//
glide.on(["mount.after","run.after"],() =>{
    const caption = captionsEl[glide.index];
    anime({
        targets:caption.children,
        opacity:[0,1],
        duration:400,
        easing:'spring(1,80,6,0)',
        delay:anime.stagger(400,{start:300}),
        translateY:[anime.stagger([40,10]),0]
    });
});

glide.on("run.before",()=>{
    document.querySelectorAll(".slide-caption > *").forEach(el =>{
        el.style.opacity=0;
    });
});
glide.mount();

const isotope = new Isotope(".cases",{
    layoutMode:"fitRows",
    itemSelector:".case-item"
});


//逐渐显示
const straggeringOption = {
    delay : 300,
    distance: "10px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
};
ScrollReveal().reveal(".feature", {...straggeringOption,interval:350});
ScrollReveal().reveal(".service-item", {...straggeringOption,interval:350});
//背景跟随鼠标滚动而慢速滚动
// const dataSectionEl = document.querySelector(".data-section");
//数字从0开始计算
ScrollReveal().reveal(".data-section",{
    beforeReveal: () =>{
        anime({
            targets: ".data-piece .num",
            innerHTML: el => {
                return [0,el.innerHTML];
            },
            duration:2000,
            round: 1,
            easing: "easeInExpo"
        })
        //不知道为啥会特别卡
        // dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`;
    }
});
//特别卡，可能我电脑垃圾叭
// window.addEventListener("scroll",() =>{
//     const bottom = dataSectionEl.getBoundingClientRect().bottom;
//     const top = dataSectionEl.getBoundingClientRect().top;

//     if(bottom >= 0 && top <= window.innerHeight){
//         dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`;
//     }
// })
//更流畅的滚动
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]',{
    header: "header",
})

const exploreBtnEls = document.querySelectorAll(".explore-bth");
exploreBtnEls.forEach(exploreBtnEl =>{
    exploreBtnEl.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"));
    });
})

//折叠按钮
const burgerEl = document.querySelector(".burge");
burgerEl.addEventListener("click", () =>{
    headerEl.classList.toggle('open')
})


