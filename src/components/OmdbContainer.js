import React, { Component } from "react";
import Container from "./Container";
import Card from "./Card";
import SearchForm from "./SearchForm";
import API from "../utils/API";
class OmdbContainer extends Component {
    state = {
        result: [],
        search: "",
        searchResults: []
    };
    // When this component mounts, search for the users
    componentDidMount() {
        this.searchusers();
    }
    // Method that executes every time the component re-renders (i.e. prop or state changes)
    componentDidUpdate() {
      console.log(this.state.searchResults)
    }
    searchusers = () => {
        API.users()
            .then(res => this.setState({ result: res.data.data }))
            .catch(err => console.log(err));
    };
    handleSearch = () => {
      if (this.state.result.length === 0) return;
        this.setState({
          searchResults: this.state.result.filter(el => {
            if (el.firstName === this.state.search) return true;
            return false;
          })
        })
    }
    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };
    // When the form is submitted, search the OMDB API for the value of `this.state.search` // 이걸지웠음
    handleFormSubmit = event => {
        event.preventDefault();
        this.handleSearch(this.state.search); // 이걸 유저들로 바꿈
    };
    render() {
        return (
            <Container>
                <div>
                    <div>
                        <Card heading="Search">
                            <SearchForm
                                value={this.state.search}
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit} // 왜 이걸지웠지
                            />
                        </Card>
                    </div>
                    <div>
                        <Card
                            heading={this.state.result.Title || "Search for a Users"}
                        >
                            <table style={{width: "100%"}}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Firstname</th>
                                        <th>Lastname</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.result.length ? this.state.result.map(user => (
                                        <tr>
                                            <td><img src= {user.picture}></img></td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    )) : (
                                            <h3>No Results to Display</h3>
                                        )}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </Container>
        );
    }
}
export default OmdbContainer;
