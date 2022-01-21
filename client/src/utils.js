export const convertSlug = (str) => {
    // remove accents
    if (str === undefined) {
        str = '';
    }
    var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
        to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }
    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\\-]/g, '-')
        .replace(/-+/g, '-');

    return str;
};
export const regEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
export const formatTime = (time) => {
    let hour = Math.floor(time / 3600);
    let min = Math.floor((time / 60) % 60);
    if (min < 10) {
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    if (hour < 10) {
        hour = `0${hour}`;
    }
    if (hour > 0) {
        return `${hour} : ${min} : ${sec}`;
    } else {
        return `${min} : ${sec}`;
    }
};
