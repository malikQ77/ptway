import React, { Component } from 'react'
import checked from '../images/checked.png'
import axios from 'axios'
class Communicate extends Component {
    constructor() {
        super()
        this.state = {
            show: false,
            showChecked: false,
            Phone: '',
            PhoneError: '',
            Email: '',
            EmailError: '',
            RegisteredOnPtway: '',
            RegisteredOnPtwayError: '',
            HearAboutPtway: '',
            HearAboutPtwayError: '',
            EmptySection: false
        }
        this.onClick = this.onClick.bind(this)
        this.onClickOK = this.onClickOK.bind(this)
        this.onChangePhone = this.onChangePhone.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeHearAboutPtway = this.onChangeHearAboutPtway.bind(this)
        this.onChangeRegisteredOnPtway = this.onChangeRegisteredOnPtway.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }
    onClick() {
        if (this.state.show === false) {
            this.setState({
                show: true,
            })
        } else {
            this.setState({
                show: false,
            })
        }
    }
    onClickOK() {
        if (this.state.EmptySection === false) {
            this.setState({
                EmptySection: true
            })
        } else {
            this.setState({
                EmptySection: false
            })
        }

    }
    onChangePhone(e) {
        this.setState({
            Phone: e.target.value,
        })
    }
    onChangeEmail(e) {
        this.setState({
            Email: e.target.value,
        })
    }
    onChangeRegisteredOnPtway(e) {
        this.setState({
            RegisteredOnPtway: e.target.value,
        })
    }
    onChangeHearAboutPtway(e) {
        this.setState({
            HearAboutPtway: e.target.value,
        })
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({
            PhoneError: '',
            EmailError: '',
            RegisteredOnPtwayError: '',
            HearAboutPtwayError: '',
        })
        var validationError = false;
        if (this.state.Phone === '') {
            validationError = true
            this.setState({
                PhoneError: 'لا يمكن ترك حقل الجوال فارغ',
                thereIsError: true
            })
        }
        if (this.state.Email === '') {
            validationError = true
            this.setState({
                EmailError: 'لا يمكن ترك حقل البريد الإلكتروني فارغ',
                thereIsError: true
            })
        }
        if (this.state.RegisteredOnPtway === '') {
            validationError = true
            this.setState({
                RegisteredOnPtwayError: 'يرجى اختيار احد الخيارات اعلاه',
                thereIsError: true
            })
        }
        if (this.state.HearAboutPtway === '') {
            validationError = true
            this.setState({
                HearAboutPtwayError: 'يرجى اختيار احد الخيارات اعلاه',
                thereIsError: true
            })
        }
        else if (validationError === false) {
            this.setState({
                PhoneError: '',
                EmailError: '',
                RegisteredOnPtwayError: '',
                HearAboutPtwayError: '',
            })
            const Communicate = {
                Phone: this.state.Phone + '',
                Email: this.state.Email,
                RegisteredOnPtway: this.state.RegisteredOnPtway,
                HearAboutPtway: this.state.HearAboutPtway,
            }
            axios.post('http://172.20.10.3:4000/api/sary/Communicate', Communicate)
                .then((response) => {
                    if (response.data.validation.EmptySection === true) {
                        this.setState({
                            EmptySection: true,
                            thereIsError: true
                        })
                    }
                    else if (response.data.validation.EmailError !== '' || response.data.validation.PhoneError !== '') {
                        this.setState({
                            EmailError: response.data.validation.EmailError,
                            PhoneError: response.data.validation.PhoneError,
                            thereIsError: true
                            
                        })
                    } else {
                        window.location.href = '/thanks'
                    }
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }
    render() {
        return (
            <div className='section fadeIn'>
                {this.state.EmptySection ?
                    <div className='popup w-100 h-100'>
                        <div className='message'>
                            <p>يرجى تعبئة كافة البيانات المطلوبة</p>
                            <button className='submit' onClick={this.onClickOK}>موافق</button>
                        </div>
                    </div>
                    : ''}
                <div className="fadeIn">
                    <div className='section-title' onClick={this.onClick}>
                        {this.state.showChecked ? (
                            <img src={checked} alt='checked' />
                        ) : (
                                <img src='' alt='' />
                            )}
                        <p>التواصل</p>
                        {this.state.showChecked ?
                            <span className="dot" style={{
                                background: '#009AD0'
                            }}></span>
                            : !this.state.thereIsError ? <span className="dot" style={{
                                background: '#C5C8CE'
                            }}></span> : this.state.thereIsError ? <span className="dot" style={{
                                background: '#FF6565'
                            }}></span> : ''}
                    </div>
                    {this.state.show ? (
                        <form onSubmit={this.onSubmit} className='sections_form'>
                            <div className='input_group fadeIn'>
                                <p className='input_lable'>الجوال</p>
                                <input
                                
                                    type='tel'
                                    maxLength='10'
                                    minLength='10'
                                    className='input_text'
                                    onChange={this.onChangePhone}
                                    placeholder='مثال : 0512345678'
                                    pattern="[0-9]*" inputmode="numeric"
                                    value={this.state.Phone}
                                />
                                <p className='input_error'>{this.state.PhoneError}</p>
                            </div>
                            <div className='input_group fadeIn'>
                                <p className='input_lable'>البريد الإلكتروني</p>
                                <input
                                    type='email'
                                    className='input_text'
                                    onChange={this.onChangeEmail}
                                    value={this.state.Email}
                                />
                                <p className='input_error'>{this.state.EmailError}</p>
                            </div>
                            <div className='input_group fadeIn'>
                                <p className='input_lable'>؟Ptway هل أنت مسجل في </p>
                                <div className='radios radio_line'>
                                    <div className='radio'>
                                        <label for='1'>لا</label>
                                        <input
                                            type='radio'
                                            id='1'
                                            name='Registered'
                                            value={false}
                                            onChange={this.onChangeRegisteredOnPtway}
                                        />
                                    </div>
                                    <div className='radio'>
                                        <label for='2'>نعم</label>
                                        <input
                                            type='radio'
                                            id='2'
                                            name='Registered'
                                            value={true}
                                            onChange={this.onChangeRegisteredOnPtway}
                                        />
                                    </div>
                                </div>
                                <p className='input_error'>{this.state.RegisteredOnPtwayError}</p>
                            </div>
                            <div className='input_group fadeIn'>
                                <p className='input_lable'>؟Ptway كيف سمعت عن </p>
                                <div className='radios'>
                                    <div className='radio'>
                                        <label for='3'>Snapchat</label>
                                        <input
                                            type='radio'
                                            id='3'
                                            name='test1'
                                            value='Snapchat'
                                            onChange={this.onChangeHearAboutPtway}
                                        />
                                    </div>
                                    <div className='radio'>
                                        <label for='4'>Twitter</label>
                                        <input
                                            type='radio'
                                            id='4'
                                            name='test1'
                                            value='Twitter'
                                            onChange={this.onChangeHearAboutPtway}
                                        />
                                    </div>
                                    <div className='radio'>
                                        <label for='5'>WhatsApp</label>
                                        <input
                                            type='radio'
                                            id='5'
                                            name='test1'
                                            value='WhatsApp'
                                            onChange={this.onChangeHearAboutPtway}
                                        />
                                    </div>
                                    <div className='radio'>
                                        <label for='6'>أخرى</label>
                                        <input
                                            type='radio'
                                            id='6'
                                            name='test1'
                                            value='أخرى'
                                            onChange={this.onChangeHearAboutPtway}
                                        />
                                    </div>
                                </div>
                                <p className='input_error'>{this.state.HearAboutPtwayError}</p>
                            </div>
                            <button type='submit' className='submit fadeIn'>
                                إرسال
            </button>
                        </form>
                    ) : (
                            ''
                        )}
                </div>
            </div>
        )
    }
}
export default Communicate
