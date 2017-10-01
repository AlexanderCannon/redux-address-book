import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchContact, deleteContact } from '../actions';

class ContactsDetails extends Component {
  componentDidMount() {
    if (!this.props.contact) {
      this.props.fetchContact(this.props.match.params.id);
    }
  }

  onDeleteClick() {
    this.props.deleteContact(this.props.match.params.id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { contact } = this.props;
    if (!contact) {
      return (<div>
        <Link to="/" className="btn btn-primary">X</Link>
        <br />Loading...</div>)
    }

    return (
      <div>
        <Link to="/" className="btn btn-primary">X</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete</button>
        <h3>{contact.name}</h3>
        <h6>{contact.phone_number}</h6>
        <p>{contact.address}</p>
        <p>{contact.email}</p>
      </div>
    );
  };
}

function mapStateToProps({ contacts }, ownProps) {
  return { contact: contacts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchContact, deleteContact })(ContactsDetails);
