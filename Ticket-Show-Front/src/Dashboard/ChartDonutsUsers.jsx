import { Card, DonutChart, Title } from '@tremor/react'
import React from 'react'

const ChartDonutUsers = () => {

    const Usuarios = [
        {
            name: 'Habilitados',
            status: 500,
        },
        {
            name: 'Deshabilitados',
            status: 100,
        },
        
    ]
  return (
    <Card>
        <Title>Cuentas de usuarios</Title>
        <DonutChart data={Usuarios}
        category='status'
        dataKey='name'
        marginTop='mt-6'
        color={["yellow", "violet", "indigo", "rose", "cyan", "green"]}/>
    </Card>
  )
}

export default ChartDonutUsers