export class Click {
    constructor(
        public _id: string,
        public adPlace: string,
        public game: string,
        public banner: string,
        public countryCode: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {
    }
}