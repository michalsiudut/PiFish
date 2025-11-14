

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