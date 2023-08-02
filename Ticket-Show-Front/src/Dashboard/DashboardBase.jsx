import { Card, Grid, Tab, TabGroup, TabList, Text, Title, TabPanel, TabPanels } from '@tremor/react'
import React, { useState } from 'react'
import CardGridMap from './CardGridMap';
import ChartDonut from './ChartDonut';
import TableBase from './TableBase';

const DashboardBase = () => {

    const [selectedView, setSelectedView] = useState(1)


  return (
    <main className="bg-slate-200 p-6 sm:p-10">
      <Title>Dashboard</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      <TabGroup defaultValue={selectedView} handleSelect={value => setSelectedView(value)} marginTop='mt-6'>
        <TabList>
          <Tab value={1}>Overview</Tab>
          <Tab value={2}>Detail</Tab>
        </TabList>
        <TabPanels>
          {selectedView === 1 ? (
            <TabPanel>
                <CardGridMap/>
              {/* <Grid numColsMd={2} numColsLg={3} marginTop='mt-6' gapX="gap-x-6" gapY="gap-y-6" >
                <Card>
                  <div className="h-28 bg-indigo-200"/>
                </Card>
                <Card>
                  <div className="h-28 bg-indigo-300"/>
                </Card>
                <Card>
                  <div className="h-28 bg-indigo-400"/>
                </Card>
              </Grid> */}

              <div className="mt-6">
                <ChartDonut/>
              </div>
            </TabPanel>
          ) : (
              <TabPanel>
                  <TableBase/>
              </TabPanel>
          )}
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default DashboardBase