const dataArrs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,1,2,3,4,5,6,7,8,9];
const pagingBox = document.querySelector('#paging');
const showData = document.querySelector('#viewData tbody');
const pageCount = 5;
let datalimit = 2 
let pageNum;
let next;
let prev;
let lastNum;

function selectValuerelay(target) {
  const targetValue = Number(target.options[target.selectedIndex].value);
  datalimit = targetValue;
  showPaging();
}

function clickEvethandling(e) {
  const pageNumselect = document.querySelector('button.active');
  pageNumselect.classList.remove('active');
  e.target.classList.add('active');
  
  if (e.target.innerText === '>') {
    pageNum = next;
    showPaging(pageNum);
  } else if (e.target.innerText === '<') {
    pageNum = prev;
    showPaging(pageNum);
  } else if (e.target.innerText === '>>') {
    const lastpageNum =  Math.ceil(dataArrs.length / datalimit);
    const Remainder = (lastpageNum % pageCount );
    Remainder === 0 ? pageNum = lastpageNum -4 : pageNum = lastpageNum - Remainder + 1;
    showPaging(pageNum, lastpageNum);
    render(lastpageNum);
    return
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


function showPaging(pageNum, lastpageNum) {
  if (pageNum === undefined)pageNum = 1;

  const fragmentPage = document.createDocumentFragment();
  const totalPage = Math.ceil(dataArrs.length / datalimit);
  const pagegroup = Math.ceil(pageNum / pageCount);

  lastNum = pagegroup * pageCount;
  if (lastNum > totalPage) lastNum = totalPage;

  next = lastNum + 1;
  prev = pageNum - pageCount;
  
  while (pagingBox.firstChild) { 
    pagingBox.removeChild(pagingBox.firstChild);
  }
  if (prev > 0) {
    const allprevBtn = document.createElement('a');
    allprevBtn.insertAdjacentHTML("beforeend","<<");

    const prevBtn = document.createElement('a');
    prevBtn.insertAdjacentHTML("beforeend", "<");

    fragmentPage.appendChild(allprevBtn);
    fragmentPage.appendChild(prevBtn);
  }

  for (let i = pageNum; i <= lastNum && i <= totalPage; i++) {
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
  lastpageNum === totalPage ? pageList[pageList.length - 1].classList.add('active') : pageList[0].classList.add('active');

  render();
}

showPaging();

pagingBox.addEventListener('click', clickEvethandling)




