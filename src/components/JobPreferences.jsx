import React, { Component } from 'react';
import checked from '../images/checked.png';
import axios from 'axios';

class JobPreferences extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            PreferredCompany: 'ساري',
            PreferredTime: [],
            CoveredAreas: [],
            PreferredCity: '',
            NBHD: '',
            PreferredCompanyError: '',
            PreferredTimeError: '',
            CoveredAreasError: '',
            PreferredCityError: '',
            NBHDError: '',
            showChecked: false,
            thereIsError: '',
            itemChecked: false
        }
        this.onClick = this.onClick.bind(this);
        this.changePreferredCity = this.changePreferredCity.bind(this);
        this.changeNBHD = this.changeNBHD.bind(this);
        this.changePreferredCompany = this.changePreferredCompany.bind(this);
        this.changePreferredTime = this.changePreferredTime.bind(this);
        this.changeCoveredAreas = this.changeCoveredAreas.bind(this);
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
    changePreferredCompany(e) {
        this.setState({
            PreferredCompany: e.target.value,
        })
    }
    changePreferredTime(e) {
        if (e.target.checked) {
            var time = this.state.PreferredTime;
            if (!time.includes(e.target.value)) {
                time.push(e.target.value)
                this.setState({
                    PreferredTime: time,
                })
            }
        }

    }
    changeCoveredAreas(e) {
        var CoveredAreas = this.state.CoveredAreas;
        CoveredAreas.push(e.target.value)
        this.setState({
            CoveredAreas: CoveredAreas,
        })
    }
    changePreferredCity(e) {
        this.setState({
            PreferredCity: e.target.value,
        })
    }
    changeNBHD(e) {
        this.setState({
            NBHD: e.target.value,
        })
    }
    onSubmit(e) {
        this.setState({
            PreferredCityError: '',
            NBHDError: ''
        })
        e.preventDefault();
        var validationError = false;
        if (this.state.PreferredCompany === '') {
            validationError = true;
            this.setState({
                PreferredCompanyError: 'لا يمكن ترك حقل الشركة فارغ',
                thereIsError: true

            })
        }
        if (this.state.PreferredTime.length === 0) {
            validationError = true;
            this.setState({
                PreferredTimeError: 'يرجى اختيار احد الخيارات اعلاه',
                thereIsError: true

            })
        }else{
            this.setState({
                PreferredTimeError: '',
            })
        }
        if (this.state.CoveredAreas.length === 0) {
            validationError = true;
            this.setState({
                CoveredAreasError: 'يرجى اختيار احد الخيارات اعلاه',
                thereIsError: true

            })
        } else {
            this.setState({
                CoveredAreasError: '',
            })
        }
        if (this.state.PreferredCity === '') {
            validationError = true;
            this.setState({
                PreferredCityError: 'لا يمكن ترك حقل المدينة فارغ',
                thereIsError: true

            })
        }
        if (this.state.NBHD === '') {
            validationError = true;
            this.setState({
                NBHDError: 'لا يمكن ترك حقل الحي فارغ',
                thereIsError: true
            })
        }
        else if (validationError === false) {
            this.setState({
                PreferredCompanyError: '',
                PreferredCityError: '',
                NBHDError: '',
                PreferredTimeError: '',
                CoveredAreasError: '',

            })
            var areass = [];
            var JobPreferences = '';
            if (this.state.CoveredAreas.includes('الكل')) {
                areass.push('الكل')
                JobPreferences = {
                    PreferredCompany: this.state.PreferredCompany,
                    PreferredTime: this.state.PreferredTime,
                    CoveredAreas: areass,
                    PreferredCity: this.state.PreferredCity,
                    NBHD: this.state.NBHD,
                }
            } else {
                JobPreferences = {
                    PreferredCompany: this.state.PreferredCompany,
                    PreferredTime: this.state.PreferredTime,
                    CoveredAreas: this.state.CoveredAreas,
                    PreferredCity: this.state.PreferredCity,
                    NBHD: this.state.NBHD,
                }
            }
            axios.post('http://172.20.10.3:4000/api/sary/JobPreferences', JobPreferences)
                .then(response => {
                    // alert(response.data.validation)
                    this.setState({
                        showChecked: true,
                        show: false
                    })
                }).catch(error => {
                    alert(error);
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
                    <p>تفضيلات الوظيفة</p>
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
                            <p className="input_lable">تفضل العمل بأي شركة؟</p>
                            <select className="select"
                                onChange={this.changePreferredCompany}
                                value={this.state.PreferredCompany}>
                                <option>ساري</option>
                            </select>
                            <p className="input_error">{this.state.PreferredCompanyError}</p>
                        </div>
                        <div className="input_group fadeIn">
                            <p className="input_lable">ما هي الأوقات المناسبة للعمل؟</p>
                            <div className="radios">
                                <div className="check">
                                    <label for="check1">صباحاً</label>
                                    <input type="checkbox" id="check1" name="PreferredTime" value="صباحاً"
                                        onChange={this.changePreferredTime} />
                                </div>
                                <div className="check">
                                    <label for="check2">مساءً</label>
                                    <input type="checkbox" id="check2" name="PreferredTime" value="مساءً"
                                        onChange={this.changePreferredTime} />
                                </div>
                            </div>
                            <p className="input_error">{this.state.PreferredTimeError}</p>
                        </div>
                        <span className='Line'></span>
                        <div className="input_group fadeIn">
                            <p className="input_lable">المدينة</p>
                            <select className="select"
                                onChange={this.changePreferredCity}
                                value={this.state.PreferredCity}>
                                <option value=""></option>
                                <option value="الرياض">  الرياض</option>
                                <option value="الجوف"> الجوف</option>
                                <option value="الدمام">الدمام</option>
                                <option value="بريدة">بريدة</option>
                                <option value="الأحساء">الأحساء</option>
                                <option value="الجبيل">  الجبيل</option>
                                <option value="القطيف">القطيف</option>
                                <option value="الخرج">  الخرج</option>
                                <option value="  دومة الجندل">  دومة الجندل</option>
                                <option value="  الباحة">  الباحة</option>
                                <option value="الرس">الرس</option>
                                <option value="العيينة">العيينة</option>
                                <option value="  الطائف">  الطائف</option>
                                <option value="القصيم">القصيم</option>
                                <option value="المجمعة">المجمعة</option>
                                <option value=" تبوك"> تبوك</option>
                                <option value="  نجران">  نجران</option>
                                <option value="  ابها">  ابها</option>
                                <option value="  الشقراء">  الشقراء</option>
                                <option value="  بيشة">  بيشة</option>
                                <option value="الدوادمي">الدوادمي</option>
                                <option value="  جازان">  جازان</option>
                                <option value="المدينة المنورة">المدينة المنورة</option>
                                <option value="الظهران">الظهران</option>
                                <option value=" الحدود الشمالية"> الحدود الشمالية</option>
                                <option value="  عرعر">  عرعر</option>
                                <option value="الخفجي">الخفجي</option>
                                <option value="خميس مشيط">خميس مشيط</option>
                                <option value="  سكاكا">  سكاكا</option>
                                <option value="حفر الباطن">حفر الباطن</option>
                                <option value="عنيزة">عنيزة</option>
                                <option value="جدة">جدة</option>
                                <option value="مكة المكرمة">مكة المكرمة</option>
                                <option value="  عسير">  عسير</option>
                                <option value="  الخبر">  الخبر</option>
                                <option value="ينبع">ينبع</option>
                                <option value="  حائل">حائل</option>

                            </select>
                            <p className="input_error">{this.state.PreferredCityError}</p>
                        </div>
                        <div className="input_group fadeIn">
                            <p className="input_lable">الحي السكني</p>
                            <input type="text" className="input_text"
                                onChange={this.changeNBHD}
                                value={this.state.NBHD}
                            />
                            <p className="input_error">{this.state.NBHDError}</p>
                        </div>
                        <div className="input_group fadeIn">
                            <p className="input_lable">:المناطق في المدينة التي تستطيع تغطيتها</p>
                            <div className="radios">
                                <div className="check">
                                    <label for="check11">الكل</label>
                                    <input type="checkbox" id="check11" name="" value="الكل"
                                        onChange={this.changeCoveredAreas} />
                                </div>
                                <div className="check">
                                    <label for="check22">وسط المدينة</label>
                                    <input type="checkbox" id="check22" name="" value="وسط المدينة"
                                        onChange={this.changeCoveredAreas} />
                                </div>
                                <div className="check">
                                    <label for="check33">شمال المدينة</label>
                                    <input type="checkbox" id="check33" name="" value="شمال المدينة"
                                        onChange={this.changeCoveredAreas} />
                                </div>
                                <div className="check">
                                    <label for="check44">جنوب المدينة</label>
                                    <input type="checkbox" id="check44" name="" value="جنوب المدينة"
                                        onChange={this.changeCoveredAreas} />
                                </div>
                                <div className="check">
                                    <label for="check55">شرق المدينة</label>
                                    <input type="checkbox" id="check55" name="" value="شرق المدينة"
                                        onChange={this.changeCoveredAreas} />
                                </div>
                                <div className="check">
                                    <label for="check66">غرب المدينة</label>
                                    <input type="checkbox" id="check66" name="" value="غرب المدينة"
                                        onChange={this.changeCoveredAreas} />
                                </div>
                            </div>
                            <p className="input_error">{this.state.CoveredAreasError}</p>
                        </div>
                        <button type="submit" className="submit fadeIn">متابعة</button>
                    </form>
                    : ''}
            </div>
        );
    }
}

export default JobPreferences;