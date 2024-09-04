const dropList = document.querySelectorAll(".drop-list select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("button");
for (let i = 0; i <= dropList.length; i++) {
  for (currency_code in country_code) {
    let selected;
    if (i === 0) {
      selected = currency_code == "USD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "EGP" ? "selected" : "";
    }
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    if (dropList[i]) dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  if (dropList[i]) {
    dropList[i].addEventListener("change", (e) => {
      loadFlag(e.target);
    });
  }
}

function loadFlag(e) {
  for (code in country_code) {
    if (code == e.value) {
      let imgTag = e.parentElement.querySelector("img");
      imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
    }
  }
}

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});

const exchangeIcon = document.querySelector(".icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});
function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  let url = `https://v6.exchangerate-api.com/v6/0ac955729f30f6915d3043a6/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(3);
      let rateText = document.querySelector(".exchange-rate");
      rateText.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      rateText.innerText = "Something went wrong";
    });
}
