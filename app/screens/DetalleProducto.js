import { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';

const API_URL = 'http://192.168.0.19:3000';

console.warn();

export default function DetalleProducto() {
  const [productos, setProductos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);

  const cargarProductos = async () => {
    const respuesta = await fetch(API_URL + '/productos');
    const datos = await respuesta.json();
    setProductos(datos);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const eliminarProducto = async () => {
    if (!seleccionado) return;

    await fetch(API_URL + '/items/' + seleccionado.id, {
      method: 'DELETE',
    });

    alert('Producto eliminado');
    setSeleccionado(null);
    cargarProductos();
  };

  return (
    <View style={estilos.contenedor}>
      <View style={estilos.fila}>
        <Text style={estilos.celdaTitulo}>Nombre</Text>
        <Text style={estilos.celdaTitulo}>Precio</Text>
        <Text style={estilos.celdaTitulo}>Descripcion</Text>
      </View>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.fila}>
            <Text style={estilos.celda}>{item.nombre}</Text>
            <Text style={estilos.celda}>{item.precio}</Text>
            <Button title="Ver" onPress={() => setSeleccionado(item)} color="#3aa655" />
          </View>
        )}
      />

      {seleccionado && (
        <View style={estilos.detalle}>
          <Text style={estilos.tituloDetalle}>Detalle</Text>
          <Text>Ver detalle del item</Text>

          {seleccionado.fotografia && (
            <Image source={{ uri: seleccionado.fotografia }} style={estilos.imagen} />
          )}

          <Text>Nombre: {seleccionado.nombre}</Text>
          <Text>Descripcion: {seleccionado.descripcion}</Text>
          <Text>Estado: {seleccionado.estado}</Text>
          <Text>Categoria: {seleccionado.categoria}</Text>
          <Text>Precio: {seleccionado.precio}</Text>

          <View style={estilos.espacio}>
            <Button title="Eliminar" onPress={eliminarProducto} color="#e07a6b" />
          </View>
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  celdaTitulo: {
    fontWeight: 'bold',
    flex: 1,
  },
  celda: {
    flex: 1,
  },
  detalle: {
    marginTop: 20,
    alignItems: 'center',
  },
  tituloDetalle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  espacio: {
    marginTop: 15,
  },
});