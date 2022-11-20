const dataArrs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const pagingBox = document.querySelector('#paging');
const showData = document.querySelector('#viewData tbody');
let datalimit = 2// 한 페이지당 나타낼 데이터의 갯수
const pageCount = 5; //화면에 나타낼 페이징  갯수
let pageNum;
let next;
let prev;

function selectValuerelay(target) {
  const targetValue = Number(target.options[target.selectedIndex].value);
  datalimit = targetValue;
  showPaging();
}


function clickEvethandling(e) {
  let pageNumselect = document.querySelector('button.active');
  pageNumselect.classList.remove('active');
  e.target.classList.add('active');
  
  if (e.target.innerText === '>') {
    pageNum = next;
  } else if (e.target.innerText === '<') {
    pageNum = prev;
  } else {
    pageNum = e.target.innerText;
  }

  showPaging(pageNum);
  render(e.target.innerText);
}

function render(target) {
  if(target === undefined)target = 1;
  const currentPage = target;
  console.log(currentPage)

  const maxNumber = currentPage * datalimit;
  const minNumber = maxNumber - datalimit;

  const resultData = dataArrs.slice(minNumber, maxNumber);
  showData.innerHTML = resultData.map((el) => `<tr><td>${el}</td></tr>`).join("");
}

function showPaging(pageNum) {
  if(pageNum === undefined){
    pageNum = 1;
  }
  console.log(pageNum)
  const totalPage = Math.ceil(dataArrs.length / datalimit); //총 페이지 수
  const pagegroup = Math.ceil(pageNum / pageCount); //화면에 보여질 페이지 그룹

  let lastNum = pagegroup * pageCount;
  if (lastNum > totalPage) lastNum = totalPage;
  const firstNum = lastNum - (pageCount - 1) <= 0 ? 1 : lastNum - (pageCount - 1);

  next = lastNum + 1;
  prev = firstNum - 1;

  let documentFragment = '';
  for (let i = firstNum; i <= lastNum; i++) {
    documentFragment += `<button type="button">${Number(i)}</button>`
  }

  pagingBox.innerHTML = `
    <button id="first-page" type="button"><<</button>
    <button id="prev-page" type="button"><</button>
    ${documentFragment}
    <button id="next-page" type="button">></button>
    <button id="last-page" type="button">>></button>
  `
  const pageList = document.querySelectorAll('button');
  pageList[2].classList.add('active')
  // render();
}

showPaging();
render();

pagingBox.addEventListener('click', clickEvethandling)