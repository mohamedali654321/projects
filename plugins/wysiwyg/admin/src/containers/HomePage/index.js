/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {
  return (
    <div>
      <h1>{pluginId}&apos;s HomePage11</h1>
      <p>hello from WYSIWYG plugin</p>
    </div>
  );
};

export default memo(HomePage);
