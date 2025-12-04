import Location from './Location'

export default class NullLocation extends Location {
    constructor() {
        super({
            id: "",
            rack: "",
            tray: "",
        })
        this.isNull = true
    }
}