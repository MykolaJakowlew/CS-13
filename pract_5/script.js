document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('./electronic_items_dataset.json')
    const data = await response.json()
    const items = document.querySelector('.items')
    data.forEach(el => {
        const item = createItem(el)
        // items.innerHTML += item
        items.appendChild(item)
    })

    setCategoryValues(data)
    setExtraFunctions(data)

    document.querySelector('#search-input')
        .addEventListener('keyup', (event) => {
            const text = event.target.value.trim().toLowerCase()
            if (text.length == 0) {
                document
                    .querySelectorAll('.items > .hide')
                    .forEach(el => el.classList.remove('hide'))
                return;
            }

            const showedItems = data.filter(el => {
                if (el.name.toLowerCase().indexOf(text) != -1) {
                    return true
                }

                if (el.shortDescription.toLowerCase().indexOf(text) != -1) {
                    return true
                }

                return false
            })

            const showedIds = showedItems.map(el => el.id)

            const items = document.querySelectorAll('.item')

            items.forEach(item => {
                const id = item.getAttribute('item-id')
                if (!showedIds.includes(id)) {
                    item.classList.add('hide')
                } else {
                    item.classList.remove('hide')
                }
            })

        })

    document.querySelector('.loader')
        .classList.add('hide')
})


// function createItem(item) {
//     return `
//     <div class="item">
//         <div class="item-image"
//             style="--bgURL:url(${item.imageUrl})"></div>
//         <div class="item-title">${item.name}</div>
//         <div class="item-short-description">${item.shortDescription}</div>
//         <div class="item-bottom">
//             <div class="item-rating">
//                 Rating: <span>${item.rating}</span>
//             </div>
//             <div class="item-available-count">
//                 Count: <span>${item.availableCount}</span>
//             </div>
//             <div class="item-price">
//                 ${item.price} ${item.currency}
//             </div>
//             <div class="item-add">
//                 Add to cart
//             </div>
//         </div>
//     </div>`
// }

function createItem(item) {
    //  <div class="item"></div>
    const div = document.createElement('div')
    div.classList.add('item');
    div.setAttribute('item-id', item.id)

    // <div class="item-image" style="--bgURL:url(${item.imageUrl})"></div>
    const image = document.createElement('div')
    image.classList.add('item-image')
    image.style = `--bgURL:url(${item.imageUrl})`

    // <div class="item-title">${item.name}</div>
    const title = document.createElement('div')
    title.classList.add('item-title')
    title.textContent = item.name

    // <div class="item-short-description">${item.shortDescription}</div>
    const description = document.createElement('div')
    description.classList.add('item-short-description')
    description.textContent = item.shortDescription

    // <div class="item-rating"></div>
    const bottom = document.createElement('div')
    bottom.classList.add('item-bottom')

    // <div class="item-rating"></div>
    const rating = document.createElement('div')
    rating.classList.add('item-rating')
    rating.textContent = `Rating: ${item.rating}`

    // <div class="item-rating"></div>
    const availableCount = document.createElement('div')
    availableCount.classList.add('item-available-count')
    availableCount.textContent = `Count: ${item.availableCount}`

    // <div class="item-price"></div>
    const price = document.createElement('div')
    price.classList.add('item-price')
    price.textContent = `${item.price} ${item.currency}`

    const add = document.createElement('div')
    add.classList.add('item-add')
    add.textContent = `Add to cart`

    bottom.append(rating)
    bottom.append(availableCount)
    bottom.append(price)
    bottom.append(add)

    div.appendChild(image)
    div.appendChild(title)
    div.appendChild(description)
    div.appendChild(bottom)


    return div
}

function setCategoryValues(data) {
    // [ 'c1', 'c2', 'c3' ]
    // const allCategories = data.map(el => {
    //     if (allCategories.includes(el)) {
    //         return null;
    //     }

    //     return el.category
    // }).filter(el => el != null)

    // [ 'c1', 'c2', 'c1', 'c3' ]
    const allCategories = data.map(el => el.category)

    // {
    //    c1: 1,
    //    c2: 1,
    //    c3: 1,
    //    ...
    // }
    const allCategoriesSet = new Set(allCategories)
    const uniqueCategories = [...allCategoriesSet]

    const categoryNode = document.querySelector('.category select')

    uniqueCategories.forEach(category => {
        const option = document.createElement('option')
        option.textContent = category
        option.value = category

        categoryNode.appendChild(option)
    })
}

function setExtraFunctions(data) {

    // [
    //   ['f1', 'f2', 'f3', ...],
    //   ['f1', 'f2', 'f3', ...],
    //   ['f1', 'f2', 'f3', ...]
    //   ...
    // ]
    // const extraFunctions = data.map(el => el.extraFunctions)

    // [
    //  'f1', 'f2', 'f3', ...,
    //  'f1', 'f2', 'f3', ...,
    //  'f1', 'f2', 'f3', ...,
    //   ...
    // ]
    // const extraFunctions = data.map(el => el.extraFunctions).flat()

    // [
    //  'f1', 'f2', 'f3', ...,
    //  'f1', 'f2', 'f3', ...,
    //  'f1', 'f2', 'f3', ...,
    //   ...
    // ]
    const allExtraFunctions = data.flatMap(el => el.extraFunctions)
    const uniqueExtraFunctions = [
        ...new Set(allExtraFunctions)
    ]

    const container = document.querySelector('.extra-functions-container')

    uniqueExtraFunctions.forEach(extra => {
        const label = document.createElement('label')
        const span = document.createElement('span')
        span.textContent = extra;

        const input = document.createElement('input')
        input.type = 'checkbox'

        label.appendChild(input)
        label.appendChild(span)

        container.appendChild(label)
    })
}