'use client'

import { Product } from "@prisma/client";
import { ChevronsLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type DetailsProductHeaderProps = {
    product: Pick<Product, 'name' | 'imageUrl'>
}

const DetailsProductHeader  = ({product} : DetailsProductHeaderProps) => {
    const {back} = useRouter()
    const handleBackClick = () => back()
    return ( 
           
            <div className="relative w-full h-[300px]">
                <Image src={product.imageUrl} alt={product.name} fill  className="object-contain"/>
              <Button 
                  onClick={handleBackClick}
                  className="absolute top-4 left-4 rounded-full z-50"
                  variant={"secondary"}
                  size="icon" 
                  >
                    <ChevronsLeftIcon/>
                </Button>
                
                <Button className="absolute top-4 right-4 rounded-full z-50"  variant={"secondary"} size="icon" >
                    <ScrollTextIcon />
                </Button>

            </div>
     );
}
 
export default DetailsProductHeader ;