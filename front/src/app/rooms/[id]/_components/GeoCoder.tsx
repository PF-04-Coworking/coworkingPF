import axios from 'axios';

const geocodeAddress = async (address: string) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      throw new Error('No se encontraron coordenadas para la dirección proporcionada.');
    }
  } catch (error) {
    console.error('Error en la geocodificación:', error);
    throw error;
  }
};

export default geocodeAddress;
