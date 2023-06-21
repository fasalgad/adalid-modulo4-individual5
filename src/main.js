import './assets/css/bootstrap.min.css';
let categoriasGlobal = []

document.addEventListener('DOMContentLoaded', () => {
  listarCategorias();
  document.getElementById('selectCategorias').addEventListener('change', function () {
    const idCategoria = document.getElementById('selectCategorias').value;
    obtenerCategorias(idCategoria);
  }
  );
});

// Función asincrónica para listar todas las categorias {"idCategory": "","strCategory": "","strCategoryThumb": "","strCategoryDescription": ""} en el select html id=categorias
const listarCategorias = async () => {
  try {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    const respuesta = await fetch(url);
    const categorias = await respuesta.json();

    categoriasGlobal = ordenarCategorias(categorias.categories);
    let selectCategorias = document.getElementById('selectCategorias');
    categoriasGlobal.forEach(categoria => {
      let option = document.createElement('option');
      option.value = categoria.strCategory;
      option.text = categoria.strCategory;
      selectCategorias.appendChild(option);
    });
  } catch (error) {
    console.log('Error al obtener las categorías:', error);
  }
}

//ordenas categoria por nombre
const ordenarCategorias = (categorias) => {
  return categorias.sort((a, b) => {
    if (a.strCategory < b.strCategory) {
      return -1;
    }
    if (a.strCategory > b.strCategory) {
      return 1;
    }
    return 0;
  });
}


// Función asincrónica para obtener las categorías de recetas

const obtenerCategorias = async (idCategory) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${idCategory}`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    const divResultado = document.getElementById('resultado');
    let resultado = '<div class="row justify-content-center">';
    categoriasGlobal.find(categoria => {
      if (categoria.strCategory === idCategory) {
        resultado += `
        <div class="col-md-4">
          <div class="card mb-3">
            <img src="${categoria.strCategoryThumb}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${categoria.strCategory}</h5>
              <p class="card-text">${categoria.strCategoryDescription}</p>
            </div>
          </div>
        </div>
        `;
      }
    });
    resultado += '</div> <div class="row"><h1>Variedades</h1>';

    datos.meals.forEach(receta => {
      resultado += `
      <div class="col-md-4">
        <div class="card mb-3">
          <img src="${receta.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${receta.strMeal}</h5> 
          </div>
        </div>
      </div>
      `;
    });
    resultado += '</div>';
    divResultado.innerHTML = resultado;
  } catch (error) {
    console.log('Error al obtener las categorías:', error);
  }
}
