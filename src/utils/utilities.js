export const getEnvironment = () => {
    const hostName = window?.location?.hostname?.trim?.()?.toLowerCase() || ''

    let env = undefined
    if (hostName.includes('vercel')) {
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
        return 'https://ajokudi-backend.onrender.com/'
    }

    // return 'http://localhost:8000/'
    return 'https://ajokudi-backend.onrender.com/'

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

const validateTextField = (text) => {
    return !/[0-9]/g.test(text) && text.length > 1
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

export {
    validateForm,
    toFirstLetterUpperCase,
    // generateProjectCode,
    validateEmail,
    validatePhone,
    validateTextField,
    validatePassword
}
