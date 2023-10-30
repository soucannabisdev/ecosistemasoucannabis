const axios = require("axios");
const express = require("express");
const router = express.Router();
const directusRequest = require("./modules/directusRequest");
const sendEmail = require("./modules/sendEmail");
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");

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

router.post("/auth", (req, res) => {
  const { login, senha } = req.body;

  if (login === "admin" && senha === "pass") {
    const token = jwt.sign({ login }, chaveSecreta);
    res.json({ token });
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
  }
  res.status(200);
});

router.post("/user", async (req, res) => {
  const token = req.headers.authorization;
  const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", "", "GET");

  if (verToken) {
    const userData = await directusRequest("/items/Users?filter[user_code][_eq]=" + req.body.code_user + "", "", "GET");

    if (userData) {
      delete userData.status;
      delete userData.sort;
      delete userData.user_created;
      delete userData.user_updated;
    }
    res.send(userData);
    res.status(200);
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
    res.status(401);
  }
});

router.post("/user-appointment", async (req, res) => {
  const token = req.headers.authorization;

  const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", "", "GET");
  if (verToken) {
    const userData = await directusRequest("/items/Users?filter[user_code][_eq]=" + req.body.code_user + "", "", "GET");
    if (userData) {
      delete userData.status;
      delete userData.sort;
      delete userData.user_created;
      delete userData.user_updated;
      //delete userData.emiiter_rg_associate
      delete userData.associate_status;
      delete userData.birthday_associate;
      delete userData.birthday_patient;
      //delete userData.cep
      //delete userData.city
      delete userData.complement;
      delete userData.contract;
      //delete userData.cpf_associate
      delete userData.cpf_patient;
      delete userData.date_created;
      delete userData.date_updated;
      delete userData.email;
      //delete userData.email_account
      delete userData.gender;
      //delete userData.lastname_associate
      delete userData.lastname_patient;
      delete userData.marital_status;
      //delete userData.mobile_number
      //delete userData.name_associate
      delete userData.name_patient;
      delete userData.nationality;
      //delete userData.neighborhood
      //delete userData.number
      delete userData.pass_account;
      delete userData.proof_of_address;
      delete userData.reason_treatment;
      delete userData.reason_treatment_text;
      delete userData.responsable_type;
      delete userData.rg_associate;
      delete userData.rg_patient;
      delete userData.rg_patient_proof;
      delete userData.rg_proof;
      delete userData.secundary_number;
      //delete userData.state
      //delete userData.street
      delete userData.user_code;
    }
    res.send(userData);
    res.status(200);
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
    res.status(401);
  }
});

router.post("/login", async (req, res) => {

  const token = req.headers.authorization;

  const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", "", "GET");
  if (verToken) {
    const userData = await directusRequest("/items/Users?filter[email_account][_eq]=" + req.body.email + "", "", "GET");

    var passwordMatch = false;


    if (userData) {
      var pass = req.body.pass;
      var userPass = decrypt(userData.pass_account, secretKey);

      if (pass == userPass) {
        passwordMatch = true;
      }
    }


    if (userData) {
      res.send(userData);
    } else {
      res.send(false);
    }
    res.status(200);
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
  }
});

router.post("/search", async (req, res) => {
  const token = req.headers.authorization;

  const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", "", "GET");
  if (verToken) {
    const userData = await directusRequest(req.body.query, "", "GET");
    res.send(userData);
  }

  res.status(200).end();
});

router.post("/create-user", async (req, res) => {

  const token = req.headers.authorization;
  var formData = {};

  const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", "", "GET");
  if (verToken) {
    if (req.body.email_account) {
      formData = {
        email_account: req.body.email_account,
        associate_status: 0,
      };
    }

    if (req.body.responsable_type) {
      formData = req.body;
    }

    // sendEmail(req.body.email_account, 'Bem-vindo à souCannabis', 'Olá, sejá bem vindo ao nosso sistema de cadastramento do usuários, siga os passos para se tornar um associado.')

    await directusRequest("/items/Users", formData, "POST");

    const user = await directusRequest("/items/Users?filter[email_account][_eq]=" + formData.email_account + "", "", "GET");

    res.send(user);
    res.status(200);
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
    res.status(401);
  }
});

router.post("/update", async (req, res) => {
  const token = req.headers.authorization;
  const formData = req.body.formData;

  if (formData.pass_account) {
    var pass = formData.pass_account;
    pass = pass.toString();

    var userPass = encrypt(pass, secretKey);
    formData.pass_account = userPass;
  }

  const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", "", "GET");
  if (verToken) {
    const userData = await directusRequest("/items/Users/" + req.body.userId, formData, "PATCH");
    res.send(userData);
    res.status(200);
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
    res.status(401);
  }
});

router.post("/files", async (req, res) => {
  const token = req.headers.authorization;

  if (!req.body.file) {
    console.log("Nenhum Arquivo");
  }

  const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", "", "GET");
  if (verToken) {
    const userData = await directusRequest("/files", req.body.file, "POST", { "Content-Type": "multipart/form-data" });
    res.send(userData);
    res.status(200);
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
    res.status(401);
  }
});

router.post("/upload-files", async (req, res) => {
  const token = req.headers.authorization;

  const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", "", "GET");
  if (verToken) {
    const formData = {
      Users_id: req.body.userId,
      directus_files_id: req.body.fileId,
    };
    const userData = await directusRequest("/items/Users_files", formData, "POST");
    res.send(userData);
    res.status(200);
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
    res.status(401);
  }
});

router.post("/create-folder", async (req, res) => {
  const token = req.headers.authorization;

  const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", "", "GET");
  if (verToken) {
    const createFolder = await directusRequest("/folders", req.body, "POST");
    res.send(createFolder);
    res.status(200);
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
    res.status(401);
  }
});

router.post("/webhook-update", async (req, res) => {
  const data = req.body;

  if (data.payload.status == "associado") {
    const userData = await directusRequest("/items/Users?filter[id][_eq]=" + data.keys[0] + "", "", "GET");

    await directusRequest("/items/Users/" + data.keys[0], { associate_status: 8 }, "PATCH");
    sendEmail(userData.email_account, "Você foi aprovado como associdado", "Olá " + userData.name_associate + ", seu cadastro como associado da souCannabis foi aprovado, acesse essa página para acessar sua conta.");
  }
});

router.get("/products", async (req, res) => {
  const token = req.headers.authorization;
  const verToken = await directusRequest("/items/Users_Api?filter[token][_eq]=" + token + "", "", "GET");

  if (verToken) {
    const userData = await directusRequest("/items/Products", "", "GET");
    res.send(userData);
    res.status(200);
  } else {
    res.status(401).json({ mensagem: "Credenciais inválidas" });
    res.status(401);
  }
});

module.exports = router;
