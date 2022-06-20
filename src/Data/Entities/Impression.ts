export class Impression {
    constructor(
        public _id: string,
        public adPlace: string,
        public game: string,
        public banner: string,
        public country: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {
    }
}