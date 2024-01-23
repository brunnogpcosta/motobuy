const toCurrencyFormat = (numero: number): string => {
  const formatedNumber = numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return formatedNumber
}

const formateDate = (date: string): string => {
  const dataDecodificada = decodeURIComponent(date)

  const data = new Date(dataDecodificada)

  // Obter os componentes da data
  const day = data.getUTCDate()
  const month = data.getUTCMonth() + 1
  const year = data.getUTCFullYear()

  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
}

const prepareFormateDate = (date: string): string => {
  const decodeDate = decodeURIComponent(date)

  const [day, month, year] = decodeDate.split('/')

  const data = new Date(`${month}/${day}/${year}`)

  const yearBeauty = data.getFullYear()
  const monthBeauty = String(data.getMonth() + 1).padStart(2, '0')
  const dayBeauty = String(data.getDate()).padStart(2, '0')

  const dataFormatada = `${yearBeauty}-${monthBeauty}-${dayBeauty}`

  return dataFormatada
}

export { toCurrencyFormat, formateDate, prepareFormateDate }
