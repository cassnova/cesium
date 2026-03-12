// Tu token de Cesium Ion
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWM4ZDZkZC1kNGJiLTQ0ZmYtYWY5YS0yOTkxYmMwZWEzNzgiLCJpZCI6MTQzMzQ5LCJpYXQiOjE2ODU1ODMyNTF9.XCbRaWuxPduSbJV50pLfEs8hW9BQbvnIgvFWlgu0llE";

let viewer;

const pinBuilder = new Cesium.PinBuilder();

function obtenerPinPorEstado(estado) {
  const estadoLower = estado.toLowerCase();

  if (estadoLower === "en venta") {
    return pinBuilder.fromText("V", Cesium.Color.RED, 48).toDataURL();
  }

  if (estadoLower === "arriendo") {
    return pinBuilder.fromText("A", Cesium.Color.BLUE, 48).toDataURL();
  }

  if (estadoLower === "industrial") {
    return pinBuilder.fromText("I", Cesium.Color.GRAY, 48).toDataURL();
  }

  return pinBuilder.fromText("?", Cesium.Color.WHITE, 48).toDataURL();
}

// BUG FIX #1: cargarPropiedades() solo se llama UNA vez, desde initializeCesium()
async function cargarPropiedades() {
  const response = await fetch("propiedades.json");
  const propiedades = await response.json();

  console.log(propiedades);

  propiedades.forEach((propiedad) => {
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(
        propiedad.longitud,
        propiedad.latitud,
        propiedad.altura,
      ),
      billboard: {
        image: obtenerPinPorEstado(propiedad.estado),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      },
      id: `propiedad-${propiedad.id}`,
      propiedad: propiedad,
    });
  });
}

// Función para inicializar Cesium
async function initializeCesium() {
  viewer = new Cesium.Viewer("cesiumContainer", {
    timeline: false,
    animation: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    globe: false,
  });

  // Habilita la atmósfera
  viewer.scene.skyAtmosphere.show = true;

  // Agrega las Photorealistic 3D Tiles PRIMERO (BUG FIX #6: orden lógico correcto)
  try {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    viewer.scene.primitives.add(tileset);
  } catch (error) {
    console.log(`Error al cargar las Photorealistic 3D Tiles: ${error}`);
  }

  // Cargar propiedades DESPUÉS del mapa (BUG FIX #6)
  await cargarPropiedades();

  const terrenoCentro = [
    -70.64610786283637, -33.44585019035611, 600, -70.64557301936131,
    -33.44569668352337, 600, -70.64548198217405, -33.44599261913323, 600,
    -70.64605096459435, -33.44610497944793, 600,
  ];

  viewer.entities.add({
    id: "terreno-1",
    name: "Terreno Santiago Centro",
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(terrenoCentro),
      material: Cesium.Color.BLUE.withAlpha(0.5),
      outline: true,
      outlineColor: Cesium.Color.GREEN,
      perPositionHeight: true,
    },
    terreno: {
      nombre: "Terreno Santiago Centro",
      tipo: "Terreno",
      estado: "En venta",
      precio: "$850.000.000",
      area: "1.200 m²",
      descripcion:
        "Terreno apto para desarrollo inmobiliario en Santiago Centro",
      coordenadas: [
        -70.64610786283637, -33.44585019035611, 600, -70.64557301936131,
        -33.44569668352337, 600, -70.64548198217405, -33.44599261913323, 600,
        -70.64605096459435, -33.44610497944793, 600,
      ],
    },
  });

  // Mueve la cámara a Santiago, Chile
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-70.65192, -33.4499, 700),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    },
  });

  // Declarar el manejador de eventos
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

  let entidadAnterior = null;

  // HOVER: escalar marker al pasar el mouse
  handler.setInputAction(function (movement) {
    const pickedObject = viewer.scene.pick(movement.endPosition);

    if (!Cesium.defined(pickedObject) || !pickedObject.id) {
      if (entidadAnterior && entidadAnterior.billboard) {
        entidadAnterior.billboard.scale = 1.0;
      }
      entidadAnterior = null;
      return;
    }

    const entidad = pickedObject.id;

    // SOLO si tiene billboard (markers)
    if (!entidad.billboard) return;

    if (
      entidadAnterior &&
      entidadAnterior !== entidad &&
      entidadAnterior.billboard
    ) {
      entidadAnterior.billboard.scale = 1.0;
    }

    entidad.billboard.scale = 1.3;
    entidadAnterior = entidad;
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

  // ===============================
  // HELPER: FlyTo centrado sobre el icono
  // Usa flyToBoundingSphere para quedar justo encima del punto
  // ===============================
  function volarHacia(longitud, latitud, callback) {
    const distancia = 0.0015; // desplazamiento (~150m aprox)

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        longitud - distancia,
        latitud - distancia,
        750,
      ),
      orientation: {
        heading: Cesium.Math.toRadians(35),
        pitch: Cesium.Math.toRadians(-15),
        roll: 0,
      },
      duration: 1.8,
      complete: callback,
    });
  }
  // function volarHacia(longitud, latitud, callback) {
  //   viewer.camera.flyTo({
  //     destination: Cesium.Cartesian3.fromDegrees(
  //       longitud,
  //       latitud,
  //       750, // 👈 altura real en metros
  //     ),
  //     orientation: {
  //       heading: Cesium.Math.toRadians(0),
  //       pitch: Cesium.Math.toRadians(-15),
  //       roll: 0,
  //     },
  //     duration: 1.8,
  //     complete: callback,
  //   });
  // }

  // ===============================
  // HELPER: Calcular centroide de un polígono
  // ===============================
  function calcularCentroide(coordenadasFlat) {
    // coordenadasFlat = [lon, lat, alt, lon, lat, alt, ...]
    let sumLon = 0,
      sumLat = 0;
    const puntos = coordenadasFlat.length / 3;
    for (let i = 0; i < coordenadasFlat.length; i += 3) {
      sumLon += coordenadasFlat[i];
      sumLat += coordenadasFlat[i + 1];
    }
    return { longitud: sumLon / puntos, latitud: sumLat / puntos };
  }

  // LEFT_CLICK: flyTo + abrir modal con información
  handler.setInputAction(function (movement) {
    const pickedObject = viewer.scene.pick(movement.position);

    if (!Cesium.defined(pickedObject) || !pickedObject.id) return;

    // ===============================
    // PROPIEDADES (markers)
    // ===============================
    if (pickedObject.id.propiedad) {
      const propiedad = pickedObject.id.propiedad;

      const carouselId = `carouselImages-${propiedad.id}`;
      let carouselContent = "";

      if (propiedad.imagenes && propiedad.imagenes.length > 0) {
        propiedad.imagenes.forEach((imagen, index) => {
          carouselContent += `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
              <img src="${imagen}" alt="${propiedad.nombre}">
            </div>
          `;
        });
      } else {
        carouselContent = `
          <div class="carousel-item active">
            <img src="https://via.placeholder.com/900x500?text=Sin+Imagen">
          </div>
        `;
      }

      // Campos industriales extra (solo si el tipo es industrial)
      const esIndustrial =
        propiedad.tipo?.toLowerCase() === "industrial" ||
        propiedad.estado?.toLowerCase() === "industrial";

      const infoIndustrial = esIndustrial
        ? `
        <div class="info-item">
          <i class="bi bi-lightning-charge"></i>
          <span>${propiedad.potenciaElectrica ?? "No especificado"}</span>
        </div>
        <div class="info-item">
          <i class="bi bi-truck"></i>
          <span>${propiedad.accesoVehiculos ?? "No especificado"}</span>
        </div>
        <div class="info-item">
          <i class="bi bi-building-gear"></i>
          <span>${propiedad.alturaGalpon ?? "No especificado"}</span>
        </div>
        <div class="info-item">
          <i class="bi bi-boxes"></i>
          <span>${propiedad.zonaUso ?? "No especificado"}</span>
        </div>
      `
        : "";

      document.getElementById("infoModalLabel").innerText = propiedad.nombre;
      document.getElementById("modal-status").innerText = propiedad.estado;

      document.getElementById("modal-body-content").innerHTML = `
        <div class="modal-layout">
          <div class="modal-images">
            <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                ${carouselContent}
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>

          <div class="modal-info">
            <div class="precio-destacado">${propiedad.precio}</div>

            <div class="info-grid">
              <div class="info-item">
                <i class="bi bi-door-open"></i>
                <span>${propiedad.habitaciones} Habitaciones</span>
              </div>
              <div class="info-item">
                <i class="bi bi-droplet"></i>
                <span>${propiedad.baños} Baños</span>
              </div>
              <div class="info-item">
                <i class="bi bi-aspect-ratio"></i>
                <span>${propiedad.area}</span>
              </div>
              <div class="info-item">
                <i class="bi bi-house"></i>
                <span>${propiedad.tipo}</span>
              </div>
              <div class="info-item">
                <i class="bi bi-tag"></i>
                <span>${propiedad.estado}</span>
              </div>
              ${infoIndustrial}
            </div>

            <hr>
            <p>${propiedad.descripcion}</p>
          </div>
        </div>
      `;

      // FlyTo a la propiedad, luego abrir el modal al terminar la animación
      volarHacia(propiedad.longitud, propiedad.latitud, () => {
        const modalEl = document.getElementById("infoModal");
        const myModal = bootstrap.Modal.getOrCreateInstance(modalEl);
        myModal.show();
      });

      return; // Salir para no ejecutar el show() de abajo
    }

    // ===============================
    // TERRENOS (polígonos)
    // ===============================
    if (pickedObject.id.terreno) {
      const terreno = pickedObject.id.terreno;

      document.getElementById("infoModalLabel").innerText = terreno.nombre;
      document.getElementById("modal-status").innerText = terreno.estado;

      // Campos industriales extra para terrenos industriales
      const esIndustrialTerreno = terreno.tipo?.toLowerCase() === "industrial";

      const infoIndustrialTerreno = esIndustrialTerreno
        ? `
        <div class="info-item">
          <i class="bi bi-lightning-charge"></i>
          <span>${terreno.potenciaElectrica ?? "No especificado"}</span>
        </div>
        <div class="info-item">
          <i class="bi bi-truck"></i>
          <span>${terreno.accesoVehiculos ?? "No especificado"}</span>
        </div>
        <div class="info-item">
          <i class="bi bi-building-gear"></i>
          <span>${terreno.zonaUso ?? "No especificado"}</span>
        </div>
      `
        : "";

      document.getElementById("modal-body-content").innerHTML = `
        <div class="modal-layout">
          <div class="modal-images">
            <img src="https://via.placeholder.com/900x500?text=Terreno"
                 style="width:100%; height:460px; object-fit:cover; border-radius:14px;">
          </div>

          <div class="modal-info">
            <div class="precio-destacado">${terreno.precio}</div>

            <div class="info-grid">
              <div class="info-item">
                <i class="bi bi-bounding-box"></i>
                <span>${terreno.area}</span>
              </div>
              <div class="info-item">
                <i class="bi bi-tree"></i>
                <span>${terreno.tipo}</span>
              </div>
              <div class="info-item">
                <i class="bi bi-tag"></i>
                <span>${terreno.estado}</span>
              </div>
              ${infoIndustrialTerreno}
            </div>

            <hr>
            <p>${terreno.descripcion}</p>
          </div>
        </div>
      `;

      // FlyTo al centroide del terreno, luego abrir modal
      const coords = terreno.coordenadas; // Espera array flat [lon,lat,alt,...] en el objeto terreno
      if (coords) {
        const centro = calcularCentroide(coords);
        volarHacia(centro.longitud, centro.latitud, () => {
          const modalEl = document.getElementById("infoModal");
          const myModal = bootstrap.Modal.getOrCreateInstance(modalEl);
          myModal.show();
        });
      } else {
        // Si no hay coordenadas en el objeto terreno, abrir modal directo
        const modalEl = document.getElementById("infoModal");
        const myModal = bootstrap.Modal.getOrCreateInstance(modalEl);
        myModal.show();
      }

      return;
    }

    // Fallback: mostrar modal si no hubo flyTo
    const modalEl = document.getElementById("infoModal");
    const myModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    myModal.show();
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  // ===============================
  // FILTROS
  // ===============================

  function filtrarPropiedades(categoria) {
    const entidades = viewer.entities.values;

    entidades.forEach((entidad) => {
      // Propiedades (markers)
      if (entidad.propiedad) {
        if (categoria === "inicio") {
          entidad.show = true;
        } else if (categoria === "industrial") {
          // BUG FIX #5: comparación en toLowerCase() en ambos lados
          entidad.show =
            entidad.propiedad.estado.toLowerCase() === "industrial";
        } else {
          entidad.show =
            entidad.propiedad.estado.toLowerCase() === categoria.toLowerCase();
        }
      }

      // Terrenos (polígonos)
      if (entidad.terreno) {
        if (categoria === "inicio") {
          entidad.show = true;
        } else {
          entidad.show = categoria === "terrenos";
        }
      }
    });
  }

  function actualizarNavActivo(elemento) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    elemento.classList.add("active");
  }

  document
    .getElementById("filtro-inicio")
    .addEventListener("click", function (e) {
      e.preventDefault();
      filtrarPropiedades("inicio");
      actualizarNavActivo(this);
    });

  document
    .getElementById("filtro-ventas")
    .addEventListener("click", function (e) {
      e.preventDefault();
      // BUG FIX #5: "en venta" coincide con el estado del JSON (case insensitive)
      filtrarPropiedades("en venta");
      actualizarNavActivo(this);
    });

  document
    .getElementById("filtro-arriendo")
    .addEventListener("click", function (e) {
      e.preventDefault();
      filtrarPropiedades("arriendo");
      actualizarNavActivo(this);
    });

  document
    .getElementById("filtro-terrenos")
    .addEventListener("click", function (e) {
      e.preventDefault();
      filtrarPropiedades("terrenos");
      actualizarNavActivo(this);
    });

  document
    .getElementById("filtro-industrial")
    .addEventListener("click", function (e) {
      e.preventDefault();
      filtrarPropiedades("industrial");
      actualizarNavActivo(this);
    });
}

// BUG FIX #1: Solo se llama initializeCesium() UNA vez.
// cargarPropiedades() ya se invoca internamente desde initializeCesium().
initializeCesium();
