import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

type productsProps = {
  products: Product[];
};
const Products = ({ products }: productsProps) => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const ConsumptionMethod = searchParams.get("consumptionMethod");
  return (
    <div className="space-y-3 px-5 py-3">
      <div>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/${slug}/menu/${product.id}?ConsumptionMethod=${ConsumptionMethod}`}
            className="flex items-center justify-between gap-10 border-b py-3"
          >
            <div>
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="texrt-muted-foreground line-clamp-2 text-sm">
                {product.description}
              </p>
              <p className="pt-3 text-sm font-semibold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </p>
            </div>
            <div className="relative min-h-[82px] min-w-[120px]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="rounded-lg object-contain"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
