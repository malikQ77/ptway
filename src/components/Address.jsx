//
//  NOT USED
//
//
import React, { Component } from 'react';
import checked from '../images/checked.png';
import axios from 'axios';
class Address extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            City: '',
            NBHD: '',
            CityError: '',
            NBHDError: '',
            showChecked: false,
            thereIsError: ''



        }
        this.onClick = this.onClick.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changeNBHD = this.changeNBHD.bind(this);
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

    changeCity(e) {
        this.setState({
            City: e.target.value,
        })
    }
    changeNBHD(e) {
        this.setState({
            NBHD: e.target.value,
        })
    }
    onSubmit(e) {
        this.setState({
            CityError: '',
            NBHDError: ''
        })
        e.preventDefault();
        var validationError = false;
        if (this.state.City === '') {
            validationError = true;
            this.setState({
                CityError: 'لا يمكن ترك حقل المدينة فارغ',
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
                CityError: '',
                NBHDError: ''
            })
            const Address = {
                City: this.state.City,
                NBHD: this.state.NBHD,
            }
            axios.post('http://127.0.0.1:4000/api-posts/Address', Address)
                .then(response => {
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
                    <p>العنوان</p>
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
                            <p className="input_lable">المدينة</p>
                            <select className="select"
                                onChange={this.changeCity}
                                value={this.state.City}>
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
                            <p className="input_error">{this.state.CityError}</p>
                        </div>
                        <div className="input_group fadeIn">
                            <p className="input_lable">الحي السكني</p>
                            <input type="text" className="input_text"
                                onChange={this.changeNBHD}
                                value={this.state.NBHD}
                            />
                            <p className="input_error">{this.state.NBHDError}</p>
                        </div>
                        <button type="submit" className="submit fadeIn">متابعة</button>
                    </form>
                    : ''}
            </div>
        );
    }
}

export default Address;