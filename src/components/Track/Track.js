import React from 'react';
import './Track.css';

class Track extends React.Component {

  render() {
    return (
      <div>
        <div className="Track">
          <div className="Track-information">
            <h3>Stronger</h3>
            <p>Britney Spears | Oops!... I Did It Again</p>
          </div>
          <a className="Track-action">-</a>
        </div>
        <div className="Track">
          <div className="Track-information">
            <h3>So Emotional</h3>
            <p>Whitney Houston | Whitney</p>
          </div>
          <a className="Track-action">-</a>
        </div>
        <div className="Track">
          <div className="Track-information">
            <h3>It's Not Right But It's Okay</h3>
            <p>Whitney Houston | My Love Is Your Love</p>
          </div>
          <a className="Track-action">-</a>
        </div>
      </div>
    )
  }
}

export default Track;
