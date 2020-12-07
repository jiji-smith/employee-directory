import React, { Component } from "react";
import Container from "./Container";
import Card from "./Card";
import SearchForm from "./SearchForm";
import MovieDetail from "./MovieDetail";
import API from "../utils/API";

class OmdbContainer extends Component {
    state = {
        result: [],
        search: ""
    };

    // When this component mounts, search for the movie "The Matrix"
    componentDidMount() {
        this.searchusers();
    }

    searchusers = () => {
        API.users()
            .then(res => this.setState({ result: res.data.data }))
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    };

    // When the form is submitted, search the OMDB API for the value of `this.state.search`
    // handleFormSubmit = event => {
    //     event.preventDefault();
    //     this.searchMovies(this.state.search);
    // };

    render() {
        return (
            <Container>
                <div>
                    <div>
                        <Card heading="Search">
                            <SearchForm
                                value={this.state.search}
                                handleInputChange={this.handleInputChange}
                                // handleFormSubmit={this.handleFormSubmit}
                            />
                        </Card>
                    </div>
                    <div>
                        <Card
                            heading={this.state.result.Title || "Search for a Movie to Begin"}
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
