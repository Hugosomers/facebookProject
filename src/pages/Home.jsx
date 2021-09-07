import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/home.css';
import WorldImg from '../world_map.png';
import {registerAccount} from '../redux/actions';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailLogin: '',
      passwordLogin: '',
      loginAuth: false,
      register: {
        fName: '',
        lName: '',
        email: '',
        password: '',
        sex: '',   
        birthday: '',
        birthmonth: '',
        birthyear: '',
      }
    }

    this.registerHandle = this.registerHandle.bind(this);
    this.handleRegisterButton = this.handleRegisterButton.bind(this);
    this.handleLoginButton = this.handleLoginButton.bind(this);
  }

  registerHandle({target}) {
    const {name, value} = target;
    this.setState(pState => ({
      register: {
        ...pState.register,
        [name]: value,
      }
    }))
  }

  handleRegisterButton() {
    const {createAccount, accs} = this.props;
    const {register: { email }} = this.state;

    const created = accs.some((item) => item.email === email);
    if (created) {
      return alert('Conta já existente!');
    }
    return createAccount(this.state.register)
  }

  handleLoginButton() {
    const {accs} = this.props;
    const {emailLogin, passwordLogin} = this.state;

    const checkAccount = accs.some((item) => item.email === emailLogin && item.password === passwordLogin);
    if(checkAccount) {
      this.setState({
        loginAuth: true,
      });
    } else {
      return alert('Login inválido');
    }
  }


  render() {
    const {loginAuth, emailLogin} = this.state;
    if (loginAuth) {
      return <Redirect to={`/feed/${emailLogin}`} />
    }
    return (
      <div className="homeContainer">
        <header className="homeHeader">
          <div className="headerDivContainer">
            <h1 className="heroTitle">faceBook</h1>
            <form className="loginForm">
              <div className="loginFormDiv">
                <label className="loginLable">
                  Email
                  <input type="email" onChange={(e) => this.setState({emailLogin: e.target.value})} className="loginInput"/>
                </label>
                <label className="loginLable">
                  Senha
                  <input type="password" onChange={(e) => this.setState({passwordLogin: e.target.value})} className="loginInput"/>
                </label>
                <label className="loginLable">
                  <button type="button" className="loginButton" onClick={this.handleLoginButton}>Entrar</button>
                </label>
              </div>
            </form>
          </div>
        </header>
        <main className="homeBody">
          <div className="bodyDivContainer">

            <section className="apresentationSide">
              <h1 className="heroBodyTitle">O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.</h1>
              <img src={WorldImg} alt="worldmap" className="worldMapImg"/>
            </section>

            <section className="registerSide">
              <h1 className="heroBodyTitle">Cadastre-se</h1>
              <h5>De graça até que se prove o contrário</h5>
              <hr />
              <form className="registerForm">
                <label className="registerLabel">
                  Primeiro Nome:
                  <input type="text" className="registerInput" name="fName" onChange={this.registerHandle}/>
                </label>
                <label className="registerLabel">
                  Último Nome:
                  <input type="text" className="registerInput" name="lName" onChange={this.registerHandle}/>
                </label>
                <label className="registerLabel">
                  Email:
                  <input type="email" className="registerInput" name="email" onChange={this.registerHandle}/>
                </label>
                <label className="registerLabel">
                  Senha:
                  <input type="password" className="registerInput" name="password" onChange={this.registerHandle}/>
                </label>
                <label className="registerLabel">
                  Eu sou:
                  <select className="registerSelect" name="sex" onChange={this.registerHandle}>
                    <option>Selecione</option>
                    <option value="male"> Masculino </option>
                    <option value="female"> Feminino </option>
                  </select>
                </label>
                <label className="registerLabel">
                  Aniversário:
                  <select className="registerSelect" name="birthday" onChange={this.registerHandle}>
                    <option>Dia</option>
                    <option value="1">1</option>
                  </select>
                  <select className="registerSelect" name="birthmonth" onChange={this.registerHandle}>
                    <option>Mês</option>
                    <option value="janeiro">JAN</option>
                  </select>
                  <select className="registerSelect" name="birthyear" onChange={this.registerHandle}>
                    <option>Ano</option>
                    <option value="2021">2021</option>
                  </select>
                </label>
                <button type="button" className="registerButton" onClick={this.handleRegisterButton}>Cadastrar</button>
              </form>
            </section>
          </div>
          <footer className="homeFooter">
            <p>Desenvolvido por <b>@Hugosomers</b> para fins didáticos apenas!</p>
          </footer>
        </main>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  accs: state.registerReducer.accounts,
});

const mapDispatchToProps = (dispatch) => ({
  createAccount: (state) => dispatch(registerAccount(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
