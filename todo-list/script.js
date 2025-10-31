const addBtn = document.querySelector('.button')
const addInput = document.querySelector('.add > input')

const storageKey = 'todo-list'

const createItem = (text, originalId) => {
  const id = originalId ?? crypto.randomUUID()
  // <div class="item"></div>
  const item = document.createElement('div')
  item.classList.add('item')
  item.setAttribute('todoItemId', id)

  // <input type="checkbox">
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'

  // <div class="item">
  //   <input type="checkbox">
  // </div>
  item.appendChild(checkbox)

  //<div class="title">text</div>
  const title = document.createElement('div')
  title.classList.add('title')
  title.textContent = text

  // <div class="item">
  //   <input type="checkbox">
  //   <div class="title">text</div>
  // </div>
  item.appendChild(title)

  // <div class="trash-icon"></div>
  const trashIcon = document.createElement('div')
  trashIcon.classList.add('trash-icon')
  trashIcon.addEventListener('click', () => {
    const todoListStr = sessionStorage.getItem(storageKey) ?? '[]'
    const todoList = JSON.parse(todoListStr)
    const itemId = item.getAttribute('todoItemId')
    const newTodoList = todoList.filter(el => el.id !== itemId)
    // const newTodoList = todoList.filter(el => {
    //   return el.id !== itemId
    // })
    // const newTodoList = todoList.filter(function (el) {
    //   return el.id !== itemId
    // })
    sessionStorage.setItem(storageKey, JSON.stringify(newTodoList))
    item.remove()
  })

  // <img src="./trash.png" />
  const icon = document.createElement('img')
  icon.src = './trash.png'

  // <div class="trash-icon">
  //   <img src="./trash.png" />
  // </div>
  trashIcon.appendChild(icon)

  // <div class="item">
  //   <input type="checkbox">
  //   <div class="title">text</div>
  //   <div class="trash-icon">
  //      <img src="./trash.png" />
  //   </div>
  // </div>
  item.appendChild(trashIcon)

  document.querySelector('.todos')
    .appendChild(item)

  return id;
}

addBtn.addEventListener('click', () => {

  const text = addInput.value.trim()
  if (text.length == 0) {
    return;
  }

  // const str = `
  //  <div class="item">
  //   <input type="checkbox">
  //   <div class="title">${text}</div>
  //   <div class="trash-icon">
  //     <img src="./trash.png" />
  //   </div>
  // </div>
  // `
  // document.querySelector('.todos')
  //   .innerHTML += str

  const id = createItem(text)

  addInput.value = ''

  let todoListStr = sessionStorage.getItem(storageKey)
  if (!todoListStr) {
    todoListStr = '[]'
  }

  const todoList = JSON.parse(todoListStr)
  todoList.push({
    id: id,
    checked: false,
    text: text,
  })

  sessionStorage.setItem(storageKey, JSON.stringify(todoList))
})

// let todoListStr = sessionStorage.getItem(storageKey)
// if (!todoListStr) {
//   todoListStr = '[]'
// }
const todoListStr = sessionStorage.getItem(storageKey) ?? '[]'

const todoList = JSON.parse(todoListStr)
for (const item of todoList) {
  createItem(item.text, item.id)
}

const searchInput = document
  .querySelector('#search-input')

// searchInput.addEventListener('change', (value) => {
//   const text = value.target.value;
//   console.log('change', text)
// })
// searchInput.addEventListener('keypress', (value) => {
//   const text = value.target.value;
//   console.log('keypress', text)
// })
// searchInput.addEventListener('keydown', (value) => {
//   const text = value.target.value;
//   console.log('keydown', text)
// })


const disabledRegisterSearchInput = document
  .querySelector('#disabledRegisterSearch')
const searchByWordsInput = document
  .querySelector('#searchByWords')
const searchByFullTextInput = document
  .querySelector('#searchByFullText')
const searchSettings = {
  isDisabledRegisterSearch: disabledRegisterSearchInput.checked,
  isSearchByWords: searchByWordsInput.checked,
  isSearchByFullText: searchByFullTextInput.checked,
}
console.log('searchSettings', searchSettings)


const searchFunc = (_searchText) => {
  const searchText = _searchText.toLowerCase();
  console.log('keyup', searchText)
  const todoItemList = document.querySelectorAll('.item')
  if (searchText.length === 0) {
    todoItemList.forEach(elem => elem.classList.remove('hide'))
    return
  }

  const searchByWords = (text) => {
    // searchText = "task todo"
    const words = searchText.split(' ')
    // words => ["task", "todo"]
    return words.every(word => text.indexOf(word) !== -1)
  }

  const searchByFullText = (text) => {
    return text.indexOf(searchText) !== -1
  }

  todoItemList.forEach(elem => {
    const text = elem.textContent.toLocaleLowerCase();
    console.log('text', text)
    let shouldBeShowed = false
    if (searchSettings.isSearchByFullText) {
      shouldBeShowed = searchByFullText(text)
    }
    if (searchSettings.isSearchByWords) {
      shouldBeShowed = searchByWords(text)
    }

    if (shouldBeShowed) {
      elem.classList.remove('hide')
    } else {
      elem.classList.add('hide')
    }
  })
}

searchByFullTextInput.addEventListener('change', () => {
  searchSettings.isSearchByFullText = true;
  searchSettings.isSearchByWords = false;
  console.log('searchByFullTextInput searchSettings', searchSettings)
  searchFunc(searchInput.value)
})
searchByWordsInput.addEventListener('change', () => {
  searchSettings.isSearchByWords = true;
  searchSettings.isSearchByFullText = false;
  console.log('searchByWordsInput searchSettings', searchSettings)
  searchFunc(searchInput.value)
})

disabledRegisterSearchInput.addEventListener('change', (value) => {
  searchSettings.isDisabledRegisterSearch = value.target.checked
  console.log('disabledRegisterSearchInput searchSettings', searchSettings)
  searchFunc(searchInput.value)
})




searchInput.addEventListener('keyup', (value) => {
  const searchText = value.target.value
  searchFunc(searchText)
})