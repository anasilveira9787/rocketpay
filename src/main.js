import "./css/index.css"
import IMask from "imask"

// aqui estou criando variáveis que contém o endereço de cada tag que preciso acessar
const ccBgColor01 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path "
)
const ccBgColor02 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) path "
)
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img ")

const ccBg = document.querySelector(".cc")

console.log(ccBgColor01)
//aqui crio uma função que troca a cor do cartão a partir de uma informação passada para ela
function setCardType(type) {
  const colors = {
    visa: ["#2D57F2", "#436D99", "purple"],
    mastercard: ["#C69347", "#DF6F29", "green"],
    amex: ["#8439FF", "#8A12C2"],
    default: ["black", "gray"],
  }

  ccBgColor01.setAttribute("fill", colors[type][0])
  ccBgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
  ccBg.style.backgroundColor = colors[type][2]
  ccBg.style.borderRadius = "20px"
}
// se eu quisesse executar essa função uma vez só ->  setCardType("mastercard") no próprio arquivo js

// aqui eu faço a função setCardType ser acessível pelo console ou por imput externo de dados atribuindo ela a uma função externa
globalThis.changeCardType = setCardType



// Vamos criar uma máscara para os valores do cartão

//Security Code
const securityCode = document.querySelector("#security-code")
  // Aqui poderia ser getElementByID tbm
const securityCodePattern = {
  mask: "0000"
}

const securityCodeMasked = IMask(securityCode, securityCodePattern)

// Expiration date

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
  },
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)


//Aqui vamos aplicar máscaras regex que definir qual é a bandeira do cartão
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0-2})\d{0-12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    }
  ],
  dispatch: function(appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function(item) {
      return number.match(item.regex)
    })

    return foundMask;

  },
}
const cardNumberMasked = IMask(cardNumber, cardNumberPattern)
