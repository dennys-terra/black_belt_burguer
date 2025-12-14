"use client"

import {  OrderStatus, Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/formatCurrency";

interface OrdersProps {
    orders: Array<Prisma.OrderGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true;
                    avatarImageUrl: true;
                }
            }
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    }>>
}

    const getStatusLabel = (status: OrderStatus) => {
        if(status === "FINISHED") return 'Finalizado'
        if(status === "IN_PREPARATION") return 'Em preparo'
        if(status === "PENDING") return 'Pendente'
    }

    const defineColorByStatusOrder = (status: OrderStatus) => {
  if (status === OrderStatus.PENDING) return "bg-red-600"
  if (status === OrderStatus.IN_PREPARATION) return "bg-yellow-400"
  if (status === OrderStatus.FINISHED) return "bg-green-600"

  return "bg-gray-500 text-gray-900"
}


const Orders = ({orders} : OrdersProps) => {
   const router = useRouter()

    const handleBackClick = () => {
        router.back()
    }


    return ( 
        <div className="space-y-6 p-6">
            <Button onClick={handleBackClick} size='icon' variant="secondary" className="rounded-full">
                <ChevronLeftIcon/>
            </Button>
            <div className="flex items-center gap-3">
                <ScrollTextIcon/>
                <h2 className="text-lg font-semibold">
                    Meus Pedidos
                </h2>
            </div>
            {orders.map(order => (
                <Card key={order.id}>
                    <CardContent className="p-5 space-y-4">
                        <div className={` w-fit rounded-full px-2 py-1 text-xs text-gray-600
                            ${defineColorByStatusOrder(order.status)}

                            `}>
                            {getStatusLabel(order.status)}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative h-5 w-5">
                                <Image src={order.restaurant.avatarImageUrl} alt={order.restaurant.name} className="rounded-sm" fill/>
                            </div>
                            <p className="semibold text-sm">{order.restaurant.name}</p>
                        </div>
                        <Separator />
                      <div className="space-y-2">
                          {order.orderProducts.map(orderProduct => (
                            <div key={orderProduct.id} className="flex items-center gap-2 ">
                                <div className="h-5 w-5 flex items-center justify-center rounded-full text-xs font-semibold bg-gray-400 ">
                                    {orderProduct.quantity}
                                </div>
                                <p className="text-sm">{orderProduct.product.name}</p>
                            </div>
                        ) )}
                      </div>
                        <Separator/>
                        <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
     );
}
 
export default Orders;