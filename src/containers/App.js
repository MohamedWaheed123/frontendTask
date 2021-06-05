import React, { Component } from 'react';
import CardList from '../components/CardList';
// import { robots} from './Robots';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
// import { render } from '@testing-library/react';
import {connect} from 'react-redux';
import {setSearchField,requestRobots} from '../actions.js';

const mapStateToProps = state=>
{

    return{
        searchField : state.searchRobots.searchField,
        robots:state.requestRobots.robots,
        isPending:state.requestRobots.isPending,
        error:state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        onSearchChange:(event)=>dispatch(setSearchField(event.target.value)),
        onRequestRobots:()=>dispatch(requestRobots())
    }
}

class App extends Component {

   
    componentDidMount() {
       
      this.props.onRequestRobots();

    }
    
    render() {

        const filteredRobots = this.props.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase());
        })

        return (
            <div className='tc'>
                <h1 className="f2"> RoboFriends</h1>
                <SearchBox searchChange={this.props.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>

                <CardList robots={filteredRobots} />
                    </ErrorBoundry>

                </Scroll>
            </div>


        );

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App) ;