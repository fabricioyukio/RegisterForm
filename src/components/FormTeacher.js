import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';

import Select from '@atlaskit/select';
import FieldText from '@atlaskit/field-text';
import Button, { ButtonGroup } from '@atlaskit/button';
import Form, { Field, FormSection } from '@atlaskit/form';
import Flag, { FlagGroup } from '@atlaskit/flag';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { colors } from '@atlaskit/theme';
import Spinner from '@atlaskit/spinner';

import axios from 'axios';

import '../assets/css/login.css';

import Logo from '../assets/images/logo1.png';

const teacherRoles = [
  { name: 'professor_role', value: 'PROFESSOR_1', label: 'Educação infantil', defaultSelected: true},
  { name: 'professor_role', value: 'PROFESSOR_2', label: 'Ensino fundamental'}
];

const states = [
  { label: 'Acre', value: 'AC'  },
  { label: 'Alagoas', value: 'AL' },
  { label: 'Amapá', value: 'AP' },
  { label: 'Amazonas', value: 'AM' },
  { label: 'Bahia', value: 'BA' },
  { label: 'Ceará', value: 'CE' },
  { label: 'Distrito Federal', value: 'DF' },
  { label: 'Espírito Santo', value: 'ES' },
  { label: 'Goiás', value: 'GO' },
  { label: 'Maranhão', value: 'MA' },
  { label: 'Mato Grosso', value: 'MT' },
  { label: 'Mato Grosso do Sul', value: 'MS' },
  { label: 'Minas Gerais', value: 'MG' },
  { label: 'Pará', value: 'PA' },
  { label: 'Paraíba', value: 'PB' },
  { label: 'Paraná', value: 'PR' },
  { label: 'Pernambuco', value: 'PE' },
  { label: 'Piauí', value: 'PI' },
  { label: 'Rio de Janeiro', value: 'RJ' },
  { label: 'Rio Grande do Norte', value: 'RN' },
  { label: 'Rio Grande do Sul', value: 'RS' },
  { label: 'Rondônia', value: 'RO' },
  { label: 'Roraima', value: 'RR' },
  { label: 'Santa Catarina', value: 'SC' },
  { label: 'São Paulo', value: 'SP' },
  { label: 'Sergipe', value: 'SE' },
  { label: 'Tocantins', value:'TO' }
];

class FormTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flags: [],
      showFlag: false,
      registering: false,
      registered: false,
      messageFlag: '',
      professor_name: '',
      professor_role: 'PROFESSOR_1',
      professor_login: '',
      professor_email: '',
      professor_password: '',
      school_name: '',
      school_short_name: '',
      school_city: '',
      school_uf: '',
      school_cnpj: ''
    }
  }

  handleInputChange = event => {
    const target = event.target ? event.target : event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let partialState = {};
    partialState[name] = value;

    this.setState(partialState);
  }

  handleSchoolStateChange = (event) => {
    var partialState = {};
    partialState['school_uf'] = event.value;
    this.setState(partialState);
  }
  handleRadioChange = (role) => {
    this.setState({ professor_role: role })
  }

  addFlag = (type) => {
    const _flags = this.state.flags.slice();
    const _message = type == 'error' ? 'Preencha todos os campos.' : 'Professor cadastrado com sucesso!';
    _flags.push({ type: type, message: _message })
    this.setState({ flags: _flags });
  }

  dismissFlag = () => {
    this.setState({ flags: [] })
  }

  onSubmitHandler = event => {
    event.preventDefault();
    this.setState({ registering: true, flags: [] });
    axios.post('http://rest.colchadeleituras.com.br/professor/create', this.state).then(
      res => {
        this.setState({
          registered: true,
          registering: false,
          professor_name: '',
          professor_role: 'PROFESSOR_1',
          professor_login: '',
          professor_email: '',
          professor_password: '',
          school_name: '',
          school_short_name: '',
          school_city: '',
          school_uf: '',
          school_cnpj: ''
        });

        this.addFlag('success');
      },
      error => {
        this.setState({
          registered: false,
          registering: false
        });
        this.addFlag('error');
      }
    )
  }

  render() {
    return(
      <div>
        <FlagGroup onDismissed={this.dismissFlag}>
          {
            this.state.flags.map(flag => (
              <Flag
                appearance={ flag.type } 
                icon={<SuccessIcon label={ flag.type } secondaryColor={colors.G400} />}
                id={ flag.type } 
                key={ flag.type } 
                title={ flag.message } 
              />
            ))
          }
        </FlagGroup>
        

        <div className="form-container">
          <img src={ Logo } alt="Colcha de Leituras - Formando Leitores" className="logo" />
          { this.state.registering && <div className="loading"><Spinner size="xlarge" /></div> }

          { !this.state.registering && 
            <Form name="form-teacher" >
              

              <Grid>
                <FormSection 
                  name="dados-do-professor" 
                  title="Dados do Professor">
                  <Row>
                    {/* Nome do professor */}
                    <Col xs={ 12 } md={ 6 }>              
                      <Field label="Nome" isRequired>
                        <FieldText 
                          name="professor_name" 
                          placeholder="Digite o seu nome" 
                          onChange={ this.handleInputChange } 
                          isRequired 
                          shouldFitContainer 
                          value={ this.state.professor_name } />
                      </Field>
                    </Col>
                    {/* Email do professor */}
                    <Col xs={ 12 } md={ 6 }>
                      <Field label="E-mail" isRequired>
                        <FieldText 
                          name="professor_email" 
                          placeholder="Digite o seu e-mail" 
                          onChange={ this.handleInputChange } 
                          isRequired 
                          shouldFitContainer 
                          value={ this.state.professor_email }/>
                      </Field>
                    </Col>
                  </Row>

                  <Row>
                    {/* Login do Professor */}
                    <Col xs={ 12 } md={ 3 }>
                      <Field label="Login" isRequired>
                        <FieldText 
                          name="professor_login" 
                          placeholder="Digite o seu login" 
                          onChange={ this.handleInputChange } 
                          isRequired 
                          shouldFitContainer 
                          value={ this.state.professor_login }/>
                      </Field>
                    </Col>
                    {/* senha do professor */}
                    <Col xs={ 12 } md={ 3 }>
                      <Field label="Senha" isRequired>
                        <FieldText 
                          name="professor_password" 
                          placeholder="Digite sua senha" 
                          type="password" 
                          isRequired 
                          shouldFitContainer 
                          onChange={ this.handleInputChange } 
                          value={ this.state.professor_password }/>
                      </Field>
                    </Col>
                    {/* tipo do professor */}
                    <Col xs={ 12 } md={ 6 }>
                      <div className="radio-group">
                        <label>Tipo <span>*</span></label>
                        <ButtonGroup>
                          {
                            teacherRoles.map(teacher => (
                              <Button 
                                key={ teacher.value } 
                                onClick={ () => this.handleRadioChange(teacher.value) } 
                                isSelected={ this.state.professor_role == teacher.value }>{ teacher.label }</Button>
                            ))
                          }
                        </ButtonGroup>
                      </div>
                    </Col>
                  </Row>
                </FormSection>
                
                <FormSection 
                  name="dados-da-escola" 
                  title="Dados da Escola">

                  <Row>
                    {/* nome da escola */}
                    <Col xs={ 12 } md={ 4 } >
                      <Field label="Nome" isRequired>
                        <FieldText 
                          name="school_name" 
                          placeholder="Digte o Nome" 
                          onChange={ this.handleInputChange } 
                          isRequired 
                          shouldFitContainer 
                          value={ this.state.school_name }/>
                      </Field>
                    </Col>
                    {/* sigla do nome  da escola */}
                    <Col xs={ 12 } md={ 4 } >
                      <Field label="Sigla" isRequired>
                        <FieldText 
                          name="school_short_name" 
                          placeholder="Digite a Sigla" 
                          isRequired 
                          shouldFitContainer 
                          onChange={ this.handleInputChange } 
                          value={ this.state.school_short_name }/>
                      </Field>
                    </Col>
                    {/* cnpj da escola */}
                    <Col xs={ 12 } md={ 4 } >
                      <Field label="CNPJ" isRequired>
                        <FieldText 
                          name="school_cnpj" 
                          placeholder="Digite o CNPJ" 
                          onChange={ this.handleInputChange } 
                          isRequired 
                          shouldFitContainer 
                          value={ this.state.school_cnpj }/>
                      </Field>
                    </Col>
                  </Row>

                  <Row>
                    {/* estado (uf) da escola */}
                    <Col xs={ 12 } md={ 6 } >
                      <Field label="Estado">
                        <Select
                          className="single-select"
                          classNamePrefix="react-select" 
                          defaultValue={states[this.state.school_uf]} 
                          onChange={this.handleSchoolStateChange} 
                          options={ states }
                          placeholder="Escolha a Cidade"
                        />
                      </Field>
                    </Col>
                    {/* cidade da escola */}
                    <Col xs={ 12 } md={ 6 } >
                      <Field label="Cidade" isRequired>
                        <FieldText 
                          name="school_city" 
                          placeholder="Digite a Cidade" 
                          onChange={ this.handleInputChange } 
                          isRequired 
                          shouldFitContainer 
                          value={ this.state.school_city }/>
                      </Field>
                    </Col>
                  </Row>

                  <Row>
                    <Col xs>
                      <Button 
                        className="button" 
                        type="submit" 
                        appearance="primary" 
                        shouldFitContainer 
                        onClick={this.onSubmitHandler}>Registrar</Button>
                    </Col>
                  </Row>
                </FormSection>
              </Grid>
            </Form>
          }
        </div>

      </div>
    )
  }
}

export default FormTeacher;