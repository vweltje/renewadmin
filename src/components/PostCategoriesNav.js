import React from 'react'
import { Link } from 'gatsby'

import './PostCategoriesNav.css'

const PostCategoriesNav = ({ categories }) => (
  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/news/`}>
      All
    </Link>
    {categories.map((category, index) => (
      <Link
        exact={true.toString()}
        activeClassName="active"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}
  </div>
)

export default PostCategoriesNav
