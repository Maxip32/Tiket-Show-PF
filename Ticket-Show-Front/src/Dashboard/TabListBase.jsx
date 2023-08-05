import { Badge, Card, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react';
import { BoltIcon, CircleStackIcon, UsersIcon } from '@heroicons/react/24/solid';
import TableUsers from './TableUsers';
import DashboardBase from './DashboardBase';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Switch } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { getUserById, updateUser } from '../redux/actions';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const TabListBase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const users = useSelector((state) => state?.user);
  const [localUsers, setLocalUsers] = useState([]);
  const [selectedView, setSelectedView] = useState(1);
  const [selectedView2, setSelectedView2] = useState(1);
  const usersList = useSelector((state) => state?.user);

  useEffect(() => {
    // Actualizamos la lista local de usuarios solo cuando se monta el componente por primera vez.
    // No lo actualizamos nuevamente en el efecto porque lo haremos con los cambios de roles o estado de habilitado/deshabilitado.
    setLocalUsers(usersList);
  }, [usersList]);

  const findUserByEmail = (email) => usersList?.find((user) => user?.email === email);

  const changeRol = async (email) => {
    const findUser = findUserByEmail(email);
    if (!findUser) return;

    const roles = ['admin', 'customer', 'artist'];
    const currentRoleIndex = roles.indexOf(findUser.role);
    const nextRoleIndex = (currentRoleIndex + 1) % roles.length;
    const updatedUser = { ...findUser, role: roles[nextRoleIndex] };
    const updatedLocalUsers = localUsers.map((user) =>
      user.email === email ? updatedUser : user
    );

    try {
      // Actualizar el rol del usuario en la base de datos
      await dispatch(updateUser(updatedUser));
      // Después de actualizar el usuario en el servidor, actualizamos la lista local con los datos más recientes.
         dispatch(getUserById());
      // Actualizar el estado global de usuarios con la información más reciente desde el servidor
      
    } catch (error) {
      // Manejar el error si es necesario
      console.error('Error al actualizar el rol del usuario:', error);
    }
  };
  
  const changeDisabled = async (email) => {
    const findUser = findUserByEmail(email);
    if (!findUser) return;
  
    const updatedUser = { ...findUser, disabled: !findUser.disabled };
  
    try {
      await dispatch(updateUser(updatedUser));
      // Actualizar el estado de habilitado/deshabilitado del usuario en la base de datos
       dispatch(getUserById());
    } catch (error) {
      // Manejar el error si es necesario
      console.error('Error al actualizar el estado del usuario:', error);
    }
  };

  useEffect(() => {
    // Actualizamos la lista local de usuarios solo cuando se monta el componente por primera vez.
    // No lo actualizamos nuevamente en el efecto porque lo haremos con los cambios de roles o estado de habilitado/deshabilitado.
    setLocalUsers(usersList);
    
  }, [usersList]);

  if (!user) {
    // Si el usuario no está autenticado, mostrar un mensaje o redireccionar a la página de inicio de sesión.
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Tienes que estar autenticado',
      showConfirmButton: false,
      timer: 2500,
    });
    navigate('/');
  }

  
  return (
    <main className="bg-slate-200 p-6 sm:p-10">
      <Title>Panel de administrador</Title>
      <Text>Gráficos y Detalles</Text>
      <TabGroup defaultValue={selectedView} handleSelect={(value) => setSelectedView(value)} marginTop="mt-6">
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
            <DashboardBase />
          </TabPanel>
          <TabPanel>
            <TabGroup defaultValue={selectedView2} handleSelect={(value) => setSelectedView2(value)} marginTop="mt-6">
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
                    <Table marginTop="mt-4">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell>Email</TableHeaderCell>
                          <TableHeaderCell>Rol</TableHeaderCell>
                          <TableHeaderCell>Cambio de Rol</TableHeaderCell>
                          <TableHeaderCell>Estado</TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {localUsers?.map((item) => (
                          <TableRow key={item.email}>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.role}</TableCell>
                            <TableCell>
                              <div className="mb-4">
                                <span className="enabled">Habilitado</span>
                                <Switch
                                  key={`disabled-switch-${item.email}`}
                                  checked={!item.disabled}
                                  onClick={() => changeDisabled(item.email)}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <span className="disabled">Deshabilitado</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <button
                                className="bg-primaryColor hover:bg-primaryColorDark text-white font-bold py-2 px-4 rounded"
                                onClick={() => changeRol(item.email)}
                              >
                                Cambiar Rol
                              </button>
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
