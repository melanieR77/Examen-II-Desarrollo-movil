import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaProductos from './screens/ListaProductos';
import DetalleProducto from './screens/DetalleProducto';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Formulario">
        <Stack.Screen name="Formulario" component={ListaProductos} />
        <Stack.Screen name="Detalle" component={DetalleProducto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}