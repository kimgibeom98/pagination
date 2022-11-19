const dataArrs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const pagingBox = document.querySelector('#paging');
const showData = document.querySelector('#viewData tbody');
let datalimit = 2// 한 페이지당 나타낼 데이터의 갯수
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
  const pageNumselect = document.querySelector('button.active');
  const pageNum = pageNumselect === null ? 1 : pageNumselect.innerText;

  const totalPage = Math.ceil(dataArrs.length / datalimit); //총 페이지 수
  const pagegroup = Math.ceil(pageNum / pageCount); //화면에 보여질 페이지 그룹

  let last = pagegroup * pageCount;
  if (last > totalPage) last = totalPage;
  const first = last - (pageCount - 1) <= 0 ? 1 : last - (pageCount - 1);

  const next = last + 1;
  const prev = first - 1;

  let documentFragment = '';
     for (let i = first; i <= last; i++) {
       documentFragment += `<button type="button">${i}</button>`
     }

  pagingBox.innerHTML = `
<button id="first-page" class="line-no" type="button"><<</button>
<button id="prev-page" class="line-no" type="button"><</button>
${documentFragment}
<button id="next-page" class="line-no" type="button">></button>
<button id="last-page" class="line-no" type="button">>></button>
`
  const pageList = document.querySelectorAll('button');
  pageList[2].classList.add('active');
  render();
}

function nextPaging(){

}

showPaging();
pagingBox.addEventListener('click', clickEvethandling)