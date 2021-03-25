const express = require('express')
const router = express.Router()
const SchemaCopy = require('../../models/sarySchema')
const excel = require("exceljs")


let JobPreferences = {
    PreferredCompany: '',
    PreferredTime: '',
    PreferredCity: '',
    NBHD: '',
    CoveredAreas: ''
}
let Usage = {
    MobileOS: '',
    OwnsACar: ''
}
let QualiAndExper = {
    MarketingRepEx: '',
    EducationalCertificate: '',
    GeneralMajor: '',
}
let PersonalInfo = {
    FullName: '',
    DateOfBirth: '',
    Gender: '',
    Nationality: ''
}
let Communicate = {
    Phone: '',
    Email: '',
    RegisteredOnPtway: '',
    HearAboutPtway: ''
}
let form = {
    JobPreferences: '',
    ToolsUsed: '',
    QualiAndExper: '',
    PersonalInfo: '',
    Communicate: ''
}


router.post('/JobPreferences', (req, res) => {
    let validation = {
        PreferredCompanyError: '',
        PreferredCityError: '',
        PreferredTimeError: '',
        NBHDError: '',
        CoveredAreasError: ''
    }
    if (!req.body.PreferredCompany ||
        !req.body.PreferredCity ||
        !req.body.PreferredTime ||
        !req.body.NBHD ||
        !req.body.CoveredAreas
    ) {
        if (!req.body.PreferredCompany) {
            validation.PreferredCompanyError = 'يرجى اختيار احد الخيارات اعلاه'
            validation.showChecked = false
        }
        if (!req.body.PreferredTime) {
            validation.PreferredTimeError = 'يرجى اختيار احد الخيارات اعلاه'
            validation.showChecked = false
        }
        if (!req.body.PreferredCity) {
            validation.PreferredCityError = 'يرجى اختيار احد الخيارات اعلاه'
            validation.showChecked = false
        }
        if (!req.body.NBHD) {
            validation.NBHDError = 'لايمكن ترك حقل الحي فارغ'
            validation.showChecked = false
        }
        if (!req.body.CoveredAreas) {
            validation.CoveredAreasError = 'يرجى اختيار منطقة واحدة على الاقل'
            validation.showChecked = false
        }
        res.json({ validation: validation })
    } else {
        //------- Submit JobPreferences information -------
        JobPreferences.PreferredCompany = req.body.PreferredCompany
        var time = '';
        var i = 0;
        for (i; i < req.body.PreferredTime.length - 1; i++) {
            time += req.body.PreferredTime[i] + ' , '
        }
        time += req.body.PreferredTime[i]
        JobPreferences.PreferredTime = time
        JobPreferences.PreferredCity = req.body.PreferredCity
        JobPreferences.NBHD = req.body.NBHD
        var areas = '';
        var i = 0
        for (i; i < req.body.CoveredAreas.length - 1; i++) {
            areas += req.body.CoveredAreas[i] + ' , '
        }
        areas += req.body.CoveredAreas[i]
        JobPreferences.CoveredAreas = areas

        form.JobPreferences = JobPreferences

        res.json({ validation: validation })
    }
})

router.post('/Usage', (req, res) => {
    let validation = {
        MobileOSError: '',
        OwnsACarError: '',
        showChecked: true
    }

    if (!req.body.MobileOS ||
        !req.body.OwnsACar
    ) {
        if (!req.body.MobileOS) {
            validation.MobileOSError = 'يرجى اختيار احد الخيارات اعلاه'
            validation.showChecked = false
        }
        if (!req.body.OwnsACar) {
            validation.OwnsACarError = 'يرجى اختيار احد الخيارات اعلاه'
            validation.showChecked = false
        }

        res.json({ validation: validation })
    } else {
        //------- Submit ToolsUsed information -------
        Usage.MobileOS = req.body.MobileOS
        Usage.OwnsACar = req.body.OwnsACar

        form.Usage = Usage

        res.json({ validation: validation })
    }

})
router.post('/QualiAndExper', (req, res) => {
    let validation = {
        MarketingRepExError: '',
        EducationalCertificateError: '',
        GeneralMajorError: '',
        showChecked: true,
    }
    if (!req.body.MarketingRepEx ||
        !req.body.EducationalCertificate ||
        !req.body.GeneralMajor

    ) {
        if (!req.body.MarketingRepEx) {
            validation.MarketingRepEx = 'يرجى اختيار احد الخيارات اعلاه'
            validation.showChecked = false
        }
        if (!req.body.EducationalCertificate) {
            validation.EducationalCertificateError = 'لايمكن ترك حقل الشهادة العلمية فارغ'
            validation.showChecked = false
        }
        if (!req.body.GeneralMajor) {
            validation.GeneralMajorError = 'لايمكن ترك حقل التخصص العام فارغ'
            validation.showChecked = false
        }

        res.json({ validation: validation })
    } else {
        //------- Submit Qualifications and Experiences information -------
        QualiAndExper.MarketingRepEx = req.body.MarketingRepEx
        QualiAndExper.EducationalCertificate = req.body.EducationalCertificate
        QualiAndExper.GeneralMajor = req.body.GeneralMajor

        form.QualiAndExper = QualiAndExper

        res.json({ validation: validation })
    }
})

router.post('/PersonalInfo', (req, res) => {

    let validation = {
        FullNameError: '',
        DateOfBirthError: '',
        GenderError: '',
        NationalityError: '',
        showChecked: true
    }

    if (!req.body.FullName ||
        !req.body.DateOfBirth ||
        !req.body.Gender ||
        !req.body.Nationality
    ) {
        if (!req.body.FullName) {
            validation.FullNameError = 'لايمكن ترك حقل الأسم الثلاثي فارغ'
            validation.showChecked = false
        }
        if (!req.body.DateOfBirth) {
            validation.DateOfBirthError = 'لايمكن ترك حقل تاريخ الميلاد فارغ'
            validation.showChecked = false
        }
        if (!req.body.Gender) {
            validation.GenderError = 'لايمكن ترك حقل الجنس فارغ'
            validation.showChecked = false
        }
        if (!req.body.Nationality) {
            validation.NationalityError = 'يرجى اختيار احد الخيارات اعلاه'
            validation.showChecked = false
        }
        res.json({ validation: validation })
    } else {
        //------- Submit Personal information -------
        PersonalInfo.FullName = req.body.FullName
        PersonalInfo.DateOfBirth = req.body.DateOfBirth
        PersonalInfo.Gender = req.body.Gender
        PersonalInfo.Nationality = req.body.Nationality

        form.PersonalInfo = PersonalInfo

        res.json({ validation: validation })
    }

})

router.post('/Communicate', async(req, res) => {
    let validation = {
        PhoneError: '',
        EmailError: '',
        RegisteredOnPtwayError: '',
        HearAboutPtwayError: '',
        showChecked: true,
        EmptySection: false
    }
    if (!req.body.Phone ||
        !req.body.Email ||
        !req.body.RegisteredOnPtway ||
        !req.body.HearAboutPtway
    ) {
        if (!req.body.Phone) {
            validation.PhoneError = 'لايمكن ترك حقل الجوال فارغ'
            validation.showChecked = false
        }
        if (!req.body.Email) {
            validation.EmailError = 'لايمكن ترك حقل البريد الإلكتروني فارغ'
            validation.showChecked = false
        }
        if (!req.body.RegisteredOnPtwayError) {
            validation.RegisteredOnPtwayError = 'يرجى اختيار احد الخيارات اعلاه'
            validation.showChecked = false
        }
        if (!req.body.HearAboutPtway) {
            validation.HearAboutPtwayError = 'يرجى اختيار احد الخيارات اعلاه'
            validation.showChecked = false
        }
        res.json({ validation: validation })

    } else if (req.body.Email && req.body.Phone) {
        const EmailDistinctValues = await SchemaCopy.distinct('Communicate.Email')
        const PhoneDistinctValues = await SchemaCopy.distinct('Communicate.Phone')

        for (var i = 0; i < EmailDistinctValues.length; i++) {
            if (req.body.Email === EmailDistinctValues[i]) {
                validation.EmailError = 'الايميل مسجل مسبقاً'
                validation.showChecked = false
            }
            if (req.body.Phone === PhoneDistinctValues[i]) {
                validation.PhoneError = 'الجوال مسجل مسبقاً'
                validation.showChecked = false
            }
        }
        if (validation.PhoneError !== '' || validation.EmailError !== '') {
            res.json({ validation: validation })
        }
    }
    if (
        validation.PhoneError === '' &&
        validation.EmailError === '' &&
        validation.RegisteredOnPtwayError === '' &&
        validation.HearAboutPtwayError === ''

    ) {
        //------- Submit Communication information -------
        Communicate.Phone = req.body.Phone
        Communicate.Email = req.body.Email
        Communicate.RegisteredOnPtway = req.body.RegisteredOnPtway
        Communicate.HearAboutPtway = req.body.HearAboutPtway

        form.Communicate = Communicate
        if (!form.JobPreferences || !form.Usage || !form.PersonalInfo || !form.QualiAndExper || !form.Communicate) {
            validation.EmptySection = true
            res.json({ validation: validation })
        } else {

            const nDate = new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Riyadh'
            });
            form.SubmitDate = nDate
            const formData = new SchemaCopy(form)
            formData.save()
            res.json({ validation: validation })
        }
    }

})
router.get('/GetReport/:PostID', (req, res) => {
    if (req.params.PostID === "6989@dfr") {
        SchemaCopy.find({}, function(err, users) {
            let report = [];
            users.forEach((user) => {
                report.push({
                    PreferredCompany: user.JobPreferences.PreferredCompany,
                    PreferredTime: user.JobPreferences.PreferredTime,
                    PreferredCity: user.JobPreferences.PreferredCity,
                    NBHD: user.JobPreferences.NBHD,
                    CoveredAreas: user.JobPreferences.CoveredAreas,
                    MobileOS: user.Usage.MobileOS,
                    OwnsACar: user.Usage.OwnsACar,
                    MarketingRepEx: user.QualiAndExper.MarketingRepEx,
                    EducationalCertificate: user.QualiAndExper.EducationalCertificate,
                    GeneralMajor: user.QualiAndExper.GeneralMajor,
                    FullName: user.PersonalInfo.FullName,
                    DateOfBirth: user.PersonalInfo.DateOfBirth,
                    Gender: user.PersonalInfo.Gender,
                    Nationality: user.PersonalInfo.Nationality,
                    Phone: user.Communicate.Phone,
                    Email: user.Communicate.Email,
                    SubmitDate: user.SubmitDate
                });
            });


            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet("Report");

            worksheet.columns = [
                { header: "الشركة المفضلة", key: "PreferredCompany", width: 30, height: 30 },
                { header: "الوقت المفضل", key: "PreferredTime", width: 30, height: 30 },
                { header: "المدينة المفضلة", key: "PreferredCity", width: 30, height: 30 },
                { header: "الحي السكني", key: "NBHD", width: 30, height: 30 },
                { header: "اماكن التغطية", key: "CoveredAreas", width: 30, height: 30 },
                { header: "نظام تشغيل الجوال ", key: "MobileOS", width: 30, height: 30 },
                { header: "السيارة", key: "OwnsACar", width: 30, height: 30 },
                { header: "خبرة مندوب تسويق", key: "MarketingRepEx", width: 30, height: 30 },
                { header: "الشهادة التعليمية", key: "EducationalCertificate", width: 30, height: 30 },
                { header: "التخصص العام", key: "GeneralMajor", width: 30, height: 30 },
                { header: "الأسم الثلاثي", key: "FullName", width: 30, height: 30 },
                { header: "تاريخ الميلاد", key: "DateOfBirth", width: 30, height: 30 },
                { header: "الجنس", key: "Gender", width: 30, height: 30 },
                { header: "الجنسية", key: "Nationality", width: 30, height: 30 },
                { header: "رقم الجوال", key: "Phone", width: 30, height: 30 },
                { header: "البريد الإلكتروني", key: "Email", width: 30, height: 30 },
                { header: "تاريخ التسجيل", key: "SubmitDate", width: 30, height: 30 },

            ];

            worksheet.getRow('1').fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '00009bd5' }
            };
            worksheet.addRows(report);

            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + "saryReport.xlsx"
            )

            return workbook.xlsx.write(res).then(function() {
                res.send("downloaded");
            });
        })
    }
})


// router.get('/joke', (req, res) => {
//     array = [
//         'bla bla',
//         'tatata',
//         'jajajaj'
//     ];
//     res.json({ 'joke': Math.floor(Math.random() * 100) + '' });
// })


router.get('/phases', (req, res) => {

    phases = [
        'Planing',
        'Analysis',
        'Design',
        'Implementation',
        'Testing & Integration',
        'Maintenance',
    ]

    res.json({ 'phases': phases })
})

module.exports = router