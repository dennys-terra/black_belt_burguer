"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

import { CartContext } from "../../context/cart";
import CartSheet from "./CartSheet";

type DetailProductInfoProps = {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: { select: { name: true; avatarImageUrl: true } } };
  }>;
};

const DetailsProduct = ({ product }: DetailProductInfoProps) => {
  const { toogleCart, addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      return quantity >= 1 ? prev - 1 : prev;
    });
  };

  const hadleIncreaseQuantity = () => setQuantity((prev) => prev + 1);

  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity: quantity,
    });
    toogleCart();
  };

  const formSchema = z.object({
    meat: z.enum(["artesanal", "frango", "picanha"], {
      message: "Selecione o tipo de carne",
    }),

    sauce: z.enum(["maionese", "cheddar", "catupiry"], {
      message: "Selecione o molho",
    }),

    notes: z.string().max(200, "Máximo de 200 caracteres").optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meat: "artesanal",
      sauce: "maionese",
      notes: "",
    },
  });

  return (
    <>
      <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5">
        {/* RESTAURANTE */}
        <div className="flex-auto overflow-hidden">
          <div className="flex items-center gap-1 px-5">
            <Image
              className="rounded-full"
              src={product.restaurant.avatarImageUrl}
              alt={product.restaurant.name}
              width={16}
              height={16}
            />
            <p className="gap-1.5 text-xs text-muted-foreground">
              {product.restaurant.name}
            </p>
          </div>

          <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>

          <div className="mt-3 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {new Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
              }).format(product.price * quantity)}
            </h3>
            <div className="flex items-center gap-3 text-center">
              <Button
                onClick={handleDecreaseQuantity}
                variant={"outline"}
                className="h-8 w-8 rounded-xl"
              >
                <ChevronsLeftIcon />
              </Button>
              <p className="w-4">{quantity}</p>
              <Button
                onClick={hadleIncreaseQuantity}
                variant={"destructive"}
                className="h-8 w-8 rounded-xl"
              >
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div>
              <Form {...form}>
                <form>
                  <FormField
                    control={form.control}
                    name="meat"
                    render={({ field }) => (
                      <FormItem className="mb-5 mt-4">
                        <div className="text-center">
                          <FormLabel className="font-bold">
                            Escolha a carne
                          </FormLabel>
                        </div>

                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-6"
                          >
                            {["artesanal", "frango", "picanha"].map((meat) => (
                              <label
                                key={meat}
                                className="flex cursor-pointer items-center gap-2"
                              >
                                <RadioGroupItem value={meat} />
                                <span className="capitalize">{meat}</span>
                              </label>
                            ))}
                          </RadioGroup>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sauce"
                    render={({ field }) => (
                      <FormItem>
                        <div className="text-center">
                          <FormLabel className="font-bold">
                            Escolha o molho
                          </FormLabel>
                        </div>

                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="flex gap-6"
                          >
                            {["maionese", "cheddar", "catupiry"].map(
                              (sauce) => (
                                <label
                                  key={sauce}
                                  className="flex cursor-pointer items-center gap-2"
                                >
                                  <RadioGroupItem value={sauce} />
                                  <span className="capitalize">{sauce}</span>
                                </label>
                              ),
                            )}
                          </RadioGroup>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem className="mt-6">
                        <div className="text-center">
                          <FormLabel className="text-center font-bold">
                            Observações do pedido
                          </FormLabel>
                        </div>

                        <FormControl>
                          <Textarea
                            placeholder="Ex: sem alface, bem passado, pouco sal..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          <ScrollArea className="h-full">
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1.5">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">ingredientes</h4>
              </div>
              <ul className="list-inside list-disc text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </ScrollArea>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={quantity === 0}
          variant={quantity === 0 ? "ghost" : "default"}
          className={`w-full rounded-full font-bold ${quantity === 0 ? "line-through" : "font-extrabold"}`}
        >
          Adicionar à sacola
        </Button>
      </div>
      <CartSheet />
    </>
  );
};

export default DetailsProduct;
