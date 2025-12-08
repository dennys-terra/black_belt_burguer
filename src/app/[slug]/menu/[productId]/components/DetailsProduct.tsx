"use client"

import { Prisma  } from "@prisma/client";
import { ChefHatIcon, ChevronsLeftIcon, ChevronsRightIcon} from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CartContext } from "../../context/cart";
import CartSheet from "./CartSheet";

type DetailProductInfoProps = {
    product: Prisma.ProductGetPayload<{include: {restaurant: {select: {name: true, avatarImageUrl: true}}}}> 
}

const DetailsProduct = ({product} : DetailProductInfoProps) => {
    const {  toogleCart, addProduct } = useContext(CartContext)
    const [quantity, setQuantity] = useState<number>(1)
    const handleDecreaseQuantity = () => {
        setQuantity((prev) => {
           return quantity >= 1 ? prev -1 : prev
        })
    }
    
    const hadleIncreaseQuantity = () => setQuantity((prev) => prev + 1 )

    const handleAddToCart = () => {
        addProduct({
            ...product,
             quantity: quantity
        })
        toogleCart()
    } 
    
    return ( 
       <>
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl p-5 flex flex-auto flex-col overflow-hidden">
            {/* RESTAURANTE */}
            <div className="flex-auto overflow-hidden">
                <div className="flex items-center gap-1 px-5">
                <Image className="rounded-full" src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} />
                <p className="gap-1.5 text-xs text-muted-foreground">{product.restaurant.name}</p>
            </div>

            <h2 className=" mt-1 text-xl font-semibold">{product.name}</h2>
            
            <div className="flex items-center justify-between mt-3">
                <h3 className="text-xl font-semibold">{new Intl.NumberFormat("pt-Br", { style:'currency', currency: 'BRL'}).format(product.price * quantity )}</h3>
                <div className="flex items-center gap-3 text-center">
                    <Button onClick={handleDecreaseQuantity} variant={"outline"} className="h-8 w-8 rounded-xl">
                        <ChevronsLeftIcon />
                    </Button>
                    <p className="w-4">{quantity}</p>
                     <Button  onClick={hadleIncreaseQuantity} variant={"destructive"} className="h-8 w-8 rounded-xl">
                        <ChevronsRightIcon />
                    </Button>
                </div>
                
            </div>
            
            <ScrollArea className="h-full">
                     <div className="mt-6 space-y-3">
                <h4 className="font-semibold">Sobre</h4>
                <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>


            <div className="mt-6 space-y-3">
                <div className="flex items-center gap-1.5">
                    <ChefHatIcon size={18}/>
                    <h4 className="font-semibold">ingredientes</h4> 
                </div>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                    {product.ingredients.map((ingredient) => (
                        <li key={ingredient}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            </ScrollArea>
            </div>
                <Button onClick={handleAddToCart} disabled={quantity===0} variant={quantity === 0 ? 'ghost' : 'default'} className={`rounded-full  w-full font-bold ${quantity === 0 ? 'line-through ' : 'font-extrabold'}`}>Adicionar à sacola</Button>
       </div>
             <CartSheet/>
       </>
     );
}
 
export default DetailsProduct;
