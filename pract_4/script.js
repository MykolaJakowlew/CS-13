const b = 123
console.log("qwerty", 45456, b)
for (let i = 0; i < 5; i += 1) {
    console.log('test')
}

document.getElementById('test-id') // вертається 1 елемент або null
document.getElementsByClassName('test-class') // вертається колекція(масив) з елементами
document.querySelector('.test-class') // вертається 1 елемент або null
document.querySelector('#test-id')  // вертається 1 елемент або null
document.querySelector('.container > .item') // вертається 1 елемент або null
document.querySelectorAll('.container > .item') // вертається колекція(масив) з елементами

const helloWorldNode = document.getElementById('hello-world')
if (helloWorldNode) {
    console.log("Hello world was found")
} else {
    console.log("Hello world was not found")
}

document.addEventListener('DOMContentLoaded', () => {
    const helloWorldNode = document.getElementById('hello-world')
    if (helloWorldNode) {
        console.log("[DOMContentLoaded] Hello world was found")
    } else {
        console.log("[DOMContentLoaded] Hello world was not found")
    }

    const colorOriginal = helloWorldNode.style.color

    const blockNodes = document.getElementsByClassName('block')
    for (let i = 0; i < blockNodes.length; i += 1) {
        blockNodes[i].addEventListener('mouseenter', () => {
            // debugger;
            // --bg-color: red;--color: red;
            const a_1 = blockNodes[i].style.cssText.split(';')
            // ["--bg-color: red", "--color: red"]
            //          0        ,         1
            const a_2 = a_1[0].split(':')
            // ["--bg-color", " red"]
            //        0     ,    1
            const a_3 = a_2[1].trim()
            const color = a_3
            console.log("mouse enter in block", color)
            helloWorldNode.style.color = color
        })

        blockNodes[i].addEventListener('mouseleave', () => {
            helloWorldNode.style.color = colorOriginal
        })
    }

})

console.log('text after EventListener')


document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('button')
    const input = document.querySelector('.container input')

    btn.addEventListener('click', () => {
        const textValue = input.value

        if (textValue.length === 0) {
            return;
        }

        const todoItemDiv = document.createElement('div')
        todoItemDiv.classList.add('todo-item')
        todoItemDiv.textContent = textValue

        const deleteBtn = document.createElement('div')
        deleteBtn.style.backgroundColor = "red"
        deleteBtn.style.padding = "5px"
        deleteBtn.textContent = 'X'

        deleteBtn.addEventListener("click", () => {
            todoItemDiv.style.animationName = "todo-item-delete"
            todoItemDiv.addEventListener('animationend', () => {
                todoItemDiv.remove()
            })
        })

        todoItemDiv.appendChild(deleteBtn)

        document.querySelector('.container')
            .appendChild(todoItemDiv)

        input.value = ''
    })
})