export {strToFoo};

let strToFoo = (str) => {
    console.log(str);
    str = str.split("\|");
    let foo = str[0];
    let args = str[1];
    let result;
    let _foo = `
        result = (${args}) => ${foo}
    `;
    eval(_foo);
    return result;
}