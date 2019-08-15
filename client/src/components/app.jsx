import React from 'react';
import CourtList from './courtList';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courtList: [],
    };
  }
  componentDidMount() {
    this.getActiveCourts();
  }
  getActiveCourts() {
    axios
      .get('http://localhost:9000/courtlist')
      .then(data => {
        this.setState({
          courtList: data.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <CourtList courts={this.state.courtList} />
      </div>
    );
  }
}
export default App;
