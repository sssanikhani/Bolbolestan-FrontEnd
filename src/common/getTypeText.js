function getTypeText(offering) {
    let type = offering.course.type;
    switch(type) {
        case "Asli":
            return "اصلی";
        case "Takhasosi":
            return "تخصصی";
        case "Paaye":
            return "پایه";
        case "Umumi":
            return "عمومی";
        default:
            return "اصلی";
    }
}

export default getTypeText;