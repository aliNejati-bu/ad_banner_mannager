export class Game {
    constructor(
        public _id: string,
        public name: string,
        public packagename: string,
        public admins: string[],
        public creator: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {
    }
}