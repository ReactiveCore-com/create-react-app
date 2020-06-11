import moment from 'moment';


export const isValidInput = (value) => {
    return !isNaN(value) && value > 0 || value.length == 0
}

export const isValidAlphanumerics = (value) => {
    return !/[~`!#$@%()\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value)
}

export const isValidDate = (date) => {
    return moment(date, 'MM/DD/YYYY', true).isValid()
}

export const isValidInteger = (value) => {
    return Number.isInteger(Number(value))
}

export const isValidMaxLength = (value, length) => {
    return value.length <= length;
}

export const isValidMaxNumber = (value, maxValue) => {
    return Number(value) <= Number(maxValue);
}

export const isOneWord = (value) => {
    return /^\S+$/g.test(value)
}

export const isNumberNonNegative = (value) => {
    return isValidInteger(value) && Number(value) >= 0
}
