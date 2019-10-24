import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LanguageIcon from '@material-ui/icons/Language';
import BusinessIcon from '@material-ui/icons/Business';

const renderEntityProp = (propName, propVal) => {
  const resp = {
    company_name: (
      <div key={propName}>
        <BusinessIcon fontSize="small" /> {propVal}
      </div>
    ),
    website: (
      <div key={propName}>
        <LanguageIcon fontSize="small" /> <a href={propVal}>{propVal}</a>
      </div>
    ),
    email: (
      <div key={propName}>
        <AlternateEmailIcon fontSize="small" />{' '}
        <a href={`mailto:${propVal}`}>{propVal}</a>
      </div>
    ),
    phone_number: (
      <div key={propName}>
        <PhoneIcon fontSize="small" /> {propVal}
      </div>
    ),
    updated_at: (
      <div key={propName}>
        <strong>Updated At:</strong> {propVal}
      </div>
    ),
  }[propName];
  return resp;
};

const blockStyles = { marginLeft: 20 };

const excludFilter = prop => val => val !== prop;

const renderEntity = type =>
  ({
    person: Person,
    operator: Operator,
  }[type] || DefaultEntity);

const Operator = props => (
  <div style={blockStyles}>
    {Object.keys(props)
      .filter(excludFilter('id'))
      .map(prop => renderEntityProp(prop, props[prop]))}
  </div>
);

const Person = props => (
  <div style={blockStyles}>
    {Object.keys(props)
      .filter(excludFilter('id'))
      .map(prop => renderEntityProp(prop, props[prop]))}
  </div>
);
const DefaultEntity = val => {
  if (val !== null && typeof val === 'object') {
    return (
      <div style={blockStyles}>
        {Object.keys(val)
          .filter(excludFilter('id'))
          .map(prop => renderEntityProp(prop, val[prop]))}
      </div>
    );
  }
  return <span>{val}</span>;
};

export default props =>
  Object.keys(props)
    .filter(excludFilter('id'))
    .map(propName => {
      if (props[propName] !== null && typeof props[propName] === 'object') {
        const Entity = renderEntity(propName);
        return (
          <div key={propName + props[propName].id}>
            <strong>{propName}:</strong>
            <Entity {...props[propName]} />
          </div>
        );
      }
      return (
        <div key={propName}>{renderEntityProp(propName, props[propName])}</div>
      );
    });
