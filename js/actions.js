$("#form-buscar-producto").submit(function (event) {
  event.preventDefault();
  let producto = $("#txt-producto").val();

  var url = "php/process.php";
  $.ajax({
    type: "POST",
    url: url,
    data: {
      action: "buscar_producto",
      producto: producto,
    },
  })
    .done(function (response) {
      if (response != 0) {
        mostrarProductos(response);
      } else {
        mostrarSinResultados();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Error");
    });
});

function mostrarProductos(productosResponse) {
  let productos = JSON.parse(productosResponse);

  let html = `<div class="card-columns">`;
  productos.forEach((producto) => {
    html +=
      `
    <div class="card border-primary">
    <div class="card-body">
      <h5 class="card-title" style="text-align: center; font-weight: bold">
        ` +
      producto.nombre +
      `
      </h5>
      <div class="row justify-content-center">
        <div class="col4" style="text-align: center; font-size: 1.25rem">
          Precio:
        </div>
        <div class="col4" style="text-align: center; font-size: 1.25rem; font-weight: bold; color: #007bff;">
          &nbsp;$` +
      producto.precio +
      `
        </div>
      </div>
      <div style="text-align: right"><span class="badge badge-primary">` + producto.tipo + `</span></div>
    </div>
  </div>
    `;
  });
  html += `</div>`;

  $("#divProductos").html(html);
}

function mostrarSinResultados() {
  let html = `
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
        <h1 class="display-4">Sin resultados</h1>
        <p class="lead">Realiza una nueva búsqueda.</p>
        </div>
     </div>
    `;
  $("#divProductos").html(html);
}

$(".card").on('click',function(){
  alert("funcia");
});