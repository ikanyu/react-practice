import { useState, useEffect } from 'react';
import { getQuote } from '@/lib/quote';
import CategoryButton from '@/components/category_button';

export async function getServerSideProps() {
  const initialQuoteData = await getQuote('happiness');

  return {
    props: {
      initialQuoteData,
    },
  };
}

export default function Home({ initialQuoteData }) {
  const categories = ['courage', 'hope', 'life', 'success'];

  const [category, setCategory] = useState('happiness');
  const [quoteData, setQuoteData] = useState(initialQuoteData);

  useEffect(() => {
    const retrieveQuote = async () => {
      const data = await getQuote(category);
      setQuoteData(data);
    };
    retrieveQuote();
  }, [category]);

  function setCategorySelected(selected) {
    setCategory(selected);
  }

  return (
    <>
      <h2>Quote of the Day</h2>
      <h2>Current Category {category}</h2>
      {quoteData.map((quote) => (
        <li>{quote['quote']}</li>
      ))}

      {categories.map((category) => (
        <CategoryButton
          category={category}
          // onClick={setCategorySelected}
          setCategorySelected={setCategorySelected}
        />
      ))}
    </>
  );
}
