import { Patient, Provider, Medical, Drug} from '../components/ui/icons';
export const categories = [
    {
        name: 'Patient',
        className: 'patient',
        icon: Patient,
        color: '#E5885E',
        gradient: 'transparent linear-gradient(180deg, #FFF2F0 0%, #FFF2F000 100%) 0% 0% no-repeat padding-box'
    },
    {
        name: 'Provider',
        className: 'provider',
        icon: Provider,
        color: '#4CA9D8',
        gradient: 'transparent linear-gradient(180deg, #F2F9FC 0%, #F2F9FC00 100%) 0% 0% no-repeat padding-box'
    },
    {
        name: 'Medical',
        className: 'medical',
        icon: Medical,
        color: '#8F65A5',
        gradient: 'transparent linear-gradient(180deg, #F7F0FC 0%, #F7F0FC00 100%) 0% 0% no-repeat padding-box'
    },
    {
        name: 'Drug',
        className: 'drug',
        icon: Drug,
        color: '#62BFAD',
        gradient: 'transparent linear-gradient(180deg, #F5FFFD 0%, #F5FFFD00 100%) 0% 0% no-repeat padding-box'
    }
];