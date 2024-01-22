import React, { createContext, useState, useContext, type ReactNode, useEffect } from 'react'

interface IMoto {
  brand: string
  cc: number
  createdAt: string
  description: string
  id: string
  model: string
  name: string
  photo: string
  price: number
  quantity?: number
}

interface ShoppingCartContextProps {
  cartItems: IMoto[]
  addItem: (item: IMoto) => void
  removeAItem: (itemId: string) => void
  removeItemsById: (itemId: string) => void
  removeAll: () => void
  doneBuy: () => void
  totalAmount: () => number
  deleteAllItemsWithSameId: (itemId: string) => void
  countItems: () => number
}

const localStorageKey = 'shoppingCart'

const ShoppingCartContext = createContext<ShoppingCartContextProps | undefined>(undefined)

interface ShoppingCartProviderProps {
  children: ReactNode
}

const ShoppingCartProvider: React.FC<ShoppingCartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<IMoto[]>(() => {
    const storedCart = localStorage.getItem(localStorageKey)
    return (storedCart != null) ? JSON.parse(storedCart) : []
  })

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(cartItems))
  }, [cartItems])

  const addItem = (item: IMoto): void => {
    const existingItemIndex = cartItems.findIndex((i) => i.id === item.id)

    if (existingItemIndex !== -1) {
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex].quantity = (updatedItems[existingItemIndex].quantity ?? 0) + 1

      setCartItems(updatedItems)
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }])
    }
  }

  const removeItemsById = (itemId: string): void => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const removeAItem = (itemId: string): void => {
    setCartItems((prevItems) => {
      const indexToRemove = prevItems.findIndex((item) => item.id === itemId)
      console.log(indexToRemove)
      console.log(cartItems)

      if (indexToRemove !== -1) {
        const updatedItems = [...prevItems]
        const currentItem = updatedItems[indexToRemove]

        if ((currentItem.quantity != null) && currentItem.quantity > 1) {
          currentItem.quantity -= 1
        } else {
          updatedItems.splice(indexToRemove, 1)
        }

        return updatedItems
      }

      return prevItems
    })
  }

  const removeAll = (): void => {
    setCartItems([])
  }

  const doneBuy = (): void => {
    setCartItems([])
  }

  const totalAmount = (): number => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity ?? 1), 0)
  }

  const deleteAllItemsWithSameId = (itemId: string): void => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const countItems = (): number => {
    return cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0)
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addItem,
        removeAItem,
        removeItemsById,
        removeAll,
        doneBuy,
        totalAmount,
        deleteAllItemsWithSameId,
        countItems
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

const useShoppingCart = (): ShoppingCartContextProps => {
  const context = useContext(ShoppingCartContext)
  if (context == null) {
    throw new Error('useShoppingCart deve ser usado dentro de um ShoppingCartProvider')
  }
  return context
}

export { ShoppingCartProvider, useShoppingCart }
