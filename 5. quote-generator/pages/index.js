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
      <div className="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 py-5">
        <div
          className="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800"
          style={{ maxWidth: 500 }}
        >
          <div className="w-full pt-1 pb-5"></div>
          <div className="w-full mb-10">
            <div className="text-3xl text-indigo-500 text-left leading-tight h-3">
              “
            </div>
            <p className="text-sm text-gray-600 text-center px-5">
              {quoteData.map((quote) => (
                <>{quote['quote']}</>
              ))}
            </p>
            <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">
              ”
            </div>
          </div>
          <div className="w-full">
            <p className="text-md text-indigo-500 font-bold text-center">
              {category.toUpperCase()}
            </p>
            <p className="text-xs text-gray-500 text-center">
              Quote of the Day
            </p>
            <></>
            <div class="flex pt-6">
              {categories.map((category) => (
                <CategoryButton
                  category={category}
                  setCategorySelected={setCategorySelected}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
