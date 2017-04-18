import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import LinksListFilters from './LinksListFilters';
import AddLink from './AddLink';

export default () => {
  return (
    <div>
      <PrivateHeader title="Short Lnk" />
      <div className="page-content">
        <LinksListFilters />
        <AddLink />
        <LinksList />
      </div>
    </div>
  );
};
