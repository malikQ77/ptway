import React, { Component } from 'react';
import checked from '../images/checked.png';
import axios from 'axios';
class PeronsalInfo extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            fiveToThere: '3 - 5',
            years: 'سنوات',
            five: '5',
            yeasrOrMore: 'سنوات وأكثر',
            notSaudi: false,
            showChecked: false,
            FullName: '',
            FullNameError: '',
            DateOfBirth: '',
            DateOfBirthError: '',
            Gender: '',
            GenderError: '',
            Nationality: '',
            NationalityError: '',
            NationalityNotSaudiVal: '',
            NationalityNotSaudiValError: '',
            defultBackground: '#c5c8ce',
            thereIsError: ''

        }
        this.onClick = this.onClick.bind(this);
        this.onClickNotSaudi = this.onClickNotSaudi.bind(this);
        this.onClickSaudi = this.onClickSaudi.bind(this);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onCahngeDateOfBirth = this.onCahngeDateOfBirth.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onCahngeNationality = this.onCahngeNationality.bind(this);
        this.onChangeNationalityNotSaudiVal = this.onChangeNationalityNotSaudiVal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onClick() {
        if (this.state.show === false) {
            this.setState({
                show: true
            })
        } else {
            this.setState({
                show: false
            })
        }
    }
    onClickNotSaudi() {
        this.setState({
            notSaudi: true
        })
    }
    onClickSaudi() {
        this.setState({
            notSaudi: false
        })
    }

    onChangeFullName(e) {
        this.setState({
            FullName: e.target.value
        });
    }
    onCahngeDateOfBirth(e) {
        this.setState({
            DateOfBirth: e.target.value
        });
    }
    onChangeGender(e) {
        this.setState({
            Gender: e.target.value
        });
    }
    onCahngeNationality(e) {
        this.setState({
            Nationality: e.target.value
        });
    }
    onChangeNationalityNotSaudiVal(e) {
        this.setState({
            NationalityNotSaudiVal: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({
            FullNameError: '',
            DateOfBirthError: '',
            GenderError: '',
            NationalityError: '',
            NationalityNotSaudiValError: ''
        });
       var validationError = false;
        if (this.state.FullName === '') {
            validationError = true;
            this.setState({
                FullNameError: 'لا يمكن ترك حقل الاسم فارغ',
                thereIsError :true
            });
        }
        if (this.state.DateOfBirth === '') {
            validationError = true;
            this.setState({
                DateOfBirthError: 'لا يمكن ترك حقل تاريخ الميلاد فارغ',
                thereIsError : true
            })
        }
        if (this.state.Gender === '') {
            validationError = true;
            this.setState({
                GenderError: 'يرجى اختيار احد الخيارات اعلاه',
                thereIsError : true
            })
        }
        if (this.state.Nationality === '') {
            validationError = true;
            this.setState({
                NationalityError: 'يرجى اختيار احد الخيارات اعلاه',
                thereIsError : true
            })
        }
        if (this.state.Nationality === 'NotSaudi') {
            if (this.state.NationalityNotSaudiVal === '') {
                validationError = true;
                this.setState({
                    NationalityNotSaudiValError: 'لا يمكن ترك حقل الجنسية فارغ',
                    thereIsError : true
                });
            } else if (validationError === false) {
                this.setState({
                    Nationality: this.state.NationalityNotSaudiVal,
                })
            }
        }
     
        else if (validationError === false) {
            this.setState({
                FullNameError: '',
                DateOfBirthError: '',
                GenderError: '',
                NationalityError: '',
                NationalityNotSaudiValError:''
            });
            const PeronsalInfo = {
                FullName: this.state.FullName,
                DateOfBirth: this.state.DateOfBirth,
                Gender: this.state.Gender,
                Nationality: this.state.Nationality
            }

            axios.post('http://172.20.10.3:4000/api/sary/PersonalInfo', PeronsalInfo)
            .then(response => {
                this.setState({
                    showChecked: response.data.validation.showChecked,
                    show: false,
                })
            }).catch(error => {
                alert(error)
            })

        }


    }
    render() {

        return (

            <div className='section fadeIn'>

                <div className='section-title' onClick={this.onClick}>
                    {this.state.showChecked ?
                        <img src={checked} alt="checked" className="" />
                        : <img src="" alt="" />}
                    <p>معلوماتك الشخصية</p>
                    {this.state.showChecked ? 
                        <span className="dot" style={{
                            background: '#009ad0'
                        }}></span>
                        : !this.state.thereIsError ? <span className="dot" style={{
                            background: '#c5c8ce'
                        }}></span> : this.state.thereIsError ? <span className="dot" style={{
                                background: '#FF6565'
                        }}></span> : ''}

                
                </div>

                {this.state.show ?
                    <form onSubmit={this.onSubmit} className="sections_form">
                        <div className="input_group fadeIn">
                            <p className="input_lable">الإسم الثلاثي</p>
                            <input type="text" className="input_text"
                                onChange={this.onChangeFullName}
                                value={this.state.FullName} />
                            <p className="input_error">{this.state.FullNameError}</p>
                        </div>
                        <div className="input_group fadeIn">

                            <p className="input_lable">تاريخ الميلاد</p>
                            <input type="date" className="input_date"
                                onChange={this.onCahngeDateOfBirth}
                                value={this.state.DateOfBirth} />
                            <p className="input_error">{this.state.DateOfBirthError}</p>
                        </div>
                        <div className="input_group fadeIn">
                            <p className="input_lable">الجنس</p>
                            <div className="radios radio_line">

                                <div className="radio">
                                    <label for="Female">أنثى</label>
                                    <input type="radio" onChange={this.onChangeGender} id="Female" name="Gender" value="أنثى" />
                                </div>
                                <div className="radio">
                                    <label for="Male">ذكر</label>
                                    <input type="radio" onChange={this.onChangeGender} id="Male" name="Gender" value="ذكر"/>
                                </div>
                            </div>
                            <p className="input_error">{this.state.GenderError}</p>
                        </div>
                        <div className="input_group fadeIn">
                            <p className="input_lable">ما هي جنسيتك؟</p>
                            <div className="radios radio_line2">
                                <div className="radio" onClick={this.onClickNotSaudi}>
                                    <label for="NotSaudi">غير سعودي</label>
                                    <input type="radio" onChange={this.onCahngeNationality} id="NotSaudi" name="Nationality" value="NotSaudi" />
                                </div>
                                <div className="radio" onClick={this.onClickSaudi}>
                                    <label for="Saudi">سعودي</label>
                                    <input type="radio" onChange={this.onCahngeNationality} id="Saudi" name="Nationality" value="سعودي" />
                                </div>
                            </div>
                            <p className="input_error">{this.state.NationalityError}</p>
                        </div>
                        {this.state.notSaudi ?
                            <div className="input_group fadeIn">
                                <input type="text" className="input_text" placeholder="أذكر جنسيتك في حال الإجابة بغير سعودي"
                                    onChange={this.onChangeNationalityNotSaudiVal}
                                    value={this.state.NationalityNotSaudiVal} />
                                <p className="input_error">{this.state.NationalityNotSaudiValError}</p>
                            </div> : ''}

                        <button type="submit" className="submit fadeIn">متابعة</button>
                    </form>
                    : ''}
            </div>
        );
    }
}

export default PeronsalInfo;