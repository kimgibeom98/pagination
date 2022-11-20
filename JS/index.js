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
  const pageNumselect = document.querySelector('button.active');
  pageNumselect.classList.remove('active');
  e.target.classList.add('active');
  console.log(e.target)
  if (e.target.innerText === '>') {
    pageNum = next;
    showPaging(pageNum);
  } else if (e.target.innerText === '<') {
    pageNum = prev;
    showPaging(pageNum);
  } else if (e.target.innerText === '>>') {
    pageNum = Math.ceil(dataArrs.length / datalimit);
    showPaging(pageNum);
  } else if (e.target.innerText === '<<') {
    pageNum = 1;
    showPaging(pageNum);
  } else {
    pageNum = e.target.innerText;
  }

  render(pageNum);
}

function render(target) {
  if (target === undefined) target = 1;
  const currentPage = target;

  const maxNumber = currentPage * datalimit;
  const minNumber = maxNumber - datalimit;

  const resultData = dataArrs.slice(minNumber, maxNumber);
  showData.innerHTML = resultData.map((el) => `<tr><td>${el}</td></tr>`).join("");
}


function showPaging(pageNum) {
  if (pageNum === undefined) {
    pageNum = 1;
  }
  const totalPage = Math.ceil(dataArrs.length / datalimit); //총 페이지 수
  const pagegroup = Math.ceil(pageNum / pageCount); //화면에 보여질 페이지 그룹

  let lastNum = pagegroup * pageCount;
  if (lastNum > totalPage) lastNum = totalPage;
  const firstNum = lastNum - (pageCount - 1) <= 0 ? 1 : lastNum - (pageCount - 1);

  next = lastNum + 1;
  prev = firstNum - 1;


  while (pagingBox.firstChild) { 
    pagingBox.removeChild(pagingBox.firstChild);
  }
  
  const fragmentPage = document.createDocumentFragment();
  
  if (prev > 0) {
    const allprevBtn = document.createElement('a');
    allprevBtn.insertAdjacentHTML("beforeend","<<");

    const prevBtn = document.createElement('a');
    prevBtn.insertAdjacentHTML("beforeend", "<");

    fragmentPage.appendChild(allprevBtn);
    fragmentPage.appendChild(prevBtn);
  }

  for (let i = firstNum; i <= lastNum; i++) {
    const numberBtn = document.createElement('button');
    numberBtn.insertAdjacentHTML("beforeend",i)
    fragmentPage.appendChild(numberBtn);
  }

  if (lastNum < totalPage) {
    const nextBtn = document.createElement('a');
    nextBtn.insertAdjacentHTML("beforeend", ">");

    const allnextBtn = document.createElement('a');
    allnextBtn.insertAdjacentHTML("beforeend", ">>");

    fragmentPage.appendChild(nextBtn);
    fragmentPage.appendChild(allnextBtn);
  }

  pagingBox.appendChild(fragmentPage);

  const pageList = document.querySelectorAll('button')
  if (pageNum === totalPage) {
    pageList[pageList.length - 1].classList.add('active');
  } else {
    pageList[0].classList.add('active')
  }
  render();
}

showPaging();

pagingBox.addEventListener('click', clickEvethandling)