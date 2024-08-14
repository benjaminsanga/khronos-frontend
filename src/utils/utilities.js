export const getEnvironment = () => {
    const hostName = window?.location?.hostname?.trim?.()?.toLowerCase() || ''

    let env = undefined
    if (hostName.includes('khronos')) {
        env = 'prod'
    } else if (hostName.includes('localhost')) {
        env = 'localhost'
    }

    return env
}

export const isLocalHost = () => getEnvironment() === 'localhost'

export const isProd = () => getEnvironment() === 'prod'

export const getApiEndpoint = () => {

    if (isProd()) {
        return 'https://khronos-backend.onrender.com'
    }

    return 'http://localhost:8000/'

}

const validateForm = (data) => {

    // return if empty
    if (data.length === 0) return;

    let isFormValid = false;
    
    Object.keys(data).map(v => {
        let fieldValue = data[v];
        if (fieldValue === "" || fieldValue === undefined || fieldValue === null || fieldValue === false) {
            document.getElementById(`${v}`).style.borderLeft = "5px solid red";
            isFormValid = false;
        } else {
            document.getElementById(`${v}`).style.borderLeft = "5px solid green";
            isFormValid = true;
        }
        return true
    });

    return isFormValid;
};

const toFirstLetterUpperCase = (text) => {
    if (!text) return
    return text.slice(0,1).toUpperCase()+text.slice(1).toLowerCase()
}

// const generateProjectCode = () => {
//     let raw_project_code = Math.random().toString(36).slice(2);
//     return raw_project_code.slice(0, 3) + "-" + raw_project_code.slice(3, 7) + "-" + raw_project_code.slice(7);
// }

const getFullDate = () => {
    const date = new Date()
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

const validateEmail = (email) => {
    let regexEmail = /^[a-z]\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !!email.match(regexEmail);
}

const validatePhone = (phone) => {
    const regexPhoneNumber = /^((\+)234|0)[0-9]{10}$/;   
	return !!phone.match(regexPhoneNumber);
}

const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

    return !!password.match(regex);
}

const formatDateTime = (isoString) => {
    if (!isoString) {
        return '--';
    }

    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const period = hours < 12 ? 'AM' : 'PM';

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${formattedHours}:${minutes} ${period}`;

    return `${formattedDate} ${formattedTime}`;
}

const getFloatPrecision = (number) => {
    if (!number) {
        return 0.00
    }

    return parseFloat(number).toPrecision(2)
}

export {
    validateForm,
    toFirstLetterUpperCase,
    // generateProjectCode,
    validateEmail,
    validatePhone,
    getFullDate,
    validatePassword,
    formatDateTime,
    getFloatPrecision
}
