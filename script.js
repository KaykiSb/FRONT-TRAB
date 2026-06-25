const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".hidden").forEach(el => {

observer.observe(el);

});

window.addEventListener("scroll",()=>{

const topBtn=document.querySelector(".top-btn");

if(!topBtn) return;

if(window.scrollY > 400){

topBtn.style.opacity="1";

}

else{

topBtn.style.opacity="0";

}

});