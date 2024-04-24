export const estateObjectDictionary = {
  type: {
    sell: "Продажа",
    rent: "Аренда",
  },
  category: {
    apartment: "Квартира",
    house: "Дом",
    townhouse: "Таунхаус",
    land: "Земельный участок",
    cottage: "Дача",
    business: "Коммерческая недвижимость",
    factory: "Заводы и фабрики",
    other: "Другое",
  },
  houseCondition: {
    perfect: "Евроремонт",
    good: "Косметический ремонт",
    bad: "Без ремонта",
    free: "Свободная планировка",
    build: "Черновая отделка",
    medium: "Средний ремонт",
    clean: "Предчистовая отделка",
  },
  houseWallMaterial: {
    brick: "Кирпич",
    wood: "Дерево",
    gasSilicateBlock: "Газосиликатный блок",
    cinderBlock: "Шлакоблок",
    heatBlock: "Теплоблок",
    panel: "Панельный",
    monolith: "Монолит",
    saman: "Саман",
    gasConcreteBlock: "Газобетонный блок",
    foamBlock: "Пеноблок",
  },
  houseRoofMaterial: {
    tile: "Черепица",
    soft: "Мягкая кровля",
    metal: "Металл",
    ondulin: "Ондулин",
    metalTile: "Металлочерепица",
    corrugatedSheetRoof: "Профлист",
    slate: "Шифер",
  },
  furniture: {
    part: "Частично",
    full: "Полностью",
    none: "Без мебели",
  },
  houseType: {
    part: "Часть дома",
    full: "Целый дом",
    other: "Другое",
  },
  electricType: {
    part: "Частичное",
    full: "Есть",
    none: "Нет",
  },
  heatingType: {
    central: "Центральное", // todo: добавить на электричестве
    gas: "На газу",
    solid: "На твердом топливе",
    liquid: "На жидком топливе",
    none: "Нет",
  },
  gasType: {
    central: "Центральный",
    auto: "Автономный",
    canConnect: "Можно подключить",
    none: "Нет",
  },
  sewerType: {
    central: "Центральная",
    septic: "Септик",
    canConnect: "Можно подключить",
    none: "Нет",
  },
  toiletType: {
    in: "Внутри дома",
    out: "Снаружи дома",
    none: "Нет",
  },
  waterType: {
    central: "Центральная",
    borehole: "Скважина",
    canConnect: "Можно подключить",
    none: "Нет",
  },
  ethernet: {
    connected: "Подключен",
    toConnect: "Можно подключить",
    none: "Нет",
  },
  garage: {
    has: "",
    full: "Есть, входит в стоимость",
    part: "Есть, обсуждается отдельно",
    none: "Нет",
  },
  pledge: {
    none: "Нет",
    bank: "Да, у банка",
    police: "Да, арест",
  },
  documents: {
    good: "В порядке",
    needUpdate: "Нужна корректировка",
    needCheck: "Нужна проверка",
    bad: "Есть проблемы",
  },
  mortgage: {
    accepted: "Есть",
    declined: "Нет",
    possibly: "Зависит от банка",
  },
  exchange: {
    yes: "Есть",
    no: "Нет",
  },
  businessType: {
    freeSpace: "Свободное помещение",
    cafe: "Кафе и рестораны",
    office: "Офисы",
    areaBase: "Базы",
    factory: "Заводы",
    store: "Магазины",
  },
};
