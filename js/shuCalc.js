const heightElement = document.getElementById('height');
const widthElement = document.getElementById('width');
const sliceTypeElement = document.getElementById('slice-type');
const engineTypeElement = document.getElementById('remote-type');
const keyRadioElement = document.getElementById('key');
const remoteRadioElement = document.getElementById('remote');
const form = document.querySelector('.slice-form');
const electronicTypeContainerElement = document.querySelector('.electric-type-container');


class EngineManager {
    constructor() {
        this.types = {
            ByHand: 1,
            Electric: 2
        };
        this.values = {
            [this.types.ByHand]: 300,
            [this.types.Electric]: 700
        };
    }

    getEngineValue(typeId) {
        return this.values[typeId];
    }
}
const EngineTypeString = {
    1: 'يدوي',
    2: 'كهربائي'
};

const ElectricType = {
    /** Key type is 'مفتاح' */
    Key: 1,
    Remote: 2
};
const ElectricValue = {
    [ElectricType.Key]: 0,
    [ElectricType.Remote]: 300
};
const KeyRemoteSting = {
    [ElectricType.Key]: 'مفتاح',
    [ElectricType.Remote]: 'ريموت'
}

const SliceTypeString = {
    350: 'شرائح مفرغ وطني',
    330: 'شرائح معزولة'
};


const engine = new EngineManager();

/** object stores all equation handlers. */
const operations = {
    [engine.types.ByHand]: (width, height, slice) => {
        return (width * height * slice) + 300 ;
    },
    [`${engine.types.Electric}-${ElectricType.Key}`]: (width, height, slice) => {
        return (width * height * slice) + 700 + 0;
    },
    [`${engine.types.Electric}-${ElectricType.Remote}`]: (width, height, slice) => {
        return (width * height * slice) + 700 + 300;
    }
};

/** function to resolve equation handler key */
const getEquationKey = (remoteType, electricType) => {
    return `${remoteType}${electricType == null ? '' : `-${electricType}`}`
};

const getElectricTypeValue = (keyRadioElement, remoteRadioElement) => {
    if (keyRadioElement.checked) {
        return ElectricType.Key;
    }
    if (remoteRadioElement.checked) {
        return ElectricType.Remote;
    }
};

const onFormSubmit = (event) => {
    // to prevent the default behavior of `submit` event which is `reloads the page`.
    event.preventDefault();

    // assign form inputs values to variables and convert them to numbers.
    const height = +heightElement.value;
    const width = +widthElement.value;
    const sliceType = +sliceTypeElement.value;
    const engineType = +engineTypeElement.value;
    const electricType = getElectricTypeValue(keyRadioElement, remoteRadioElement);


    // get equation key
    const equationKey = getEquationKey(engineType, electricType);
    // get equation handler
    const equationHandler = operations[equationKey];
    // execute equation function to get the result.
    const result = equationHandler(width, height, sliceType);

    document.querySelector('#type-W-H').innerHTML ='نوع الشريحة : '+ SliceTypeString[sliceTypeElement.value]
                                                    +'<br/>' + 'الحجم :' + ' ('+ (height * width)+') ' +'متر مربع' ;
    document.querySelector('#total-type-W-H').innerHTML = '('+  (sliceType * height * width) + ') ' +'  '+'ريال';


    document.querySelector('#type-engine').innerHTML = 'نوع المحرك : '+ EngineTypeString[engineTypeElement.value];
    document.querySelector('#total-type-engine').innerHTML ='('+ engine.values[engineTypeElement.value] + ')' + '  '+ 'ريال';


    if (!electricType) {
        document.querySelector('#electric-container').style = 'display: none;';
    } else {
        document.querySelector('#electric-container').style = 'display: block;';
        document.querySelector('#type-electric').innerHTML = KeyRemoteSting[electricType];
        document.querySelector('#total-type-electric').innerHTML ='('+ ElectricValue[electricType]+ ') ' + '  '+ 'ريال';
    }

    document.querySelector('#total-price').innerHTML ='('+ result + ') ' +'  '+'ريال';    
};

form.addEventListener('submit', onFormSubmit);

engineTypeElement.addEventListener('change', (e) => {
    const remoteType = +e.target.value;
    if (remoteType == engine.types.Electric) {
        electronicTypeContainerElement.style = 'display: flex !important';
        keyRadioElement.checked = true;
    } else {
        electronicTypeContainerElement.style = 'display: none !important';
        keyRadioElement.checked = false;
        remoteRadioElement.checked = false;
    }
});



const openDialog = (data = null) => {
    console.log(data);
    // divElement.style = `display: block;`;
    // divElement.innerHTML = `your price in sa is ${data}`;
};

const closeDialog = () => {
    // divElement.style = `display: none;`;
    // divElement.innerHTML = '';
};
