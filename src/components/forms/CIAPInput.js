import React, { useState } from 'react';
import Select from 'react-select';



const MultiSelectField = ({ onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    {
      "value": "A01",
      "label": "A01 Dor generalizada /múltipla"
    },
    {
      "value": "A02",
      "label": "A02 Arrepios/ calafrios"
    },
    {
      "value": "A03",
      "label": "A03 Febre"
    },
    {
      "value": "A04",
      "label": "A04 Debilidade/cansaço geral/fadiga"
    },
    {
      "value": "A05",
      "label": "A05 Sentir-se doente"
    },
    {
      "value": "A06",
      "label": "A06 Desmaio/síncope"
    },
    {
      "value": "A07",
      "label": "A07 Coma"
    },
    {
      "value": "A08",
      "label": "A08 Inchaço"
    },
    {
      "value": "A09",
      "label": "A09 Problemas de sudorese"
    },
    {
      "value": "A10",
      "label": "A10 Sangramento/Hemorragia NE"
    },
    {
      "value": "A11",
      "label": "A11 Dores torácicas NE"
    },
    {
      "value": "A13",
      "label": "A13 Receio/Medo do tratamento"
    },
    {
      "value": "A16",
      "label": "A16 Criança irritável"
    },
    {
      "value": "A18",
      "label": "A18 Preocupação com aparência"
    },
    {
      "value": "A20",
      "label": "A20 Pedido/discussão eutanásia"
    },
    {
      "value": "A21",
      "label": "A21 Fator de risco de malignidade"
    },
    {
      "value": "A23",
      "label": "A23 Fator de risco NE"
    },
    {
      "value": "A25",
      "label": "A25 Medo de morrer/medo da morte"
    },
    {
      "value": "A26",
      "label": "A26 Medo de câncer NE"
    },
    {
      "value": "A27",
      "label": "A27 Medo de outra doença NE"
    },
    {
      "value": "A28",
      "label": "A28 Limitação funcional/incapacidade NE"
    },
    {
      "value": "A29",
      "label": "A29 Outros sinais/sintomas gerais"
    },
    {
      "value": "A70",
      "label": "A70 Tuberculose"
    },
    {
      "value": "A71",
      "label": "A71 Sarampo"
    },
    {
      "value": "A72",
      "label": "A72 Varicela"
    },
    {
      "value": "A73",
      "label": "A73 Malária"
    },
    {
      "value": "A74",
      "label": "A74 Rubéola"
    },
    {
      "value": "A75",
      "label": "A75 Mononucleose infecciosa"
    },
    {
      "value": "A76",
      "label": "A76 Outro exantema viral"
    },
    {
      "value": "A77",
      "label": "A77 Dengue e outras doenças virais NE"
    },
    {
      "value": "A78",
      "label": "A78 Hanseníase e outras doenças infecciosas NE"
    },
    {
      "value": "A79",
      "label": "A79 Carcinomatose (localização primária desconhecida)"
    },
    {
      "value": "A80",
      "label": "A80 Lesão traumática/acidente NE"
    },
    {
      "value": "A81",
      "label": "A81 Politraumatismos/ferimentos múltiplos"
    },
    {
      "value": "A82",
      "label": "A82 Efeito secundário de lesão traumática"
    },
    {
      "value": "A84",
      "label": "A84 Intoxicação por medicamento"
    },
    {
      "value": "A85",
      "label": "A85 Efeito adverso de fármaco dose correta"
    },
    {
      "value": "A86",
      "label": "A86 Efeito tóxico de substância não medicinal"
    },
    {
      "value": "A87",
      "label": "A87 Complicações de tratamento médico"
    },
    {
      "value": "A88",
      "label": "A88 Efeito adverso de fator físico"
    },
    {
      "value": "A89",
      "label": "A89 Efeito da prótese"
    },
    {
      "value": "A90",
      "label": "A90 Malformação congênita NE/múltiplas"
    },
    {
      "value": "A91",
      "label": "A91 Investigação com resultado anormal NE"
    },
    {
      "value": "A92",
      "label": "A92 Alergia/reação alérgica NE"
    },
    {
      "value": "A93",
      "label": "A93 Recém-nascido prematuro"
    },
    {
      "value": "A94",
      "label": "A94 Morbidade perinatal, outra"
    },
    {
      "value": "A95",
      "label": "A95 Mortalidade perinatal"
    },
    {
      "value": "A96",
      "label": "A96 Morte"
    },
    {
      "value": "A97",
      "label": "A97 Sem doença"
    },
    {
      "value": "A98",
      "label": "A98 Medicina preventiva/manutenção da saúde"
    },
    {
      "value": "A99",
      "label": "A99 Outras doenças gerais NE"
    },
    {
      "value": "B02",
      "label": "B02 Gânglio linfático aumentado/doloroso"
    },
    {
      "value": "B04",
      "label": "B04 Sinais/sintomas sangue"
    },
    {
      "value": "B25",
      "label": "B25 Medo de VIH/ HIV/SIDA/ AIDS"
    },
    {
      "value": "B26",
      "label": "B26 Medo de câncer no sangue/linfático"
    },
    {
      "value": "B27",
      "label": "B27 Medo de outras doenças do sangue /vasos linfáticos"
    },
    {
      "value": "B28",
      "label": "B28 Limitação funcional/incapacidade"
    },
    {
      "value": "B29",
      "label": "B29 Outros sinais/ sintomas do sangue/ sistema linfático/ baço NE"
    },
    {
      "value": "B70",
      "label": "B70 Linfadenite aguda"
    },
    {
      "value": "B71",
      "label": "B71 Linfadenite crônica NE"
    },
    {
      "value": "B72",
      "label": "B72 Doença de Hodgkin/linfomas"
    },
    {
      "value": "B73",
      "label": "B73 Leucemia"
    },
    {
      "value": "B74",
      "label": "B74 Outra neoplasia maligna no sangue"
    },
    {
      "value": "B75",
      "label": "B75 Neoplasia benigna NE"
    },
    {
      "value": "B76",
      "label": "B76 Rotura traumática do baço"
    },
    {
      "value": "B77",
      "label": "B77 Outras lesõestraumáticas do sangue/linfa/baço"
    },
    {
      "value": "B78",
      "label": "B78 Anemia hemolítica hereditária"
    },
    {
      "value": "B79",
      "label": "B79 Outra malformação congênita do sangue/linfática"
    },
    {
      "value": "B80",
      "label": "B80 Anemia por de\u001fciência de ferro"
    },
    {
      "value": "B81",
      "label": "B81 Anemia perniciosa/de\u001fciência de folatos"
    },
    {
      "value": "B82",
      "label": "B82 Outras anemias NE"
    },
    {
      "value": "B83",
      "label": "B83 Púrpura/defeitos de coagulação"
    },
    {
      "value": "B84",
      "label": "B84 Glóbulos brancos anormais"
    },
    {
      "value": "B87",
      "label": "B87 Esplenomegalia"
    },
    {
      "value": "B90",
      "label": "B90 Infecção por VIH/ HIV/SIDA/ AIDS"
    },
    {
      "value": "B99",
      "label": "B99 Outra doença do sangue/linfáticos/baço"
    },
    {
      "value": "D98",
      "label": "D98 Colecistite, colelitíase"
    },
    {
      "value": "D99",
      "label": "D99 Outra doença do aparelho digestivo"
    },
    {
      "value": "F01",
      "label": "F01 Dor no olho"
    },
    {
      "value": "F02",
      "label": "F02 Olho vermelho"
    },
    {
      "value": "F03",
      "label": "F03 Secreção ocular"
    },
    {
      "value": "F04",
      "label": "F04 Moscas volantes/pontos luminosos/escotomas/ manchas"
    },
    {
      "value": "F05",
      "label": "F05 Outras perturbações visuais"
    },
    {
      "value": "F13",
      "label": "F13 Sensações oculares anormais"
    },
    {
      "value": "F14",
      "label": "F14 Movimentos oculares anormais"
    },
    {
      "value": "F15",
      "label": "F15 Aparência anormal nos olhos"
    },
    {
      "value": "F16",
      "label": "F16 Sinais/sintomas das pálpebras"
    },
    {
      "value": "F17",
      "label": "F17 Sinais/sintomas relacionados a óculos"
    },
    {
      "value": "F18",
      "label": "F18 Sinais/sintomasrelacionados a lentesde contato"
    },
    {
      "value": "F27",
      "label": "F27 Medo de doença ocular"
    },
    {
      "value": "F28",
      "label": "F28 Limitação funcional/incapacidade"
    },
    {
      "value": "F29",
      "label": "F29 Outros sinais/sintomas oculares"
    },
    {
      "value": "F70",
      "label": "F70 Conjuntivite infecciosa"
    },
    {
      "value": "F71",
      "label": "F71 Conjuntivite alérgica"
    },
    {
      "value": "F72",
      "label": "F72 Blefarite/hordéolo/calázio"
    },
    {
      "value": "F73",
      "label": "F73 Outras infecções/in\u001eamações oculares"
    },
    {
      "value": "F74",
      "label": "F74 Neoplasia do olho/anexos"
    },
    {
      "value": "F75",
      "label": "F75 Contusão/hemorragia ocular"
    },
    {
      "value": "F76",
      "label": "F76 Corpo estranho ocular"
    },
    {
      "value": "F79",
      "label": "F79 Outras lesões traumáticas oculares"
    },
    {
      "value": "F80",
      "label": "F80 Obstrução canal lacrimal da criança"
    },
    {
      "value": "F81",
      "label": "F81 Outras malformações congênitas do olho"
    },
    {
      "value": "F82",
      "label": "F82 Descolamento da retina"
    },
    {
      "value": "F83",
      "label": "F83 Retinopatia"
    },
    {
      "value": "F84",
      "label": "F84 Degeneração macular"
    },
    {
      "value": "F85",
      "label": "F85 Ulcera da córnea"
    },
    {
      "value": "F86",
      "label": "F86 Tracoma"
    },
    {
      "value": "F91",
      "label": "F91 Erro de refração"
    },
    {
      "value": "F92",
      "label": "F92 Catarata"
    },
    {
      "value": "F93",
      "label": "F93 Glaucoma"
    },
    {
      "value": "F94",
      "label": "F94 Cegueira"
    },
    {
      "value": "F95",
      "label": "F95 Estrabismo"
    },
    {
      "value": "F99",
      "label": "F99 Outra doenças oculares/anexos"
    },
    {
      "value": "H01",
      "label": "H01 Dor de ouvidos"
    },
    {
      "value": "H02",
      "label": "H02 Problemas de audição"
    },
    {
      "value": "H03",
      "label": "H03 Acufeno, zumbidos, ruído, assobios"
    },
    {
      "value": "H04",
      "label": "H04 Secreção no ouvido"
    },
    {
      "value": "H05",
      "label": "H05 Hemorragia no ouvido"
    },
    {
      "value": "H13",
      "label": "H13 Sensação de ouvido tapado"
    },
    {
      "value": "H15",
      "label": "H15 Preocupação com a aparência das orelhas"
    },
    {
      "value": "H27",
      "label": "H27 Medo de doença do ouvido"
    },
    {
      "value": "H28",
      "label": "H28 Limitação funcional/incapacidade"
    },
    {
      "value": "H29",
      "label": "H29 Outros sinais/sintomas ouvido"
    },
    {
      "value": "H70",
      "label": "H70 Otite externa"
    },
    {
      "value": "H71",
      "label": "H71 Otite media aguda/miringite"
    },
    {
      "value": "H72",
      "label": "H72 Otite média serosa"
    },
    {
      "value": "H73",
      "label": "H73 Infecção da Trompa de Eustáquio"
    },
    {
      "value": "H74",
      "label": "H74 Otite media crônica"
    },
    {
      "value": "H75",
      "label": "H75 Neoplasia do ouvido"
    },
    {
      "value": "H76",
      "label": "H76 Corpo estranho do ouvido"
    },
    {
      "value": "H77",
      "label": "H77 Perfuração do tímpano"
    },
    {
      "value": "H78",
      "label": "H78 Fibrilação/\u001eutter auricular/atrial"
    },
    {
      "value": "H79",
      "label": "H79 Outros traumatismos do ouvido"
    },
    {
      "value": "H80",
      "label": "H80 Malformações congênitas do ouvido"
    },
    {
      "value": "H81",
      "label": "H81 Cerúmen no ouvido em excesso"
    },
    {
      "value": "H82",
      "label": "H82 Síndrome vertiginosa"
    },
    {
      "value": "H83",
      "label": "H83 Otoesclerose"
    },
    {
      "value": "H84",
      "label": "H84 Presbiacusia"
    },
    {
      "value": "H85",
      "label": "H85 Lesão acústica"
    },
    {
      "value": "H86",
      "label": "H86 Surdez"
    },
    {
      "value": "H99",
      "label": "H99 Outra doença do ouvido/mastóide"
    },
    {
      "value": "K01",
      "label": "K01 Dor atribuída ao coração"
    },
    {
      "value": "K02",
      "label": "K02 Sensação de pressão/aperto atribuída ao coração"
    },
    {
      "value": "K03",
      "label": "K03 Dores atribuídas ao aparelho circulatório NE"
    },
    {
      "value": "K04",
      "label": "K04 Palpitações/percepção dos batimentos cardíacos"
    },
    {
      "value": "K05",
      "label": "K05 Outras irregularidades dos batimentos cardíacos"
    },
    {
      "value": "K06",
      "label": "K06 Veias proeminentes"
    },
    {
      "value": "K07",
      "label": "K07 Tornozelos inchados/edema"
    },
    {
      "value": "K22",
      "label": "K22 Fator de risco para doença cardiovascular"
    },
    {
      "value": "K24",
      "label": "K24 Medo de doença cardíaca"
    },
    {
      "value": "K25",
      "label": "K25 Medo de hipertensão"
    },
    {
      "value": "K27",
      "label": "K27 Medo de outra doença cardiovascular"
    },
    {
      "value": "K28",
      "label": "K28 Limitação funcional/incapacidade"
    },
    {
      "value": "K29",
      "label": "K29 Outros sinais/sintomas cardiovasculares"
    },
    {
      "value": "K70",
      "label": "K70 Doença infecciosa do aparelho circulatório"
    },
    {
      "value": "K71",
      "label": "K71 Febre reumática/cardiopatia"
    },
    {
      "value": "K72",
      "label": "K72 Neoplasia do aparelho circulatório"
    },
    {
      "value": "K73",
      "label": "K73 Malformações congênitas do aparelho circulatório"
    },
    {
      "value": "K74",
      "label": "K74 Doença cardíaca isquêmica com angina"
    },
    {
      "value": "K75",
      "label": "K75 Infarto ou Enfarte agudo miocárdio"
    },
    {
      "value": "K76",
      "label": "K76 Doença cardíaca isquémica sem angina"
    },
    {
      "value": "K77",
      "label": "K77 Fibrilação/\u001eutter auricular/atrial"
    },
    {
      "value": "K78",
      "label": "K78 Insuficiência cardíaca"
    },
    {
      "value": "K79",
      "label": "K79 Taquicardia Paroxística"
    },
    {
      "value": "K80",
      "label": "K80 Arritmia cardíaca NE"
    },
    {
      "value": "K81",
      "label": "K81 Sopro cardíaco/arterial NE"
    },
    {
      "value": "K82",
      "label": "K82 Doença cardiopulmonar"
    },
    {
      "value": "K83",
      "label": "K83 Doença valvular cardíaca NE"
    },
    {
      "value": "K84",
      "label": "K84 Outras doenças cardíacas"
    },
    {
      "value": "K85",
      "label": "K85 Pressão arterial elevada"
    },
    {
      "value": "K86",
      "label": "K86 Hipertensão sem complicações"
    },
    {
      "value": "K87",
      "label": "K87 Hipertensão com complicações"
    },
    {
      "value": "K88",
      "label": "K88 Hipotensão postural"
    },
    {
      "value": "K89",
      "label": "K89 Isquemia/ acidente cerebral transitória(o)"
    },
    {
      "value": "K90",
      "label": "K90 Trombose/acidente vascular cerebral"
    },
    {
      "value": "K91",
      "label": "K91 Doença vascular cerebral"
    },
    {
      "value": "K92",
      "label": "K92 Aterosclerose/doença vascular periférica"
    },
    {
      "value": "K93",
      "label": "K93 Embolia pulmonar"
    },
    {
      "value": "K94",
      "label": "K94 Flebite/trombo\u001eebite"
    },
    {
      "value": "K95",
      "label": "K95 Veias varicosas da perna"
    },
    {
      "value": "K96",
      "label": "K96 Hemorróidas"
    },
    {
      "value": "K99",
      "label": "K99 Outras doenças do aparelho circulatório"
    },
    {
      "value": "L01",
      "label": "L01 Sinais/sintomas do pescoço"
    },
    {
      "value": "L02",
      "label": "L02 Sinais/sintomas da região dorsal"
    },
    {
      "value": "L03",
      "label": "L03 Sinais/sintomas da região lombar"
    },
    {
      "value": "L04",
      "label": "L04 Sinais/sintomas do tórax"
    },
    {
      "value": "L05",
      "label": "L05 Sinais/sintomas da axila"
    },
    {
      "value": "L07",
      "label": "L07 Sinais/sintomas da mandíbula"
    },
    {
      "value": "L08",
      "label": "L08 Sinais/sintomas dos ombros"
    },
    {
      "value": "L09",
      "label": "L09 Sinais/sintomas dos braços"
    },
    {
      "value": "L10",
      "label": "L10 Sinais/sintomas dos cotovelos"
    },
    {
      "value": "L11",
      "label": "L11 Sinais/sintomas dos punhos"
    },
    {
      "value": "L12",
      "label": "L12 Sinais/sintomas das mãos e dedos"
    },
    {
      "value": "L13",
      "label": "L13 Sinais/sintomas do quadril"
    },
    {
      "value": "L14",
      "label": "L14 Sinais/sintomas da coxa/perna"
    },
    {
      "value": "L15",
      "label": "L15 Sinais/sintomas do joelho"
    },
    {
      "value": "L16",
      "label": "L16 Sinais/sintomas do tornozelo"
    },
    {
      "value": "L17",
      "label": "L17 Sinais/sintomas do pé/dedos pé"
    },
    {
      "value": "L18",
      "label": "L18 Dores musculares"
    },
    {
      "value": "L19",
      "label": "L19 Sinais/sintomas musculares NE"
    },
    {
      "value": "L20",
      "label": "L20 Sinais/sintomas das articulações NE"
    },
    {
      "value": "L26",
      "label": "L26 Medo de câncer no aparelho músculoesquelético"
    },
    {
      "value": "L27",
      "label": "L27 Medo de doença no aparelho músculoesquelético, outro"
    },
    {
      "value": "L28",
      "label": "L28 Limitação funcional/incapacidade"
    },
    {
      "value": "L29",
      "label": "L29 Outros sinais/sintomas do aparelho"
    },
    {
      "value": "L70",
      "label": "L70 Infecções do aparelho músculo-esquelético"
    },
    {
      "value": "L71",
      "label": "L71 Neoplasia maligna do aparelho músculoesquelético"
    },
    {
      "value": "L72",
      "label": "L72 Fratura: rádio/cúbito"
    },
    {
      "value": "L73",
      "label": "L73 Fratura: tíbia/perônio/ fíbula"
    },
    {
      "value": "L74",
      "label": "L74 Fratura: osso da mão/pé"
    },
    {
      "value": "L75",
      "label": "L75 Fratura: fêmur"
    },
    {
      "value": "L76",
      "label": "L76 Outras fraturas"
    },
    {
      "value": "L77",
      "label": "L77 Entorses e distensões do tornozelo"
    },
    {
      "value": "L78",
      "label": "L78 Entorses e distensões do joelho"
    },
    {
      "value": "L79",
      "label": "L79 Entorses e distensões das articulações NE"
    },
    {
      "value": "L80",
      "label": "L80 Luxação/subluxação"
    },
    {
      "value": "L81",
      "label": "L81 Traumatismos do aparelho musculoesquelético NE"
    },
    {
      "value": "L82",
      "label": "L82 Malformações congênitas do aparelho músculo-esquelético"
    },
    {
      "value": "L83",
      "label": "L83 Doenças ou síndromes da coluna cervical"
    },
    {
      "value": "L84",
      "label": "L84 Doenças ou síndromes da coluna semirradiação de dor"
    },
    {
      "value": "L85",
      "label": "L85 Deformação adquirida da coluna"
    },
    {
      "value": "L86",
      "label": "L86 Síndrome vertebral com irradiação dor"
    },
    {
      "value": "L87",
      "label": "L87 Bursite/tendinite/sinovite NE"
    },
    {
      "value": "L88",
      "label": "L88 Artrite reumatóide/soropositiva"
    },
    {
      "value": "L89",
      "label": "L89 Osteoartrose do quadril"
    },
    {
      "value": "L90",
      "label": "L90 Osteoartrose do joelho"
    },
    {
      "value": "L91",
      "label": "L91 Outras osteoartroses"
    },
    {
      "value": "L92",
      "label": "L92 Síndrome do ombro doloroso"
    },
    {
      "value": "L93",
      "label": "L93 Cotovelo de tenista"
    },
    {
      "value": "L94",
      "label": "L94 Osteocondrose"
    },
    {
      "value": "L95",
      "label": "L95 Osteoporose"
    },
    {
      "value": "L96",
      "label": "L96 Lesão interna aguda do joelho"
    },
    {
      "value": "L97",
      "label": "L97 Neoplasia benigna/incertas"
    },
    {
      "value": "L98",
      "label": "L98 Malformação adquirida de um membro"
    },
    {
      "value": "L99",
      "label": "L99 Outra doença doaparelho músculo-esquelético"
    },
    {
      "value": "N01",
      "label": "N01 Cefaléia"
    },
    {
      "value": "N03",
      "label": "N03 Dores da face"
    },
    {
      "value": "N04",
      "label": "N04 Síndrome das pernas inquietas"
    },
    {
      "value": "N05",
      "label": "N05 Formigamento/ parestesia nos dedos dasmãos/pés"
    },
    {
      "value": "N06",
      "label": "N06 Outras alterações da sensibilidade"
    },
    {
      "value": "N07",
      "label": "N07 Convulsões/ataques"
    },
    {
      "value": "N08",
      "label": "N08 Movimentos involuntários anormais"
    },
    {
      "value": "N16",
      "label": "N16 Alterações do olfato/gosto"
    },
    {
      "value": "N17",
      "label": "N17 Vertigens/tonturas"
    },
    {
      "value": "N18",
      "label": "N18 Paralisia/fraqueza"
    },
    {
      "value": "N19",
      "label": "N19 Perturbações da fala"
    },
    {
      "value": "N26",
      "label": "N26 Medo de câncer do sistema neurológico"
    },
    {
      "value": "N27",
      "label": "N27 Medo de outras doenças neurológicas"
    },
    {
      "value": "N28",
      "label": "N28 Limitação funcional/incapacidade"
    },
    {
      "value": "N29",
      "label": "N29 Sinais/sintomas do sistema neurológico,outros"
    },
    {
      "value": "N70",
      "label": "N70 Poliomielite"
    },
    {
      "value": "N71",
      "label": "N71 Meningite/encefalite"
    },
    {
      "value": "N72",
      "label": "N72 Tétano"
    },
    {
      "value": "N73",
      "label": "N73 Outra infecção neurológica"
    },
    {
      "value": "N74",
      "label": "N74 Neoplasia maligna do sistema neurológico"
    },
    {
      "value": "N75",
      "label": "N75 Neoplasia benigna do sistema neurológico"
    },
    {
      "value": "N76",
      "label": "N76 Neoplasia do sistema neurológico de natureza incerta"
    },
    {
      "value": "N79",
      "label": "N79 Concussão"
    },
    {
      "value": "N80",
      "label": "N80 Outras lesões cranianas"
    },
    {
      "value": "N81",
      "label": "N81 Outra lesão do sistema neurológico"
    },
    {
      "value": "N85",
      "label": "N85 Malformações congênitas"
    },
    {
      "value": "N86",
      "label": "N86 Esclerose múltipla"
    },
    {
      "value": "N87",
      "label": "N87 Parkinsonismo"
    },
    {
      "value": "N88",
      "label": "N88 Epilepsia"
    },
    {
      "value": "N89",
      "label": "N89 Enxaqueca"
    },
    {
      "value": "D01",
      "label": "D01 Dor abdominal generalizada/cólicas"
    },
    {
      "value": "D02",
      "label": "D02 Dores abdominais, epigástricas"
    },
    {
      "value": "D03",
      "label": "D03 Azia/ Queimação"
    },
    {
      "value": "D04",
      "label": "D04 Dor anal/retal"
    },
    {
      "value": "D05",
      "label": "D05 Irritação perianal"
    },
    {
      "value": "D06",
      "label": "D06 Outras dores abdominais localizadas"
    },
    {
      "value": "D07",
      "label": "D07 Dispepsia/indigestão"
    },
    {
      "value": "D08",
      "label": "D08 Flatulência /gases/eructações"
    },
    {
      "value": "D09",
      "label": "D09 Náusea"
    },
    {
      "value": "D10",
      "label": "D10 Vomito"
    },
    {
      "value": "D11",
      "label": "D11 Diarreia"
    },
    {
      "value": "D12",
      "label": "D12 Obstipação"
    },
    {
      "value": "D13",
      "label": "D13 Icterícia"
    },
    {
      "value": "D14",
      "label": "D14 Hematêmese/vômito sangue"
    },
    {
      "value": "D15",
      "label": "D15 Melena"
    },
    {
      "value": "D16",
      "label": "D16 Hemorragia retal"
    },
    {
      "value": "D17",
      "label": "D17 Incontinência fecal"
    },
    {
      "value": "D18",
      "label": "D18 Alterações nas fezes/mov. intestinais"
    },
    {
      "value": "D19",
      "label": "D19 Sinais/sintomas dos dentes/gengivas"
    },
    {
      "value": "D20",
      "label": "D20 Sinais/sintomas da boca/língua/lábios"
    },
    {
      "value": "D21",
      "label": "D21 Problemas de deglutição"
    },
    {
      "value": "D23",
      "label": "D23 Hepatomegalia"
    },
    {
      "value": "D24",
      "label": "D24 Massa abdominal NE"
    },
    {
      "value": "D25",
      "label": "D25 Distensão abdominal"
    },
    {
      "value": "D26",
      "label": "D26 Medo de câncer no aparelho digestivo"
    },
    {
      "value": "D27",
      "label": "D27 Medo de outras doenças aparelho digestivo"
    },
    {
      "value": "D28",
      "label": "D28 Limitação funcional/incapacidade"
    },
    {
      "value": "D29",
      "label": "D29 Outros sinais/sintomas digestivos"
    },
    {
      "value": "D70",
      "label": "D70 Infecção gastrointestinal"
    },
    {
      "value": "D71",
      "label": "D71 Caxumba/parotidite epidêmica"
    },
    {
      "value": "D72",
      "label": "D72 Hepatite viral"
    },
    {
      "value": "D73",
      "label": "D73 Gastroenterite, presumível infecção"
    },
    {
      "value": "D74",
      "label": "D74 Neoplasia maligna do estômago"
    },
    {
      "value": "D75",
      "label": "D75 Neoplasia maligna do cólon/reto"
    },
    {
      "value": "D76",
      "label": "D76 Neoplasia maligna do pâncreas"
    },
    {
      "value": "D77",
      "label": "D77 Neoplasia maligna do aparelho digestivo NE"
    },
    {
      "value": "D78",
      "label": "D78 Neoplasia benigna do aparelho digestivo/incerta"
    },
    {
      "value": "D79",
      "label": "D79 Corpo estranho no aparelho digestivo"
    },
    {
      "value": "D80",
      "label": "D80 Outras lesões traumáticas"
    },
    {
      "value": "D81",
      "label": "D81 Malformações congênitasdo aparelho digestivo"
    },
    {
      "value": "D82",
      "label": "D82 Doença dos dentes/gengivas"
    },
    {
      "value": "D83",
      "label": "D83 Doença da boca/língua/lábios"
    },
    {
      "value": "D84",
      "label": "D84 Doença do esôfago"
    },
    {
      "value": "D85",
      "label": "D85 Úlcera do duodeno"
    },
    {
      "value": "D86",
      "label": "D86 Úlcera péptica, outra"
    },
    {
      "value": "D87",
      "label": "D87 Alterações funcionais estômago"
    },
    {
      "value": "D88",
      "label": "D88 Apendicite"
    },
    {
      "value": "D89",
      "label": "D89 Hérnia inguinal"
    },
    {
      "value": "D90",
      "label": "D90 Hérnia de hiato /diafragmática"
    },
    {
      "value": "D91",
      "label": "D91 Hérnia abdominal, outras"
    },
    {
      "value": "D92",
      "label": "D92 Doença diverticular intestinal"
    },
    {
      "value": "D93",
      "label": "D93 Síndrome do cólon irritável"
    },
    {
      "value": "D94",
      "label": "D94 Enterite crônica / colite ulcerosa"
    },
    {
      "value": "D95",
      "label": "D95 Fissura anal / abcesso perianal"
    },
    {
      "value": "D96",
      "label": "D96 Lombrigas /outros parasitas"
    },
    {
      "value": "D97",
      "label": "D97 Doenças do fígado /NE"
    },
    {
      "value": "N90",
      "label": "N90 Cefaléia de cluster"
    },
    {
      "value": "N91",
      "label": "N91 Paralisia facial/paralisia de Bell"
    },
    {
      "value": "N92",
      "label": "N92 Nevralgia do trigêmio"
    },
    {
      "value": "N93",
      "label": "N93 Síndrome do túnel do carpo/ Síndrome do canal cárpico"
    },
    {
      "value": "N94",
      "label": "N94 Neurite/ Nevrite/neuropatia periférica"
    },
    {
      "value": "N95",
      "label": "N95 Cefaléia tensional"
    },
    {
      "value": "N99",
      "label": "N99 Outras doenças do sistema neurológico"
    },
    {
      "value": "P01",
      "label": "P01 Sensação de ansiedade/nervosismo/tensão"
    },
    {
      "value": "P02",
      "label": "P02 Reação aguda ao estresse"
    },
    {
      "value": "P03",
      "label": "P03 Tristeza/ Sensação de depressão"
    },
    {
      "value": "P04",
      "label": "P04 Sentir/comportar-se de forma irritável/zangada"
    },
    {
      "value": "P05",
      "label": "P05 Sensação/comportamento senil"
    },
    {
      "value": "P06",
      "label": "P06 Perturbação do sono"
    },
    {
      "value": "P07",
      "label": "P07 Diminuição do desejo sexual"
    },
    {
      "value": "P08",
      "label": "P08 Diminuição da satisfação sexual"
    },
    {
      "value": "P09",
      "label": "P09 Preocupação com a preferência sexual"
    },
    {
      "value": "P10",
      "label": "P10 Gaguejar/balbuciar/tiques"
    },
    {
      "value": "P11",
      "label": "P11 Problemas de alimentação da criança"
    },
    {
      "value": "P12",
      "label": "P12 Molhar a cama/enurese"
    },
    {
      "value": "P13",
      "label": "P13 Encoprese/outros problemas de incontinência fecal"
    },
    {
      "value": "P15",
      "label": "P15 Abuso crônico de álcool"
    },
    {
      "value": "P16",
      "label": "P16 Abuso agudo de álcool"
    },
    {
      "value": "P17",
      "label": "P17 Abuso do tabaco"
    },
    {
      "value": "P18",
      "label": "P18 Abuso de medicação"
    },
    {
      "value": "P19",
      "label": "P19 Abuso de drogas"
    },
    {
      "value": "P20",
      "label": "P20 Alterações da memória"
    },
    {
      "value": "P22",
      "label": "P22 Sinais/sintomas relacionados ao comportamento da criança"
    },
    {
      "value": "P23",
      "label": "P23 Sinais/sintomas relacionados ao comportamento do adolescente"
    },
    {
      "value": "P24",
      "label": "P24 Dificuldades específicas de aprendizagem"
    },
    {
      "value": "P25",
      "label": "P25 Problemas da fase de vida de adulto"
    },
    {
      "value": "P26",
      "label": "P26 Dificuldades específicas de aprendizagem"
    },
    {
      "value": "P27",
      "label": "P27 Medo de perturbações mentais"
    },
    {
      "value": "P28",
      "label": "P28 Limitação funcional/incapacidade"
    },
    {
      "value": "P29",
      "label": "P29 Sinais/sintomas psicológicos, outros"
    },
    {
      "value": "P70",
      "label": "P70 Demência"
    },
    {
      "value": "P71",
      "label": "P71 Outras psicoses orgânicas NE"
    },
    {
      "value": "P72",
      "label": "P72 Esquizofrenia"
    },
    {
      "value": "P73",
      "label": "P73 Psicose afetiva"
    },
    {
      "value": "P74",
      "label": "P74 Distúrbio ansioso/estado de ansiedade"
    },
    {
      "value": "P75",
      "label": "P75 Somatização"
    },
    {
      "value": "P76",
      "label": "P76 Perturbações depressivas"
    },
    {
      "value": "P77",
      "label": "P77 Suicídio/tentativa de suicídio"
    },
    {
      "value": "P78",
      "label": "P78 Neurastenia"
    },
    {
      "value": "P79",
      "label": "P79 Fobia/perturbação compulsiva"
    },
    {
      "value": "P80",
      "label": "P80 Perturbações de personalidade"
    },
    {
      "value": "P81",
      "label": "P81 Perturbação hipercinética"
    },
    {
      "value": "P82",
      "label": "P82 Estresse pós-traumático"
    },
    {
      "value": "P85",
      "label": "P85 Retardo/ Atraso mental"
    },
    {
      "value": "P86",
      "label": "P86 Anorexia nervosa, bulimia"
    },
    {
      "value": "P98",
      "label": "P98 Outras psicoses NE"
    },
    {
      "value": "P99",
      "label": "P99 Outras perturbações psicológicas"
    },
    {
      "value": "R01",
      "label": "R01 Dor atribuída ao aparelho respiratório"
    },
    {
      "value": "R02",
      "label": "R02 Dificuldade respiratória, dispneia"
    },
    {
      "value": "R03",
      "label": "R03 Respiração ruidosa"
    },
    {
      "value": "R04",
      "label": "R04 Outros problemas respiratórios"
    },
    {
      "value": "R05",
      "label": "R05 Tosse"
    },
    {
      "value": "R06",
      "label": "R06 Hemorragia nasal/epistaxe"
    },
    {
      "value": "R07",
      "label": "R07 Espirro/congestão nasal"
    },
    {
      "value": "R08",
      "label": "R08 Outros sinais/sintomas nasais"
    },
    {
      "value": "R09",
      "label": "R09 Sinais/sintomas dos seios paranasais"
    },
    {
      "value": "R21",
      "label": "R21 Sinais/sintomas da garganta"
    },
    {
      "value": "R23",
      "label": "R23 Sinais/sintomas da voz"
    },
    {
      "value": "R24",
      "label": "R24 Hemoptise"
    },
    {
      "value": "R25",
      "label": "R25 Expectoração/mucosidade anormal"
    },
    {
      "value": "R26",
      "label": "R26 Medo de câncer do aparelho respiratório"
    },
    {
      "value": "R27",
      "label": "R27 Medo de outras doenças respiratórias"
    },
    {
      "value": "R28",
      "label": "R28 Limitação funcional/incapacidade"
    },
    {
      "value": "R29",
      "label": "R29 Sinais/sintomas do aparelho respiratório, outros"
    },
    {
      "value": "R71",
      "label": "R71 Tosse convulsa/ pertussis"
    },
    {
      "value": "R72",
      "label": "R72 Infecção estreptocócica da orofaringe"
    },
    {
      "value": "R73",
      "label": "R73 Abscesso/furúnculo no nariz"
    },
    {
      "value": "R74",
      "label": "R74 Infecção aguda do aparelho respiratório superior (IVAS)"
    },
    {
      "value": "R75",
      "label": "R75 Sinusite crônica/aguda"
    },
    {
      "value": "R76",
      "label": "R76 Amigdalite aguda"
    },
    {
      "value": "R77",
      "label": "R77 Laringite/traqueíte aguda"
    },
    {
      "value": "R78",
      "label": "R78 Bronquite/bronquiolite aguda"
    },
    {
      "value": "R79",
      "label": "R79 Bronquite crônica"
    },
    {
      "value": "R80",
      "label": "R80 Gripe"
    },
    {
      "value": "R81",
      "label": "R81 Pneumonia"
    },
    {
      "value": "R82",
      "label": "R82 Pleurite/derrame pleural"
    },
    {
      "value": "R83",
      "label": "R83 Outra infecção respiratória"
    },
    {
      "value": "R84",
      "label": "R84 Neoplasia maligna dos brônquios/pulmão"
    },
    {
      "value": "R85",
      "label": "R85 Outra neoplasia respiratória maligna"
    },
    {
      "value": "R86",
      "label": "R86 Neoplasia benigna respiratória"
    },
    {
      "value": "R87",
      "label": "R87 Corpo estranho nariz/laringe/brônquios"
    },
    {
      "value": "R88",
      "label": "R88 Outra lesão respiratória"
    },
    {
      "value": "R89",
      "label": "R89 Malformação congênita do aparelhorespiratório"
    },
    {
      "value": "R90",
      "label": "R90 Hipertro\u001fa das amígdalas/adenóides"
    },
    {
      "value": "R92",
      "label": "R92 Neoplasia respiratória NE"
    },
    {
      "value": "R95",
      "label": "R95 Doença pulmonar obstrutiva crônica"
    },
    {
      "value": "R96",
      "label": "R96 Asma"
    },
    {
      "value": "R97",
      "label": "R97 Rinite alérgica"
    },
    {
      "value": "R98",
      "label": "R98 Síndrome de hiperventilação"
    },
    {
      "value": "R99",
      "label": "R99 Outras doenças respiratórias"
    },
    {
      "value": "S01",
      "label": "S01 Dor/sensibilidade dolorosa da pele"
    },
    {
      "value": "S02",
      "label": "S02 Prurido"
    },
    {
      "value": "S03",
      "label": "S03 Verrugas"
    },
    {
      "value": "S04",
      "label": "S04 Tumor/inchaço localizado"
    },
    {
      "value": "S05",
      "label": "S05 Tumores/inchaços generalizados"
    },
    {
      "value": "S06",
      "label": "S06 Erupção cutânea localizada"
    },
    {
      "value": "S07",
      "label": "S07 Erupção cutânea generalizada"
    },
    {
      "value": "S08",
      "label": "S08 Alterações da cor da pele"
    },
    {
      "value": "S09",
      "label": "S09 Infecção dos dedos das mãos/pés"
    },
    {
      "value": "S10",
      "label": "S10 Furúnculo/carbúnculo"
    },
    {
      "value": "S11",
      "label": "S11 Infecção pós-traumática da pele"
    },
    {
      "value": "S12",
      "label": "S12 Picada ou mordedura de inseto"
    },
    {
      "value": "S13",
      "label": "S13 Mordedura animal/humana"
    },
    {
      "value": "S14",
      "label": "S14 Queimadura/escaldão"
    },
    {
      "value": "S15",
      "label": "S15 Corpo estranho na pele"
    },
    {
      "value": "S16",
      "label": "S16 Traumatismo/contusão"
    },
    {
      "value": "S17",
      "label": "S17 Abrasão/arranhão/bolhas"
    },
    {
      "value": "S18",
      "label": "S18 Laceração/corte"
    },
    {
      "value": "S19",
      "label": "S19 Outra lesão cutânea"
    },
    {
      "value": "S20",
      "label": "S20 Calos/calosidades"
    },
    {
      "value": "S21",
      "label": "S21 Sinais/sintomas da textura da pele"
    },
    {
      "value": "S22",
      "label": "S22 Sinais/sintomas das unhas"
    },
    {
      "value": "S23",
      "label": "S23 Queda de cabelo/calvície"
    },
    {
      "value": "S24",
      "label": "S24 Sinais/sintomas do cabelo/couro cabeludo"
    },
    {
      "value": "S26",
      "label": "S26 Medo de câncer de pele"
    },
    {
      "value": "S27",
      "label": "S27 Medo de outra doença da pele"
    },
    {
      "value": "S28",
      "label": "S28 Limitação funcional/incapacidade"
    },
    {
      "value": "S29",
      "label": "S29 Sinais/sintomas da pele, outros"
    },
    {
      "value": "S70",
      "label": "S70 Herpes zoster"
    },
    {
      "value": "S71",
      "label": "S71 Herpes simples"
    },
    {
      "value": "S72",
      "label": "S72 Escabiose/outras acaríases"
    },
    {
      "value": "S73",
      "label": "S73 Pediculose/outras infecções da pele"
    },
    {
      "value": "S74",
      "label": "S74 Dermatofitose"
    },
    {
      "value": "S75",
      "label": "S75 Monilíase oral/candidíase na pele"
    },
    {
      "value": "S76",
      "label": "S76 Outras infecções da pele"
    },
    {
      "value": "S77",
      "label": "S77 Neoplasias malignas da pele"
    },
    {
      "value": "S78",
      "label": "S78 Lipoma"
    },
    {
      "value": "S79",
      "label": "S79 Neoplasia cutânea benigna/incerta"
    },
    {
      "value": "S80",
      "label": "S80 Ceratose/ Queratose solar/queimadura solar"
    },
    {
      "value": "S81",
      "label": "S81 Hemangioma/linfangioma"
    },
    {
      "value": "S82",
      "label": "S82 Nevos/sinais da pele"
    },
    {
      "value": "S83",
      "label": "S83 Lesões da pele congênitas, outras"
    },
    {
      "value": "S84",
      "label": "S84 Impetigo"
    },
    {
      "value": "S85",
      "label": "S85 Cisto pilonidal/stula"
    },
    {
      "value": "S86",
      "label": "S86 Dermatite seborréica"
    },
    {
      "value": "S87",
      "label": "S87 Dermatite/eczema atópico"
    },
    {
      "value": "S88",
      "label": "S88 Dermatite de contato/alérgica"
    },
    {
      "value": "S89",
      "label": "S89 Dermatite das fraldas"
    },
    {
      "value": "S90",
      "label": "S90 Pitiríase rosada"
    },
    {
      "value": "S91",
      "label": "S91 Psoríase"
    },
    {
      "value": "S92",
      "label": "S92 Doença das glândulas sudoríparas"
    },
    {
      "value": "S93",
      "label": "S93 Cisto sebáceo"
    },
    {
      "value": "S94",
      "label": "S94 Unha encravada"
    },
    {
      "value": "S95",
      "label": "S95 Molusco contagioso"
    },
    {
      "value": "S96",
      "label": "S96 Acne"
    },
    {
      "value": "S97",
      "label": "S97 Úlcera crônica da pele"
    },
    {
      "value": "S98",
      "label": "S98 Urticária"
    },
    {
      "value": "S99",
      "label": "S99 Outras doenças da pele"
    },
    {
      "value": "T01",
      "label": "T01 Sede excessiva"
    },
    {
      "value": "T02",
      "label": "T02 Apetite excessivo"
    },
    {
      "value": "T03",
      "label": "T03 Perda de apetite"
    },
    {
      "value": "T04",
      "label": "T04 Problemas alimentares de lactente/criança"
    },
    {
      "value": "T05",
      "label": "T05 Problemas alimentares do adulto"
    },
    {
      "value": "T07",
      "label": "T07 Aumento de peso"
    },
    {
      "value": "T08",
      "label": "T08 Perda de peso"
    },
    {
      "value": "T10",
      "label": "T10 Atraso do crescimento"
    },
    {
      "value": "T11",
      "label": "T11 Desidratação"
    },
    {
      "value": "T26",
      "label": "T26 Medo de câncer do sistema endócrino"
    },
    {
      "value": "T27",
      "label": "T27 Medo de outra doença endócrina/metabólica"
    },
    {
      "value": "T28",
      "label": "T28 Limitação funcional/incapacidade"
    },
    {
      "value": "T29",
      "label": "T29 Sinais/sintomas endocrinológicos/metabólicos/nutricionais, outros"
    },
    {
      "value": "T70",
      "label": "T70 Infecção endócrina"
    },
    {
      "value": "T71",
      "label": "T71 Neoplasia maligna da tiroide"
    },
    {
      "value": "T72",
      "label": "T72 Neoplasia benigna da tiroide"
    },
    {
      "value": "T73",
      "label": "T73 Outra neoplasia endócrina NE"
    },
    {
      "value": "T78",
      "label": "T78 Cisto do canal tiroglosso"
    },
    {
      "value": "T80",
      "label": "T80 Malformaçãocongénita endócrina/metabólica"
    },
    {
      "value": "T81",
      "label": "T81 Bócio"
    },
    {
      "value": "T82",
      "label": "T82 Obesidade"
    },
    {
      "value": "T83",
      "label": "T83 Excesso de peso"
    },
    {
      "value": "T85",
      "label": "T85 Hipertiroidismo/tireotoxicose"
    },
    {
      "value": "T86",
      "label": "T86 Hipotiroidismo/mixedema"
    },
    {
      "value": "T87",
      "label": "T87 Hipoglicemia"
    },
    {
      "value": "T89",
      "label": "T89 Diabetes insulino-dependente"
    },
    {
      "value": "T90",
      "label": "T90 Diabetes não insulino-dependente"
    },
    {
      "value": "T91",
      "label": "T91 Dificiencia vitamínica/nutricional"
    },
    {
      "value": "T92",
      "label": "T92 Gota"
    },
    {
      "value": "T93",
      "label": "T93 Alteração no metabolismo dos lipídios"
    },
    {
      "value": "T99",
      "label": "T99 Outras doenças endocrinológica/metabólica/nutricionais"
    },
    {
      "value": "U01",
      "label": "U01 Disúria/micção dolorosa"
    },
    {
      "value": "U02",
      "label": "U02 Micção frequente/urgência urinária/ polaciúria"
    },
    {
      "value": "U04",
      "label": "U04 Incontinência urinária"
    },
    {
      "value": "U05",
      "label": "U05 Outros problemas com a micção"
    },
    {
      "value": "U06",
      "label": "U06 Hematúria"
    },
    {
      "value": "U07",
      "label": "U07 Outros sinais/sintomas urinários"
    },
    {
      "value": "U08",
      "label": "U08 Retenção urinária"
    },
    {
      "value": "U13",
      "label": "U13 Sinais/sintomas da bexiga, outros"
    },
    {
      "value": "U14",
      "label": "U14 Sinais/sintomas dos rins"
    },
    {
      "value": "U26",
      "label": "U26 Medo de câncer no aparelho urinário"
    },
    {
      "value": "U27",
      "label": "U27 Medo de outra doença urinária"
    },
    {
      "value": "U28",
      "label": "U28 Limitação funcional/incapacidade"
    },
    {
      "value": "U29",
      "label": "U29 Sinais/sintomas aparelho urinário, outros"
    },
    {
      "value": "U70",
      "label": "U70 Pielonefrite"
    },
    {
      "value": "U71",
      "label": "U71 Cistite/outra infecção urinária"
    },
    {
      "value": "U72",
      "label": "U72 Uretrite"
    },
    {
      "value": "U75",
      "label": "U75 Neoplasia maligna do rim"
    },
    {
      "value": "U76",
      "label": "U76 Neoplasia benigna do rim"
    },
    {
      "value": "U77",
      "label": "U77 Neoplasia maligna do aparelho urinário, outra"
    },
    {
      "value": "U78",
      "label": "U78 Neoplasia benigna do aparelho urinário"
    },
    {
      "value": "U79",
      "label": "U79 Neoplasia do aparelho urinário NE"
    },
    {
      "value": "U80",
      "label": "U80 Lesões traumáticas do aparelho urinário"
    },
    {
      "value": "U85",
      "label": "U85 Malformação congênita do aparelho urinário"
    },
    {
      "value": "U88",
      "label": "U88 Glomerulonefrite/ síndrome nefrótica"
    },
    {
      "value": "U90",
      "label": "U90 Albuminúria/proteinúria ortostática"
    },
    {
      "value": "U95",
      "label": "U95 Cálculo urinário"
    },
    {
      "value": "U98",
      "label": "U98 Análise de urina anormal NE"
    },
    {
      "value": "U99",
      "label": "U99 Outras doenças urinárias"
    },
    {
      "value": "W01",
      "label": "W01 Questão sobre gravidez"
    },
    {
      "value": "W02",
      "label": "W02 Medo de estar grávida"
    },
    {
      "value": "W03",
      "label": "W03 Hemorragia antes do parto"
    },
    {
      "value": "W05",
      "label": "W05 Vômitos/náuseas durante a gravidez"
    },
    {
      "value": "W10",
      "label": "W10 Contracepção pós-coital"
    },
    {
      "value": "W11",
      "label": "W11 Contracepção oral"
    },
    {
      "value": "W12",
      "label": "W12 Contracepção intra-uterina/ Dispositivo Intrauterino/ DIU"
    },
    {
      "value": "W13",
      "label": "W13 Esterilização"
    },
    {
      "value": "W14",
      "label": "W14 Contracepção/outros"
    },
    {
      "value": "W15",
      "label": "W15 Infertilidade/subfertildade"
    },
    {
      "value": "W17",
      "label": "W17 Hemorragia pós-parto"
    },
    {
      "value": "W18",
      "label": "W18 Sinais/sintomas pós-parto"
    },
    {
      "value": "W19",
      "label": "W19 Sinais/sintomas da mama/lactação"
    },
    {
      "value": "W21",
      "label": "W21 Preocupação com a imagem corporal na gravidez"
    },
    {
      "value": "W27",
      "label": "W27 Medo de complicações na gravidez"
    },
    {
      "value": "W28",
      "label": "W28 Limitação funcional/incapacidade"
    },
    {
      "value": "W29",
      "label": "W29 Sinais/sintomas da gravidez, outros"
    },
    {
      "value": "W70",
      "label": "W70 Sepsis/infecção puerperal"
    },
    {
      "value": "W71",
      "label": "W71 Infecções que complicam a gravidez"
    },
    {
      "value": "W72",
      "label": "W72 Neoplasia maligna relacionada com gravidez"
    },
    {
      "value": "W73",
      "label": "W73 Neoplasia benigna/incerta relacionada com a gravidez"
    },
    {
      "value": "W75",
      "label": "W75 Lesões traumáticas que complicam a gravidez"
    },
    {
      "value": "W76",
      "label": "W76 Malformação congénita que complica a gravidez"
    },
    {
      "value": "W78",
      "label": "W78 Gravidez"
    },
    {
      "value": "W79",
      "label": "W79 Gravidez não desejada"
    },
    {
      "value": "W80",
      "label": "W80 Gravidez ectópica"
    },
    {
      "value": "W81",
      "label": "W81 Toxemia gravídica/ DHEG"
    },
    {
      "value": "W82",
      "label": "W82 Aborto espontâneo"
    },
    {
      "value": "W83",
      "label": "W83 Aborto provocado"
    },
    {
      "value": "W84",
      "label": "W84 Gravidez de alto risco"
    },
    {
      "value": "W85",
      "label": "W85 Diabetes gestacional"
    },
    {
      "value": "W90",
      "label": "W90 Parto sem complicações de nascido vivo"
    },
    {
      "value": "W91",
      "label": "W91 Parto sem complicações de natimorto"
    },
    {
      "value": "W92",
      "label": "W92 Parto com complicações de nascido vivo"
    },
    {
      "value": "W93",
      "label": "W93 Parto com complicações de natimorto"
    },
    {
      "value": "W94",
      "label": "W94 Mastite puerperal"
    },
    {
      "value": "W95",
      "label": "W95 Outros problemas da mama durante gravidez/puerpério"
    },
    {
      "value": "W96",
      "label": "W96 Outras complicações do puerpério"
    },
    {
      "value": "W99",
      "label": "W99 Outros problemas da gravidez/parto"
    },
    {
      "value": "X01",
      "label": "X01 Dor genital"
    },
    {
      "value": "X02",
      "label": "X02 Dores menstruais"
    },
    {
      "value": "X03",
      "label": "X03 Dores intermenstruais"
    },
    {
      "value": "X04",
      "label": "X04 Relação sexual dolorosa na mulher"
    },
    {
      "value": "X05",
      "label": "X05 Menstruação escassa/ausente"
    },
    {
      "value": "X06",
      "label": "X06 Menstruação excessiva"
    },
    {
      "value": "X07",
      "label": "X07 Menstruação irregular/frequente"
    },
    {
      "value": "X08",
      "label": "X08 Hemorragia intermenstrual"
    },
    {
      "value": "X09",
      "label": "X09 Sinais/sintomas pré-menstruais"
    },
    {
      "value": "X10",
      "label": "X10 Desejo de alterar a data menstruação"
    },
    {
      "value": "X11",
      "label": "X11 Sinais/sintomas da menopausa/ climatério"
    },
    {
      "value": "X12",
      "label": "X12 Hemorragia pós-menopausa"
    },
    {
      "value": "X13",
      "label": "X13 Hemorragia pós-coital"
    },
    {
      "value": "X14",
      "label": "X14 Secreção vaginal"
    },
    {
      "value": "X15",
      "label": "X15 Sinais/sintomas da vagina"
    },
    {
      "value": "X16",
      "label": "X16 Sinais/sintomas da vulva"
    },
    {
      "value": "X17",
      "label": "X17 Sinais/sintomas da pélvis feminina"
    },
    {
      "value": "X18",
      "label": "X18 Dor na mama feminina"
    },
    {
      "value": "X19",
      "label": "X19 Tumor ou nódulo na mama feminina"
    },
    {
      "value": "X20",
      "label": "X20 Sinais/sintomas do mamilo da mulher"
    },
    {
      "value": "X21",
      "label": "X21 Sinais/sintomas da mama feminina, outros"
    },
    {
      "value": "X22",
      "label": "X22 Preocupação com a aparência da mama feminina"
    },
    {
      "value": "X23",
      "label": "X23 Medo de doença de transmissão sexual"
    },
    {
      "value": "X24",
      "label": "X24 Medo de disfunção sexual"
    },
    {
      "value": "X25",
      "label": "X25 Medo de câncer genital"
    },
    {
      "value": "X26",
      "label": "X26 Medo de câncer na mama"
    },
    {
      "value": "X27",
      "label": "X27 Medo de outra doença genital/mama"
    },
    {
      "value": "X28",
      "label": "X28 Limitação funcional/incapacidade"
    },
    {
      "value": "X29",
      "label": "X29 Sinais/sintomas do aparelho genital feminino, outra"
    },
    {
      "value": "X70",
      "label": "X70 Sífilis feminina"
    },
    {
      "value": "X71",
      "label": "X71 Gonorréia feminina"
    },
    {
      "value": "X72",
      "label": "X72 Candidíase genital feminina"
    },
    {
      "value": "X73",
      "label": "X73 Tricomoníase genital feminina"
    },
    {
      "value": "X74",
      "label": "X74 Doença inflamatória pélvica"
    },
    {
      "value": "X75",
      "label": "X75 Neoplasia maligna do colo"
    },
    {
      "value": "X76",
      "label": "X76 Neoplasia maligna da mama feminina"
    },
    {
      "value": "X77",
      "label": "X77 Neoplasia maligna genital feminina, outra"
    },
    {
      "value": "X78",
      "label": "X78 Fibromioma uterino"
    },
    {
      "value": "X79",
      "label": "X79 Neoplasia benigna da mama feminina"
    },
    {
      "value": "X80",
      "label": "X80 Neoplasia benigna genital broadenoma"
    },
    {
      "value": "X81",
      "label": "X81 Neoplasia genital feminina, outra/NE"
    },
    {
      "value": "X82",
      "label": "X82 Lesão traumática genital feminina"
    },
    {
      "value": "X83",
      "label": "X83 Malformações congênitas genitais"
    },
    {
      "value": "X84",
      "label": "X84 Vaginite/vulvite NE"
    },
    {
      "value": "X85",
      "label": "X85 Doença do colo NE"
    },
    {
      "value": "X86",
      "label": "X86 Esfregaço de Papanicolau/colpocitologia oncótica anormal"
    },
    {
      "value": "X87",
      "label": "X87 Prolapso utero-vaginal"
    },
    {
      "value": "X88",
      "label": "X88 Doença \u001fbrocística da mama"
    },
    {
      "value": "X89",
      "label": "X89 Síndrome da tensão pré-menstrual"
    },
    {
      "value": "X90",
      "label": "X90 Herpes genital feminino"
    },
    {
      "value": "X91",
      "label": "X91 Condiloma acuminado feminino"
    },
    {
      "value": "X92",
      "label": "X92 Infecção por clamídia"
    },
    {
      "value": "X99",
      "label": "X99 Doença genital feminina, outra"
    },
    {
      "value": "Y01",
      "label": "Y01 Dor no pênis"
    },
    {
      "value": "Y02",
      "label": "Y02 Dor no escroto/testículos"
    },
    {
      "value": "Y03",
      "label": "Y03 Secreção uretral"
    },
    {
      "value": "Y04",
      "label": "Y04 Sinais/sintomas do pênis, outros"
    },
    {
      "value": "Y05",
      "label": "Y05 Sinais/sintomas do escroto/ testículos, outros"
    },
    {
      "value": "Y06",
      "label": "Y06 Sinais/sintomas da próstata"
    },
    {
      "value": "Y07",
      "label": "Y07 Impotência NE"
    },
    {
      "value": "Y08",
      "label": "Y08 Sinais/sintomas da função sexual masculina, outros"
    },
    {
      "value": "Y10",
      "label": "Y10 Infertilidade/subfertildade masculina"
    },
    {
      "value": "Y13",
      "label": "Y13 Esterilização masculina"
    },
    {
      "value": "Y14",
      "label": "Y14 Planejamento familiar, outros"
    },
    {
      "value": "Y16",
      "label": "Y16 Sinais/sintomas da mama masculina"
    },
    {
      "value": "Y24",
      "label": "Y24 Medo de disfunção sexual masculina"
    },
    {
      "value": "Y25",
      "label": "Y25 Medo de doença sexualmente transmissível"
    },
    {
      "value": "Y26",
      "label": "Y26 Medo de câncer genital masculino"
    },
    {
      "value": "Y27",
      "label": "Y27 Medo de doença genital masculina, outra"
    },
    {
      "value": "Y28",
      "label": "Y28 Limitação funcional/incapacidade"
    },
    {
      "value": "Y29",
      "label": "Y29 Sinais/sintomas, outros"
    },
    {
      "value": "Y70",
      "label": "Y70 Sífilis masculina"
    },
    {
      "value": "Y71",
      "label": "Y71 Gonorréia masculina"
    },
    {
      "value": "Y72",
      "label": "Y72 Herpes genital"
    },
    {
      "value": "Y73",
      "label": "Y73 Prostatite/vesiculite seminal"
    },
    {
      "value": "Y74",
      "label": "Y74 Orquite/epididimite"
    },
    {
      "value": "Y75",
      "label": "Y75 Balanite/Balanopostite"
    },
    {
      "value": "Y76",
      "label": "Y76 Condiloma acuminado"
    },
    {
      "value": "Y77",
      "label": "Y77 Neoplasia maligna da próstata"
    },
    {
      "value": "Y78",
      "label": "Y78 Neoplasia maligna genital masculina, outra"
    },
    {
      "value": "Y79",
      "label": "Y79 Neoplasia benigna genital masculina NE"
    },
    {
      "value": "Y80",
      "label": "Y80 Traumatismo genital masculino, outro"
    },
    {
      "value": "Y81",
      "label": "Y81 Fimose/prepúcio redundante"
    },
    {
      "value": "Y82",
      "label": "Y82 Hipospádias"
    },
    {
      "value": "Y83",
      "label": "Y83 Testículo não descido/ Criptorquidia/ Testículo ectópico"
    },
    {
      "value": "Y84",
      "label": "Y84 Malformação genital congênita masculina,outra"
    },
    {
      "value": "Y85",
      "label": "Y85 Hipertrofia benigna da próstata/ hiperplasia"
    },
    {
      "value": "Y86",
      "label": "Y86 Hidrocele"
    },
    {
      "value": "Y99",
      "label": "Y99 Doença genital masculina, outra"
    },
    {
      "value": "Z01",
      "label": "Z01 Pobreza/problemas econômicos"
    },
    {
      "value": "Z02",
      "label": "Z02 Problemas relacionados a água/alimentação"
    },
    {
      "value": "Z03",
      "label": "Z03 Problemas de habitação/vizinhança"
    },
    {
      "value": "Z04",
      "label": "Z04 Problema socio-cultural"
    },
    {
      "value": "Z05",
      "label": "Z05 Problemas com condições de trabalho"
    },
    {
      "value": "Z06",
      "label": "Z06 Problemas de desemprego"
    },
    {
      "value": "Z07",
      "label": "Z07 Problemas relacionados com educação"
    },
    {
      "value": "Z08",
      "label": "Z08 Problema relacionado com sistema de segurança social"
    },
    {
      "value": "Z09",
      "label": "Z09 Problema de ordem legal"
    },
    {
      "value": "Z10",
      "label": "Z10 Problema relacionado com sistema de saúde"
    },
    {
      "value": "Z11",
      "label": "Z11 Problema relacionado com estar doente"
    },
    {
      "value": "Z12",
      "label": "Z12 Problema de relacionamento com parceiro/conjugal"
    },
    {
      "value": "Z13",
      "label": "Z13 Problema comportamental do parceiro/companheiro"
    },
    {
      "value": "Z14",
      "label": "Z14 Problema por doença do parceiro/companheiro"
    },
    {
      "value": "Z15",
      "label": "Z15 Perda ou falecimento do parceiro/companheiro"
    },
    {
      "value": "Z16",
      "label": "Z16 Problema de relacionamento com criança"
    },
    {
      "value": "Z18",
      "label": "Z18 Problema com criança doente"
    },
    {
      "value": "Z19",
      "label": "Z19 Perda ou falecimento de criança"
    },
    {
      "value": "Z20",
      "label": "Z20 Problema de relacionamento com familiares"
    },
    {
      "value": "Z21",
      "label": "Z21 Problema comportamental de familiar"
    },
    {
      "value": "Z22",
      "label": "Z22 Problema por doença familiar"
    },
    {
      "value": "Z23",
      "label": "Z23 Perda/falecimento de familiar"
    },
    {
      "value": "Z24",
      "label": "Z24 Problema de relacionamento com amigos"
    },
    {
      "value": "Z25",
      "label": "Z25 Ato ou acontecimento violento"
    },
    {
      "value": "Z27",
      "label": "Z27 Medo de problema social"
    },
    {
      "value": "Z28",
      "label": "Z28 Limitação funcional/incapacidade"
    },
    {
      "value": "Z29",
      "label": "Z29 Problema social NE"
    }
  ]

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
    if (onChange) {
      onChange(selected);
    }
  };


  return (
    <Select
      id="reason_treatment"
      name="reason_treatment" 
      options={options}
      value={selectedOptions}
      isMulti
      onChange={handleSelectChange}
      placeholder="Digite o(s) motivos(s) do tratamento"
    />
  );
};

export default MultiSelectField;
