"use client";

import { Restaurant } from "@prisma/client";
import { ChevronsLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type RestaurantHeaderProps = {
  restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
};

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const handleBackClick = () => {
    return router.back();
  };

  const handleOrdersClick = () => {
    router.push(`/${slug}/orders`);
  };

  return (
    <div className="relative h-[250px] w-full">
      <Button
        className="absolute left-4 top-4 z-50 rounded-full"
        variant={"secondary"}
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronsLeftIcon />
      </Button>
      <Image
        className="object-cover"
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
      />
      <Button
        onClick={handleOrdersClick}
        className="absolute right-4 top-4 z-50 rounded-full"
        variant={"secondary"}
        size="icon"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default RestaurantHeader;
