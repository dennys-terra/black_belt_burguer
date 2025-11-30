import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { CartContext } from "../../context/cart";

const CartSheet = () => {
    const {isOpen, toogleCart } = useContext(CartContext)
    return ( 
        <Sheet open={isOpen} onOpenChange={toogleCart}>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle></SheetTitle>
                            <SheetDescription>OLHA SÓ AMOR , SEU MARIDO TA FICANDO FODA NESSA PORRA</SheetDescription>
                        </SheetHeader>
                    </SheetContent>
            </Sheet>     
     );
}
 
export default CartSheet;