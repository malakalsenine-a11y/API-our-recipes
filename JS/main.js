let container = document.getElementById("recipesContainer");
let select = document.getElementById("categorySelect");

getData("pizza");

// دالة جلب البيانات
async function getData(category) {

    let result = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${category}`);

    let data = await result.json();

    showRecipes(data.recipes);

}
// دالة عرض الوصفات
function showRecipes(list) {

    container.innerHTML = "";

    list.forEach(recipe => {
        container.innerHTML += `
<div class="col-md-4 mb-4">
    <div class="recipe-card">
        <img class="w-100" src="${recipe.image_url}">
        <h5>${recipe.title}</h5>
        <p><b>Publisher:</b> ${recipe.publisher}</p>
        <p><b>Recipe ID:</b> ${recipe.recipe_id}</p>
        <p><b>Social Rank:</b> ${Math.round(recipe.social_rank)}</p>
<button class="btn btn-warning view-btn" data-id="${recipe.recipe_id}">
  View Recipe
</button>    </div>
</div>
`;
    });

}

//  زر View Recipe لعرض المكونات:
document.querySelectorAll(".view-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    let id = btn.getAttribute("data-id");
    let result = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
    let data = await result.json();

    btn.parentElement.innerHTML += `
      <div class="recipe-details mt-2 p-2" style="background:#f1f1f1; border-radius:10px;">
        <p><b>Ingredients:</b></p>
        <ul>
          ${data.recipe.ingredients.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </div>
    `;

    // btn.remove();     نزيل زر View Recipe بعد العرض
  });
});


//  عند تغيير القسم في select:
select.addEventListener("change", function () {

    getData(select.value);


});


//  إظهار Loader
async function getData(category) {
    container.innerHTML = ""; 
    document.getElementById("loader").style.display = "block"; 
    let result = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${category}`);
    let data = await result.json();

    document.getElementById("loader").style.display = "none"; 
    showRecipes(data.recipes);
}