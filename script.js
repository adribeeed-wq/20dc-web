function cambiarTab(tab){

let tabs = document.querySelectorAll(".tab");

tabs.forEach(t=>{

t.classList.remove("active");

});

document.getElementById(tab).classList.add("active");

}

const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup",function(){

let texto = buscador.value.toLowerCase();

let bebidas = document.querySelectorAll("li");

bebidas.forEach(b=>{

if(b.textContent.toLowerCase().includes(texto)){

b.style.display="block";

}else{

b.style.display="none";

}

});

});

const eventos = document.querySelectorAll(".evento");

eventos.forEach(img=>{

img.addEventListener("click",()=>{

let modal = document.createElement("div");

modal.style.position="fixed";
modal.style.top="0";
modal.style.left="0";
modal.style.width="100%";
modal.style.height="100%";
modal.style.background="rgba(0,0,0,0.9)";
modal.style.display="flex";
modal.style.alignItems="center";
modal.style.justifyContent="center";

let grande = document.createElement("img");

grande.src = img.src;
grande.style.maxWidth="90%";
grande.style.maxHeight="90%";

modal.appendChild(grande);

modal.addEventListener("click",()=>{

modal.remove();

});

document.body.appendChild(modal);

});

});