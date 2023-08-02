import { Card, DonutChart, Title } from '@tremor/react'
import React from 'react'

const ChartDonut = () => {

    const cities = [
        {
            name: 'Buenos Aires',
            sales: 500,
        },
        {
            name: 'Mendoza',
            sales: 100,
        },
    ]
  return (
    <Card>
        <Title>Sales by City</Title>
        <DonutChart data={cities}
        category='sales'
        dataKey='name'
        marginTop='mt-6'
        color={["yellow", "violet", "indigo", "rose", "cyan", "green"]}/>
    </Card>
  )
}

export default ChartDonut