import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import "./App.css";
import ErrorBoundry from '../components/ErrorBoundry';

import { setSearchField } from '../actions';




const mapStateToProps = state => {
  return {
    searchfield: state.searchRobots.searchField
  }
}
const mapDispatchToPros = (dispatch) => {
  return {
    onSearchChange:(event) => dispatch(setSearchField(event.target.value))
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount() {
    console.log(this.props.store.getState());
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(users => this.setState({robots: users}))
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
  }

  render() {
    const {robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot=>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })


    return robots.length ? 
      ( <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox onSearchChange={this.onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
            
          </Scroll> 
        </div>
      ) :
      (<h1>Loading...</h1>);
  }
}

export default connect(mapStateToProps, mapDispatchToPros)(App);
