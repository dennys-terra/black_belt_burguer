import {  ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/formatCurrency";

import { CartContext, CartProduct } from "../../context/cart";

interface CartProductItemProps  {
    product: CartProduct
}


const CartProductItem = ({product} : CartProductItemProps) => {
    const {decreaseCartProductQuantity} = useContext(CartContext)
    return ( 
        <div className="flex items-center justify-between mt-4">
           <div className="flex item-center gap-3 ">
             <div className="relative h-20 w-20 bg-gray-100 rounded-xl">
                <Image src={product.imageUrl} alt={product.name} fill/>
            </div>
            <div className="space-y-1">
                <p className="text-xs max-w-[90%] truncate text-ellipsis ">{product.name}</p>
                <p className="text-sm font-semibold">{formatCurrency(product.price * product.quantity)}</p>
                <div className="flex items-center gap-1 text-center">
                    <Button onClick={() => decreaseCartProductQuantity(product.id)} className="h-7 w-7 rounded-lg" variant="outline">
                        <ChevronLeftIcon/>
                    </Button>
                    <p className="w-7 text-xs">{product.quantity}</p>
                    <Button className="h-7 w-7 rounded-lg" variant='destructive'>
                        <ChevronRightIcon/>
                    </Button>
                </div>
            </div>
           </div>
           <Button className="h-7 w-7 rounded-lx " variant='outline'>
            <TrashIcon />
           </Button>
        </div>
     );
}
 
export default CartProductItem;