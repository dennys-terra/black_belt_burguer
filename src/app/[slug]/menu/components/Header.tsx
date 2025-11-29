"use client"

import { Restaurant } from "@prisma/client";
import { ChevronsLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type   RestaurantHeaderProps= {
 restaurant: Pick<Restaurant, 'coverImageUrl' | 'name'>
}

const RestaurantHeader = ({restaurant} : RestaurantHeaderProps) => {
    const {back} = useRouter()
    const handleBackClick = () => {
        return back()
    }
    return ( 
        <div className="relative h-[250px] w-full" >
                <Button 
                  className="absolute top-4 left-4 rounded-full z-50"
                  variant={"secondary"}
                  size="icon" 
                  onClick={handleBackClick}
                  >

                    <ChevronsLeftIcon/>
                </Button>
                <Image className="object-cover" src={restaurant.coverImageUrl} alt={restaurant.name} fill />
                <Button className="absolute top-4 right-4 rounded-full z-50"  variant={"secondary"} size="icon" >
                    <ScrollTextIcon />
                </Button>
            </div>
     );
}
 
export default RestaurantHeader;