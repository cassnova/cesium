// CesiumJS y acceso al token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWM4ZDZkZC1kNGJiLTQ0ZmYtYWY5YS0yOTkxYmMwZWEzNzgiLCJpZCI6MTQzMzQ5LCJpYXQiOjE2ODU1ODMyNTF9.XCbRaWuxPduSbJV50pLfEs8hW9BQbvnIgvFWlgu0llE';

// Función asíncrona para inicializar Cesium
async function initializeCesium() {
  // Inicializa el visor de Cesium en el contenedor con el ID 'cesiumContainer'.
  const viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false,
    animation: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    globe: false,
  });

  // Permitir la visualización del cielo
  viewer.scene.skyAtmosphere.show = true;

  // Agregar un ícono clickeable en lugar de la zona coloreada
  const entity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-70.6483, -33.4372), // Coordenadas del ícono
    billboard: {
      image: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL de la imagen del ícono
      width: 32,
      height: 32,
    }
  });

  // Mover la cámara a la ubicación (Santiago, Chile)
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-70.6483, -33.4372, 400),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    }
  });

  // Agregar evento de clic en el ícono
  viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(click) {
    const pickedObject = viewer.scene.pick(click.position);
    if (Cesium.defined(pickedObject) && pickedObject.id === entity) {
      // Mostrar el modal de Bootstrap al hacer clic en el ícono
      const modal = new bootstrap.Modal(document.getElementById('infoModal'));
      modal.show();
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

// Llamar a la función para inicializar Cesium
initializeCesium();
