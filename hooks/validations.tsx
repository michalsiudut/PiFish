

export const validationEmail = (email: string) => {
    if (!email.trim()) {
        return ('Adres email jest wymagany');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return ('Proszę wprowadzić prawidłowy adres email.');
    } else {
        return ('');
    }
};

export const validationPassword = (password: string) => {
    if (!password.trim()) {
        return ("Hasło jest wymagane");
    } else if (password.length < 6) {
        return ("Hasło musi mieć minuimum 6 znaków");
    }
    else {
        return ('');
    }

}
export const validationNick = (nick: string) => {
    const allowedCharsRegex = /^[a-zA-Z0-9]+$/;

    if (!nick.trim()) {
        return ("Nick jest wymagany");
    } else if (nick.length < 6) {
        return ("Nick musi mieć minuimum 6 znaków");
    } else if (!allowedCharsRegex.test(nick)) {
        return ("Nick może zawierać tylko litery i cyfry");
    }
    else {
        return ('');
    }

}
export const validationName = (name: string) => {
    const allowedCharsRegex = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/;

    if (name.length < 3) {
        return ("Imie musi mieć minuimum 3 znaki");
    } else if (!allowedCharsRegex.test(name)) {
        return ("Imie może zawierać tylko litery!");
    }
    else {
        return ('');
    }

}
export const validationSurname = (surname: string) => {
    const allowedCharsRegex = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/;

    if (surname.length < 3) {
        return ("Nazwisko musi mieć minuimum 3 znaki");
    } else if (!allowedCharsRegex.test(surname)) {
        return ("Nazwisko może zawierać tylko litery!");
    }
    else {
        return ('');
    }

}
export const validationCity = (city: string) => {
    const allowedCharsRegex = /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/;

    if (city.length < 3) {
        return ("Nazwisko musi mieć minuimum 3 znaki");
    } else if (!allowedCharsRegex.test(city)) {
        return ("Nazwisko może zawierać tylko litery!");
    }
    else {
        return ('');
    }

}


export default validationEmail
