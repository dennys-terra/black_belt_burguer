import { notFound } from "next/navigation"

import { db } from "@/lib/prisma"

import DetailsProductHeader from "./components/DetailsProductHeader"

type DetailsProductPageProps = {
    params: Promise<{
        slug: string,
        productId: string
    }>
}

const detailsProductPage = async ({params} : DetailsProductPageProps) => {
    const {slug, productId} = await params
    const product = await db.product.findUnique({where: {id: productId}})
    if(!product){
        return notFound()
    }
    return ( 
        <>
            <DetailsProductHeader product={product}/>
            <>{slug}, {productId}</>
        </>
     );
}
 
export default detailsProductPage;