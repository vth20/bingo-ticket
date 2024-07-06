const $ = document.querySelector.bind(document);

const btnGenerate = $("#generateBtn");
const btnExport = $("#exportBtn");
const toolbar = $("#toolbar");
const date = $("#date");
const root = $("#root");

date.valueAsDate = new Date();

function generateRecords() {
  let records = new Set();
  while (records.size < 100) {
    // Generate a random array of 25 numbers
    let record = [];
    for (let i = 0; i < 25; i++) {
      let num = null;
      do {
        num = Math.floor(Math.random() * 99 + 1);
      } while (record.includes(num));
      record.push(num);
    }
    // Add the record to the set if it is unique
    if (!records.has(JSON.stringify(record))) {
      records.add(JSON.stringify(record));
    }
  }
  return (records = Array.from(records, (record) => JSON.parse(record)));
}

function getDatePlay() {
  return new Date(date.value).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit"
  });
}

function generateTable(records) {
  const tables = records.map((record, id) => {
    const table = document.createElement("table");
    let index = 0;

    for (let i = 0; i < 5; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 5; j++) {
        const cell = document.createElement("td");
        if (i === 2 && j === 2) {
          cell.classList.add("free");
          cell.textContent = "FREE SPACE";
        } else {
          cell.textContent = record[index];
          index++;
        }
        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    const footer = document.createElement("div");
    footer.classList.add("footer");
    const cardID = document.createElement("div");
    const div3 = document.createElement("div");
    cardID.textContent = `#${(id + 1).toString().padStart(3, "0")}`;
    div3.textContent = "div3.bingo";
    footer.appendChild(cardID);
    footer.appendChild(div3);

    const dateElement = document.createElement("div");
    const date = document.createElement("div");
    date.classList.add("date");
    date.textContent = `VÉ NGÀY ${getDatePlay()}`;
    const ul = document.createElement("ul");
    ["B", "I", "N", "G", "O"].forEach((letter) => {
      const li = document.createElement("li");
      const div = document.createElement("div");
      div.textContent = letter;
      li.appendChild(div);
      ul.appendChild(li);
    });
    dateElement.appendChild(date);
    dateElement.appendChild(ul);

    const container = document.createElement("div");
    container.id = `table-${id}`;
    container.classList.add("container");
    container.appendChild(dateElement);
    container.appendChild(table);
    container.appendChild(footer);

    return container;
  });

  return tables;
}

function onGenerate() {
  const records = generateRecords();
  const elements = generateTable(records);
  console.log(elements);
  // Create a new array to hold the wrapped elements
  const wrappedElements = [];

  // Loop through the original array, grouping elements into sets of 4
  for (let i = 0; i < elements.length; i += 4) {
    // Slice the next 4 elements from the original array
    const group = elements.slice(i, i + 4);
    console.log(group);
    // Create a new div element
    const page = document.createElement("page");
    // Add the group of elements to the new div element
    group.forEach((el) => page.appendChild(el));

    // Add the new div element to the wrappedElements array
    wrappedElements.push(page);
  }
  console.log(wrappedElements);

  root.replaceChildren(...wrappedElements);
}

function onExport() {
  toolbar.style.display = "none";
  window.print();
  toolbar.style.display = "block";
}

btnGenerate.addEventListener("click", onGenerate);
btnExport.addEventListener("click", onExport);
