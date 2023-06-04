export const CreateElement = (element, className, id) => {
  const el = document.createElement(element)
  el.classList.add(className)
  el.id = id

  return el
}

export const CreateLine = (day, total, percent, isMax = false) => {
  const line = CreateElement('div', 'grafico__line')
  const bar = CreateElement('span', 'line__bar')
  const legend = CreateElement('span', 'line__legend')
  const tooltip = CreateElement('span', 'line__tooltip')

  if (isMax) {
    bar.classList.add('bar__maxday')
  }

  bar.style = `height: ${percent}%`
  tooltip.innerText = total
  legend.innerText = day

  line.appendChild(tooltip)
  line.appendChild(bar)
  line.appendChild(legend)

  const graphic = document.querySelector('.main__grafico')

  graphic.appendChild(line)
}

export const RenderGraphic = (listData) => {
  listData.forEach((line) => {
    CreateLine(line.day, line.total, line.percent, line.isMax)
  })
}

const getInfosData = async () => {
  const response = await fetch('./data.json')
  const data = await response.json()
  const amounts = data.map((item) => item.amount)

  const total = amounts.reduce((total, amount) => total + amount, 0)

  const max = Math.max(...amounts)

  const list = data.map((item) => {
    return {
      day: item.day,
      total: item.amount,
      percent: item.amount === max ? 100 : (Math.ceil(item.amount) * 100) / max,
      isMax: item.amount === max,
    }
  })


  RenderGraphic(list)
}

getInfosData()
