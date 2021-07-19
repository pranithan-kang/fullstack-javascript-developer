import React from 'react'

const ListRendering = () => {
  const products = [
    { id: 1, name: "Coke" },
    { id: 2, name: "Pepsi" },
  ]
  return (
    <ol>
      {products.map((item, index) => {
        // NOTE: key attribute effects to performance
        // if it is ignored, when the some doms change, React will re-render ALL things.
        return (<li key={item.id}>{index + 1} {item.name}</li>);
      })}

      {/* Using Destructuring Args */}
      {products.map(({id, name}, index) => {
        return (
          <li key={id}>{index + 1} {name}</li>
        );
      })}
    </ol>
  )
}

export default ListRendering;
