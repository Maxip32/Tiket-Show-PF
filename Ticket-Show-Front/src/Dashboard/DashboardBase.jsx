import { Card, Grid, Tab, TabGroup, TabList, Text, Title, TabPanel, TabPanels, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge } from '@tremor/react';
import React, { useState } from 'react';
import CardGridMap from './CardGridMap';
import ChartDonut from './ChartDonut';
import TableBase from './TableBase';
import CardBase from './CardBase';
import { BoltIcon, ShoppingBagIcon } from '@heroicons/react/24/solid';

const DashboardBase = () => {

    const datos = [
        {
            "name": "Diego Torres",
            "cantidad": "1",
            "departement": "Mendoza",
            "monto": "15",
            "status": "active"
        },
        {
            "name": "Luis Miguel",
            "cantidad": "2",
            "departement": "Buenos Aires",
            "monto": "70",
            "status": "active"
        },
        {
            "name": "Boy Band",
            "cantidad": "3",
            "departement": "Buenos Aires",
            "monto": "10",
            "status": "active"
        },
    
    ]
    const [selectedView, setSelectedView] = useState(1);

    return (
        <main className="bg-slate-200 p-6 sm:p-10">
            <Title>Dashboard</Title>
            <Text>Graficos y Detalles de venta</Text>
            <TabGroup defaultValue={selectedView} handleSelect={value => setSelectedView(value)} marginTop='mt-6'>
                <TabList>
                    <Tab value={1}>Vista Gráfica</Tab>
                    <Tab value={2}>Detalles</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <CardGridMap />
                        {/* <Grid numColsMd={2} numColsLg={3} marginTop='mt-6' gapX="gap-x-6" gapY="gap-y-6" >
                            <Card>
                                <div className="h-28 bg-indigo-200" />
                            </Card>
                            <Card>
                                <div className="h-28 bg-indigo-300" />
                            </Card>
                            <Card>
                                <div className="h-28 bg-indigo-400" />
                            </Card>
                        </Grid> */}
                        <div className="mt-6">
                            <ChartDonut />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <Card>
                            <Title>Tabla de datos ventas</Title>
                            <Table marginTop='mt-4'>
                                <TableHead>
                                    <TableRow >
                                        <TableHeaderCell>Nombre del Evento</TableHeaderCell>
                                        <TableHeaderCell>Stock </TableHeaderCell>
                                        <TableHeaderCell>Boletos vendidos</TableHeaderCell>
                                        <TableHeaderCell>Costo del Evento</TableHeaderCell>
                                        <TableHeaderCell>Ciudad del Evento</TableHeaderCell>
                                        <TableHeaderCell>Total de boletos</TableHeaderCell>
                                        <TableHeaderCell>Total $</TableHeaderCell>
                                        <TableHeaderCell>Estado de compra</TableHeaderCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {datos.map((item) => (
                                        <TableRow >
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>100</TableCell>
                                            <TableCell>{item.cantidad}</TableCell>
                                            <TableCell>{item.monto}</TableCell>
                                            <TableCell>{item.departement}</TableCell>
                                            <TableCell>6</TableCell>
                                            <TableCell>95</TableCell>
                                            <TableCell><Badge text={item.status} color='teal' icon={ShoppingBagIcon}></Badge></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </main>
    );
};

export default DashboardBase;