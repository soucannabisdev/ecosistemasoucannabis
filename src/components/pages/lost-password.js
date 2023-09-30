import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import apiRequest from '../../modules/apiRequest';
import CryptoJS from 'crypto-js';

const LostPass = () => {
    var userId 

    const [showPopup, setShowPopup] = useState(false);
    const [passError, setPassError] = useState(false);
    const [timeError, setTimeError] = useState(false);
    const [formData, setFormData] = useState({
        passA: null,
        passB: null
    });

    function decrypt(decrypt, secretKey) {
        const bytes = CryptoJS.AES.decrypt(decrypt, secretKey);
        decrypt = bytes.toString(CryptoJS.enc.Utf8);
        return decrypt;
    }

    function encrypt(encrypt, secretKey) {
        const encrypted = CryptoJS.AES.encrypt(encrypt, secretKey).toString();
        return encrypted;
    }

    const secretKey = process.env.REACT_APP_PASS_ENCRYPT;

    useEffect(() => {

        var url = window.location.href;
        var params = url.split("?")

        var date = params[1]
        const id = params[2]

        var timestamp = decrypt(date, secretKey);
        userId = decrypt(id, secretKey);    

        var date = new Date().getTime()
        const validateTime = date - timestamp

        if (validateTime > 600000) {
            setTimeError(true)
        }

    }, userId)

    async function submit() {
        if (formData.passA != formData.passB) {
            setPassError(true)
        } else {
            console.log(userId)
            var password = encrypt(formData.passA, secretKey);
            await apiRequest("/api/directus/update", { "userId": userId, "formData": {pass_account:password} }, "POST")
            window.location.assign("/login")
        }
    }

    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div>
            {passError &&
                <div class="alert alert-danger" role="alert">
                    As senhas não correspondem
                </div>
            }

            {timeError &&
                <div class="alert alert-danger" role="alert">
                    Link inválido, tempo exedido. Tente recuperar sua senha novamente.
                    <br></br>
                    <a href={process.env.REACT_APP_URL} >Voltar</a>
                </div>
            }

            {!timeError &&
                <div>
                    <h1 class="text-center sub-title">Preencha seu e-mail abaixo para receber um link para definir uma nova senha.</h1>
                    <form action="POST" >
                        <br></br>
                        <label className="form-label" >Nova senha:</label>
                        <input class="form-control input-login" name="passA" placeholder="Digite uma nova senha" onChange={handleChange} type="password" ></input>
                        <label className="form-label" >Repita a senha:</label>
                        <input class="form-control input-login" name="passB" placeholder="Digite a senha novamente" onChange={handleChange} type="password" ></input>
                        <a class="btn btn-success btn-lg btn-float-right" onClick={submit}>Redefinir senha</a>
                    </form>
                </div>
            }
        </div>
    );
};

export default LostPass;
