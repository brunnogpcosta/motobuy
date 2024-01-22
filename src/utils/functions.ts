const toCurrencyFormat = (numero: number): string => {
  const formatedNumber = numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return formatedNumber
}

export { toCurrencyFormat }
