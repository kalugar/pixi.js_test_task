
const Data = {...window.env.data.split(',')}

export function  DataInit() {
    for (let key in Data) {
        let newKey = Data[key].match(/^[\w]+/g)
        delete Object.assign(Data, {[newKey]: Data[key] })[key];
        Data[newKey]= 'assets/images/'+Data[newKey]
    }
    delete window.env.data
    return Promise.resolve()
}

export default Data;