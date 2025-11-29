import { Product } from "@prisma/client"
import Image from "next/image";
import Link from "next/link";

type productsProps = {
    products : Product[]
}
const Products = ({products} : productsProps) => {
    return ( 
        <div className="space-y-3 px-5 py-3">
            <div>
                {products.map((product) => (
                    <Link key={product.id} href={'/'} className="flex items-center justify-between gap-10 py-3 border-b ">
                        <div>
                            <h3 className="text-sm font-medium">{product.name}</h3>
                            <p className="line-clamp-2 text-sm texrt-muted-foreground">{product.description}</p>
                            <p className="pt-3 text-sm font-semibold">
                                { new Intl.NumberFormat("pt-BR" , {style: "currency", currency:"BRL" }).format(product.price)}
                                </p>
                        </div>
                        <div className="relative min-h-[82px] min-w-[120px]">
                            <Image src={product.imageUrl} alt={product.name} fill className="rounded-lg object-contain" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
     );
}
 
export default Products;