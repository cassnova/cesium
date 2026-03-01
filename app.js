// Tu token de Cesium Ion
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3OWM4ZDZkZC1kNGJiLTQ0ZmYtYWY5YS0yOTkxYmMwZWEzNzgiLCJpZCI6MTQzMzQ5LCJpYXQiOjE2ODU1ODMyNTF9.XCbRaWuxPduSbJV50pLfEs8hW9BQbvnIgvFWlgu0llE";

// Función para inicializar Cesium
async function initializeCesium() {
  // Inicializa el visor de Cesium
  const viewer = new Cesium.Viewer("cesiumContainer", {
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
    },
  });

  // Mueve la cámara a una ubicación específica (Santiago, Chile)
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-70.65192, -33.4499, 700),
    orientation: {
      heading: Cesium.Math.toRadians(0.0),
      pitch: Cesium.Math.toRadians(-15.0),
    },
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
      descripcion:
        "Departamento moderno en el corazón de la ciudad, con fácil acceso a transporte y servicios.",
      precio: "$150,000",
      habitaciones: 3,
      baños: 2,
      area: "120 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 2,
      nombre: "Departamento Santiago Centro",
      direccion: "Alameda 1112, Santiago, Chile",
      longitud: -70.6505,
      latitud: -33.4451,
      altura: 617,
      imagenes: [
        "./imagenes/alameda1112/alameda1112-1.jpg",
        "./imagenes/alameda1112/alameda1112-2.jpg",
        "./imagenes/alameda1112/alameda1112-3.jpg",
      ],
      descripcion:
        "Departamento moderno en el corazón de la ciudad, con fácil acceso a transporte y servicios.",
      precio: "$150,000",
      habitaciones: 3,
      baños: 2,
      area: "120 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 3,
      nombre: "Departamento Santiago Centro",
      direccion: "Alameda 1112, Santiago, Chile",
      longitud: -70.6498,
      latitud: -33.4442,
      altura: 617,
      imagenes: [
        "./imagenes/alameda1112/alameda1112-1.jpg",
        "./imagenes/alameda1112/alameda1112-2.jpg",
        "./imagenes/alameda1112/alameda1112-3.jpg",
      ],
      descripcion:
        "Departamento moderno en el corazón de la ciudad, con fácil acceso a transporte y servicios.",
      precio: "$150,000",
      habitaciones: 3,
      baños: 2,
      area: "120 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 4,
      nombre: "Departamento Santiago Centro",
      direccion: "Alameda 1112, Santiago, Chile",
      longitud: -70.6523,
      latitud: -33.4439,
      altura: 617,
      imagenes: [
        "./imagenes/alameda1112/alameda1112-1.jpg",
        "./imagenes/alameda1112/alameda1112-2.jpg",
        "./imagenes/alameda1112/alameda1112-3.jpg",
      ],
      descripcion:
        "Departamento moderno en el corazón de la ciudad, con fácil acceso a transporte y servicios.",
      precio: "$150,000",
      habitaciones: 3,
      baños: 2,
      area: "120 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 5,
      nombre: "Departamento Santiago Centro",
      direccion: "Alameda 1112, Santiago, Chile",
      longitud: -70.6531,
      latitud: -33.4458,
      altura: 617,
      imagenes: [
        "./imagenes/alameda1112/alameda1112-1.jpg",
        "./imagenes/alameda1112/alameda1112-2.jpg",
        "./imagenes/alameda1112/alameda1112-3.jpg",
      ],
      descripcion:
        "Departamento moderno en el corazón de la ciudad, con fácil acceso a transporte y servicios.",
      precio: "$150,000",
      habitaciones: 3,
      baños: 2,
      area: "120 m²",
      tipo: "Departamento",
      estado: "Arriendo",
    },

    {
      id: 6,
      nombre: "Departamento Santiago Centro",
      direccion: "Alameda 1112, Santiago, Chile",
      longitud: -70.6419,
      latitud: -33.4372,
      altura: 617,
      imagenes: [
        "./imagenes/alameda1112/alameda1112-1.jpg",
        "./imagenes/alameda1112/alameda1112-2.jpg",
        "./imagenes/alameda1112/alameda1112-3.jpg",
      ],
      descripcion:
        "Departamento moderno en el corazón de la ciudad, con fácil acceso a transporte y servicios.",
      precio: "$150,000",
      habitaciones: 3,
      baños: 2,
      area: "120 m²",
      tipo: "Departamento",
      estado: "Arriendo",
    },

    {
      id: 7,
      nombre: "Departamento Santiago Centro",
      direccion: "Alameda 1112, Santiago, Chile",
      longitud: -70.6444,
      latitud: -33.4416,
      altura: 617,
      imagenes: [
        "./imagenes/alameda1112/alameda1112-1.jpg",
        "./imagenes/alameda1112/alameda1112-2.jpg",
        "./imagenes/alameda1112/alameda1112-3.jpg",
      ],
      descripcion:
        "Departamento moderno en el corazón de la ciudad, con fácil acceso a transporte y servicios.",
      precio: "$150,000",
      habitaciones: 3,
      baños: 2,
      area: "120 m²",
      tipo: "Departamento",
      estado: "Arriendo",
    },

    {
      id: 8,
      nombre: "Casa La Reina",
      direccion: "La Reina, Santiago",
      longitud: -70.5451,
      latitud: -33.4403,
      altura: 670,
      imagenes: [
        "./imagenes/lareina/lareina-1.jpg",
        "./imagenes/lareina/lareina-2.jpg",
      ],
      descripcion: "Casa amplia en barrio residencial",
      precio: "$320,000",
      habitaciones: 4,
      baños: 3,
      area: "180 m²",
      tipo: "Casa",
      estado: "Arriendo",
    },

    {
      id: 9,
      nombre: "Depto Ñuñoa",
      direccion: "Ñuñoa, Santiago",
      longitud: -70.5994,
      latitud: -33.4569,
      altura: 620,
      imagenes: [],
      descripcion: "Excelente conectividad",
      precio: "$180,000",
      habitaciones: 2,
      baños: 2,
      area: "85 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 10,
      nombre: "Depto Ñuñoa",
      direccion: "Ñuñoa, Santiago",
      longitud: -70.6451,
      latitud: -33.4423,
      altura: 620,
      imagenes: [],
      descripcion: "Excelente conectividad",
      precio: "$180,000",
      habitaciones: 2,
      baños: 2,
      area: "85 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 11,
      nombre: "Depto Ñuñoa",
      direccion: "Ñuñoa, Santiago",
      longitud: -70.6462,
      latitud: -33.4431,
      altura: 620,
      imagenes: [],
      descripcion: "Excelente conectividad",
      precio: "$180,000",
      habitaciones: 2,
      baños: 2,
      area: "85 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 12,
      nombre: "Depto Ñuñoa",
      direccion: "Ñuñoa, Santiago",
      longitud: -70.6435,
      latitud: -33.439,
      altura: 620,
      imagenes: [],
      descripcion: "Excelente conectividad",
      precio: "$180,000",
      habitaciones: 2,
      baños: 2,
      area: "85 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 13,
      nombre: "Depto Ñuñoa",
      direccion: "Ñuñoa, Santiago",
      longitud: -70.6591,
      latitud: -33.4418,
      altura: 620,
      imagenes: [],
      descripcion: "Excelente conectividad",
      precio: "$180,000",
      habitaciones: 2,
      baños: 2,
      area: "85 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 14,
      nombre: "Depto Ñuñoa",
      direccion: "Ñuñoa, Santiago",
      longitud: -70.66,
      latitud: -33.4427,
      altura: 620,
      imagenes: [],
      descripcion: "Excelente conectividad",
      precio: "$180,000",
      habitaciones: 2,
      baños: 2,
      area: "85 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 15,
      nombre: "Depto Ñuñoa",
      direccion: "Ñuñoa, Santiago",
      longitud: -70.6584,
      latitud: -33.4435,
      altura: 620,
      imagenes: [],
      descripcion: "Excelente conectividad",
      precio: "$180,000",
      habitaciones: 2,
      baños: 2,
      area: "85 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 16,
      nombre: "Depto Ñuñoa",
      direccion: "Ñuñoa, Santiago",
      longitud: -70.6509,
      latitud: -33.4512,
      altura: 620,
      imagenes: [],
      descripcion: "Excelente conectividad",
      precio: "$180,000",
      habitaciones: 2,
      baños: 2,
      area: "85 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 17,
      nombre: "Depto Ñuñoa",
      direccion: "Ñuñoa, Santiago",
      longitud: -70.6517,
      latitud: -33.452,
      altura: 620,
      imagenes: [],
      descripcion: "Excelente conectividad",
      precio: "$180,000",
      habitaciones: 2,
      baños: 2,
      area: "85 m²",
      tipo: "Departamento",
      estado: "En venta",
    },

    {
      id: 18,
      nombre: "Depto Ñuñoa",
      direccion: "Ñuñoa, Santiago",
      longitud: -70.6498,
      latitud: -33.4504,
      altura: 620,
      imagenes: [],
      descripcion: "Excelente conectividad",
      precio: "$180,000",
      habitaciones: 2,
      baños: 2,
      area: "85 m²",
      tipo: "Departamento",
      estado: "En venta",
    },
    // Puedes agregar más propiedades según sea necesario
  ];

  // Itera sobre el arreglo de propiedades y agrega un marcador para cada una
  propiedades.forEach((propiedad) => {
    viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(
        propiedad.longitud,
        propiedad.latitud,
        propiedad.altura,
      ),
      billboard: {
        image: obtenerIconoPorEstado(propiedad.estado),
        width: 36,
        height: 36,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      },
      id: `propiedad-${propiedad.id}`,
      propiedad: propiedad, // Adjunta la información de la propiedad usando una propiedad personalizada
    });
  });

  // Manejador de eventos para clics en los marcadores
  handler.setInputAction(function (movement) {
    const pickedObject = viewer.scene.pick(movement.position);

    if (!Cesium.defined(pickedObject) || !pickedObject.id) return;

    // ===============================
    // 👉 PROPIEDADES (markers)
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

      document.getElementById("infoModalLabel").innerText = propiedad.nombre;

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
  </div>

  <hr>
  <p>${propiedad.descripcion}</p>
</div>

    </div>
  `;
    }

    // ===============================
    // 👉 TERRENOS (polígonos)
    // ===============================
    if (pickedObject.id.terreno) {
      const terreno = pickedObject.id.terreno;

      document.getElementById("infoModalLabel").innerText = terreno.nombre;

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
  </div>

  <hr>
  <p>${terreno.descripcion}</p>
</div>
  `;
    }

    const myModal = new bootstrap.Modal(document.getElementById("infoModal"));
    myModal.show();
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  function filtrarPropiedades(categoria) {
    const entidades = viewer.entities.values;

    entidades.forEach((entidad) => {
      // 🔹 Propiedades (markers)
      if (entidad.propiedad) {
        if (categoria === "inicio") {
          entidad.show = true;
        } else {
          entidad.show = entidad.propiedad.estado.toLowerCase() === categoria;
        }
      }

      // 🔹 Terrenos (polígonos)
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
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      link.classList.remove("active");
    });

    elemento.classList.add("active");
  }

  document
    .getElementById("filtro-inicio")
    .addEventListener("click", function (e) {
      e.preventDefault();
      filtrarPropiedades("inicio");
      actualizarNavActivo(document.getElementById("filtro-inicio"));
    });

  document
    .getElementById("filtro-ventas")
    .addEventListener("click", function (e) {
      e.preventDefault();
      filtrarPropiedades("en venta");
      actualizarNavActivo(document.getElementById("filtro-ventas"));
    });

  document
    .getElementById("filtro-arriendo")
    .addEventListener("click", function (e) {
      e.preventDefault();
      filtrarPropiedades("arriendo");
      actualizarNavActivo(document.getElementById("filtro-arriendo"));
    });

  document
    .getElementById("filtro-terrenos")
    .addEventListener("click", function (e) {
      e.preventDefault();
      filtrarPropiedades("terrenos");
      actualizarNavActivo(document.getElementById("filtro-terrenos"));
    });

  document
    .getElementById("filtro-industrial")
    .addEventListener("click", function (e) {
      e.preventDefault();
      filtrarPropiedades("industrial");
      actualizarNavActivo(document.getElementById("filtro-industrial"));
    });

  function obtenerIconoPorEstado(estado) {
    console.log("Estado recibido:", estado);
    const estadoLower = estado.toLowerCase();

    if (estadoLower === "arriendo") {
      return "https://cdn-icons-png.flaticon.com/512/684/684909.png"; // verde
    }

    if (estadoLower === "en venta") {
      return "https://cdn-icons-png.flaticon.com/512/684/684908.png"; // rojo
    }

    if (estadoLower === "industrial") {
      return "https://cdn-icons-png.flaticon.com/512/565/565547.png"; // gris
    }

    return "https://cdn-icons-png.flaticon.com/512/619/619153.png"; // default
  }
}

// Llama a la función para inicializar Cesium
initializeCesium();
