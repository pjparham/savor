import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchRecipes = createAsyncThunk("recipes/fetchActivities", () => {
  return fetch("/recipes")
  .then(response => response.json())
  .then(recipesArray => recipesArray)
})


console.log('hello')
const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    entities: [],
  },
  reducers: {
    // create reducer methods
    recipeAdded(state, action) {
      state.entities.push(action.payload);
    },
    activityUpdated(state, action) {
        const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id)
        state.activities[index] = action.payload
    },
    recipeRemoved(state, action){
      const index = state.entities.findIndex((recipe) => recipe.id === action.payload);
      state.entities.splice(index, 1)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.isLoading = true
    })
  }
});

// export the action creators
export const { recipeAdded, recipeRemoved, activityUpdated } = recipesSlice.actions;

export default recipesSlice.reducer;
