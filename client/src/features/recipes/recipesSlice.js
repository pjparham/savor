import { createSlice } from "@reduxjs/toolkit";


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
    recipeRemoved(state, action){
      const index = state.entities.findIndex((recipe) => recipe.id === action.payload);
      state.entities.splice(index, 1)
    }
  },
});

// export the action creators
export const { recipeAdded, recipeRemoved } = recipesSlice.actions;

export default recipesSlice.reducer;
