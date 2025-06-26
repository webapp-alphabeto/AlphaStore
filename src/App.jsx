import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Navigation, ExternalLink, Search, Star, Clock, ArrowRight, Sparkles } from 'lucide-react';

const AlphaStores = () => {
  const [currentStep, setCurrentStep] = useState('location'); // 'location', 'stores'
  const [userLocation, setUserLocation] = useState(null);
  const [addressInput, setAddressInput] = useState('');
  const [nearbyStores, setNearbyStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  // 5 Lojas Fictícias Realistas para teste
  const allStores = [


  {
    "id": 1,
    "name": "Alphabeto Shopping Manauara",
    "address": "Avenida Mário Ypiranga, 1300 - Adrianópolis",
    "city": "Manaus",
    "state": "AM",
    "phone": "559294481001",
    "whatsapp": "559294481001",
    "lat": -3.1170,
    "lng": -60.0258,
    "hours": "Seg-Sáb: 10h-22h | Dom: 12h-21h",
    "rating": 4.5
  },
  {
    "id": 2,
    "name": "Alphabeto Salvador Shopping",
    "address": "Avenida Tancredo Neves, 3133 - Caminho das Árvores",
    "city": "Salvador",
    "state": "BA",
    "phone": "5571996803770",
    "whatsapp": "5571996803770",
    "lat": -12.9777,
    "lng": -38.5016,
    "hours": "Seg-Sáb: 9h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 3,
    "name": "Alphabeto Shopping Barra",
    "address": "Avenida Centenário, 2992 - Chame-Chame",
    "city": "Salvador",
    "state": "BA",
    "phone": "5571999963037",
    "whatsapp": "5571999963037",
    "lat": -12.9777,
    "lng": -38.5016,
    "hours": "Seg-Sáb: 9h-22h | Dom: 12h-20h",
    "rating": 4.5
  },
  {
    "id": 4,
    "name": "Alphabeto Shopping Campo Grande",
    "address": "Avenida Afonso Pena, 4909 - Cidade Jardim",
    "city": "Campo Grande",
    "state": "MS",
    "phone": "5567992312928",
    "whatsapp": "5567992312928",
    "lat": -20.4428,
    "lng": -54.6464,
    "hours": "Seg-Sáb: 10h-22h | Dom: 12h-20h",
    "rating": 4.5
  },
  {
    "id": 5,
    "name": "Alphabeto Shopping da Bahia",
    "address": "Avenida Tancredo Neves, 148 - Caminho das Árvores",
    "city": "Salvador",
    "state": "BA",
    "phone": "5571996636656",
    "whatsapp": "5571996636656",
    "lat": -12.9777,
    "lng": -38.5016,
    "hours": "Seg-Sáb: 9h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 6,
    "name": "Alphabeto Morumbi Shopping",
    "address": "Avenida Roque Petroni Júnior, 1089 - Vila Gertrudes",
    "city": "São Paulo",
    "state": "SP",
    "phone": "5511930402110",
    "whatsapp": "5511930402110",
    "lat": -23.5505,
    "lng": -46.6333,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 7,
    "name": "Alphabeto Shopping Partage",
    "address": "Avenida Presidente Kennedy, 425 - Centro",
    "city": "São Gonçalo",
    "state": "RJ",
    "phone": "5521979216267",
    "whatsapp": "5521979216267",
    "lat": -22.8271,
    "lng": -43.0544,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 8,
    "name": "Alphabeto Shopping Sulacap",
    "address": "Avenida Marechal Fontenele, 3545 - Jardim Sulacap",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521981210062",
    "whatsapp": "5521981210062",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 9,
    "name": "Alphabeto Shopping Recreio",
    "address": "Avenida das Américas, 19019 - Recreio dos Bandeirantes",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521983378151",
    "whatsapp": "5521983378151",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 10,
    "name": "Alphabeto Shopping Passeio",
    "address": "Rua Viúva Dantas, 100 - Campo Grande",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521992024374",
    "whatsapp": "5521992024374",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 11,
    "name": "Alphabeto Shopping Ilha Plaza",
    "address": "Avenida Maestro Paulo e Silva, 400 - Jardim Carioca",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521991033137",
    "whatsapp": "5521991033137",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 12,
    "name": "Alphabeto Shopping Carioca",
    "address": "Avenida Vicente de Carvalho, 909 - Vila da Penha",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521986637744",
    "whatsapp": "5521986637744",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 13,
    "name": "Alphabeto Bangu Shopping",
    "address": "Rua Fonseca, 240 - Bangu",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521981320362",
    "whatsapp": "5521981320362",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 14,
    "name": "Alphabeto Shopping Américas",
    "address": "Avenida das Américas, 15500 - Recreio dos Bandeirantes",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521964177671",
    "whatsapp": "5521964177671",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 15,
    "name": "Alphabeto Shopping 45",
    "address": "Praça Saenz Peña, 45 - Tijuca",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521979961894",
    "whatsapp": "5521979961894",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 9h-19h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 16,
    "name": "Alphabeto Shopping Park Campo Grande",
    "address": "Estrada do Monteiro, 1200 - Campo Grande",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521981469054",
    "whatsapp": "5521981469054",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 17,
    "name": "Alphabeto Shopping Gávea",
    "address": "Rua Marquês de São Vicente, 52 - Gávea",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521999650465",
    "whatsapp": "5521999650465",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 18,
    "name": "Alphabeto Icaraí",
    "address": "Rua Ator Paulo Gustavo, 229 - Icaraí",
    "city": "Niterói",
    "state": "RJ",
    "phone": "5521972447361",
    "whatsapp": "5521972447361",
    "lat": -22.8828,
    "lng": -43.1039,
    "hours": "Seg-Sáb: 9h-18h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 19,
    "name": "Alphabeto Centro Macaé",
    "address": "Avenida Rui Barbosa, 674 - Centro",
    "city": "Macaé",
    "state": "RJ",
    "phone": "5522992037540",
    "whatsapp": "5522992037540",
    "lat": -22.3717,
    "lng": -41.7857,
    "hours": "Seg-Sáb: 9h-19h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 20,
    "name": "Alphabeto Shopping Pelinca",
    "address": "Avenida Pelinca, 100 - Parque Tamandaré",
    "city": "Campos dos Goytacazes",
    "state": "RJ",
    "phone": "5522997962418",
    "whatsapp": "5522997962418",
    "lat": -21.7539,
    "lng": -41.3239,
    "hours": "Seg-Sáb: 9h-21h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 21,
    "name": "Alphabeto Shopping Jardim Guadalupe",
    "address": "Avenida Brasil, 22155 - Guadalupe",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521985859625",
    "whatsapp": "5521985859625",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 22,
    "name": "Alphabeto Shopping Plaza Niterói",
    "address": "Rua Quinze de Novembro, 8 - Centro",
    "city": "Niterói",
    "state": "RJ",
    "phone": "5521997487090",
    "whatsapp": "5521997487090",
    "lat": -22.8828,
    "lng": -43.1039,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 23,
    "name": "Alphabeto Shopping Tijuca",
    "address": "Avenida Maracanã, 987 - Tijuca",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521967809973",
    "whatsapp": "5521967809973",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 24,
    "name": "Alphabeto Shopping Rio Sul",
    "address": "Avenida Lauro Sodré, 445 - Botafogo",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521971247415",
    "whatsapp": "5521971247415",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 25,
    "name": "Alphabeto Shopping Nova América",
    "address": "Avenida Pastor Martin Luther King Júnior, S/N - Del Castilho",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521981077679",
    "whatsapp": "5521981077679",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 26,
    "name": "Alphabeto Shopping River",
    "address": "Avenida Monsenhor Ângelo Sampaio, 100 - Centro",
    "city": "Petrolina",
    "state": "PE",
    "phone": "558788436788",
    "whatsapp": "558788436788",
    "lat": -9.3897,
    "lng": -40.5027,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 27,
    "name": "Alphabeto Shopping Center Uberlândia",
    "address": "Avenida João Naves de Ávila, 133 - Tibery",
    "city": "Uberlândia",
    "state": "MG",
    "phone": "5534992116320",
    "whatsapp": "5534992116320",
    "lat": -18.9186,
    "lng": -48.2772,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 28,
    "name": "Alphabeto Shopping Uberada",
    "address": "Avenida Santa Beatriz da Silva, 1501 - São Benedito",
    "city": "Uberaba",
    "state": "MG",
    "phone": "5534998241030",
    "whatsapp": "5534998241030",
    "lat": -19.7477,
    "lng": -47.9389,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 29,
    "name": "Alphabeto Centro Juiz de Fora",
    "address": "Rua Barão de São João Nepomuceno, 409 - Centro",
    "city": "Juiz de Fora",
    "state": "MG",
    "phone": "5532984097290",
    "whatsapp": "5532984097290",
    "lat": -21.7622,
    "lng": -43.3434,
    "hours": "Seg-Sex: 10h-19h | Sáb: 10h-15h | Dom: Fechado",
    "rating": 4.5
  },
  {
    "id": 30,
    "name": "Alphabeto Shopping Independência",
    "address": "Avenida Presidente Itamar Franco, 3600 - São Mateus",
    "city": "Juiz de Fora",
    "state": "MG",
    "phone": "553299109256",
    "whatsapp": "553299109256",
    "lat": -21.7622,
    "lng": -43.3434,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 31,
    "name": "Alphabeto Barra Shopping",
    "address": "Avenida das Américas, 4666 - Barra da Tijuca",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521996628735",
    "whatsapp": "5521996628735",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 32,
    "name": "Alphabeto Shopping Contagem",
    "address": "Avenida Severino Ballesteros Rodrigues, 850 - Ressaca",
    "city": "Contagem",
    "state": "MG",
    "phone": "5531988135580",
    "whatsapp": "5531988135580",
    "lat": -19.9319,
    "lng": -44.0539,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 33,
    "name": "Alphabeto Porto Velho",
    "address": "Avenida Prefeito Chiquilito Erse, 3288 - Agenor M. de Carvalho",
    "city": "Porto Velho",
    "state": "RO",
    "phone": "556999798769",
    "whatsapp": "556999798769",
    "lat": -8.7619,
    "lng": -63.9039,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 34,
    "name": "Alphabeto Shopping Via Barreiro",
    "address": "Avenida Afonso Vaz de Melo, 640 - Barreiro",
    "city": "Belo Horizonte",
    "state": "MG",
    "phone": "553132342805",
    "whatsapp": "553132342805",
    "lat": -19.9167,
    "lng": -43.9333,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 35,
    "name": "Alphabeto Shopping Paragem",
    "address": "Avenida Professor Mário Werneck, 1360 - Estoril",
    "city": "Belo Horizonte",
    "state": "MG",
    "phone": "5531971369325",
    "whatsapp": "5531971369325",
    "lat": -19.9167,
    "lng": -43.9333,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 36,
    "name": "Alphabeto Shopping Minas",
    "address": "Avenida Cristiano Machado, 4000 - União",
    "city": "Belo Horizonte",
    "state": "MG",
    "phone": "5531982839637",
    "whatsapp": "5531982839637",
    "lat": -19.9167,
    "lng": -43.9333,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 37,
    "name": "Alphabeto Aliança Shopping",
    "address": "Praça Doutor Augusto Glória, 327 - Centro",
    "city": "São João Nepomuceno",
    "state": "MG",
    "phone": "5532991295904",
    "whatsapp": "5532991295904",
    "lat": -21.5388,
    "lng": -43.0089,
    "hours": "Seg-Sáb: 9h-18h | Dom: 9h-14h",
    "rating": 4.5
  },
  {
    "id": 38,
    "name": "Alphabeto Shopping Vitória",
    "address": "Avenida Américo Buaiz, 200 - Enseada do Suá",
    "city": "Vitória",
    "state": "ES",
    "phone": "5527981318879",
    "whatsapp": "5527981318879",
    "lat": -20.2976,
    "lng": -40.2958,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 39,
    "name": "Alphabeto Praia do Canto",
    "address": "Rua Chapot Presvot, 249 - Praia do Canto",
    "city": "Vitória",
    "state": "ES",
    "phone": "5527981346858",
    "whatsapp": "5527981346858",
    "lat": -20.2976,
    "lng": -40.2958,
    "hours": "Seg-Sáb: 9h-19h",
    "rating": 4.5
  },
  {
    "id": 40,
    "name": "Alphabeto Shopping Vila Velha",
    "address": "Avenida Luciano das Neves, 2418 - Centro de Vila Velha",
    "city": "Vila Velha",
    "state": "ES",
    "phone": "5527998994781",
    "whatsapp": "5527998994781",
    "lat": -20.3305,
    "lng": -40.2922,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 41,
    "name": "Alphabeto Taguatinga Shopping",
    "address": "QS 1, 40 - Taguatinga",
    "city": "Brasília",
    "state": "DF",
    "phone": "556192165474",
    "whatsapp": "556192165474",
    "lat": -15.8333,
    "lng": -48.0500,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 42,
    "name": "Alphabeto Shopping Pátio Brasil",
    "address": "Setor Comercial Sul - Asa Sul",
    "city": "Brasília",
    "state": "DF",
    "phone": "5561992395778",
    "whatsapp": "5561992395778",
    "lat": -15.7939,
    "lng": -47.8828,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 43,
    "name": "Alphabeto Campos Shopping Boulevard",
    "address": "Rua Doutor Silvio Bastos Tavares, 330 - Parque Leopoldina",
    "city": "Campos dos Goytacazes",
    "state": "RJ",
    "phone": "5522997398351",
    "whatsapp": "5522997398351",
    "lat": -21.7539,
    "lng": -41.3239,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 44,
    "name": "Alphabeto Shopping Park Jacarepaguá",
    "address": "Estrada de Jacarepaguá, 6069 - Jacarepaguá",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521983510023",
    "whatsapp": "5521983510023",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 45,
    "name": "Alphabeto Shopping Praia da Costa",
    "address": "Avenida Doutor Olivio Lira, 353 - Praia da Costa",
    "city": "Vila Velha",
    "state": "ES",
    "phone": "5527995003649",
    "whatsapp": "5527995003649",
    "lat": -20.3305,
    "lng": -40.2922,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 46,
    "name": "Alphabeto Shopping Ibirapuera",
    "address": "Avenida Ibirapuera, 3103 - Indianópolis",
    "city": "São Paulo",
    "state": "SP",
    "phone": "5511932888817",
    "whatsapp": "5511932888817",
    "lat": -23.5505,
    "lng": -46.6333,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-22h",
    "rating": 4.5
  },
  {
    "id": 47,
    "name": "Alphabeto Boulevard Shopping Belém",
    "address": "Avenida Visconde de Souza Franco, 776 - Reduto",
    "city": "Belém",
    "state": "PA",
    "phone": "5591985001515",
    "whatsapp": "5591985001515",
    "lat": 0.0,
    "lng": 0.0,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-22h",
    "rating": 4.5
  },
  {
    "id": 48,
    "name": "Alphabeto Montes Claros",
    "address": "Avenida Donato Quintino, 90 - Cidade Nova",
    "city": "Montes Claros",
    "state": "MG",
    "phone": "5538992410038",
    "whatsapp": "5538992410038",
    "lat": -16.7282,
    "lng": -43.8619,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 49,
    "name": "Alphabeto Shopping Park Lagos",
    "address": "Avenida Henrique Terra, 1700 - Palmeiras",
    "city": "Cabo Frio",
    "state": "RJ",
    "phone": "5522998572790",
    "whatsapp": "5522998572790",
    "lat": -22.8894,
    "lng": -42.0241,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 50,
    "name": "Alphabeto Shopping Rio Poty",
    "address": "Avenida Marechal Castelo Branco, 911 - Cabral",
    "city": "Teresina",
    "state": "PI",
    "phone": "5586981161015",
    "whatsapp": "5586981161015",
    "lat": -5.0892,
    "lng": -42.8019,
    "hours": "Seg-Sáb: 10h-22h | Dom: 15h-21h",
    "rating": 4.5
  },
  {
    "id": 51,
    "name": "Alphabeto Outlet Caxias",
    "address": "Rua Teresa Cristina, 2000 - Chácaras Rio-Petrópolis",
    "city": "Duque de Caxias",
    "state": "RJ",
    "phone": "5521971204814",
    "whatsapp": "5521971204814",
    "lat": -22.7858,
    "lng": -43.3045,
    "hours": "Seg-Sáb: 9h-21h | Dom: 9h-21h",
    "rating": 4.5
  },
  {
    "id": 52,
    "name": "Alphabeto São José dos Campos",
    "address": "Avenida Andrômeda, 227 - Jardim Satélite",
    "city": "São José dos Campos",
    "state": "SP",
    "phone": "5512974085088",
    "whatsapp": "5512974085088",
    "lat": -23.1895,
    "lng": -45.8841,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 53,
    "name": "Alphabeto Shopping Partage Betim",
    "address": "Rodovia Fernão Dias, KM 492 - Betim Industrial",
    "city": "Betim",
    "state": "MG",
    "phone": "5531989875277",
    "whatsapp": "5531989875277",
    "lat": -19.9678,
    "lng": -44.1983,
    "hours": "Seg-Dom: 10h-22h",
    "rating": 4.5
  },
  {
    "id": 54,
    "name": "Alphabeto Boulevard Rio",
    "address": "Rua Barão de São Francisco, 236 - Vila Isabel",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "phone": "5521995547399",
    "whatsapp": "5521995547399",
    "lat": -22.9068,
    "lng": -43.1729,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 55,
    "name": "Alphabeto Grand Plaza",
    "address": "Avenida Industrial, 600 - Jardim",
    "city": "Santo André",
    "state": "SP",
    "phone": "5511997937700",
    "whatsapp": "5511997937700",
    "lat": -23.6639,
    "lng": -46.5383,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 56,
    "name": "Alphabeto Shopping da Ilha",
    "address": "Avenida Daniel de La Touche, 987 - Cohama",
    "city": "São Luís",
    "state": "MA",
    "phone": "5598970223487",
    "whatsapp": "5598970223487",
    "lat": -2.5387,
    "lng": -44.2825,
    "hours": "Seg-Sáb: 10h-22h | Dom: 13h-21h",
    "rating": 4.5
  },
  {
    "id": 57,
    "name": "Alphabeto Shopping Del Rey",
    "address": "Avenida Presidente Carlos Luz, 3001 - Pampulha",
    "city": "Belo Horizonte",
    "state": "MG",
    "phone": "5531988055580",
    "whatsapp": "5531988055580",
    "lat": -19.9167,
    "lng": -43.9333,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 58,
    "name": "Alphabeto Shopping Goiabeiras",
    "address": "Avenida Jose Monteiro de Figueiredo, 500 - Duque de Caxias",
    "city": "Cuiabá",
    "state": "MT",
    "phone": "5565996231215",
    "whatsapp": "5565996231215",
    "lat": -15.6019,
    "lng": -56.0979,
    "hours": "Seg-Sáb: 10h-22h | Dom: 14h-20h",
    "rating": 4.5
  },
  {
    "id": 59,
    "name": "Alphabeto Indaiatuba",
    "address": "Avenida Presidente Kennedy, 230 - Vila Areal",
    "city": "Indaiatuba",
    "state": "SP",
    "phone": "5519996312955",
    "whatsapp": "5519996312955",
    "lat": -23.0787,
    "lng": -47.2124,
    "hours": "Seg-Sex: 9h-19h | Sáb: 9h-15h | Dom: Fechado",
    "rating": 4.5
  }

  ]
  // Função para calcular distância
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Geocoding real usando OpenStreetMap (gratuito)
  const geocodeAddress = async (address) => {
    try {
      // Adiciona "Brasil" ao endereço para melhor precisão
      const searchAddress = `${address}, Brasil`;
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&countrycodes=br&limit=1&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Erro na API de geocoding');
      }
      
      const data = await response.json();
      
      if (data && data[0]) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      }
      
      throw new Error('Endereço não encontrado');
    } catch (error) {
      console.error('Erro no geocoding:', error);
      
      // Fallback inteligente baseado em palavras-chave
      const lowerAddress = address.toLowerCase();
      
      if (lowerAddress.includes('rio de janeiro') || lowerAddress.includes('rio')) {
        return { lat: -22.9068, lng: -43.1729 }; // Rio de Janeiro
      } else if (lowerAddress.includes('belo horizonte') || lowerAddress.includes('bh')) {
        return { lat: -19.9191, lng: -43.9386 }; // Belo Horizonte  
      } else if (lowerAddress.includes('brasilia') || lowerAddress.includes('brasília')) {
        return { lat: -15.7939, lng: -47.8828 }; // Brasília
      } else if (lowerAddress.includes('campinas')) {
        return { lat: -22.9056, lng: -47.0608 }; // Campinas
      } else if (lowerAddress.includes('salvador')) {
        return { lat: -12.9714, lng: -38.5014 }; // Salvador
      } else if (lowerAddress.includes('fortaleza')) {
        return { lat: -3.7172, lng: -38.5434 }; // Fortaleza
      } else {
        return { lat: -23.5505, lng: -46.6333 }; // São Paulo (padrão)
      }
    }
  };

  // Função para usar geolocalização diretamente
  const useCurrentLocation = async () => {
    setIsLoading(true);
    setAddressInput(''); // Limpa o campo de endereço
    
    try {
      const coordinates = await new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocalização não suportada pelo seu navegador"));
          return;
        }
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Localização obtida:', position.coords);
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error('Erro na geolocalização:', error);
            reject(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000, // 15 segundos
            maximumAge: 60000 // 1 minuto
          }
        );
      });

      setUserLocation(coordinates);

      // Calcular distâncias para todas as lojas
      const storesWithDistance = allStores.map(store => ({
        ...store,
        distance: calculateDistance(coordinates.lat, coordinates.lng, store.lat, store.lng)
      })).sort((a, b) => a.distance - b.distance);

      // Separar lojas próximas (até 50km) e distantes (mais de 50km)
      const nearStores = storesWithDistance.filter(store => store.distance <= 50);
      const farStores = storesWithDistance.filter(store => store.distance > 50);

      // Combinar: primeiro as próximas, depois as distantes
      const combinedStores = [...nearStores, ...farStores];
      
      setNearbyStores(combinedStores);
      setSelectedStore(combinedStores[0]);
      setCurrentStep('stores');
      
    } catch (error) {
      console.error("Erro ao buscar localização:", error);
      
      let errorMessage = "Não foi possível obter sua localização.";
      
      if (error.code === 1) {
        errorMessage = "Permissão de localização negada. Digite seu endereço no campo acima para continuar.";
      } else if (error.code === 2) {
        errorMessage = "Localização indisponível. Verifique se o GPS está ativado e tente novamente.";
      } else if (error.code === 3) {
        errorMessage = "Tempo limite esgotado. Tente novamente ou digite seu endereço.";
      }
      
      alert(errorMessage);
    }
    
    setIsLoading(false);
  };
  // Buscar lojas próximas com filtro de 50km
  const findNearbyStores = async () => {
    if (!addressInput.trim()) {
      alert("Por favor, digite seu endereço, cidade ou CEP.");
      return;
    }

    setIsLoading(true);
    
    try {
      // Usar endereço digitado
      const coordinates = await geocodeAddress(addressInput);
      console.log('Coordenadas encontradas:', coordinates);

      setUserLocation(coordinates);

      // Calcular distâncias para todas as lojas
      const storesWithDistance = allStores.map(store => ({
        ...store,
        distance: calculateDistance(coordinates.lat, coordinates.lng, store.lat, store.lng)
      })).sort((a, b) => a.distance - b.distance);

      // Separar lojas próximas (até 50km) e distantes (mais de 50km)
      const nearStores = storesWithDistance.filter(store => store.distance <= 50);
      const farStores = storesWithDistance.filter(store => store.distance > 50);

      // Combinar: primeiro as próximas, depois as distantes
      const combinedStores = [...nearStores, ...farStores];
      
      setNearbyStores(combinedStores);
      setSelectedStore(combinedStores[0]);
      setCurrentStep('stores');
      
    } catch (error) {
      console.error("Erro ao buscar localização:", error);
      alert("Não foi possível encontrar o endereço informado. Verifique se está correto e tente novamente.");
    }
    
    setIsLoading(false);
  };

  // Abrir WhatsApp com mensagem padrão e saudação por horário
  const openWhatsApp = (store) => {
    // Saudação baseada no horário
    const now = new Date();
    const hour = now.getHours();
    
    let greeting = "Olá!";
    if (hour < 12) {
      greeting = "Bom dia!";
    } else if (hour < 18) {
      greeting = "Boa tarde!";
    } else {
      greeting = "Boa noite!";
    }
    
    // Mensagem padrão para todas as lojas
    let message = `${greeting} 👶\n\nGostaria de mais informações sobre a ${store.name}!\n\n`;
    message += `Endereço: ${store.address}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${store.whatsapp}?text=${encodedMessage}`;
    
    // Log para debug
    console.log('Abrindo WhatsApp:', {
      store: store.name,
      whatsapp: store.whatsapp,
      url: whatsappUrl
    });
    
    window.open(whatsappUrl, '_blank');
  };

  // Renderizar estrelas de avaliação
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    return stars;
  };

  // Componente de brilho/sparkle
  const SparkleIcon = ({ className = "w-6 h-6", color = "text-yellow-400" }) => (
    <div className={`${className} ${color} animate-pulse`}>✨</div>
  );

  if (currentStep === 'location') {
    return (
      <div 
        className="min-h-screen relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 30%, #dee2e6 60%, #ced4da 100%)',
        }}
      >
        {/* Elementos decorativos de brilho e formas geométricas suaves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Círculos coloridos suaves */}
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: '#FF6B35' }}></div>
          <div className="absolute top-40 right-20 w-24 h-24 rounded-full opacity-15" style={{ backgroundColor: '#FFD23F' }}></div>
          <div className="absolute bottom-32 left-1/4 w-28 h-28 rounded-full opacity-10" style={{ backgroundColor: '#87C84A' }}></div>
          <div className="absolute bottom-20 right-16 w-20 h-20 rounded-full opacity-20" style={{ backgroundColor: '#40B5A8' }}></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#E6C2FF' }}></div>
          
          {/* Sparkles discretos */}
          <SparkleIcon className="absolute top-16 right-32 w-6 h-6 text-yellow-400 opacity-60" />
          <SparkleIcon className="absolute bottom-40 left-20 w-5 h-5 text-orange-400 opacity-50" />
          <SparkleIcon className="absolute top-1/2 left-16 w-4 h-4 text-teal-400 opacity-40" />
          <SparkleIcon className="absolute bottom-1/3 right-1/4 w-5 h-5 text-purple-400 opacity-50" />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* Header */}
            <div className="mb-8">
              <div 
                className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-lg"
                style={{ backgroundColor: '' }}
              >
                {/* Substitua pela URL da sua logo */}
                <img 
                  src="https://www.alphabeto.com/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fdeco-sites-assets.s3.sa-east-1.amazonaws.com%2Falphabeto%2Fe30a75c7-a480-4ecb-828e-e76c39805c71%2Fsvgviewer-output-%2821%29.svg&fit=cover&width=276&height=84" 
                  alt="Alphabeto Logo"
                  className="w-24 h-24 object-contain"
                  onError={(e) => {
                    // Fallback para quando a imagem não carregar
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="text-3xl font-bold text-white" style={{ display: 'none' }}>a</span>
              </div>
              <h1 className="text-5xl font-bold mb-3 drop-shadow-lg " style={{ color: '#FF6B35' }}>
                Alphabeto
              </h1>
              <p className="text-xl mb-2 font-medium" style={{ color: '#40B5A8' }}>vestindo criança como criança</p>
              <p className="text-gray-600">Encontre a loja mais próxima de você</p>
            </div>

            {/* Location Input */}
            <div 
              className="rounded-3xl shadow-2xl p-8 mb-6 backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
                <MapPin className="w-6 h-6" style={{ color: '#FF6B35' }} />
                Onde você está?
              </h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Digite seu endereço, cidade ou CEP..."
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-3 rounded-2xl focus:outline-none transition-colors"
                    style={{ 
                      borderColor: '#FFD23F',
                      backgroundColor: 'rgba(255, 210, 63, 0.1)',
                      focusBorderColor: '#FF6B35'
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && findNearbyStores()}
                  />
                </div>
                
                <button
                  onClick={findNearbyStores}
                  disabled={isLoading}
                  className="w-full text-white py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Localizando...
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6" />
                      Encontrar Lojas Próximas
                    </>
                  )}
                </button>
                
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-3">ou</p>
                  <button
                    onClick={useCurrentLocation}
                    disabled={isLoading}
                    className="font-bold flex items-center gap-2 mx-auto transition-colors hover:underline"
                    style={{ color: '#40B5A8' }}
                  >
                    <Navigation className="w-4 h-4" />
                    Usar minha localização atual
                  </button>
                </div>
              </div>
            </div>

            {/* Features com as cores da cartela em cards suaves */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div 
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-l-4"
                style={{ borderColor: '#FF6B35' }}
              >
                <div className="text-4xl mb-3">👶</div>
                <p className="font-semibold text-gray-700">Moda para todas as idades</p>
              </div>
              <div 
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-l-4"
                style={{ borderColor: '#87C84A' }}
              >
                <div className="text-4xl mb-3">💝</div>
                <p className="font-semibold text-gray-700">Qualidade e conforto</p>
              </div>
              <div 
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-l-4"
                style={{ borderColor: '#40B5A8' }}
              >
                <div className="text-4xl mb-3">🏪</div>
                <p className="font-semibold text-gray-700">{allStores.length} lojas no Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 30%, #dee2e6 60%, #ced4da 100%)',
      }}
    >
      {/* Elementos decorativos suaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-24 h-24 rounded-full opacity-15" style={{ backgroundColor: '#FF6B35' }}></div>
        <div className="absolute bottom-32 left-20 w-20 h-20 rounded-full opacity-10" style={{ backgroundColor: '#40B5A8' }}></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full opacity-20" style={{ backgroundColor: '#FFD23F' }}></div>
        <SparkleIcon className="absolute top-16 right-1/3 w-5 h-5 text-orange-400 opacity-50" />
        <SparkleIcon className="absolute bottom-1/4 left-1/3 w-4 h-4 text-teal-400 opacity-40" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentStep('location')}
            className="flex items-center gap-2 transition-colors font-semibold backdrop-blur-sm px-4 py-2 rounded-full border-2"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              color: '#40B5A8',
              borderColor: '#40B5A8'
            }}
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Alterar localização
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold drop-shadow-lg lowercase" style={{ color: '#FF6B35' }}>
              alphabeto
            </h1>
          </div>
          
          <div></div>
        </div>

        {/* Results summary */}
        {addressInput && (
          <div 
            className="backdrop-blur-sm border-2 rounded-2xl p-4 mb-6 text-center shadow-lg"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderColor: '#87C84A'
            }}
          >
            <p className="font-bold" style={{ color: '#40B5A8' }}>
              📍 Encontramos <span style={{ color: '#FF6B35' }}>{nearbyStores.length} lojas próximas</span> de: {addressInput}
            </p>
          </div>
        )}

        {/* Stores grid com separação por proximidade */}
        <div className="max-w-7xl mx-auto">
          {/* Lojas próximas (até 50km) */}
          {nearbyStores.filter(store => store.distance <= 50).length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#FF6B35' }}>
                🎯 Lojas próximas de você
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-12">
                {nearbyStores.filter(store => store.distance <= 50).map((store, index) => (
                  <div
                    key={store.id}
                    className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                      index === 0 ? 'ring-4 relative' : ''
                    }`}
                    style={{ 
                      ringColor: index === 0 ? '#FFD23F' : 'transparent'
                    }}
                  >
                    {index === 0 && (
                      <div 
                        className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-bold z-10 flex items-center gap-1"
                        style={{ backgroundColor: '#FFD23F', color: '#FF6B35' }}
                      >
                        <Sparkles className="w-4 h-4" />
                        Mais próxima
                      </div>
                    )}
                    
                    <div 
                      className="p-6 text-white relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD23F 100%)'
                      }}
                    >
                      <div className="absolute top-2 right-2 opacity-30">
                        <SparkleIcon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{store.name}</h3>
                      <div className="flex items-center gap-2 text-orange-100">
                        <Navigation className="w-4 h-4" />
                        <span className="text-sm font-semibold">{store.distance?.toFixed(1)} km de distância</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#40B5A8' }} />
                          <div>
                            <p className="text-gray-800 font-semibold">{store.address}</p>
                            <p className="text-gray-600 text-sm">{store.city}, {store.state}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5" style={{ color: '#40B5A8' }} />
                          <p className="text-gray-700 font-medium">{store.phone}</p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5" style={{ color: '#40B5A8' }} />
                          <p className="text-gray-700 text-sm">{store.hours}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => openWhatsApp(store)}
                        className="w-full text-white py-3 px-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        style={{
                          background: 'linear-gradient(135deg, #87C84A 0%, #40B5A8 100%)'
                        }}
                      >
                        <ExternalLink className="w-5 h-5" />
                        Conversar no WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Quando não há lojas próximas, mostrar mensagem e todas as lojas disponíveis
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📍</div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#FF6B35' }}>
                Nenhuma loja próxima encontrada
              </h2>
              <p className="text-gray-600 mb-6">
                Não encontramos lojas Alphabeto num raio de 50km da sua localização, mas você pode entrar em contato com nossas outras unidades:
              </p>
            </div>
          )}

          {/* Lojas distantes (mais de 50km) ou todas as lojas quando não há próximas */}
          {nearbyStores.filter(store => store.distance > 50).length > 0 && (
            <>
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  🚗 {nearbyStores.filter(store => store.distance <= 50).length > 0 ? 'Outras lojas disponíveis' : 'Todas as nossas lojas'}
                </h3>
                <p className="text-sm text-gray-500">
                  {nearbyStores.filter(store => store.distance <= 50).length > 0 
                    ? 'Lojas mais distantes da sua localização' 
                    : 'Entre em contato conosco pelo WhatsApp'}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {nearbyStores.filter(store => store.distance > 50).map((store) => (
                  <div
                    key={store.id}
                    className="bg-white/70 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:bg-white/90"
                  >
                    <div 
                      className="p-4 text-white"
                      style={{
                        background: 'linear-gradient(135deg, #6C757D 0%, #ADB5BD 100%)'
                      }}
                    >
                      <h4 className="font-bold text-sm mb-1">{store.name}</h4>
                      <div className="flex items-center gap-1 text-gray-200">
                        <Navigation className="w-3 h-3" />
                        <span className="text-xs">{store.distance?.toFixed(0)} km</span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <p className="text-xs text-gray-600 mb-3">{store.city}, {store.state}</p>
                      
                      <button
                        onClick={() => openWhatsApp(store)}
                        className="w-full text-white py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all duration-200"
                        style={{
                          background: 'linear-gradient(135deg, #6C757D 0%, #495057 100%)'
                        }}
                      >
                        <ExternalLink className="w-3 h-3" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {nearbyStores.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏪</div>
            <p className="text-gray-700 text-xl font-bold">Nenhuma loja encontrada na sua região</p>
            <p className="text-gray-500 text-sm mt-2">Tente alterar sua localização</p>
          </div>
        )}
        
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p className="font-medium">© 2025 alphabeto - vestindo criança como criança | Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  );
};

export default AlphaStores;