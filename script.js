// global state
const state = {
    text: "",
    secret: "",
    encrypting: true,
    result: undefined,
}

let text = $("#text");
let secret = $("#secret");
let encrypt_radio = $("#encrypt-radio");
let decrypt_radio = $("#decrypt-radio");
const button = $("#confirm");
let result = $("#result");
let warning = $("#warning")

// set to true
encrypt_radio.prop("checked", true);


const resetWarning = () => {
    warning.text("");
}

text.on( "input", (e) => {
  state.text = e.target.value;
  resetWarning();
});

secret.on( "input", (e) => {
  state.secret = e.target.value;
  resetWarning();
});

encrypt_radio.on("change", () => {
    state.encrypting = true;
    button.text("Click to encrypt");
});

decrypt_radio.on("change", () => {
    state.encrypting = false;
    button.text("Click to decrypt");
});

button.on("click", () => {
    console.log("currentState", state);
    
    try{
        if(state.text.trim() === "" || state.secret.trim() === ""){
            warning.text("You must enter both text and a secret");
            return;
        }
        
        if(state.encrypting){
            const encrypted = CryptoJS.AES.encrypt(state.text, state.secret).toString();
            result.val(encrypted);
        }
        else{
            const bytes = CryptoJS.AES.decrypt(state.text, state.secret);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            result.val(originalText);
        }
    }
    catch(e){
        warning.text(e.message);  
    }
})


