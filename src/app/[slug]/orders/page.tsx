import { db } from '@/lib/prisma'

import { isValidCpf, removeCpfPunctuation } from '../menu/helpers/cpf'
import CpfForm from './components/Cpf-form'
import Orders from './components/Orders'

interface ordersPageProps {
    searchParams : Promise<{cpf: string}>
}


const OrdersPage = async({searchParams} : ordersPageProps) => {
    const {cpf} = await searchParams
    if(!cpf){
       return  <CpfForm/>
    }

    if(!isValidCpf(cpf)){
        return <CpfForm/>
    }

    const orders = await db.order.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        where: {customerCpf: removeCpfPunctuation(cpf)},
        include: {
            restaurant: {
                select: {
                    name: true,
                    avatarImageUrl: true
                }
            },
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })

    return <Orders orders={orders}/>
     
}
 
export default OrdersPage;