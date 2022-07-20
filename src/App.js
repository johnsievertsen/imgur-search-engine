import './App.css';
import { useState } from 'react';
import * as React from 'react';

const App = () => {
  const CLIENT_ID = '03e23814bc615ef';
  const [searchParam, setSearchParam] = useState('time');
  const API_ENDPOINT = (`https://api.imgur.com/3/gallery/search/${searchParam}?q=`);
  const [searchTerm, setSearchTerm] = useState('');
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  const [images, setImages] = useState({});

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  React.useEffect(() => {
    const config = {
      method: 'GET',
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
        Accept: 'image/jpeg',
      }
    }

    const fetchImageAPI = async () => {
      const data = await fetch(url, config)
        .then((data) => data.json())
        .then((result) => setImages(result.data));
    }
    fetchImageAPI();
  }, [url]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function handleSubmit(e) {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    e.preventDefault();
  }

  function handleSearchParam(e) {
    setSearchParam(e.target.value);
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }
  return (
    <div className="App">
      <h1>imgur search engine</h1>
      <SearchForm onSearchSubmit={handleSubmit} onSearchChange={handleChange} onSearchParamChange={handleSearchParam}></SearchForm>
      <Gallery gallery={images ? images : []} />
    </div>
  );
}

const Gallery = ({ gallery }) => {
  const itemComp = Object.values(gallery).map(image => {
    return (
      <Item
        key={image.id}
        image={image}
      />
    )
  })
  return (
    <ul>
      {itemComp}
    </ul >
  );
}


const Item = ({ image }) => {
  return (
    <span>
      <hr className="item-sep" />
      <a target='_blank' href={image.link}>
        <img src={image.nsfw ? null : (
          image.is_album ? image.images[0].link : image.link
        )
        } label={image.title} />
        <p style={{ fontSize: '12px' }}>{image.title}</p>
      </a>
      <p>Uploaded By: {image.account_url}</p>
      <p>NSFW: {image.nsfw ? 'YES' : 'NO'}</p>
      <p>Views: {image.views}, Ups: {image.ups}, Comments: {image.comment_count}</p>
    </span>
  )
}

const SearchForm = ({ searchTerm, onSearchChange, onSearchSubmit, onSearchParamChange, searchParam }) => {
  return (
    <form onSubmit={onSearchSubmit}>
      <input type="text" value={searchTerm} onChange={onSearchChange} placeholder="Search"></input>
      <button>Submit</button>
      <select onChange={onSearchParamChange} value={searchParam}>Search by:
        <option value='time'>time</option>
        <option value='viral'>viral</option>
        <option value='top'>top</option>
      </select>
    </form>
  )
}

export default App;