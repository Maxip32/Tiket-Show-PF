import { BadgeDelta, Card, Flex, Grid, Metric, ProgressBar, Text } from '@tremor/react'
import React from 'react'

const data = [
    {
        title: 'Sales',
        metric: '$200',
        progress: 16,
        target: '$2000',
        delta: '13%',
        deltaType: 'moderateIncrease'
    },
    {
        title: 'Profit',
        metric: '$1800',
        progress: 16,
        target: '$4000',
        delta: '23%',
        deltaType: 'increase'
    },
    {
        title: 'Customers',
        metric: '1,000',
        progress: 53,
        target: '2,000',
        delta: '10%',
        deltaType: 'moderateDecrease'
    },
]
const CardGridMap = () => {
  return (
    <Grid numColsMd={2} numColsLg={3} marginTop='mt-6' gapX='gap-x-6' gapY='gap-y-6'>
        {
            data.map( (item) => (
                <Card key={item.title}>
                    <Flex alignItems='items-start'>
                        <div>
                            <Text>{item.title}</Text>
                            <Metric>{item.metric}</Metric>
                        </div>
                        <BadgeDelta text={item.delta}></BadgeDelta>
                    </Flex>
                    <Flex marginTop='mt-4' spaceX='space-x-2'>
                        <Text>{`${item.progress}% (${item.metric})`}</Text>
                    </Flex>
                    <ProgressBar percentageValue={item.progress} marginTop='mt-3'/>

                </Card>
            ))
        }
    </Grid>
  )
}

export default CardGridMap