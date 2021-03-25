import React, { Component } from 'react';
import checked from '../images/checked.png'
import axios from 'axios';
class Experiences extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            fiveToThere: '3 - 5',
            years: 'سنوات',
            five: '5',
            yeasrOrMore: 'سنوات وأكثر',
            showChecked: false,
            MarketingRepEx: '',
            MarketingRepExError: '',
            EducationalCertificate: '',
            EducationalCertificateError: '',
            GeneralMajor: '',
            GeneralMajorError: '',
            thereIsError: ''

        }
        this.onClick = this.onClick.bind(this);
        this.onChangeMarketingRepEx = this.onChangeMarketingRepEx.bind(this);
        this.onChangeEducationalCertificate = this.onChangeEducationalCertificate.bind(this);
        this.onChangeGeneralMajor = this.onChangeGeneralMajor.bind(this);
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

    onChangeMarketingRepEx(e) {
        this.setState({
            MarketingRepEx: e.target.value
        })
    }
    onChangeEducationalCertificate(e) {
        this.setState({
            EducationalCertificate: e.target.value
        })
    }
    onChangeGeneralMajor(e) {
        this.setState({
            GeneralMajor: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        this.setState({
            MarketingRepEx: '',
            EducationalCertificateError: '',
            GeneralMajorError: '',
        });
        var validationError = false;
        if (this.state.MarketingRepEx === ''){
            validationError = true;
            this.setState({
                MarketingRepExError: 'يرجى اختيار احد الخيارات اعلاه',
                thereIsError : true
            });
        }
        if(this.state.EducationalCertificate === ''){
            validationError = true;
            this.setState({
                EducationalCertificateError:'لا يمكن ترك حقل الشهادة التعليمية فارغ',
                thereIsError: true,
            })
        }
        if (this.state.GeneralMajor === ''){
            validationError = true;
            this.setState({
                GeneralMajorError: 'لا يمكن ترك حقل التخصص العام فارغ',
                thereIsError: true,
            })
        }
        else if (validationError === false){
            this.setState({
                MarketingRepExError: '',
                EducationalCertificateError: '',
                GeneralMajorError: '',
            });
            const QualiAndExper = {
                MarketingRepEx: this.state.MarketingRepEx,
                EducationalCertificate: this.state.EducationalCertificate,
                GeneralMajor: this.state.GeneralMajor,
            }

            axios.post('http://172.20.10.3:4000/api/sary/QualiAndExper' , QualiAndExper)
            .then(response => {
                 this.setState({
                     showChecked: response.data.validation.showChecked,
                     show: false
                 })
            })
            .catch(error => {
                alert(error)
            })
        }
    }
    render() {
        return (

            <div className='section fadeIn'>

                <div className='section-title' onClick={this.onClick}>
                    {this.state.showChecked ?
                        <img src={checked} alt="checked" />
                        : <img src="" alt="" />}
                    <p>المؤهلات والخبرات</p>
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
                            <p className="input_lable">هل توجد لديك خبرة في العمل كمندوب تسويق؟</p>
                            <div className="radios">
                                <div className="radio">
                                    <label for="none1">لا توجد خبرة</label>
                                    <input type="radio" id="none1" name="Exp2" value="لا توجد خبرة"
                                        onChange={this.onChangeMarketingRepEx} />
                                </div>
                                <div className="radio">
                                    <label for="11">سنة - 3 سنوات</label>
                                    <input type="radio" id="11" name="Exp2" value="سنة - 3 سنوات"
                                        onChange={this.onChangeMarketingRepEx} />
                                </div>
                                <div className="radio">
                                    <label for="33">{this.state.fiveToThere} {this.state.years}</label>
                                    <input type="radio" name="Exp2" id="33" value={this.state.years + ' ' + this.state.fiveToThere}
                                        onChange={this.onChangeMarketingRepEx} />
                                </div>
                                <div className="radio">
                                    <label for="55"> {this.state.five} {this.state.yeasrOrMore} </label>
                                    <input type="radio" name="Exp2" id="55" value={this.state.five + ' ' + this.state.yeasrOrMore}
                                        onChange={this.onChangeMarketingRepEx} />
                                </div>
                            </div>
                            <p className="input_error">{this.state.MarketingRepExError}</p>
                        </div>
                        <div className="input_group fadeIn">
                            <p className="input_lable">الشهادة التعليمية</p>
                            <select className="select" onChange={this.onChangeEducationalCertificate}
                            value={this.state.EducationalCertificate}>
                                <option value=''></option>
                                <option value='ثانوية عامة'>ثانوية عامة</option>
                                <option value='دبلوم'>دبلوم</option>
                                <option value='بكالوريوس'>بكالوريوس</option>
                                <option value='دبلوم عالي'>دبلوم عالي</option>
                                <option value='ماجستير'>ماجستير</option>
                                <option value='دكتوراه'>دكتوراه</option>
                            </select>
                            <p className="input_error">{this.state.EducationalCertificateError}</p>
                        </div>
                        <div className="input_group fadeIn">
                            <p className="input_lable">التخصص العام</p>
                            <select className="select" onChange={this.onChangeGeneralMajor}
                            value={this.state.GeneralMajor}>
                                <option value=''></option>
                                <option value='طب'>طب</option>
                                <option value='إدارة مالية و مصرفية'>إدارة مالية و مصرفية</option>
                                <option value='تسويق'>تسويق</option>
                                <option value='تصاميم و فنون'>تصاميم و فنون</option>
                                <option value='صحة عامة'>صحة عامة</option>
                                <option value='صيدلة'>صيدلة</option>
                                <option value='إدارة الاعمال'>إدارة الاعمال</option>
                                <option value='هندسة'>هندسة</option>
                                <option value='سياحة و الاثار'>سياحة و الاثار</option>
                                <option value='كلية المجتمع'>كلية المجتمع</option>
                                <option value='علوم طبية تطبيقية'>علوم طبية تطبيقية</option>
                                <option value='علوم'>علوم</option>
                                <option value='إلكترونيات'>إلكترونيات</option>
                                <option value='أداب'>أداب</option>
                                <option value='هندسة تطبيقية'>هندسة تطبيقية</option>
                                <option value='ثانوية عامة'>ثانوية عامة</option>
                                <option value='ادارة الاعمال التطبيقية'>ادارة الاعمال التطبيقية</option>
                                <option value='علوم الحاسب'>علوم الحاسب</option>
                                <option value='خدمات طبية طارئة'>خدمات طبية طارئة</option>
                                <option value='تربية'>تربية</option>
                                <option value='علوم الرياضة و النشاط البدني'>علوم الرياضة و النشاط البدني</option>
                                <option value='إدارة الموارد البشرية'>إدارة الموارد البشرية</option>
                                <option value='عمارة و تخطيط'>عمارة و تخطيط</option>
                                <option value='إدارة أعمال التأمين'>إدارة أعمال التأمين</option>
                                <option value='علوم الحاسب و المعلومات'>علوم الحاسب و المعلومات</option>
                                <option value='إقتصاد منزلي'>إقتصاد منزلي</option> 
                                <option value='إعلام'>إعلام</option>
                                <option value='علاقات عامة'>علاقات عامة</option>
                                <option value='شريعة'>شريعة</option> 
                                <option value='إتصالات و شبكات'>إتصالات و شبكات</option>
                                <option value='طب الاسنان'>طب الاسنان</option>
                                <option value='تمريض'>تمريض</option> 
                                <option value='علوم الاغذية و الزراعة'>علوم الاغذية و الزراعة</option>
                                <option value='لغات و الترجمة'>لغات و الترجمة</option> 
                                <option value='حقوق و علوم السياسة'>حقوق و علوم السياسة</option>
                                <option value='علوم الحاسب التطبيقي'>علوم الحاسب التطبيقي</option> 
                            </select>
                            <p className="input_error">{this.state.GeneralMajorError}</p>
                        </div>
                        <button type="submit" className="submit fadeIn">متابعة</button>
                    </form>
                    : ''}
            </div>
        );
    }
}

export default Experiences;