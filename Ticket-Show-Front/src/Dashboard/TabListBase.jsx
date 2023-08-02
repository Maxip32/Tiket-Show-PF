import { Card, Tab, TabGroup, TabList } from '@tremor/react'
import React, { useState } from 'react'
import { HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid'
const TabListBase = () => {

    const [selectedView, setSelectedView] = useState(1)

  return (
    <div>
        

    <TabGroup>

    <TabList 
    handleSelect={value => setSelectedView(value)}
    defaultValue={selectedView} marginTop='mt-6' >

        <Tab value={1} text="Pestaña 1" icon={HandThumbUpIcon}>Pestaña 1</Tab>
        <Tab Value={2} text='Pestaña 2' icon={HandThumbDownIcon}>Pestaña 2</Tab>
    </TabList>

    {
        selectedView === 1 ? (
            <Card>
                <div className='h-28 bg-emerald-300'/>
            </Card>
            ) : (
            <div className='h-28 bg-blue-700'/>
            )
        }
    </TabGroup>
        </div>
  )
}

export default TabListBase