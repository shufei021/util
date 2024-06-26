

export function moneyToChinese(value: | number):string {
    let numberValue = String(Math.round(value * 100)), chineseValue = "", String1 = "零壹贰叁肆伍陆柒捌玖", String2 = "万仟佰拾亿仟佰拾万仟佰拾元角分", len = numberValue.length, Ch1, Ch2, nZero = 0, String3;
    if (len > 15)return alert("超出计算范围"), "";
    if (value == 0) return chineseValue = "零元整",chineseValue;
    numberValue.indexOf("-") != -1 ? (String2 = String2.substr(String2.length - len + 1, len - 1),
    numberValue = numberValue.substr(1, len - 1),
    len = numberValue.length,
    chineseValue = "负") : String2 = String2.substr(String2.length - len, len);
    for (let i = 0; i < len; i++)
        String3 = parseInt(numberValue.substr(i, 1), 10),
        i != len - 3 && i != len - 7 && i != len - 11 && i != len - 15 ? String3 == 0 ? (Ch1 = "",
        Ch2 = "",
        nZero = nZero + 1) : String3 != 0 && nZero != 0 ? (Ch1 = "零" + String1.substr(String3, 1),
        Ch2 = String2.substr(i, 1),
        nZero = 0) : (Ch1 = String1.substr(String3, 1),
        Ch2 = String2.substr(i, 1),
        nZero = 0) : (String3 != 0 && nZero != 0 ? (Ch1 = "零" + String1.substr(String3, 1),
        Ch2 = String2.substr(i, 1),
        nZero = 0) : String3 != 0 && nZero == 0 ? (Ch1 = String1.substr(String3, 1),
        Ch2 = String2.substr(i, 1),
        nZero = 0) : String3 == 0 && nZero >= 3 ? (Ch1 = "",
        Ch2 = "",
        nZero = nZero + 1) : (Ch1 = "",
        Ch2 = String2.substr(i, 1),
        nZero = nZero + 1),
        (i == len - 11 || i == len - 3) && (Ch2 = String2.substr(i, 1))),
        chineseValue = chineseValue + Ch1 + Ch2;
    return String3 == 0 && (chineseValue = chineseValue + "整"),chineseValue
}