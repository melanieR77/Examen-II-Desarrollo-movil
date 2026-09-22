import { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ListaProductos({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [fotografia, setFotografia] = useState(null);

  const elegirFoto = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permiso.status !== 'granted') {
      alert('Se necesita permiso para acceder a las fotos');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!resultado.canceled) {
      setFotografia(resultado.assets[0].uri);
    }
  };

  const guardarProducto = async () => {
    if (nombre === '' || precio === '') {
      alert('Nombre y precio son obligatorios');
      return;
    }

    const nuevoProducto = {
      nombre: nombre,
      descripcion: descripcion,
      estado: estado,
      categoria: categoria,
      precio: parseFloat(precio),
      fotografia: fotografia,
    };

    await fetch('http://192.168.0.19:3000/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto),
    });

    alert('Producto guardado');
    setNombre('');
    setDescripcion('');
    setCategoria('');
    setPrecio('');
    setFotografia(null);
  };

  return (
    <ScrollView style={estilos.contenedor}>
      <TextInput
        style={estilos.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={estilos.input}
        placeholder="Descripcion"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <TextInput
        style={estilos.input}
        placeholder="Estado (Disponible o No disponible)"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={estilos.input}
        placeholder="Categoria"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TextInput
        style={estilos.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <View style={estilos.contenedorFoto}>
        {fotografia && (
          <Image source={{ uri: fotografia }} style={estilos.imagen} />
        )}
        <Button title="Fotografia Item" onPress={elegirFoto} />
      </View>

      <View style={estilos.espacio}>
        <Button title="Guardar" onPress={guardarProducto} color="#2f6fed" />
      </View>

      <View style={estilos.espacio}>
        <Button
          title="Detalle Items"
          onPress={() => navigation.navigate('Detalle')}
          color="#3aa655"
        />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  contenedorFoto: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagen: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  espacio: {
    marginBottom: 12,
  },
});