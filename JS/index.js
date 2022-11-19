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
  const pageNum = document.querySelector('button.active');
  pageNum.classList.remove('active');
  e.target.classList.add('active');
  // render();
}

// function render() {
//   const pageNumselect = document.querySelector('button.active');
//   console.log(pageNumselect)
//   const currentPage = pageNumselect.innerText;

//   const maxNumber = currentPage * datalimit;
//   const minNumber = maxNumber - datalimit;

//   const resultData = dataArrs.slice(minNumber, maxNumber);
//   showData.innerHTML = resultData.map((el) => `<tr><td>${el}</td></tr>`).join("");
// }

function showPaging() {
  const pageNumselect = document.querySelector('button.active');
  pageNum = pageNumselect === null ? 1 : pageNumselect.innerText;

  const totalPage = Math.ceil(dataArrs.length / datalimit); //총 페이지 수
  const pagegroup = Math.ceil(pageNum / pageCount); //화면에 보여질 페이지 그룹

  let lastNum = pagegroup * pageCount;
  if (lastNum > totalPage) lastNum = totalPage;
  const firstNum = lastNum - (pageCount - 1) <= 0 ? 1 : lastNum - (pageCount - 1);

  next = lastNum + 1;
  prev = firstNum - 1;

  let documentFragment = '';
  for (let i = firstNum; i <= lastNum; i++) {
    documentFragment += `<button type="button">${i}</button>`
  }

  pagingBox.innerHTML = `
<a href="#" id="first-page" type="button"><<</a>
<a href="#" onclick="changePagingnum(this);" id="prev-page" type="button"><</a>
${documentFragment}
<a href="#" onclick="changePagingnum(this);" id="next-page" type="button">></a>
<a href="#" id="last-page" type="button">>></a>
`
  const pageList = document.querySelector('button');
  pageList.classList.add('active');
  // render();
}

function changePagingnum(target) {
  
  if (target.innerText === '>') {
    pageNum = next
  }
  const totalPage = Math.ceil(dataArrs.length / datalimit); //총 페이지 수
  const pagegroup = Math.ceil(pageNum / pageCount); //화면에 보여질 페이지 그룹

  let lastNum = pagegroup * pageCount;
  if (lastNum > totalPage) lastNum = totalPage;
  const firstNum = lastNum - (pageCount - 1) <= 0 ? 1 : lastNum - (pageCount - 1);

  next = lastNum + 1;
  prev = firstNum - 1;

  let documentFragment = '';
  for (let i = firstNum; i <= lastNum; i++) {
    documentFragment += `<button type="button">${i}</button>`
  }

  pagingBox.innerHTML = `
<a href="#" id="first-page" type="button"><<</a>
<a href="#" onclick="changePagingnum(this);" id="prev-page" type="button"><</a>
${documentFragment}
<a href="#" onclick="changePagingnum(this);" id="next-page" type="button">></a>
<a href="#" id="last-page" type="button">>></a>
`
  const pageList = document.querySelector('button');
  pageList.classList.add('active');

  // console.log()
}

showPaging();
pagingBox.addEventListener('click', clickEvethandling)