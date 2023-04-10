import { v4 as uuidv4 } from 'uuid';

export default function CategoryButton({ category, setCategorySelected }) {
  function handleClick(e) {
    setCategorySelected(e.target.innerText);
  }

  return (
    <>
      <button
        class="w-1/4 middle none center mr-3 rounded-lg bg-indigo-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        data-ripple-light="true"
        key={uuidv4()}
        type="button"
        onClick={handleClick}
      >
        {category}
      </button>
    </>
  );
}
