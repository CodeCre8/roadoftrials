// Reference the categories input
const linkCategory = document.querySelector("#linkCategory");
// Reference the submit button
const submitButton = document.querySelector("#submitButton");
const addBtn = document.querySelector("#addBtn");
const cancelBtn = document.querySelector("#cancelButton");
const addLinkPanel = document.querySelector("#addLinkPanel");
const addedCategories = document.querySelector("#addedCategories");
const addLinkContainer = document.querySelector("#addLinkContainer");

const linkList = document.querySelector("#linkList");


let editIndex = -1;

let linkCategories = [];
let links = [
  {
    title: 'New York',
    url: 'url.com1',
    categories: ['node', 'angular'],
    date: new Date()
  },
  {
    title: 'Toronto',
    url: 'url.com2',
    categories: ['js', 'angular'],
    date: new Date()
  },
  {
    title: 'Venice',
    url: 'url.com3',
    categories: ['node', 'bootstrap'],
    date: new Date()
  }
];

displayLinks();

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showFormPanel();
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  hideFormPanel();
});


function showFormPanel() {
  addLinkContainer.classList.remove("hidden");
  displayLinkCategories();
}

function hideFormPanel() {
  addLinkContainer.classList.add("hidden");
  clearLinkForm();
}

// Access the categories input values
linkCategory.addEventListener('keydown', function(e) {
  if(e.keyCode === 188) {
    event.preventDefault();
    linkCategories.push(linkCategory.value);
    linkCategory.value = "";
    // Display the updated categories
    displayLinkCategories();
  }
});

// Function to display the updated categories
function displayLinkCategories() {
  addedCategories.innerHTML = "";
  
  for(let category of linkCategories) {
    let categoryHTMLString = `
      <span class="category">${category}</span>
    `;
    addedCategories.innerHTML += categoryHTMLString;
  }
}

function clearLinkForm() {
  // Reset inputs
  linkTitle.value = "";
  linkUrl.value = "";
  linkCategories.value = "";
  linkCategories = [];
  addedCategories.innerHTML = "";
}


submitButton.addEventListener('click', e => {
  event.preventDefault();

  const title = linkTitle.value;
  const url = linkUrl.value;
  const categories = linkCategories;

  const newLink = {
    title,
    url,
    categories,
    date: new Date()
  }

  if(editIndex === -1) {
    // Push new links to array
    links.unshift(newLink);
  }
  else {
    links[editIndex] = newLink;
    editIndex = -1;
  }
  displayLinks();
  
  // Reset inputs
  clearLinkForm();

  displayLinkCategories();
  hideFormPanel();
  
});


function displayLinks() {
  
  linkList.innerHTML = "";

  let index = 0;

  for(let link of links) {

    let linkHTMLString = `
    <div class="flex-item">
      <div class="link panel">
        <div class="link-options">
          <button class="btn-sm" onclick="deleteLink(${index})">Delete</button>
          <button class="btn-sm" onclick="editLink(${index})">Edit</button>
        </div>
        <a href="${link.url}"><h1 class="header">${link.title}</h1></a>
        <p class="link-date">${formatDate(link.date)}</p>
        <div class="categories">
          Categories:`;
        for(let category of link.categories) {
          linkHTMLString += `
            <span class="category">${category}</span>
            `
        }
        linkHTMLString += `
          </div>
        </div>
      </div>
      `
      ;
    linkList.innerHTML += linkHTMLString;
    index++;
    
  }
}

function deleteLink(index) {
  links.splice(index, 1);
  displayLinks();
}

function editLink(index) {

  editIndex = index;
  linkTitle.value = links[index].title;
  linkUrl.value = links[index].url;
  linkCategories = links[index].categories;

  showFormPanel();
}

function formatDate(date) {
  return `${("0" + (date.getMonth() + 1)).slice(-2)}/${("0" + (date.getDay() + 1)).slice(-2)}/${date.getFullYear()}`;
}