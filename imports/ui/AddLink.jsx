import React from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

import { Links } from '../api/links';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.cancelAddLink = this.cancelAddLink.bind(this);
    this.state = {
      url: '',
      isOpen: false,
      error: '',
    };
  }
  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.cancelAddLink();
      } else {
        this.setState({
          error: err.reason,
        });
      }
    });
  }
  onChange(e) {
    this.setState({
      url: e.target.value,
    });
  }
  cancelAddLink() {
    this.setState({
      url: '',
      isOpen: false,
      error: '',
    });
  }
  render() {
    return (
      <div>
        <button
          className="button"
          onClick={() => this.setState({ isOpen: true })}
        >
          + Add Link
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.url.focus()}
          onRequestClose={this.cancelAddLink}
          className="boxed-view_box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit} className="boxed-view_form">
            <input
              type="text"
              placeholder="URL"
              ref={(c) => { this.url = c; }}
              value={this.state.url}
              onChange={this.onChange}
            />
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.cancelAddLink}>
              CANCEL
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}
