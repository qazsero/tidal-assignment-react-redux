import React, { Component } from 'react'

class SearchSuggestions extends Component {


  //If the user hasn't clicked on the input, hide the suggestions
  //This functions decides the css class
  suggestionsClass = () => {
    let isHidden = this.props.areSuggestionsFocused ? '' : 'hidden'
    return `searchSuggestions ${isHidden}`
  }


  makeSuggestionList = () => {
    let {suggestions} = this.props
    let suggestionsCount = suggestions.length

    //If there aren't any results, show 0 results
    if(suggestionsCount === 0) {
      return (
        <ul>
          <li>0 results</li>
        </ul>
      )
    }

    //If there are more then 5 results, show 5 and add a message
    // X more results
    else if(suggestionsCount > 5) {
      let countMinus5 = suggestionsCount-5
      let first5 = suggestions.slice(0,5).map(s => <li className="pointer" onClick={() => this.props.selectArtist(s.id, s.name)} key={s.id}>{s.name}</li>)

      return (
        <ul>
          {first5}
          <li>{countMinus5} more results</li>
        </ul>
      )
    }
    //elsewise, just show the results
    else {
      let suggestionsLi = suggestions.map(s => <li className="pointer" onClick={() => this.props.selectArtist(s.id, s.name)} key={s.id}>{s.name}</li>)
      return (
        <ul>
          {suggestionsLi}
        </ul>
      )
    }

  }


  render() {
    return (
      <div className={this.suggestionsClass()}>
        <span className="closeSuggestions pointer" onClick={() => this.props.hideSuggestions()}>X</span>
        <p>Search results</p>
        {this.makeSuggestionList()}
      </div>
    );
  }
}


export default SearchSuggestions
