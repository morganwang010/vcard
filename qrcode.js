var qrcode = new QRCode("test", {
    text: "https://www.runoob.com",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});
console.log(qrcode)