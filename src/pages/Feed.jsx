import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../css/feed.css';


class Feed extends Component {
  render() {
    const {accs, match: {params: user}} = this.props;
    const account = accs.find((acc) => acc.email === user.user);
    console.log(account);
    return (
      <div className="feedContainer">
        <h1>Seja bem vindo {account.fName} {account.lName}</h1>
        <h3>Em construção!</h3>
        <Link to="/">Sair</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  accs: state.registerReducer.accounts,
})

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
