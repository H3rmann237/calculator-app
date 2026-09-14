//1. Sélectionnez tous les éléments nécessaires 
// (calc-form, les deux champs nombre, operator, calc-history, 
// summary, last-result, calc-count, clear-btn) 
// et créez un tableau vide pour stocker l'historique.
const calcform = document.getElementById("calc-form");
const firstnumber = document.getElementById("first-number");
const operator = document.getElementById ("operator");
const secondnumber = document.getElementById("second-number");
const calchistory = document.getElementById("calc-history");
const summary = document.getElementById("summary");
const lastresult = document.getElementById("last-result");
const calccount = document.getElementById("calc-count");
const clearbtn = document.getElementById("clear-btn");

const averageValue = document.querySelector("#average-value");


const history = []


//2. Écrivez une fonction calculate(a, b, operator) qui gère les 4 opérateurs (+- * /) 
// et renvoie la chaîne "Error" si l'opérateur est / et que b vaut 0.
function calculate(a,b,operator){
    if (operator === "+") {
        return a+b;
    } else if(operator === "-"){
        return a-b;
    } else if(operator === "*"){
        return a*b;
    } else if(operator === "/"){
        if (b === 0) {
            return "Error"
        } else {
            return a/b;
        }
    }
}

//3. Gérez la soumission du formulaire : empêchez le rechargement,
//     lisez et convertissez les deux nombres, 
//     bloquez la suite si l'un d'eux n'est pas un nombre valide, 
//    puis calculez le résultat et ajoutez un enregistrement à l'historique.
calcform.addEventListener("submit",(event)=>{
    event.preventDefault();

    const fnumber = Number(firstnumber.value);
    const snumber = Number(secondnumber.value);
    const op =operator.value;
    
    if(Number.isNaN(fnumber) || Number.isNaN(snumber)) return;


    const result = calculate(fnumber,snumber,op);

    history.push({a: fnumber, b: snumber,op: op,result: result});

    renderHistory();
    calcform.reset();
    firstnumber.focus();
})

//4. Affichez l'historique en direct :
//     chaque élément de la liste doit se lire comme "a opérateur b = résultat", 
//     exactement comme GradeMaster a chait chaque élève.
function renderHistory() {
    calchistory.innerHTML="";

    for (let i = 0; i < history.length; i++) {
        const element = history[i];

        const item = document.createElement("li");

        item.className  =
            "flex justify-between items-center " + "bg-slate-800 rounded-lg px-3 py-2 text-sm";
        
        item.innerHTML = `<span>${element.a} ${element.op} ${element.b} = ${element.result}</span>`;


        calchistory.appendChild(item)
    }

    //5. Mettez à jour le panneau résumé :
    // dernier résultat, nombre total de calculs, 
    // visible seulement s'il y a au moins un calcul.
    if (history.length > 0) {
            const average = calculateAverage(history);
            averageValue.textContent = average.toFixed(1);

            lastresult.textContent = history[history.length - 1].result;
            calccount.textContent = history.length;
    
            summary.classList.remove("hidden");
        } else {
            summary.classList.add("hidden");
        }
    
}

//6. Implémentez Clear All :
//     vide l'historique et cache à nouveau le résumé.
clearbtn.addEventListener("click",()=>{
    history.length = 0;
    renderHistory();
})

/*
    ⋆ Dé Bonus 
        Ajoutez, dans le panneau résumé, 
        la moyenne de tous les résultats valides de l'historique 
        (en boucle, comme calculateAverage() dans GradeMaster) 
        en ignorant les entrées dont le résultat vaut "Error".
*/
function calculateAverage(entries){
    let total = 0;
    let validresult = 0 ;
    
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].result !== "Error") {
            validresult++;
            total += entries[i].result;
        }
    }

    if (validresult === 0) {
        return 0;
    }

    return total/validresult;
}