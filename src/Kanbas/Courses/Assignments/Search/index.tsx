import React, { useState } from 'react';
import "./index.css"

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for Assignment"
        className='search-bar'
      />
    </div>
  );
};

export default SearchBar;
