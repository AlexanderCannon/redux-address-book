import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postContact } from '../actions'
class ContactNew extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: 'name',
      phone_number: 'phone_number',
      address: 'address',
      email: 'email'
    }
  }
  renderField(field) {
    const { meta: { touched, error } } = field;
    const fieldClass = `form-group ${touched ? error ? 'has-danger' : 'has-success' : ''}`

    return (
      <div className={fieldClass}>
        <label>{field.label}</label>
        <input
          placeholder={field.placeholderText}
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  };
  onSubmit(values) {
    this.props.postContact(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field name={this.state.name} component={this.renderField} label="Name" />
        <Field name={this.state.phone_number} placeholderText="+447515551989" component={this.renderField} label="Number" />
        <Field name={this.state.address} component={this.renderField} label="Address" />
        <Field name={this.state.email} component={this.renderField} label="Email" />
        <button type="submit" className="btn btn-primary">Save</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  };
};

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.title = "Please enter a name!";
  }
  if (!values.phone_number && !values.address && !values.email) {
    errors.content = "Please enter either an address, an email, or a number!";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'ContactsNewForm'
})(connect(null, { postContact })(ContactNew));