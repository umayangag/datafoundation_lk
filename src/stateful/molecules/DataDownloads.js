import { useState, useEffect } from 'react';

import {DATA_DOWNLOADS} from '../../constants/DataDownloads.js';
import DataDownloadItem from '../../nonstate/molecules/DataDownloadItem.js';
import './DataDownloads.css';


export default function DataDownloads(props) {
  const [searchText, setSearchText] = useState('');

  function onChange(e) {
    setSearchText(e.target.value.toLowerCase());
  }

  function filterWithSearchText(a) {
    return a['name'].toLowerCase().includes(searchText) || a.tags.reduce(
      function(isMatchTag, tag) {
        if (tag.toLowerCase().includes(searchText)) {
          return true;
        }
        return isMatchTag;
      },
      false,
    );
  }

  function sortByName(a, b) {
    return a.name.localeCompare(b.name);
  }

  const matchingDownloadItems = DATA_DOWNLOADS
    .filter(filterWithSearchText)
    .sort(sortByName);

  return (
    <div>
      <input
        type="text"
        className="input-text-search-text"
        placeholder="Search data sources..."
        onChange={onChange}
      />
      <table className="table-downloads">
        <tbody>
        {
          matchingDownloadItems.map(
            function(info, i) {
              const key = `li-download-${i}`;
              return <DataDownloadItem key={key} info={info} />;
            },
          )
        }
        </tbody>
      </table>
    </div>
  )
}