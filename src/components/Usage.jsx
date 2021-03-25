import React, { Component } from 'react';
import checked from '../images/checked.png';
import axios from 'axios';

const rx_numbers = /^[0-9]/;

class Usage extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            showChecked: false,
            MobileOS: '',
            OwnsACar: '',
            CarModel: '',
            CarVersion: '',
            MobileOSError: '',
            OwnsACarError: '',
            CarModelError: '',
            CarVersionError: '',
            haveCar: false,
            defultBackground: '#c5c8ce',
            thereIsError: ''

        }
        this.onClick = this.onClick.bind(this);
        this.changeMobileOS = this.changeMobileOS.bind(this);
        this.changeOwnsACar = this.changeOwnsACar.bind(this);
        this.changeCarModel = this.changeCarModel.bind(this);
        this.cahngeCarVersion = this.cahngeCarVersion.bind(this);
        this.onClickHaveCar = this.onClickHaveCar.bind(this);
        this.onClickHaveNoCar = this.onClickHaveNoCar.bind(this);
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
    onClickHaveCar() {
        this.setState({
            haveCar: true
        })
    }
    onClickHaveNoCar() {
        this.setState({
            haveCar: false
        })
    }
    changeMobileOS(e) {
        this.setState({
            MobileOS: e.target.value
        });
    }
    changeOwnsACar(e) {
        this.setState({
            OwnsACar: e.target.value
        });
    }
    cahngeCarVersion(e) {
        this.setState({
            CarVersion: e.target.value
        });
    }
    changeCarModel(e) {
        this.setState({
            CarModel: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            MobileOSError: '',
            OwnsACarError: '',
            CarVersionError: '',
            CarModelError: '',
        });
        var validationError = false;
        if (this.state.MobileOS === '') {
            validationError = true;
            this.setState({
                MobileOSError: 'يرجى اختيار احد الخيارات اعلاه',
                thereIsError: true
            })
        }
        if (this.state.OwnsACar === '') {
            validationError = true;
            this.setState({
                OwnsACarError: 'يرجى اختيار احد الخيارات اعلاه',
                thereIsError: true
            })
        }
        if (this.state.OwnsACar === 'Yes') {
            if (this.state.CarVersion === '') {
                validationError = true;
                this.setState({
                    CarVersionError: 'لا يمكن ترك حقل نوع السيارة فارغ',
                    thereIsError: true
                });
            }
            if (this.state.CarModel === '') {
                validationError = true;
                this.setState({
                    CarModelError: 'لا يمكن ترك حقل موديل السيارة فارغ',
                    thereIsError: true
                })
            }
            if (this.state.CarModel.length !== 4) {
                validationError = true;
                this.setState({
                    CarModelError: 'يرجى كتابة موديل السيارة بشكل صحيح ، مثال : 2016',
                    thereIsError: true
                })
            }
            if (!rx_numbers.test(this.state.CarModel)) {
                validationError = true;
                this.setState({
                    CarModelError: 'يرجى كتابة موديل السيارة بشكل صحيح ، مثال : 2016',
                    thereIsError: true
                })
            }
            else if (validationError === false) {
                let car = this.state.CarModel + ' ' + this.state.CarVersion
                this.setState({
                    OwnsACar: car,
                    thereIsError: false
                })
            }
        }


        else if (validationError === false) {
            this.setState({
                CarVersionError: '',
                CarModelError: '',
                OwnsACarError: '',
                MobileOSError: '',
            });
            const Usage = {
                MobileOS: this.state.MobileOS,
                OwnsACar: this.state.OwnsACar,
            }

            axios.post('http://172.20.10.3:4000/api/sary/Usage', Usage)
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
                    <p>أدوات الإستخدام والتنقل</p>
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
                            <p className="input_lable">نظام تشغيل الجوال</p>
                            <div className="radios radio_line">

                                <div className="radio">
                                    <label for="Andriod">Andriod</label>
                                    <input type="radio" onChange={this.changeMobileOS} id="Andriod" name="OS" value="Andriod" />
                                </div>
                                <div className="radio">
                                    <label for="iOS">iOS</label>
                                    <input type="radio" onChange={this.changeMobileOS} id="iOS" name="OS" value="iOS" />
                                </div>
                            </div>
                            <p className="input_error">{this.state.MobileOSError}</p>
                        </div>
                        <span className='Line2'></span>
                        <div className="input_group fadeIn">
                            <p className="input_lable">هل تتوفر لديك سيارة</p>
                            <div className="radios radio_line">

                                <div className="radio">
                                    <label for="لا">لا</label>
                                    <input type="radio" onChange={this.changeOwnsACar} onClick={this.onClickHaveNoCar} id="لا" name="Car" value="لا" />
                                </div>
                                <div className="radio">
                                    <label for="نعم">نعم</label>
                                    <input type="radio" onChange={this.changeOwnsACar} onClick={this.onClickHaveCar} id="نعم" name="Car" value="Yes" />
                                </div>
                            </div>
                            <p className="input_error">{this.state.OwnsACarError}</p>
                        </div>

                        {this.state.haveCar ?
                            <div>
                                <div className="input_group fadeIn">
                                    <p className="input_lable">نوع السيارة</p>
                                    <input type="text" className="input_text"
                                        onChange={this.cahngeCarVersion}
                                        value={this.state.CarVersion} />
                                    <p className="input_error">{this.state.CarVersionError}</p>
                                </div>
                                <div className="input_group fadeIn">
                                    <p className="input_lable">موديل السيارة</p>
                                    <input type="number" className="input_text"
                                        onChange={this.changeCarModel}
                                        value={this.state.CarModel} />
                                    <p className="input_error">{this.state.CarModelError}</p>
                                </div>
                            </div> : ''}
                        <button type="submit" className="submit fadeIn">متابعة</button>
                    </form>
                    : ''}
            </div>
        );
    }
}

export default Usage;