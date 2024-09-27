// Tu token de Cesium Ion
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWM4ZDZkZC1kNGJiLTQ0ZmYtYWY5YS0yOTkxYmMwZWEzNzgiLCJpZCI6MTQzMzQ5LCJpYXQiOjE2ODU1ODMyNTF9.XCbRaWuxPduSbJV50pLfEs8hW9BQbvnIgvFWlgu0llE';

// Función para inicializar Cesium
async function initializeCesium() {
  // Inicializa el visor de Cesium
  const viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false,
    animation: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    globe: false,
  });

  // Habilita la atmósfera
  viewer.scene.skyAtmosphere.show = true;

  // Agrega las Photorealistic 3D Tiles
  try {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    viewer.scene.primitives.add(tileset);
  } catch (error) {
    console.log(`Error al cargar las Photorealistic 3D Tiles: ${error}`);
  }

  // Mueve la cámara a una ubicación específica (Santiago, Chile)
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-70.6500, -33.4400, 800),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    }
  });

  // Declarar el manejador de eventos
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  // Arreglo de propiedades
  const propiedades = [
    {
      id: 1,
      nombre: "Departamento en Santiago Centro",
      direccion: "Av. Libertador Bernardo O'Higgins 1234, Santiago, Chile",
      longitud: -70.6506,
      latitud: -33.4372,
      altura: 800,
      imagen: "ruta_a_imagen_1.jpg",
      descripcion: "Hermoso departamento de 2 dormitorios...",
    },
    {
      id: 2,
      nombre: "Casa en Providencia",
      direccion: "Los Leones 5678, Providencia, Chile",
      longitud: -70.6200,
      latitud: -33.4310,
      altura: 800,
      imagen: "ruta_a_imagen_2.jpg",
      descripcion: "Amplia casa familiar con jardín...",
    },
    // Agrega más propiedades según sea necesario
  ];

  // Itera sobre el arreglo de propiedades y agrega un marcador para cada una
  propiedades.forEach((propiedad) => {
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(propiedad.longitud, propiedad.latitud, propiedad.altura),
      billboard: {
        image: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Puedes usar un ícono genérico o específico por propiedad
        width: 32,
        height: 32,
      },
      id: `propiedad-${propiedad.id}`, // Usa un identificador único
      properties: propiedad, // Adjunta la información de la propiedad al marcador
    });
  });

  // Manejador de eventos para clics en los marcadores
  handler.setInputAction(function (movement) {
    console.log('Evento de clic detectado');
    const pickedObject = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.properties) {
      const propiedad = pickedObject.id.properties;

      // Actualiza el contenido del modal con la información de la propiedad
      document.getElementById('infoModalLabel').innerText = propiedad.nombre;
      document.getElementById('modal-body-content').innerHTML = `
        <p>${propiedad.descripcion}</p>
        <img src="${propiedad.imagen}" alt="${propiedad.nombre}" style="width: 100%;">
      `;

      // Muestra el modal
      const myModal = new bootstrap.Modal(document.getElementById('infoModal'), {});
      myModal.show();
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

// Llama a la función para inicializar Cesium
initializeCesium();
