import { v4 as uuidv4 } from 'uuid';

export default function CategoryButton({ category, setCategorySelected }) {
  function handleClick(e) {
    setCategorySelected(e.target.innerText);
  }

  return (
    <>
      <button key={uuidv4()} type="button" onClick={handleClick}>
        {category}
      </button>
    </>
  );
}
