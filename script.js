const recipes = [
  {
    name: "Tomato Rice",
    ingredients: ["rice", "tomato", "onion", "oil"],
    instructions: "Cook onions and tomatoes in oil, then mix with cooked rice and spices."
  },
  {
    name: "Aloo Fry",
    ingredients: ["potato", "oil", "salt", "turmeric"],
    instructions: "Fry chopped potatoes with salt and turmeric until golden brown."
  },
  {
    name: "Masala Omelette",
    ingredients: ["egg", "onion", "chili", "salt", "oil"],
    instructions: "Beat eggs with onion and chili, cook on pan until done."
  },
  {
    name: "Lemon Water",
    ingredients: ["lemon", "water", "sugar", "salt"],
    instructions: "Mix lemon juice with water, sugar, and a pinch of salt."
  },
  {
    name: "Plain Rice",
    ingredients: ["rice", "water", "salt"],
    instructions: "Boil rice in salted water until soft. Drain and serve hot."
  }
];

function generateRecipe() {
  const input = document.getElementById("ingredientsInput").value.toLowerCase();
  const userIngredients = input.split(",").map(i => i.trim()).filter(i => i);
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  if (userIngredients.length === 0) {
    resultDiv.innerHTML = "⚠️ Please enter at least one ingredient.";
    return;
  }

  // Score recipes based on ingredient matches
  const scored = recipes.map(recipe => {
    const matchCount = recipe.ingredients.filter(ing => userIngredients.includes(ing)).length;
    return { ...recipe, matchCount };
  });

  // Sort by highest matches
  scored.sort((a, b) => b.matchCount - a.matchCount);

  const bestMatch = scored[0];

  if (bestMatch.matchCount > 0) {
    resultDiv.innerHTML = `
      <h3>🍽️ ${bestMatch.name}</h3>
      <p><strong>Matched Ingredients:</strong> ${bestMatch.matchCount}/${bestMatch.ingredients.length}</p>
      <p><strong>Recipe Ingredients:</strong> ${bestMatch.ingredients.join(", ")}</p>
      <p><strong>Instructions:</strong> ${bestMatch.instructions}</p>
    `;
  } else {
    resultDiv.innerHTML = "❌ Sorry, no recipes matched your ingredients. Try entering more common items.";
  }
}
