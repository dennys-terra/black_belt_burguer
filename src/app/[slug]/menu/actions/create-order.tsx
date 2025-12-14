"use server";

import { ConsumptionMethod } from "@prisma/client";

import { db } from "@/lib/prisma";

import { removeCpfPunctuation } from "../helpers/cpf";

interface CreateOrderProps {
  customerName: string;
  customerCpf: string;
  customerPhone: string;
  products: Array<{
    id: string;
    price: number;
    quantity: number;
  }>;
  consumptionMethod: ConsumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: { slug: input.slug },
  });

  if (!restaurant) {
    throw new Error("Restaurant not found");
  }

  const productsWithPrices = await db.product.findMany({
    where: { id: { in: input.products.map((product) => product.id) } },
  });
  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find((p) => p.id === product.id)!.price,
  }));
  await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      customerPhone: input.customerPhone,
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      ),
      ConsumptionMethod: input.consumptionMethod,
      restaurant: {
        connect: { id: restaurant.id },
      },
    },
  });
};
