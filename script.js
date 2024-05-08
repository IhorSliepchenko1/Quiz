const current = document.getElementById('current');
const total = document.getElementById('total');
const question = document.getElementById('question');
const listItem = document.getElementById('listItem');
const btn = document.getElementById('btn');
btn.disabled = true

const start = document.getElementById('start')

const listSpan = (parrent, obj) => {
     for (let i = 0; i < obj.length; i++) {

          const span = document.createElement('span')
          span.className = `circle`
          parrent.append(span)
     }
}

fetch('./questions.json')
     .then((json) => json.json())
     .then((res) => {
          const mainObj = res
          listSpan(document.getElementById('listCircle'), mainObj)
          
          const listCircle = document.querySelectorAll('#listCircle')[0].childNodes
          const [one, two, three] = listCircle

          total.innerText = mainObj.length

          const arrBool = []
          const listBtn = document.querySelectorAll('#listItem')[0].childNodes

          const render = () => {
               current.innerText = btn.value
               question.innerText = mainObj[btn.value - 1].question
               mainObj[btn.value - 1].answers.map((item) => {
                    const divItem = document.createElement('button')
                    divItem.className = 'item'
                    divItem.innerText = item.text

                    listItem.append(divItem)

                    const colorCircle = () => {

                         switch (+btn.value) {
                              case 1:
                                   one.classList.add(`${arrBool[0]}-circle`)
                                   btn.disabled = false
                                   break

                              case 2:
                                   two.classList.add(`${arrBool[1]}-circle`)
                                   btn.disabled = false
                                   break

                              case 3:
                                   three.classList.add(`${arrBool[2]}-circle`)
                                   btn.disabled = false
                                   break
                         }

                    }

                    const addEvent = (e) => {
                         item.isCorrect
                              ? e.target.classList.add('true')
                              : e.target.classList.add('false')

                         arrBool.push(item.isCorrect)
                         colorCircle()

                         for (let j = 0; j < listBtn.length; j++) {
                              listBtn[j].disabled = true
                         }

                         if (arrBool.length === 3) {
                              btn.style.display = `none`
                              start.style.display = `block`
                         }
                    }

                    divItem.addEventListener('click', (e) => addEvent(e))

               })
          }

          render()

          btn.addEventListener('click', () => {
               btn.value = +btn.value + 1
               if (+btn.value >= 3) btn.value = 3
               listItem.innerHTML = ''
               btn.disabled = true
               render()
          })

          start.addEventListener('click', () => {
               const trueCount = arrBool.filter((bool) => bool === true)
               const result = alert(`
               Правильный ответов ${trueCount.length}
               Не правильных ответов ${mainObj.length - trueCount.length}
               `)
               btn.value = 1
               listItem.innerHTML = ''
               arrBool.length = 0
               btn.style.display = `block`
               start.style.display = `none`

               for (let k = 0; k < listCircle.length; k++) {
                    listCircle[k].className = 'circle'
               }
               render()
          })

     })


