import "./css/index.css"
// aqui estou criando variáveis que contém o endereço de cada tag que preciso acessar
const ccBgColor01 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path "
)
const ccBgColor02 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) path "
)
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img ")

//aqui crio uma função que troca a cor do cartão a partir de uma informação passada para ela
function setCardType(type) {
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    mastercard: ["#C69347", "#DF6F29"],
    amex: ["#8439FF", "#8A12C2"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}
// se eu quisesse executar essa função uma vez só ->  setCardType("mastercard") no próprio arquivo js

// aqui eu faço a função setCardType ser acessível pelo console ou por imput externo de dados atribuindo ela a uma função externa
globalThis.changeCardType = setCardType
