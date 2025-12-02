import { React } from 'react';


export const FormatVND = (props) => {
    const number = props.number && props.number.toLocaleString('vi-VN', { currency: 'VND' });
    return (
        <>
            {number}<sup>₫</sup>
        </>
    )
}
export const GetPercent = (props) => {
    return (
        <>
            {(props.new && props.old) && Math.round(props.new / props.old * 100 - 100) + "%"}
        </>
    )
}
export const removeAccentsAndSpaces = (str) => {
    // Dùng bảng mã Unicode để loại bỏ dấu trong tiếng Việt
    const accents = 'àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ';
    const withoutAccents = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeediiiiiooooooooooooooooouuuuuuuuuuuyyyyy';
    const regex = new RegExp(`[${accents}]`, 'g');

    // Loại bỏ dấu trong chuỗi
    str = str.toLowerCase().replace(regex, c => withoutAccents.charAt(accents.indexOf(c)));
    str = str.replace(/\+/g, " plus ")
    str = str.replace(/[^a-zA-Z0-9]+/g, ' ');
    // Thay thế khoảng trắng bằng dấu cách
    str = str.replace(/\s+/g, '-');
    str = str.replace(/^[-]+|[-]+$/g, '');
    return str;
}