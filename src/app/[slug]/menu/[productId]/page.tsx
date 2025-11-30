import { notFound } from "next/navigation"

import { db } from "@/lib/prisma"

import DetailsProduct from "./components/DetailsProduct"
import ProductHeader from "./components/ProductHeader"

type DetailsProductPageProps = {
    params: Promise<{
        slug: string,
        productId: string
    }>
}

const detailsProductPage = async ({params} : DetailsProductPageProps) => {
    const { productId, slug} = await params
    
    const product = await db.product.findUnique({where: {id: productId}, include: {restaurant: {select:{name: true, avatarImageUrl: true , slug: true}}}})
    if(!product){
        return notFound()
    }

    if(product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
        return notFound()
    }

    return ( 
        <div className="flex h-full flex-col">
            <ProductHeader product={product}/>
            <DetailsProduct product={product} />
        </div>
     );
}
 
export default detailsProductPage;