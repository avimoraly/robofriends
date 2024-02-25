import React, { Component } from 'react';
import { connect } from 'react-redux';

import { reqeustRobots, setSearchField,  } from '../actions';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import "./App.css";
import ErrorBoundry from '../components/ErrorBoundry';
import Header from '../components/Header';




const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  }
}

const mapDispatchToPros = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: ()=> reqeustRobots(dispatch)
  }
}

class App extends Component {
 

  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot=>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    });


    return !isPending ? 
      ( <div className='tc'>
          <Header />
          <SearchBox onSearchChange={onSearchChange}/>
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
