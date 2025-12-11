'use client'

import { Product } from "@prisma/client"
import { createContext, ReactNode, useState} from "react"



export interface CartProduct extends Pick<Product, | 'id' | 'name' | 'price' | 'imageUrl' >  {
    quantity: number
}

export interface ICartContext {
    isOpen: boolean
    products: CartProduct[]
    toogleCart: ()=> void
    addProduct: (product : CartProduct) => void
}

export const CartContext = createContext<ICartContext>({
    isOpen : false,
    products: [],
    toogleCart: () => {},
    addProduct : () => {},
})

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleCart = () => {
        setIsOpen((prev) => !prev)
    }

    const addProduct = (product : CartProduct) => {
       const productIsAlreadyOnTheCart = products.some(prevProduct => prevProduct.id === product.id )
       if(!productIsAlreadyOnTheCart){
        return setProducts([...products, product]) 
       }
        setProducts((prevProducts) => {
        return prevProducts.map(prevProduct => {
            if(prevProduct.id === product.id){
                return {...prevProduct, quantity: prevProduct.quantity + product.quantity}
            }
            return prevProduct
        })
       } )
            
        }

    return (
        <CartContext.Provider value={{
            isOpen: isOpen,
            products: products,
            toogleCart: toggleCart,
            addProduct: addProduct,
        }}>
            {children}
        </CartContext.Provider>
    )
}