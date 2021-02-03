import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const messages = {    
    'en': {
        menuitems: {
            home: 'Home',
            companies: 'Companies',
            dashboard: 'Dashboard',
            login: 'Log in', 
            logout: 'Log out'
        },
        footer: {
            links: 'Links',
            faq: 'FAQ',
            help: 'Help',
            support: 'Support',
            legal: 'Legal',
            termsOfUse: 'Terms of use',
            privacy: 'Privacy',
            social: 'Social',
            company: 'Company',
            officialBlog: 'Official Blog',
            aboutUs: 'About Us',
            contact: 'Contact',
        },
        landingPage: {
            websitePurpose: {
                smallerParagraph: 'Do you want to keep track of visitors?',
                header: 'Prego - Visitor Management System',
                biggerParagraph: 'No more Excel spreadsheets and paper notebooks!',
                requestDemo: 'Request Demo',
            },
            purposeExplained: {
                header: 'What we offer',
                checkIn: 'Check in with kiosk',
                checkInOptions: 'You can use the kiosk at the facility to register your visit, you can also scan the QR code and register through your phone.',
                preregistration: 'Pre-registration',
                preregistrationOptions: 'Easily register an upcoming visit from the luxury of your home.',
            },
            workguide: {
                header: 'How it works',
                step: 'Step',
                stepOne: 'Companies make their own forms so visitors can fill them in.',
                stepTwo: 'Visitors can then fill the form either with the kiosk or use the preregistration.',
                stepThree: 'Safely monitors who enters and leaves your building and notifies hosts.',
                seeVideo: 'See video',
            }
        },
        companiesHome: {
            section: 'prego/companies',
            header: 'All Companies',
            subheader: 'Click on a company logo to book a visit',
            searchbarContent: 'Enter company name or building',
            sort: {
                title: 'Sort by',
                sortByNameAsc: 'Name ascending (asc.)',
                sortByNameDesc: 'Name descending (desc.)',
                sortByBuildingNameAsc: 'Building name ascending (asc.)',
                sortByBuildingNameDesc: 'Building name descending (desc.)',
            },
            office: 'Office',
            viewAllCompanies: 'View all companies',
        },
        logInPage: {
            header: 'Log in',
            subheader: 'Welcome to Prego building registration manager!',
            emailPlaceholder: 'Enter your email',
            passwordPlaceholder: 'Enter your password',
            showPassword: 'Show password',
            hidePassword: 'Hide password',
            forgotPassword: 'Forgot password?',
            termsConditions: 'Terms and conditions',
        },
        dashboardBuildingOwner: {
            section: 'Owner',
            address: 'Address',
            content: {
                title: 'Companies overview',
                subtitle: 'View, add, update and delete company profiles',
                addNewButton: 'Add new company',
            },
            crudCompanyForms: {
                titleAdd: 'Add company',
                companyName: 'Company name',
                officeNumber: 'Office number',
                managerName: 'Manager name',
                ownerEmail: 'Owner email',
                submitButton: 'Submit',
                closeButton: 'Close',
                saveButton: 'Save',
            },
        },
        areYouSurePopUp: {
            content: 'Are you sure?',
            yes: 'Yes',
            no: 'No',
        },
        companyPage: {
            preregisterButton: 'Pre-register',
            settingsButton: 'Settings',
            aboutUsTitle: 'About us',
        },
        dashboardCompanyOwner: {
            title: 'Manage your company',
            subtitle: 'Double click below to edit',
            mainInfo: {
                company: 'Company name',
                office: 'Office number',
                manager: 'Manager name',
                email: 'Email'
            },
            companyDetails: {
                section: 'Company details',
                description: 'Description',
                history: 'Company history',
                editButton: 'Edit',
            },
            employeesList: {
                section: 'Employees overview',
                subtitle: "View, add, update and delete employee's profiles",
                saveButton: 'Save',
            },
            addNewEmployeeForm: {
                addNewButton: 'Add new employee',
                title: 'Add employee',
                firstName: 'Employee first name',
                lastName: 'Last name',
                email: 'Email',
                submit: 'Submit',
                close: 'Close',
            }
        },
        dashboardEmployee: {
            title: 'Welcome',
            subtitle: 'REVIEW YOUR DAILY SCHEDULE',
        }
    }, 
   'nl': {
        menuitems: {
            home: 'Home',
            companies: 'Bedrijven',
            dashboard: 'Dashboard',
            login: 'Inloggen',
            logout: 'Uitloggen'
       },
       footer: {
            links: 'Links',
            faq: 'FAQ',
            help: 'Help',
            support: 'Ondersteuning',
            legal: 'Juridisch',
            termsOfUse: 'Gebruiksvoorwaarden',
            privacy: 'Privacy',
            social: 'Sociaal',
            company: 'Bedrijf',
            officialBlog: 'Officiële Blog',
            aboutUs: 'Over Ons',
            contact: 'Contact',
        },
        landingPage: {
            websitePurpose: {
                smallerParagraph: 'Wil je bezoekers bijhouden?',
                header: 'Prego - Bezoekersbeheersysteem',
                biggerParagraph: 'Geen Excel-spreadsheets en papieren notitieboeken meer!',
                requestDemo: 'Een demo aanvragen',
            },
            purposeExplained: {
                header: 'Wat we aanbieden',
                checkIn: 'Inchecken bij een kiosk',
                checkInOptions: 'U kunt de kiosk op de faciliteit gebruiken om uw bezoek te registreren, u kunt ook de QR-code scannen en registreren via uw telefoon.',
                preregistration: 'Pre-registratie',
                preregistrationOptions: 'Meld eenvoudig een opkomend bezoek aan vanuit de luxe van uw huis.',
            },
            workguide: {
                header: 'Hoe het werkt',
                step: 'Stap',
                stepOne: 'Bedrijven maken hun eigen formulieren zodat bezoekers deze kunnen invullen.',
                stepTwo: 'Bezoekers kunnen het formulier vervolgens invullen met de kiosk of de voorregistratie gebruiken.',
                stepThree: 'Houdt veilig in de gaten wie uw gebouw binnenkomt en verlaat en stelt de gastheren op de hoogte.',
                seeVideo: 'Zie video',
            }
        },
        companiesHome: {
            section: 'prego/ bedrijven ',
            header: 'Alle Bedrijven',
            subheader: 'Klik op een bedrijfslogo om een bezoek te boeken',
            searchbarContent: 'Voer bedrijfsnaam of het gebouw in',
            sort: {
                title: 'Sorteer op',
                sortByNameAsc: 'Naam (oplopend) ',
                sortByNameDesc: 'Naam (aflopend)',
                sortByBuildingNameAsc: 'Naam van het gebouw (oplopend)',
                sortByBuildingNameDesc: 'Naam van het gebouw (aflopend)',
            },
            office: 'Kantoor',
            viewAllCompanies: 'Bekijk alle bedrijven',
        },
        logInPage: {
            header: 'Inloggen',
            subheader: 'Welkom bij Prego gebouwenregistratie manager!',
            emailPlaceholder: 'Vul je e-mailadres in',
            password: 'Wachtwoord',
            passwordPlaceholder: 'Voer uw wachtwoord in',
            showPassword: 'Laat wachtwoord zien',
            hidePassword: 'Verberg wachtwoord',
            forgotPassword: 'Wachtwoord vergeten?',
            termsConditions: 'Algemene voorwaarden',
        },
        dashboardBuildingOwner: {
            section: 'Eigenaar',
            address: 'Adres',
            content: {
                title: 'Bedrijven overzicht',
                subtitle: 'Bedrijfsprofielen bekijken, toevoegen, bijwerken en verwijderen',
                addNewButton: 'Nieuw bedrijf toevoegen',
            },
            crudCompanyForms: {
                titleAdd: 'Bedrijf toevoegen',
                companyName: 'Bedrijfsnaam',
                officeNumber: 'Kantoor nummer',
                managerName: 'Manager naam',
                ownerEmail: 'E-mailadres van de eigenaar',
                submitButton: 'Verzenden',
                closeButton: 'Sluiten',
                saveButton: 'Sparen',
            },
        },
        areYouSurePopUp: {
            content: 'Weet je dat zeker?',
            yes: 'Ja',
            no: 'Nee',
        },
        companyPage: {
            preregisterButton: 'Pre-registreren',
            settingsButton: 'Instellingen',
            aboutUsTitle: 'Over ons',
        },
        dashboardCompanyOwner: {
            title: 'Beheer uw bedrijf',
            subtitle: 'Dubbelklik hieronder om te bewerken',
            mainInfo: {
                company: 'Bedrijfsnaam',
                office: 'Kantoor nummer',
                manager: 'Manager naam',
                email: 'Email'
            },
            companyDetails: {
                section: 'Bedrijfsgegevens',
                description: 'Omschrijving',
                history: 'Bedrijfsgeschiedenis',
                editButton: 'Bewerk',
            },
            employeesList: {
                section: 'Medewerkersoverzicht',
                subtitle: "Medewerkersprofielen bekijken, toevoegen, bijwerken en verwijderen",
                saveButton: 'Sparen',
            },
            addNewEmployeeForm: {
                addNewButton: 'Nieuwe medewerker toevoegen',
                title: 'Medewerker toevoegen',
                firstName: 'Voornaam van de werknemer',
                lastName: 'Achternaam',
                email: 'Email',
                submit: 'Verzenden',
                close: 'Sluiten',
            }
        },
        dashboardEmployee: {
            title: 'Welkom',
            subtitle: 'BEKIJK JE DAGELIJKSE SCHEMA',
        }
    }
};

const i18n = new VueI18n({    locale: 'en', // set locale
    fallbackLocale: 'nl', // set fallback locale    
    messages, // set locale messages
});

export default i18n;