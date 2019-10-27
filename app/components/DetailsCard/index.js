/* eslint-disable react/prop-types */
import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LanguageIcon from '@material-ui/icons/Language';
import BusinessIcon from '@material-ui/icons/Business';
import CardMedia from '@material-ui/core/CardMedia';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <span>could parse value</span>;
    return this.props.children;
  }
}

const EntityName = ({ name }) => (
  <span style={{ textTransform: 'capitalize' }}>
    {name.split('_').join(' ')}
  </span>
);

const EntityProp = ({ name, val }) =>
  ({
    photo: (
      <CardMedia style={{ width: 150, height: 150 }} key={name} image={val} />
    ),
    company_name: (
      <div key={name}>
        <BusinessIcon fontSize="small" /> {val}
      </div>
    ),
    website: (
      <div key={name}>
        <LanguageIcon fontSize="small" /> <a href={val}>{val}</a>
      </div>
    ),
    email: (
      <div key={name}>
        <AlternateEmailIcon fontSize="small" />{' '}
        <a href={`mailto:${val}`}>{val}</a>
      </div>
    ),
    phone_number: (
      <div key={name}>
        <PhoneIcon fontSize="small" /> {val}
      </div>
    ),
    updated_at: (
      <div key={name}>
        <strong>Updated At:</strong> {val}
      </div>
    ),
    created_at: (
      <div key={name}>
        <strong>Created At:</strong> {val}
      </div>
    ),
  }[name] || (
    <div>
      <strong>
        <EntityName name={name} />:
      </strong>
      &nbsp;
      {val ? val.toString() : 'no value present'}
    </div>
  ));

const blockStyles = { marginLeft: 20 };

const excludFilter = prop => val => prop.indexOf(val) === -1;

const Operator = props => (
  <ErrorBoundary>
    <strong>
      <EntityName {...props} />:
    </strong>
    <div style={blockStyles}>
      {Object.keys(props)
        .filter(excludFilter('id,name'))
        .map(prop => (
          <EntityProp name={prop} val={props[prop]} />
        ))}
    </div>
  </ErrorBoundary>
);

const Person = props => (
  <ErrorBoundary>
    <strong>
      <EntityName {...props} />:
    </strong>
    <div style={blockStyles}>
      {Object.keys(props)
        .filter(excludFilter('id,name'))
        .map(prop => (
          <EntityProp name={prop} val={props[prop]} />
        ))}
    </div>
  </ErrorBoundary>
);
const DefaultEntity = props => {
  if (props !== null && typeof props === 'object') {
    return (
      <ErrorBoundary>
        <strong>
          <EntityName {...props} />:
        </strong>
        <div style={blockStyles}>
          {Object.keys(props)
            .filter(excludFilter('id,name'))
            .map(prop => (
              <EntityProp name={prop} val={props[prop]} />
            ))}
        </div>
      </ErrorBoundary>
    );
  }
  return <span>{props}</span>;
};

const ListStrings = props => {
  const { stringList } = props;
  if (stringList && stringList instanceof Array) {
    return (
      <ErrorBoundary>
        <strong>
          <EntityName {...props} />:
        </strong>
        <div style={blockStyles}>
          {stringList.length ? stringList.join(', ') : 'Empty List'}
        </div>
      </ErrorBoundary>
    );
  }
  return JSON.stringify(props);
};

const renderEntity = type =>
  ({
    person: Person,
    operator: Operator,
    operational_authorizations: ListStrings,
    authorized_activities: ListStrings,
  }[type] || DefaultEntity);

export default props =>
  Object.keys(props)
    .filter(excludFilter('id,operator_type'))
    .map(name => {
      if (props[name] !== null && typeof props[name] === 'object') {
        if (props[name] instanceof Array) {
          return (
            <ErrorBoundary key={name}>
              <ListStrings name={name} stringList={props[name]} />
            </ErrorBoundary>
          );
        }
        const Entity = renderEntity(name);
        return (
          <ErrorBoundary key={name + props[name].id}>
            <Entity name={name} {...props[name]} />
          </ErrorBoundary>
        );
      }
      return (
        <ErrorBoundary key={name + props[name]}>
          <EntityProp name={name} val={props[name]} />
        </ErrorBoundary>
      );
    });
