import React from 'react'

export default function RecipeFilter({ handleFilter}) {
  return (
    <div className="dropdown">
    <button className="dropbtn">Filter</button>
    <div className="dropdown-content">
      <div onClick={handleFilter} title="all">All</div>
      <div onClick={handleFilter} title="soup">Soup</div>
      <div onClick={handleFilter} title="appetizer">Appetizers</div>
      <div onClick={handleFilter} title="salad">Salad</div>
      <div onClick={handleFilter} title="side">Side</div>
      <div onClick={handleFilter} title="main course">Main Course</div>
      <div onClick={handleFilter} title="dessert">Dessert</div>
      <div onClick={handleFilter} title="other">Other</div>
    </div>
  </div>
  )
}
