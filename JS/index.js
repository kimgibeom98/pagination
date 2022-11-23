const END_POINT = 'http://localhost';
const PORT = 3000;
const pagingBox = document.querySelector('#paging');
const body = document.querySelector('#viewData tbody');
const pageCount = 5;
let datalimit = 5;
let pageNum, next, prev, lastNum, accounts;

async function requstData() {
  try {
    const response = await fetch(`${END_POINT}:${PORT}/user`, {
      method: 'GET'
    })
    accounts = await response.json();
    showPaging();
  } catch (err) {
    console.log(err)
  }
}

function selectValuerelay(target) {
  const targetValue = Number(target.options[target.selectedIndex].value);
  datalimit = targetValue;
  showPaging();
}

function clickEvethandling(e) {
  const pageNumselect = document.querySelector('button.active');
  const totalPage = Math.ceil(accounts.length / datalimit);
  const Remainder = (totalPage % pageCount);

  pageNumselect.classList.remove('active');
  e.target.classList.add('active');

  if (e.target.tagName === "A") {
    if (e.target.innerText === '>') {
      pageNum = next;
    } else if (e.target.innerText === '<') {
      pageNum = prev;
    } else if (e.target.innerText === '>>') {
      Remainder === 0 ? pageNum = totalPage - 4 : pageNum = totalPage - Remainder + 1;
      showPaging(pageNum, totalPage);
      render(totalPage);
      return
    } else {
      pageNum = 1;
    }
    showPaging(pageNum);
  } else {
    pageNum = e.target.innerText;
  }
  render(pageNum);
}

function render(target) {
  target = target ?? 1;
  const maxNumber = target * datalimit;
  const minNumber = maxNumber - datalimit;

  const resultData = accounts.slice(minNumber, maxNumber);
  body.innerHTML = resultData.map((el) => `
  <tr>
    <td>${el.name}</td>
    <td>${el.job}</td>
    <td>${el.age}</td>
    <td>${el.email}</td>
  </tr>`
  ).join("");
}

function showPaging(pageNum, lastpageNum) {
  pageNum = pageNum ?? 1;
  const fragmentPage = document.createDocumentFragment();
  const totalPage = Math.ceil(accounts.length / datalimit);
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
    allprevBtn.insertAdjacentHTML("beforeend", "<<");

    const prevBtn = document.createElement('a');
    prevBtn.insertAdjacentHTML("beforeend", "<");

    fragmentPage.appendChild(allprevBtn);
    fragmentPage.appendChild(prevBtn);
  }

  for (let i = pageNum; i <= lastNum && i <= totalPage; i++) {
    const numberBtn = document.createElement('button');
    numberBtn.insertAdjacentHTML("beforeend", i)
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

requstData();
pagingBox.addEventListener('click', clickEvethandling)




