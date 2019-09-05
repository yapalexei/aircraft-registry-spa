/*
 * LandingPage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default function LandingPage() {
  return (
    <h1>
      <FormattedMessage {...messages.header} />
    </h1>
  );
}
