import { Card, DonutChart, Title } from '@tremor/react'
import React from 'react'

const ChartDonutUsers = () => {

    const Usuarios = [
        {
            name: 'Activos',
            status: 500,
        },
        {
            name: 'Bloqueados',
            status: 100,
        },
        {
            name: 'Inactivos',
            status: 50,

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