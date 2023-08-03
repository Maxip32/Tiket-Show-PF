import { Badge, Card, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import React, { useState } from 'react'
import { BoltIcon, CircleStackIcon, HandThumbDownIcon, HandThumbUpIcon, UsersIcon } from '@heroicons/react/24/solid'
import TableUsers from './TableUsers'
import DashboardBase from './DashboardBase';
const TabListBase = () => {

    const datos = [
        {
            "name": "Kenny",
            "email": "kenny@gmail.com",
            "rol": "Administrador",
            "estado": "Activo",
            
        },
        {
            "name": "Maximiliano",
            "email": "maxi@gmail.com",
            "rol": "Administrador",
            "estado": "Activo",
        },
        {
            "name": "Darwin",
            "email": "darwin@gmail.com",
            "rol": "Administrador",
            "estado": "Activo",
        },
        {
            "name":  "Pedro",
            "email": "pedro@gmail.com",
            "rol":   "Público",
            "estado": "Activo",
        },
        {
            "name": "JuanaBand",
            "email": "juana@gmail.com",
            "rol": "Artista",
            "estado": "Activo",
        },
    
    ]
    const [selectedView, setSelectedView] = useState(1)
    const [selectedView2, setSelectedView2] = useState(1)
    return (
        <main className="bg-slate-200 p-6 sm:p-10">
          <Title>Panel de administrador</Title>
          <Text>Gráficos y Detalles</Text>
          <TabGroup defaultValue={selectedView} handleSelect={value => setSelectedView(value)} marginTop='mt-6'>
            <TabList>
              <Tab value={1} icon={CircleStackIcon}>
                Ventas
              </Tab>
              <Tab value={2} icon={UsersIcon}>
                Usuarios
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
               <DashboardBase/>
              </TabPanel>
              <TabPanel>
                <TabGroup defaultValue={selectedView2} handleSelect={value => setSelectedView2(value)} marginTop='mt-6'>
                  <TabList>
                    <Tab value={1}>Vista Gráfica</Tab>
                    <Tab value={2}>Detalles</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <TableUsers />
                    </TabPanel>
                    <TabPanel>
                      <Card>
                        <Title>Tabla datos de Usuarios</Title>
                        <Table marginTop='mt-4'>
                          <TableHead>
                            <TableRow>
                              <TableHeaderCell>Nombre</TableHeaderCell>
                              <TableHeaderCell>Email</TableHeaderCell>
                              <TableHeaderCell>Rol</TableHeaderCell>
                              <TableHeaderCell>Estado</TableHeaderCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {datos.map((item) => (
                              <TableRow>
                                <TableCell>{item.name}</TableCell>
                                
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.rol}</TableCell>
                                
                                <TableCell>
                                  <Badge text={item.estado} color='teal' icon={BoltIcon}></Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Card>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </main>
      );
    };
    
    export default TabListBase;