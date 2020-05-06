const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    meals = document.getElementById('meals'),
    resultsHeading = document.getElementById('results-heading'),
    single_mealEl = document.getElementById('single-meal')
;

// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();
    // Clear single meal
    single_mealEl.innerHTML = '';
    // Get search term
    const term = search.value;
    // Check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultsHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
            if (data.meals === null) {
                resultsHeading.innerHTML = `<p>There are no search results for ${term}. Please try again.</p>`
            } else {
                meals.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `)
                .join('');
            }
        });
        // Clear search text
        search.value = '';
    } else {
        alert('Please enter a search term.');
    }
}

// Fetch random meal
function getRandomMeal() {
    // Clear meals and headings
    meals.innerHTML = '';
    resultsHeading.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealToDOM(meal);
    });
}

// Fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        const meal = data.meals[0];
        addMealToDOM(meal);
    })
}

// Add meal to DOM
function addMealToDOM(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }
    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <div class="single-meal-info">
                <h2>Ingredients</h2>
                    <ul>
                        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
            </div>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="main">
                <p>${meal.strInstructions}</p>
                
            </div>
        </div>
    `;
}

// Event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

meals.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false;
        }
    });
    // console.log(mealInfo);
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealID');
        getMealById(mealID);
    }
});