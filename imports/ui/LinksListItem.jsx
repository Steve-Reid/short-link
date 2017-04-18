import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';

// Create a boolean state called justCopied. Default to fasle
// On success switch justCopied to true
// Wait a second. Switch justCopied to false
// Dynamically render the button text. true => Copied. false => Copy.

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false,
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.copy);

    this.clipboard
      .on('success', () => {
        this.setState({ justCopied: true });
        setTimeout(() => this.setState({ justCopied: false }), 1000);
      })
      .on('error', () => {
        alert('Unable to copy. Please manually copy the link.');
      });
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    const momentVisited = moment(this.props.lastVisitedAt);

    if (typeof this.props.lastVisitedAt === 'number') {
      visitedMessage = `(visited ${momentVisited.fromNow()})`;
    }
    return (
      <div>
        <p className="item__message">{this.props.visitedCount} {visitMessage} - {visitedMessage}</p>
      </div>
    );
  }
  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a
          className="button button--pill button--link"
          href={this.props.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit
        </a>
        <button
          className="button button--pill"
          ref={(c) => {
            this.copy = c;
          }}
          data-clipboard-text={this.props.shortUrl}
        >
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button
          className="button button--pill"
          onClick={() => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
          }}
        >
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  shortUrl: React.PropTypes.string.isRequired,
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  userId: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisitedAt: React.PropTypes.number,
};
