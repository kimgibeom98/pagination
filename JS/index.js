const dataArrs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const pagingBox = document.querySelector('#paging');
const showData = document.querySelector('#viewData tbody');
let datalimit = 5// 한 페이지당 나타낼 데이터의 갯수
const pageCount = 5; //화면에 나타낼 페이징  갯수
let maxNumber;
let minNumber;

function selectValuerelay(target) {
  const targetValue = Number(target.options[target.selectedIndex].value);
  datalimit = targetValue;
  showPaging();
}


function clickEvethandling(e) {
  const pageNum = document.querySelector('button.active');
  pageNum.classList.remove('active');
  e.target.classList.add('active');
  render();
}

function render() {
  const pageNumselect = document.querySelector('button.active');
  const currentPage = pageNumselect.innerText;

  maxNumber = currentPage * datalimit;
  minNumber = maxNumber - datalimit;

  const resultData = dataArrs.slice(minNumber, maxNumber);
  showData.innerHTML = resultData.map((el) => `<tr><td>${el}</td></tr>`).join("");
}

function showPaging() {
  const totalPage = Math.ceil(dataArrs.length / datalimit);
  let documentFragment = '';
  for (let i = 1; i <= totalPage; i++) {
    documentFragment += `<button type="button">${i}</button>`
  }
  pagingBox.innerHTML = `
<button id="first-page" class="line-no" type="button"><<</button>
<button id="prev-page" class="line-no" type="button"><</button>
${documentFragment}
<button id="next-page" class="line-no" type="button">></button>
<button id="last-page" class="line-no" type="button">>></button>
`
  const pageNum = document.querySelectorAll('button');
  pageNum[2].classList.add('active');
  render();
}

showPaging();
pagingBox.addEventListener('click', clickEvethandling)




// currentPage: 현재 페이지
// totalCount: 총 데이터의 갯수
// pageCount: 화면에 나타날 페이지 갯수
// limit: 한 페이지 당 나타낼 데이터의 갯수


const currentPage = pageNum.innerText;
const pageGroup = Math.ceil(currentPage / pageCount)
const lastNumber = pageGroup *  pageCount;
if(lastNumber > totalPage){
  lastNumber = totalPage
}
const firstNumber = lastNumber - (pageCount - 1)

maxNumber = currentPage * datalimit;
minNumber = maxNumber - datalimit;

const next = lastNumber + 1;
const prev = firstNumber - 1;
for(let i  = firstNumber; i < lastNumber; i ++){
  html += `<button class="pageNumber" id="page_${i}">${i}</button>`
}