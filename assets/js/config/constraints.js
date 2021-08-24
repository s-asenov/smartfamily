/**
 * The file responsible for all validate.js custom constraints.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
const constraints = {
    email: {
        email: {
            message: "^Невалиден имейл адрес!"
        },
        presence: {
            allowEmpty: false,
            message: "^Имейлът не може да бъде празно!"
        }
    },
    password: {
        presence: {
          allowEmpty: false,
          message: "^Паролата не може да бъде празно!"
        },
        length: {
            minimum: 6,
            tooShort: "^Паролата трябва да бъде минимум 6 символа!",
            maximum: 50,
            tooLong: "^Паролата не може да бъде повече от 50 символа!"
        }
    },
    newPassword: {
        presence: {
            allowEmpty: false,
            message: "^Паролата не може да бъде празно!"
        },
        length: {
            minimum: 6,
            tooShort: "^Паролата трябва да бъде минимум 6 символа!",
            maximum: 50,
            tooLong: "^Паролата не може да бъде повече от 50 символа!"
        }
    },
    firstName: {
        presence: {
            allowEmpty: false,
            message: "^Име не може да бъде празно!"
        },
        length: {
            minimum: 2,
            tooShort: "^Име трябва да бъде минимум 2 символа!",
            maximum: 30,
            tooLong: "^Име не може да бъде повече от 30 символа!"
        }
    },
    lastName: {
        presence: {
            allowEmpty: false,
            message: "^Фамилия не може да бъде празна!"
        },
        length: {
            minimum: 2,
            tooShort: "^Фамилия трябва да бъде минимум 2 символа!",
            maximum: 30,
            tooLong: "^Фамилия не може да бъде повече от 30 символа!"
        }
    },
    username: {
        presence: {
            allowEmpty: false,
            message: "^Потребителско име не може да бъде празно!"
        },
        length: {
            minimum: 4,
            tooShort: "^Потребителско име трябва да бъде минимум 4 символа!",
            maximum: 40,
            tooLong: "^Потребителско име не може да бъде повече от 40 символа!"
        }
    },
    groupName: {
        presence: {
            allowEmpty: false,
            message: "^Име на група не може да бъде празно!"
        },
        length: {
            minimum: 2,
            tooShort: "^Име на група трябва да бъде минимум 2 символа!",
            maximum: 30,
            tooLong: "^Име на група не може да бъде повече от 30 символа!"
        }
    },
    groupDescription: {
        presence: {
            allowEmpty: false,
            message: "^Описание на група не може да бъде празно!"
        },
        length: {
            minimum: 10,
            tooShort: "^Описание на група трябва да бъде минимум 10 символа!",
            maximum: 400,
            tooLong: "^Описание на група не може да бъде повече от 400 символа!"
        }
    },
    taskName: {
        presence: {
            allowEmpty: false,
            message: "^Име на задача не може да бъде празно!"
        },
        length: {
            minimum: 2,
            tooShort: "^Име на задача трябва да бъде минимум 2 символа!",
            maximum: 30,
            tooLong: "^Име на задача не може да бъде повече от 30 символа!"
        }
    },
    taskDescription: {
        presence: {
            allowEmpty: false,
            message: "^Описание на задача не може да бъде празно!"
        },
        length: {
            minimum: 4,
            tooShort: "^Описание на задача трябва да бъде минимум 4 символа!",
            maximum: 250,
            tooLong: "^Описание на задача не може да бъде повече от 250 символа!"
        }
    },
    expiringOn: {
        presence: {
            allowEmpty: false,
            message: "^Срок на задача не може да бъде празно!"
        }
    },
    appointeeId: {
        presence: {
            allowEmpty: false,
            message: "^Задачата трябва да се зададе на потребител!"
        }
    }
};

export default constraints;