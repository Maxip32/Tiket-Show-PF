import { Badge, Card, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import { BoltIcon, CircleStackIcon, UsersIcon } from '@heroicons/react/24/solid'
import TableUsers from './TableUsers'
import DashboardBase from './DashboardBase';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Switch } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { getUserById, updateUser } from "../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const TabListBase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user} = useAuth();
  const users = useSelector((state) => state?.user);
  const [localUsers, setLocalUsers] = useState([]);
  const [initialUsersOrder, setInitialUsersOrder] = useState([]);
  
  useEffect(() => {
    setLocalUsers(users);
    setInitialUsersOrder(users);
    dispatch(getUserById())
  }, [localUsers]);

 
  const findUserByEmail = (email) => localUsers.find((user) => user.email === email);
  
  const changeRol = (email) => {
    const findUser = findUserByEmail(email);
    if (!findUser) return;
    
    const roles = ["admin", "customer", "artist"];
    const currentRoleIndex = roles.indexOf(findUser.role);
    const nextRoleIndex = (currentRoleIndex + 1) % roles.length;
    const updatedUser = { ...findUser, role: roles[nextRoleIndex] };
    const updatedLocalUsers = localUsers.map((user) =>
    user.email === email ? updatedUser : user
    );
    
    setLocalUsers(updatedLocalUsers);
    dispatch(updateUser(updatedUser));
  };
  
  const changeDisabled = async (email) => {
    const findUser = findUserByEmail(email);
    if (!findUser) return;
    
    const updatedUser = { ...findUser, disabled: !findUser.disabled };
    const updatedLocalUsers = localUsers.map((user) =>
    user.email === email ? updatedUser : user
    );
    
    setLocalUsers(updatedLocalUsers);
  
    try {
      // Actualizar el estado global a través de Redux
      await dispatch(updateUser(updatedUser));
    } catch (error) {
      setLocalUsers(updatedLocalUsers);
      console.error("Error al actualizar el usuario:", error);
    }
  };
    
    const [selectedView, setSelectedView] = useState(1)
    const [selectedView2, setSelectedView2] = useState(1)


    if (!user) {
      // Si el usuario no está autenticado, mostrar un mensaje o redireccionar a la página de inicio de sesión.
      
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Tienes que estar autenticado',
          showConfirmButton: false,
          timer: 2500
        })
        navigate("/");
       
      }

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
                              {/* <TableHeaderCell>Nombre</TableHeaderCell> */}
                              <TableHeaderCell>Email</TableHeaderCell>
                              <TableHeaderCell>Rol</TableHeaderCell>
                              <TableHeaderCell>Cambio de Rol</TableHeaderCell>
                              <TableHeaderCell>Estado</TableHeaderCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            
                            {initialUsersOrder?.map((item) => (
                              // <div key={item.email} className="border p-4 w-full md:w-1/2 lg:w-1/4 bg-white rounded-lg">

                              <TableRow key={item.email}>
                                {/* <TableCell>{item.name}</TableCell> */}
                                
                                <TableCell >{item.email}</TableCell>
                                <TableCell>{item.role}</TableCell>
                                <TableCell>

                                <div className="mb-4">
              <span className="enabled">Habilitado</span>
                                <Switch
                key={`disabled-switch-${item.email}`}
                checked={!item.disabled}
                onClick={() => changeDisabled(item.email)}
                inputProps={{ "aria-label": "controlled" }}
                />
              <span className="disabled">Deshabilitado</span>
              </div>
                </TableCell>
              <div className='mt-5'>
              <button
                className="bg-primaryColor hover:bg-primaryColorDark text-white font-bold py-2 px-4 rounded"
                onClick={() => changeRol(item.email)}
                >
                Cambiar Rol
              </button>
            </div>
                                
                              </TableRow>
                                // </div>
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