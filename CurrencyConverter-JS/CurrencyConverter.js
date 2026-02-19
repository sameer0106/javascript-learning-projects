// step-1 API url 
const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;

// step-2 fetching required html elements in js according to need.
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let amount = document.querySelector(".amount input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let warnning = document.querySelector(".warn");

// step-3 bydefault country name aur flag set kiya.
for (select of dropdowns) {         //dropdown container ke under select ko fetch kiya.
  for (currCode in countryList) {   //countryList ke under country code ko fetch kiya
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  // country select karne me updateFlag ko call kiya - change action use kiya
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);     //evt.target us element ko refer karta hai jispar event laga hua hai (yaha <select> dropdown).
  });
}

// step-4 flag ko update karne ka logic
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;     //html me jo img src per api lagi hai usko update karke newSrc me store kiya
};

// step-5 button ke click event per exchange rate function ko call lagaya
btn.addEventListener("click", (evt) => {
  evt.preventDefault();     //button click per hone wale page load ko prevent kiya
  ExchangeRate();
});

// step-6 currency convert karne ka pura logic.
// step-6.1 amount value khali hone ya negative hone per error message show karaya.
const ExchangeRate = async () => {
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = "";     //yaha amountVal = "1"; likhne per yani bydefault value 1 set karne per page reload hote hi msg div per 1USD = 88.27INR likh kar aayega because of "window.addEventListener()" in step-7
    warnning.innerText = "Empty or Negative amount are not valid";
  } else if (amountVal != "" || amountVal >= 1) {
    warnning.innerText = "";
  }

  // step-6.2 currency convert karne ka main logic likha hai
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;     //api ke last me fromCurrency ko as a object pass kiya
  let response = await fetch(URL);        //fir url ko fetch kiya with await
  let data = await response.json();       //api ke response ko json format me convert kiya

  //data (response json) me fromCurr 1st selected country ka code fetch kar raha hai, aur toCurr target country ke liye is 1st selected country object ke under se key:value pair me key access kar raha hai.
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];  
  let conversion = (amountVal * rate).toFixed(2);   // dono currency aa jane ke bad ab user-entered amount ko further conversion rate se multiply karne per currency ka form convert ho jayega, toFixed(2) decimal ke bad 2 digits hi lega.

  // msg div per message "1 USD = 80 INR" is format me dynamic msg print karegi.
  msg.innerText = `${amountVal} ${fromCurr.value.toUpperCase()} = ${conversion} ${toCurr.value.toUpperCase()}`;
};

// step-7 window object per load event lagane ka matlb hai page load hote hi task hona chahiye
window.addEventListener("load", () => {
  ExchangeRate();         //initially input field khali hoga to msg div per "USD = 0.00 INR" dikhega, kyuki page load hote hi ExchangeRate() function ke amountVal me empty("") value hai.
  warnning.innerText = "";
});
