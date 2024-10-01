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
    destination: Cesium.Cartesian3.fromDegrees(-70.65192, -33.44990, 700),
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
      nombre: "Departamento Santiago Centro",
      direccion: "Alameda 1112, Santiago, Chile",
      longitud: -70.65172,
      latitud: -33.44468,
      altura: 617,
      imagenes: [
        "./imagenes/alameda1112/alameda1112-1.jpg",
        "./imagenes/alameda1112/alameda1112-2.jpg",
        "./imagenes/alameda1112/alameda1112-3.jpg",
      ],
      descripcion: "Departamento moderno en el corazón de la ciudad, con fácil acceso a transporte y servicios.",
      precio: "$150,000",
      habitaciones: 3,
      baños: 2,
      area: "120 m²",
      tipo: "Departamento",
      estado: "En venta",
    }
    // Puedes agregar más propiedades según sea necesario
  ];

  // Itera sobre el arreglo de propiedades y agrega un marcador para cada una
  propiedades.forEach((propiedad) => {
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(propiedad.longitud, propiedad.latitud, propiedad.altura),
      billboard: {
        image: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        width: 32,
        height: 32,
      },
      id: `propiedad-${propiedad.id}`,
      propiedad: propiedad, // Adjunta la información de la propiedad usando una propiedad personalizada
    });
  });

  // Manejador de eventos para clics en los marcadores
  handler.setInputAction(function (movement) {
    const pickedObject = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.propiedad) {
      const propiedad = pickedObject.id.propiedad;

      // Genera un ID único para el carrusel
      const carouselId = `carouselImages-${propiedad.id}`;

      // Genera el contenido del carrusel de imágenes
      let carouselContent = '';
      if (propiedad.imagenes && propiedad.imagenes.length > 0) {
        propiedad.imagenes.forEach((imagen, index) => {
          carouselContent += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${imagen}" class="d-block mx-auto" alt="${propiedad.nombre}">
            </div>
          `;
        });
      } else {
        // Si no hay imágenes, mostrar una imagen de marcador de posición
        carouselContent = `
          <div class="carousel-item active">
            <img src="ruta_a_imagen_placeholder.jpg" class="d-block mx-auto" alt="Sin imagen disponible">
          </div>
        `;
      }

      // Inserta el contenido en el modal
      document.getElementById('infoModalLabel').innerText = propiedad.nombre;
      document.getElementById('modal-body-content').innerHTML = `
        <p><strong>Precio:</strong> ${propiedad.precio}</p>
        <p><strong>Habitaciones:</strong> ${propiedad.habitaciones}</p>
        <p><strong>Baños:</strong> ${propiedad.baños}</p>
        <p><strong>Área:</strong> ${propiedad.area}</p>
        <p><strong>Tipo:</strong> ${propiedad.tipo}</p>
        <p><strong>Estado:</strong> ${propiedad.estado}</p>
        <p>${propiedad.descripcion}</p>
        <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            ${carouselContent}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Anterior</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Siguiente</span>
          </button>
        </div>
      `;

      // Muestra el modal
      const myModal = new bootstrap.Modal(document.getElementById('infoModal'), {});
      myModal.show();
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

// Llama a la función para inicializar Cesium
initializeCesium();
