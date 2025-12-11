'use client'

import { Product } from "@prisma/client"
import { createContext, ReactNode, useState} from "react"



export interface CartProduct extends Pick<Product, | 'id' | 'name' | 'price' | 'imageUrl' >  {
    quantity: number
}

export interface ICartContext {
    isOpen: boolean
    products: CartProduct[]
    total: number
    toogleCart: ()=> void
    addProduct: (product : CartProduct) => void
    decreaseCartProductQuantity: (producId : string) => void
    increaseCartProductQuantity: (productId : string) => void
    removeProduct: (productID: string) => void
   
}

export const CartContext = createContext<ICartContext>({
    isOpen : false,
    products: [],
    toogleCart: () => {},
    addProduct : () => {},
    decreaseCartProductQuantity: () => {},
    increaseCartProductQuantity: () => {},
    removeProduct: () => {},
    total: 0
  
})

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const total = products.reduce((acc, product) => {
        return acc + (product.price * product.quantity)
    }, 0)

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

        const decreaseCartProductQuantity = (productId : string) => {
            setProducts(prevProducts => {
                return prevProducts.map(prevProduct => {
                    if(prevProduct.id !== productId){
                        return prevProduct
                    }
                    
                        if(prevProduct.quantity === 1){
                            return prevProduct
                        }
                        return {...prevProduct, quantity: prevProduct.quantity - 1 }
                } )
            } )
        }

        const increaseCartProductQuantity = (productId: string) => {
            setProducts((prevProducts => {
                return prevProducts.map((prevProduct) => {
                    if (prevProduct.id !== productId) {
                        return prevProduct
                    }
                    return {...prevProduct, quantity: prevProduct.quantity + 1}
                })
            }))
        }

        const removeProduct = (productId: string) => {
            setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id !== productId))
        }

    return (
        <CartContext.Provider value={{
            isOpen: isOpen,
            products: products,
            toogleCart: toggleCart,
            addProduct: addProduct,
            decreaseCartProductQuantity,
            increaseCartProductQuantity,
            removeProduct,
            total,
        }}>
            {children}
        </CartContext.Provider>
    )
}